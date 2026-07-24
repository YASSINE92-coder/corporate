import { useMemo } from "react"
import {
  ShieldCheck,
  BookOpenCheck,
  Compass,
  Sparkles,
  Target,
  Eye,
  HeartHandshake,
  Scale,
  CheckCircle2,
} from "lucide-react"
import { motion } from "framer-motion"
import Seo from "../components/Seo"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp, fadeInUpStagger, staggerContainer, scaleIn } from "../lib/animations"
import { Container, Section, SectionHeading } from "../components/ui/Container"
import { TiltedCard } from "../components/ui/tilted-card"
import { pages, getProfessionalServiceSchema, getBreadcrumbSchema } from "../lib/seo"
import { siteImages } from "../lib/images"
import OptimizedImage from "../components/OptimizedImage"
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

        <Section aria-labelledby="about-director" className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -end-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -start-20 h-64 w-64 rounded-full bg-accent/60 blur-3xl dark:bg-accent/25"
          />

          <Container className="relative">
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
              <motion.div
                className="lg:sticky lg:top-28"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="relative mx-auto max-w-sm">
                  <div
                    aria-hidden="true"
                    className="absolute -inset-3 -z-10 rounded-[40px] border border-primary/15 bg-accent/40 dark:bg-accent/15"
                  />
                  <TiltedCard
                    imageSrc={siteImages.directorPortrait.src}
                    altText={siteImages.directorPortrait.alt}
                    width={siteImages.directorPortrait.width}
                    height={siteImages.directorPortrait.height}
                    className="aspect-[4/5] w-full"
                    rotateAmplitude={8}
                    scaleOnHover={1.03}
                  />
                </div>
              </motion.div>

              <div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.p
                    variants={fadeInUpStagger}
                    className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-primary"
                  >
                    <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
                    {t("about.whoWeAre")}
                  </motion.p>
                  <motion.h2
                    variants={fadeInUpStagger}
                    id="about-director"
                    className="mb-6 font-display text-3xl font-semibold tracking-tight md:text-4xl"
                  >
                    {t("about.directorTitle")}
                  </motion.h2>
                  <motion.p variants={fadeInUpStagger} className="mb-4 text-lg leading-8 text-muted-foreground">
                    {t("about.directorP1")}
                  </motion.p>
                  <motion.p variants={fadeInUpStagger} className="mb-4 text-lg leading-8 text-muted-foreground">
                    {t("about.directorP2")}
                  </motion.p>
                  <motion.p variants={fadeInUpStagger} className="mb-10 text-lg leading-8 text-muted-foreground">
                    {t("about.directorP3")}
                  </motion.p>

                  <motion.aside
                    variants={fadeInUpStagger}
                    className="rounded-[28px] border border-border bg-muted/50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="mb-5 font-display text-2xl font-semibold">{t("about.positioningTitle")}</h3>
                    <ul className="space-y-4">
                      {(Array.isArray(positioning) ? positioning : []).map((item) => (
                        <li key={item} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                          <span className="leading-7">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.aside>
                </motion.div>
              </div>
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
                className="overflow-hidden rounded-[28px] border border-border bg-card shadow-sm"
                variants={scaleIn}
              >
                <OptimizedImage
                  src={siteImages.missionImage.src}
                  alt={siteImages.missionImage.alt}
                  width={siteImages.missionImage.width}
                  height={siteImages.missionImage.height}
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="p-8">
                  <div className="mb-4 inline-flex rounded-2xl bg-accent p-3 text-primary" aria-hidden="true">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-semibold">{t("about.missionTitle")}</h3>
                  <p className="text-lg leading-8 text-muted-foreground">{t("about.missionBody")}</p>
                </div>
              </motion.article>

              <motion.article
                className="overflow-hidden rounded-[28px] border border-border bg-card shadow-sm"
                variants={scaleIn}
              >
                <OptimizedImage
                  src={siteImages.visionImage.src}
                  alt={siteImages.visionImage.alt}
                  width={siteImages.visionImage.width}
                  height={siteImages.visionImage.height}
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="p-8">
                  <div className="mb-4 inline-flex rounded-2xl bg-accent p-3 text-primary" aria-hidden="true">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-semibold">{t("about.visionTitle")}</h3>
                  <p className="text-lg leading-8 text-muted-foreground">{t("about.visionBody")}</p>
                </div>
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
