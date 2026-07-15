import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles } from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { fadeInUp, staggerContainer } from "../lib/animations"
import { Button } from "./ui/button"

export default function HeroSection() {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 32,
    mass: 0.6,
  })

  const scale = useTransform(smoothProgress, [0, 1], [1, 1.12], { clamp: true })
  const y = useTransform(smoothProgress, [0, 1], [0, -24], { clamp: true })
  const imageBlur = useTransform(smoothProgress, [0, 1], ["blur(0px)", "blur(10px)"], { clamp: true })
  const opacity = useTransform(smoothProgress, [0, 1], [1, 0.6], { clamp: true })
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.3, 0.7], { clamp: true })

  return (
    <section className="relative isolate min-h-[760px] overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          style={{ scale, y, opacity, filter: imageBlur }}
        />
        <motion.div className="absolute inset-0 bg-slate-950/70" style={{ opacity: overlayOpacity }} />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-50 backdrop-blur" variants={fadeInUp}>
            <BadgeCheck className="h-4 w-4" />
            Trusted by schools and education leaders
          </motion.div>
          <motion.h1 className="mb-6 text-4xl font-semibold leading-tight text-white md:text-5xl lg:text-6xl" variants={fadeInUp}>
            Premium education consultancy for safeguarding, SEND, and school improvement
          </motion.h1>
          <motion.p className="mb-8 max-w-2xl text-lg leading-8 text-blue-100 md:text-xl" variants={fadeInUp}>
            FM Education Services delivers evidence-led reviews, practical coaching, and tailored support that helps settings rise with confidence and clarity.
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
            <Button as={Link} to="/contact" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100" icon>
              Book a consultation
            </Button>
            <Button as={Link} to="/services" variant="ghost" className="border border-white/20 bg-white/10 text-white hover:bg-white/20">
              Explore services
            </Button>
          </motion.div>
          <motion.div className="mt-10 grid gap-4 sm:grid-cols-3" variants={fadeInUp}>
            {[
              { icon: ShieldCheck, label: "Safeguarding expertise" },
              { icon: Sparkles, label: "Tailored reviews" },
              { icon: BadgeCheck, label: "Practical leadership support" },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <Icon className="mb-2 h-5 w-5 text-blue-200" />
                  <p className="text-sm font-medium text-white">{item.label}</p>
                </div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
