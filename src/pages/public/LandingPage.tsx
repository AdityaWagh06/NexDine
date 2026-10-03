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
  Star,
  Clock,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Badge } from "../../components/ui";
import { LANDING_PAGE_CONTENT } from "../../config/adminContent";

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Live Demo Playground State
  const [demoRestaurantName, setDemoRestaurantName] = useState("Royal Spice Bistro");
  const [selectedTableNum, setSelectedTableNum] = useState(4);
  const [cartItems, setCartItems] = useState<
    { id: string; name: string; price: number; qty: number }[]
  >([
    { id: "1", name: "Paneer Butter Masala", price: 260, qty: 2 },
    { id: "2", name: "Garlic Butter Naan", price: 45, qty: 4 },
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
      { name: "Garlic Butter Naan", qty: 4 },
    ],
    total: 700,
    status: "pending",
    time: "Just now",
  });

  const [orderSentToast, setOrderSentToast] = useState(false);

  // Interactive Food Showcase Filter State
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");

  // Interactive ROI Calculator State
  const [calcTables, setCalcTables] = useState(15);
  const [calcDailyOrders, setCalcDailyOrders] = useState(80);
  const [calcAvgOrderValue, setCalcAvgOrderValue] = useState(450);

  // Interactive FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Helper calculations for ROI
  const monthlyGrossSales = calcDailyOrders * calcAvgOrderValue * 30;
  const aggregatorCommissionSaved = Math.round(monthlyGrossSales * 0.22);
  const minutesSavedPerDay = Math.round(calcDailyOrders * 8);

  const menuCatalogDemo = [
    { id: "1", name: "Paneer Butter Masala", price: 260, category: "Mains" },
    { id: "2", name: "Garlic Butter Naan", price: 45, category: "Breads" },
    { id: "3", name: "Signature Iced Latte", price: 140, category: "Beverages" },
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

  const showcaseDishes = [
    {
      id: "hero-1",
      name: "Truffle Glazed Chicken Wings",
      price: 18.99,
      category: "Starters",
      description: "Crispy double-cooked chicken wings coated with black truffle butter glaze.",
      image_url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
      prep_time: "14 min",
      rating: 4.9,
    },
    {
      id: "hero-2",
      name: "Smokey Artisanal Burger",
      price: 14.50,
      category: "Mains",
      description: "Aged Angus beef patty with melted cheddar, caramelized onions, and house aioli.",
      image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      prep_time: "12 min",
      rating: 4.8,
    },
    {
      id: "hero-3",
      name: "Wild Berry Maple Soufflé",
      price: 9.99,
      category: "Desserts",
      description: "Fluffy soufflé topped with organic berry compote and powdered sugar.",
      image_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      prep_time: "10 min",
      rating: 4.9,
    },
    {
      id: "hero-4",
      name: "Mediterranean Gyro Bowl",
      price: 16.25,
      category: "Mains",
      description: "Slow-roasted gyro meat served over garlic jasmine rice with tzatziki drizzle.",
      image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
      prep_time: "15 min",
      rating: 4.8,
    },
  ];

  const filteredShowcaseDishes = activeCategoryFilter === "All" 
    ? showcaseDishes 
    : showcaseDishes.filter(d => d.category === activeCategoryFilter);

  return (
    <div className="min-h-screen bg-obsidian text-stone-100 selection:bg-amber-500/30 selection:text-amber-200 font-sans antialiased overflow-x-hidden">
      {/* Background Dot Grid & Radiant Ambient Lights */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dot-grid opacity-50" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] glow-amber-flare blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/3 left-0 w-[600px] h-[600px] glow-emerald-flare blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Floating Glass Navbar */}
      <header className="sticky top-4 z-50 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="glass-obsidian rounded-2xl px-5 py-3 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 font-black text-sm flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              ND
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-wider text-white uppercase leading-none">
                NEXT<span className="text-amber-400">DINE</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-stone-400 uppercase -mt-0.5">
                THE DINING OS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-bold text-stone-300">
            <a href="#interactive-demo" className="hover:text-amber-400 transition-colors">Interactive Demo</a>
            <a href="#features" className="hover:text-amber-400 transition-colors">Bento Features</a>
            <a href="#roi-calculator" className="hover:text-amber-400 transition-colors">ROI Calculator</a>
            <a href="#gourmet-showcase" className="hover:text-amber-400 transition-colors">Menu Catalog</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login" className="text-xs font-extrabold text-stone-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/5 transition-colors">
              Owner Sign In
            </Link>
            <Link to="/register">
              <button className="btn-shimmer bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 transition-all active:scale-95 uppercase tracking-wider">
                Start Free Trial →
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-300 hover:text-amber-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 glass-obsidian rounded-2xl p-5 space-y-3 text-xs font-bold text-stone-200 uppercase tracking-wider animate-fadeIn">
            <a href="#interactive-demo" className="block py-2 hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Interactive Demo</a>
            <a href="#features" className="block py-2 hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Bento Features</a>
            <a href="#roi-calculator" className="block py-2 hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a>
            <a href="#gourmet-showcase" className="block py-2 hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Menu Catalog</a>
            <a href="#pricing" className="block py-2 hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link to="/login" className="w-full text-center py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-extrabold">
                Owner Sign In
              </Link>
              <Link to="/register" className="w-full">
                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section — Outcome-Driven Modern Dark SaaS */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden text-center z-10">
        <div className="container-custom relative z-10 max-w-5xl mx-auto space-y-8 px-4">
          
          {/* Ambient SaaS Pill Badge */}
          <div className="inline-flex items-center space-x-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-2xl backdrop-blur-md animate-float">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>THE NEXT-GEN TABLE DINING OS • TRUSTED BY 450+ OUTLETS</span>
          </div>

          {/* Main Outcome-Focused Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.02] drop-shadow-2xl">
              Transform Your Restaurant Into a <span className="gradient-text-gold">Digital Powerhouse</span>
            </h1>
            <p className="text-sm sm:text-xl font-bold tracking-wide text-stone-300 max-w-3xl mx-auto leading-relaxed">
              Zero waiter error. Zero app downloads for customers. 100% direct dining revenue.
            </p>
          </div>

          {/* Subhead narrative */}
          <p className="text-xs sm:text-base text-stone-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Guests scan table QR codes, explore visual gourmet menus, and order directly from their phone. Orders stream instantly to your Kitchen Display Screen (KDS) in under 0.2s.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
            <Link to="/register" className="w-full sm:w-auto">
              <button className="btn-shimmer w-full sm:w-auto bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs uppercase tracking-widest px-9 py-4 rounded-2xl shadow-2xl shadow-amber-500/30 hover:scale-105 transition-all border border-amber-400/40 flex items-center justify-center space-x-2">
                <span>Launch Your Restaurant Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>

            <a href="#interactive-demo" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/15 text-stone-200 font-extrabold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Try Live Simulator</span>
              </button>
            </a>

            <Link to="/admin/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-2xl transition-all">
                🔑 Super Admin Demo
              </button>
            </Link>
          </div>

          {/* Trust Metrics Ticker */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-obsidian p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-white">450+</span>
              <p className="text-[11px] font-bold text-stone-400 uppercase mt-0.5">Active Outlets</p>
            </div>
            <div className="glass-obsidian p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-emerald-400">0.2s</span>
              <p className="text-[11px] font-bold text-stone-400 uppercase mt-0.5">Kitchen Ticket Sync</p>
            </div>
            <div className="glass-obsidian p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-amber-400">₹0</span>
              <p className="text-[11px] font-bold text-stone-400 uppercase mt-0.5">Aggregator Cut</p>
            </div>
            <div className="glass-obsidian p-4 rounded-2xl text-center">
              <span className="text-2xl font-black text-white">4.9 ★</span>
              <p className="text-[11px] font-bold text-stone-400 uppercase mt-0.5">Owner Satisfaction</p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: INTERACTIVE LIVE QR GENERATOR & KITCHEN STREAM SIMULATOR */}
      <section id="interactive-demo" className="py-24 bg-stone-950 border-y border-white/10 relative overflow-hidden z-10">
        <div className="container-custom relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Interactive Live Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Test NextDine Operational Flow Right Now
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Change the restaurant name, select table numbers, tap items to add to cart, and watch your order stream instantly onto the Kitchen Display Screen below!
            </p>
          </div>

          {/* 3 Continuous Side-by-Side Realistic iPhones Showcase Grid */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto pt-4">
            
            {/* iPhone 1: Table QR Scan & Welcome View */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-[11px] uppercase tracking-wider font-black text-amber-300 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
                  1. Table QR Scan
                </span>
              </div>
              <div className="w-full max-w-[310px] h-[560px] bg-stone-950 p-3 rounded-[46px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] border-[5px] border-stone-800 relative flex flex-col justify-between">
                {/* Dynamic Island */}
                <div className="w-22 h-4.5 bg-black rounded-full mx-auto absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-end px-2 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-stone-900 border border-stone-800" />
                </div>

                {/* iPhone Inner Screen */}
                <div className="bg-[#FAF8F5] rounded-[36px] overflow-hidden pt-6 pb-3 px-3 text-stone-900 border border-stone-200 h-full flex flex-col justify-between shadow-inner">
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
                          <label className="block text-stone-600 font-bold mb-1">Selected Table Stand</label>
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
                          <QRCodeSVG
                            value={`http://localhost:3000/menu/demo?table=${selectedTableNum}`}
                            size={90}
                            bgColor="#ffffff"
                            fgColor="#1c1917"
                          />
                        </div>
                        <p className="text-[10px] font-extrabold text-amber-900">Table #{selectedTableNum} QR Active</p>
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
                <span className="text-[11px] uppercase tracking-wider font-black text-amber-300 bg-amber-500/20 px-3.5 py-1 rounded-full border border-amber-400">
                  2. Select & Order Menu
                </span>
              </div>
              <div className="w-full max-w-[310px] h-[560px] bg-stone-950 p-3 rounded-[46px] shadow-[0_30px_70px_-15px_rgba(245,158,11,0.3)] border-[5px] border-amber-500/70 relative flex flex-col justify-between">
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
                <div className="bg-[#FAF8F5] rounded-[36px] overflow-hidden pt-6 pb-3 px-3 text-stone-900 border border-stone-200 h-full flex flex-col justify-between shadow-inner">
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
                                  className="bg-stone-900 hover:bg-stone-800 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg transition-colors flex items-center space-x-0.5"
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
                        className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white p-2.5 rounded-xl flex items-center justify-between text-xs font-black shadow-md shadow-amber-600/20 transition-all active:scale-95"
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
                <span className="text-[11px] uppercase tracking-wider font-black text-emerald-300 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/30">
                  3. Live KDS Ticket Stream
                </span>
              </div>
              <div className="w-full max-w-[310px] h-[560px] bg-stone-950 p-3 rounded-[46px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] border-[5px] border-stone-800 relative flex flex-col justify-between">
                {/* Dynamic Island */}
                <div className="w-22 h-4.5 bg-black rounded-full mx-auto absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-end px-2 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-stone-900 border border-stone-800" />
                </div>

                {/* iPhone Inner Screen */}
                <div className="bg-[#FAF8F5] rounded-[36px] overflow-hidden pt-6 pb-3 px-3 text-stone-900 border border-stone-200 h-full flex flex-col justify-between shadow-inner">
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

      {/* SECTION 2: GOURMET FOOD SHOWCASE */}
      <section id="gourmet-showcase" className="py-24 bg-obsidian relative border-b border-white/10 z-10">
        <div className="container-custom relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
              Gourmet Experience Catalog
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              High-Resolution Visual Menus
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Deliver appetizing visual food ordering with instant dish modifiers, category filters, and zero waiter latency.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
            {["All", "Starters", "Mains", "Desserts"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategoryFilter(category)}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                  activeCategoryFilter === category
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 shadow-lg shadow-amber-500/20"
                    : "glass-obsidian text-stone-300 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Dishes Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredShowcaseDishes.map((dish) => (
              <div key={dish.id} className="glass-obsidian glass-obsidian-hover rounded-3xl p-4 flex flex-col justify-between group">
                <div>
                  <div className="relative h-48 mb-4 rounded-2xl overflow-hidden bg-stone-900 border border-white/10">
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-amber-500 text-stone-950 font-black text-xs px-3 py-1 rounded-full shadow-lg">
                      ${dish.price.toFixed(2)}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-amber-300 font-bold text-[10px] px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {dish.rating}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-base mb-1 line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed mb-4">
                    {dish.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <span className="text-stone-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {dish.prep_time}
                  </span>
                  <Link to="/customer/menu" className="text-amber-400 font-black hover:underline flex items-center gap-1">
                    <span>Order Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: VISUAL BENTO GRID FEATURES */}
      <section id="features" className="py-24 bg-stone-950 border-b border-white/10 relative z-10">
        <div className="container-custom relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
              Full-Spectrum Operations
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Engineered For Speed, Accuracy & Revenue
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Every tool required to run high-volume dine-in restaurants, cafes, and lounges without waiter bottleneck.
            </p>
          </div>

          {/* Bento Layout Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Bento Card 1: Instant Menu Sync (Large 2 Cols) */}
            <div className="md:col-span-2 glass-obsidian glass-obsidian-hover rounded-3xl p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xl mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">1-Tap Out-of-Stock Menu Controls</h3>
                <p className="text-stone-400 text-sm leading-relaxed max-w-xl">
                  Ran out of Chef Special Tandoori Chicken at 9 PM? Switch dish availability from your owner dashboard in 1 click. Scanning customers see disabled items instantly, ending waiter order apologies.
                </p>
              </div>

              <div className="mt-8 bg-black/40 rounded-2xl p-4 border border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-extrabold text-white">Live Catalog Sync Active</span>
                </div>
                <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                  Instant 0.1s Propagation
                </span>
              </div>
            </div>

            {/* Bento Card 2: Kitchen Display System */}
            <div className="glass-obsidian glass-obsidian-hover rounded-3xl p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xl mb-6">
                  <ChefHat className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">Kitchen Display (KDS)</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  High-contrast live order screen for kitchen staff. Color-coded urgency alerts prevent order prep delays.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-extrabold text-emerald-400 flex items-center justify-between">
                <span>Zero Paper Tickets</span>
                <Check className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            {/* Bento Card 3: Zero Commission */}
            <div className="glass-obsidian glass-obsidian-hover rounded-3xl p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xl mb-6">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">Zero Transaction Cut</h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  Keep 100% of your hard-earned revenue. No 25% aggregator commission fees on your dine-in table customers.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs font-extrabold text-amber-300 flex items-center justify-between">
                <span>Flat ₹999/mo Forever</span>
                <Check className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            {/* Bento Card 4: No App Download Needed (Large 2 Cols) */}
            <div className="md:col-span-2 glass-obsidian glass-obsidian-hover rounded-3xl p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-black text-xl mb-6">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Zero App Download Friction</h3>
                <p className="text-stone-400 text-sm leading-relaxed max-w-xl">
                  Customers scan the table QR code using their regular phone camera (iPhone or Android). Your digital menu instantly opens in Chrome or Safari without forcing them to register or download apps.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="bg-black/40 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-300">
                  ✓ Chrome, Safari, Edge Compatible
                </span>
                <span className="bg-black/40 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-300">
                  ✓ 100% Mobile Optimized
                </span>
                <span className="bg-black/40 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-300">
                  ✓ Dynamic Session Routing
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE ROI & SAVINGS CALCULATOR */}
      <section id="roi-calculator" className="py-24 bg-obsidian border-b border-white/10 relative z-10">
        <div className="container-custom relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Interactive ROI & Profit Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Calculate Your Monthly Revenue Savings
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              Adjust the sliders to match your outlet's capacity and see how much profit you keep with NextDine's flat ₹999/mo plan.
            </p>
          </div>

          <div className="glass-obsidian rounded-3xl p-6 sm:p-10 shadow-2xl grid lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Input Side */}
            <div className="lg:col-span-7 space-y-8">
              {/* Slider 1 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-stone-300">Dining Tables in Outlet:</span>
                  <span className="text-amber-400 font-black text-lg">{calcTables} Tables</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={calcTables}
                  onChange={(e) => setCalcTables(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-800 h-2.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-stone-300">Daily Order Count:</span>
                  <span className="text-amber-400 font-black text-lg">{calcDailyOrders} Orders / Day</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="5"
                  value={calcDailyOrders}
                  onChange={(e) => setCalcDailyOrders(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-800 h-2.5 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-stone-300">Average Order Value (AOV):</span>
                  <span className="text-amber-400 font-black text-lg">₹{calcAvgOrderValue}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1500"
                  step="25"
                  value={calcAvgOrderValue}
                  onChange={(e) => setCalcAvgOrderValue(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-800 h-2.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Results Side */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/40 rounded-2xl p-6 space-y-6 text-center shadow-xl">
              <div>
                <p className="text-xs uppercase font-black text-amber-300 tracking-wider">Estimated Monthly Commission Saved</p>
                <p className="text-4xl sm:text-5xl font-black text-white mt-2">
                  ₹{aggregatorCommissionSaved.toLocaleString("en-IN")}
                </p>
                <p className="text-[11px] text-stone-400 mt-1">Saved vs 22% aggregator commission fees</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-left">
                <div className="bg-black/50 p-3 rounded-xl border border-white/10">
                  <p className="text-[10px] text-stone-400 font-bold uppercase">Time Saved Daily</p>
                  <p className="text-base font-black text-emerald-400 mt-0.5">
                    ~{Math.round(minutesSavedPerDay / 60)} Hours
                  </p>
                </div>

                <div className="bg-black/50 p-3 rounded-xl border border-white/10">
                  <p className="text-[10px] text-stone-400 font-bold uppercase">NextDine Fee</p>
                  <p className="text-base font-black text-amber-400 mt-0.5">
                    Flat ₹999/mo
                  </p>
                </div>
              </div>

              <Link to="/register" className="block">
                <button className="btn-shimmer w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black py-3.5 rounded-xl shadow-lg uppercase tracking-wider text-xs">
                  Claim Your Savings Now →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OPERATIONAL ROADMAP (01 -> 02 -> 03) */}
      <section id="how-it-works" className="py-24 bg-stone-950 border-b border-white/10 relative z-10">
        <div className="container-custom relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
              Simple Operational Onboarding
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Launch Digital Table Ordering in 15 Minutes
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              No hardware downloads. Simple 3-step operational setup.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Step 01 */}
            <div className="glass-obsidian glass-obsidian-hover rounded-3xl p-8 relative flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xl">
                    <Store className="w-7 h-7" />
                  </div>
                  <span className="text-5xl font-black text-stone-800 group-hover:text-amber-500/30 transition-colors">
                    01
                  </span>
                </div>

                <div className="inline-block bg-amber-500/10 text-amber-300 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md border border-amber-500/30 mb-3">
                  Step 01 • Menu Upload
                </div>
                <h3 className="text-xl font-black text-white mb-3">
                  Create Account & Add Menu Catalog
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-6">
                  Register your restaurant in 2 minutes. Add categories, food items, prices, and dish descriptions. Toggle dish availability on demand.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-stone-300 font-semibold">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>5-Minute Menu Catalog Upload</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Instant Availability Toggles</span>
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="glass-obsidian glass-obsidian-hover rounded-3xl p-8 relative flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-black text-xl">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <span className="text-5xl font-black text-stone-800 group-hover:text-indigo-500/30 transition-colors">
                    02
                  </span>
                </div>

                <div className="inline-block bg-indigo-500/10 text-indigo-300 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md border border-indigo-500/30 mb-3">
                  Step 02 • Table QRs
                </div>
                <h3 className="text-xl font-black text-white mb-3">
                  Download & Print Table Stands
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-6">
                  Generate table-bound QR codes with 1 click. Print and place them on your dining tables or acrylic stands.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-stone-300 font-semibold">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Automatic Table Session Routing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>High-Res Printable Vectors</span>
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="glass-obsidian glass-obsidian-hover rounded-3xl p-8 relative flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black text-xl">
                    <ChefHat className="w-7 h-7" />
                  </div>
                  <span className="text-5xl font-black text-stone-800 group-hover:text-emerald-500/30 transition-colors">
                    03
                  </span>
                </div>

                <div className="inline-block bg-emerald-500/10 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-md border border-emerald-500/30 mb-3">
                  Step 03 • Kitchen Stream
                </div>
                <h3 className="text-xl font-black text-white mb-3">
                  Live Kitchen Sync & Serve
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed mb-6">
                  Guests scan table QRs and order. Dishes stream instantly to your Kitchen Display Screen for instant cooking.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-stone-300 font-semibold">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Instant 0.2s Kitchen Stream</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Zero Misplaced Orders</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: PRICING CARD */}
      <section id="pricing" className="py-24 bg-obsidian relative z-10">
        <div className="container-custom relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
              {LANDING_PAGE_CONTENT.pricing.badge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {LANDING_PAGE_CONTENT.pricing.title}
            </h2>
            <p className="text-stone-400 text-sm sm:text-base">
              {LANDING_PAGE_CONTENT.pricing.subtitle}
            </p>
          </div>

          <div className="max-w-xl mx-auto glass-obsidian border-2 border-amber-500/50 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 px-5 py-1 rounded-full text-xs font-black tracking-wide uppercase shadow-lg">
              ⚡ Done-For-You Outlet Setup Included
            </div>

            {/* Price Display */}
            <div className="text-center mb-8 border-b border-white/10 pb-8 space-y-3">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl sm:text-6xl font-black text-white">₹999</span>
                <span className="text-base font-bold text-stone-400 ml-2">/ month</span>
              </div>

              {/* One-Time Setup Fee Badge */}
              <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-xl text-amber-300 text-xs font-extrabold">
                <span>+ ₹2,999</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>One-Time Setup & Onboarding Fee</span>
              </div>

              <p className="text-xs text-stone-400 font-medium pt-1">
                Everything is configured and uploaded by our dedicated team for your restaurant!
              </p>
            </div>

            {/* Included Features */}
            <div className="space-y-3.5 mb-8">
              <p className="text-xs font-black uppercase text-amber-400 tracking-wider mb-2">Included In Your Package:</p>
              {LANDING_PAGE_CONTENT.pricing.featuresIncluded.map((feature, i) => (
                <div key={i} className="flex items-center text-xs sm:text-sm font-bold text-stone-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/register" className="w-full">
              <button className="btn-shimmer w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black py-4 rounded-xl shadow-xl uppercase tracking-wider text-sm">
                Register & Get Started Now →
              </button>
            </Link>

            <p className="text-center text-[11px] text-stone-400 mt-4 font-medium">
              Setup completed within 24 hours. Our team contacts you immediately after registration.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section id="faq" className="py-24 bg-stone-950 border-t border-white/10 relative z-10">
        <div className="container-custom relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/30">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {LANDING_PAGE_CONTENT.faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="glass-obsidian rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-extrabold text-white hover:text-amber-300 transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-amber-400 flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-500 flex-shrink-0 ml-2" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-stone-300 border-t border-white/10 pt-3 leading-relaxed font-medium">
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
      <section className="py-24 bg-gradient-to-b from-stone-950 via-obsidian to-black relative overflow-hidden border-t border-amber-500/30 z-10">
        <div className="container-custom max-w-4xl mx-auto text-center space-y-6 px-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Streamline Your Restaurant Table Orders?
          </h2>
          <p className="text-sm sm:text-base text-stone-400 max-w-2xl mx-auto">
            Join modern restaurants, cafes, and lounges serving faster meals with zero waiter error.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <button className="btn-shimmer bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black px-10 py-4.5 rounded-2xl shadow-2xl text-base uppercase tracking-wider hover:scale-105 transition-all">
                Register Your Restaurant Now →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black py-12 relative z-10">
        <div className="container-custom max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-stone-400 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center">
                ND
              </div>
              <span className="font-black text-white text-sm">NextDine Platform</span>
              <span>© {new Date().getFullYear()} NextDine. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-6 font-bold text-stone-300">
              <Link to="/login" className="hover:text-amber-400 transition-colors">
                Owner Sign In
              </Link>
              <Link to="/admin/login" className="hover:text-amber-400 transition-colors">
                Admin Portal
              </Link>
              <Link to="/customer/menu" className="hover:text-amber-400 transition-colors">
                Customer Demo Menu
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
