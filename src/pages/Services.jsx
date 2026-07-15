import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { fadeInUp, staggerContainer } from "../lib/animations"
import { Container, Section, SectionHeading } from "../components/ui/Container"

const services = [
  {
    title: "Safeguarding support",
    description: "Bespoke training, auditing, and strategic advice for schools and early years settings preparing for inspection or strengthening day-to-day practice.",
  },
  {
    title: "SEND and inclusion reviews",
    description: "Focused reviews that help school leaders evaluate provision, meet statutory duties, and strengthen outcomes for all pupils.",
  },
  {
    title: "School improvement advisory",
    description: "Practical coaching and support for senior and middle leaders seeking stronger performance, consistency, and high-quality provision.",
  },
  {
    title: "Leadership and staff development",
    description: "Training and mentoring that build confidence, improve communication, and strengthen the capacity of teams across the school.",
  },
]

function Services() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <PageHero
        eyebrow="Our services"
        title="Support that is practical, targeted, and grounded in impact"
        description="Whether you need safeguarding expertise, SEND guidance, or school improvement support, we tailor each engagement to your goals and context."
        image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80"
      />

      <Section>
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionHeading eyebrow="What we offer" title="Specialist support for every stage of school improvement" align="left" />
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeInUp} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.2 }}>
                <Card className="h-full rounded-[28px] border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                  <CardHeader>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Approach</p>
                <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-4xl">A structured process that supports sustainable progress</h2>
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">We combine insightful review, supportive challenge, and practical recommendations so leaders can translate improvement into confident day-to-day action.</p>
              </div>
              <div className="rounded-[24px] bg-blue-50 p-6 text-slate-700 dark:bg-blue-900/30 dark:text-slate-200">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Typical outcomes</p>
                <ul className="space-y-3 text-lg">
                  <li>• Stronger safeguarding culture</li>
                  <li>• Clearer SEND leadership and provision</li>
                  <li>• More confident school improvement planning</li>
                  <li>• Improved staff understanding and ownership</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CTASection />
    </div>
  )
}

export default Services
