import { motion, useReducedMotion, useScroll } from "framer-motion"
import { useLanguage } from "../context/LanguageContext"

/**
 * Thin fixed progress bar tracking scroll position, sat above the navbar.
 * Purely decorative motion feedback — skipped entirely under
 * prefers-reduced-motion, same convention as the rest of the site.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  const { isRtl } = useLanguage()

  if (prefersReducedMotion) return null

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-primary"
      style={{
        scaleX: scrollYProgress,
        transformOrigin: isRtl ? "100% 0%" : "0% 0%",
      }}
      aria-hidden="true"
    />
  )
}
