import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Mail, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Seo from "../components/Seo"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp } from "../lib/animations"
import { Container, Section } from "../components/ui/Container"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { sendContactEmail } from "../lib/emailjs"
import { pages, getProfessionalServiceSchema, getBreadcrumbSchema } from "../lib/seo"
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  ENQUIRY_SERVICES,
  getServiceById,
  parseServiceParam,
} from "../lib/enquiry"
import { cn } from "../lib/utils"

const contactDetails = [
  {
    title: "Email",
    value: CONTACT_EMAIL,
    subtitle: "For safeguarding, SEND, and school improvement enquiries",
    icon: Mail,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    title: "Telephone",
    value: CONTACT_PHONE_DISPLAY,
    subtitle: "Call us whenever you need support",
    icon: Phone,
    href: `tel:${CONTACT_PHONE}`,
  },
]

const emptyForm = {
  name: "",
  email: "",
  school: "",
  role: "",
  service: "general",
  message: "",
}

function Contact() {
  const [searchParams] = useSearchParams()
  const serviceFromQuery = useMemo(
    () => parseServiceParam(searchParams.get("service")),
    [searchParams]
  )

  const [form, setForm] = useState(() => ({
    ...emptyForm,
    service: serviceFromQuery,
  }))
  const [status, setStatus] = useState("idle") // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("")
  const meta = pages.contact
  const selectedService = getServiceById(form.service)

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      service: serviceFromQuery,
    }))
  }, [serviceFromQuery])

  useEffect(() => {
    if (serviceFromQuery === "general") return
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [serviceFromQuery])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      await sendContactEmail(form)
      setStatus("success")
      setForm({ ...emptyForm, service: serviceFromQuery })
      toast.success("Message sent successfully", {
        description: "We aim to respond within the same day.",
      })
    } catch (error) {
      const message = error?.text || error?.message || "Something went wrong. Please try again."
      setStatus("error")
      setErrorMessage(message)
      toast.error("Could not send message", {
        description: message,
      })
    }
  }

  const resetForm = () => {
    setStatus("idle")
    setErrorMessage("")
    setForm({ ...emptyForm, service: serviceFromQuery })
  }

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        keywords={meta.keywords}
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
        schema={[
          getProfessionalServiceSchema(),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <article className="min-h-screen bg-background text-foreground">
        <PageHero
          eyebrow="Contact us"
          title="Speak with a safeguarding & SEND consultancy specialist"
          description="Contact FM Education Services at any time for safeguarding consultant UK advice, SEND support services, or school improvement consultancy. If we are not immediately available, we aim to reply within the same day."
          image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80"
          imageAlt="School leaders contacting an education consultancy for safeguarding support"
          primaryLabel="Call now"
          primaryHref={`tel:${CONTACT_PHONE}`}
          primaryIcon={false}
          secondaryLabel="Send a message"
          secondaryHref="#contact-form"
        />

        <Section aria-labelledby="contact-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">Get in touch</p>
                <h2 id="contact-heading" className="mb-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  We are here to support your next step
                </h2>
                <p className="mb-8 text-lg leading-8 text-muted-foreground">
                  Reach out for safeguarding consultant UK support, SEND support services, or school improvement guidance.
                </p>

                <address className="not-italic space-y-4">
                  {contactDetails.map((detail) => {
                    const Icon = detail.icon
                    const ValueTag = detail.href ? "a" : "p"
                    return (
                      <div
                        key={detail.title}
                        className="flex items-start gap-4 rounded-3xl border border-border bg-muted/40 p-5 shadow-sm transition hover:shadow-md"
                      >
                        <div className="rounded-2xl bg-accent p-3 text-accent-foreground" aria-hidden="true">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{detail.title}</h3>
                          <ValueTag
                            {...(detail.href
                              ? {
                                  href: detail.href,
                                  "aria-label": `${detail.title}: ${detail.value}`,
                                }
                              : {})}
                            className="font-medium text-foreground"
                          >
                            {detail.value}
                          </ValueTag>
                          <p className="text-sm text-muted-foreground">{detail.subtitle}</p>
                        </div>
                      </div>
                    )
                  })}
                </address>
              </motion.div>

              <motion.div
                id="contact-form"
                className="scroll-mt-28 rounded-3xl border border-border bg-card p-8 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {status === "success" ? (
                  <div className="flex min-h-[320px] flex-col justify-center gap-6" role="status" aria-live="polite">
                    <Alert variant="success">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      <AlertTitle>Message sent</AlertTitle>
                      <AlertDescription>
                        Your email was delivered successfully. We aim to respond within the same day.
                      </AlertDescription>
                    </Alert>
                    <div className="text-center">
                      <Button variant="secondary" onClick={resetForm}>
                        Send another message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-2 font-display text-2xl font-semibold" id="contact-form-heading">
                      Request a consultation
                    </h3>
                    {selectedService && selectedService.id !== "general" ? (
                      <p className="mb-6 text-sm text-muted-foreground" role="status">
                        Prefilling for: <span className="font-medium text-foreground">{selectedService.label}</span>
                        {" · "}
                        <Link to="/contact" className="text-primary underline-offset-4 hover:underline">
                          Clear selection
                        </Link>
                      </p>
                    ) : (
                      <p className="mb-6 text-sm text-muted-foreground">
                        Tell us about your setting and how we can help.
                      </p>
                    )}

                    <form
                      className="flex flex-col gap-5"
                      onSubmit={handleSubmit}
                      aria-labelledby="contact-form-heading"
                      aria-busy={status === "loading"}
                    >
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full name</Label>
                          <Input
                            id="name"
                            name="name"
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            disabled={status === "loading"}
                            aria-required="true"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Work email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@school.org"
                            required
                            disabled={status === "loading"}
                            aria-required="true"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="school">School / setting</Label>
                          <Input
                            id="school"
                            name="school"
                            autoComplete="organization"
                            value={form.school}
                            onChange={handleChange}
                            placeholder="School or academy name"
                            disabled={status === "loading"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Your role</Label>
                          <Input
                            id="role"
                            name="role"
                            autoComplete="organization-title"
                            value={form.role}
                            onChange={handleChange}
                            placeholder="e.g. Headteacher, SENCo"
                            disabled={status === "loading"}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">How can we help?</Label>
                        <select
                          id="service"
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          disabled={status === "loading"}
                          aria-required="true"
                          className={cn(
                            "flex h-11 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          )}
                        >
                          {ENQUIRY_SERVICES.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Share a little context — inspection prep, training needs, review dates, or anything else we should know"
                          required
                          disabled={status === "loading"}
                          aria-required="true"
                          className="min-h-[140px] resize-y"
                        />
                      </div>

                      {status === "error" ? (
                        <Alert variant="destructive" role="alert">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          <AlertTitle>Sending failed</AlertTitle>
                          <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                      ) : null}

                      <div className="pt-1">
                        <Button
                          type="submit"
                          variant="primary"
                          icon={status !== "loading"}
                          disabled={status === "loading"}
                          aria-label={status === "loading" ? "Sending your message" : "Send consultation request"}
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                              Sending...
                            </>
                          ) : (
                            "Send message"
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </Container>
        </Section>

        <CTASection />
      </article>
    </>
  )
}

export default Contact
