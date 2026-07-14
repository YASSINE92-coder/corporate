import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"

export default function ImpactSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
            Driven by Impact
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            We believe in creating measurable, lasting change for our clients. 
            Our approach combines deep industry expertise with innovative thinking 
            to deliver results that matter. Every project we undertake is focused 
            on driving real business outcomes and sustainable growth.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
