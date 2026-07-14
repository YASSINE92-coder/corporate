import { ArrowRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { fadeInUp, staggerContainer } from "../lib/animations"

export default function HeroSection() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-700/90 dark:from-gray-900/95 dark:to-blue-900/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center"
          style={{ scale }}
        />
      </motion.div>
      <div className="relative container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28">
        <motion.div 
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            variants={fadeInUp}
          >
            Transform Your Business with Strategic Consulting
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-blue-100 dark:text-gray-200 mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            We help organizations achieve their full potential through innovative strategies, 
            expert guidance, and data-driven solutions tailored to your unique challenges.
          </motion.p>
          <motion.button 
            className="inline-flex items-center gap-2 bg-white text-blue-900 dark:bg-blue-600 dark:text-white px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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
