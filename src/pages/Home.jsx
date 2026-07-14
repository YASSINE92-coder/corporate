import HeroSection from "../components/HeroSection"
import ImpactSection from "../components/ImpactSection"
import TrustedSection from "../components/TrustedSection"
import ServicesSection from "../components/ServicesSection"
import TestimonialSection from "../components/TestimonialSection"
import ContentBlock from "../components/ContentBlock"
import ImpactIcons from "../components/ImpactIcons"
import CTASection from "../components/CTASection"
import NewsletterSection from "../components/NewsletterSection"
import { ThemeToggle } from "../components/theme-toggle"

function Home() {
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <HeroSection />
      <ImpactSection />
      <TrustedSection />
      <ServicesSection />
      <TestimonialSection />
      <ContentBlock
        title="Excellence in Awards"
        description="Our commitment to excellence has been recognized through numerous industry awards and accolades. We take pride in delivering outstanding results that consistently exceed client expectations and set new standards in the consulting industry."
        image="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80"
      />
      <ContentBlock
        title="High Quality Consultants"
        description="Our team consists of highly experienced consultants with deep expertise across various industries. Each consultant brings unique insights and proven methodologies to help your organization navigate complex challenges and seize new opportunities."
        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
        reverse
      />
      <ImpactIcons />
      <CTASection />
      <NewsletterSection />
    </div>
  )
}

export default Home
