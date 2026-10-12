import React from "react";
import { motion, type MotionValue } from "framer-motion";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";

interface HeroFloatingCardsProps {
  card1Y: MotionValue<number>;
  card2Y: MotionValue<number>;
  card3Y: MotionValue<number>;
  card4Y: MotionValue<number>;
  card5Y: MotionValue<number>;
  card6Y: MotionValue<number>;
  card1Rotate: MotionValue<number>;
  card2Rotate: MotionValue<number>;
  card4Rotate: MotionValue<number>;
  card6Rotate: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}

export const HeroFloatingCards: React.FC<HeroFloatingCardsProps> = ({
  card1Y,
  card2Y,
  card3Y,
  card4Y,
  card5Y,
  card6Y,
  card1Rotate,
  card2Rotate,
  card4Rotate,
  card6Rotate,
  shouldReduceMotion,
}) => {
  return (
    <>
      {/* Floating Card 1 — Top Left: Upper card moves in from top-left */}
      <motion.div
        style={{ y: card1Y, rotate: card1Rotate }}
        initial={{ opacity: 0, x: -45, y: -25, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.6, ease: EASE_OUT_CUBIC }}
        className="hidden lg:block absolute top-20 left-4 xl:left-8 z-20 pointer-events-auto"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -6, 0], rotate: [0, 0.8, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-44 rounded-2xl border border-[#E9E9EE] bg-white p-2 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
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
      </motion.div>

      {/* Floating Card 2 — Mid Left: Left-side card moves in from the left */}
      <motion.div
        style={{ y: card2Y, rotate: card2Rotate }}
        initial={{ opacity: 0, x: -60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.72, ease: EASE_OUT_CUBIC }}
        className="hidden lg:block absolute top-[290px] left-6 xl:left-12 z-20 pointer-events-auto"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-48 rounded-2xl border border-[#7650E8]/30 bg-white p-3 shadow-2xl hover:shadow-2xl transition-shadow cursor-pointer"
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
      </motion.div>

      {/* Floating Card 3 — Bottom Left: Stable settled card framing bottom */}
      <motion.div
        style={{ y: card3Y }}
        initial={{ opacity: 0, x: -40, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.84, ease: EASE_OUT_CUBIC }}
        className="hidden lg:block absolute bottom-4 left-6 xl:left-12 z-20 pointer-events-auto"
      >
        <div className="w-40 rounded-2xl border border-[#E9E9EE] bg-white p-2 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer -rotate-6">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"
            alt="Customer Ordering at Restaurant Table"
            className="w-full h-32 object-cover rounded-xl mb-1.5"
          />
          <p className="text-[10px] font-black text-[#111111] text-center">Scan & Self Order</p>
        </div>
      </motion.div>

      {/* Floating Card 4 — Top Right: Upper card moves in from top-right */}
      <motion.div
        style={{ y: card4Y, rotate: card4Rotate }}
        initial={{ opacity: 0, x: 45, y: -25, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.65, ease: EASE_OUT_CUBIC }}
        className="hidden lg:block absolute top-20 right-4 xl:right-8 z-20 pointer-events-auto"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -7, 0], rotate: [0, -0.8, 0] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-44 rounded-2xl border border-[#E9E9EE] bg-white p-2 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
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
      </motion.div>

      {/* Floating Card 5 — Mid Right: Right-side card moves in from the right */}
      <motion.div
        style={{ y: card5Y }}
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.78, ease: EASE_OUT_CUBIC }}
        className="hidden lg:block absolute top-[290px] right-6 xl:right-12 z-20 pointer-events-auto"
      >
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 6.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-50 rounded-2xl border border-[#E9E9EE] bg-white p-3 shadow-2xl hover:shadow-2xl transition-shadow cursor-pointer -rotate-2"
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
      </motion.div>

      {/* Floating Card 6 — Bottom Right: Stable settled card framing bottom */}
      <motion.div
        style={{ y: card6Y, rotate: card6Rotate }}
        initial={{ opacity: 0, x: 40, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.9, ease: EASE_OUT_CUBIC }}
        className="hidden lg:block absolute bottom-4 right-6 xl:right-12 z-20 pointer-events-auto"
      >
        <div className="w-40 rounded-2xl border border-[#E9E9EE] bg-white p-2 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
            alt="Restaurant Dining Ambiance"
            className="w-full h-32 object-cover rounded-xl mb-1.5"
          />
          <p className="text-[10px] font-black text-[#111111] text-center">Faster Table Turns</p>
        </div>
      </motion.div>
    </>
  );
};
