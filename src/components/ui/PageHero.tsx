"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { ButtonLink } from "@/components/buttons/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface PageHeroAction {
  label: string;
  href: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  actions?: {
    primary?: PageHeroAction;
    secondary?: PageHeroAction;
  };
}

export default function PageHero({ eyebrow, title, subtitle, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#0066FF]/[0.07] blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-64 w-64 translate-x-1/3 rounded-full bg-[#0066FF]/[0.05] blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start gap-5 sm:gap-6"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066FF]"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/60 sm:text-lg sm:leading-relaxed"
          >
            {subtitle}
          </motion.p>
          {actions && (actions.primary || actions.secondary) && (
            <motion.div variants={fadeUp} className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              {actions.primary && (
                <ButtonLink href={actions.primary.href} variant="primary" size="md">
                  {actions.primary.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={14}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </ButtonLink>
              )}
              {actions.secondary && (
                <ButtonLink href={actions.secondary.href} variant="secondary" size="md">
                  {actions.secondary.label}
                </ButtonLink>
              )}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
