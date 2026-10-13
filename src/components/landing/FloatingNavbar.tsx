import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";

interface FloatingNavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    <>
      {/* 
        FLOATING NAVIGATION HEADER (CORESHIFT REFERENCE STYLE - FRAME 0S)
        Outer container uses stable fixed top-5 inset-x-0 mx-auto w-[92%] max-w-6xl
        Inner motion.div performs the smooth drop-in entrance on initial load.
      */}
      <header className="fixed top-5 inset-x-0 mx-auto w-[92%] max-w-6xl z-50 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          className="w-full bg-white/95 backdrop-blur-md rounded-full px-6 py-3 border border-[#E9E9EE] shadow-lg shadow-black/5 flex items-center justify-between pointer-events-auto"
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="w-9 h-9 rounded-xl bg-[#7650E8] text-white font-black text-sm flex items-center justify-center shadow-md shadow-[#7650E8]/20"
            >
              ND
            </motion.div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-[#111111] leading-none">
                Next<span className="text-[#7650E8]">Dine</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#737373] uppercase -mt-0.5 font-mono">
                RESTAURANT OS
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-bold text-[#555555]">
            <Link to="/features" className="hover:text-[#7650E8] transition-colors">Features</Link>
            <Link to="/how-it-works" className="hover:text-[#7650E8] transition-colors">How It Works</Link>
            <Link to="/pricing" className="hover:text-[#7650E8] transition-colors">Pricing</Link>
            <Link to="/faq" className="hover:text-[#7650E8] transition-colors">FAQ</Link>
            <Link to="/contact" className="hover:text-[#7650E8] transition-colors">Contact</Link>
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-xs font-bold text-[#111111] hover:text-[#7650E8] transition-colors">
              Sign In
            </Link>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FF625E] hover:bg-[#e8504c] text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md shadow-[#FF625E]/20 transition-all uppercase tracking-wider"
              >
                Start Free Trial →
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#111111] hover:text-[#7650E8] transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </motion.div>
      </header>

      {/* Mobile Menu Drawer with Backdrop Dismiss */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-xs z-40 md:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: EASE_OUT_CUBIC }}
              className="fixed top-24 inset-x-4 max-w-md mx-auto bg-white border border-[#E9E9EE] rounded-3xl p-6 shadow-2xl z-50 space-y-4 text-xs uppercase font-extrabold tracking-wider text-[#111111]"
            >
              <Link to="/features" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link to="/how-it-works" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
              <Link to="/pricing" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link to="/faq" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>FAQ & Help</Link>
              <Link to="/contact" className="block hover:text-[#7650E8]" onClick={() => setMobileMenuOpen(false)}>Contact Sales</Link>
              <div className="pt-2 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-full bg-[#F8F8FA] border border-[#E9E9EE] text-[#111111] font-bold">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <button className="w-full bg-[#FF625E] text-white font-bold py-3 rounded-full text-xs uppercase tracking-wider">
                    Start Free Trial
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
