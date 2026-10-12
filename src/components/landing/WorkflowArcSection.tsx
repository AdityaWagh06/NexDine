import React from "react";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import { Layers } from "lucide-react";
import { EASE_OUT_CUBIC } from "../../utils/motionVariants";
import type { ConnectedWorkflowItem } from "../../types/landing";

interface WorkflowArcSectionProps {
  workflowRef: React.RefObject<HTMLElement | null>;
  arcParallaxY: MotionValue<number>;
  connectedWorkflows: ConnectedWorkflowItem[];
  activeWorkflowIndex: number;
  setActiveWorkflowIndex: (index: number) => void;
}

export const WorkflowArcSection: React.FC<WorkflowArcSectionProps> = ({
  workflowRef,
  arcParallaxY,
  connectedWorkflows,
  activeWorkflowIndex,
  setActiveWorkflowIndex,
}) => {
  return (
    <section ref={workflowRef} className="py-16 sm:py-20 bg-[#F8F8FA] border-b border-[#E9E9EE] relative overflow-hidden">
      {/* Subtle scroll-linked ambient drift */}
      <motion.div
        style={{ y: arcParallaxY }}
        className="absolute -bottom-20 left-10 w-96 h-96 bg-[#5CD8E8]/5 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: EASE_OUT_CUBIC }}
          className="bg-white border border-[#E9E9EE] rounded-[40px] p-8 sm:p-12 text-center shadow-sm"
        >
          {/* Small Coral Icon Header */}
          <div className="w-10 h-10 rounded-xl bg-[#FF625E]/10 text-[#FF625E] flex items-center justify-center font-bold mx-auto mb-4">
            <Layers className="w-5 h-5" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight max-w-2xl mx-auto mb-4">
            Integrate NextDine Into Your Existing Workflow In Seconds
          </h2>

          {/* Active Workflow Subtitle Banner */}
          <div className="h-12 flex items-center justify-center mb-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeWorkflowIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-[#7650E8] font-extrabold text-base"
              >
                {connectedWorkflows[activeWorkflowIndex].title} — {connectedWorkflows[activeWorkflowIndex].subtitle}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Arc of 5 Tilted Workflow Tiles (CoreShift Style) */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 max-w-4xl mx-auto overflow-x-auto pb-4 pt-2 no-scrollbar">
            {connectedWorkflows.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeWorkflowIndex === idx;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE_OUT_CUBIC }}
                  whileHover={{ scale: 1.15, y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveWorkflowIndex(idx)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
                    isActive
                      ? "bg-[#7650E8] text-white scale-110 -translate-y-3 shadow-xl shadow-[#7650E8]/30 border-2 border-[#7650E8]"
                      : "bg-[#F8F8FA] text-[#555555] hover:bg-white border border-[#E9E9EE]"
                  }`}
                  style={{
                    transform: `rotate(${item.angle}deg)`,
                  }}
                >
                  <Icon className={`w-8 h-8 ${isActive ? "text-white" : "text-[#7650E8]"}`} />
                  <span className="text-[9px] font-extrabold tracking-wider uppercase mt-1.5 truncate max-w-[80px]">
                    {item.title.split(" ")[0]}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
