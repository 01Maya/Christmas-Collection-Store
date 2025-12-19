import { FestiveBackground } from "@/components/festive-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProductShowcase } from "@/components/product-showcase"
import { InteractiveBuilder } from "@/components/interactive-builder"
import { GiftSetsCarousel } from "@/components/gift-sets-carousel"
import { CountdownSection } from "@/components/countdown-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative">
      <FestiveBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProductShowcase />
      <InteractiveBuilder />
      <GiftSetsCarousel />
      <CountdownSection />
      <Footer />
    </main>
  )
}
