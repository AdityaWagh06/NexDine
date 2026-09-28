/**
 * ============================================================================
 * NEXTDINE CENTRALIZED ADMIN CONTENT & CONSTANTS CONFIGURATION
 * ============================================================================
 * 
 * THIS IS THE SINGLE SOURCE OF TRUTH FOR ALL TEXT, SLOGANS, HEADLINES, 
 * LABELS, BUTTON CAPTIONS, AND CONSTANTS ACROSS THE ENTIRE APPLICATION.
 * 
 * To modify any text shown anywhere in the app (Landing Page, Restaurant 
 * Dashboard, Kitchen Display System, QR Tables, Menu, Customer Menu, or 
 * Admin Panel), simply edit the corresponding value in this file!
 * 
 * CONTENTS:
 * 1. BRAND & APP GENERAL CONFIGURATION
 * 2. LANDING PAGE CONTENT (Hero, Features, Pricing, Demo, FAQ, Footer)
 * 3. RESTAURANT DASHBOARD & OPERATIONAL CONTENT (Home, Orders KDS, Menu, QR Tables, Reports, Settings)
 * 4. CUSTOMER ORDERING EXPERIENCE CONTENT (Menu, Cart, Checkout, Order Tracking)
 * 5. PLATFORM ADMIN PANEL CONTENT (Pending Approvals, Outlets Registry)
 * ============================================================================
 */

// ============================================================================
// SECTION 1: BRAND & GENERAL APP CONFIGURATION
// ============================================================================
export const BRAND_CONFIG = {
  /** Brand Name displayed in headers, logos, page titles */
  appName: "NextDine",
  
  /** URL for the official PNG brand logo */
  logoUrl: "/logo.png",
  
  /** Short brand tagline used across footers and branding */
  tagline: "Smart QR Ordering for Modern Restaurants",
  
  /** Primary Currency Symbol used for menu pricing and revenue displays */
  currencySymbol: "₹",
  
  /** Tax rate applied to orders (0.05 = 5% GST) */
  taxRate: 0.05,
  
  /** Order ID prefix shown on receipts and kitchen tickets */
  orderPrefix: "ORD-",

  /** Contact & Support Email */
  supportEmail: "support@nextdine.in",
  
  /** Contact Support Phone */
  supportPhone: "+91 98765 43210",
};

// ============================================================================
// SECTION 2: LANDING PAGE CONTENT (MARKETING & INTRODUCTION)
// ============================================================================
export const LANDING_PAGE_CONTENT = {
  /** Header Navigation Links */
  navigation: {
    features: "Features",
    pricing: "Pricing",
    howItWorks: "How It Works",
    signIn: "Login",
    startTrial: "Get Started",
  },

  /** 2.1 HERO SECTION (First screen visible to visitors) */
  hero: {
    /** Top Pill Badge above the main headline */
    badgeText: "Built Specially for Restaurant Operations",
    
    /** Main Hero Headline (Big Title) */
    headlineMain: "Faster Table Service.",
    
    /** Colored Highlighted Text in Hero Headline */
    headlineHighlight: "Zero Order Errors.",
    
    /** Concise Tagline Subtitle under the main title */
    subtitle: "Instant QR ordering built for restaurants. Customers scan, order, and pay directly from their table straight to your kitchen.",
    
    /** Primary Action Button */
    primaryCta: "Get Started Now",
    
    /** Secondary Action Button */
    secondaryCta: "Test Sample Customer Menu",
    
    /** Trust Badges beneath CTA buttons */
    trustChecklist: [
      "No Credit Card Required",
      "Works On Any Phone Browser",
      "No App Download Required",
    ],
  },

  /** 2.2 REAL SOFTWARE MOCKUP / DEMO SECTION */
  productDemo: {
    badge: "Real Software Preview",
    title: "How NextDine Works on Table & in Kitchen",
    subtitle: "See how an order flows seamlessly from customer phone scan to real-time kitchen display.",
    customerTabLabel: "Customer Phone Scan",
    kitchenTabLabel: "Kitchen Display System (KDS)",
  },

  /** 2.3 OPERATIONAL SCENARIOS / HOW IT WORKS SECTION */
  howItWorks: {
    badge: "Restaurant Workflows",
    title: "How NextDine Operates During Rush Hours",
    subtitle: "Eliminate waiter note mistakes, reduce table turnaround time, and keep your kitchen moving fast.",
    steps: [
      {
        number: "01",
        title: "Customer Scans QR Code",
        description: "Placed on every table. Instantly opens your digital menu on their phone without app installation.",
        badgeText: "No App Required",
      },
      {
        number: "02",
        title: "Order Sent Directly to Kitchen",
        description: "Items flash on your live kitchen display screen with table number, quantities, and specific notes.",
        badgeText: "Real-time Sync",
      },
      {
        number: "03",
        title: "Staff Prepares & Serves Food",
        description: "Kitchen marks order complete with a single tap. Waiters serve food faster without taking paper notes.",
        badgeText: "Faster Turnaround",
      },
    ],
  },

  /** 2.4 WHY NEXTDINE / VALUE PROPOSITIONS SECTION */
  whyUs: {
    badge: "Built For Ops",
    title: "Why Restaurant Owners Switch to NextDine",
    subtitle: "Purpose-built technology designed to streamline floor operations and boost daily sales.",
    features: [
      {
        title: "Instant 86'd Menu Sync",
        description: "Toggle out-of-stock dishes with one tap. Customers instantly see disabled items, ending order apologies.",
      },
      {
        title: "Kitchen Display (KDS)",
        description: "High-contrast column display built for kitchen screens with color-coded overdue warnings and audio alerts.",
      },
      {
        title: "Table-Specific QR Codes",
        description: "Generate and print high-resolution QR codes bound directly to table numbers for instant order routing.",
      },
      {
        title: "Zero Hardware Lock-In",
        description: "Runs on any browser, tablet, iPad, or smartphone. Use your existing devices without expensive POS hardware.",
      },
    ],
  },

  /** 2.5 PRICING SECTION */
  pricing: {
    badge: "Transparent Pricing",
    title: "One Flat Plan. Complete Done-For-You Setup.",
    subtitle: "No hidden commission percentages. No surprise fees. Simple monthly subscription with complete hands-on setup by our team.",
    planName: "All-Inclusive Restaurant Pass",
    priceAmount: "₹999",
    pricePeriod: "/ month per outlet",
    setupFeeAmount: "₹2,999",
    setupFeePeriod: "One-Time Setup Fee",
    setupFeeSubtitle: "Complete done-for-you onboarding by our team",
    ctaText: "Get Started Now",
    guaranteeText: "Flat ₹999/mo + ₹2,999 one-time setup. Everything handled by us.",
    featuresIncluded: [
      "Full Menu Catalog Upload & Setup (Done by us)",
      "High-Res Table QR Code Design & Print Sheets",
      "Staff & Kitchen Team Training & Onboarding",
      "Unlimited Tables & Monthly Orders",
      "Live Kitchen Display System (KDS)",
      "Instant Menu & Price Availability Toggles",
      "Daily Sales & GST Analytics Reports",
      "Dedicated WhatsApp & Phone Support",
    ],
  },

  /** 2.6 FREQUENTLY ASKED QUESTIONS (FAQ) */
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about setting up NextDine in your restaurant.",
    items: [
      {
        question: "Do customers need to download an application to order?",
        answer: "No! NextDine opens instantly in any standard smartphone web browser (Chrome, Safari, Firefox) immediately upon scanning the table QR code.",
      },
      {
        question: "What hardware is required for the kitchen display?",
        answer: "Any standard tablet, iPad, computer monitor, or smart TV with a web browser can be used as a Kitchen Display System (KDS).",
      },
      {
        question: "How long does setup take?",
        answer: "You can upload your menu and print table QR codes in under 15 minutes. Our team can also help onboard your menu catalog for free.",
      },
    ],
  },

  /** 2.7 BOTTOM CTA BANNER */
  ctaBanner: {
    title: "Ready to Modernize Your Restaurant Ordering?",
    subtitle: "Join hundreds of restaurant owners running faster table operations with NextDine.",
    buttonText: "Get Started Free Today",
  },

  /** 2.8 FOOTER CONTENT */
  footer: {
    tagline: "Operational QR ordering software built for modern restaurants, cafes, and cloud kitchens.",
    copyright: `© ${new Date().getFullYear()} NextDine. All rights reserved.`,
  },
};

// ============================================================================
// SECTION 3: RESTAURANT DASHBOARD & OPERATIONAL CONTENT
// ============================================================================
export const RESTAURANT_DASHBOARD_CONTENT = {
  /** Sidebar Navigation Labels */
  sidebarNav: {
    overview: "Dashboard",
    liveOrders: "Kitchen Display (KDS)",
    menuCatalog: "Menu Catalog",
    qrTables: "QR Tables",
    reports: "Sales Reports",
    settings: "Outlet Settings",
    signOut: "Sign Out",
  },

  /** 3.1 DASHBOARD OVERVIEW / COMMAND CENTER PAGE */
  overview: {
    pageTitle: "Operations Command Center",
    pageSubtitle: "Real-time kitchen activity, order alerts, and quick actions for shift management.",
    liveOrdersCardTitle: "Active Kitchen Orders",
    pendingAlertBannerText: "Orders Waiting Past Threshold",
    quickActionsTitle: "Quick Operational Shortcuts",
    todayStatsTitle: "Today's Performance Summary",
  },

  /** 3.2 KITCHEN DISPLAY SYSTEM (KDS) ORDERS PAGE */
  kds: {
    pageTitle: "Kitchen Live Orders",
    pageSubtitle: "Scan order tickets in under 2 seconds. Optimized for high-volume kitchen service.",
    audioChimeConnected: "Real-time Sync Stream Connected • Audio Chime Active",
    statusFilterTabs: {
      pending: "Pending",
      preparing: "Preparing",
      completed: "Completed",
      cancelled: "Cancelled",
      all: "All Orders",
    },
    actions: {
      acceptOrder: "ACCEPT ORDER",
      markComplete: "MARK COMPLETE",
      cancelOrder: "Cancel Order",
      viewTicket: "View Ticket",
    },
    cardBadges: {
      pending: "PENDING",
      preparing: "PREPARING",
      completed: "COMPLETED",
      cancelled: "CANCELLED",
    },
  },

  /** 3.3 MENU MANAGEMENT PAGE */
  menu: {
    pageTitle: "Menu Catalog Management",
    pageSubtitle: "Organize catalog dishes, set prices, and control real-time ordering availability.",
    addButton: "Add Menu Item",
    liveSyncNotice: "Live Sync Active • Availability changes reflect instantly for scanning customers",
    searchPlaceholder: "Search dish by name...",
    tableHeaders: {
      dish: "Dish Name & Description",
      price: "Price",
      stockStatus: "Real-time Stock",
      actions: "Actions",
    },
    stockLabels: {
      inStock: "IN STOCK",
      outOfStock: "86'd OUT OF STOCK",
    },
  },

  /** 3.4 QR TABLE MANAGEMENT PAGE */
  qrTables: {
    pageTitle: "QR Table Management",
    pageSubtitle: "Generate, preview, and download individual QR codes for each dining table.",
    addButton: "Add New Table",
    printSheetButton: "Batch Print Sheet",
    downloadAllButton: "Download All QRs",
    infoBannerText: "Each QR code embeds table-specific session tracking so orders route directly to the right table in your kitchen view.",
    tableHeaders: {
      table: "Table Name",
      section: "Section / Floor",
      capacity: "Capacity",
      status: "QR Link Status",
      actions: "Actions",
    },
  },

  /** 3.5 REPORTS & ANALYTICS PAGE */
  reports: {
    pageTitle: "Sales & Performance Reports",
    pageSubtitle: "Analyze order volume, daily revenue trends, top-selling items, and export data.",
    exportCsvButton: "Export CSV",
    exportPdfButton: "Export PDF",
    metrics: {
      totalRevenue: "Total Revenue",
      totalOrders: "Total Orders",
      avgOrderValue: "Avg Order Value",
      topSellingItem: "Top Selling Item",
    },
  },

  /** 3.6 RESTAURANT SETTINGS PAGE */
  settings: {
    pageTitle: "Restaurant Outlet Settings",
    pageSubtitle: "Manage outlet info, order rules, sound notifications, and staff options.",
    tabs: {
      profile: "Outlet Profile",
      tableDefaults: "Tables & QR Defaults",
      orderRules: "Order Preferences",
      notifications: "Notifications & Sound",
    },
    saveButton: "Save Changes",
  },
};

// ============================================================================
// SECTION 4: CUSTOMER ORDERING EXPERIENCE CONTENT (POST-QR-SCAN)
// ============================================================================
export const CUSTOMER_ORDERING_CONTENT = {
  /** Top Header Bar */
  header: {
    tableLabel: "Table #",
    menuTitle: "Digital Ordering Menu",
  },

  /** Category Bar */
  categories: {
    all: "All Dishes",
  },

  /** Cart Sticky Floating Bar */
  cartBar: {
    itemsCountLabel: "items selected",
    viewCartButton: "View Cart & Checkout",
  },

  /** Checkout Modal / Drawer */
  checkoutModal: {
    title: "Review Your Order",
    tableConfirmNotice: "Table location verified automatically via QR scan context.",
    customerNameLabel: "Your Name",
    customerNamePlaceholder: "e.g. Rahul Sharma",
    customerPhoneLabel: "Phone Number (for order updates)",
    customerPhonePlaceholder: "10-digit mobile number",
    notesLabel: "Special Cooking Instructions",
    notesPlaceholder: "e.g. Less spicy, extra sauce...",
    placeOrderButton: "Confirm & Send to Kitchen",
  },

  /** Live Order Status Tracking Screen */
  orderTracker: {
    title: "Order Sent to Kitchen",
    subtitle: "Your food is being prepared! Please stay on this screen to track progress.",
    stages: {
      received: { label: "Order Received", desc: "Sent to kitchen display" },
      preparing: { label: "Preparing in Kitchen", desc: "Chef is cooking your meal" },
      ready: { label: "Ready / Served", desc: "Food is on its way to your table!" },
    },
  },
};

// ============================================================================
// SECTION 5: PLATFORM ADMIN PANEL CONTENT
// ============================================================================
export const ADMIN_PANEL_CONTENT = {
  header: {
    title: "NextDine SaaS Platform Control",
    subtitle: "Manage restaurant onboarding applications, active subscriptions, and system metrics.",
  },
  sidebar: {
    pendingRequests: "Pending Approvals",
    restaurants: "Registered Outlets",
    analytics: "Platform Analytics",
    logout: "Admin Logout",
  },
};

/** Default Export containing all centralized admin content */
export default {
  BRAND_CONFIG,
  LANDING_PAGE_CONTENT,
  RESTAURANT_DASHBOARD_CONTENT,
  CUSTOMER_ORDERING_CONTENT,
  ADMIN_PANEL_CONTENT,
};
