"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { fadeUp, slideFromLeft, staggerContainer } from "@/lib/motion";

const VAULT_FEATURES = [
  {
    label: "Zero-knowledge encryption",
    detail:
      "Data is encrypted client-side before it ever reaches our infrastructure. We cannot read what you store.",
  },
  {
    label: "Hardware-backed keys",
    detail:
      "Encryption keys are generated and stored in tamper-resistant hardware security modules.",
  },
  {
    label: "Granular access control",
    detail:
      "Define read, write, and share permissions down to the individual file or record level.",
  },
  {
    label: "Immutable audit trail",
    detail:
      "Every access and mutation is logged to an append-only audit log you can verify independently.",
  },
];

const VAULT_STATS = [
  { value: "AES-256", label: "Encryption standard" },
  { value: "HSM", label: "Key storage" },
  { value: "99.99%", label: "Availability SLA" },
];

const VAULT_FILES = [
  { name: "identity.json", size: "4.2 KB" },
  { name: "credentials.enc", size: "12.8 KB" },
  { name: "private-key.pem", size: "1.7 KB" },
  { name: "audit-log.bin", size: "38.4 KB" },
];

export default function VaultSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
          <motion.div
            variants={slideFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            aria-hidden="true"
            className="order-last lg:order-first relative rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 flex flex-col gap-5"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-foreground/10 pb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/15 bg-foreground/[0.04]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <span className="text-sm font-semibold">PSION Vault</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
                <span className="text-xs text-foreground/40">Connected</span>
              </div>
            </div>

            {/* File list */}
            <div className="flex flex-col gap-2">
              {VAULT_FILES.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-3 rounded-lg border border-foreground/[0.07] bg-background px-3 py-2.5 transition-colors hover:border-foreground/15"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={13}
                    height={13}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-foreground/40"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span className="flex-1 text-xs font-mono text-foreground/60">{file.name}</span>
                  <span className="text-[10px] text-foreground/30">{file.size}</span>
                  <span className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-foreground/30 uppercase">
                    enc
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 border-t border-foreground/10 pt-4">
              {VAULT_STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col gap-0.5 text-center">
                  <span className="text-sm font-semibold">{value}</span>
                  <span className="text-[10px] text-foreground/50">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

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
                PSION Vault
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Your data, secured by design
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-foreground/60">
                PSION Vault is a zero-knowledge data store for the things that matter most —
                credentials, keys, documents, and private records. Built to be unbreakable.
              </motion.p>
            </div>
            <motion.ul
              variants={staggerContainer}
              className="flex flex-col gap-5"
              role="list"
            >
              {VAULT_FEATURES.map(({ label, detail }) => (
                <motion.li key={label} variants={fadeUp} className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-sm leading-relaxed text-foreground/60">{detail}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
