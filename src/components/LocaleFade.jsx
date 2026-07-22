import { motion, useReducedMotion } from "framer-motion"
import { useLanguage, LOCALE_FADE_MS } from "../context/LanguageContext"

/**
 * Soft opacity fade around page content when the user switches language.
 * Navbar stays visible so the language control doesn’t disappear mid-click.
 */
export default function LocaleFade({ children, className }) {
  const { isLocaleFading } = useLanguage()
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={false}
      animate={{
        opacity: isLocaleFading ? 0 : 1,
        y: isLocaleFading ? 6 : 0,
        filter: isLocaleFading ? "blur(2px)" : "blur(0px)",
      }}
      transition={{
        duration: LOCALE_FADE_MS / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {children}
    </motion.div>
  )
}
