import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const LandingFooter: React.FC = () => {
  return (
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pt-12 text-center relative"
        >
          <h1 className="text-6xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#FF625E]/20 via-[#FF625E]/10 to-transparent tracking-tighter uppercase select-none pointer-events-none font-mono">
            NEXTDINE
          </h1>
          <p className="text-[11px] text-[#737373] font-bold font-mono -mt-6">
            © {new Date().getFullYear()} NextDine OS. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
