import { useReducedMotion, motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { fadeInUp, staggerContainer } from "../lib/animations"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 32,
    mass: 0.6,
  })

  const scale = useTransform(smoothProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.1], { clamp: true })
  const y = useTransform(smoothProgress, [0, 1], [0, prefersReducedMotion ? 0 : -20], { clamp: true })
  const opacity = useTransform(smoothProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.7], { clamp: true })
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.45, prefersReducedMotion ? 0.45 : 0.7], { clamp: true })

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.div
        className="absolute inset-0 hero-gradient"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          style={{ scale, y, opacity }}
        />
        <motion.div className="absolute inset-0 bg-slate-950/65" style={{ opacity: overlayOpacity }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="outline" className="mb-6 border-white/25 bg-white/10 text-white backdrop-blur">
              Education consultancy · UK · UAE · GCC · BSO
            </Badge>
          </motion.div>

          <motion.h1
            className="mb-6 font-display text-5xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl"
            variants={fadeInUp}
          >
            FM Education Services
          </motion.h1>

          <motion.p className="mb-10 max-w-xl text-lg leading-8 text-white/85 md:text-xl" variants={fadeInUp}>
            Specialist safeguarding, SEND and inclusion reviews, and school improvement support — led by Fatiha Maitland.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
            <Button as={Link} to="/contact" variant="secondary" className="bg-white text-slate-900 hover:bg-white/90" icon>
              Book a consultation
            </Button>
            <Button as={Link} to="/services" variant="ghost" className="border border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white">
              Explore services
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
