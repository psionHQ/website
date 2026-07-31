import Container from "@/components/layout/Container";
import HeroActions from "./HeroActions";
import HeroBackground from "./HeroBackground";
import HeroBadge from "./HeroBadge";
import HeroSubtitle from "./HeroSubtitle";
import HeroTitle from "./HeroTitle";

const HERO_CONTENT = {
  productName: "PSIONHQ",
  title: "The Operating System for Intelligence",
  subtitle: "Building secure AI, identity, vault and digital infrastructure.",
  primaryAction: {
    label: "Get Started",
    href: "/get-started",
  },
  secondaryAction: {
    label: "Documentation",
    href: "/documentation",
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <HeroBackground />
      <Container>
        <div className="flex flex-col items-start gap-6 sm:gap-8">
          <HeroBadge label={HERO_CONTENT.productName} />
          <HeroTitle title={HERO_CONTENT.title} />
          <HeroSubtitle subtitle={HERO_CONTENT.subtitle} />
          <HeroActions
            primaryLabel={HERO_CONTENT.primaryAction.label}
            primaryHref={HERO_CONTENT.primaryAction.href}
            secondaryLabel={HERO_CONTENT.secondaryAction.label}
            secondaryHref={HERO_CONTENT.secondaryAction.href}
          />
        </div>
      </Container>
    </section>
  );
}
