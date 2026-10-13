import React from "react";
import { motion, AnimatePresence, useReducedMotion, type MotionValue } from "framer-motion";
import { Layers } from "lucide-react";
import { EASE_OUT_CUBIC, STANDARD_DURATION } from "../../utils/motionVariants";
import type { ConnectedWorkflowItem } from "../../types/landing";

import { CONNECTED_WORKFLOWS } from "../../config/landingData";

interface WorkflowArcSectionProps {
  workflowRef?: React.RefObject<HTMLElement | null>;
  arcParallaxY?: MotionValue<number>;
  connectedWorkflows?: ConnectedWorkflowItem[];
  activeWorkflowIndex?: number;
  setActiveWorkflowIndex?: (index: number) => void;
}

export const WorkflowArcSection: React.FC<WorkflowArcSectionProps> = ({
  workflowRef,
  arcParallaxY,
  connectedWorkflows = CONNECTED_WORKFLOWS,
  activeWorkflowIndex: externalIndex,
  setActiveWorkflowIndex: externalSetIndex,
}) => {
  const [internalIndex, setInternalIndex] = React.useState(0);
  const activeWorkflowIndex = externalIndex ?? internalIndex;
  const setActiveWorkflowIndex = externalSetIndex ?? setInternalIndex;

  const shouldReduceMotion = useReducedMotion() ?? false;

  return (
    <section ref={workflowRef} className="py-16 sm:py-20 bg-[#F8F8FA] border-b border-[#E9E9EE] relative overflow-hidden">
      {/* Subtle scroll-linked ambient drift */}
      <motion.div
        style={{ y: arcParallaxY || 0 }}
        className="absolute -bottom-20 left-10 w-96 h-96 bg-[#5CD8E8]/5 rounded-full blur-3xl pointer-events-none -z-0"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: STANDARD_DURATION, ease: EASE_OUT_CUBIC }}
          className="bg-white border border-[#E9E9EE] rounded-[40px] p-8 sm:p-12 text-center shadow-sm relative overflow-hidden"
        >
          {/* Small Coral Icon Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-10 h-10 rounded-xl bg-[#FF625E]/10 text-[#FF625E] flex items-center justify-center font-bold mx-auto mb-4"
          >
            <Layers className="w-5 h-5" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT_CUBIC }}
            className="text-3xl sm:text-5xl font-black text-[#111111] tracking-tight max-w-2xl mx-auto mb-4"
          >
            Integrate NextDine Into Your Existing Workflow In Seconds
          </motion.h2>

          {/* Active Workflow Subtitle Banner */}
          <div className="h-12 flex items-center justify-center mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeWorkflowIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: EASE_OUT_CUBIC }}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#7650E8] animate-pulse" />
                <p className="text-[#7650E8] font-extrabold text-base">
                  {connectedWorkflows[activeWorkflowIndex].title} —{" "}
                  <span className="text-[#555555] font-semibold">
                    {connectedWorkflows[activeWorkflowIndex].subtitle}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arc of 5 Tilted Workflow Tiles (CoreShift Style) */}
          <div className="relative max-w-4xl mx-auto py-4">
            {/* Subtle SVG connector line behind tiles */}
            <svg
              className="absolute top-1/2 left-0 right-0 w-full h-8 -translate-y-1/2 pointer-events-none hidden sm:block -z-0 opacity-40"
              viewBox="0 0 800 40"
              fill="none"
            >
              <motion.path
                d="M 50 20 Q 400 40 750 20"
                stroke="#E9E9EE"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            <div className="flex items-center justify-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar relative z-10">
              {connectedWorkflows.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeWorkflowIndex === idx;
                const targetRotate = shouldReduceMotion ? 0 : (isActive ? 0 : item.angle);

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.08,
                      ease: EASE_OUT_CUBIC,
                    }}
                    animate={{
                      y: isActive ? -10 : 0,
                      scale: isActive ? 1.08 : 1,
                      rotate: targetRotate,
                    }}
                    whileHover={{
                      scale: isActive ? 1.12 : 1.06,
                      y: isActive ? -14 : -6,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveWorkflowIndex(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex flex-col items-center justify-center transition-colors duration-250 cursor-pointer ${
                      isActive
                        ? "bg-[#7650E8] text-white shadow-xl shadow-[#7650E8]/35 ring-4 ring-[#7650E8]/20"
                        : "bg-[#F8F8FA] text-[#555555] hover:bg-white border border-[#E9E9EE] shadow-sm hover:shadow-md"
                    }`}
                  >
                    <Icon className={`w-8 h-8 transition-colors ${isActive ? "text-white" : "text-[#7650E8]"}`} />
                    <span className={`text-[9px] font-extrabold tracking-wider uppercase mt-1.5 truncate max-w-[80px] ${
                      isActive ? "text-white/95" : "text-[#737373]"
                    }`}>
                      {item.title.split(" ")[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
