"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

const CTA_CONTENT = {
  eyebrow: "Get started today",
  heading: "Build on the intelligence stack",
  subtext:
    "Join the developers and teams shipping with PSION. Secure AI, sovereign identity, encrypted vaults, and digital wallets — production-ready from day one.",
  primaryAction: { label: "Start building", href: "/signup" },
  secondaryAction: { label: "Talk to us", href: "/contact" },
};

export default function CTASection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-8 py-16 sm:px-12 lg:py-24"
        >
          {/* Background glows */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/4 rounded-full bg-foreground/[0.06] blur-[80px]" />
            <div className="absolute bottom-0 right-0 h-56 w-56 translate-x-1/4 translate-y-1/4 rounded-full bg-foreground/[0.04] blur-[60px]" />
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50"
            >
              {CTA_CONTENT.eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {CTA_CONTENT.heading}
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-lg text-base text-foreground/60">
              {CTA_CONTENT.subtext}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={CTA_CONTENT.primaryAction.href}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                {CTA_CONTENT.primaryAction.label}
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
              </Link>
              <Link
                href={CTA_CONTENT.secondaryAction.href}
                className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 px-7 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/[0.04]"
              >
                {CTA_CONTENT.secondaryAction.label}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
