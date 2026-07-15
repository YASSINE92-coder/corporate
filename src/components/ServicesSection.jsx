import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, fadeInUpStagger } from "../lib/animations"
import { Container, Section, SectionHeading } from "./ui/Container"
import { ShieldCheck, SearchCheck, GraduationCap } from "lucide-react"

export default function ServicesSection() {
  const services = [
    {
      title: "Safeguarding Support",
      description: "Tailored safeguarding advice, auditing, and training designed to help settings meet expectations with confidence.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      icon: ShieldCheck,
    },
    {
      title: "SEND & Inclusion Reviews",
      description: "Focused reviews that evaluate provision, support leaders, and strengthen outcomes for every child and young person.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      icon: SearchCheck,
    },
    {
      title: "Leadership Development",
      description: "Practical coaching and mentoring that helps teams improve quality, consistency, and long-term improvement capability.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
      icon: GraduationCap,
    }
  ]

  return (
    <Section>
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <SectionHeading eyebrow="Services" title="Expert support built around your setting" description="A sharp, practical consultancy service covering safeguarding, SEND, and school improvement." />
        </motion.div>
        <motion.div className="grid gap-6 md:grid-cols-3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.title} variants={fadeInUpStagger} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Card className="h-full overflow-hidden rounded-[28px] border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
                  <div className="h-48 overflow-hidden">
                    <motion.img src={service.image} alt={service.title} className="h-full w-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.3 }} />
                  </div>
                  <CardHeader>
                    <div className="mb-3 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-7 text-slate-600 dark:text-slate-300">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}
