import { Mail } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { fadeInUp, scaleIn } from "../lib/animations"
import { Container, Section } from "./ui/Container"
import { Button } from "./ui/button"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Subscribed:", email)
    setEmail("")
  }

  return (
    <Section>
      <Container>
        <motion.div className="mx-auto max-w-2xl rounded-[32px] border border-slate-200 bg-slate-50 p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <motion.div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300" variants={scaleIn}>
            <Mail className="h-8 w-8" />
          </motion.div>
          <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-4xl">Stay informed</h2>
          <p className="mb-8 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Subscribe for practical insights, sector updates, and expert guidance that supports your next improvement step.
          </p>
          <motion.form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row" variants={fadeInUp}>
            <motion.input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 rounded-2xl border border-slate-300 bg-white px-5 py-4 text-slate-900 outline-none ring-0 transition-all duration-300 placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" required whileFocus={{ scale: 1.02 }} />
            <Button type="submit" variant="primary" className="shadow-sm">
              Subscribe
            </Button>
          </motion.form>
        </motion.div>
      </Container>
    </Section>
  )
}
