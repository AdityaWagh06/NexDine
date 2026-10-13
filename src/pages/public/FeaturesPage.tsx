import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { FloatingNavbar } from "../../components/landing/FloatingNavbar";
import { LandingFooter } from "../../components/landing/LandingFooter";
import { BentoFeatureGrid } from "../../components/landing/BentoFeatureGrid";
import { VisualMenuCatalog } from "../../components/landing/VisualMenuCatalog";
import { SEO } from "../../components/common/SEO";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";

const FeaturesPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#7650E8]/20 selection:text-[#7650E8] font-sans antialiased overflow-x-hidden relative">
      <SEO
        title="Features & Restaurant OS Capabilities"
        description="Explore NextDine's end-to-end feature grid: contactless table QR codes, 0.2s Kitchen Display System, 1-tap 86'd menu sync, and real-time sales telemetry."
        canonicalPath="/features"
      />

      <FloatingNavbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="pt-32 sm:pt-40">
        {/* Header Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <div className="flex justify-center mb-6">
            <Breadcrumbs items={[{ label: "Features" }]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#7650E8]/10 text-[#7650E8] text-xs font-bold uppercase tracking-wider mb-4 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Digital Dining Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_CUBIC }}
            className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight max-w-4xl mx-auto leading-tight mb-6"
          >
            Built For <span className="text-[#7650E8]">Modern Outlets</span> — Every Tool You Need.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_CUBIC }}
            className="text-base sm:text-lg text-[#737373] max-w-2xl mx-auto leading-relaxed mb-8 font-medium"
          >
            From customer phone scan to the kitchen wok, discover how NextDine eliminates waiter order errors, speeds up table turnaround, and provides owners with 100% direct revenue.
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#555555]">
            <span className="flex items-center space-x-1.5 bg-[#F8F8FA] border border-[#E9E9EE] px-3.5 py-1.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>0.2s Kitchen Dispatch</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-[#F8F8FA] border border-[#E9E9EE] px-3.5 py-1.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero App Downloads</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-[#F8F8FA] border border-[#E9E9EE] px-3.5 py-1.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Unlimited Tables & Outlets</span>
            </span>
          </div>
        </section>

        {/* Bento Features Grid Component */}
        <BentoFeatureGrid />

        {/* High Resolution Visual Menu Catalog Component */}
        <VisualMenuCatalog />

        {/* CTA Strip */}
        <section className="bg-gradient-to-b from-white via-[#F8F8FA] to-white py-20 text-center border-t border-[#E9E9EE]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] tracking-tight mb-4">
              Ready to Upgrade Your Dining Room?
            </h2>
            <p className="text-sm text-[#737373] mb-8 max-w-lg mx-auto">
              Launch table QR ordering and connect your kitchen in under 15 minutes.
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#7650E8] hover:bg-[#643ed8] text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg shadow-[#7650E8]/25 transition-all inline-flex items-center space-x-2"
              >
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default FeaturesPage;
