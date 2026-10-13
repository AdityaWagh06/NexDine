import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, Phone, MessageSquare } from "lucide-react";
import { FloatingNavbar } from "../../components/landing/FloatingNavbar";
import { LandingFooter } from "../../components/landing/LandingFooter";
import { SEO } from "../../components/common/SEO";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";

const faqs = [
  {
    q: "Do guests need to download an application from the App Store or Play Store?",
    a: "No! NextDine is 100% web-native. Guests scan the QR standee on their table using their native phone camera (iOS or Android) and the gourmet digital menu loads instantly in mobile Safari or Chrome without any download or account registration.",
    category: "Guest Experience",
  },
  {
    q: "What hardware or screens do we need in the restaurant?",
    a: "NextDine works on any hardware you already own! The Kitchen Display System (KDS) runs smoothly on any Android tablet, iPad, kitchen touchscreen monitor, or cheap commercial smart TV browser. Wait staff can also access order status from any smartphone.",
    category: "Hardware & Setup",
  },
  {
    q: "Can we still use our existing thermal receipt printers?",
    a: "Yes! NextDine supports ESC/POS standard thermal receipt printing via USB, Wi-Fi, and Bluetooth network printers (EPSON, TVS, Star Micronics, and generic 58mm/80mm thermal models). Kitchen tickets and customer bills print automatically or on-demand.",
    category: "Printing & POS",
  },
  {
    q: "How does the 14-day free trial work? Is a credit card required?",
    a: "You can start your 14-day free trial immediately without providing any credit card or payment details. You get full access to create your menu, configure tables, test the kitchen display, and experience the speed before subscribing.",
    category: "Pricing & Billing",
  },
  {
    q: "Are there any hidden commissions or order volume limits?",
    a: "Absolutely zero hidden fees and zero percentage cuts. You pay a simple flat subscription of ₹999/month. You can process 50 orders or 50,000 orders every month without paying a single extra rupee in commission fees.",
    category: "Pricing & Billing",
  },
  {
    q: "What happens if an ingredient runs out during a busy dinner shift?",
    a: "You can '86' or toggle any dish out of stock with one tap from the Restaurant Manager dashboard on your phone. The item instantly updates to 'Sold Out' on all customer menus in real-time, preventing waiter order mixups.",
    category: "Menu Operations",
  },
  {
    q: "Can multiple guests at the same table order together?",
    a: "Yes! The table QR code retains table session context. Multiple guests can browse simultaneously on their own phones, add dishes, and send orders directly to the kitchen under the same table identifier.",
    category: "Guest Experience",
  },
];

const FaqPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#7650E8]/20 selection:text-[#7650E8] font-sans antialiased overflow-x-hidden relative">
      <SEO
        title="Frequently Asked Questions & Restaurant Help"
        description="Got questions about NextDine? Learn about hardware compatibility, thermal receipt printing, table QR codes, zero commissions, and our 14-day free trial."
        canonicalPath="/faq"
      />

      <FloatingNavbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="pt-32 sm:pt-40">
        {/* Header Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <div className="flex justify-center mb-6">
            <Breadcrumbs items={[{ label: "FAQ" }]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#7650E8]/10 text-[#7650E8] text-xs font-bold uppercase tracking-wider mb-4 font-mono"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support & Documentation</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_CUBIC }}
            className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight max-w-3xl mx-auto leading-tight mb-6"
          >
            Frequently Asked <span className="text-[#7650E8]">Questions</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_CUBIC }}
            className="text-base sm:text-lg text-[#737373] max-w-xl mx-auto leading-relaxed mb-8 font-medium"
          >
            Everything you need to know about setting up NextDine in your restaurant, cafe, bar, or cloud kitchen.
          </motion.p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-12">
            <Search className="w-4 h-4 text-[#737373] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="faq-search-input"
              name="faqSearch"
              aria-label="Filter frequently asked questions"
              placeholder="Search hardware, printers, pricing, WiFi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-[#E9E9EE] rounded-full pl-11 pr-4 py-3.5 text-xs text-[#111111] placeholder:text-[#999999] shadow-sm focus:outline-none focus:border-[#7650E8] focus:ring-2 focus:ring-[#7650E8]/20 transition-all font-medium"
            />
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#E9E9EE] shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none group"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                  >
                    <span className="font-extrabold text-sm sm:text-base text-[#111111] group-hover:text-[#7650E8] transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center flex-shrink-0 text-[#737373]"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT_CUBIC }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-xs sm:text-sm text-[#737373] leading-relaxed border-t border-[#E9E9EE]/60 pt-4 font-medium">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Need More Help Card */}
          <div className="mt-16 bg-[#FAF8F5] rounded-3xl border border-[#E9E9EE] p-8 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] mb-2">
              Have a Specific Hardware or Menu Setup Question?
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] max-w-lg mx-auto mb-6">
              Our restaurant implementation team in Mumbai is available on WhatsApp and phone to help you onboard your staff.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/contact">
                <button className="bg-[#7650E8] hover:bg-[#643ed8] text-white font-extrabold text-xs px-6 py-3 rounded-full transition-all flex items-center space-x-2 shadow-md">
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Support Desk</span>
                </button>
              </Link>
              <a
                href="tel:+919876543210"
                className="bg-white border border-[#E9E9EE] text-[#111111] font-bold text-xs px-5 py-3 rounded-full transition-all flex items-center space-x-2 shadow-xs hover:border-[#7650E8]"
              >
                <Phone className="w-4 h-4 text-[#7650E8]" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default FaqPage;
