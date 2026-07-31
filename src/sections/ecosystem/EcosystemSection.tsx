"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

interface Standard {
  tag: string;
  label: string;
  description: string;
}

interface CompatItem {
  category: string;
  items: string[];
}

const STANDARDS: Standard[] = [
  {
    tag: "TEE",
    label: "Trusted Execution Environments",
    description: "Intel TDX · ARM CCA · AMD SEV-SNP",
  },
  {
    tag: "HSM",
    label: "Hardware Security Modules",
    description: "FIPS 140-3 Level 3 key management",
  },
  {
    tag: "DID",
    label: "Decentralised Identifiers",
    description: "W3C DID Core 1.0 compliant",
  },
  {
    tag: "VC",
    label: "Verifiable Credentials",
    description: "W3C VC Data Model 2.0",
  },
  {
    tag: "TLS",
    label: "Transport Security",
    description: "TLS 1.3 · mTLS for all API calls",
  },
  {
    tag: "ZK",
    label: "Zero-Knowledge Proofs",
    description: "Selective disclosure without data exposure",
  },
];

const COMPAT: CompatItem[] = [
  {
    category: "Cloud",
    items: ["AWS", "Google Cloud", "Azure", "Cloudflare Workers"],
  },
  {
    category: "Container",
    items: ["Kubernetes", "Docker", "Helm charts available"],
  },
  {
    category: "Languages",
    items: ["TypeScript", "Python", "Go", "Rust"],
  },
  {
    category: "Protocols",
    items: ["REST", "gRPC", "WebSockets", "Webhooks"],
  },
];

export default function EcosystemSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-16">
          {/* Heading */}
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
              Ecosystem
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Built on open standards. Works with your stack.
            </motion.h2>
            <motion.p variants={fadeUp} className="max-w-xl text-base text-foreground/60">
              PSION implements the most rigorous cryptographic standards available and
              integrates into every major cloud, container, and language ecosystem.
            </motion.p>
          </motion.div>

          {/* Standards grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {STANDARDS.map((s) => (
              <motion.div
                key={s.tag}
                variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#0066FF]/20 bg-[#0066FF]/[0.07] font-mono text-xs font-bold text-[#0066FF]">
                  {s.tag}
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold">{s.label}</span>
                  <span className="text-xs leading-relaxed text-foreground/50">
                    {s.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Compatibility row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8"
          >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {COMPAT.map((group) => (
                <motion.div key={group.category} variants={fadeUp} className="flex flex-col gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/40">
                    {group.category}
                  </p>
                  <ul className="flex flex-col gap-2.5" role="list">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/20"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
