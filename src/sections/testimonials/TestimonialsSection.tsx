"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { fadeUp, scaleIn, staggerContainer } from "@/lib/motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  domain: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "PSIONHQ's private inference pipeline transformed how we handle sensitive patient data. We run complex AI workflows without ever exposing plaintext to any third party — including PSIONHQ itself. Our HIPAA audit was the smoothest in years.",
    name: "Dr. Maya Chen",
    role: "Chief Technology Officer",
    company: "Veritas Health",
    domain: "Healthcare AI",
  },
  {
    quote:
      "We replaced our entire identity stack with PSIONHQ ID. Our customers get portable, privacy-preserving credentials, and we eliminated three separate auth providers in the process. The developer experience is exceptional — integration took less than a week.",
    name: "James Rodriguez",
    role: "Principal Engineer",
    company: "Strata Capital",
    domain: "FinTech",
  },
  {
    quote:
      "PSIONHQ Vault gave us the confidence to move privileged client communications to the cloud for the first time. The zero-knowledge architecture means even a full compromise of PSIONHQ's infrastructure couldn't expose our files.",
    name: "Elise Fontaine",
    role: "Chief Information Security Officer",
    company: "Meridian Legal",
    domain: "Legal & Compliance",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("");
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066FF]"
            >
              Customer stories
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Trusted by teams building on sovereign infrastructure
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                variants={scaleIn}
                className="flex flex-col gap-6 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-7"
              >
                {/* Quote mark */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={28}
                  height={28}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="shrink-0 text-[#0066FF]/40"
                >
                  <path
                    d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                    fill="currentColor"
                  />
                  <path
                    d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                    fill="currentColor"
                  />
                </svg>

                <p className="flex-1 text-sm leading-relaxed text-foreground/70">{t.quote}</p>

                <div className="flex items-center gap-3 border-t border-foreground/10 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.06] text-xs font-semibold">
                    {initials(t.name)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{t.name}</span>
                    <span className="text-xs text-foreground/50">
                      {t.role} · {t.company}
                    </span>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full border border-foreground/10 bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-medium text-foreground/40">
                    {t.domain}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
