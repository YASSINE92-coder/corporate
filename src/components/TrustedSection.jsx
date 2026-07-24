import { useMemo, useRef, useState } from "react"
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { fadeInUp } from "../lib/animations"
import { partnerCountries } from "../data/countries"
import FlagIcon from "./FlagIcon"
import { useTranslation, useLanguage } from "../context/LanguageContext"

/** Seconds to scroll exactly one full set of cards — slow, ambient pace. */
const LOOP_DURATION_SECONDS = 28

function RegionCard({ region }) {
  return (
    <Card className="h-full overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl sm:rounded-2xl">
      <CardContent className="flex h-full min-h-28 flex-col items-center justify-center p-5 text-center sm:min-h-32 sm:p-6 md:min-h-36 md:p-8">
        <FlagIcon code={region.flag} title={region.name} className="mb-3 h-6 w-8 rounded-sm" />
        <h3 className="mb-2 font-display text-base font-semibold text-foreground sm:text-lg">{region.name}</h3>
        <p className="text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">{region.detail}</p>
      </CardContent>
    </Card>
  )
}

export default function TrustedSection() {
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  const shouldReduceMotion = useReducedMotion()
  const [isPaused, setIsPaused] = useState(false)
  const trackRef = useRef(null)
  const x = useMotionValue(0)

  const regions = useMemo(
    () =>
      partnerCountries.map((region) => ({
        ...region,
        name: t(`trusted.regions.${region.code}.name`),
        detail: t(`trusted.regions.${region.code}.detail`),
      })),
    [t]
  )
  const duplicatedRegions = useMemo(() => [...regions, ...regions], [regions])

  const pause = () => setIsPaused(true)
  const resume = () => setIsPaused(false)

  // Manual rAF-driven marquee so we can pause/resume without snapping, and
  // reverse direction for RTL — a plain `animate={{ x: "-50%" }}` loop can't do either.
  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion || isPaused) return
    const track = trackRef.current
    if (!track) return

    const setWidth = track.scrollWidth / 2
    if (!setWidth) return

    const pixelsPerSecond = setWidth / LOOP_DURATION_SECONDS
    const direction = isRtl ? 1 : -1
    let next = x.get() + direction * pixelsPerSecond * (delta / 1000)

    if (direction < 0 && next <= -setWidth) next += setWidth
    if (direction > 0 && next >= setWidth) next -= setWidth

    x.set(next)
  })

  return (
    <section className="w-full bg-muted/50 py-16 theme-surface dark:bg-muted/25 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="mb-8 text-center font-display text-2xl font-semibold text-foreground sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl text-balance"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {t("trusted.title")}
        </motion.h2>

        {shouldReduceMotion ? (
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {regions.map((region) => (
              <div key={region.code} className="w-64 flex-shrink-0 sm:w-72 md:w-80 lg:w-96">
                <RegionCard region={region} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
          >
            <motion.div
              ref={trackRef}
              className="flex gap-4 sm:gap-6 md:gap-8"
              style={{ x, willChange: "transform" }}
            >
              {duplicatedRegions.map((region, index) => {
                const isDuplicate = index >= regions.length
                return (
                  <div
                    key={`${region.code}-${index}`}
                    className="w-64 flex-shrink-0 sm:w-72 md:w-80 lg:w-96"
                    aria-hidden={isDuplicate || undefined}
                  >
                    <RegionCard region={region} />
                  </div>
                )
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}
