/**
 * NextDine Animation System — Reusable Motion Variants & Easing Tokens
 * Inspired by CoreShift minimalist motion design language.
 */
import type { Variants } from "framer-motion";

export const EASE_OUT_CUBIC = [0.16, 1, 0.3, 1] as const;

export const createFadeUpVariant = (reducedMotion = false): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_CUBIC },
  },
});

export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const createScaleUpVariant = (reducedMotion = false): Variants => ({
  hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_CUBIC },
  },
});
