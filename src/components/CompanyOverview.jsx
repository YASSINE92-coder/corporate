import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { fadeInUp } from "../lib/animations"
import { Container, Section } from "./ui/Container"
import { Button } from "./ui/button"
import { TiltedCard } from "./ui/tilted-card"
import { siteImages } from "../lib/images"
import { useTranslation } from "../context/LanguageContext"

/**
 * Dedicated company overview for the home page (spec: corporate showcase).
 */
export default function CompanyOverview() {
  const { t, localizePath } = useTranslation()
  const image = siteImages.overviewImage

  return (
    <Section aria-labelledby="company-overview-heading">
      <Container>
        <motion.div
          className="flex flex-col items-center gap-10 md:flex-row md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="w-full md:w-1/2">
            <TiltedCard
              imageSrc={image.src}
              altText={image.alt}
              width={image.width}
              height={image.height}
              className="h-72 w-full sm:h-80"
              imageClassName="rounded-3xl shadow-sm opacity-90"
              rotateAmplitude={8}
              scaleOnHover={1.03}
            />
          </div>

          <div className="w-full md:w-1/2">
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
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
