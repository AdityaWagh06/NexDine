import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { FloatingNavbar } from "../../components/landing/FloatingNavbar";
import { LandingFooter } from "../../components/landing/LandingFooter";
import { SEO } from "../../components/common/SEO";
import { Breadcrumbs } from "../../components/common/Breadcrumbs";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";

const ContactPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    restaurant: "",
    phone: "",
    email: "",
    city: "Mumbai",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] selection:bg-[#7650E8]/20 selection:text-[#7650E8] font-sans antialiased overflow-x-hidden relative">
      <SEO
        title="Contact NextDine — Sales, Support & Demos"
        description="Get in touch with NextDine's restaurant operations specialists in Mumbai. Request a live tabletop demo, hardware setup assistance, or pricing consultation."
        canonicalPath="/contact"
      />

      <FloatingNavbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      <main className="pt-32 sm:pt-40">
        {/* Header Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <div className="flex justify-center mb-6">
            <Breadcrumbs items={[{ label: "Contact" }]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT_CUBIC }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#7650E8]/10 text-[#7650E8] text-xs font-bold uppercase tracking-wider mb-4 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Restaurant Operations Desk</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_CUBIC }}
            className="text-4xl sm:text-6xl font-black text-[#111111] tracking-tight max-w-3xl mx-auto leading-tight mb-6"
          >
            Let's Talk About Your <span className="text-[#7650E8]">Restaurant Floor</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_CUBIC }}
            className="text-base sm:text-lg text-[#737373] max-w-xl mx-auto leading-relaxed mb-8 font-medium"
          >
            Whether you operate a 6-table cafe, a high-volume diner, or a multi-outlet chain, our team will help you configure your QR stands and kitchen stream.
          </motion.p>
        </section>

        {/* Contact Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#FAF8F5] rounded-3xl border border-[#E9E9EE] p-8 space-y-6">
                <h2 className="text-xl font-bold text-[#111111]">Direct Contact Channels</h2>

                <div className="space-y-5 text-xs">
                  <div className="flex items-start space-x-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#7650E8]/10 text-[#7650E8] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] text-sm">Direct Phone & WhatsApp</p>
                      <a href="tel:+919876543210" className="text-[#737373] hover:text-[#7650E8] font-mono">
                        +91 98765 43210
                      </a>
                      <p className="text-[11px] text-[#999999]">Mon–Sun: 9:00 AM – 11:00 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#5CD8E8]/10 text-[#0c7885] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] text-sm">Email Support</p>
                      <a href="mailto:support@nextdine.in" className="text-[#737373] hover:text-[#7650E8] block">
                        support@nextdine.in
                      </a>
                      <a href="mailto:sales@nextdine.in" className="text-[#737373] hover:text-[#7650E8]">
                        sales@nextdine.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FF625E]/10 text-[#FF625E] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] text-sm">India Headquarters</p>
                      <p className="text-[#737373] leading-relaxed">
                        NextDine Technologies Pvt. Ltd.<br />
                        Level 4, Bandra Kurla Complex (BKC)<br />
                        Mumbai, Maharashtra 400051, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#111111] text-sm">Deployment Turnaround</p>
                      <p className="text-[#737373]">
                        Average outlet setup: under 20 minutes with remote support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-[#E9E9EE] p-8 sm:p-10 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-[#111111]">Message Received!</h2>
                    <p className="text-xs sm:text-sm text-[#737373] max-w-md mx-auto leading-relaxed">
                      Thank you for contacting NextDine. Our restaurant onboarding manager will reach out via WhatsApp/call at{" "}
                      <strong className="text-[#111111]">{form.phone || "+91 98765 43210"}</strong> within 2 business hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 bg-[#7650E8] text-white font-bold text-xs px-6 py-2.5 rounded-full"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <h2 className="text-xl font-bold text-[#111111] mb-2">Request A Live Floor Demo</h2>
                    <p className="text-[#737373] text-xs mb-6 font-medium">
                      Tell us about your outlet and we'll show you the system in action with sample table QR codes.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className="block font-bold text-[#111111] mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          name="name"
                          autoComplete="name"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Vikram Malhotra"
                          className="w-full bg-[#FAF8F5] border border-[#E9E9EE] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#7650E8]"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-restaurant" className="block font-bold text-[#111111] mb-1.5">
                          Restaurant Name *
                        </label>
                        <input
                          type="text"
                          id="contact-restaurant"
                          name="restaurant"
                          autoComplete="organization"
                          required
                          value={form.restaurant}
                          onChange={(e) => setForm({ ...form, restaurant: e.target.value })}
                          placeholder="e.g. Copper Chimney Lounge"
                          className="w-full bg-[#FAF8F5] border border-[#E9E9EE] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#7650E8]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-phone" className="block font-bold text-[#111111] mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          id="contact-phone"
                          name="phone"
                          autoComplete="tel"
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="10-digit mobile number"
                          className="w-full bg-[#FAF8F5] border border-[#E9E9EE] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#7650E8]"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block font-bold text-[#111111] mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          name="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="vikram@yourrestaurant.in"
                          className="w-full bg-[#FAF8F5] border border-[#E9E9EE] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#7650E8]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-city" className="block font-bold text-[#111111] mb-1.5">
                        City / Outlet Location
                      </label>
                      <input
                        type="text"
                        id="contact-city"
                        name="city"
                        autoComplete="address-level2"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Mumbai, Pune, Bengaluru, Delhi NCR..."
                        className="w-full bg-[#FAF8F5] border border-[#E9E9EE] rounded-xl px-3.5 py-2.5 text-xs text-[#111111] focus:outline-none focus:border-[#7650E8]"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block font-bold text-[#111111] mb-1.5">
                        Notes / Current Table Count
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how many tables you have or any specific POS questions..."
                        className="w-full bg-[#FAF8F5] border border-[#E9E9EE] rounded-xl p-3 text-xs text-[#111111] focus:outline-none focus:border-[#7650E8]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#7650E8] hover:bg-[#643ed8] text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
                    >
                      <span>Submit Demo Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
};

export default ContactPage;
