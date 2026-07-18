import HeroSection from "../components/HeroSection"
import ImpactSection from "../components/ImpactSection"
import TrustedSection from "../components/TrustedSection"
import ServicesSection from "../components/ServicesSection"
import TestimonialSection from "../components/TestimonialSection"
import ContentBlock from "../components/ContentBlock"
import FAQSection from "../components/FAQSection"
import CTASection from "../components/CTASection"

function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ImpactSection />
      <TrustedSection />
      <ServicesSection />
      <TestimonialSection />
      <ContentBlock
        eyebrow="Leadership"
        title="35+ years of education expertise"
        description="Fatiha Maitland, Director of FM Education Services, is a senior inspector and education consultant with extensive experience across the UK, UAE, GCC, and British Schools Overseas. Her coaching style helps schools accelerate performance with clarity and confidence."
        image="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
      />
      <ContentBlock
        eyebrow="Impact"
        title="Safeguarding and SEND that make a difference"
        description="From face-to-face safeguarding training and auditing to one-to-two-day SEND and inclusion reviews, we provide bespoke support that strengthens provision, meets statutory obligations, and raises achievement for all pupils."
        image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
        reverse
      />
      <FAQSection />
      <CTASection />
    </div>
  )
}

export default Home
