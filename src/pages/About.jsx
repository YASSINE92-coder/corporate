import { useMemo } from "react"
import { ShieldCheck, BookOpenCheck, Compass, Sparkles, Target, Eye, HeartHandshake, Scale } from "lucide-react"
import { motion } from "framer-motion"
import Seo from "../components/Seo"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp, staggerContainer, scaleIn } from "../lib/animations"
import { Container, Section, SectionHeading } from "../components/ui/Container"
import { pages, getProfessionalServiceSchema, getBreadcrumbSchema } from "../lib/seo"
import { siteImages } from "../lib/images"
import { useTranslation } from "../context/LanguageContext"

function About() {
  const meta = pages.about
  const { t } = useTranslation()

  const coreValues = useMemo(
    () => [
      { key: "integrity", icon: HeartHandshake },
      { key: "childCentred", icon: Scale },
      { key: "clarity", icon: Sparkles },
      { key: "partnership", icon: Compass },
    ].map((item) => ({
      ...item,
      title: t(`about.values.${item.key}.title`),
      description: t(`about.values.${item.key}.description`),
    })),
    [t]
  )

  const strengths = useMemo(
    () => [
      { key: "safeguarding", icon: ShieldCheck },
      { key: "send", icon: BookOpenCheck },
      { key: "inspection", icon: Compass },
      { key: "coaching", icon: Sparkles },
    ].map((item) => ({
      ...item,
      title: t(`about.strengths.${item.key}.title`),
      description: t(`about.strengths.${item.key}.description`),
    })),
    [t]
  )

  const positioning = t("about.positioning")

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        keywords={meta.keywords}
        image={siteImages.aboutHero.src}
        schema={[
          getProfessionalServiceSchema(),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <article className="min-h-screen bg-background text-foreground">
        <PageHero
          eyebrow={t("about.heroEyebrow")}
          title={t("about.heroTitle")}
          description={t("about.heroDescription")}
          image={siteImages.aboutHero.src}
          imageAlt={siteImages.aboutHero.alt}
        />

        <Section aria-labelledby="about-director">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                  {t("about.whoWeAre")}
                </p>
                <h2 id="about-director" className="mb-6 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {t("about.directorTitle")}
                </h2>
                <p className="mb-4 text-lg leading-8 text-muted-foreground">{t("about.directorP1")}</p>
                <p className="mb-4 text-lg leading-8 text-muted-foreground">{t("about.directorP2")}</p>
                <p className="text-lg leading-8 text-muted-foreground">{t("about.directorP3")}</p>
              </motion.div>

              <motion.aside
                className="rounded-[32px] border border-border bg-muted/50 p-8 shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h3 className="mb-4 font-display text-2xl font-semibold">{t("about.positioningTitle")}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {(Array.isArray(positioning) ? positioning : []).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </motion.aside>
            </div>
          </Container>
        </Section>

        <Section background="muted" aria-labelledby="mission-vision-heading">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <SectionHeading
                id="mission-vision-heading"
                eyebrow={t("about.purposeEyebrow")}
                title={t("about.purposeTitle")}
                description={t("about.purposeDescription")}
                align="left"
              />
            </motion.div>

            <motion.div
              className="grid gap-6 md:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.article
                className="rounded-[28px] border border-border bg-card p-8 shadow-sm"
                variants={scaleIn}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-accent p-3 text-primary" aria-hidden="true">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold">{t("about.missionTitle")}</h3>
                <p className="text-lg leading-8 text-muted-foreground">{t("about.missionBody")}</p>
              </motion.article>

              <motion.article
                className="rounded-[28px] border border-border bg-card p-8 shadow-sm"
                variants={scaleIn}
              >
                <div className="mb-4 inline-flex rounded-2xl bg-accent p-3 text-primary" aria-hidden="true">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold">{t("about.visionTitle")}</h3>
                <p className="text-lg leading-8 text-muted-foreground">{t("about.visionBody")}</p>
              </motion.article>
            </motion.div>
          </Container>
        </Section>

        <Section aria-labelledby="core-values-heading">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <SectionHeading
                id="core-values-heading"
                eyebrow={t("about.valuesEyebrow")}
                title={t("about.valuesTitle")}
                align="left"
              />
            </motion.div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {coreValues.map((value) => {
                const Icon = value.icon
                return (
                  <motion.article
                    key={value.key}
                    className="rounded-[28px] border border-border bg-muted/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    variants={scaleIn}
                  >
                    <div className="mb-4 inline-flex rounded-2xl bg-accent p-3 text-primary" aria-hidden="true">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.article>
                )
              })}
            </motion.div>
          </Container>
        </Section>

        <Section background="muted" aria-labelledby="about-strengths">
          <Container>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <SectionHeading
                id="about-strengths"
                eyebrow={t("about.strengthsEyebrow")}
                title={t("about.strengthsTitle")}
                align="left"
              />
            </motion.div>

            <motion.div
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {strengths.map((item) => {
                const Icon = item.icon
                return (
                  <motion.article
                    key={item.key}
                    className="rounded-[28px] border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    variants={scaleIn}
                  >
                    <div className="mb-4 inline-flex rounded-2xl bg-accent p-3 text-accent-foreground" aria-hidden="true">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.article>
                )
              })}
            </motion.div>
          </Container>
        </Section>

        <CTASection />
      </article>
    </>
  )
}

export default About
