import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Phone } from "lucide-react"
import { fadeInUp } from "../lib/animations"
import { Button } from "./ui/button"
import { Container, Section } from "./ui/Container"
import { CONTACT_PHONE, contactPath } from "../lib/enquiry"
import { useTranslation } from "../context/LanguageContext"

/**
 * Closing CTA with dual actions:
 * - Primary → contact form (optional ?service= prefill)
 * - Secondary → phone call
 */
export default function CTASection({ service } = {}) {
  const { t, localizePath } = useTranslation()
  const consultationHref = localizePath(contactPath(service))

  return (
    <Section background="accent">
      <Container>
        <motion.div
          className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-md md:p-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="mb-6 font-display text-3xl font-semibold text-white md:text-4xl text-balance">
            {t("cta.title")}
          </h2>
          <p className="mb-8 text-lg leading-8 text-white/80">{t("cta.body")}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              as={Link}
              to={consultationHref}
              variant="secondary"
              className="bg-white text-slate-900 hover:bg-white/90"
              icon
            >
              {t("common.startConsultation")}
            </Button>
            <Button
              as="a"
              href={`tel:${CONTACT_PHONE}`}
              variant="ghost"
              className="border border-white/25 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              aria-label={t("cta.callAria")}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t("common.callNow")}
            </Button>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
