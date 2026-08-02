import { useMemo, useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { cn } from "../lib/utils"
import { staggerContainer, fadeInUpStagger } from "../lib/animations"
import { partnerOrganisations } from "../data/partners"
import { useTranslation } from "../context/LanguageContext"

/**
 * Departments and organisations worked with — sits directly beneath the regional
 * cards so the two bands read as one "where we work / who we work with" zone.
 *
 * The logos don't drift: the marquee above already supplies the motion, and a
 * second moving strip would fight it. What they do get is a one-shot entrance —
 * each mark fades, rises and settles a beat after the one before it — plus a
 * restrained lift on hover/focus. Both are Framer-driven so the spring feel
 * matches the rest of the site, and both flatten under prefers-reduced-motion.
 *
 * Every mark is set on a white chip rather than inverted for dark mode. ADEK and
 * BQA carry near-black text that would disappear on the dark surface, and inverting
 * would wreck BQA's and Little Doves' brand colours.
 */

/**
 * Entrance for a single mark — a shorter rise than the section copy above it.
 * Under reduced motion the transform drops out and only the fade remains, so the
 * logos still arrive rather than appearing already-there.
 */
function logoEntrance(reduceMotion) {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18, scale: reduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: reduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  }
}

/** Tighter than the shared container so a full row doesn't crawl in. */
function logoGrid(reduceMotion) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
  }
}

/** Settles rather than snaps, matching the nav underline's spring. */
const hoverSpring = { type: "spring", stiffness: 340, damping: 26, mass: 0.6 }

function PartnerLogo({ org, t, reduceMotion }) {
  const isCircle = org.shape === "circle"
  // translate() echoes the key back when it is missing, so fall back to the
  // English name in the data file rather than rendering "partners.orgs.adek".
  const key = `partners.orgs.${org.id}`
  const translated = t(key)
  const name = translated === key ? org.name : translated

  // whileFocus gives keyboard users the same feedback pointer users get.
  const lift = reduceMotion ? undefined : { y: -6, scale: 1.035 }

  return (
    <motion.a
      href={org.href}
      target="_blank"
      rel="noreferrer noopener"
      title={name}
      whileHover={lift}
      whileFocus={lift}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={hoverSpring}
      className="group flex w-full flex-col items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        className={cn(
          "flex h-20 items-center justify-center bg-white ring-1 ring-foreground/10",
          "shadow-sm transition-shadow duration-300 group-hover:shadow-lg group-focus-visible:shadow-lg",
          "motion-reduce:transition-none",
          isCircle ? "w-20 rounded-full p-3.5" : "w-full max-w-[168px] rounded-2xl px-5 py-4"
        )}
      >
        <img
          src={org.file}
          alt={name}
          loading="lazy"
          decoding="async"
          className={cn(
            "max-h-full w-auto max-w-full object-contain",
            // Filters stay in CSS: animating `filter` through motion values is
            // measurably jankier than letting the compositor transition it.
            "opacity-80 grayscale transition-[filter,opacity] duration-300 ease-out",
            "group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0",
            "motion-reduce:transition-none"
          )}
        />
      </span>
      <span className="max-w-[168px] text-center text-xs leading-5 text-muted-foreground transition-colors duration-300 group-hover:text-foreground group-focus-visible:text-foreground">
        {name}
      </span>
    </motion.a>
  )
}

export default function PartnersSection() {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const [gridVariants, itemVariants] = useMemo(
    () => [logoGrid(reduceMotion), logoEntrance(reduceMotion)],
    [reduceMotion]
  )

  // `whileInView` alone would not fire here: the route transition in App.jsx wraps
  // every page in a motion.div with animate="visible", and framer propagates that
  // label into any descendant that does not set `animate` itself — so the row
  // would resolve to "visible" at mount, while still far below the fold. Setting
  // `animate` explicitly from a local useInView breaks that inheritance and gives
  // us the real scroll trigger, still one-shot via `once`.
  const rowRef = useRef(null)
  const rowInView = useInView(rowRef, { once: true, amount: 0.25 })

  return (
    <section className="w-full bg-muted/50 pb-16 theme-surface dark:bg-muted/25 sm:pb-20 md:pb-28">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hairline tying this band to the regional cards above it. */}
        <div className="mx-auto mb-12 h-px max-w-3xl bg-gradient-to-r from-transparent via-border to-transparent sm:mb-14 md:mb-16" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h3
            className="mb-2 text-center font-display text-xl font-semibold text-foreground sm:text-2xl md:text-3xl text-balance"
            variants={fadeInUpStagger}
          >
            {t("partners.title")}
          </motion.h3>
          <motion.p
            className="mx-auto mb-10 max-w-2xl text-center text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:mb-12 text-balance"
            variants={fadeInUpStagger}
          >
            {t("partners.subtitle")}
          </motion.p>
        </motion.div>

        {/* Its own trigger, so the marks animate when the row scrolls in rather
            than inheriting the timing of anything further up the page. */}
        <motion.ul
          ref={rowRef}
          className="mx-auto flex max-w-5xl flex-wrap items-start justify-center gap-x-8 gap-y-10 sm:gap-x-12"
          initial="hidden"
          animate={rowInView ? "visible" : "hidden"}
          variants={gridVariants}
        >
          {partnerOrganisations.map((org) => (
            <motion.li
              key={org.id}
              className="flex w-36 justify-center sm:w-40 md:w-44"
              variants={itemVariants}
            >
              <PartnerLogo org={org} t={t} reduceMotion={reduceMotion} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
