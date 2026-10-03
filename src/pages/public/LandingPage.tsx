import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Menu as MenuIcon,
  X,
  Zap,
  ChefHat,
  Sparkles,
  Calculator,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Plus,
  CheckCircle2,
  DollarSign,
  Star,
  Clock,
  Award,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Badge } from "../../components/ui";
import { LANDING_PAGE_CONTENT } from "../../config/adminContent";

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive Live Demo Playground State
  const [demoRestaurantName, setDemoRestaurantName] = useState("Taverna Gourmet Kitchen");
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
  const [calcDailyOrders, setCalcDailyOrders] = useState(85);
  const [calcAvgOrderValue, setCalcAvgOrderValue] = useState(480);

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
      name: "Truffle Honey Glazed Chicken",
      price: 18.99,
      category: "Starters",
      description: "Crispy double-cooked chicken wings glazed with organic Huron apple honey and truffle oil reduction.",
      image_url: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
      prep_time: "14 min",
      rating: 4.9,
    },
    {
      id: "hero-2",
      name: "Smokey Angus Cheeseburger",
      price: 14.50,
      category: "Mains",
      description: "Aged Angus beef patty with double melted cheddar, caramelized onions, crisp lettuce, and signature house aioli.",
      image_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      prep_time: "12 min",
      rating: 4.8,
    },
    {
      id: "hero-3",
      name: "Golden Fluffy Stack Pancakes",
      price: 9.99,
      category: "Desserts",
      description: "Artisanal fluffy buttermilk pancakes served fresh with organic Canadian maple syrup and wild berries.",
      image_url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
      prep_time: "10 min",
      rating: 4.9,
    },
    {
      id: "hero-4",
      name: "Mediterranean Gyro Deluxe",
      price: 16.25,
      category: "Mains",
      description: "Authentic warm pita wrap loaded with seasoned slow-roasted gyro meat, tzatziki sauce, and crisp salad.",
      image_url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
      prep_time: "15 min",
      rating: 4.8,
    },
  ];

  const filteredShowcaseDishes = activeCategoryFilter === "All" 
    ? showcaseDishes 
    : showcaseDishes.filter(d => d.category === activeCategoryFilter);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 selection:bg-amber-500/30 selection:text-amber-900 font-sans antialiased overflow-x-hidden">
      
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-amber-300 text-[11px] font-extrabold py-2 px-4 text-center tracking-wider uppercase border-b border-stone-800 flex items-center justify-center space-x-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>⚡ Launch Direct Table QR Ordering in 15 Minutes • Zero Aggregator Cuts • Flat ₹999/mo</span>
        <Link to="/register" className="underline hover:text-white ml-2 transition-colors">
          Start Free Trial →
        </Link>
      </div>

      {/* Main Navbar */}
      <header className="bg-stone-900/95 backdrop-blur-md text-white border-b border-stone-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 font-black text-sm flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              ND
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-widest text-white uppercase leading-none">
                NEXT<span className="text-amber-400">DINE</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-stone-400 uppercase -mt-0.5">
                RESTAURANT OS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-extrabold uppercase tracking-wider text-stone-300">
            <a href="#interactive-sandbox" className="hover:text-amber-400 transition-colors">Live Sandbox</a>
            <a href="#menu-showcase" className="hover:text-amber-400 transition-colors">Menu Catalog</a>
            <a href="#why-nextdine" className="hover:text-amber-400 transition-colors">Why NextDine</a>
            <a href="#features" className="hover:text-amber-400 transition-colors">Features</a>
            <a href="#roi-calculator" className="hover:text-amber-400 transition-colors">ROI Calculator</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/login" className="text-xs font-extrabold uppercase tracking-wider text-stone-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-stone-800 transition-colors">
              Owner Sign In
            </Link>
            <Link to="/register">
              <button className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-300 hover:to-orange-300 text-stone-950 font-black text-xs px-5 py-2.5 rounded-full shadow-md transition-all uppercase tracking-wider active:scale-95">
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

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-stone-900 border-t border-stone-800 px-6 py-4 space-y-3 text-xs uppercase font-extrabold tracking-wider text-stone-200">
            <a href="#interactive-sandbox" className="block hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Live Sandbox</a>
            <a href="#menu-showcase" className="block hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Menu Catalog</a>
            <a href="#why-nextdine" className="block hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Why NextDine</a>
            <a href="#features" className="block hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#roi-calculator" className="block hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a>
            <a href="#pricing" className="block hover:text-amber-400" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" className="w-full text-center py-2.5 rounded-xl bg-stone-800 text-white font-extrabold">
                Owner Sign In
              </Link>
              <Link to="/register" className="w-full">
                <button className="w-full bg-amber-400 text-stone-950 font-black py-3 rounded-full text-xs uppercase tracking-wider">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section — High-Impact Split Layout with Warm Interior Ambiance */}
      <section className="relative bg-stone-950 text-white py-20 lg:py-28 overflow-hidden z-10 border-b border-stone-800">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Restaurant Dining Ambiance"
            className="w-full h-full object-cover opacity-25 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/60" />
        </div>

        <div className="container-custom relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-md">
              <Award className="w-4 h-4 text-amber-400" />
              <span>OVER 450+ RESTAURANTS & CAFES POWERED NATIONWIDE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.08] drop-shadow-2xl">
              The Complete <span className="text-amber-400">Digital Dining OS</span> Built For Modern Outlets.
            </h1>

            <p className="text-sm sm:text-lg text-stone-300 font-medium leading-relaxed max-w-2xl">
              Empower guests to scan table QR codes, explore visual gourmet menus, and self-order directly. Orders stream to your Kitchen Display System in <strong className="text-amber-300">0.2 seconds</strong> — with zero waiter errors and zero aggregator commission cuts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link to="/register" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

              <a href="#interactive-sandbox" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-stone-900/80 hover:bg-stone-800 border border-stone-700 text-white font-extrabold text-xs uppercase tracking-widest px-7 py-4 rounded-full transition-all flex items-center justify-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Try Live Sandbox</span>
                </button>
              </a>

              <Link to="/admin/login" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-stone-800/60 hover:bg-stone-800 text-stone-300 font-bold text-xs uppercase tracking-widest px-5 py-4 rounded-full transition-all border border-stone-700">
                  🔑 Admin Portal
                </button>
              </Link>
            </div>

            {/* Proof Metrics Strip */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="block font-black text-xl text-white">450+</span>
                <span className="text-stone-400 font-semibold text-[11px] uppercase">Active Outlets</span>
              </div>
              <div>
                <span className="block font-black text-xl text-emerald-400">0.2s</span>
                <span className="text-stone-400 font-semibold text-[11px] uppercase">KDS Ticket Sync</span>
              </div>
              <div>
                <span className="block font-black text-xl text-amber-400">100%</span>
                <span className="text-stone-400 font-semibold text-[11px] uppercase">Direct Revenue</span>
              </div>
              <div>
                <span className="block font-black text-xl text-white">4.9 ★</span>
                <span className="text-stone-400 font-semibold text-[11px] uppercase">Owner Rating</span>
              </div>
            </div>

          </div>

          {/* Right Column Product Interactive Mockup Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-5 relative backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-extrabold text-sm text-white">Taverna Gourmet Kitchen</span>
                </div>
                <Badge variant="warning" className="text-[10px] px-2 py-0.5">Table #04 Active</Badge>
              </div>

              {/* Sample Live Order Preview */}
              <div className="space-y-3">
                <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-amber-400">Order #104 • Just now</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] uppercase font-black">
                      🍳 Cooking
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-stone-300 font-semibold">
                    <div className="flex justify-between">
                      <span>2x Paneer Butter Masala</span>
                      <span className="text-white">₹520</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4x Garlic Butter Naan</span>
                      <span className="text-white">₹180</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-xs font-black text-white">
                    <span>Total Amount</span>
                    <span className="text-amber-400 text-sm">₹700</span>
                  </div>
                </div>

                {/* 1-Tap Out of Stock Control Demo */}
                <div className="bg-stone-800/60 p-3.5 rounded-2xl border border-stone-700 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="font-bold text-white">Stock Availability Toggle</span>
                  </div>
                  <span className="bg-emerald-500 text-stone-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase">
                    1-Tap Sync
                  </span>
                </div>
              </div>

              <div className="pt-2 text-center">
                <a href="#interactive-sandbox" className="text-xs font-extrabold text-amber-400 hover:underline inline-flex items-center">
                  <span>Interactive Full Demo Sandbox Below</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 1: INTERACTIVE OPERATIONAL SANDBOX */}
      <section id="interactive-sandbox" className="py-24 bg-[#F5F3EE] border-b border-stone-200 relative overflow-hidden z-10">
        <div className="container-custom relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-300 text-amber-900 text-xs font-extrabold">
              <Sparkles className="w-4 h-4 text-amber-700 animate-spin" />
              <span>Interactive Live Sandbox</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
              Test NextDine Operational Flow Right Now
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Customize your restaurant name, select table numbers, tap items to add to cart, and watch your order stream instantly onto the Kitchen Display Screen below!
            </p>
          </div>

          {/* 3 Continuous Side-by-Side Realistic iPhones Showcase Grid */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto pt-4">
            
            {/* iPhone 1: Table QR Scan & Welcome View */}
            <div className="flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  1. Table QR Scan
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
                          <QRCodeSVG
                            value={`http://localhost:3000/menu/demo?table=${selectedTableNum}`}
                            size={90}
                            bgColor="#ffffff"
                            fgColor="#1c1917"
                          />
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

      {/* SECTION 2: GOURMET FOOD SHOWCASE & VISUAL MENU */}
      <section id="menu-showcase" className="py-20 bg-white border-b border-stone-200 relative">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200">
              Gourmet Experience Catalog
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              High-Resolution Visual Menus
            </h2>
            <p className="text-sm text-stone-600">
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
                    ? "bg-stone-900 text-white shadow-md"
                    : "bg-stone-100 text-stone-700 border border-stone-200 hover:bg-stone-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sample Dish Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {filteredShowcaseDishes.map((dish) => (
              <div key={dish.id} className="bg-[#FAF8F5] rounded-3xl p-4 border border-stone-200/80 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
                <div>
                  <div className="relative h-44 mb-3 rounded-2xl overflow-hidden bg-white p-2 flex items-center justify-center border border-stone-200/60">
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-xl"
                    />
                    <span className="absolute top-3 right-3 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-full shadow-xs">
                      ${dish.price.toFixed(2)}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-stone-900/80 backdrop-blur-md text-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {dish.rating}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm mb-1 line-clamp-1 group-hover:text-amber-800 transition-colors">{dish.name}</h3>
                  <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed mb-3">{dish.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs">
                  <span className="text-stone-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    {dish.prep_time}
                  </span>
                  <Link to="/customer/menu" className="text-red-600 font-extrabold hover:underline flex items-center gap-1">
                    <span>Order Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY NEXTDINE (PROBLEM VS SOLUTION MATRIX) */}
      <section id="why-nextdine" className="py-24 bg-[#FAF8F5] border-b border-stone-200 relative z-10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-stone-600 bg-stone-100 px-3.5 py-1 rounded-full border border-stone-200">
              Operational Comparison
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight">
              Why Top Outlets Switch To NextDine
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              See how NextDine eliminates traditional restaurant bottlenecks and saves hours of waiter work daily.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Traditional Bottlenecks */}
            <div className="bg-white border border-red-200 rounded-3xl p-8 shadow-xs space-y-6">
              <div className="flex items-center space-x-3 text-red-700">
                <X className="w-6 h-6 p-1 bg-red-100 rounded-full" />
                <h3 className="font-extrabold text-lg text-slate-900">Traditional Bottlenecks</h3>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-stone-600 font-medium">
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Waiters busy rushing between tables during peak rush hours</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Out-of-stock apologies when chef runs out of popular dishes</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>20% to 25% aggregator commission cuts on dine-in customers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-red-500 font-bold">✕</span>
                  <span>Paper ticket mixups and kitchen order prep delays</span>
                </li>
              </ul>
            </div>

            {/* NextDine OS Advantage */}
            <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white border-2 border-amber-400 rounded-3xl p-8 shadow-md space-y-6">
              <div className="flex items-center space-x-3 text-amber-800">
                <Check className="w-6 h-6 p-1 bg-amber-100 rounded-full" />
                <h3 className="font-extrabold text-lg text-slate-900">NextDine OS Advantage</h3>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-stone-800 font-bold">
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Guests self-order from table QR in seconds with 0 waiter wait time</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>1-Tap dish availability toggle instantly disables sold-out items</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Keep 100% of your revenue with a simple flat ₹999/mo subscription</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>0.2s Kitchen Display System (KDS) live ticket stream with sound chime</span>
                </li>
              </ul>
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

      {/* SECTION 5: INTERACTIVE ROI & SAVINGS CALCULATOR */}
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
                <button className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-xl shadow-sm text-xs uppercase tracking-wider">
                  Claim Your Savings Now →
                </button>
              </Link>
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
              <button className="w-full bg-stone-900 hover:bg-stone-800 text-white font-extrabold py-4 rounded-xl shadow-lg border border-stone-800 text-base hover:scale-[1.02] transition-all uppercase tracking-wider">
                Register & Get Started Now →
              </button>
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
      <section className="py-20 bg-stone-900 text-white relative overflow-hidden border-t border-stone-800 z-10">
        <div className="container-custom max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Streamline Your Restaurant Table Orders?
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto">
            Join modern restaurants, cafes, and lounges serving faster meals with zero waiter error.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <button className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold px-10 py-4 rounded-full shadow-lg text-base uppercase tracking-wider hover:scale-105 transition-all">
                Register Your Restaurant Now →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-800 bg-stone-950 text-white py-12 relative z-10">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-stone-400 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-lg bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center">
                ND
              </div>
              <span className="font-black text-white text-sm">NextDine Restaurant OS</span>
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
