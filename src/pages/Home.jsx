import { useMemo } from "react"
import Seo from "../components/Seo"
import HeroSection from "../components/HeroSection"
import CompanyOverview from "../components/CompanyOverview"
import ImpactSection from "../components/ImpactSection"
import TrustedSection from "../components/TrustedSection"
import PartnersSection from "../components/PartnersSection"
import ServicesSection from "../components/ServicesSection"
import TestimonialSection from "../components/TestimonialSection"
import ContentBlock from "../components/ContentBlock"
import FAQSection from "../components/FAQSection"
import CTASection from "../components/CTASection"
import { pages, getProfessionalServiceSchema, getBreadcrumbSchema, getFaqSchema } from "../lib/seo"
import { siteImages } from "../lib/images"
import { useTranslation } from "../context/LanguageContext"
import { getFaqs } from "../data/faq"

function Home() {
  const meta = pages.home
  const { t } = useTranslation()
  const homeFaqs = useMemo(() => getFaqs(t), [t])

  return (
    <>
      <Seo
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        path={meta.path}
        keywords={t("seo.home.keywords")}
        preloadImages={[{ ...siteImages.homeHero, sizes: "100vw" }]}
        schema={[
          getProfessionalServiceSchema(),
          getBreadcrumbSchema([{ name: "Home", path: "/" }]),
          getFaqSchema(homeFaqs),
        ]}
      />
      <article>
        <HeroSection />
        <CompanyOverview />
        <ImpactSection />
        <TrustedSection />
        <PartnersSection />
        <ServicesSection />
        <TestimonialSection />
        <ContentBlock
          eyebrow={t("homeContent.leadershipEyebrow")}
          title={t("homeContent.leadershipTitle")}
          description={t("homeContent.leadershipBody")}
          image={siteImages.contentLeadership}
          imageAlt={t("images.contentLeadership")}
        />
        <ContentBlock
          eyebrow={t("homeContent.impactEyebrow")}
          title={t("homeContent.impactTitle")}
          description={t("homeContent.impactBody")}
          image={siteImages.contentImpact}
          imageAlt={t("images.contentImpact")}
          reverse
        />
        <FAQSection />
        <CTASection />
      </article>
    </>
  )
}

export default Home
