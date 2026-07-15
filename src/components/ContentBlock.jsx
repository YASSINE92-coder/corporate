import { motion } from "framer-motion"
import { fadeInUp, slideInLeft, slideInRight } from "../lib/animations"
import { Container, Section } from "./ui/Container"

export default function ContentBlock({ title, description, image, reverse = false }) {
  return (
    <Section>
      <Container>
        <div className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}>
          <motion.div className="w-full md:w-1/2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reverse ? slideInRight : slideInLeft}>
            <motion.img src={image} alt={title} className="h-80 w-full rounded-[32px] object-cover shadow-lg transition-shadow duration-300 hover:shadow-2xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} />
          </motion.div>
          <motion.div className="w-full md:w-1/2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={reverse ? slideInLeft : slideInRight}>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Professional delivery</p>
            <h2 className="mb-6 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">{title}</h2>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{description}</p>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}
