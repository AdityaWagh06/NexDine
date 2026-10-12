import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT_CUBIC, STANDARD_DURATION } from "../../utils/motionVariants";

export const LandingFooter: React.FC = () => {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const columnVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_OUT_CUBIC },
    },
  };

  return (
    <footer className="bg-white rounded-t-[44px] border-t border-[#E9E9EE] pt-16 pb-12 shadow-2xl relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-16 border-b border-[#E9E9EE] text-xs"
        >
          {/* Brand Column */}
          <motion.div variants={columnVariants} className="col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-[#7650E8] text-white font-black text-sm flex items-center justify-center shadow-xs">
                ND
              </div>
              <span className="font-extrabold text-[#111111] text-base tracking-tight">NextDine</span>
            </div>
            <p className="text-[#737373] text-xs max-w-xs leading-relaxed font-medium">
              The complete digital dining operating system built for modern restaurants, cafes, and lounges.
            </p>
          </motion.div>

          {/* Product Column */}
          <motion.div variants={columnVariants} className="space-y-3 font-semibold text-[#555555]">
            <p className="font-black text-[#111111] uppercase tracking-wider text-[11px] font-mono">Product</p>
            <p><a href="#hero-section" className="hover:text-[#7650E8] transition-colors">QR Table Ordering</a></p>
            <p><a href="#menu-catalog-section" className="hover:text-[#7650E8] transition-colors">Digital Visual Menu</a></p>
            <p><a href="#features-grid" className="hover:text-[#7650E8] transition-colors">Kitchen Display (KDS)</a></p>
            <p><a href="#pricing-section" className="hover:text-[#7650E8] transition-colors">Pricing & Trial</a></p>
          </motion.div>

          {/* Platform Column */}
          <motion.div variants={columnVariants} className="space-y-3 font-semibold text-[#555555]">
            <p className="font-black text-[#111111] uppercase tracking-wider text-[11px] font-mono">Platform</p>
            <p><Link to="/login" className="hover:text-[#7650E8] transition-colors">Owner Portal</Link></p>
            <p><Link to="/admin/login" className="hover:text-[#7650E8] transition-colors">Admin Dashboard</Link></p>
            <p><Link to="/customer/menu" className="hover:text-[#7650E8] transition-colors">Customer Demo Menu</Link></p>
            <p><a href="#roi-calculator" className="hover:text-[#7650E8] transition-colors">ROI Calculator</a></p>
          </motion.div>

          {/* Business Column */}
          <motion.div variants={columnVariants} className="space-y-3 font-semibold text-[#555555]">
            <p className="font-black text-[#111111] uppercase tracking-wider text-[11px] font-mono">Business</p>
            <p><Link to="/register" className="hover:text-[#7650E8] transition-colors">Register Outlet</Link></p>
            <p><a href="#how-it-works" className="hover:text-[#7650E8] transition-colors">Live Operational Demo</a></p>
            <p><a href="#faq" className="hover:text-[#7650E8] transition-colors">FAQ & Support</a></p>
          </motion.div>
        </motion.div>

        {/* LARGE STYLIZED CORAL-RED GEOMETRIC OUTLINE BRANDING ACROSS FOOTER BOTTOM */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25, scale: shouldReduceMotion ? 1 : 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: STANDARD_DURATION, ease: EASE_OUT_CUBIC }}
          className="pt-12 text-center relative"
        >
          <h2 className="text-6xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FF625E]/20 via-[#FF625E]/10 to-transparent tracking-tighter uppercase select-none pointer-events-none font-mono">
            NEXTDINE
          </h2>
          <p className="text-[11px] text-[#737373] font-bold font-mono -mt-6">
            © {new Date().getFullYear()} NextDine OS. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
