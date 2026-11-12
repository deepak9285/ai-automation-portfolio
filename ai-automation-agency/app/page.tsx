import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/sections/hero'
import { ServicesSection } from '@/components/sections/services'
import { IndustriesSection } from '@/components/sections/industries'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { PricingSection } from '@/components/sections/pricing'
import { FAQSection } from '@/components/sections/faq'
import { CTASection } from '@/components/sections/cta'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <ServicesSection />
        {/* <IndustriesSection /> */}
        <TestimonialsSection />
        {/* <PricingSection /> */}
        <FAQSection />
        <CTASection />
      </div>
      <Footer />
    </main>
  )
}
