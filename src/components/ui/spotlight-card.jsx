import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion"
import { cn } from "../../lib/utils"

/**
 * React Bits "Spotlight Card" (reactbits.dev), rewritten for this project:
 * framer-motion instead of vanilla JS/gsap, project color tokens instead of
 * hard-coded hex values, relative imports. A soft radial glow follows the
 * cursor across the card; disabled under prefers-reduced-motion.
 */
const SpotlightCard = React.forwardRef(({ className, children, radius = 320, ...props }, ref) => {
  const prefersReducedMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(event) {
    if (prefersReducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.16), transparent 75%)`

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("group relative isolate overflow-hidden rounded-3xl", className)}
      {...props}
    >
      {!prefersReducedMotion ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background }}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
  )
})
SpotlightCard.displayName = "SpotlightCard"

export { SpotlightCard }
