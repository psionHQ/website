import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import PricingCards from "@/components/pricing/PricingCards";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import FooterSection from "@/sections/footer/FooterSection";

export const metadata: Metadata = {
  title: "Pricing | PSIONHQ",
  description: "No hidden fees. Scale from personal to enterprise without surprises.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, honest pricing"
        subtitle="No hidden fees. Scale from personal to enterprise without surprises."
      />

      <section className="py-8 sm:py-12">
        <Container>
          <PricingCards />
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <PricingFAQ />
        </Container>
      </section>

      <FooterSection />
    </>
  );
}
