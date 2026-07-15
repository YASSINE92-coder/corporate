import { ShieldCheck, BookOpenCheck, Compass, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp, staggerContainer, scaleIn } from "../lib/animations"
import { Container, Section, SectionHeading } from "../components/ui/Container"

const values = [
  {
    icon: ShieldCheck,
    title: "Trusted expertise",
    description: "FM Education Services brings deep sector knowledge and a calm, practical approach to every review and training engagement.",
  },
  {
    icon: BookOpenCheck,
    title: "Evidence-led improvement",
    description: "Every engagement is shaped by inspection frameworks, school self-evaluation, and clear action planning.",
  },
  {
    icon: Compass,
    title: "Tailored support",
    description: "Services are designed around your setting’s needs, whether you are preparing for an inspection or strengthening provision.",
  },
  {
    icon: Sparkles,
    title: "Future-ready leadership",
    description: "Our coaching model helps leaders and teams build confidence, capability, and long-term resilience.",
  },
]

function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <PageHero
        eyebrow="About FM Education Services"
        title="A trusted partner for education improvement"
        description="We work with schools, academies, and early years settings to strengthen safeguarding, inclusion, and leadership practice with clarity and care."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Who we are</p>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight md:text-4xl">Experienced consultants with a people-first approach</h2>
              <p className="mb-4 text-lg leading-8 text-slate-600 dark:text-slate-300">Fatiha Maitland brings over 35 years of experience across the United Kingdom, UAE, GCC, and British Schools Overseas. Her work combines inspection expertise with practical support for school leaders, teachers, and support staff.</p>
              <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">From safeguarding reviews to SEND and inclusion support, our work is grounded in improvement, accountability, and confidence-building for the teams that matter most.</p>
            </motion.div>

            <motion.div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="mb-4 text-2xl font-semibold">Why schools choose us</h3>
              <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                <li>• Bespoke support aligned to each school’s unique context</li>
                <li>• Coaching that helps leaders act with clarity and confidence</li>
                <li>• Practical guidance shaped by national and international frameworks</li>
                <li>• A collaborative style that strengthens staff confidence and consistency</li>
              </ul>
            </motion.div>
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionHeading eyebrow="Our strengths" title="Built around trust, quality, and measurable progress" align="left" />
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.article key={value.title} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-950" variants={scaleIn}>
                  <div className="mb-4 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
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
