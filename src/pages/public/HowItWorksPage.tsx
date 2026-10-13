import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, BellRing } from "lucide-react";
import { FloatingNavbar } from "../../components/landing/FloatingNavbar";
import { LandingFooter } from "../../components/landing/LandingFooter";
import { WorkflowArcSection } from "../../components/landing/WorkflowArcSection";
import { SEO } from "../../components/common/SEO";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { playKitchenBellSound } from "../../utils/soundEffects";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";

const HowItWorksPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bellCount, setBellCount] = useState(0);

  const handleTestBell = () => {
    playKitchenBellSound();
    setBellCount((c) => c + 1);
  };

  const steps = [
    {
      step: "01",
      title: "Guest Scans Table QR Code",
      description:
        "Every table receives a durable, scratch-resistant acrylic standee with a unique encrypted QR code. Guests simply point their native phone camera to instantly load the digital menu. Zero mobile app download required.",
      badge: "No App Download",
      color: "bg-[#7650E8]",
    },
    {
      step: "02",
      title: "Self-Browse High-Res Visual Menu",
      description:
        "Guests browse high-resolution dish photography, ingredients, chef recommendations, and custom cooking notes. Out-of-stock items (86'd) disappear in real-time, preventing waiter apologies.",
      badge: "Real-Time 86'd Sync",
      color: "bg-[#5CD8E8]",
    },
    {
      step: "03",
      title: "Instant 0.2s Kitchen Dispatch",
      description:
        "The moment the guest taps 'Send to Kitchen', tickets chime and flash on the high-contrast Kitchen Display System (KDS). Line cooks see item modifiers, table numbers, and prep countdown timers immediately.",
      badge: "0.2s KDS Latency",
      color: "bg-[#FF625E]",
    },
    {
      step: "04",
      title: "Seamless Table Service & Direct Billing",
      description:
        "Wait staff deliver food directly to the table with zero notepad transcription errors. Guests can settle bills via UPI, cash, or card with automated GST invoices generated instantly.",
      badge: "Faster Turnaround",
      color: "bg-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#7650E8]/20 selection:text-[#7650E8] font-sans antialiased overflow-x-hidden relative">
      <SEO
        title="How It Works — Frictionless Table to Kitchen Workflow"
        description="Learn how NextDine connects dining tables directly to kitchen display screens in 0.2 seconds. Step-by-step restaurant walkthrough from guest QR scan to meal service."
        canonicalPath="/how-it-works"
      />

      <FloatingNavbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="pt-32 sm:pt-40">
        {/* Header Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <div className="flex justify-center mb-6">
            <Breadcrumbs items={[{ label: "How It Works" }]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#5CD8E8]/10 text-[#0c7885] text-xs font-bold uppercase tracking-wider mb-4 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_CUBIC }}
            className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight max-w-4xl mx-auto leading-tight mb-6"
          >
            From Table Scan To Kitchen Wok In <span className="text-[#7650E8]">0.2 Seconds</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_CUBIC }}
            className="text-base sm:text-lg text-[#737373] max-w-2xl mx-auto leading-relaxed mb-8 font-medium"
          >
            Designed alongside high-volume Indian restaurant operators to eliminate the chaotic rush-hour bottleneck of waiter order taking.
          </motion.p>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleTestBell}
              className="bg-white hover:bg-[#F8F8FA] border border-[#E9E9EE] text-[#111111] font-bold text-xs px-5 py-3 rounded-full transition-all flex items-center space-x-2 shadow-xs"
            >
              <BellRing className="w-4 h-4 text-[#7650E8]" />
              <span>Test Live Kitchen Chime 🔔 ({bellCount})</span>
            </button>
            <Link to="/menu/pizza-palace">
              <button className="bg-[#7650E8] hover:bg-[#643ed8] text-white font-bold text-xs px-5 py-3 rounded-full transition-all shadow-md">
                Try Sample Customer Menu →
              </button>
            </Link>
          </div>
        </section>

        {/* 4 Step Sequential Process Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: EASE_OUT_CUBIC }}
                className="bg-white rounded-[32px] border border-[#E9E9EE] p-8 shadow-md hover:shadow-xl hover:border-[#7650E8]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-[#111111] font-mono tracking-tighter">
                      {st.step}
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-[#7650E8] bg-[#7650E8]/10 px-3 py-1 rounded-full">
                      {st.badge}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#111111] mb-3">
                    {st.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#737373] leading-relaxed font-medium">
                    {st.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Connected Workflow Arc Component */}
        <WorkflowArcSection />
      </main>

      <LandingFooter />
    </div>
  );
};

export default HowItWorksPage;
