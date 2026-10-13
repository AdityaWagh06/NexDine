import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { EASE_OUT_CUBIC, STANDARD_DURATION, createStaggerContainer } from "../../utils/motionVariants";
import type { ShowcaseDishItem } from "../../types/landing";

import { SHOWCASE_DISHES } from "../../config/landingData";

interface VisualMenuCatalogProps {
  activeCategoryFilter?: string;
  setActiveCategoryFilter?: (category: string) => void;
  dishes?: ShowcaseDishItem[];
}

export const VisualMenuCatalog: React.FC<VisualMenuCatalogProps> = ({
  activeCategoryFilter: externalCategory,
  setActiveCategoryFilter: externalSetCategory,
  dishes = SHOWCASE_DISHES,
}) => {
  const [internalCategory, setInternalCategory] = React.useState("All");
  const activeCategoryFilter = externalCategory ?? internalCategory;
  const setActiveCategoryFilter = externalSetCategory ?? setInternalCategory;

  const shouldReduceMotion = useReducedMotion() ?? false;
  const filteredDishes =
    activeCategoryFilter === "All"
      ? dishes
      : dishes.filter((d) => d.category === activeCategoryFilter);

  const containerVariants = createStaggerContainer(0.09, 0.1);
  const cardEntranceVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 28,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: STANDARD_DURATION,
        ease: EASE_OUT_CUBIC,
      },
    },
  };

  return (
    <section id="menu-catalog-section" className="py-16 sm:py-20 bg-white border-b border-[#E9E9EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: EASE_OUT_CUBIC }}
          className="text-center max-w-3xl mx-auto mb-10 space-y-2.5"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            High-Resolution Visual Menus
          </h2>
          <p className="text-[#737373] text-base font-medium">
            Deliver appetizing visual food ordering with instant dish modifiers, category filters, and zero waiter latency.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_CUBIC }}
          className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar"
        >
          {["All", "Starters", "Mains", "Desserts"].map((category) => {
            const isActive = activeCategoryFilter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategoryFilter(category)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-extrabold uppercase transition-colors whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#7650E8] cursor-pointer ${
                  isActive ? "text-white" : "text-[#555555] hover:text-[#111111]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                    }}
                    className="absolute inset-0 bg-[#7650E8] rounded-full shadow-md -z-0"
                  />
                )}
                {!isActive && (
                  <div className="absolute inset-0 bg-[#F8F8FA] border border-[#E9E9EE] rounded-full -z-10 hover:bg-stone-100 transition-colors" />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Dish Showcase Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                variants={cardEntranceVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: EASE_OUT_CUBIC }}
                className="bg-white rounded-3xl p-4 border border-[#E9E9EE] shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 mb-3 rounded-2xl overflow-hidden bg-stone-100 p-1.5 flex items-center justify-center group">
                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                      <img
                        src={dish.image_url}
                        alt={`${dish.name} gourmet dish - ${dish.category} (${dish.prep_time} preparation)`}
                        loading="lazy"
                        className="h-full w-full object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <span className="absolute top-3 right-3 bg-[#FF625E] text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-xs pointer-events-none">
                      ₹{dish.price}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#111111] font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 border border-[#E9E9EE] pointer-events-none">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {dish.rating}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#111111] text-base mb-1 line-clamp-1">{dish.name}</h3>
                  <p className="text-[#737373] text-xs line-clamp-2 leading-relaxed mb-3 font-medium">{dish.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E9E9EE] text-xs font-semibold">
                  <span className="text-[#737373]">{dish.prep_time} prep</span>
                  <Link to="/customer/menu" className="text-[#7650E8] font-bold hover:underline flex items-center gap-1">
                    <span>Order Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
