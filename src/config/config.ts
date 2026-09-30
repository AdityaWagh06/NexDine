// Supabase Configuration
// Replace these with your actual Supabase project credentials
// Get them from: https://app.supabase.com/project/_/settings/api

const rawUrl = import.meta.env.VITE_SUPABASE_URL || "";
export const SUPABASE_URL =
  rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))
    ? rawUrl
    : "https://efnjikqnwkesapnxwcjh.supabase.co";

const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
export const SUPABASE_ANON_KEY =
  rawKey && rawKey !== "YOUR_SUPABASE_ANON_KEY"
    ? rawKey
    : "sb_publishable_9nzHWPGcK8wQtXSAjWc05w_xc7gwpm-";

// Application Configuration
export const APP_CONFIG = {
  appName: "NextDine",
  tagline: "Smart QR Ordering for Modern Restaurants",
  defaultCurrency: "₹",
  taxRate: 0.05, // 5% GST
  orderPrefix: "ORD",

  // Subscription plans
  plans: {
    all_inclusive: {
      name: "Everything Included",
      price: 999,
      duration: "per month",
      features: [
        "Table QR Code Ordering",
        "Unlimited Tables & Outlets",
        "Unlimited Monthly Orders",
        "Live Kitchen Display Stream",
        "Instant Menu & Price Updates",
        "Daily Sales & GST Reports",
        "WhatsApp & Phone Support",
        "All Future Feature Updates",
      ],
    },
  },

  // Restaurant types
  restaurantTypes: [
    "Restaurant",
    "Food Truck",
    "Cafe",
    "Bakery",
    "Cloud Kitchen",
    "Fine Dining",
    "Quick Service",
    "Other",
  ],

  // Menu categories
  menuCategories: [
    "Starters",
    "Main Course",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Beverages",
    "Desserts",
    "Snacks",
    "Other",
  ],

  // Order statuses
  orderStatuses: {
    pending: { label: "Pending", color: "warning" },
    accepted: { label: "Accepted", color: "accent-secondary" },
    preparing: { label: "Preparing", color: "accent-secondary" },
    ready: { label: "Ready", color: "success" },
    completed: { label: "Completed", color: "success" },
    cancelled: { label: "Cancelled", color: "error" },
    rejected: { label: "Rejected", color: "error" },
  },

  // Payment methods
  paymentMethods: ["Cash", "UPI", "Card", "Other"],

  // Registration sources
  heardFromOptions: [
    "Google Search",
    "Social Media",
    "Friend/Referral",
    "Advertisement",
    "Other",
  ],
};

// Centralized Admin Content Exports
export {
  BRAND_CONFIG,
  LANDING_PAGE_CONTENT,
  RESTAURANT_DASHBOARD_CONTENT,
  CUSTOMER_ORDERING_CONTENT,
  ADMIN_PANEL_CONTENT,
} from "./adminContent";

