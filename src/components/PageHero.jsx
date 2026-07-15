import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { fadeInUp } from "../lib/animations"

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  primaryLabel = "Contact us",
  primaryHref = "/contact",
  secondaryLabel = "Explore services",
  secondaryHref = "/services",
}) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950 pt-24 md:pt-32">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" />
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative mx-auto flex min-h-[480px] max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.3em] text-blue-100 backdrop-blur">
            {eyebrow}
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to={primaryHref}
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-slate-100"
            >
              {primaryLabel}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to={secondaryHref}
              className="inline-flex items-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/20"
            >
              {secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
