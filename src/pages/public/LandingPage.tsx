import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Store,
  Menu as MenuIcon,
  X,
  Zap,
  ShieldCheck,
  ChefHat,
  Flame,
  Sparkles,
  QrCode,
  Calculator,
  Clock,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Plus,
  CheckCircle2,
  DollarSign,
} from "lucide-react";
import { Button, Badge } from "../../components/ui";
import { BRAND_CONFIG, LANDING_PAGE_CONTENT } from "../../config/adminContent";

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Live Demo Playground State
  const [demoRestaurantName, setDemoRestaurantName] = useState("Royal Spice Bistro");
  const [selectedTableNum, setSelectedTableNum] = useState(4);
  const [cartItems, setCartItems] = useState<
    { id: string; name: string; price: number; qty: number }[]
  >([
    { id: "1", name: "Paneer Butter Masala", price: 260, qty: 2 },
    { id: "2", name: "Butter Naan", price: 40, qty: 4 },
  ]);

  const [liveKdsOrder, setLiveKdsOrder] = useState<{
    id: string;
    table: number;
    items: { name: string; qty: number }[];
    total: number;
    status: "pending" | "preparing" | "ready";
    time: string;
  } | null>({
    id: "#104",
    table: 4,
    items: [
      { name: "Paneer Butter Masala", qty: 2 },
      { name: "Butter Naan", qty: 4 },
    ],
    total: 680,
    status: "pending",
    time: "Just now",
  });

  const [orderSentToast, setOrderSentToast] = useState(false);

  // Interactive ROI Calculator State
  const [calcTables, setCalcTables] = useState(15);
  const [calcDailyOrders, setCalcDailyOrders] = useState(75);
  const [calcAvgOrderValue, setCalcAvgOrderValue] = useState(450);

  // Interactive FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Helper calculations for ROI
  const monthlyGrossSales = calcDailyOrders * calcAvgOrderValue * 30;
  const aggregatorCommissionSaved = Math.round(monthlyGrossSales * 0.22);
  const minutesSavedPerDay = Math.round(calcDailyOrders * 8);

  const menuCatalogDemo = [
    { id: "1", name: "Paneer Butter Masala", price: 260, category: "Mains" },
    { id: "2", name: "Butter Naan", price: 40, category: "Breads" },
    { id: "3", name: "Cold Coffee", price: 120, category: "Beverages" },
    { id: "4", name: "Wood-Fired Margherita", price: 340, category: "Starters" },
  ];

  const handleAddItemToCart = (item: { id: string; name: string; price: number }) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (!existing) return prev;
      if (existing.qty > 1) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleSendOrderToKitchen = () => {
    if (cartItems.length === 0) return;
    const total = cartItems.reduce((acc, curr) => acc + curr.price * curr.qty, 0);

    setLiveKdsOrder({
      id: `#${Math.floor(100 + Math.random() * 900)}`,
      table: selectedTableNum,
      items: cartItems.map((i) => ({ name: i.name, qty: i.qty })),
      total,
      status: "pending",
      time: "Just now",
    });

    setOrderSentToast(true);
    setTimeout(() => setOrderSentToast(false), 3000);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 selection:bg-amber-500/30 selection:text-amber-900 font-sans antialiased overflow-x-hidden">
      {/* Soothing Background Pattern & Warm Atmospheric Gradient Flares */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-grid-pattern opacity-60" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-amber-500/10 via-orange-400/5 to-transparent blur-[140px] rounded-full pointer-events-none z-0 animate-pulse-glow" />

      {/* Top Header Navbar — Premium Glassmorphism Navbar */}
      <nav className="border-b border-white/20 sticky top-0 bg-stone-950/40 backdrop-blur-2xl z-50 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-amber-400 p-1.5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden border border-white/30">
                <img src={BRAND_CONFIG.logoUrl} alt={BRAND_CONFIG.appName} className="w-full h-full object-contain brightness-0 filter" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5 drop-shadow-sm">
                  {BRAND_CONFIG.appName}
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                </span>
                <span className="text-[10px] font-extrabold text-amber-300 tracking-wider uppercase -mt-1 hidden sm:block">
                  Smart Restaurant Operations
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links — Glass Pills */}
            <div className="hidden md:flex items-center space-x-2 bg-white/10 p-1.5 rounded-full border border-white/20 backdrop-blur-xl shadow-inner">
              <a
                href="#how-it-works"
                className="text-xs font-bold text-stone-200 hover:text-white hover:bg-white/15 px-4 py-2 rounded-full transition-all backdrop-blur-md"
              >
                How it works
              </a>
              <a
                href="#features"
                className="text-xs font-bold text-stone-200 hover:text-white hover:bg-white/15 px-4 py-2 rounded-full transition-all backdrop-blur-md"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-xs font-bold text-stone-200 hover:text-white hover:bg-white/15 px-4 py-2 rounded-full transition-all backdrop-blur-md"
              >
                Dashboard
              </a>
              <Link
                to="/login"
                className="text-xs font-bold text-stone-200 hover:text-white hover:bg-white/15 px-4 py-2 rounded-full transition-all backdrop-blur-md"
              >
                Sign in
              </Link>
              <Link to="/register">
                <button
                  className="bg-white hover:bg-stone-100 text-stone-950 font-extrabold shadow-lg hover:scale-105 transition-all rounded-full px-5 py-2 text-xs border border-white/60"
                >
                  Get started
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 px-3 space-y-2 border-t border-white/20 bg-stone-950/80 backdrop-blur-2xl rounded-b-2xl shadow-2xl text-white">
              <a
                href="#how-it-works"
                className="block px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-white hover:bg-white/10 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </a>
              <a
                href="#features"
                className="block px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-white hover:bg-white/10 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-white hover:bg-white/10 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </a>
              <Link
                to="/login"
                className="block px-3 py-2.5 text-sm font-semibold text-stone-200 hover:text-white hover:bg-white/10 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="block pt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <button className="w-full bg-white text-stone-900 font-bold py-3 rounded-full shadow-lg">
                  Get started
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section — Classic Dark Monochrome Luxury Building Architecture */}
      <section className="relative py-24 md:py-36 overflow-hidden min-h-[92vh] flex items-center justify-center z-10 bg-stone-950">
        {/* Classic Monochrome Dark Luxury Restaurant Building Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/classic_dark_bg.jpg"
            alt="Classic Luxury Monochrome Restaurant Architecture"
            className="w-full h-full object-cover object-center scale-100 filter brightness-90 contrast-110"
          />
          {/* Subtle Dark Vignette & Gradient Overlays for High Contrast & Readable Text */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/60 pointer-events-none" />
        </div>

        {/* Hero Content — Sitting Directly on Background */}
        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4">
          {/* Glassmorphic Pill Badge */}
          <div className="inline-flex items-center space-x-2.5 px-4.5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 text-white text-xs font-semibold shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] text-stone-200 font-extrabold">QR ORDERING · BUILT FOR REAL SERVICE</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-3xl mx-auto drop-shadow-lg">
            Every table,<br />
            one scan{" "}
            <span className="text-amber-400 relative inline-block">
              away.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-400/90" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="4">
                <path d="M 0 12 Q 50 2 100 12" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-stone-300 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-md">
            NextDine replaces paper menus and manual order-taking with a QR ordering experience your guests love — and a live dashboard your staff can actually run during a Friday rush.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link to="/register" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto bg-[#EAB308] hover:bg-amber-400 text-stone-950 font-extrabold text-base px-8 py-4 rounded-full shadow-2xl shadow-amber-500/25 hover:scale-105 transition-all flex items-center justify-center space-x-2 border border-amber-300/60"
              >
                <span>Start free — no card needed</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </button>
            </Link>

            <a href="#interactive-demo" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-xl font-bold text-base px-8 py-4 rounded-full transition-all shadow-xl"
              >
                See how it works
              </button>
            </a>
          </div>

          {/* Trust proof line below buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-stone-300 font-semibold drop-shadow-sm">
            <div className="flex items-center space-x-1">
              <span className="text-amber-400 font-bold tracking-wider">★★★★★</span>
              <span>Loved by restaurant teams</span>
            </div>
            <span className="hidden sm:inline text-stone-500">•</span>
            <div>Set up your menu in an afternoon</div>
            <span className="hidden sm:inline text-stone-500">•</span>
            <div className="flex items-center space-x-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Works on any phone</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DISH SHOWCASE SECTION (Ref: Screenshots 1, 2, & 3) */}
      <section className="py-20 bg-white border-b border-stone-200 relative">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 bg-red-50 px-3.5 py-1 rounded-full border border-red-100">
              Gourmet Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Best Catering & Dining Showcase
            </h2>
            <p className="text-sm text-stone-500">
              Discover high-resolution visual menus with instant QR ordering, category filters, and dish customizations.
            </p>
          </div>

          {/* Sample Dish Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                id: 'hero-1',
                name: 'Huron Honey-Apple Chicken',
                price: 18.99,
                category: 'Chinese',
                description: 'Crispy fried chicken wings glazed with Huron apple honey reduction.',
                image_url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
                prep_time: '18',
                rating: 4.9,
              },
              {
                id: 'hero-2',
                name: 'Cheeseburger & Fries Combo',
                price: 12.99,
                category: 'Snacks',
                description: 'Double beef burger with melted cheese, lettuce, and crispy fries.',
                image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
                prep_time: '10',
                rating: 4.8,
              },
              {
                id: 'hero-3',
                name: 'Fluffy Golden Pancakes',
                price: 2.00,
                category: 'Breakfast',
                description: 'Fluffy pancakes served fresh every morning with organic syrup.',
                image_url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
                prep_time: '10',
                rating: 4.9,
              },
              {
                id: 'hero-4',
                name: 'Central Gyros Deluxe',
                price: 14.99,
                category: 'Snacks',
                description: 'Authentic warm pita wrap with seasoned meat and tzatziki sauce.',
                image_url: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
                prep_time: '12',
                rating: 4.8,
              }
            ].map((dish) => (
              <div key={dish.id} className="bg-[#FAF8F5] rounded-3xl p-4 border border-stone-200/80 hover:shadow-lg transition-all duration-300 group">
                <div className="relative h-44 mb-3 rounded-2xl overflow-hidden bg-white p-2 flex items-center justify-center">
                  <img
                    src={dish.image_url}
                    alt={dish.name}
                    className="h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-xs">
                    ${dish.price.toFixed(2)}
                  </span>
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-1 line-clamp-1">{dish.name}</h3>
                <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed mb-3">{dish.description}</p>
                <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs">
                  <span className="text-stone-400 font-semibold">⏱ {dish.prep_time} min</span>
                  <Link to="/customer/menu" className="text-red-600 font-extrabold hover:underline">
                    Order Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE LIVE QR GENERATOR & KITCHEN STREAM PLAYGROUND */}
      <section id="interactive-demo" className="py-24 bg-[#F5F3EE] border-b border-stone-200/80 relative overflow-hidden z-10">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-300 text-amber-900 text-xs font-extrabold">
              <Sparkles className="w-4 h-4 text-amber-700 animate-spin" />
              <span>Interactive Live Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
              Test NextDine Right Now
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Customize your restaurant name, click menu items on the simulated phone, and watch your order pop up instantly on the Kitchen Display System below!
            </p>
          </div>

          {/* 3-Panel Interactive Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* Panel 1: Table QR Generator Widget */}
            <div className="lg:col-span-4 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center space-x-2">
                  <QrCode className="w-5 h-5 text-amber-700" />
                  <span className="font-extrabold text-sm text-stone-900">1. Table QR Creator</span>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  Live Generator
                </span>
              </div>

              {/* Outlet Inputs */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-bold mb-1">Outlet / Brand Name</label>
                  <input
                    type="text"
                    value={demoRestaurantName}
                    onChange={(e) => setDemoRestaurantName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-stone-900 font-bold focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-bold mb-1">Select Dining Table Number</label>
                  <div className="flex gap-2">
                    {[2, 4, 8, 12].map((tableNum) => (
                      <button
                        key={tableNum}
                        onClick={() => setSelectedTableNum(tableNum)}
                        className={`flex-1 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                          selectedTableNum === tableNum
                            ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                            : "bg-stone-100 text-stone-700 border border-stone-300 hover:bg-stone-200"
                        }`}
                      >
                        T-{tableNum}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated QR Box */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-center space-y-3 flex flex-col items-center">
                <div className="bg-white p-3 rounded-2xl shadow-md border-4 border-amber-400/40">
                  {/* Inline Sharp Vector QR Graphics */}
                  <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white" />
                    {/* Position Outer Boxes */}
                    <rect x="5" y="5" width="30" height="30" rx="4" fill="#1C1917" />
                    <rect x="10" y="10" width="20" height="20" rx="2" fill="white" />
                    <rect x="15" y="15" width="10" height="10" fill="#D97706" />

                    <rect x="65" y="5" width="30" height="30" rx="4" fill="#1C1917" />
                    <rect x="70" y="10" width="20" height="20" rx="2" fill="white" />
                    <rect x="75" y="15" width="10" height="10" fill="#D97706" />

                    <rect x="5" y="65" width="30" height="30" rx="4" fill="#1C1917" />
                    <rect x="10" y="70" width="20" height="20" rx="2" fill="white" />
                    <rect x="15" y="75" width="10" height="10" fill="#D97706" />

                    {/* Data Pixels pattern */}
                    <rect x="40" y="10" width="8" height="8" fill="#1C1917" />
                    <rect x="52" y="10" width="8" height="8" fill="#1C1917" />
                    <rect x="40" y="25" width="8" height="8" fill="#D97706" />
                    <rect x="40" y="40" width="8" height="8" fill="#1C1917" />
                    <rect x="52" y="52" width="8" height="8" fill="#1C1917" />
                    <rect x="25" y="45" width="8" height="8" fill="#1C1917" />
                    <rect x="65" y="45" width="8" height="8" fill="#D97706" />
                    <rect x="75" y="55" width="8" height="8" fill="#1C1917" />
                    <rect x="45" y="75" width="8" height="8" fill="#1C1917" />
                    <rect x="60" y="65" width="8" height="8" fill="#1C1917" />
                    <rect x="75" y="75" width="10" height="10" fill="#D97706" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-black text-stone-900">{demoRestaurantName}</p>
                  <p className="text-[11px] text-amber-800 font-bold">Table #{selectedTableNum} • Scan & Order</p>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <div className="flex items-center space-x-1.5 text-stone-800 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bound to Table #{selectedTableNum} context</span>
                </div>
                <p>Orders sent from this QR automatically display Table #{selectedTableNum} in the kitchen.</p>
              </div>
            </div>

            {/* Panel 2: Customer Phone Ordering Simulator */}
            <div className="lg:col-span-4 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-5 shadow-md relative">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-5 h-5 text-amber-700" />
                  <span className="font-extrabold text-sm text-stone-900">2. Customer Phone View</span>
                </div>
                <span className="text-[10px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-300">
                  Table #{selectedTableNum}
                </span>
              </div>

              {/* Toast Notification */}
              {orderSentToast && (
                <div className="absolute top-16 left-4 right-4 bg-emerald-600 text-white p-3 rounded-xl shadow-lg text-xs font-extrabold flex items-center justify-between z-20 animate-bounce">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Order Streamed to Kitchen!</span>
                  </div>
                  <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded">0.2s</span>
                </div>
              )}

              {/* Customer Menu Interface */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3 min-h-[380px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2.5 mb-3">
                    <div>
                      <h4 className="font-black text-xs text-stone-900 truncate">{demoRestaurantName}</h4>
                      <p className="text-[10px] text-stone-500">Digital Menu • Table #{selectedTableNum}</p>
                    </div>
                    <Badge variant="neutral">Self Order</Badge>
                  </div>

                  {/* Menu Items List */}
                  <div className="space-y-2 max-h-[220px] overflow-y-auto no-scrollbar pr-1">
                    {menuCatalogDemo.map((item) => {
                      const inCart = cartItems.find((c) => c.id === item.id);
                      return (
                        <div
                          key={item.id}
                          className="bg-white p-2.5 rounded-xl border border-stone-200 flex items-center justify-between text-xs hover:border-stone-300 transition-colors shadow-xs"
                        >
                          <div>
                            <p className="font-bold text-stone-900 text-xs">{item.name}</p>
                            <p className="text-amber-800 font-extrabold text-[11px]">₹{item.price}</p>
                          </div>
                          {inCart ? (
                            <div className="flex items-center space-x-2 bg-amber-50 border border-amber-300 px-2 py-1 rounded-lg">
                              <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="text-amber-900 font-bold px-1"
                              >
                                -
                              </button>
                              <span className="text-amber-950 font-black text-xs">{inCart.qty}</span>
                              <button
                                onClick={() => handleAddItemToCart(item)}
                                className="text-amber-900 font-bold px-1"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleAddItemToCart(item)}
                              className="bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Cart Action Button */}
                <div className="pt-2 border-t border-stone-200">
                  <button
                    onClick={handleSendOrderToKitchen}
                    disabled={cartItems.length === 0}
                    className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white p-3 rounded-xl flex items-center justify-between text-xs font-black shadow-md shadow-amber-600/20 transition-all active:scale-95"
                  >
                    <span>Send Order to Kitchen</span>
                    <span>₹{cartTotal} →</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Panel 3: Kitchen Display System (KDS) Stream View */}
            <div className="lg:col-span-4 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-5 shadow-md relative">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <ChefHat className="w-5 h-5 text-emerald-700" />
                  <span className="font-extrabold text-sm text-stone-900">3. Kitchen Display (KDS)</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>

              {/* Kitchen Live Order Ticket */}
              {liveKdsOrder ? (
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-sm text-stone-900">{liveKdsOrder.id}</span>
                        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                          Table #{liveKdsOrder.table}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 mt-0.5">{liveKdsOrder.time} • Dine-In</p>
                    </div>
                    <Badge
                      variant={
                        liveKdsOrder.status === "pending"
                          ? "warning"
                          : liveKdsOrder.status === "preparing"
                          ? "primary"
                          : "success"
                      }
                    >
                      {liveKdsOrder.status.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-2 text-xs">
                    <p className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">Ordered Items:</p>
                    {liveKdsOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-stone-800 font-semibold bg-white px-2.5 py-1.5 rounded-lg border border-stone-200">
                        <span>{item.name}</span>
                        <span className="text-amber-800 font-extrabold">x{item.qty}</span>
                      </div>
                    ))}
                  </div>

                  {/* Kitchen Action Controls */}
                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => setLiveKdsOrder({ ...liveKdsOrder, status: "preparing" })}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                        liveKdsOrder.status === "preparing"
                          ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                          : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                      }`}
                    >
                      🍳 Cooking
                    </button>
                    <button
                      onClick={() => setLiveKdsOrder({ ...liveKdsOrder, status: "ready" })}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                        liveKdsOrder.status === "ready"
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                          : "bg-stone-200 text-stone-700 hover:bg-stone-300"
                      }`}
                    >
                      ✅ Serve
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-stone-50 rounded-2xl p-8 text-center text-stone-500 text-xs border border-stone-200">
                  No active orders right now. Click "Send Order to Kitchen" on the phone simulator!
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE ROI & SAVINGS CALCULATOR */}
      <section id="roi-calculator" className="py-24 bg-[#FAF8F5] border-b border-stone-200/80 relative z-10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-300 text-stone-800 text-xs font-extrabold">
              <Calculator className="w-4 h-4 text-stone-700" />
              <span>Interactive ROI Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
              Calculate Your Monthly Savings
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Adjust the sliders to match your restaurant outlet's capacity and see how much profit you keep with NextDine's flat ₹999/mo plan.
            </p>
          </div>

          <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-lg grid lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Input Side */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-stone-700">Dining Tables in Outlet:</span>
                  <span className="text-amber-800 font-extrabold text-base">{calcTables} Tables</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={calcTables}
                  onChange={(e) => setCalcTables(parseInt(e.target.value))}
                  className="w-full accent-amber-600 bg-stone-200 h-2.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-stone-700">Daily Order Count:</span>
                  <span className="text-amber-800 font-extrabold text-base">{calcDailyOrders} Orders / Day</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="5"
                  value={calcDailyOrders}
                  onChange={(e) => setCalcDailyOrders(parseInt(e.target.value))}
                  className="w-full accent-amber-600 bg-stone-200 h-2.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-stone-700">Average Order Value (AOV):</span>
                  <span className="text-amber-800 font-extrabold text-base">₹{calcAvgOrderValue}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1500"
                  step="25"
                  value={calcAvgOrderValue}
                  onChange={(e) => setCalcAvgOrderValue(parseInt(e.target.value))}
                  className="w-full accent-amber-600 bg-stone-200 h-2.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Results Side */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-50/50 border border-amber-300 rounded-2xl p-6 space-y-5 text-center shadow-sm">
              <div>
                <p className="text-xs uppercase font-extrabold text-amber-900 tracking-wider">Estimated Monthly Commission Savings</p>
                <p className="text-4xl sm:text-5xl font-black text-stone-900 mt-1">
                  ₹{aggregatorCommissionSaved.toLocaleString("en-IN")}
                </p>
                <p className="text-[11px] text-stone-600 mt-1">Saved vs 22% aggregator commission fees</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-stone-200 text-left">
                <div className="bg-white p-3 rounded-xl border border-stone-200">
                  <p className="text-[10px] text-stone-500 font-bold uppercase">Time Saved Daily</p>
                  <p className="text-base font-extrabold text-emerald-700 mt-0.5">
                    ~{Math.round(minutesSavedPerDay / 60)} Hours
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-stone-200">
                  <p className="text-[10px] text-stone-500 font-bold uppercase">NextDine Fee</p>
                  <p className="text-base font-extrabold text-amber-800 mt-0.5">
                    Flat ₹999/mo
                  </p>
                </div>
              </div>

              <Link to="/register" className="block pt-2">
                <Button fullWidth variant="primary" className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl shadow-sm">
                  Claim Your Savings Now →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: VISUAL BENTO GRID FEATURES */}
      <section id="features" className="py-24 bg-[#F5F3EE] border-b border-stone-200/80 relative z-10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 block">
              Full Spectrum Operations
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
              Built For Speed, Accuracy & Revenue
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Every tool required to run a high-volume dine-in restaurant, cafe, or lounge without waiter bottleneck.
            </p>
          </div>

          {/* Bento Layout Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Bento Card 1: Instant Menu Sync (Large 2 Cols) */}
            <div className="md:col-span-2 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-400 transition-all shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-200 text-amber-800 flex items-center justify-center font-black text-xl mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-stone-900 mb-3">1-Tap Out-of-Stock Menu Controls</h3>
                <p className="text-stone-600 text-sm leading-relaxed max-w-xl">
                  Ran out of Chef Special Tandoori Chicken at 9 PM? Switch dish availability from your owner dashboard in 1 click. Scanning customers see disabled items instantly, ending waiter order apologies.
                </p>
              </div>

              <div className="mt-8 bg-stone-50 rounded-2xl p-4 border border-stone-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold text-stone-900">Live Catalog Sync Active</span>
                </div>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Instant 0.1s Propagation
                </span>
              </div>
            </div>

            {/* Bento Card 2: Kitchen Display System */}
            <div className="bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 relative overflow-hidden group hover:border-stone-400 transition-all shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-300 text-stone-800 flex items-center justify-center font-black text-xl mb-6">
                  <ChefHat className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-stone-900 mb-3">Kitchen Display (KDS)</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  High-contrast live order screen for kitchen staff. Color-coded urgency alerts prevent order prep delays.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-bold text-stone-800 flex items-center justify-between">
                <span>Zero Paper Tickets</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Bento Card 3: Zero Commission */}
            <div className="bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-400 transition-all shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-300 text-emerald-800 flex items-center justify-center font-black text-xl mb-6">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-stone-900 mb-3">Zero Transaction Cut</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Keep 100% of your hard-earned revenue. No 25% aggregator commission fees on your dine-in table customers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 text-xs font-bold text-emerald-700 flex items-center justify-between">
                <span>Flat ₹999/mo Forever</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            {/* Bento Card 4: No App Download Needed (Large 2 Cols) */}
            <div className="md:col-span-2 bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 relative overflow-hidden group hover:border-amber-400 transition-all shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-800 flex items-center justify-center font-black text-xl mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-stone-900 mb-3">Zero App Download Friction</h3>
                <p className="text-stone-600 text-sm leading-relaxed max-w-xl">
                  Customers scan the table QR code using their regular phone camera (iPhone or Android). Your digital menu instantly opens in Chrome or Safari without forcing them to register or download apps.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="bg-stone-50 border border-stone-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-700">
                  ✓ Chrome, Safari, Edge Compatible
                </span>
                <span className="bg-stone-50 border border-stone-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-700">
                  ✓ 100% Mobile Optimized
                </span>
                <span className="bg-stone-50 border border-stone-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-700">
                  ✓ Dynamic Session Routing
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: OPERATIONAL ROADMAP (01 -> 02 -> 03) */}
      <section id="how-it-works" className="py-24 bg-[#FAF8F5] border-b border-stone-200/80 relative z-10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 block">
              Simple Onboarding
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
              Launch Digital Ordering in 15 Minutes
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              No complex IT configuration. Simple 3-step operational setup.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {/* Step 01 */}
            <div className="bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 relative flex flex-col justify-between shadow-md hover:border-amber-400 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-800 flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                    <Store className="w-7 h-7" />
                  </div>
                  <span className="text-5xl font-black text-stone-300 group-hover:text-amber-500/30 transition-colors">
                    01
                  </span>
                </div>

                <div className="inline-block bg-amber-50 text-amber-900 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-amber-200 mb-3">
                  Step 01 • Menu Setup
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 mb-3">
                  Create Account & Add Menu
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                  Register your outlet in 2 minutes. Add categories, food items, prices, and dish descriptions. Toggle dish availability on demand.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-200 text-xs text-stone-700 font-semibold">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>5-Minute Menu Catalog Upload</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Instant Availability Toggles</span>
                </div>
              </div>

              <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-md border border-amber-400">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 relative flex flex-col justify-between shadow-md hover:border-stone-400 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-stone-100 border border-stone-300 text-stone-800 flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <span className="text-5xl font-black text-stone-300 group-hover:text-stone-400 transition-colors">
                    02
                  </span>
                </div>

                <div className="inline-block bg-stone-100 text-stone-800 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-stone-300 mb-3">
                  Step 02 • Table QRs
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 mb-3">
                  Download & Print Table QRs
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                  Generate table-bound QR codes with 1 click. Print and place them on your dining tables or acrylic stands.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-200 text-xs text-stone-700 font-semibold">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Automatic Table Session Routing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>High-Res Printable PDFs</span>
                </div>
              </div>

              <div className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20">
                <div className="w-10 h-10 rounded-full bg-stone-800 text-white flex items-center justify-center shadow-md border border-stone-600">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="bg-white/95 backdrop-blur-xl border border-stone-200 rounded-3xl p-8 relative flex flex-col justify-between shadow-md hover:border-emerald-400 transition-all group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-300 text-emerald-800 flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                    <ChefHat className="w-7 h-7" />
                  </div>
                  <span className="text-5xl font-black text-stone-300 group-hover:text-emerald-500/30 transition-colors">
                    03
                  </span>
                </div>

                <div className="inline-block bg-emerald-50 text-emerald-900 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-emerald-200 mb-3">
                  Step 03 • Kitchen Sync
                </div>
                <h3 className="text-xl font-extrabold text-stone-900 mb-3">
                  Live Kitchen Sync & Serve
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed mb-6 font-normal">
                  Guests scan table QRs and order. Dishes stream instantly to your Kitchen Display Screen for instant cooking.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-200 text-xs text-stone-700 font-semibold">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Instant 0.2s Kitchen Stream</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Zero Misplaced Orders</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: PRICING CARD */}
      <section id="pricing" className="py-24 bg-[#F5F3EE] relative z-10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 block">
              {LANDING_PAGE_CONTENT.pricing.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
              {LANDING_PAGE_CONTENT.pricing.title}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              {LANDING_PAGE_CONTENT.pricing.subtitle}
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white/95 border-2 border-amber-500/60 rounded-3xl p-8 sm:p-12 shadow-xl relative backdrop-blur-2xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-5 py-1 rounded-full text-xs font-black tracking-wide uppercase shadow-md border border-amber-400">
              ⚡ Done-For-You Outlet Setup
            </div>

            {/* Price Display */}
            <div className="text-center mb-8 border-b border-stone-200 pb-8 space-y-3">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl sm:text-6xl font-black text-stone-900">₹999</span>
                <span className="text-base font-bold text-stone-500 ml-2">/ month</span>
              </div>

              {/* One-Time Setup Fee Badge */}
              <div className="inline-flex items-center space-x-2 bg-amber-50 border border-amber-300 px-4 py-2 rounded-xl text-amber-900 text-xs font-extrabold shadow-xs">
                <span>+ ₹2,999</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>One-Time Setup & Onboarding Fee</span>
              </div>

              <p className="text-xs text-stone-500 font-medium pt-1">
                Everything is configured and uploaded by our dedicated team for your restaurant!
              </p>
            </div>

            {/* Included Features */}
            <div className="space-y-3.5 mb-8">
              <p className="text-xs font-black uppercase text-amber-900 tracking-wider mb-2">Included In Your Package:</p>
              {LANDING_PAGE_CONTENT.pricing.featuresIncluded.map((feature, i) => (
                <div key={i} className="flex items-center text-xs sm:text-sm font-bold text-stone-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/register" className="w-full">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                className="bg-stone-900 hover:bg-stone-800 text-white font-extrabold py-4 rounded-xl shadow-lg border border-stone-800 text-base hover:scale-[1.02] transition-all"
              >
                Register & Get Started Now →
              </Button>
            </Link>

            <p className="text-center text-[11px] text-stone-500 mt-4 font-medium">
              Setup completed within 24 hours. Our team contacts you immediately after registration.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section id="faq" className="py-24 bg-[#FAF8F5] border-b border-stone-200/80 relative z-10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 block">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {LANDING_PAGE_CONTENT.faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-extrabold text-stone-900 hover:text-amber-800 transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-700 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-400 flex-shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 border-t border-stone-200/60 pt-3 leading-relaxed font-medium">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 8: BOTTOM CTA BANNER */}
      <section className="py-20 bg-gradient-to-br from-amber-500/10 via-orange-400/5 to-[#FAF8F5] relative overflow-hidden border-t border-amber-300/40 z-10">
        <div className="container-custom max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
            Ready to Streamline Your Restaurant Table Orders?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
            Join modern restaurants, cafes, and lounges serving faster meals with zero waiter error.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <Button
                size="lg"
                variant="primary"
                className="bg-stone-900 hover:bg-stone-800 text-white font-extrabold px-10 py-4 rounded-2xl shadow-lg text-base border border-stone-800 hover:scale-105 transition-all"
              >
                Register Your Restaurant Now →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-200/80 bg-[#F0EEE9] py-12 relative z-10">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-stone-600 gap-4">
            <div className="flex items-center space-x-3">
              <img src={BRAND_CONFIG.logoUrl} alt={BRAND_CONFIG.appName} className="w-7 h-7 object-contain" />
              <span className="font-black text-stone-900 text-sm">{BRAND_CONFIG.appName}</span>
              <span>© {new Date().getFullYear()} NextDine. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-6 font-bold text-stone-700">
              <Link to="/login" className="hover:text-amber-800 transition-colors">
                Owner Sign In
              </Link>
              <Link to="/admin/login" className="hover:text-amber-800 transition-colors">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
