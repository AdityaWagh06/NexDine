import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useMotionValue, animate } from "framer-motion";
import {
  ArrowRight,
  Check,
  TrendingUp,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FloatingNavbar } from "../../components/landing/FloatingNavbar";
import { LandingFooter } from "../../components/landing/LandingFooter";
import { SEO } from "../../components/common/SEO";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";

const AnimatedNumberCounter: React.FC<{ value: number; prefix?: string; suffix?: string }> = ({
  value,
  prefix = "",
  suffix = "",
}) => {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const count = useMotionValue(value);
  const [displayValue, setDisplayValue] = useState(() => value.toLocaleString("en-IN"));

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value.toLocaleString("en-IN"));
      return;
    }
    const controls = animate(count, value, {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest).toLocaleString("en-IN"));
      },
    });
    return () => controls.stop();
  }, [value, shouldReduceMotion, count]);

  return (
    <span>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};

const PricingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Interactive ROI Calculator State
  const [calcTables, setCalcTables] = useState(15);
  const [calcDailyOrders, setCalcDailyOrders] = useState(85);
  const [calcAvgOrderValue, setCalcAvgOrderValue] = useState(480);

  const monthlyGrossSales = calcDailyOrders * calcAvgOrderValue * 30;
  const aggregatorCommissionSaved = Math.round(monthlyGrossSales * 0.22);
  const minutesSavedPerDay = Math.round(calcDailyOrders * 8);

  const planFeatures = [
    "Table QR Code Ordering Standees & Generators",
    "Unlimited Tables, Seats & Outlets",
    "Unlimited Monthly Guest Orders",
    "Real-Time 0.2s Kitchen Display Stream (KDS)",
    "Instant 1-Tap 86'd Menu & Price Updates",
    "Daily Sales, GST & Item Velocity Reports",
    "Priority WhatsApp & Phone Support",
    "All Future Feature Updates Included",
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#7650E8]/20 selection:text-[#7650E8] font-sans antialiased overflow-x-hidden relative">
      <SEO
        title="Pricing & Unlimited Outlets Plan (₹999/mo)"
        description="Simple, flat ₹999/month pricing with zero commissions. Table QR ordering, unlimited monthly orders, real-time Kitchen Display System, and priority support."
        canonicalPath="/pricing"
      />

      <FloatingNavbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="pt-32 sm:pt-40">
        {/* Header Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <div className="flex justify-center mb-6">
            <Breadcrumbs items={[{ label: "Pricing" }]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FF625E]/10 text-[#FF625E] text-xs font-bold uppercase tracking-wider mb-4 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero Commissions • Flat Monthly Subscription</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_CUBIC }}
            className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight max-w-4xl mx-auto leading-tight mb-6"
          >
            One Transparent Plan. <span className="text-[#7650E8]">₹999 / Month</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_CUBIC }}
            className="text-base sm:text-lg text-[#737373] max-w-2xl mx-auto leading-relaxed mb-8 font-medium"
          >
            No percentage cuts from your food sales. No hidden charges per table. No surprise hardware costs. Everything you need to operate a high-volume outlet.
          </motion.p>
        </section>

        {/* Pricing Card Showcase */}
        <section className="max-w-4xl mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT_CUBIC }}
            className="bg-white rounded-[36px] border-2 border-[#7650E8] p-8 sm:p-12 shadow-2xl shadow-[#7650E8]/10 relative overflow-hidden"
          >
            {/* Popular Badge */}
            <div className="absolute top-6 right-6">
              <span className="bg-[#7650E8] text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md font-mono">
                Everything Included
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
              <div>
                <p className="text-xs font-bold text-[#7650E8] uppercase tracking-wider font-mono mb-2">
                  Full Restaurant Operating System
                </p>
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="text-5xl sm:text-6xl font-black text-[#111111] font-mono">₹999</span>
                  <span className="text-[#737373] font-bold text-sm">/ month</span>
                </div>
                <p className="text-xs text-[#737373] leading-relaxed mb-6 font-medium">
                  Includes full access to Customer QR Menus, Kitchen Display System (KDS), Table Management, and Owner Analytics.
                </p>

                <div className="bg-[#FAF8F5] border border-[#E9E9EE] rounded-2xl p-4 text-xs space-y-1.5">
                  <div className="flex justify-between text-[#555555]">
                    <span>One-time onboarding & QR standees:</span>
                    <strong className="text-[#111111]">₹2,999</strong>
                  </div>
                  <div className="flex justify-between text-[#555555]">
                    <span>Free Trial Duration:</span>
                    <strong className="text-emerald-600 font-bold">14 Days Free</strong>
                  </div>
                  <div className="flex justify-between text-[#555555]">
                    <span>Aggregator commission fee:</span>
                    <strong className="text-emerald-600 font-bold">0% (Keep 100%)</strong>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-3">
                {planFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs text-[#333333] font-semibold">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-[#E9E9EE] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs text-[#737373]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>No credit card required • Cancel anytime without penalty</span>
              </div>
              <Link to="/register" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-[#7650E8] hover:bg-[#643ed8] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg shadow-[#7650E8]/25 transition-all inline-flex items-center justify-center space-x-2"
                >
                  <span>Claim 14-Day Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Interactive Savings Calculator */}
        <section id="roi-calculator" className="bg-[#FAF8F5] py-20 border-t border-[#E9E9EE]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4 font-mono">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Interactive Outlet ROI Calculator</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4">
                Calculate What You Save Over 3rd-Party Apps
              </h2>
              <p className="text-xs sm:text-sm text-[#737373]">
                Food delivery aggregators eat 18% to 26% of your daily revenue. See the math when guests order direct to table.
              </p>
            </div>

            <div className="bg-white rounded-[32px] border border-[#E9E9EE] p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-[#111111] mb-2">
                    <label htmlFor="pricing-calc-tables">Active Dining Tables:</label>
                    <span className="text-[#7650E8] font-mono font-black">{calcTables} Tables</span>
                  </div>
                  <input
                    type="range"
                    id="pricing-calc-tables"
                    name="calcTables"
                    min="5"
                    max="60"
                    value={calcTables}
                    onChange={(e) => setCalcTables(Number(e.target.value))}
                    className="w-full accent-[#7650E8] h-2 bg-[#E9E9EE] rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#111111] mb-2">
                    <label htmlFor="pricing-calc-orders">Daily Guest Orders:</label>
                    <span className="text-[#7650E8] font-mono font-black">{calcDailyOrders} Orders/day</span>
                  </div>
                  <input
                    type="range"
                    id="pricing-calc-orders"
                    name="calcDailyOrders"
                    min="20"
                    max="400"
                    step="5"
                    value={calcDailyOrders}
                    onChange={(e) => setCalcDailyOrders(Number(e.target.value))}
                    className="w-full accent-[#7650E8] h-2 bg-[#E9E9EE] rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-[#111111] mb-2">
                    <label htmlFor="pricing-calc-aov">Average Order Value (AOV):</label>
                    <span className="text-[#7650E8] font-mono font-black">₹{calcAvgOrderValue}</span>
                  </div>
                  <input
                    type="range"
                    id="pricing-calc-aov"
                    name="calcAvgOrderValue"
                    min="150"
                    max="2000"
                    step="10"
                    value={calcAvgOrderValue}
                    onChange={(e) => setCalcAvgOrderValue(Number(e.target.value))}
                    className="w-full accent-[#7650E8] h-2 bg-[#E9E9EE] rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Outputs */}
              <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-6 border border-[#E9E9EE] text-center space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider block font-mono">
                    Estimated Monthly Commission Retained
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-600 font-mono my-1">
                    <AnimatedNumberCounter value={aggregatorCommissionSaved} prefix="₹" />
                  </div>
                  <p className="text-[11px] text-[#737373]">
                    Based on 22% typical aggregator commission cut
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E9E9EE] grid grid-cols-2 gap-2 text-left text-xs">
                  <div>
                    <span className="text-[10px] text-[#737373] uppercase font-mono block">Monthly Gross</span>
                    <strong className="text-[#111111] font-mono">
                      <AnimatedNumberCounter value={monthlyGrossSales} prefix="₹" />
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#737373] uppercase font-mono block">Staff Time Saved</span>
                    <strong className="text-[#7650E8] font-mono">{minutesSavedPerDay} min / day</strong>
                  </div>
                </div>

                <Link to="/register" className="block pt-2">
                  <button className="w-full bg-[#111111] hover:bg-[#7650E8] text-white font-extrabold text-xs py-3 rounded-xl transition-all shadow-md">
                    Lock In ₹999/mo Plan →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default PricingPage;
