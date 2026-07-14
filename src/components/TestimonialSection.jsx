import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn, slideInLeft, slideInRight } from "../lib/animations"

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quote: "Working with this consulting firm transformed our business strategy. Their insights helped us increase revenue by 40% within six months.",
      author: "Sarah Johnson",
      role: "CEO, TechStart Inc."
    },
    {
      quote: "The team's expertise in digital transformation was invaluable. They guided us through a complete modernization of our systems.",
      author: "Michael Chen",
      role: "CTO, Global Solutions"
    },
    {
      quote: "Professional, knowledgeable, and results-driven. They delivered beyond our expectations and continue to be trusted advisors.",
      author: "Emily Rodriguez",
      role: "Director, Innovate Corp"
    }
  ]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Quote className="h-12 w-12 mx-auto mb-6 text-primary-foreground opacity-50" />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <blockquote className="text-2xl md:text-3xl font-medium text-primary-foreground mb-8 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <div className="text-primary-foreground mb-8">
                <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                <p className="opacity-80">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handlePrevious}
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6 text-primary-foreground" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6 text-primary-foreground" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
