const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const duration = reducedMotion ? 0 : 0.6
const shortDuration = reducedMotion ? 0 : 0.5

export const fadeInUp = {
  hidden: { opacity: 0, y: reducedMotion ? 0 : 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, ease: "easeOut" },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: reducedMotion ? 1 : 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: reducedMotion ? 0 : -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
}

export const slideInRight = {
  hidden: { opacity: 0, x: reducedMotion ? 0 : 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: reducedMotion ? 0 : 0.1,
      delayChildren: reducedMotion ? 0 : 0.05,
    },
  },
}

export const fadeInUpStagger = {
  hidden: { opacity: 0, y: reducedMotion ? 0 : 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: shortDuration, ease: [0.22, 1, 0.36, 1] },
  },
}
