import Hero from "@/sections/hero/Hero";
import FeaturesSection from "@/sections/features/FeaturesSection";
import AISection from "@/sections/ai/AISection";
import VaultSection from "@/sections/vault/VaultSection";
import WalletSection from "@/sections/wallet/WalletSection";
import EcosystemSection from "@/sections/ecosystem/EcosystemSection";
import TestimonialsSection from "@/sections/testimonials/TestimonialsSection";
import FAQSection from "@/sections/faq/FAQSection";
import CTASection from "@/sections/cta/CTASection";
import FooterSection from "@/sections/footer/FooterSection";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <AISection />
      <VaultSection />
      <WalletSection />
      <EcosystemSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
