import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Mail, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Seo from "../components/Seo"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import ServiceSelect from "../components/ServiceSelect"
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
  parseServiceParam,
  scrollToId,
} from "../lib/enquiry"
import { siteImages } from "../lib/images"
import { useTranslation } from "../context/LanguageContext"

const emptyForm = {
  name: "",
  email: "",
  school: "",
  role: "",
  service: "general",
  message: "",
  website: "", // honeypot — must stay empty
}

function Contact() {
  const [searchParams] = useSearchParams()
  const { t, localizePath } = useTranslation()
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

  const serviceLabel = t(`enquiryServices.${form.service}`)

  const contactDetails = useMemo(
    () => [
      {
        title: t("contact.emailTitle"),
        value: CONTACT_EMAIL,
        subtitle: t("contact.emailSubtitle"),
        icon: Mail,
        href: `mailto:${CONTACT_EMAIL}`,
      },
      {
        title: t("contact.phoneTitle"),
        value: CONTACT_PHONE_DISPLAY,
        subtitle: t("contact.phoneSubtitle"),
        icon: Phone,
        href: `tel:${CONTACT_PHONE}`,
      },
    ],
    [t]
  )

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      service: serviceFromQuery,
    }))
  }, [serviceFromQuery])

  // Land on the form when arriving with a service prefill or #contact-form.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    const shouldScroll = serviceFromQuery !== "general" || hash === "contact-form"
    if (!shouldScroll) return undefined
    return scrollToId("contact-form", { behavior: "smooth", block: "start" })
  }, [serviceFromQuery])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    if (form.website?.trim()) {
      setStatus("success")
      setForm({ ...emptyForm, service: serviceFromQuery })
      return
    }

    try {
      const { website: _honeypot, ...payload } = form
      await sendContactEmail(payload)
      setStatus("success")
      setForm({ ...emptyForm, service: serviceFromQuery })
      toast.success(t("contact.toastSuccess"), {
        description: t("contact.toastSuccessDesc"),
      })
    } catch (error) {
      const message = error?.text || error?.message || "Something went wrong. Please try again."
      setStatus("error")
      setErrorMessage(message)
      toast.error(t("contact.toastError"), {
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
        image={siteImages.contactHero.src}
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
          eyebrow={t("contact.heroEyebrow")}
          title={t("contact.heroTitle")}
          description={t("contact.heroDescription")}
          image={siteImages.contactHero.src}
          imageAlt={siteImages.contactHero.alt}
          primaryLabel={t("common.callNow")}
          primaryHref={`tel:${CONTACT_PHONE}`}
          primaryIcon={false}
          secondaryLabel={t("contact.sendMessage")}
          secondaryHref="#contact-form"
        />

        <Section aria-labelledby="contact-heading">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                  {t("common.getInTouch")}
                </p>
                <h2 id="contact-heading" className="mb-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {t("contact.heading")}
                </h2>
                <p className="mb-8 text-lg leading-8 text-muted-foreground">{t("contact.intro")}</p>

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
                      <AlertTitle>{t("contact.successTitle")}</AlertTitle>
                      <AlertDescription>{t("contact.successBody")}</AlertDescription>
                    </Alert>
                    <div className="text-center">
                      <Button variant="secondary" onClick={resetForm}>
                        {t("contact.sendAnother")}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-2 font-display text-2xl font-semibold" id="contact-form-heading">
                      {t("contact.formTitle")}
                    </h3>
                    {form.service !== "general" ? (
                      <p className="mb-6 text-sm text-muted-foreground" role="status">
                        {t("contact.prefilling")}{" "}
                        <span className="font-medium text-foreground">{serviceLabel}</span>
                        {" · "}
                        <Link
                          to={localizePath("/contact#contact-form")}
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          {t("common.clearSelection")}
                        </Link>
                      </p>
                    ) : (
                      <p className="mb-6 text-sm text-muted-foreground">{t("contact.formHint")}</p>
                    )}

                    <form
                      className="relative flex flex-col gap-5"
                      onSubmit={handleSubmit}
                      aria-labelledby="contact-form-heading"
                      aria-busy={status === "loading"}
                    >
                      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.website}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t("contact.fullName")}</Label>
                          <Input
                            id="name"
                            name="name"
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder={t("contact.namePlaceholder")}
                            required
                            disabled={status === "loading"}
                            aria-required="true"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("contact.workEmail")}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder={t("contact.emailPlaceholder")}
                            required
                            disabled={status === "loading"}
                            aria-required="true"
                          />
                        </div>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="school">{t("contact.school")}</Label>
                          <Input
                            id="school"
                            name="school"
                            autoComplete="organization"
                            value={form.school}
                            onChange={handleChange}
                            placeholder={t("contact.schoolPlaceholder")}
                            disabled={status === "loading"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">{t("contact.role")}</Label>
                          <Input
                            id="role"
                            name="role"
                            autoComplete="organization-title"
                            value={form.role}
                            onChange={handleChange}
                            placeholder={t("contact.rolePlaceholder")}
                            disabled={status === "loading"}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label id="service-label">{t("contact.howCanWeHelp")}</Label>
                        <ServiceSelect
                          name="service"
                          value={form.service}
                          labelId="service-label"
                          disabled={status === "loading"}
                          getLabel={(id) => t(`enquiryServices.${id}`)}
                          onChange={(service) =>
                            setForm((prev) => ({ ...prev, service }))
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t("contact.message")}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={form.message}
                          onChange={handleChange}
                          placeholder={t("contact.messagePlaceholder")}
                          required
                          disabled={status === "loading"}
                          aria-required="true"
                          className="min-h-[140px] resize-y"
                        />
                      </div>

                      {status === "error" ? (
                        <Alert variant="destructive" role="alert">
                          <AlertCircle className="h-4 w-4" aria-hidden="true" />
                          <AlertTitle>{t("contact.errorTitle")}</AlertTitle>
                          <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                      ) : null}

                      <div className="pt-1">
                        <Button
                          type="submit"
                          variant="primary"
                          icon={status !== "loading"}
                          disabled={status === "loading"}
                        >
                          {status === "loading" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                              {t("contact.sending")}
                            </>
                          ) : (
                            t("contact.send")
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
