import Seo from "../components/Seo"
import HeroSection from "../components/HeroSection"
import ImpactSection from "../components/ImpactSection"
import TrustedSection from "../components/TrustedSection"
import ServicesSection from "../components/ServicesSection"
import TestimonialSection from "../components/TestimonialSection"
import ContentBlock from "../components/ContentBlock"
import FAQSection from "../components/FAQSection"
import CTASection from "../components/CTASection"
import {
  pages,
  getProfessionalServiceSchema,
  getBreadcrumbSchema,
  getFaqSchema,
} from "../lib/seo"

const homeFaqs = [
  {
    question: "What does a safeguarding engagement typically include?",
    answer:
      "We provide bespoke advice, face-to-face training, and auditing for schools, academies, and Early Years settings. This can include preparation for Ofsted pre-registration inspections and ongoing support aligned to KCSIE and Working Together to Safeguard Children.",
  },
  {
    question: "How long is a SEND and Inclusion review?",
    answer:
      "Reviews are typically a one-to-two-day package based on your organisation’s needs. They help improve SEND provision, support SENCos, meet statutory obligations, and raise achievement for all pupils.",
  },
  {
    question: "Do you work internationally?",
    answer:
      "Yes. FM Education Services works across the United Kingdom, the United Arab Emirates, the GCC region, and British Schools Overseas, using relevant inspection frameworks including UK, UAE, and BSO.",
  },
  {
    question: "How quickly can we expect a response?",
    answer:
      "You can contact us at any time. If we are not immediately available, we aim to get back to you within the same day.",
  },
]

function Home() {
  const meta = pages.home

  return (
    <>
      <Seo
        title={meta.title}
        description={meta.description}
        path={meta.path}
        keywords={meta.keywords}
        schema={[
          getProfessionalServiceSchema(),
          getBreadcrumbSchema([{ name: "Home", path: "/" }]),
          getFaqSchema(homeFaqs),
        ]}
      />
      <article>
        <HeroSection />
        <ImpactSection />
        <TrustedSection />
        <ServicesSection />
        <TestimonialSection />
        <ContentBlock
          eyebrow="Leadership"
          title="35+ years of school improvement consultancy expertise"
          description="Fatiha Maitland, Director of FM Education Services, is a senior inspector and education consultant with extensive experience across the UK, UAE, GCC, and British Schools Overseas. Her coaching style helps schools accelerate performance with clarity and confidence."
          image="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
          imageAlt="School improvement consultancy session supporting school leaders in the UK"
        />
        <ContentBlock
          eyebrow="Impact"
          title="Safeguarding consultant UK and SEND support that make a difference"
          description="From face-to-face safeguarding training and auditing to one-to-two-day SEND support services and inclusion reviews, we provide bespoke consultancy that strengthens provision, meets statutory obligations, and raises achievement for all pupils."
          image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
          imageAlt="SEND support services and inclusive classroom practice in a UK school"
          reverse
        />
        <FAQSection />
        <CTASection />
      </article>
    </>
  )
}

export default Home
