import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { fadeIn } from "../lib/animations"
import { Container, Section } from "./ui/Container"
import { useTranslation } from "../context/LanguageContext"

const AUTO_ADVANCE_MS = 6000

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const intervalRef = useRef(null)

  const testimonials = t("testimonials.items")
  const count = Array.isArray(testimonials) ? testimonials.length : 0

  const handlePrevious = () => setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1))
  const handleNext = () => setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1))

  // Auto-advance, paused on hover/focus and skipped entirely for reduced-motion users.
  useEffect(() => {
    if (shouldReduceMotion || isPaused || count <= 1) return undefined

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1))
    }, AUTO_ADVANCE_MS)

    return () => window.clearInterval(intervalRef.current)
  }, [shouldReduceMotion, isPaused, count])

  // Keep the index valid if the translated items array ever shrinks (e.g. locale swap).
  useEffect(() => {
    if (currentIndex >= count && count > 0) setCurrentIndex(0)
  }, [count, currentIndex])

  if (count === 0) return null

  const current = testimonials[currentIndex] ?? testimonials[0]

  return (
    <Section
      background="accent"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Quote className="mx-auto mb-6 h-10 w-10 text-primary/80" aria-hidden="true" />
            <h2 id="testimonials-heading" className="sr-only">
              {t("testimonials.heading")}
            </h2>
          </motion.div>

          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <blockquote className="mb-8 font-display text-2xl font-medium leading-relaxed text-white md:text-3xl text-balance">
                  “{current.quote}”
                </blockquote>
                <div className="mb-8 text-white">
                  <p className="text-lg font-semibold">{current.author}</p>
                  <p className="text-white/70">{current.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mb-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={t("testimonials.goTo", { number: index + 1 })}
                aria-current={index === currentIndex}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/55"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handlePrevious}
              className="rounded-full border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:bg-white/20"
              aria-label={t("testimonials.previous")}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="rounded-full border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:bg-white/20"
              aria-label={t("testimonials.next")}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
