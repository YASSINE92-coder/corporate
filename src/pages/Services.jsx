import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp, staggerContainer } from "../lib/animations"
import { Container, Section, SectionHeading } from "../components/ui/Container"

const sendOutcomes = [
  "Improving the quality of provision of SEND",
  "Incorporating a whole-school approach to SEND",
  "Supporting SENCos in the development of their role",
  "Ensuring the school’s SEN statutory obligations are met",
  "Raising the standards and achievement of all pupils",
]

function Services() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <PageHero
        eyebrow="Our services"
        title="Specialist support for safeguarding, SEND, and school improvement"
        description="Bespoke advice, training, and reviews tailored to your setting — whether you are preparing for inspection or strengthening everyday practice."
        image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80"
      />

      <Section>
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionHeading
              eyebrow="Safeguarding"
              title="Advice, training, and auditing you can trust"
              description="FM Education Services is highly experienced and successful in providing bespoke advice, support, guidance, and training to those responsible for safeguarding, including schools, academies, and Early Years settings in the United Kingdom, the United Arab Emirates, and globally."
              align="left"
            />
          </motion.div>

          <motion.div
            className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div className="space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-300" variants={fadeInUp}>
              <p>
                Our services include face-to-face safeguarding training and auditing. We successfully support new schools and Early Years settings to prepare for their pre-registration inspections for Ofsted and to offer ongoing support.
              </p>
              <p>
                We are highly committed to Keeping Children Safe in Education (KCSIE) and Working Together to Safeguard Children.
              </p>
            </motion.div>

            <motion.div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900" variants={fadeInUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">What we provide</p>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                <li>• Face-to-face safeguarding training</li>
                <li>• Safeguarding auditing and action planning</li>
                <li>• Pre-registration inspection preparation for Ofsted</li>
                <li>• Ongoing support for schools and Early Years settings</li>
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <SectionHeading
              eyebrow="SEND and Inclusion Reviews"
              title="Bespoke reviews that empower school leaders"
              description="FM Education Services is an expert in special educational needs and/or disabilities (SEND) and inclusion reviews. We provide bespoke support and guidance with reference to the school’s unique context, reflecting the school’s own requirements and building on the school’s self-evaluation."
              align="left"
            />
          </motion.div>

          <motion.div
            className="mt-10 space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p className="max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300" variants={fadeInUp}>
              The service empowers school leaders to evaluate the effectiveness of their provision and to ensure that all children and young people, in all educational settings, achieve the skills and qualifications they need to be successful in their future education.
            </motion.p>

            <motion.div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:p-10" variants={fadeInUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">One to two-day package</p>
              <h3 className="mb-6 font-display text-2xl font-semibold tracking-tight">
                Based on the needs of the organisation, our reviews provide a powerful opportunity for:
              </h3>
              <ul className="grid gap-4 md:grid-cols-2">
                {sendOutcomes.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">School improvement</p>
                <h2 className="mb-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">Advisory support that accelerates performance</h2>
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                  As a school improvement advisor and trainer, Fatiha works closely with senior and middle leaders, teachers, and support staff. Her coaching style helps settings accelerate performance, including from a very low starting point, through mock reviews aligned to UK, UAE, and BSO inspection frameworks.
                </p>
              </div>
              <div className="rounded-[24px] bg-accent p-6 text-slate-700 dark:bg-accent/40 dark:text-slate-200">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">Typical outcomes</p>
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
