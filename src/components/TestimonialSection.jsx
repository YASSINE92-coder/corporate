import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn } from "../lib/animations"
import { Container, Section } from "./ui/Container"

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      quote: "Their guidance made our safeguarding review feel structured, supportive, and genuinely useful. The recommendations were practical and immediately actionable.",
      author: "Sarah Johnson",
      role: "Headteacher, St. Anne's School"
    },
    {
      quote: "The support was thoughtful, professional, and tailored to our setting. We left the process feeling more confident and better equipped.",
      author: "Michael Chen",
      role: "Deputy Head, Northfield Academy"
    },
    {
      quote: "The consultation added real clarity to our improvement planning. It brought calm, confidence, and focus to a challenging period.",
      author: "Emily Rodriguez",
      role: "SENDCO, Meadow Grove School"
    }
  ]

  const handlePrevious = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  const handleNext = () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))

  return (
    <Section background="accent">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Quote className="mx-auto mb-6 h-12 w-12 text-blue-200" />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }}>
              <blockquote className="mb-8 text-2xl font-medium leading-relaxed text-white md:text-3xl">
                “{testimonials[currentIndex].quote}”
              </blockquote>
              <div className="mb-8 text-white">
                <p className="text-lg font-semibold">{testimonials[currentIndex].author}</p>
                <p className="opacity-80">{testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-4">
            <motion.button onClick={handlePrevious} className="rounded-full border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-white/20" aria-label="Previous testimonial" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>
            <motion.button onClick={handleNext} className="rounded-full border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-white/20" aria-label="Next testimonial" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
