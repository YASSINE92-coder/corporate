import { Target, Users, TrendingUp, Award } from "lucide-react"
import { motion } from "framer-motion"
import { staggerContainer, scaleIn } from "../lib/animations"
import { Container, Section } from "./ui/Container"

export default function ImpactIcons() {
  const impacts = [
    {
      icon: Target,
      title: "Strategic Focus",
      description: "Clear direction and measurable goals that guide every engagement"
    },
    {
      icon: Users,
      title: "Team Excellence",
      description: "Empowering leaders and practitioners to deliver with confidence"
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description: "Continuous improvement rooted in evidence and reflection"
    },
    {
      icon: Award,
      title: "Quality Results",
      description: "Delivering clarity, consistency, and stronger outcomes"
    }
  ]

  return (
    <Section background="muted">
      <Container>
        <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {impacts.map((impact) => {
            const Icon = impact.icon
            return (
              <motion.div key={impact.title} className="rounded-[28px] border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950" variants={scaleIn} whileHover={{ y: -5, scale: 1.02 }}>
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">{impact.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{impact.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}
