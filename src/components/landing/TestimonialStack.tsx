import React from "react";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";
import type { TestimonialItem } from "../../types/landing";

interface TestimonialStackProps {
  testimonialRef: React.RefObject<HTMLElement | null>;
  testimonials: TestimonialItem[];
  activeTestimonialIndex: number;
  setActiveTestimonialIndex: React.Dispatch<React.SetStateAction<number>>;
  sideCardLeftX: MotionValue<number>;
  sideCardRightX: MotionValue<number>;
}

export const TestimonialStack: React.FC<TestimonialStackProps> = ({
  testimonialRef,
  testimonials,
  activeTestimonialIndex,
  setActiveTestimonialIndex,
  sideCardLeftX,
  sideCardRightX,
}) => {
  return (
    <section ref={testimonialRef} className="py-24 bg-white border-b border-[#E9E9EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          className="max-w-3xl mx-auto mb-14 space-y-3"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Words of Appreciation
          </h2>
          <p className="text-[#737373] text-base font-medium">
            Loved by top restaurant owners, lounge founders, and cafe operators.
          </p>
        </motion.div>

        {/* 3D Stacked Card Display with Scroll Parallax on Side Cards */}
        <div className="relative max-w-2xl mx-auto min-h-[260px] flex items-center justify-center">
          {/* Center Active Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonialIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#E9E9EE] max-w-xl w-full relative z-10 text-center space-y-5"
            >
              {/* Layered Origami Purple Backdrop Accent */}
              <div className="absolute -bottom-3 inset-x-8 h-10 bg-[#7650E8] rounded-3xl -z-10 opacity-80 blur-xs" />

              {/* Avatar + Author Details */}
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={testimonials[activeTestimonialIndex].avatar}
                  alt={testimonials[activeTestimonialIndex].author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#7650E8] shadow-sm"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-[#111111]">
                    {testimonials[activeTestimonialIndex].author}
                  </h4>
                  <p className="text-xs text-[#737373] font-medium">
                    {testimonials[activeTestimonialIndex].role}
                  </p>
                </div>
              </div>

              {/* 5-Star Rating */}
              <div className="flex items-center justify-center space-x-1 text-amber-400">
                {[...Array(testimonials[activeTestimonialIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-[#111111] font-semibold leading-relaxed">
                "{testimonials[activeTestimonialIndex].quote}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Partially Visible Angled Side Cards with Parallax Translation */}
          <motion.div
            style={{ x: sideCardLeftX }}
            className="hidden md:block absolute -left-16 top-4 w-72 h-48 bg-[#F8F8FA] rounded-3xl border border-[#E9E9EE] shadow-md opacity-35 -rotate-6 scale-90 select-none pointer-events-none"
          />
          <motion.div
            style={{ x: sideCardRightX }}
            className="hidden md:block absolute -right-16 top-4 w-72 h-48 bg-[#F8F8FA] rounded-3xl border border-[#E9E9EE] shadow-md opacity-35 rotate-6 scale-90 select-none pointer-events-none"
          />
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center justify-center space-x-4 mt-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setActiveTestimonialIndex((prev) =>
                prev === 0 ? testimonials.length - 1 : prev - 1
              )
            }
            className="w-11 h-11 rounded-full bg-white border border-[#E9E9EE] text-[#111111] hover:bg-[#7650E8] hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              setActiveTestimonialIndex((prev) =>
                prev === testimonials.length - 1 ? 0 : prev + 1
              )
            }
            className="w-11 h-11 rounded-full bg-white border border-[#E9E9EE] text-[#111111] hover:bg-[#7650E8] hover:text-white flex items-center justify-center transition-all shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
