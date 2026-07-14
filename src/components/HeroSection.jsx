import { ArrowRight } from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { fadeInUp, staggerContainer } from "../lib/animations"

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
    <section className="relative isolate min-h-[780px] overflow-hidden">
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
        <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[780px] max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h1
            className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            variants={fadeInUp}
          >
            Transform Your Business with Strategic Consulting
          </motion.h1>
          <motion.p
            className="mb-8 text-lg leading-relaxed text-blue-100 md:text-xl dark:text-gray-200"
            variants={fadeInUp}
          >
            We help organizations achieve their full potential through innovative strategies,
            expert guidance, and data-driven solutions tailored to your unique challenges.
          </motion.p>
          <motion.button
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-blue-900 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-xl dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
