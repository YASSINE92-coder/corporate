import { useMemo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowUpRight, GraduationCap, SearchCheck, ShieldCheck } from "lucide-react"
import { fadeInUp, staggerContainer, fadeInUpStagger } from "../lib/animations"
import { Container, Section, SectionHeading } from "./ui/Container"
import { Badge } from "./ui/badge"
import OptimizedImage from "./OptimizedImage"
import { contactPath } from "../lib/enquiry"
import { siteImages } from "../lib/images"
import { useTranslation } from "../context/LanguageContext"

export default function ServicesSection() {
  const { t, locale } = useTranslation()

  const services = useMemo(
    () => [
      {
        id: "safeguarding",
        title: t("homeServices.items.safeguarding.title"),
        description: t("homeServices.items.safeguarding.description"),
        image: siteImages.serviceSafeguarding.src,
        imageAlt: siteImages.serviceSafeguarding.alt,
        imageWidth: siteImages.serviceSafeguarding.width,
        imageHeight: siteImages.serviceSafeguarding.height,
        icon: ShieldCheck,
        span: "md:col-span-2 md:row-span-2",
        featured: true,
        href: contactPath("safeguarding", { lang: locale }),
      },
      {
        id: "send",
        title: t("homeServices.items.send.title"),
        description: t("homeServices.items.send.description"),
        image: siteImages.serviceSend.src,
        imageAlt: siteImages.serviceSend.alt,
        imageWidth: siteImages.serviceSend.width,
        imageHeight: siteImages.serviceSend.height,
        icon: SearchCheck,
        span: "md:col-span-1",
        href: contactPath("send", { lang: locale }),
      },
      {
        id: "school-improvement",
        title: t("homeServices.items.schoolImprovement.title"),
        description: t("homeServices.items.schoolImprovement.description"),
        image: siteImages.serviceSchoolImprovement.src,
        imageAlt: siteImages.serviceSchoolImprovement.alt,
        imageWidth: siteImages.serviceSchoolImprovement.width,
        imageHeight: siteImages.serviceSchoolImprovement.height,
        icon: GraduationCap,
        span: "md:col-span-1",
        href: contactPath("school-improvement", { lang: locale }),
      },
    ],
    [t, locale]
  )

  return (
    <Section aria-labelledby="home-services-heading">
      <Container>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <SectionHeading
            id="home-services-heading"
            eyebrow={t("homeServices.eyebrow")}
            title={t("homeServices.title")}
            description={t("homeServices.description")}
          />
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.article key={service.id} variants={fadeInUpStagger} className={service.span}>
                <Link
                  to={service.href}
                  className={`group relative flex h-full min-h-[220px] overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    service.featured ? "md:min-h-full" : ""
                  }`}
                  aria-label={`${t("homeServices.requestConsultation")}: ${service.title}`}
                >
                  <OptimizedImage
                    src={service.image}
                    alt={service.imageAlt}
                    width={service.imageWidth}
                    height={service.imageHeight}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/20" aria-hidden="true" />

                  <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
                    <div className="mb-4 inline-flex w-fit rounded-2xl bg-white/15 p-3 text-white backdrop-blur" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </div>
                    {service.featured ? (
                      <Badge className="mb-3 w-fit bg-primary text-primary-foreground">
                        {t("homeServices.coreService")}
                      </Badge>
                    ) : null}
                    <h3 className="mb-2 font-display text-2xl font-semibold text-white md:text-3xl">
                      {service.title}
                    </h3>
                    <p className={`text-sm leading-7 text-white/80 md:text-base ${service.featured ? "max-w-md" : ""}`}>
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {t("homeServices.requestConsultation")} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </motion.div>
      </Container>
    </Section>
  )
}
