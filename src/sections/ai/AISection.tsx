"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { fadeUp, slideFromRight, staggerContainer } from "@/lib/motion";

const AI_CAPABILITIES = [
  {
    title: "Private inference",
    description:
      "Run language model inference inside encrypted enclaves. Prompts, completions, and embeddings are never exposed in plaintext outside your boundary.",
  },
  {
    title: "Verifiable outputs",
    description:
      "Every AI response is cryptographically signed and auditable. Know exactly which model version produced a result and under what conditions.",
  },
  {
    title: "Contextual memory",
    description:
      "Give your AI persistent, permission-gated memory that respects user consent. No silent data retention — users stay in control.",
  },
  {
    title: "Multi-model orchestration",
    description:
      "Route tasks intelligently across specialised models while maintaining a single encrypted context thread.",
  },
];

const PIPELINE_STEPS = [
  { label: "Encrypted prompt", tag: "AES-256-GCM" },
  { label: "Secure Enclave", tag: "TEE verified" },
  { label: "Signed response", tag: "Ed25519" },
];

export default function AISection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <motion.p
                variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066FF]"
              >
                PSION AI
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                AI that works for you, privately
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-foreground/60">
                PSION AI is built on a foundation of confidential computing. Every inference,
                every context, every interaction — encrypted end to end and provably private.
              </motion.p>
            </div>
            <motion.ul
              variants={staggerContainer}
              className="flex flex-col gap-6"
              role="list"
            >
              {AI_CAPABILITIES.map((item) => (
                <motion.li key={item.title} variants={fadeUp} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-foreground/[0.03]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={10}
                      height={10}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="text-sm leading-relaxed text-foreground/60">
                      {item.description}
                    </span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={slideFromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            aria-hidden="true"
            className="relative flex items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 lg:p-10"
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.06] blur-[60px]" />
            </div>

            <div className="relative flex w-full max-w-xs flex-col gap-3">
              {PIPELINE_STEPS.map((step, i) => (
                <div key={step.label} className="flex flex-col items-center gap-3">
                  <div className="w-full rounded-xl border border-foreground/10 bg-background p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium text-foreground/70">{step.label}</p>
                      <span className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-2 py-0.5 text-[10px] font-mono text-foreground/40">
                        {step.tag}
                      </span>
                    </div>
                    {i === 0 && (
                      <div className="mt-2.5 flex gap-1">
                        {[40, 28, 52, 36, 44, 32].map((w, j) => (
                          <span
                            key={j}
                            className="h-1.5 rounded-full bg-foreground/20"
                            style={{ width: `${w}px` }}
                          />
                        ))}
                      </div>
                    )}
                    {i === 1 && (
                      <div className="mt-2.5 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                        <span className="text-[10px] font-mono text-foreground/40">
                          Intel TDX · ARM CCA
                        </span>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="mt-2.5 flex gap-1">
                        {[52, 36, 44, 28, 40].map((w, j) => (
                          <span
                            key={j}
                            className="h-1.5 rounded-full bg-foreground/20"
                            style={{ width: `${w}px` }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-foreground/20"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
