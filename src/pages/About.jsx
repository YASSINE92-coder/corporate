import { ShieldCheck, BookOpenCheck, Compass, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp, staggerContainer, scaleIn } from "../lib/animations"
import { Container, Section, SectionHeading } from "../components/ui/Container"

const values = [
  {
    icon: ShieldCheck,
    title: "Safeguarding specialist",
    description: "Expert advice, auditing, and training for schools, academies, and Early Years settings across the UK, UAE, and internationally.",
  },
  {
    icon: BookOpenCheck,
    title: "SEND and inclusion",
    description: "Bespoke reviews that reflect each school’s context, strengthen provision, and help every child and young person achieve their best.",
  },
  {
    icon: Compass,
    title: "Inspection-ready support",
    description: "Mock reviews using UK, UAE, and BSO inspection frameworks, plus guidance for Ofsted pre-registration and ongoing improvement.",
  },
  {
    icon: Sparkles,
    title: "Coaching that accelerates progress",
    description: "A supportive coaching style that helps senior and middle leaders, teachers, and support staff raise performance from any starting point.",
  },
]

function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <PageHero
        eyebrow="About FM Education Services"
        title="Led by experience. Driven by improvement."
        description="FM Education Services is directed by Fatiha Maitland — a highly recommended education consultant, school improvement advisor, and trainer with over 35 years in education."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">Who we are</p>
              <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">Meet Fatiha Maitland, Director</h2>
              <p className="mb-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                Fatiha is the Director of FM Education Services. She has over 35 years of experience in education. She is a senior inspector with extensive experience in the United Kingdom (UK), the United Arab Emirates (UAE), the Gulf Cooperation Council (GCC), and British Schools Overseas (BSO).
              </p>
              <p className="mb-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
                She is a highly experienced education consultant, school improvement advisor, and trainer. Fatiha is a specialist in safeguarding, special educational needs and/or disabilities, inclusion, and early years’ education reviews.
              </p>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                She uses her skills expertly to work closely with senior and middle leaders, teachers, and support staff. Her supportive skills and unique coaching style enable her to accelerate a school’s performance from a very low starting point. She conducts mock reviews using the UK, UAE, and BSO inspection frameworks. She is highly recommended.
              </p>
            </motion.div>

            <motion.div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="mb-4 font-display text-2xl font-semibold">Why schools choose us</h3>
              <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                <li>• Over 35 years of education leadership and inspection experience</li>
                <li>• Specialist expertise in safeguarding, SEND, inclusion, and early years</li>
                <li>• Support across the UK, UAE, GCC, and British Schools Overseas</li>
                <li>• Coaching that builds staff confidence and accelerates improvement</li>
              </ul>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionHeading eyebrow="Our strengths" title="Specialist support rooted in inspection expertise" align="left" />
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.article key={value.title} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950" variants={scaleIn}>
                  <div className="mb-4 inline-flex rounded-2xl bg-accent p-3 text-primary dark:bg-accent dark:text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{value.description}</p>
                </motion.article>
              )
            })}
          </motion.div>
        </Container>
      </Section>

      <CTASection />
    </div>
  )
}

export default About
