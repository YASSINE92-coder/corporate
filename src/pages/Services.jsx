import { useMemo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Seo from "../components/Seo"
import PageHero from "../components/PageHero"
import CTASection from "../components/CTASection"
import { fadeInUp, staggerContainer } from "../lib/animations"
import { Container, Section, SectionHeading } from "../components/ui/Container"
import { Button } from "../components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs"
import { pages, getProfessionalServiceSchema, getBreadcrumbSchema } from "../lib/seo"
import { siteImages } from "../lib/images"
import { contactPath } from "../lib/enquiry"
import { useTranslation } from "../context/LanguageContext"

function Services() {
  const meta = pages.services
  const { t, localizePath, isRtl } = useTranslation()

  const sendOutcomes = useMemo(() => {
    const items = t("servicesPage.sendOutcomes")
    return Array.isArray(items) ? items : []
  }, [t])

  const safeguardingList = useMemo(() => {
    const items = t("servicesPage.safeguardingList")
    return Array.isArray(items) ? items : []
  }, [t])

  const outcomes = useMemo(() => {
    const items = t("servicesPage.outcomes")
    return Array.isArray(items) ? items : []
  }, [t])

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        keywords={meta.keywords}
        image={siteImages.servicesHero.src}
        schema={[
          getProfessionalServiceSchema(),
          getBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <article className="min-h-screen bg-background text-foreground">
        <PageHero
          eyebrow={t("servicesPage.heroEyebrow")}
          title={t("servicesPage.heroTitle")}
          description={t("servicesPage.heroDescription")}
          image={siteImages.servicesHero.src}
          imageAlt={siteImages.servicesHero.alt}
          primaryHref={contactPath()}
        />

        <Section aria-label={t("servicesPage.heroTitle")}>
          <Container>
            <Tabs defaultValue="safeguarding" dir={isRtl ? "rtl" : "ltr"} className="w-full">
              <TabsList className="mx-auto grid w-full grid-cols-1 sm:mx-0 sm:inline-flex sm:w-auto">
                <TabsTrigger value="safeguarding">
                  {t("homeServices.items.safeguarding.title")}
                </TabsTrigger>
                <TabsTrigger value="send">{t("homeServices.items.send.title")}</TabsTrigger>
                <TabsTrigger value="school-improvement">
                  {t("homeServices.items.schoolImprovement.title")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="safeguarding">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <SectionHeading
                    id="services-safeguarding"
                    eyebrow={t("servicesPage.safeguardingEyebrow")}
                    title={t("servicesPage.safeguardingTitle")}
                    description={t("servicesPage.safeguardingDescription")}
                    align="left"
                  />
                </motion.div>

                <motion.div
                  className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.div className="space-y-5 text-lg leading-8 text-muted-foreground" variants={fadeInUp}>
                    <p>{t("servicesPage.safeguardingP1")}</p>
                    <p>{t("servicesPage.safeguardingP2")}</p>
                    <Button as={Link} to={localizePath(contactPath("safeguarding"))} variant="primary" icon>
                      {t("common.bookConsultation")}
                    </Button>
                  </motion.div>

                  <motion.aside
                    className="rounded-[28px] border border-border bg-muted/50 p-8 shadow-sm"
                    variants={fadeInUp}
                  >
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                      {t("servicesPage.whatWeProvide")}
                    </h3>
                    <ul className="space-y-3 text-muted-foreground">
                      {safeguardingList.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </motion.aside>
                </motion.div>
              </TabsContent>

              <TabsContent value="send">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                  <SectionHeading
                    id="services-send"
                    eyebrow={t("servicesPage.sendEyebrow")}
                    title={t("servicesPage.sendTitle")}
                    description={t("servicesPage.sendDescription")}
                    align="left"
                  />
                </motion.div>

                <motion.div
                  className="mt-10 space-y-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <motion.p className="max-w-4xl text-lg leading-8 text-muted-foreground" variants={fadeInUp}>
                    {t("servicesPage.sendBody")}
                  </motion.p>

                  <motion.div
                    className="rounded-[32px] border border-border bg-card p-8 shadow-sm md:p-10"
                    variants={fadeInUp}
                  >
                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                      {t("servicesPage.packageEyebrow")}
                    </p>
                    <h3 className="mb-6 font-display text-2xl font-semibold tracking-tight">
                      {t("servicesPage.packageTitle")}
                    </h3>
                    <ul className="grid gap-4 md:grid-cols-2">
                      {sendOutcomes.map((item) => (
                        <li
                          key={item}
                          className="rounded-2xl border border-border bg-muted/50 px-5 py-4 text-foreground/90"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8">
                      <Button as={Link} to={localizePath(contactPath("send"))} variant="primary" icon>
                        {t("common.enquireNow")}
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="school-improvement">
                <div className="rounded-[32px] border border-border bg-muted/50 p-8 shadow-sm md:p-12">
                  <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                    <div>
                      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                        {t("servicesPage.improvementEyebrow")}
                      </p>
                      <h2
                        id="services-improvement"
                        className="mb-4 font-display text-3xl font-semibold tracking-tight md:text-4xl"
                      >
                        {t("servicesPage.improvementTitle")}
                      </h2>
                      <p className="mb-6 text-lg leading-8 text-muted-foreground">
                        {t("servicesPage.improvementBody")}
                      </p>
                      <Button
                        as={Link}
                        to={localizePath(contactPath("school-improvement"))}
                        variant="primary"
                        icon
                      >
                        {t("common.talkToSpecialist")}
                      </Button>
                    </div>
                    <aside className="rounded-[24px] bg-accent p-6 text-accent-foreground">
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                        {t("servicesPage.outcomesTitle")}
                      </h3>
                      <ul className="space-y-3 text-lg">
                        {outcomes.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </aside>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Container>
        </Section>

        <CTASection />
      </article>
    </>
  )
}

export default Services
