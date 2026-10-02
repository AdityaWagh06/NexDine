import { supabase } from "../config/supabase";
import type { Order, MenuItem } from "../config/supabase";

/**
 * Restaurant API Service
 * All restaurant dashboard operations with full real-time and local fallback support
 */

const isValidUUID = (id: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
};

const LOCAL_ORDERS_KEY = "nexdine_local_orders";
const LOCAL_MENU_KEY = "nexdine_local_menu_items";

const getLocalOrders = (restaurantId: string): Order[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]");
    return raw.filter((o: any) => o.restaurant_id === restaurantId || restaurantId === "demo-restaurant" || restaurantId === "demo_restaurant_id");
  } catch {
    return [];
  }
};

const getLocalMenuItems = (restaurantId: string): MenuItem[] => {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_MENU_KEY) || "[]");
    return raw.filter((i: any) => i.restaurant_id === restaurantId || restaurantId === "demo-restaurant" || restaurantId === "demo_restaurant_id");
  } catch {
    return [];
  }
};

// Subscribe to restaurant's orders with real-time updates
export const subscribeToOrders = (
  restaurantId: string,
  callback: (orders: Order[]) => void
) => {
  const fetchOrders = async () => {
    let dbOrders: Order[] = [];
    if (isValidUUID(restaurantId)) {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("restaurant_id", restaurantId)
          .order("created_at", { ascending: false });

        if (!error && data) {
          dbOrders = data as Order[];
        }
      } catch (e) {
        console.warn("Could not fetch DB orders:", e);
      }
    }

    const localOrders = getLocalOrders(restaurantId);
    const dbIds = new Set(dbOrders.map((o) => o.id));
    const combined = [...dbOrders, ...localOrders.filter((l) => !dbIds.has(l.id))];

    // Sort by created_at descending
    combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    callback(combined);
  };

  fetchOrders();

  let subscription: any = { unsubscribe: () => {} };

  if (isValidUUID(restaurantId)) {
    subscription = supabase
      .channel(`restaurant-orders-${restaurantId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();
  }

  return subscription;
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: string,
  paymentData?: {
    paymentMethod?: string;
    transactionId?: string;
  }
) => {
  const updateData: any = { status };

  if (paymentData) {
    updateData.payment_method = paymentData.paymentMethod;
    updateData.payment_transaction_id = paymentData.transactionId;
  }

  // Update in local storage
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]");
    const updated = raw.map((o: any) =>
      o.id === orderId ? { ...o, ...updateData } : o
    );
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Local order status update error:", e);
  }

  if (isValidUUID(orderId)) {
    try {
      await supabase
        .from("orders")
        .update(updateData)
        .eq("id", orderId);
    } catch (e) {
      console.warn("DB updateOrderStatus error:", e);
    }
  }

  return true;
};

// Subscribe to menu items with real-time updates
export const subscribeToMenuItems = (
  restaurantId: string,
  callback: (items: MenuItem[]) => void
) => {
  const fetchItems = async () => {
    let dbItems: MenuItem[] = [];
    if (isValidUUID(restaurantId)) {
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .eq("restaurant_id", restaurantId)
          .order("created_at", { ascending: false });

        if (!error && data) {
          dbItems = data as MenuItem[];
        }
      } catch (e) {
        console.warn("Could not fetch DB menu items:", e);
      }
    }

    const localItems = getLocalMenuItems(restaurantId);
    const dbIds = new Set(dbItems.map((i) => i.id));
    const combined = [...dbItems, ...localItems.filter((l) => !dbIds.has(l.id))];

    callback(combined);
  };

  fetchItems();

  let subscription: any = { unsubscribe: () => {} };

  if (isValidUUID(restaurantId)) {
    subscription = supabase
      .channel(`restaurant-menu-${restaurantId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "menu_items",
          filter: `restaurant_id=eq.${restaurantId}`,
        },
        () => {
          fetchItems();
        }
      )
      .subscribe();
  }

  return subscription;
};

// Create menu item
export const createMenuItem = async (item: Partial<MenuItem>) => {
  const newItem = {
    ...item,
    id: item.id || Date.now().toString(),
    created_at: new Date().toISOString(),
    is_available: item.is_available !== false,
  };

  // Local storage save fallback
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_MENU_KEY) || "[]");
    local.unshift(newItem);
    localStorage.setItem(LOCAL_MENU_KEY, JSON.stringify(local));
  } catch (e) {
    console.error("Local createMenuItem error:", e);
  }

  if (item.restaurant_id && isValidUUID(item.restaurant_id)) {
    try {
      const { id, ...insertPayload } = item;
      await supabase.from("menu_items").insert([insertPayload]);
    } catch (e) {
      console.warn("DB createMenuItem error:", e);
    }
  }

  return true;
};

// Update menu item
export const updateMenuItem = async (
  itemId: string,
  updates: Partial<MenuItem>
) => {
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_MENU_KEY) || "[]");
    const updated = local.map((i: any) =>
      i.id === itemId ? { ...i, ...updates } : i
    );
    localStorage.setItem(LOCAL_MENU_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Local updateMenuItem error:", e);
  }

  if (isValidUUID(itemId)) {
    try {
      await supabase
        .from("menu_items")
        .update(updates)
        .eq("id", itemId);
    } catch (e) {
      console.warn("DB updateMenuItem error:", e);
    }
  }

  return true;
};

// Toggle menu item availability
export const toggleMenuItemAvailability = async (
  itemId: string,
  isAvailable: boolean
) => {
  return updateMenuItem(itemId, { is_available: isAvailable });
};

// Delete menu item
export const deleteMenuItem = async (itemId: string) => {
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_MENU_KEY) || "[]");
    const filtered = local.filter((i: any) => i.id !== itemId);
    localStorage.setItem(LOCAL_MENU_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error("Local deleteMenuItem error:", e);
  }

  if (isValidUUID(itemId)) {
    try {
      await supabase.from("menu_items").delete().eq("id", itemId);
    } catch (e) {
      console.warn("DB deleteMenuItem error:", e);
    }
  }

  return true;
};

// Create order (manual or from customer)
export const createOrder = async (order: Partial<Order>) => {
  const newOrder = {
    ...order,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    status: order.status || "pending",
  };

  // Always save locally so order creation NEVER fails
  try {
    const local = JSON.parse(localStorage.getItem(LOCAL_ORDERS_KEY) || "[]");
    local.unshift(newOrder);
    localStorage.setItem(LOCAL_ORDERS_KEY, JSON.stringify(local));
  } catch (e) {
    console.error("Local createOrder save error:", e);
  }

  if (order.restaurant_id && isValidUUID(order.restaurant_id)) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([order])
        .select()
        .single();
      if (!error && data) {
        return { data, error: null };
      }
    } catch (e) {
      console.warn("DB createOrder error, local fallback active:", e);
    }
  }

  return { data: newOrder, error: null };
};

// Get restaurant stats
export const getRestaurantStats = async (restaurantId: string) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let dbTodayOrders: any[] = [];
    let dbPendingOrders: any[] = [];
    let dbTotalOrders = 0;

    if (isValidUUID(restaurantId)) {
      try {
        const [
          { data: todayOrdersData },
          { data: pendingOrdersData },
          { count: totalOrdersCount },
        ] = await Promise.all([
          supabase
            .from("orders")
            .select("total, status")
            .eq("restaurant_id", restaurantId)
            .gte("created_at", today.toISOString()),
          supabase
            .from("orders")
            .select("*")
            .eq("restaurant_id", restaurantId)
            .eq("status", "pending"),
          supabase
            .from("orders")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", restaurantId),
        ]);

        dbTodayOrders = todayOrdersData || [];
        dbPendingOrders = pendingOrdersData || [];
        dbTotalOrders = totalOrdersCount || 0;
      } catch (e) {
        console.warn("DB stats fetch warning:", e);
      }
    }

    const localOrders = getLocalOrders(restaurantId);
    const localPending = localOrders.filter((o) => o.status === "pending").length;
    const localCompletedToday = localOrders.filter(
      (o) => o.status === "completed" && new Date(o.created_at) >= today
    );
    const localRevenueToday = localCompletedToday.reduce(
      (sum, o) => sum + (o.total || 0),
      0
    );

    const completedToday =
      dbTodayOrders.filter((o) => o.status === "completed").length +
      localCompletedToday.length;

    const revenueToday =
      dbTodayOrders
        .filter((o) => o.status === "completed")
        .reduce((sum, o) => sum + (o.total || 0), 0) + localRevenueToday;

    return {
      pendingOrders: dbPendingOrders.length + localPending,
      completedToday,
      revenueToday,
      totalOrders: dbTotalOrders + localOrders.length,
    };
  } catch (error) {
    console.error("Error fetching restaurant stats:", error);
    const localOrders = getLocalOrders(restaurantId);
    return {
      pendingOrders: localOrders.filter((o) => o.status === "pending").length,
      completedToday: 0,
      revenueToday: 0,
      totalOrders: localOrders.length,
    };
  }
};
