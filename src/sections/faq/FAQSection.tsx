"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What makes PSION different from standard cloud AI providers?",
    answer:
      "Standard cloud providers run your AI workloads on shared infrastructure with full visibility into your prompts and outputs. PSION runs inference inside Trusted Execution Environments — hardware-isolated enclaves that are mathematically unreadable, even to our own operators. Your data never exists in plaintext outside your control boundary.",
  },
  {
    question: "Does PSION ever have access to my data or model outputs?",
    answer:
      "No. PSION is architected so that we structurally cannot access your data. Vault contents are encrypted client-side before transmission. AI prompts are decrypted only inside the hardware enclave and never written to disk. Even in the event of a full server compromise, your plaintext remains inaccessible.",
  },
  {
    question: "What is a Trusted Execution Environment (TEE)?",
    answer:
      "A TEE is a hardware-isolated region of a processor that executes code in an environment where neither the operating system, the hypervisor, nor the cloud operator can inspect or tamper with the workload. PSION uses Intel TDX, AMD SEV-SNP, and ARM CCA to provide hardware attestation — cryptographic proof that your code is running unmodified on genuine secure hardware.",
  },
  {
    question: "Is PSION compliant with GDPR, HIPAA, and SOC 2?",
    answer:
      "PSION is designed to support compliance with GDPR, HIPAA, and SOC 2 Type II requirements. Our zero-knowledge architecture means we hold no personal data in recoverable form. We provide data processing agreements, audit logging, and dedicated infrastructure options for regulated industries. Enterprise customers receive a full compliance documentation pack.",
  },
  {
    question: "How quickly can I integrate PSION into an existing application?",
    answer:
      "Most developers make their first API call within minutes using our quickstart guide. Full production integrations typically take one to three days depending on the surface area. We provide type-safe SDKs for TypeScript, Python, Go, and Rust, along with migration guides for common identity and storage providers.",
  },
  {
    question: "Can I deploy PSION in my own cloud account or on-premises?",
    answer:
      "Yes. Enterprise plans support deployment into your own AWS, GCP, or Azure account using our Helm chart or Terraform modules. On-premises deployment is available for air-gapped environments. In both cases you retain full control of the encryption keys and the infrastructure, and PSION never has network access to your deployment.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          {/* Left: heading */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066FF]"
            >
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Common questions answered
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-foreground/60">
              Can&apos;t find what you need?{" "}
              <a
                href="/contact"
                className="text-foreground underline-offset-4 hover:underline"
              >
                Ask us directly
              </a>
              .
            </motion.p>
          </motion.div>

          {/* Right: accordion */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col divide-y divide-foreground/10 rounded-2xl border border-foreground/10"
          >
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div key={item.question} variants={fadeUp}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 p-6 text-left"
                  >
                    <span className="text-sm font-semibold leading-snug">{item.question}</span>
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
                      aria-hidden="true"
                      className={`mt-0.5 shrink-0 text-foreground/40 transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6">
                      <p className="max-w-2xl text-sm leading-relaxed text-foreground/60">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
