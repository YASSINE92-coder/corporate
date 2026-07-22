import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Seo from "../components/Seo"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import ContactDetails, { buildContactDetails } from "../components/ContactDetails"
import ContactForm from "../components/ContactForm"
import { fadeInUp } from "../lib/animations"
import { Container, Section } from "../components/ui/Container"
import { sendContactEmail } from "../lib/emailjs"
import { pages, getProfessionalServiceSchema, getBreadcrumbSchema } from "../lib/seo"
import { CONTACT_PHONE, parseServiceParam, scrollToId, contactPath } from "../lib/enquiry"
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
  const contactDetails = useMemo(() => buildContactDetails(t), [t])

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

  const handleServiceChange = (service) => {
    setForm((prev) => ({ ...prev, service }))
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
                <ContactDetails details={contactDetails} />
              </motion.div>

              <motion.div
                id="contact-form"
                className="scroll-mt-28 rounded-3xl border border-border bg-card p-8 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <ContactForm
                  form={form}
                  status={status}
                  errorMessage={errorMessage}
                  serviceLabel={serviceLabel}
                  clearSelectionTo={localizePath(contactPath())}
                  onChange={handleChange}
                  onServiceChange={handleServiceChange}
                  onSubmit={handleSubmit}
                  onReset={resetForm}
                  t={t}
                />
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
