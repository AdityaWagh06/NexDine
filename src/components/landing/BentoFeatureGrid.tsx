import React from "react";
import { motion, type MotionValue } from "framer-motion";
import { Smartphone, Zap, ChefHat, TrendingUp, QrCode } from "lucide-react";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";

interface BentoFeatureGridProps {
  featuresRef?: React.RefObject<HTMLElement | null>;
  featuresParallaxY?: MotionValue<number>;
  shouldReduceMotion?: boolean | null;
}

export const BentoFeatureGrid: React.FC<BentoFeatureGridProps> = ({
  featuresRef,
  featuresParallaxY,
  shouldReduceMotion = false,
}) => {
  return (
    <section
      ref={featuresRef}
      id="features-grid"
      className="py-16 sm:py-20 bg-[#F8F8FA] border-y border-[#E9E9EE] relative overflow-hidden"
    >
      {/* Subtle scroll-linked decorative ambient drift */}
      <motion.div
        style={{ y: featuresParallaxY || 0 }}
        className="absolute -top-24 right-10 w-96 h-96 bg-[#7650E8]/5 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-2.5"
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
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE_OUT_CUBIC }}
              whileHover={{ y: -5 }}
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
              <div className="mt-8 bg-[#F8F8FA] rounded-2xl p-3 border border-[#E9E9EE] space-y-2 text-xs relative overflow-hidden group/scanner">
                <motion.div
                  animate={shouldReduceMotion ? {} : { y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#7650E8] to-transparent shadow-xs shadow-[#7650E8] z-10"
                />
                <div className="flex justify-between items-center pb-2 border-b border-[#E9E9EE] font-bold">
                  <span className="text-[#7650E8]">Taverna Kitchen</span>
                  <span className="bg-[#7650E8]/10 text-[#7650E8] px-2 py-0.5 rounded text-[10px] flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7650E8] animate-pulse" />
                    Table #04
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-semibold text-[#111111]">
                  <span>Paneer Butter Masala</span>
                  <span className="text-[#7650E8] font-mono font-bold">₹260</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="w-full bg-[#7650E8] hover:bg-[#643ed8] text-white py-1.5 rounded-lg font-bold text-[10px] uppercase transition-colors"
                >
                  + Add To Cart
                </motion.button>
              </div>
            </motion.div>

            {/* Card 2 — Real-Time Order Management */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.65, delay: 0.22, ease: EASE_OUT_CUBIC }}
              whileHover={{ y: -5 }}
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
                  <span className="text-[#111111] flex items-center gap-1.5 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                    Order #104 Sync
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    0.2s Stream
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden relative">
                  <motion.div
                    animate={shouldReduceMotion ? {} : { width: ["15%", "92%", "15%"] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-gradient-to-r from-emerald-500 to-[#5CD8E8] h-full rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Live Kitchen Display (KDS) */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.65, delay: 0.34, ease: EASE_OUT_CUBIC }}
              whileHover={{ y: -5 }}
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
                  animate={shouldReduceMotion ? {} : { x: [-3, 0, -3] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex justify-between items-center border-b border-dashed border-stone-300 pb-1.5 text-[11px]"
                >
                  <span className="font-bold text-[#111111]">TICKET #104</span>
                  <span className="text-[#FF625E] bg-[#FF625E]/10 px-2 py-0.5 rounded text-[10px] font-black tracking-wider">
                    COOKING
                  </span>
                </motion.div>
                <p className="text-[10px] text-[#555555] font-semibold">2x Paneer Masala • 4x Naan</p>
              </div>
            </motion.div>
          </div>

          {/* ROW 2: 2 WIDER CARDS */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 4 (Wide) — Owner Dashboard & Sales Analytics */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT_CUBIC }}
              whileHover={{ y: -5 }}
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
                <div className="bg-white p-3 rounded-xl border border-[#E9E9EE] hover:border-[#7650E8]/30 transition-colors">
                  <span className="text-[10px] text-[#737373] font-bold block uppercase font-mono">Gross Sales</span>
                  <span className="text-base font-black text-[#111111] font-mono">₹85,400</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E9E9EE] hover:border-emerald-300 transition-colors">
                  <span className="text-[10px] text-[#737373] font-bold block uppercase font-mono">Saved Fees</span>
                  <span className="text-base font-black text-emerald-600 font-mono">₹18,700</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-[#E9E9EE] col-span-2 sm:col-span-1 hover:border-[#7650E8]/30 transition-colors">
                  <span className="text-[10px] text-[#737373] font-bold block uppercase font-mono">Active Outlets</span>
                  <span className="text-base font-black text-[#7650E8] font-mono">450+ Outlets</span>
                </div>
              </div>
            </motion.div>

            {/* Card 5 (Wide) — 1-Tap Menu & Table Management */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.65, delay: 0.24, ease: EASE_OUT_CUBIC }}
              whileHover={{ y: -5 }}
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
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-3 py-1 rounded-full uppercase font-mono">
                    1-Tap Active
                  </span>
                  <div className="w-9 h-5 bg-emerald-500 rounded-full p-0.5 flex items-center justify-end shadow-xs">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
