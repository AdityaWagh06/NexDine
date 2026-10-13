import React from "react";
import { motion, AnimatePresence, useReducedMotion, type MotionValue } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { EASE_OUT_CUBIC, STANDARD_DURATION } from "../../utils/motionVariants";
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
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [direction, setDirection] = React.useState<number>(1);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);

  const prevIndex = activeTestimonialIndex === 0 ? testimonials.length - 1 : activeTestimonialIndex - 1;
  const nextIndex = activeTestimonialIndex === testimonials.length - 1 ? 0 : activeTestimonialIndex + 1;

  const handlePrev = () => {
    setDirection(-1);
    setActiveTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion, testimonials.length, setActiveTestimonialIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : (dir > 0 ? 55 : -55),
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: EASE_OUT_CUBIC },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : (dir > 0 ? -55 : 55),
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.96,
      transition: { duration: 0.35, ease: EASE_OUT_CUBIC },
    }),
  };

  return (
    <section ref={testimonialRef} className="py-16 sm:py-20 bg-white border-b border-[#E9E9EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: STANDARD_DURATION, ease: EASE_OUT_CUBIC }}
          className="max-w-3xl mx-auto mb-10 space-y-2.5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#7650E8]/10 text-[#7650E8] flex items-center justify-center font-bold mx-auto mb-3">
            <Quote className="w-5 h-5" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            Words of Appreciation
          </h2>
          <p className="text-[#737373] text-base font-medium">
            Loved by top restaurant owners, lounge founders, and cafe operators.
          </p>
        </motion.div>

        {/* 3D Stacked Card Display with Scroll Parallax on Side Cards */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative max-w-2xl mx-auto min-h-[300px] flex items-center justify-center"
        >
          {/* Left Adjacent Preview Card */}
          <motion.div
            style={{ x: sideCardLeftX }}
            onClick={handlePrev}
            className="hidden md:flex flex-col items-center justify-center p-6 absolute -left-20 top-4 w-72 h-56 bg-[#F8F8FA] rounded-3xl border border-[#E9E9EE] shadow-md opacity-40 -rotate-6 scale-90 cursor-pointer hover:opacity-60 transition-opacity select-none"
          >
            <img
              src={testimonials[prevIndex].avatar}
              alt={`${testimonials[prevIndex].author}, ${testimonials[prevIndex].role}`}
              className="w-10 h-10 rounded-full object-cover grayscale mb-2 border border-stone-300"
            />
            <p className="text-xs font-bold text-[#111111]">{testimonials[prevIndex].author}</p>
            <p className="text-[10px] text-[#737373]">{testimonials[prevIndex].role}</p>
          </motion.div>

          {/* Right Adjacent Preview Card */}
          <motion.div
            style={{ x: sideCardRightX }}
            onClick={handleNext}
            className="hidden md:flex flex-col items-center justify-center p-6 absolute -right-20 top-4 w-72 h-56 bg-[#F8F8FA] rounded-3xl border border-[#E9E9EE] shadow-md opacity-40 rotate-6 scale-90 cursor-pointer hover:opacity-60 transition-opacity select-none"
          >
            <img
              src={testimonials[nextIndex].avatar}
              alt={`${testimonials[nextIndex].author}, ${testimonials[nextIndex].role}`}
              className="w-10 h-10 rounded-full object-cover grayscale mb-2 border border-stone-300"
            />
            <p className="text-xs font-bold text-[#111111]">{testimonials[nextIndex].author}</p>
            <p className="text-[10px] text-[#737373]">{testimonials[nextIndex].role}</p>
          </motion.div>

          {/* Center Active Testimonial Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTestimonialIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#E9E9EE] max-w-xl w-full relative z-20 text-center space-y-5"
            >
              {/* Layered Origami Purple Backdrop Accent */}
              <div className="absolute -bottom-3 inset-x-8 h-10 bg-[#7650E8] rounded-3xl -z-10 opacity-75 blur-xs" />

              {/* Avatar + Author Details */}
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={testimonials[activeTestimonialIndex].avatar}
                  alt={`${testimonials[activeTestimonialIndex].author}, ${testimonials[activeTestimonialIndex].role}`}
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
        </div>

        {/* Carousel Navigation Buttons & Pagination Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center space-x-4 mt-10"
        >
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            aria-label="Previous testimonial"
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-white border border-[#E9E9EE] text-[#111111] hover:bg-[#7650E8] hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-1.5 px-2">
            {testimonials.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Go to testimonial ${dotIdx + 1}`}
                onClick={() => {
                  setDirection(dotIdx > activeTestimonialIndex ? 1 : -1);
                  setActiveTestimonialIndex(dotIdx);
                }}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTestimonialIndex === dotIdx
                    ? "w-6 bg-[#7650E8]"
                    : "w-2 bg-[#E9E9EE] hover:bg-stone-300"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            aria-label="Next testimonial"
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-white border border-[#E9E9EE] text-[#111111] hover:bg-[#7650E8] hover:text-white flex items-center justify-center transition-all shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
