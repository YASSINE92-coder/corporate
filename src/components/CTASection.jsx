import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"
import { Button } from "./ui/button"
import { Container, Section } from "./ui/Container"

export default function CTASection() {
  return (
    <Section background="accent">
      <Container>
        <motion.div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md md:p-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <h2 className="mb-6 text-3xl font-semibold text-white md:text-4xl">
            Ready to strengthen your setting?
          </h2>
          <p className="mb-8 text-lg leading-8 text-blue-100">
            Let’s discuss how our education support can help you improve safeguarding, inclusion, and leadership practice with confidence.
          </p>
          <Button as="a" href="/contact" variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100" icon>
            Get started today
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
