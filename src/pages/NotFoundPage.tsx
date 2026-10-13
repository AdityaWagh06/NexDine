import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  ArrowRight,
  Search,
  Utensils,
  Smartphone,
  CreditCard,
  ChefHat,
  HelpCircle,
  LogIn,
} from "lucide-react";
import { SEO } from "../components/common/SEO";
import { EASE_OUT_CUBIC } from "../utils/motionVariants";

const quickDestinations = [
  {
    title: "Table QR Ordering & KDS",
    description: "Explore the complete digital dining operating system.",
    href: "/#hero-section",
    icon: Smartphone,
    color: "text-[#7650E8] bg-[#7650E8]/10",
  },
  {
    title: "Visual Gourmet Menu",
    description: "High-resolution dish photography and filter catalog.",
    href: "/#menu-catalog-section",
    icon: Utensils,
    color: "text-[#5CD8E8] bg-[#5CD8E8]/10",
  },
  {
    title: "Transparent Pricing (₹999/mo)",
    description: "Everything included with zero commission charges.",
    href: "/#pricing-section",
    icon: CreditCard,
    color: "text-[#FF625E] bg-[#FF625E]/10",
  },
  {
    title: "Sample Customer Menu Demo",
    description: "Experience the frictionless guest ordering flow.",
    href: "/menu/pizza-palace",
    icon: ChefHat,
    color: "text-[#FFD45C] bg-[#FFD45C]/10",
  },
  {
    title: "Frequently Asked Questions",
    description: "Hardware requirements, thermal printing, and setup.",
    href: "/#faq",
    icon: HelpCircle,
    color: "text-[#7650E8] bg-[#7650E8]/10",
  },
  {
    title: "Restaurant Owner Login",
    description: "Sign in to manage your tables, orders, and sales.",
    href: "/login",
    icon: LogIn,
    color: "text-[#111111] bg-[#111111]/10",
  },
];

const NotFoundPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    if (query.includes("price") || query.includes("cost") || query.includes("999") || query.includes("plan")) {
      navigate("/#pricing-section");
    } else if (query.includes("menu") || query.includes("food") || query.includes("dish")) {
      navigate("/#menu-catalog-section");
    } else if (query.includes("login") || query.includes("sign in")) {
      navigate("/login");
    } else if (query.includes("register") || query.includes("signup") || query.includes("trial")) {
      navigate("/register");
    } else if (query.includes("kds") || query.includes("kitchen") || query.includes("order")) {
      navigate("/#how-it-works");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#111111] selection:bg-[#7650E8]/20 selection:text-[#7650E8] font-sans antialiased flex flex-col justify-between relative overflow-hidden">
      <SEO
        title="404 — Page Not Found"
        description="The requested page on NextDine could not be found. Explore our table QR ordering system, visual menu catalog, or pricing."
        canonicalPath="/404"
        noindex
      />

      {/* Decorative Background Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-[#7650E8]/10 via-[#FF625E]/5 to-[#5CD8E8]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Floating Mini Header */}
      <header className="pt-6 px-6 max-w-6xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#7650E8] text-white font-black text-sm flex items-center justify-center shadow-md shadow-[#7650E8]/20">
            ND
          </div>
          <span className="text-base font-extrabold tracking-tight text-[#111111]">
            Next<span className="text-[#7650E8]">Dine</span>
          </span>
        </Link>
        <Link
          to="/"
          className="text-xs font-bold text-[#737373] hover:text-[#7650E8] transition-colors flex items-center space-x-1"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </header>

      {/* Main 404 Hero Container */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16 text-center w-full my-auto">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF625E]/10 border border-[#FF625E]/20 text-[#FF625E] font-bold text-xs uppercase tracking-wider mb-6 font-mono"
        >
          <span>Error 404 • Destination Unreachable</span>
        </motion.div>

        {/* Large Decorative 404 Glyph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          className="relative mb-4"
        >
          <span className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#111111] via-[#333333] to-[#888888] font-mono select-none">
            404
          </span>
        </motion.div>

        {/* Single Clear Heading (H1) */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_CUBIC }}
          className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4"
        >
          Table Not Found Or Link Relocated
        </motion.h1>

        {/* Descriptive Body */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_CUBIC }}
          className="text-sm sm:text-base text-[#737373] max-w-xl mx-auto leading-relaxed mb-8 font-medium"
        >
          The page or restaurant table QR context you were looking for doesn't exist or may have been updated. Choose a destination below to continue.
        </motion.p>

        {/* Interactive Quick Search */}
        <motion.form
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT_CUBIC }}
          onSubmit={handleSearchSubmit}
          className="max-w-md mx-auto mb-12 relative"
        >
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-[#737373] absolute left-4 pointer-events-none" />
            <input
              type="text"
              id="404-search-input"
              name="search"
              aria-label="Search NextDine destinations"
              placeholder="Search features, pricing, menu, login..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#E9E9EE] rounded-full pl-11 pr-28 py-3.5 text-xs text-[#111111] placeholder:text-[#999999] shadow-sm focus:outline-none focus:border-[#7650E8] focus:ring-2 focus:ring-[#7650E8]/20 transition-all font-medium"
            />
            <button
              type="submit"
              className="absolute right-2 bg-[#7650E8] hover:bg-[#643ed8] text-white font-bold text-xs px-4 py-2 rounded-full transition-all flex items-center space-x-1"
            >
              <span>Jump</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.form>

        {/* Helpful Suggested Destination Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT_CUBIC }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-10"
        >
          {quickDestinations.map((dest, idx) => {
            const Icon = dest.icon;
            return (
              <a
                key={idx}
                href={dest.href}
                className="p-4 rounded-2xl bg-white border border-[#E9E9EE] hover:border-[#7650E8]/40 hover:shadow-md transition-all group block"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 rounded-xl ${dest.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="text-xs font-bold text-[#111111] group-hover:text-[#7650E8] transition-colors leading-snug">
                    {dest.title}
                  </h2>
                </div>
                <p className="text-[11px] text-[#737373] leading-relaxed line-clamp-2">
                  {dest.description}
                </p>
              </a>
            );
          })}
        </motion.div>

        {/* Primary Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT_CUBIC }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="bg-[#7650E8] hover:bg-[#643ed8] text-white font-extrabold text-xs px-6 py-3.5 rounded-full shadow-md shadow-[#7650E8]/20 transition-all flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to NextDine Home</span>
            </motion.button>
          </Link>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white hover:bg-[#F8F8FA] border border-[#E9E9EE] text-[#111111] font-bold text-xs px-6 py-3.5 rounded-full transition-all shadow-xs"
            >
              <span>Register New Restaurant</span>
            </motion.button>
          </Link>
        </motion.div>
      </main>

      {/* Subtle Footer */}
      <footer className="py-6 text-center text-xs text-[#737373] font-medium border-t border-[#E9E9EE]/60 bg-white/50">
        <p>© {new Date().getFullYear()} NextDine OS • Smart QR Ordering for Modern Restaurants</p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
