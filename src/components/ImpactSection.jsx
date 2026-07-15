import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, scaleIn } from "../lib/animations"
import { Container, Section } from "./ui/Container"

const highlights = [
  { value: "35+", label: "Years of education leadership experience" },
  { value: "100%", label: "Tailored support for each setting" },
  { value: "24/7", label: "Responsive communication and guidance" },
]

export default function ImpactSection() {
  return (
    <Section background="muted">
      <Container>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Driven by impact</p>
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            A calm, expert approach that turns strategy into progress
          </h2>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
            We help education leaders build stronger safeguarding culture, sharper SEND practice, and more confident improvement planning through practical partnership and clear insight.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {highlights.map((item) => (
            <motion.div key={item.label} variants={scaleIn} className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <p className="text-4xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
