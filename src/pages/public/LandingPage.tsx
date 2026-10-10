/**
 * NextDine Landing Page — Dynamic CoreShift Motion & Scroll Animation System
 * Recreated with Framer Motion, Parallax Scroll Physics, Floating Cards,
 * Bento Grid Reveals, Integrations Arc Motion, 3D Testimonial Stack,
 * and Full Interactive KDS Operational Sandbox.
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Check,
  Menu as MenuIcon,
  X,
  Zap,
  ChefHat,
  Smartphone,
  ChevronDown,
  ChevronUp,
  Star,
  BellRing,
  QrCode,
  Utensils,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { LANDING_PAGE_CONTENT } from "../../config/adminContent";

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Parallax Hooks for Hero Floating Cards physics
  const { scrollYProgress } = useScroll();

  // Scroll transforms for hero cards
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);
  const card1Y = useTransform(scrollYProgress, [0, 0.25], [0, -90]);
  const card2Y = useTransform(scrollYProgress, [0, 0.25], [0, 70]);
  const card3Y = useTransform(scrollYProgress, [0, 0.25], [0, -110]);
  const card4Y = useTransform(scrollYProgress, [0, 0.25], [0, -85]);
  const card5Y = useTransform(scrollYProgress, [0, 0.25], [0, 95]);
  const card6Y = useTransform(scrollYProgress, [0, 0.25], [0, -105]);

  // Web Audio API Kitchen Bell Sound Synthesizer
  const playKitchenBellSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Primary Chime Tone (B5 Crisp Note)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(987.77, ctx.currentTime);
      gain1.gain.setValueAtTime(0.45, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.25);
      
      // Overtone Harmonics
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1975.53, ctx.currentTime);
      gain2.gain.setValueAtTime(0.2, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.25);
      osc2.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.log("Audio Context not supported or blocked by browser gesture.");
    }
  };

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
  const [bellTriggeredCount, setBellTriggeredCount] = useState(0);

  // Interactive Food Showcase Filter State
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");

  // Connected Workflows Active Highlight State (CoreShift Integration Arc)
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);

  // Testimonial Carousel State
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

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

    playKitchenBellSound();
    setBellTriggeredCount((c) => c + 1);

    setLiveKdsOrder({
      id: `#${Math.floor(100 + Math.random() * 900)}`,
      table: selectedTableNum,
      items: cartItems.map((i) => ({ name: i.name, qty: i.qty })),
      total,
      status: "pending",
      time: "Just now",
    });

    setOrderSentToast(true);
    setTimeout(() => setOrderSentToast(false), 3500);
  };

  const handleBellSoundDemo = () => {
    playKitchenBellSound();
    setBellTriggeredCount((c) => c + 1);
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

  // Workflow Tiles (CoreShift Integration Arc Section)
  const connectedWorkflows = [
    {
      id: "qr-scan",
      title: "Table QR Scanning",
      subtitle: "Customers scan table QR with native phone camera — zero app download required.",
      icon: Smartphone,
      color: "bg-[#7650E8]",
      angle: -6,
    },
    {
      id: "visual-menu",
      title: "Gourmet Visual Menu",
      subtitle: "High-resolution digital catalog with instant modifiers and category filters.",
      icon: Utensils,
      color: "bg-[#5CD8E8]",
      angle: -3,
    },
    {
      id: "live-kds",
      title: "Kitchen Ticket Stream (KDS)",
      subtitle: "0.2s instant kitchen dispatch with Web Audio chime and status color codes.",
      icon: ChefHat,
      color: "bg-[#FF625E]",
      angle: 0,
    },
    {
      id: "table-mgmt",
      title: "Table & QR Management",
      subtitle: "Configure tables, print custom QR standees, and manage seat layouts.",
      icon: QrCode,
      color: "bg-[#FFD45C]",
      angle: 3,
    },
    {
      id: "analytics",
      title: "Owner Revenue Analytics",
      subtitle: "Track daily gross sales, commission savings, and live kitchen prep speeds.",
      icon: TrendingUp,
      color: "bg-[#7650E8]",
      angle: 6,
    },
  ];

  // Testimonials Array (CoreShift 3D Card Stack)
  const testimonials = [
    {
      quote: "NextDine transformed our table turnover rate by 35% during peak dinner rush. No waiter order mixups and zero aggregator commissions!",
      author: "Aditya Wagh",
      role: "Owner, Taverna Gourmet Kitchen",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    },
    {
      quote: "The 1-Tap Out-of-Stock feature is a lifesaver. When our kitchen runs out of signature dishes at 9 PM, we toggle it instantly without apologies!",
      author: "Rohan Verma",
      role: "Founder, Royal Spice Bistro",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    {
      quote: "Setting up 15 tables took under 20 minutes. Customers love browsing high-res food photos, and our KDS tickets chime instantly!",
      author: "Priya Sharma",
      role: "General Manager, Amber Lounge & Cafe",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#7650E8]/20 selection:text-[#7650E8] font-sans antialiased overflow-x-hidden relative">
      
      {/* FLOATING NAVIGATION HEADER (CORESHIFT REFERENCE STYLE - FRAME 0S) */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-5 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50 bg-white/95 backdrop-blur-md rounded-full px-6 py-3 border border-[#E9E9EE] shadow-lg shadow-black/5 flex items-center justify-between"
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            className="w-9 h-9 rounded-xl bg-[#7650E8] text-white font-black text-sm flex items-center justify-center shadow-md shadow-[#7650E8]/20"
          >
            ND
          </motion.div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight text-[#111111] leading-none">
              Next<span className="text-[#7650E8]">Dine</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.2em] text-[#737373] uppercase -mt-0.5 font-mono">
              RESTAURANT OS
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-bold text-[#555555]">
          <a href="#hero-section" className="hover:text-[#7650E8] transition-colors">Product</a>
          <a href="#how-it-works" className="hover:text-[#7650E8] transition-colors">How It Works</a>
          <a href="#features-grid" className="hover:text-[#7650E8] transition-colors">Features</a>
          <a href="#menu-catalog-section" className="hover:text-[#7650E8] transition-colors">Visual Catalog</a>
          <a href="#pricing-section" className="hover:text-[#7650E8] transition-colors">Pricing</a>
          <a href="#roi-calculator" className="hover:text-[#7650E8] transition-colors">ROI Calculator</a>
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-xs font-bold text-[#111111] hover:text-[#7650E8] transition-colors">
            Sign In
          </Link>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF625E] hover:bg-[#e8504c] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md shadow-[#FF625E]/20 transition-all uppercase tracking-wider"
            >
              Start Free Trial →
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#111111] hover:text-[#7650E8] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-4 right-4 bg-white border border-[#E9E9EE] rounded-3xl p-6 shadow-2xl z-50 space-y-4 text-xs uppercase font-extrabold tracking-wider text-[#111111]"
          >
            <a href="#hero-section" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>Product</a>
            <a href="#how-it-works" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#features-grid" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#menu-catalog-section" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>Visual Catalog</a>
            <a href="#pricing-section" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#roi-calculator" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</a>
            <div className="pt-2 flex flex-col gap-2">
              <Link to="/login" className="w-full text-center py-2.5 rounded-full bg-[#F8F8FA] border border-[#E9E9EE] text-[#111111] font-bold">
                Sign In
              </Link>
              <Link to="/register" className="w-full">
                <button className="w-full bg-[#FF625E] text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider">
                  Start Free Trial
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION — CORESHIFT COMPOSITION WITH DYNAMIC SCROLL & FLOATING CARDS (FRAMES 0S - 2S) */}
      <section id="hero-section" className="pt-36 sm:pt-44 pb-28 bg-white relative overflow-hidden">
        
        {/* Subtle Background Glow Mesh */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#7650E8]/10 via-[#FF625E]/5 to-[#5CD8E8]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <motion.div style={{ y: heroParallaxY }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Centered Icon Container (Matching CoreShift Hero Icon) */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: "backOut" }}
            className="w-14 h-14 rounded-2xl bg-[#7650E8]/10 text-[#7650E8] flex items-center justify-center font-bold text-2xl mx-auto mb-6 shadow-sm border border-[#7650E8]/20"
          >
            <Utensils className="w-7 h-7 text-[#7650E8]" />
          </motion.div>

          {/* Centered Large Bold Typography (48px - 64px) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-6xl font-black text-[#111111] tracking-tight max-w-4xl mx-auto leading-[1.08] mb-6"
          >
            The Complete <span className="text-[#7650E8]">Digital Dining OS</span> Built For Modern Outlets.
          </motion.h1>

          {/* Supporting Text Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-[#737373] font-medium max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Empower guests to scan table QR codes, explore visual gourmet menus, and self-order directly. Orders stream to your Kitchen Display System in <strong className="text-[#111111] font-bold">0.2 seconds</strong> — with zero waiter errors and 100% direct revenue.
          </motion.p>

          {/* Centered CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/register" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-[#7650E8] hover:bg-[#643ed8] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg shadow-[#7650E8]/25 transition-all flex items-center justify-center space-x-2"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBellSoundDemo}
              className="w-full sm:w-auto bg-white hover:bg-[#F8F8FA] border border-[#E9E9EE] text-[#111111] font-bold text-sm px-6 py-4 rounded-full transition-all flex items-center justify-center space-x-2 shadow-xs group"
            >
              <BellRing className="w-4 h-4 text-[#7650E8] group-hover:rotate-12 transition-transform" />
              <span>Ring Kitchen Bell 🔔 ({bellTriggeredCount})</span>
            </motion.button>
          </motion.div>

        </motion.div>

        {/* FLOATING PHOTOGRAPHIC CARDS WITH CONTINUOUS FLOATING & SCROLL PARALLAX PHYSICS */}
        
        {/* Floating Card 1 — Top Left: Chef Plating Photography */}
        <motion.div
          style={{ y: card1Y }}
          initial={{ opacity: 0, x: -60, rotate: -8 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden lg:block absolute top-28 left-6 xl:left-12 w-44 rounded-2xl border border-[#E9E9EE] bg-white p-2 shadow-xl animate-float-slow z-20 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
            alt="Chef Plating Gourmet Dish"
            className="w-full h-36 object-cover rounded-xl mb-1.5"
          />
          <div className="px-1 text-left">
            <p className="text-[11px] font-black text-[#111111]">Chef Gourmet Kitchen</p>
            <p className="text-[9px] text-[#737373] font-medium">Live Order Prep</p>
          </div>
        </motion.div>

        {/* Floating Card 2 — Mid Left: Table QR Scan UI Badge */}
        <motion.div
          style={{ y: card2Y }}
          initial={{ opacity: 0, x: -80, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="hidden lg:block absolute top-72 left-8 xl:left-16 w-48 rounded-2xl border border-[#7650E8]/30 bg-white p-3 shadow-2xl animate-float-reverse z-20 cursor-pointer"
        >
          <div className="flex items-center space-x-2 border-b border-[#E9E9EE] pb-2 mb-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold text-xs text-[#111111]">Table #04 Active</span>
          </div>
          <div className="text-left text-[10px] space-y-1 text-[#555555] font-semibold">
            <p className="text-[#7650E8] font-bold">Paneer Butter Masala x2</p>
            <p>Garlic Butter Naan x4</p>
            <p className="text-[#111111] font-black pt-1 border-t border-[#E9E9EE]">Total: ₹700</p>
          </div>
        </motion.div>

        {/* Floating Card 3 — Bottom Left: Customer Scanning QR Photo */}
        <motion.div
          style={{ y: card3Y }}
          initial={{ opacity: 0, y: 60, rotate: -12 }}
          animate={{ opacity: 1, y: 0, rotate: -6 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="hidden lg:block absolute bottom-12 left-10 xl:left-20 w-40 rounded-2xl border border-[#E9E9EE] bg-white p-2 shadow-xl animate-float-slow z-20 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"
            alt="Customer Ordering at Restaurant Table"
            className="w-full h-32 object-cover rounded-xl mb-1.5"
          />
          <p className="text-[10px] font-black text-[#111111] text-center">Scan & Self Order</p>
        </motion.div>

        {/* Floating Card 4 — Top Right: High-Res Food Photography */}
        <motion.div
          style={{ y: card4Y }}
          initial={{ opacity: 0, x: 60, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="hidden lg:block absolute top-28 right-6 xl:right-12 w-44 rounded-2xl border border-[#E9E9EE] bg-white p-2 shadow-xl animate-float-slow z-20 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80"
            alt="Truffle Honey Glazed Dish"
            className="w-full h-36 object-cover rounded-xl mb-1.5"
          />
          <div className="px-1 text-left flex justify-between items-center">
            <div>
              <p className="text-[11px] font-black text-[#111111]">Truffle Honey Glazed</p>
              <p className="text-[9px] text-[#7650E8] font-bold">4.9 ★ Rating</p>
            </div>
            <span className="text-xs font-black text-[#FF625E]">$18.99</span>
          </div>
        </motion.div>

        {/* Floating Card 5 — Mid Right: KDS Order Status Badge */}
        <motion.div
          style={{ y: card5Y }}
          initial={{ opacity: 0, x: 80, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="hidden lg:block absolute top-72 right-8 xl:right-16 w-50 rounded-2xl border border-[#E9E9EE] bg-white p-3 shadow-2xl animate-float-reverse z-20 cursor-pointer"
        >
          <div className="flex items-center justify-between border-b border-[#E9E9EE] pb-2 mb-2">
            <span className="font-mono text-xs font-black text-[#7650E8]">Order #104</span>
            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-black uppercase">
              🍳 COOKING
            </span>
          </div>
          <div className="text-left text-[10px] text-[#555555] font-semibold space-y-1">
            <p>Live Kitchen Display Ticket</p>
            <p className="text-[#111111] font-bold">0.2s Dispatch Speed</p>
          </div>
        </motion.div>

        {/* Floating Card 6 — Bottom Right: Staff Serving Dining Table Photo */}
        <motion.div
          style={{ y: card6Y }}
          initial={{ opacity: 0, y: 60, rotate: 10 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="hidden lg:block absolute bottom-12 right-10 xl:right-20 w-40 rounded-2xl border border-[#E9E9EE] bg-white p-2 shadow-xl animate-float-slow z-20 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
            alt="Restaurant Dining Ambiance"
            className="w-full h-32 object-cover rounded-xl mb-1.5"
          />
          <p className="text-[10px] font-black text-[#111111] text-center">Faster Table Turns</p>
        </motion.div>

      </section>

      {/* 2. FEATURE SECTION — "BUILT FOR EVERYONE" 5-CARD BENTO GRID WITH STAGGERED SCROLL REVEALS (FRAMES 3S - 5S) */}
      <section id="features-grid" className="py-24 bg-[#F8F8FA] border-y border-[#E9E9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Header */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
              Built For Modern Outlets
            </h2>
            <p className="text-[#737373] text-base font-medium">
              Empower guests, waiters, and kitchen staff with connected table-ordering workflows.
            </p>
          </motion.div>

          {/* 5-Card Grid: 3 Cards Row 1, 2 Wider Cards Row 2 */}
          <div className="space-y-6">
            
            {/* ROW 1: 3 EQUAL COLUMNS */}
            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Card 1 — Direct Table QR Ordering */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-[#E9E9EE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#7650E8]/10 text-[#7650E8] flex items-center justify-center font-bold mb-6">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] mb-2">Direct Table QR Ordering</h3>
                  <p className="text-[#737373] text-sm leading-relaxed font-medium">
                    Guests scan table QR codes using native phone cameras to browse menus and self-order directly.
                  </p>
                </div>

                {/* Mini Realistic UI Illustration with Scanning Radar Line Animation */}
                <div className="mt-8 bg-[#F8F8FA] rounded-2xl p-3 border border-[#E9E9EE] space-y-2 text-xs relative overflow-hidden">
                  <motion.div
                    animate={{ y: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-0.5 bg-[#7650E8] shadow-sm shadow-[#7650E8]"
                  />
                  <div className="flex justify-between items-center pb-2 border-b border-[#E9E9EE] font-bold">
                    <span className="text-[#7650E8]">Taverna Kitchen</span>
                    <span className="bg-[#7650E8]/10 text-[#7650E8] px-2 py-0.5 rounded text-[10px]">Table #04</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-semibold text-[#111111]">
                    <span>Paneer Butter Masala</span>
                    <span className="text-[#7650E8]">₹260</span>
                  </div>
                  <button className="w-full bg-[#7650E8] text-white py-1.5 rounded-lg font-bold text-[10px] uppercase">
                    + Add To Cart
                  </button>
                </div>
              </motion.div>

              {/* Card 2 — Real-Time Order Management */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-[#E9E9EE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#5CD8E8]/10 text-[#5CD8E8] flex items-center justify-center font-bold mb-6">
                    <Zap className="w-6 h-6 text-[#00A8BC]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] mb-2">Real-Time Order Tracking</h3>
                  <p className="text-[#737373] text-sm leading-relaxed font-medium">
                    Instant 0.2s order sync directly from table QR to kitchen and POS without waiter bottlenecks.
                  </p>
                </div>

                {/* Mini Realistic UI Illustration with Progress Animation */}
                <div className="mt-8 bg-[#F8F8FA] rounded-2xl p-3 border border-[#E9E9EE] space-y-2 text-xs">
                  <div className="flex justify-between items-center font-extrabold text-[11px]">
                    <span className="text-[#111111]">Order #104 Sync</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px]">0.2s Stream</span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["20%", "95%", "20%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="bg-emerald-500 h-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Card 3 — Live Kitchen Display (KDS) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 border border-[#E9E9EE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF625E]/10 text-[#FF625E] flex items-center justify-center font-bold mb-6">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111111] mb-2">Live Kitchen Display System</h3>
                  <p className="text-[#737373] text-sm leading-relaxed font-medium">
                    High-contrast ticket queue with Web Audio bell chime and zero paper ticket mixups.
                  </p>
                </div>

                {/* Mini Realistic UI Illustration with Ticket Motion */}
                <div className="mt-8 bg-[#F8F8FA] rounded-2xl p-3 border border-[#E9E9EE] space-y-2 text-xs font-mono">
                  <motion.div
                    animate={{ x: [-5, 0, -5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex justify-between items-center border-b border-dashed border-stone-300 pb-1 text-[11px]"
                  >
                    <span className="font-bold text-[#111111]">TICKET #104</span>
                    <span className="text-[#FF625E] font-black">COOKING</span>
                  </motion.div>
                  <p className="text-[10px] text-[#555555]">2x Paneer Masala • 4x Naan</p>
                </div>
              </motion.div>

            </div>

            {/* ROW 2: 2 WIDER CARDS */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Card 4 (Wide) — Owner Dashboard & Sales Analytics */}
              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E9EE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#7650E8]/10 text-[#7650E8] flex items-center justify-center font-bold mb-6">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-2">Owner Dashboard & Sales Analytics</h3>
                  <p className="text-[#737373] text-sm leading-relaxed font-medium max-w-lg">
                    Monitor real-time gross revenue, daily order volume, average order values, and commission savings from a unified owner dashboard.
                  </p>
                </div>

                {/* Mini Dashboard Component Illustration */}
                <div className="mt-8 bg-[#F8F8FA] rounded-2xl p-4 border border-[#E9E9EE] grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-[#E9E9EE]">
                    <span className="text-[10px] text-[#737373] font-bold block">Gross Sales</span>
                    <span className="text-base font-black text-[#111111]">₹85,400</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E9E9EE]">
                    <span className="text-[10px] text-[#737373] font-bold block">Saved Fees</span>
                    <span className="text-base font-black text-emerald-600">₹18,700</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-[#E9E9EE] col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-[#737373] font-bold block">Active Outlets</span>
                    <span className="text-base font-black text-[#7650E8]">450+ Outlets</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 5 (Wide) — 1-Tap Menu & Table Management */}
              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.015 }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E9EE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FFD45C]/20 text-amber-700 flex items-center justify-center font-bold mb-6">
                    <QrCode className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#111111] mb-2">1-Tap Out-of-Stock & Table Control</h3>
                  <p className="text-[#737373] text-sm leading-relaxed font-medium max-w-lg">
                    Instantly disable sold-out menu items with 1 tap. Scanning guests see updated availability immediately, eliminating waiter order apologies.
                  </p>
                </div>

                {/* Mini Stock & Table Toggle Component */}
                <div className="mt-8 bg-[#F8F8FA] rounded-2xl p-4 border border-[#E9E9EE] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-extrabold text-[#111111]">Chef Special Tandoori Chicken</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-3 py-1 rounded-full uppercase">
                    1-Tap Active
                  </span>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. VISUAL MENU CATALOG SHOWCASE SECTION */}
      <section id="menu-catalog-section" className="py-24 bg-white border-b border-[#E9E9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12 space-y-3"
          >
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
              High-Resolution Visual Menus
            </h2>
            <p className="text-[#737373] text-base font-medium">
              Deliver appetizing visual food ordering with instant dish modifiers, category filters, and zero waiter latency.
            </p>
          </motion.div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
            {["All", "Starters", "Mains", "Desserts"].map((category) => (
              <motion.button
                key={category}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategoryFilter(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase transition-all whitespace-nowrap ${
                  activeCategoryFilter === category
                    ? "bg-[#7650E8] text-white shadow-md"
                    : "bg-[#F8F8FA] text-[#555555] border border-[#E9E9EE] hover:bg-stone-100"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Dish Showcase Cards */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredShowcaseDishes.map((dish) => (
                <motion.div
                  layout
                  key={dish.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-3xl p-4 border border-[#E9E9EE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 mb-3 rounded-2xl overflow-hidden bg-stone-100 p-2 flex items-center justify-center group">
                      <img
                        src={dish.image_url}
                        alt={dish.name}
                        className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-[#FF625E] text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-xs">
                        ${dish.price.toFixed(2)}
                      </span>
                      <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#111111] font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 border border-[#E9E9EE]">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {dish.rating}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#111111] text-base mb-1 line-clamp-1">{dish.name}</h3>
                    <p className="text-[#737373] text-xs line-clamp-2 leading-relaxed mb-3 font-medium">{dish.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#E9E9EE] text-xs font-semibold">
                    <span className="text-[#737373]">{dish.prep_time} prep</span>
                    <Link to="/customer/menu" className="text-[#7650E8] font-bold hover:underline flex items-center gap-1">
                      <span>Order Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 4. INTEGRATIONS & CONNECTED WORKFLOWS SECTION (CORESHIFT ARC TILES - FRAMES 6S - 9S) */}
      <section className="py-24 bg-[#F8F8FA] border-b border-[#E9E9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="bg-white border border-[#E9E9EE] rounded-[40px] p-8 sm:p-16 text-center shadow-sm"
          >
            {/* Small Coral Icon Header */}
            <div className="w-10 h-10 rounded-xl bg-[#FF625E]/10 text-[#FF625E] flex items-center justify-center font-bold mx-auto mb-4">
              <Layers className="w-5 h-5" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight max-w-2xl mx-auto mb-4">
              Integrate NextDine Into Your Existing Workflow In Seconds
            </h2>
            
            {/* Active Workflow Subtitle Banner */}
            <div className="h-12 flex items-center justify-center mb-10 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeWorkflowIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-[#7650E8] font-extrabold text-base"
                >
                  {connectedWorkflows[activeWorkflowIndex].title} — {connectedWorkflows[activeWorkflowIndex].subtitle}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Arc of 5 Tilted Workflow Tiles (CoreShift Style) */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto overflow-x-auto pb-4 pt-2 no-scrollbar">
              {connectedWorkflows.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeWorkflowIndex === idx;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.15, y: -10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveWorkflowIndex(idx)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
                      isActive
                        ? "bg-[#7650E8] text-white scale-110 -translate-y-3 shadow-xl shadow-[#7650E8]/30 border-2 border-[#7650E8]"
                        : "bg-[#F8F8FA] text-[#555555] hover:bg-white border border-[#E9E9EE]"
                    }`}
                    style={{
                      transform: `rotate(${item.angle}deg)`,
                    }}
                  >
                    <Icon className={`w-8 h-8 ${isActive ? "text-white" : "text-[#7650E8]"}`} />
                    <span className="text-[9px] font-extrabold tracking-wider uppercase mt-1.5 truncate max-w-[80px]">
                      {item.title.split(" ")[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>

          </motion.div>

        </div>
      </section>

      {/* 5. TESTIMONIAL CAROUSEL SECTION — "WORDS OF APPRECIATION" (CORESHIFT 3D STACK - FRAMES 10S - 13S) */}
      <section className="py-24 bg-white border-b border-[#E9E9EE] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-14 space-y-3"
          >
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
              Words of Appreciation
            </h2>
            <p className="text-[#737373] text-base font-medium">
              Loved by top restaurant owners, lounge founders, and cafe operators.
            </p>
          </motion.div>

          {/* 3D Stacked Card Display */}
          <div className="relative max-w-2xl mx-auto min-h-[260px] flex items-center justify-center">
            
            {/* Center Active Testimonial Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#E9E9EE] max-w-xl w-full relative z-10 text-center space-y-5"
              >
                {/* Layered Origami Purple Backdrop Accent */}
                <div className="absolute -bottom-3 inset-x-8 h-10 bg-[#7650E8] rounded-3xl -z-10 opacity-80 blur-xs" />

                {/* Avatar + Author Details */}
                <div className="flex flex-col items-center space-y-2">
                  <img
                    src={testimonials[activeTestimonialIndex].avatar}
                    alt={testimonials[activeTestimonialIndex].author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#7650E8] shadow-sm"
                  />
                  <div>
                    <h4 className="font-extrabold text-sm text-[#111111]">
                      {testimonials[activeTestimonialIndex].author}
                    </h4>
                    <p className="text-xs text-[#737373] font-medium">
                      {testimonials[activeTestimonialIndex].role}
                    </p>
                  </div>
                </div>

                {/* 5-Star Rating */}
                <div className="flex items-center justify-center space-x-1 text-amber-400">
                  {[...Array(testimonials[activeTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-[#111111] font-semibold leading-relaxed">
                  "{testimonials[activeTestimonialIndex].quote}"
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Partially Visible Angled Side Cards */}
            <div className="hidden md:block absolute -left-16 top-4 w-72 h-48 bg-[#F8F8FA] rounded-3xl border border-[#E9E9EE] shadow-md opacity-30 -rotate-6 scale-90 select-none pointer-events-none" />
            <div className="hidden md:block absolute -right-16 top-4 w-72 h-48 bg-[#F8F8FA] rounded-3xl border border-[#E9E9EE] shadow-md opacity-30 rotate-6 scale-90 select-none pointer-events-none" />

          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-11 h-11 rounded-full bg-white border border-[#E9E9EE] text-[#111111] hover:bg-[#7650E8] hover:text-white flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="w-11 h-11 rounded-full bg-white border border-[#E9E9EE] text-[#111111] hover:bg-[#7650E8] hover:text-white flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>

        </div>
      </section>

      {/* 6. INTERACTIVE LIVE DEMO & SANDBOX PLAYGROUND SECTION */}
      <section id="how-it-works" className="py-24 bg-[#F8F8FA] border-b border-[#E9E9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <div className="inline-flex items-center space-x-2 bg-[#7650E8]/10 border border-[#7650E8]/30 px-3.5 py-1.5 rounded-full text-[#7650E8] text-xs font-extrabold">
              <Sparkles className="w-4 h-4 text-[#7650E8]" />
              <span>Interactive Live Operational Demo</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
              Test Operational Flow Right Now
            </h2>
            <p className="text-[#737373] text-base font-medium">
              Select table numbers, tap items to add to cart, and watch your order stream instantly onto the Kitchen Display Screen below!
            </p>
          </motion.div>

          {/* 3 Continuous Devices Grid */}
          <div className="grid md:grid-cols-3 gap-6 items-stretch max-w-6xl mx-auto">
            
            {/* Device 1: Table QR Scan */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#7650E8] mb-3 font-mono">
                1. Table QR Scan
              </span>
              <div className="w-full max-w-[300px] h-[520px] bg-stone-900 p-3 rounded-[40px] shadow-2xl border-[4px] border-stone-800 relative flex flex-col justify-between">
                <div className="bg-[#FAF8F5] rounded-[30px] p-4 text-[#111111] h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="text-center pb-2 border-b border-stone-200">
                      <h4 className="font-black text-xs text-[#111111]">{demoRestaurantName}</h4>
                      <p className="text-[9px] text-[#737373] font-semibold">Table #{selectedTableNum} • Welcome</p>
                    </div>

                    <div className="space-y-2 text-[10px]">
                      <div>
                        <label className="block text-[#555555] font-bold mb-1">Outlet Name</label>
                        <input
                          type="text"
                          value={demoRestaurantName}
                          onChange={(e) => setDemoRestaurantName(e.target.value)}
                          className="w-full bg-white border border-[#E9E9EE] rounded-lg px-2 py-1 text-[#111111] font-bold text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[#555555] font-bold mb-1">Selected Table</label>
                        <div className="grid grid-cols-4 gap-1">
                          {[2, 4, 8, 12].map((num) => (
                            <button
                              key={num}
                              onClick={() => setSelectedTableNum(num)}
                              className={`py-1 rounded-lg font-bold text-[10px] ${
                                selectedTableNum === num
                                  ? "bg-[#7650E8] text-white"
                                  : "bg-white text-[#111111] border border-[#E9E9EE]"
                              }`}
                            >
                              T-{num}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-[#E9E9EE] text-center shadow-xs space-y-2 flex flex-col items-center">
                      <QRCodeSVG
                        value={`http://localhost:3000/menu/demo?table=${selectedTableNum}`}
                        size={85}
                        bgColor="#ffffff"
                        fgColor="#111111"
                      />
                      <p className="text-[9px] font-bold text-[#7650E8]">Scan Table #{selectedTableNum} QR</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Device 2: Select & Order Menu */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <span className="text-[11px] uppercase tracking-widest font-bold text-[#FF625E] mb-3 font-mono">
                2. Select & Order Menu
              </span>
              <div className="w-full max-w-[300px] h-[520px] bg-stone-900 p-3 rounded-[40px] shadow-2xl border-[4px] border-[#7650E8] relative flex flex-col justify-between">
                
                {orderSentToast && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="absolute top-10 left-3 right-3 bg-emerald-600 text-white p-2 rounded-xl shadow-lg text-[10px] font-bold flex items-center justify-between z-40"
                  >
                    <span>Order Sent & Bell Chimed!</span>
                    <span className="text-[9px] bg-emerald-800 px-1 py-0.5 rounded font-mono">0.2s</span>
                  </motion.div>
                )}

                <div className="bg-[#FAF8F5] rounded-[30px] p-4 text-[#111111] h-full flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-1.5 mb-2">
                      <div>
                        <h4 className="font-black text-xs text-[#111111] truncate">{demoRestaurantName}</h4>
                        <p className="text-[9px] text-[#737373]">Table #{selectedTableNum} Menu</p>
                      </div>
                      <span className="bg-[#7650E8]/10 text-[#7650E8] text-[9px] font-bold px-1.5 py-0.5 rounded">Self Order</span>
                    </div>

                    <div className="space-y-1.5 max-h-[260px] overflow-y-auto no-scrollbar">
                      {menuCatalogDemo.map((item) => {
                        const inCart = cartItems.find((c) => c.id === item.id);
                        return (
                          <div key={item.id} className="bg-white p-2 rounded-xl border border-[#E9E9EE] flex justify-between items-center text-xs">
                            <div>
                              <p className="font-bold text-[#111111] text-[11px]">{item.name}</p>
                              <p className="text-[#7650E8] font-bold text-[10px]">₹{item.price}</p>
                            </div>
                            {inCart ? (
                              <div className="flex items-center space-x-1 bg-[#7650E8]/10 px-1.5 py-0.5 rounded-lg text-[#7650E8] font-bold">
                                <button onClick={() => handleRemoveFromCart(item.id)}>-</button>
                                <span>{inCart.qty}</span>
                                <button onClick={() => handleAddItemToCart(item)}>+</button>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleAddItemToCart(item)}
                                className="bg-[#111111] text-white text-[9px] font-bold px-2 py-1 rounded-lg"
                              >
                                + Add
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendOrderToKitchen}
                    disabled={cartItems.length === 0}
                    className="w-full bg-[#7650E8] text-white p-2.5 rounded-xl font-bold text-xs flex justify-between items-center shadow-md disabled:opacity-50"
                  >
                    <span>Send Order to KDS</span>
                    <span>₹{cartTotal} →</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Device 3: Live KDS Display Ticket */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-600 mb-3 font-mono">
                3. Live KDS Stream
              </span>
              <div className="w-full max-w-[300px] h-[520px] bg-stone-900 p-3 rounded-[40px] shadow-2xl border-[4px] border-stone-800 relative flex flex-col justify-between">
                <div className="bg-[#FAF8F5] rounded-[30px] p-4 text-[#111111] h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                      <span className="font-bold text-xs text-[#111111]">Kitchen Display Screen</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Live Stream</span>
                    </div>

                    {liveKdsOrder ? (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-3 border-2 border-t-4 border-t-[#7650E8] border-[#E9E9EE] space-y-2 font-mono text-xs shadow-md"
                      >
                        <div className="flex justify-between items-center border-b border-dashed border-stone-200 pb-1 text-[10px]">
                          <span className="font-bold">{liveKdsOrder.id}</span>
                          <span className="text-[#7650E8] font-bold">TABLE #{liveKdsOrder.table}</span>
                        </div>
                        <div className="space-y-1 text-[10px]">
                          {liveKdsOrder.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-[#111111]">
                              <span>{item.name}</span>
                              <span className="font-bold">x{item.qty}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-dashed border-stone-200 flex gap-1">
                          <button
                            onClick={() => setLiveKdsOrder({ ...liveKdsOrder, status: "preparing" })}
                            className={`flex-1 py-1 rounded text-[9px] font-bold ${
                              liveKdsOrder.status === "preparing" ? "bg-[#7650E8] text-white" : "bg-stone-100 text-[#111111]"
                            }`}
                          >
                            🍳 Cooking
                          </button>
                          <button
                            onClick={() => setLiveKdsOrder({ ...liveKdsOrder, status: "ready" })}
                            className={`flex-1 py-1 rounded text-[9px] font-bold ${
                              liveKdsOrder.status === "ready" ? "bg-emerald-600 text-white" : "bg-stone-100 text-[#111111]"
                            }`}
                          >
                            ✅ Serve
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <p className="text-[#737373] text-[10px] text-center">No active kitchen orders.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. FINANCIAL SAVINGS & ROI CALCULATOR SECTION */}
      <section id="roi-calculator" className="py-24 bg-white border-b border-[#E9E9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-3"
          >
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
              Calculate Your Monthly Savings
            </h2>
            <p className="text-[#737373] text-base font-medium">
              Adjust the sliders to match your restaurant outlet's capacity and see how much profit you keep with NextDine's flat ₹999/mo plan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white border border-[#E9E9EE] rounded-3xl p-6 sm:p-10 shadow-lg grid lg:grid-cols-12 gap-8 items-center"
          >
            {/* Sliders Input Side */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-[#555555]">Dining Tables in Outlet:</span>
                  <span className="text-[#7650E8] font-mono font-black text-base">{calcTables} Tables</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={calcTables}
                  onChange={(e) => setCalcTables(parseInt(e.target.value))}
                  className="w-full accent-[#7650E8] bg-stone-200 h-2.5 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-[#555555]">Daily Order Count:</span>
                  <span className="text-[#7650E8] font-mono font-black text-base">{calcDailyOrders} Orders / Day</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="5"
                  value={calcDailyOrders}
                  onChange={(e) => setCalcDailyOrders(parseInt(e.target.value))}
                  className="w-full accent-[#7650E8] bg-stone-200 h-2.5 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                  <span className="text-[#555555]">Average Order Value (AOV):</span>
                  <span className="text-[#7650E8] font-mono font-black text-base">₹{calcAvgOrderValue}</span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1500"
                  step="25"
                  value={calcAvgOrderValue}
                  onChange={(e) => setCalcAvgOrderValue(parseInt(e.target.value))}
                  className="w-full accent-[#7650E8] bg-stone-200 h-2.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Results Side */}
            <div className="lg:col-span-5 bg-[#F8F8FA] border border-[#E9E9EE] rounded-2xl p-6 space-y-5 text-center shadow-inner">
              <div>
                <p className="text-xs uppercase font-extrabold text-[#737373] tracking-wider font-mono">Estimated Monthly Savings</p>
                <p className="text-4xl sm:text-5xl font-black text-[#111111] mt-1 font-mono">
                  ₹{aggregatorCommissionSaved.toLocaleString("en-IN")}
                </p>
                <p className="text-[11px] text-[#737373] mt-1 font-semibold">Saved vs 22% aggregator commission fees</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E9E9EE] text-left">
                <div className="bg-white p-3 rounded-xl border border-[#E9E9EE]">
                  <p className="text-[10px] text-[#737373] font-bold uppercase font-mono">Time Saved Daily</p>
                  <p className="text-base font-black text-emerald-600 mt-0.5 font-mono">
                    ~{Math.round(minutesSavedPerDay / 60)} Hours
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#E9E9EE]">
                  <p className="text-[10px] text-[#737373] font-bold uppercase font-mono">NextDine Fee</p>
                  <p className="text-base font-black text-[#7650E8] mt-0.5 font-mono">
                    Flat ₹999/mo
                  </p>
                </div>
              </div>

              <Link to="/register" className="block pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#FF625E] hover:bg-[#e8504c] text-white font-bold py-3 rounded-xl shadow-md text-xs uppercase tracking-wider"
                >
                  Claim Your Savings Now →
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8. PRICING SECTION (PRESERVING NEXTDINE ₹999/MO PLAN) */}
      <section id="pricing-section" className="py-24 bg-[#F8F8FA] border-b border-[#E9E9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-3"
          >
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
              {LANDING_PAGE_CONTENT.pricing.title}
            </h2>
            <p className="text-[#737373] text-base font-medium">
              {LANDING_PAGE_CONTENT.pricing.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl mx-auto bg-white border-2 border-[#7650E8] rounded-3xl p-8 sm:p-12 shadow-2xl relative"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7650E8] text-white px-5 py-1 rounded-full text-xs font-black tracking-widest uppercase shadow-md font-mono"
            >
              ⚡ DONE-FOR-YOU OUTLET SETUP
            </motion.div>

            <div className="text-center mb-8 border-b border-[#E9E9EE] pb-8 space-y-3">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl sm:text-6xl font-black text-[#111111] font-mono">₹999</span>
                <span className="text-base font-bold text-[#737373] ml-2">/ month</span>
              </div>

              <div className="inline-flex items-center space-x-2 bg-[#7650E8]/10 border border-[#7650E8]/30 px-4 py-2 rounded-full text-[#7650E8] text-xs font-black font-mono">
                <span>+ ₹2,999 ONE-TIME ONBOARDING</span>
              </div>

              <p className="text-xs text-[#737373] font-medium pt-1">
                Everything is configured and uploaded by our dedicated team for your restaurant!
              </p>
            </div>

            <div className="space-y-3.5 mb-8">
              <p className="text-xs font-black uppercase text-[#7650E8] tracking-wider mb-2 font-mono">INCLUDED IN YOUR PACKAGE:</p>
              {LANDING_PAGE_CONTENT.pricing.featuresIncluded.map((feature, i) => (
                <div key={i} className="flex items-center text-xs sm:text-sm font-bold text-[#111111]">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center mr-3 flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link to="/register" className="w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#FF625E] hover:bg-[#e8504c] text-white font-black py-4.5 rounded-full shadow-lg text-base uppercase tracking-wider"
              >
                Register & Get Started Now →
              </motion.button>
            </Link>

            <p className="text-center text-[11px] text-[#737373] mt-4 font-medium">
              Setup completed within 24 hours. Our team contacts you immediately after registration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
      <section id="faq" className="py-24 bg-white border-b border-[#E9E9EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-3"
          >
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {LANDING_PAGE_CONTENT.faq.items.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-[#F8F8FA] border border-[#E9E9EE] rounded-2xl overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-bold text-[#111111] hover:text-[#7650E8] transition-colors"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#7650E8] flex-shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#737373] flex-shrink-0 ml-2" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-xs sm:text-sm text-[#737373] border-t border-[#E9E9EE] pt-3 leading-relaxed font-medium"
                      >
                        {item.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL PRODUCT SHOWCASE — "ALL-IN-ONE RESTAURANT OS PLATFORM" (CORESHIFT CONNECTED DIAGRAM - FRAMES 17S - 19S) */}
      <section className="py-28 bg-[#F8F8FA] border-b border-[#E9E9EE] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          {/* Central Connected Diagram */}
          <div className="relative max-w-lg mx-auto min-h-[280px] flex items-center justify-center">
            
            {/* Center Purple Tile */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-3xl bg-[#7650E8] text-white flex items-center justify-center font-black text-3xl shadow-2xl shadow-[#7650E8]/40 relative z-20 border-2 border-white"
            >
              <Utensils className="w-10 h-10 text-white" />
            </motion.div>

            {/* Surrounding Connected Feature Tiles (CoreShift Frames 17s - 19s) */}
            
            {/* Top Left Tile — Yellow Accent (Menu) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-2 left-6 w-14 h-14 rounded-2xl bg-[#FFD45C] text-amber-900 flex items-center justify-center shadow-md z-10"
            >
              <Utensils className="w-6 h-6" />
            </motion.div>

            {/* Top Right Tile — Coral Accent (Live KDS) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-2 right-6 w-14 h-14 rounded-2xl bg-[#FF625E] text-white flex items-center justify-center shadow-md z-10"
            >
              <ChefHat className="w-6 h-6" />
            </motion.div>

            {/* Bottom Left Tile — Cyan Accent (Table QR) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-2 left-6 w-14 h-14 rounded-2xl bg-[#5CD8E8] text-slate-900 flex items-center justify-center shadow-md z-10"
            >
              <QrCode className="w-6 h-6" />
            </motion.div>

            {/* Bottom Right Tile — White Card (Analytics) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-2 right-6 w-14 h-14 rounded-2xl bg-white border border-[#E9E9EE] text-[#111111] flex items-center justify-center shadow-md z-10"
            >
              <TrendingUp className="w-6 h-6 text-[#7650E8]" />
            </motion.div>

            {/* SVG Connector Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="#7650E8" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="#FF625E" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#5CD8E8" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="75%" y1="75%" x2="50%" y2="50%" stroke="#7650E8" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight uppercase">
              All-in-one Restaurant OS Platform
            </h2>
            <p className="text-[#737373] text-base font-medium leading-relaxed">
              Connect table QR ordering, digital gourmet menus, live kitchen KDS streams, and owner analytics in one seamless operating system.
            </p>
            <div className="pt-4">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#FF625E] hover:bg-[#e8504c] text-white font-black text-sm px-10 py-4.5 rounded-full shadow-xl shadow-[#FF625E]/25 transition-all uppercase tracking-wider"
                >
                  Start 14-Day Free Trial →
                </motion.button>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 11. LARGE ROUNDED FOOTER WITH CORAL-RED BRANDING (CORESHIFT FRAMES 14S - 16S) */}
      <footer className="bg-white rounded-t-[44px] border-t border-[#E9E9EE] pt-16 pb-12 shadow-2xl relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-16 border-b border-[#E9E9EE] text-xs">
            
            {/* Brand Column */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#7650E8] text-white font-black text-sm flex items-center justify-center">
                  ND
                </div>
                <span className="font-extrabold text-[#111111] text-base tracking-tight">NextDine</span>
              </div>
              <p className="text-[#737373] text-xs max-w-xs leading-relaxed font-medium">
                The complete digital dining operating system built for modern restaurants, cafes, and lounges.
              </p>
            </div>

            {/* Product Column */}
            <div className="space-y-3 font-semibold text-[#555555]">
              <p className="font-black text-[#111111] uppercase tracking-wider text-[11px] font-mono">Product</p>
              <p><a href="#hero-section" className="hover:text-[#7650E8]">QR Table Ordering</a></p>
              <p><a href="#menu-catalog-section" className="hover:text-[#7650E8]">Digital Visual Menu</a></p>
              <p><a href="#features-grid" className="hover:text-[#7650E8]">Kitchen Display (KDS)</a></p>
              <p><a href="#pricing-section" className="hover:text-[#7650E8]">Pricing & Trial</a></p>
            </div>

            {/* Platform Column */}
            <div className="space-y-3 font-semibold text-[#555555]">
              <p className="font-black text-[#111111] uppercase tracking-wider text-[11px] font-mono">Platform</p>
              <p><Link to="/login" className="hover:text-[#7650E8]">Owner Portal</Link></p>
              <p><Link to="/admin/login" className="hover:text-[#7650E8]">Admin Dashboard</Link></p>
              <p><Link to="/customer/menu" className="hover:text-[#7650E8]">Customer Demo Menu</Link></p>
              <p><a href="#roi-calculator" className="hover:text-[#7650E8]">ROI Calculator</a></p>
            </div>

            {/* Business Column */}
            <div className="space-y-3 font-semibold text-[#555555]">
              <p className="font-black text-[#111111] uppercase tracking-wider text-[11px] font-mono">Business</p>
              <p><Link to="/register" className="hover:text-[#7650E8]">Register Outlet</Link></p>
              <p><a href="#how-it-works" className="hover:text-[#7650E8]">Live Operational Demo</a></p>
              <p><a href="#faq" className="hover:text-[#7650E8]">FAQ & Support</a></p>
            </div>

          </div>

          {/* LARGE STYLIZED CORAL-RED GEOMETRIC OUTLINE BRANDING ACROSS FOOTER BOTTOM (CORESHIFT FRAMES 14S - 16S) */}
          <div className="pt-12 text-center relative">
            <h1 className="text-6xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FF625E]/20 via-[#FF625E]/10 to-transparent tracking-tighter uppercase select-none pointer-events-none font-mono">
              NEXTDINE
            </h1>
            <p className="text-[11px] text-[#737373] font-bold font-mono -mt-6">
              © {new Date().getFullYear()} NextDine OS. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* FLOATING QUICK DOCK WIDGET */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
        <a
          href="#how-it-works"
          className="bg-[#7650E8] hover:bg-[#643ed8] text-white p-2.5 rounded-full border border-[#7650E8]/40 shadow-2xl transition-all hover:scale-105 font-mono text-xs font-black px-3.5 hidden md:flex items-center gap-1.5"
          title="Jump to Live Operational Demo"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>SANDBOX</span>
        </a>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleBellSoundDemo}
          className="bg-[#111111] hover:bg-[#222222] text-white p-3 rounded-full border border-stone-700 shadow-2xl transition-all flex items-center gap-2 font-mono text-xs font-black px-4"
          title="Click to test Kitchen Bell Sound!"
        >
          <BellRing className="w-4 h-4 animate-bounce text-[#FF625E]" />
          <span className="hidden sm:inline text-white">BELL 🔔 ({bellTriggeredCount})</span>
        </motion.button>
      </div>

    </div>
  );
};

export default LandingPage;
