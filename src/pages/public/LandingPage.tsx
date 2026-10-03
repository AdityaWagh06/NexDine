import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Store,
  Menu as MenuIcon,
  X,
  Zap,
  ChefHat,
  Sparkles,
  QrCode,
  Calculator,
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

      {/* Taverna Style Header Navbar */}
      <header className="bg-[#374953] text-white border-b border-white/10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          {/* Left Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-stone-200">
            <a href="#how-it-works" className="hover:text-white transition-colors">Menu</a>
            <a href="#interactive-demo" className="hover:text-white transition-colors">Interactive Demo</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
          </div>

          {/* Centered Brand Logo (Ref: Taverna Layout) */}
          <Link to="/" className="flex flex-col items-center justify-center text-center group mx-auto md:mx-0">
            <span className="text-xl sm:text-2xl font-serif tracking-[0.25em] text-white font-normal uppercase leading-tight group-hover:text-amber-200 transition-colors">
              NEXTDINE
            </span>
            <span className="text-[9px] font-sans tracking-[0.35em] text-stone-300 uppercase -mt-0.5">
              RESTAURANT
            </span>
          </Link>

          {/* Right Navigation Links & CTA */}
          <div className="hidden md:flex items-center space-x-6 text-xs font-semibold uppercase tracking-wider text-stone-200">
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <Link to="/login" className="hover:text-white transition-colors">Sign in</Link>
            <Link to="/register">
              <button className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-xs px-4 py-2 rounded-full shadow-md transition-all uppercase tracking-wider">
                Start Free
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-amber-300 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#2D3C44] px-6 py-4 space-y-3 border-t border-white/10 text-xs uppercase font-semibold text-stone-200">
            <a href="#how-it-works" className="block hover:text-white" onClick={() => setMobileMenuOpen(false)}>Menu</a>
            <a href="#interactive-demo" className="block hover:text-white" onClick={() => setMobileMenuOpen(false)}>Interactive Demo</a>
            <a href="#features" className="block hover:text-white" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" className="block hover:text-white" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <Link to="/login" className="block hover:text-white" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
            <Link to="/register" className="block pt-2">
              <button className="w-full bg-amber-400 text-stone-950 font-extrabold py-2.5 rounded-full text-xs uppercase tracking-wider">
                Start Free Trial
              </button>
            </Link>
          </div>
        )}
      </header>

      {/* Hero Section — Taverna Full-Bleed Restaurant Interior Aesthetic */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden text-center z-10 bg-stone-950">
        {/* Full-bleed Luxury Restaurant Photography Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/taverna_hero_bg.jpg"
            alt="Taverna Luxury Restaurant Interior"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105 scale-105"
          />
          {/* Subtle contrast overlay matching reference screenshot */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C2830]/60 via-[#141E24]/35 to-[#0F171C]/75" />
        </div>

        {/* Center Hero Title Container */}
        <div className="container-custom relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-20 space-y-6">
          
          {/* Ambient SaaS Pill Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xl">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Next-Gen Table Dining OS</span>
          </div>

          {/* Main Short Elegant Title */}
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white uppercase drop-shadow-2xl leading-none">
              NEXT<span className="text-amber-400">DINE</span>
            </h1>
            <p className="text-xs sm:text-lg font-sans tracking-[0.3em] text-stone-200 font-extrabold uppercase drop-shadow-md">
              SMART QR ORDERING & KITCHEN SYSTEM
            </p>
          </div>

          {/* Subhead */}
          <p className="text-sm sm:text-lg text-stone-300 max-w-xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Streamline table service, remove waiter bottlenecks, and double kitchen speed with zero app downloads.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link to="/register" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto bg-white hover:bg-stone-100 text-stone-950 font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all border border-white"
              >
                Start Free Trial
              </button>
            </Link>

            <a href="#interactive-demo" className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/40 text-white font-bold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all"
              >
                Explore Platform
              </button>
            </a>
          </div>

          {/* Trust proof line */}
          <div className="pt-6 flex items-center justify-center space-x-6 text-xs text-stone-300 font-semibold drop-shadow-sm">
            <span>★★★★★ Rated 4.9/5</span>
            <span>•</span>
            <span>450+ Active Outlets</span>
            <span>•</span>
            <span>Works On Any Phone</span>
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

          {/* 3 Continuous Side-by-Side Realistic iPhones Showcase Grid */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto pt-4">
            
            {/* iPhone 1: Table QR Scan & Welcome View */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  1. Scan Table QR
                </span>
              </div>
              <div className="w-full max-w-[300px] h-[540px] bg-stone-950 p-3 rounded-[44px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] border-[4px] border-stone-800 relative flex flex-col justify-between">
                {/* Dynamic Island */}
                <div className="w-22 h-4.5 bg-black rounded-full mx-auto absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-end px-2 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-stone-900 border border-stone-800" />
                </div>

                {/* iPhone Inner Screen */}
                <div className="bg-[#FAF8F5] rounded-[34px] overflow-hidden pt-6 pb-3 px-3 text-stone-900 border border-stone-200 h-full flex flex-col justify-between shadow-inner">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-2 text-[10px] text-stone-500 font-bold mb-1">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <span>5G</span>
                      <div className="w-3.5 h-2 bg-stone-800 rounded-xs" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-center pb-2 border-b border-stone-200">
                        <h4 className="font-black text-xs text-stone-900">{demoRestaurantName}</h4>
                        <p className="text-[9px] text-stone-500 font-semibold">Table #{selectedTableNum} • Welcome</p>
                      </div>

                      {/* Outlet & Table Control */}
                      <div className="mt-3 space-y-2 text-[10px]">
                        <div>
                          <label className="block text-stone-600 font-bold mb-1">Outlet Name</label>
                          <input
                            type="text"
                            value={demoRestaurantName}
                            onChange={(e) => setDemoRestaurantName(e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1 text-stone-900 font-bold text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-600 font-bold mb-1">Selected Table</label>
                          <div className="grid grid-cols-4 gap-1">
                            {[2, 4, 8, 12].map((tableNum) => (
                              <button
                                key={tableNum}
                                onClick={() => setSelectedTableNum(tableNum)}
                                className={`py-1 rounded-lg font-extrabold text-[10px] transition-all ${
                                  selectedTableNum === tableNum
                                    ? "bg-amber-600 text-white"
                                    : "bg-stone-100 text-stone-700 border border-stone-200"
                                }`}
                              >
                                T-{tableNum}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Interactive Hologram QR Card inside iPhone */}
                      <div className="mt-3 bg-white p-3 rounded-2xl border border-stone-200 text-center shadow-sm space-y-2 flex flex-col items-center">
                        <div className="p-2 bg-amber-50 rounded-xl border border-amber-200">
                          <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
                            <rect width="100" height="100" fill="white" />
                            <rect x="5" y="5" width="30" height="30" rx="4" fill="#1C1917" />
                            <rect x="10" y="10" width="20" height="20" rx="2" fill="white" />
                            <rect x="15" y="15" width="10" height="10" fill="#D97706" />
                            <rect x="65" y="5" width="30" height="30" rx="4" fill="#1C1917" />
                            <rect x="70" y="10" width="20" height="20" rx="2" fill="white" />
                            <rect x="75" y="15" width="10" height="10" fill="#D97706" />
                            <rect x="5" y="65" width="30" height="30" rx="4" fill="#1C1917" />
                            <rect x="10" y="70" width="20" height="20" rx="2" fill="white" />
                            <rect x="15" y="75" width="10" height="10" fill="#D97706" />
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
                          </svg>
                        </div>
                        <p className="text-[10px] font-extrabold text-amber-900">Scan Table #{selectedTableNum} QR</p>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="w-24 h-1 bg-stone-400 rounded-full mx-auto mt-2" />
                  </div>
                </div>
              </div>
            </div>

            {/* iPhone 2: Interactive Menu & Cart Ordering View (Highlighted Center) */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  2. Select & Order Menu
                </span>
              </div>
              <div className="w-full max-w-[300px] h-[540px] bg-stone-950 p-3 rounded-[44px] shadow-[0_25px_60px_-10px_rgba(217,119,6,0.3)] border-[4px] border-amber-500/60 relative flex flex-col justify-between">
                {/* Dynamic Island */}
                <div className="w-22 h-4.5 bg-black rounded-full mx-auto absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-end px-2 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-stone-900 border border-stone-800" />
                </div>

                {/* Toast Notification */}
                {orderSentToast && (
                  <div className="absolute top-11 left-4 right-4 bg-emerald-600 text-white p-2 rounded-xl shadow-lg text-[10px] font-extrabold flex items-center justify-between z-40 animate-bounce">
                    <div className="flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Order Sent to Kitchen!</span>
                    </div>
                    <span className="text-[9px] bg-emerald-800 px-1 py-0.5 rounded">0.2s</span>
                  </div>
                )}

                {/* iPhone Inner Screen */}
                <div className="bg-[#FAF8F5] rounded-[34px] overflow-hidden pt-6 pb-3 px-3 text-stone-900 border border-stone-200 h-full flex flex-col justify-between shadow-inner">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-2 text-[10px] text-stone-500 font-bold mb-1">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <span>5G</span>
                      <div className="w-3.5 h-2 bg-stone-800 rounded-xs" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-stone-200 pb-1.5 mb-2 px-0.5">
                        <div>
                          <h4 className="font-black text-xs text-stone-900 truncate">{demoRestaurantName}</h4>
                          <p className="text-[9px] text-stone-500">Digital Menu • Table #{selectedTableNum}</p>
                        </div>
                        <Badge variant="neutral" className="text-[9px] px-1.5 py-0.5">Self Order</Badge>
                      </div>

                      {/* Menu Catalog */}
                      <div className="space-y-1.5 max-h-[260px] overflow-y-auto no-scrollbar">
                        {menuCatalogDemo.map((item) => {
                          const inCart = cartItems.find((c) => c.id === item.id);
                          return (
                            <div
                              key={item.id}
                              className="bg-white p-2 rounded-xl border border-stone-200 flex items-center justify-between text-xs shadow-xs"
                            >
                              <div>
                                <p className="font-bold text-stone-900 text-[11px] leading-tight">{item.name}</p>
                                <p className="text-amber-800 font-extrabold text-[10px]">₹{item.price}</p>
                              </div>
                              {inCart ? (
                                <div className="flex items-center space-x-1 bg-amber-50 border border-amber-300 px-1.5 py-0.5 rounded-lg">
                                  <button
                                    onClick={() => handleRemoveFromCart(item.id)}
                                    className="text-amber-900 font-bold px-1 text-xs"
                                  >
                                    -
                                  </button>
                                  <span className="text-amber-950 font-black text-xs">{inCart.qty}</span>
                                  <button
                                    onClick={() => handleAddItemToCart(item)}
                                    className="text-amber-900 font-bold px-1 text-xs"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleAddItemToCart(item)}
                                  className="bg-stone-900 hover:bg-stone-800 text-white text-[9px] font-bold px-2 py-1 rounded-lg transition-colors flex items-center space-x-0.5"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Cart Button & Home Bar */}
                    <div>
                      <button
                        onClick={handleSendOrderToKitchen}
                        disabled={cartItems.length === 0}
                        className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white p-2 rounded-xl flex items-center justify-between text-xs font-black shadow-md shadow-amber-600/20 transition-all active:scale-95"
                      >
                        <span>Send Order to Kitchen</span>
                        <span>₹{cartTotal} →</span>
                      </button>
                      <div className="w-24 h-1 bg-stone-400 rounded-full mx-auto mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* iPhone 3: Live Order Status & Kitchen Ticket Stream View */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  3. Live KDS Ticket Sync
                </span>
              </div>
              <div className="w-full max-w-[300px] h-[540px] bg-stone-950 p-3 rounded-[44px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] border-[4px] border-stone-800 relative flex flex-col justify-between">
                {/* Dynamic Island */}
                <div className="w-22 h-4.5 bg-black rounded-full mx-auto absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-end px-2 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-stone-900 border border-stone-800" />
                </div>

                {/* iPhone Inner Screen */}
                <div className="bg-[#FAF8F5] rounded-[34px] overflow-hidden pt-6 pb-3 px-3 text-stone-900 border border-stone-200 h-full flex flex-col justify-between shadow-inner">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-2 text-[10px] text-stone-500 font-bold mb-1">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <span>5G</span>
                      <div className="w-3.5 h-2 bg-stone-800 rounded-xs" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
                        <div className="flex items-center space-x-1.5">
                          <ChefHat className="w-4 h-4 text-emerald-700" />
                          <span className="font-extrabold text-xs text-stone-900">Kitchen Display</span>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          Live Sync
                        </span>
                      </div>

                      {/* Ticket Details */}
                      {liveKdsOrder ? (
                        <div className="bg-white rounded-xl p-3 border border-stone-200 space-y-3 shadow-xs">
                          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                            <div>
                              <span className="font-black text-xs text-stone-900">{liveKdsOrder.id}</span>
                              <p className="text-[9px] text-amber-800 font-extrabold">Table #{liveKdsOrder.table}</p>
                            </div>
                            <Badge
                              variant={
                                liveKdsOrder.status === "pending"
                                  ? "warning"
                                  : liveKdsOrder.status === "preparing"
                                  ? "primary"
                                  : "success"
                              }
                              className="text-[9px] px-1.5 py-0.5"
                            >
                              {liveKdsOrder.status.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-[11px]">
                            {liveKdsOrder.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center text-stone-800 font-semibold bg-stone-50 px-2 py-1 rounded">
                                <span className="truncate">{item.name}</span>
                                <span className="text-amber-800 font-black ml-1">x{item.qty}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-1 flex gap-1.5">
                            <button
                              onClick={() => setLiveKdsOrder({ ...liveKdsOrder, status: "preparing" })}
                              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                liveKdsOrder.status === "preparing"
                                  ? "bg-amber-600 text-white"
                                  : "bg-stone-100 text-stone-700 border border-stone-200"
                              }`}
                            >
                              🍳 Cooking
                            </button>
                            <button
                              onClick={() => setLiveKdsOrder({ ...liveKdsOrder, status: "ready" })}
                              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                                liveKdsOrder.status === "ready"
                                  ? "bg-emerald-600 text-white"
                                  : "bg-stone-100 text-stone-700 border border-stone-200"
                              }`}
                            >
                              ✅ Serve
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-xl p-4 text-center text-stone-500 text-[10px] border border-stone-200">
                          No active kitchen orders.
                        </div>
                      )}
                    </div>

                    {/* Home Indicator */}
                    <div className="w-24 h-1 bg-stone-400 rounded-full mx-auto mt-2" />
                  </div>
                </div>
              </div>
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
