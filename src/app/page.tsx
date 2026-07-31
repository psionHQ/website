import Hero from "@/sections/hero/Hero";
import FeaturesSection from "@/sections/features/FeaturesSection";
import AISection from "@/sections/ai/AISection";
import VaultSection from "@/sections/vault/VaultSection";
import WalletSection from "@/sections/wallet/WalletSection";
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
      <CTASection />
      <FooterSection />
    </>
  );
}
