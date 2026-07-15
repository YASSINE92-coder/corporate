import { ArrowRight, Mail, Phone, Clock3 } from "lucide-react"
import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp } from "../lib/animations"
import { Container, Section } from "../components/ui/Container"
import { Button } from "../components/ui/button"

const contactDetails = [
  {
    title: "Email",
    value: "fatiha.maitland1@gmail.com",
    subtitle: "For enquiries and consultations",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+44 (0) 770 426 7745",
    subtitle: "Available for urgent support and scheduling",
    icon: Phone,
  },
  {
    title: "Response time",
    value: "Same day",
    subtitle: "We aim to reply promptly whenever possible",
    icon: Clock3,
  },
]

function Contact() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <PageHero
        eyebrow="Contact us"
        title="Let’s talk about the support your setting needs"
        description="Whether you are planning an improvement project or looking for expert guidance, our team is ready to help you take the next step."
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-600">Get in touch</p>
              <h2 className="mb-6 text-3xl font-semibold tracking-tight md:text-4xl">We are here to support your next step</h2>
              <p className="mb-8 text-lg leading-8 text-slate-600 dark:text-slate-300">Reach out for safeguarding support, SEND and inclusion reviews, or leadership development. We offer thoughtful, responsive guidance that fits your circumstances.</p>

              <div className="space-y-4">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon
                  return (
                    <div key={detail.title} className="flex items-start gap-4 rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <div className="rounded-2xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{detail.title}</h3>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{detail.value}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{detail.subtitle}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="mb-6 text-2xl font-semibold">Send a message</h3>
              <form className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <input className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition-colors focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Name" />
                  <input className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition-colors focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Email" />
                </div>
                <input className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition-colors focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Organisation" />
                <textarea rows="5" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition-colors focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="How can we help?" />
                <Button type="submit" variant="primary" className="shadow-sm" icon>
                  Send message
                </Button>
              </form>
            </motion.div>
          </div>
        </Container>
      </Section>

      <CTASection />
    </div>
  )
}

export default Contact
