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
      // Opacity + a slight lift only — no `filter: blur()`: blurring a layer
      // the size of <main> + footer forces an expensive repaint on low-end
      // devices, and a permanent `willChange` would pin that huge layer in the
      // compositor for the life of the page. The fade reads the same without.
      animate={{
        opacity: isLocaleFading ? 0 : 1,
        y: isLocaleFading ? 6 : 0,
      }}
      transition={{
        duration: LOCALE_FADE_MS / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
