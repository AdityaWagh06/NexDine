import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";
import type { ShowcaseDishItem } from "../../types/landing";

interface VisualMenuCatalogProps {
  activeCategoryFilter: string;
  setActiveCategoryFilter: (category: string) => void;
  dishes: ShowcaseDishItem[];
}

export const VisualMenuCatalog: React.FC<VisualMenuCatalogProps> = ({
  activeCategoryFilter,
  setActiveCategoryFilter,
  dishes,
}) => {
  const filteredDishes =
    activeCategoryFilter === "All"
      ? dishes
      : dishes.filter((d) => d.category === activeCategoryFilter);

  return (
    <section id="menu-catalog-section" className="py-24 bg-white border-b border-[#E9E9EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight">
            High-Resolution Visual Menus
          </h2>
          <p className="text-[#737373] text-base font-medium">
            Deliver appetizing visual food ordering with instant dish modifiers, category filters, and zero waiter latency.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 no-scrollbar">
          {["All", "Starters", "Mains", "Desserts"].map((category) => (
            <motion.button
              key={category}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategoryFilter(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase transition-all whitespace-nowrap ${
                activeCategoryFilter === category
                  ? "bg-[#7650E8] text-white shadow-md"
                  : "bg-[#F8F8FA] text-[#555555] border border-[#E9E9EE] hover:bg-stone-100"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Dish Showcase Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: EASE_OUT_CUBIC }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-4 border border-[#E9E9EE] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 mb-3 rounded-2xl overflow-hidden bg-stone-100 p-2 flex items-center justify-center group">
                    <img
                      src={dish.image_url}
                      alt={dish.name}
                      className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-[#FF625E] text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-xs">
                      ${dish.price.toFixed(2)}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#111111] font-bold text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1 border border-[#E9E9EE]">
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
