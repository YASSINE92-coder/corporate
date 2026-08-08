import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { fadeInUp, staggerContainer, scaleIn } from "../lib/animations"
import { Container, Section } from "./ui/Container"
import { useTranslation } from "../context/LanguageContext"

function AnimatedStat({ value, suffix, display, label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const prefersReducedMotion = useReducedMotion()
  const [count, setCount] = useState(prefersReducedMotion || display ? display || value : 0)

  useEffect(() => {
    if (!isInView || display || prefersReducedMotion) {
      if (isInView && display) setCount(display)
      if (isInView && prefersReducedMotion && !display) setCount(value)
      return
    }

    let frame
    const duration = 1200
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(value * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value, display, prefersReducedMotion])

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/*
        For numeric stats, dir="ltr" pins the bidi-neutral suffix ("35+") to
        the digits' side in RTL — matches the site convention of Latin numerals
        throughout. `display` stats render localized words and must keep the
        document direction.
      */}
      <p
        className="font-display text-4xl font-semibold text-foreground md:text-5xl"
        dir={display ? undefined : "ltr"}
      >
        {display ? count : `${count}${suffix}`}
      </p>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{label}</p>
    </motion.div>
  )
}

export default function ImpactSection() {
  const { t } = useTranslation()

  const highlights = useMemo(
    () => [
      { value: 35, suffix: "+", label: t("impact.years") },
      { value: 4, suffix: "", label: t("impact.regions") },
      { value: 1, suffix: "", label: t("impact.response"), display: t("impact.sameDay") },
    ],
    [t]
  )

  return (
    <Section background="muted">
      <Container>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            {t("impact.eyebrow")}
          </p>
          <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
            {t("impact.title")}
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">{t("impact.body")}</p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {highlights.map((item) => (
            <AnimatedStat key={item.label} {...item} />
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
