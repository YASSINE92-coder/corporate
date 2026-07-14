import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-primary to-primary/90 dark:from-blue-900 dark:to-blue-800">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Let's discuss how our consulting services can help you achieve your goals and drive sustainable growth.
          </p>
          <motion.button 
            className="inline-flex items-center gap-2 bg-white text-primary dark:bg-primary-foreground dark:text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-100 dark:hover:text-primary transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
