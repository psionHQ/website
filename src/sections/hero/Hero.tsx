"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import HeroActions from "./HeroActions";
import HeroBackground from "./HeroBackground";
import HeroBadge from "./HeroBadge";
import HeroSubtitle from "./HeroSubtitle";
import HeroTitle from "./HeroTitle";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const HERO_CONTENT = {
  productName: "PSIONHQ",
  title: "The Infrastructure for Human Intelligence",
  subtitle: "Your second brain. Built for you.",
  supporting:
    "A private AI that remembers what matters, protects your knowledge, and works only for you.",
  primaryAction: {
    label: "Join Early Access",
    href: "/signup",
  },
  secondaryAction: {
    label: "Explore Platform",
    href: "/platform",
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <HeroBackground />
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 text-center sm:gap-8"
        >
          {/* Animated glowing Ψ logo */}
          <motion.div variants={scaleIn} className="relative">
            {/* Outer pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#0066FF]/20 blur-[32px]"
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            {/* Inner glow */}
            <motion.div
              className="absolute inset-2 rounded-full bg-[#0066FF]/30 blur-[16px]"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              aria-hidden="true"
            />
            {/* Ψ symbol */}
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#0066FF]/40 bg-[#0066FF]/[0.08] backdrop-blur-sm sm:h-24 sm:w-24">
              <span
                className="select-none font-heading text-4xl font-semibold text-[#0066FF] sm:text-5xl"
                style={{ textShadow: "0 0 24px #0066FF, 0 0 48px #0066FF80" }}
                aria-hidden="true"
              >
                Ψ
              </span>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div variants={fadeUp}>
            <HeroBadge label={HERO_CONTENT.productName} />
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp}>
            <HeroTitle title={HERO_CONTENT.title} />
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={fadeUp}>
            <HeroSubtitle
              subtitle={HERO_CONTENT.subtitle}
              supporting={HERO_CONTENT.supporting}
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeUp}>
            <HeroActions
              primaryLabel={HERO_CONTENT.primaryAction.label}
              primaryHref={HERO_CONTENT.primaryAction.href}
              secondaryLabel={HERO_CONTENT.secondaryAction.label}
              secondaryHref={HERO_CONTENT.secondaryAction.href}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
