import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"
import { Container, Section } from "./ui/Container"
import { Button } from "./ui/button"
import { useTranslation } from "../context/LanguageContext"

/**
 * Dedicated company overview for the home page (spec: corporate showcase).
 */
export default function CompanyOverview() {
  const { t, localizePath } = useTranslation()

  return (
    <Section aria-labelledby="company-overview-heading">
      <Container>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
            {t("companyOverview.eyebrow")}
          </p>
          <h2
            id="company-overview-heading"
            className="mb-6 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance"
          >
            {t("companyOverview.title")}
          </h2>
          <p className="mb-6 text-lg leading-8 text-muted-foreground">{t("companyOverview.body")}</p>
          <Button as={Link} to={localizePath("/about")} variant="primary" icon>
            {t("companyOverview.cta")}
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
