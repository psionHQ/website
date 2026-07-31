"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import HeroActions from "./HeroActions";
import HeroBackground from "./HeroBackground";
import HeroBadge from "./HeroBadge";
import HeroSubtitle from "./HeroSubtitle";
import HeroTitle from "./HeroTitle";
import { fadeUp, staggerContainer } from "@/lib/motion";

const HERO_CONTENT = {
  productName: "PSIONHQ",
  title: "The Operating System for Intelligence",
  subtitle:
    "Sovereign AI, encrypted vaults, digital identity, and self-custodied wallets — unified into one platform built for the future of secure infrastructure.",
  primaryAction: {
    label: "Get Started",
    href: "/signup",
  },
  secondaryAction: {
    label: "Read the Docs",
    href: "/developers",
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <HeroBackground />
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-6 sm:gap-8"
        >
          <motion.div variants={fadeUp}>
            <HeroBadge label={HERO_CONTENT.productName} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <HeroTitle title={HERO_CONTENT.title} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <HeroSubtitle subtitle={HERO_CONTENT.subtitle} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <HeroActions
              primaryLabel={HERO_CONTENT.primaryAction.label}
              primaryHref={HERO_CONTENT.primaryAction.href}
              secondaryLabel={HERO_CONTENT.secondaryAction.label}
              secondaryHref={HERO_CONTENT.secondaryAction.href}
            />
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {["End-to-end encrypted", "Zero-knowledge by design", "SOC 2 ready"].map(
              (item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-xs text-foreground/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-foreground/40"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </span>
              ),
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
