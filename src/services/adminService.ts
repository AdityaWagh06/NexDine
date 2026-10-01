import { supabase } from "../config/supabase";
import type { RegistrationRequest, Restaurant } from "../config/supabase";
import {
  generateSlug,
  generateTempPassword,
  hashPassword,
} from "../utils/helpers";

/**
 * Admin API Service
 * All admin-related database operations with full local storage fallback support
 */

const LOCAL_KEY_1 = "nexdine_pending_registrations";
const LOCAL_KEY_2 = "nextdine_pending_requests";

const isValidUUID = (id: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
};

const getLocalPendingRequests = (): RegistrationRequest[] => {
  try {
    const reqs1 = JSON.parse(localStorage.getItem(LOCAL_KEY_1) || "[]");
    const reqs2 = JSON.parse(localStorage.getItem(LOCAL_KEY_2) || "[]");
    const combined = [...reqs1, ...reqs2];
    const map = new Map<string, RegistrationRequest>();
    combined.forEach((item: any) => {
      if (item && item.id && item.status !== "verified" && item.status !== "rejected") {
        map.set(item.id, item);
      }
    });
    return Array.from(map.values());
  } catch (e) {
    return [];
  }
};

const removeLocalPendingRequest = (id: string) => {
  try {
    const reqs1 = JSON.parse(localStorage.getItem(LOCAL_KEY_1) || "[]").filter((r: any) => r.id !== id);
    const reqs2 = JSON.parse(localStorage.getItem(LOCAL_KEY_2) || "[]").filter((r: any) => r.id !== id);
    localStorage.setItem(LOCAL_KEY_1, JSON.stringify(reqs1));
    localStorage.setItem(LOCAL_KEY_2, JSON.stringify(reqs2));
  } catch (e) {
    console.error("Error cleaning local storage pending requests:", e);
  }
};

// Get all pending registration requests with real-time updates
export const subscribeToPendingRequests = (
  callback: (requests: RegistrationRequest[]) => void
) => {
  const fetchPending = async () => {
    let dbRequests: RegistrationRequest[] = [];
    try {
      const { data, error } = await supabase
        .from("registration_requests")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (!error && data) {
        dbRequests = data as RegistrationRequest[];
      }
    } catch (e) {
      console.warn("Could not fetch DB registration_requests:", e);
    }

    const localReqs = getLocalPendingRequests();
    const dbIds = new Set(dbRequests.map((r) => r.id));
    const combined = [...dbRequests, ...localReqs.filter((l) => !dbIds.has(l.id))];

    callback(combined);
  };

  fetchPending();

  const subscription = supabase
    .channel("pending-requests")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "registration_requests",
      },
      () => {
        fetchPending();
      }
    )
    .subscribe();

  return subscription;
};

// Create restaurant account from registration request
export const createRestaurantAccount = async (
  requestId: string,
  data: {
    email: string;
    subscriptionPlan: string;
    internalNotes?: string;
  }
) => {
  try {
    let request: RegistrationRequest | null = null;

    // 1. Find request in Supabase DB if UUID is valid
    if (isValidUUID(requestId)) {
      const { data: dbReq } = await supabase
        .from("registration_requests")
        .select("*")
        .eq("id", requestId)
        .maybeSingle();
      if (dbReq) {
        request = dbReq as RegistrationRequest;
      }
    }

    // 2. Fallback to local storage if not found in DB
    if (!request) {
      const localReqs = getLocalPendingRequests();
      request = localReqs.find((r) => r.id === requestId) || null;
    }

    if (!request) {
      throw new Error("Registration request details could not be found.");
    }

    // 3. Credentials & Slug generation
    const slug = generateSlug(request.restaurant_name);
    const tempPassword = generateTempPassword();
    const passwordHash = await hashPassword(tempPassword);
    const validUuidParam = isValidUUID(requestId) ? requestId : null;

    // 4. Try RPC function first
    let rpcSuccess = false;
    let createdRestaurantId: string | null = null;

    try {
      const { data: result, error: rpcError } = await supabase.rpc(
        "admin_create_restaurant",
        {
          p_request_id: validUuidParam,
          p_restaurant_name: request.restaurant_name,
          p_slug: slug,
          p_owner_name: request.owner_name,
          p_phone: request.phone,
          p_email: data.email.trim(),
          p_city: request.city,
          p_address: request.address || null,
          p_subscription_plan: data.subscriptionPlan,
          p_password_hash: passwordHash,
          p_internal_notes: data.internalNotes || null,
        }
      );

      if (!rpcError && result && result.length > 0 && result[0].success) {
        rpcSuccess = true;
        createdRestaurantId = result[0].restaurant_id;
      }
    } catch (rpcErr) {
      console.warn("RPC admin_create_restaurant failed, using direct insert fallback:", rpcErr);
    }

    // 5. Direct DB insertion fallback if RPC was unavailable
    if (!rpcSuccess) {
      const { data: newRest, error: restErr } = await supabase
        .from("restaurants")
        .insert([
          {
            name: request.restaurant_name,
            slug: slug,
            owner_name: request.owner_name,
            phone: request.phone,
            email: data.email.trim(),
            city: request.city,
            address: request.address || null,
            subscription_plan: data.subscriptionPlan || "free_trial",
            status: "active",
            is_active: true,
          },
        ])
        .select()
        .single();

      if (restErr || !newRest) {
        console.error("Direct restaurant creation error:", restErr);
        throw new Error(restErr?.message || "Failed to create restaurant record.");
      }

      createdRestaurantId = newRest.id;

      // Create owner user account
      const { error: userErr } = await supabase.from("users").insert([
        {
          restaurant_id: createdRestaurantId,
          email: data.email.trim().toLowerCase(),
          password_hash: passwordHash,
          temp_password: true,
          role: "owner",
          is_active: true,
        },
      ]);

      if (userErr) {
        console.error("Direct user creation error:", userErr);
      }

      // Mark request as verified in DB if valid UUID
      if (validUuidParam) {
        await supabase
          .from("registration_requests")
          .update({
            status: "verified",
            contacted_at: new Date().toISOString(),
            internal_notes: data.internalNotes || null,
          })
          .eq("id", validUuidParam);
      }
    }

    // Remove from local storage queue
    removeLocalPendingRequest(requestId);

    return {
      success: true,
      restaurant: {
        id: createdRestaurantId || "new-restaurant",
        name: request.restaurant_name,
        slug: slug,
      },
      credentials: {
        email: data.email,
        password: tempPassword,
        loginUrl: `${window.location.origin}/login`,
      },
    };
  } catch (error: any) {
    console.error("Create account error:", error);
    return {
      success: false,
      error: error.message || "Failed to create account",
    };
  }
};

// Reject registration request
export const rejectRegistrationRequest = async (
  requestId: string,
  reason: string
) => {
  try {
    if (isValidUUID(requestId)) {
      await supabase.rpc("admin_reject_request", {
        p_request_id: requestId,
        p_rejection_reason: reason,
      });

      await supabase
        .from("registration_requests")
        .update({ status: "rejected", rejection_reason: reason })
        .eq("id", requestId);
    }

    removeLocalPendingRequest(requestId);
    return true;
  } catch (e) {
    console.error("Reject error:", e);
    removeLocalPendingRequest(requestId);
    return true;
  }
};

// Get all restaurants with real-time updates
export const subscribeToRestaurants = (
  callback: (restaurants: Restaurant[]) => void
) => {
  const fetchRestaurants = async () => {
    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      callback(data);
    }
  };

  fetchRestaurants();

  const subscription = supabase
    .channel("restaurants")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "restaurants",
      },
      () => {
        fetchRestaurants();
      }
    )
    .subscribe();

  return subscription;
};

// Toggle restaurant block/unblock status
export const toggleRestaurantStatus = async (
  restaurantId: string,
  isCurrentlyBlocked: boolean,
  blockReason?: string
) => {
  try {
    if (isValidUUID(restaurantId)) {
      await supabase.rpc("admin_toggle_restaurant_status", {
        p_restaurant_id: restaurantId,
        p_is_active: isCurrentlyBlocked,
        p_block_reason: blockReason || null,
      });

      await supabase
        .from("restaurants")
        .update({
          is_active: isCurrentlyBlocked,
          status: isCurrentlyBlocked ? "active" : "blocked",
          block_reason: blockReason || null,
        })
        .eq("id", restaurantId);
    }
    return true;
  } catch (e) {
    console.error("Toggle restaurant status error:", e);
    return false;
  }
};

// Get platform statistics
export const getPlatformStats = async () => {
  try {
    const [
      { count: activeRestaurants },
      { count: pendingRequests },
      { count: totalOrders },
      { data: todayOrders },
    ] = await Promise.all([
      supabase
        .from("restaurants")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true),
      supabase
        .from("registration_requests")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending"),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase
        .from("orders")
        .select("total")
        .gte(
          "created_at",
          new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
        ),
    ]);

    const localPending = getLocalPendingRequests().length;
    const todayRevenue =
      todayOrders?.reduce((sum, order) => sum + (order.total || 0), 0) || 0;

    return {
      activeRestaurants: activeRestaurants || 0,
      pendingRequests: (pendingRequests || 0) + localPending,
      totalOrders: totalOrders || 0,
      todayRevenue,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return {
      activeRestaurants: 0,
      pendingRequests: getLocalPendingRequests().length,
      totalOrders: 0,
      todayRevenue: 0,
    };
  }
};
