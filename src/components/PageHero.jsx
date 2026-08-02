import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { fadeInUp } from "../lib/animations"
import { Button } from "./ui/button"
import OptimizedImage from "./OptimizedImage"
import { darkHeroProps } from "../lib/navOverlay"
import { useTranslation } from "../context/LanguageContext"

function isAppRoute(href) {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//")
}

function HeroAction({ href, children, variant, className, icon = false }) {
  if (isAppRoute(href)) {
    return (
      <Button as={Link} to={href} variant={variant} className={className} icon={icon}>
        {children}
      </Button>
    )
  }

  return (
    <Button as="a" href={href} variant={variant} className={className} icon={icon}>
      {children}
    </Button>
  )
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  primaryLabel,
  primaryHref = "/contact#contact-form",
  primaryIcon = true,
  secondaryLabel,
  secondaryHref = "/services",
  secondaryIcon = false,
}) {
  const { t, localizePath } = useTranslation()
  const resolvedPrimary = primaryLabel ?? t("pageHero.contactUs")
  const resolvedSecondary = secondaryLabel ?? t("pageHero.exploreServices")

  return (
    <header className="relative isolate overflow-hidden pt-24 md:pt-32" {...darkHeroProps}>
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 hero-gradient" />
        <OptimizedImage
          src={image}
          alt=""
          priority
          width={1600}
          height={900}
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.28em] text-white/90 backdrop-blur">
            {eyebrow}
          </p>
          <h1 className="mb-6 font-display text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl text-balance">
            {title}
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <HeroAction
              href={localizePath(primaryHref)}
              variant="secondary"
              className="bg-white text-slate-900 hover:bg-white/90"
              icon={primaryIcon}
            >
              {resolvedPrimary}
            </HeroAction>
            <HeroAction
              href={localizePath(secondaryHref)}
              variant="ghost"
              className="border border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              icon={secondaryIcon}
            >
              {resolvedSecondary}
            </HeroAction>
          </div>
        </motion.div>
      </div>
    </header>
  )
}
