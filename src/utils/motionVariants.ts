/**
 * NextDine Animation System — Reusable Motion Variants & Easing Tokens
 * Inspired by CoreShift minimalist motion design language.
 *
 * Motion Specification Starting Values:
 * - Heading entrance: 20–30 px upward
 * - Card entrance: 25–40 px upward
 * - Standard duration: 0.6–0.8 seconds
 * - Stagger interval: 0.08–0.13 seconds
 * - Hover elevation: 3–5 px
 * - Hero parallax: 15–45 px
 * - Hover transition: 0.2–0.3 seconds
 */
import type { Variants, Transition } from "framer-motion";

export const EASE_OUT_CUBIC = [0.16, 1, 0.3, 1] as const;
export const easeOutCubic = EASE_OUT_CUBIC;
export const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1] as const;

export const STANDARD_DURATION = 0.7;
export const STAGGER_INTERVAL = 0.1;

export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 350,
  damping: 25,
};

export const SPRING_GENTLE: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
};

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.15,
} as const;

export const createFadeUpVariant = (
  reducedMotion = false,
  distance = 25,
  duration = STANDARD_DURATION
): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE_OUT_CUBIC },
  },
});

export const createFadeDownVariant = (
  reducedMotion = false,
  distance = 25,
  duration = STANDARD_DURATION
): Variants => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE_OUT_CUBIC },
  },
});

export const createFadeLeftVariant = (
  reducedMotion = false,
  distance = 35,
  duration = STANDARD_DURATION
): Variants => ({
  hidden: { opacity: 0, x: reducedMotion ? 0 : -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: EASE_OUT_CUBIC },
  },
});

export const createFadeRightVariant = (
  reducedMotion = false,
  distance = 35,
  duration = STANDARD_DURATION
): Variants => ({
  hidden: { opacity: 0, x: reducedMotion ? 0 : distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: EASE_OUT_CUBIC },
  },
});

export const createStaggerContainer = (
  staggerInterval = STAGGER_INTERVAL,
  initialDelay = 0.05
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerInterval,
      delayChildren: initialDelay,
    },
  },
});

export const staggerContainerVariant: Variants = createStaggerContainer(0.12, 0.05);

export const createScaleUpVariant = (
  reducedMotion = false,
  initialScale = 0.96,
  duration = 0.55
): Variants => ({
  hidden: { opacity: 0, scale: reducedMotion ? 1 : initialScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: EASE_OUT_CUBIC },
  },
});

export const cardHoverTransition: Transition = {
  duration: 0.25,
  ease: EASE_OUT_CUBIC,
};
