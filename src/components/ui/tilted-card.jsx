import { useRef } from "react"
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { cn } from "../../lib/utils"

const springValues = { damping: 30, stiffness: 100, mass: 2 }

/**
 * React Bits "Tilted Card" (reactbits.dev), rewritten for this project:
 * framer-motion (already installed, no gsap/`motion` package) instead of the
 * original `motion/react` import, Tailwind + project tokens instead of a
 * separate stylesheet, relative imports. The pointer-driven 3D tilt is fully
 * disabled under prefers-reduced-motion — the image just sits flat/static.
 *
 * Accepts the same optional `webp`/`avif`/`srcSet`/`sizes` as OptimizedImage
 * so callers can pass a `siteImages.<slot>` entry and get the generated
 * responsive variants instead of the full-size source JPEG.
 */
export function TiltedCard({
  imageSrc,
  altText = "",
  captionText = "",
  containerHeight = "100%",
  containerWidth = "100%",
  imageHeight = "100%",
  imageWidth = "100%",
  scaleOnHover = 1.08,
  rotateAmplitude = 12,
  showTooltip = false,
  overlayContent = null,
  displayOverlayContent = false,
  className,
  imageClassName,
  width,
  height,
  priority = false,
  webp,
  avif,
  srcSet,
  sizes = "(max-width: 768px) 100vw, 50vw",
  ...imgProps
}) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), springValues)
  const rotateY = useSpring(useMotionValue(0), springValues)
  const scale = useSpring(1, springValues)
  const opacity = useSpring(0)
  const rotateFigcaption = useSpring(0, { stiffness: 350, damping: 30, mass: 1 })

  // A ref, not state: the value is only ever read inside this handler, and a
  // setState here would re-render the whole card at pointer-move frequency.
  const lastY = useRef(0)

  function handleMouseMove(event) {
    if (prefersReducedMotion || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - rect.left - rect.width / 2
    const offsetY = event.clientY - rect.top - rect.height / 2

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude)
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude)

    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)

    const velocityY = offsetY - lastY.current
    rotateFigcaption.set(-velocityY * 0.6)
    lastY.current = offsetY
  }

  function handleMouseEnter() {
    if (prefersReducedMotion) return
    scale.set(scaleOnHover)
    opacity.set(1)
  }

  function handleMouseLeave() {
    opacity.set(0)
    scale.set(1)
    rotateX.set(0)
    rotateY.set(0)
    rotateFigcaption.set(0)
  }

  return (
    <figure
      ref={ref}
      className={cn("relative flex items-center justify-center [perspective:800px]", className)}
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX: prefersReducedMotion ? 0 : rotateX,
          rotateY: prefersReducedMotion ? 0 : rotateY,
          scale: prefersReducedMotion ? 1 : scale,
        }}
      >
        <picture className="contents">
          {avif ? <source type="image/avif" srcSet={avif} sizes={sizes} /> : null}
          {webp ? <source type="image/webp" srcSet={webp} sizes={sizes} /> : null}
          <motion.img
            src={imageSrc}
            alt={altText}
            width={width}
            height={height}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            className={cn(
              "h-full w-full rounded-[32px] border border-border object-cover shadow-xl",
              imageClassName
            )}
            {...imgProps}
          />
        </picture>

        {displayOverlayContent && overlayContent ? (
          <div className="absolute inset-0 z-10">{overlayContent}</div>
        ) : null}
      </motion.div>

      {showTooltip && captionText ? (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 z-20 hidden rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background md:block"
          style={{ x, y, opacity, rotate: rotateFigcaption }}
        >
          {captionText}
        </motion.figcaption>
      ) : null}
    </figure>
  )
}
