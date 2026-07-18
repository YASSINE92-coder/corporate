import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { fadeInUp } from "../lib/animations"
import { Button } from "./ui/button"
import { Container, Section } from "./ui/Container"

export default function CTASection() {
  return (
    <Section background="accent">
      <Container>
        <motion.div
          className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md md:p-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="mb-6 font-display text-3xl font-semibold text-white md:text-4xl text-balance">
            Ready to strengthen your setting?
          </h2>
          <p className="mb-8 text-lg leading-8 text-white/80">
            Contact us for safeguarding support, SEND and inclusion reviews, or school improvement guidance. We aim to reply within the same day.
          </p>
          <Button as={Link} to="/contact" variant="secondary" className="bg-white text-slate-900 hover:bg-white/90" icon>
            Get started today
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
