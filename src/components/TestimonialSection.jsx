import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn } from "../lib/animations"
import { Container, Section } from "./ui/Container"

const testimonials = [
  {
    quote: "The feedback given was brilliant and delivered in a supportive way. It helped us know our strengths and how to further improve.",
    author: "Director of Education",
    role: "SEND and Inclusion Review",
  },
  {
    quote: "The service was amazing and supported me in my role. I felt more confident to support colleagues and to evaluate SEND outcomes.",
    author: "SENCo",
    role: "SEND and Inclusion Review",
  },
  {
    quote: "Safeguarding Audit was invaluable to identify existing strengths and to focus our action points for improvement going forwards.",
    author: "Early Years Manager",
    role: "Safeguarding Audit",
  },
  {
    quote: "Safeguarding training met our needs and made it clear to us how to continue to improve our staff’s knowledge to keep our children safe and secure.",
    author: "Headteacher",
    role: "Safeguarding Training",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  const handleNext = () => setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))

  return (
    <Section background="accent" aria-labelledby="testimonials-heading">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <Quote className="mx-auto mb-6 h-10 w-10 text-primary/80" aria-hidden="true" />
            <h2 id="testimonials-heading" className="sr-only">
              Client testimonials
            </h2>
          </motion.div>

          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <blockquote className="mb-8 font-display text-2xl font-medium leading-relaxed text-white md:text-3xl text-balance">
                  “{testimonials[currentIndex].quote}”
                </blockquote>
                <div className="mb-8 text-white">
                  <p className="text-lg font-semibold">{testimonials[currentIndex].author}</p>
                  <p className="text-white/70">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mb-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/35 hover:bg-white/55"
                }`}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <motion.button
              onClick={handlePrevious}
              className="rounded-full border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:bg-white/20"
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="rounded-full border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:bg-white/20"
              aria-label="Next testimonial"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
