import { useState } from "react"
import { Mail, Phone, Clock3, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp } from "../lib/animations"
import { Container, Section } from "../components/ui/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"

const contactDetails = [
  {
    title: "Email",
    value: "fatiha.maitland1@gmail.com",
    subtitle: "For enquiries and consultations",
    icon: Mail,
    href: "mailto:fatiha.maitland1@gmail.com",
  },
  {
    title: "Telephone",
    value: "+44 (0) 770 426 7745",
    subtitle: "Call us whenever you need support",
    icon: Phone,
    href: "tel:+447704267745",
  },
  {
    title: "Response time",
    value: "Same day",
    subtitle: "If we are not immediately available, we will get back to you within the same day",
    icon: Clock3,
  },
]

function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PageHero
        eyebrow="Contact us"
        title="Get in touch at any time of day"
        description="You can contact us at any time of your day and if we are not immediately available we will get back to you as soon as possible — usually within the same day."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">Get in touch</p>
              <h2 className="mb-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                We are here to support your next step
              </h2>
              <p className="mb-8 text-lg leading-8 text-muted-foreground">
                Reach out for safeguarding support, SEND and inclusion reviews, or school improvement guidance.
              </p>

              <div className="space-y-4">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon
                  const ValueTag = detail.href ? "a" : "p"
                  return (
                    <div
                      key={detail.title}
                      className="flex items-start gap-4 rounded-3xl border border-border bg-muted/40 p-5 shadow-sm transition hover:shadow-md"
                    >
                      <div className="rounded-2xl bg-accent p-3 text-accent-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{detail.title}</h3>
                        <ValueTag
                          {...(detail.href ? { href: detail.href } : {})}
                          className="font-medium text-foreground"
                        >
                          {detail.value}
                        </ValueTag>
                        <p className="text-sm text-muted-foreground">{detail.subtitle}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-border bg-card p-8 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {submitted ? (
                <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
                  <h3 className="mb-2 font-display text-2xl font-semibold">Thank you</h3>
                  <p className="max-w-sm text-muted-foreground">
                    Your message has been noted. We aim to respond within the same day.
                  </p>
                  <Button className="mt-6" variant="secondary" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="mb-6 font-display text-2xl font-semibold">Send a message</h3>
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="you@school.org" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organisation">Organisation</Label>
                      <Input id="organisation" name="organisation" placeholder="School or setting" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">How can we help?</Label>
                      <Textarea id="message" name="message" rows={5} placeholder="Tell us about your needs" required />
                    </div>
                    <Button type="submit" variant="primary" icon>
                      Send message
                    </Button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </Container>
      </Section>

      <CTASection />
    </div>
  )
}

export default Contact
