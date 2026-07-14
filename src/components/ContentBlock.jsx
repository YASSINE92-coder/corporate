import { motion } from "framer-motion"
import { fadeInUp, slideInLeft, slideInRight } from "../lib/animations"

export default function ContentBlock({ title, description, image, reverse = false }) {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
          <motion.div 
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reverse ? slideInRight : slideInLeft}
          >
            <motion.img
              src={image}
              alt={title}
              className="w-full h-80 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <motion.div 
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reverse ? slideInLeft : slideInRight}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
