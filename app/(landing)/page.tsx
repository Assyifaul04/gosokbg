import { HeroSection } from "@/components/landing/hero-section";
import { QualityShowcaseSection } from "@/components/landing/quality-showcase-section";
import { AllInOneSection } from "@/components/landing/all-in-one-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <QualityShowcaseSection />
      <AllInOneSection />
      <HowItWorksSection />
      <FaqSection />
      <CtaSection />
    </div>
  );
}