"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { fadeUp, slideFromRight, staggerContainer } from "@/lib/motion";

const WALLET_FEATURES = [
  {
    label: "Non-custodial by default",
    detail:
      "Your private keys never touch our servers. You hold the keys — PSIONHQ provides the interface.",
  },
  {
    label: "Unified asset management",
    detail:
      "Manage digital tokens, verifiable credentials, and access passes from one wallet interface.",
  },
  {
    label: "Programmable permissions",
    detail:
      "Set spend limits, time-bound access, and delegated signing — all enforced cryptographically.",
  },
  {
    label: "Seamless integrations",
    detail:
      "Connect your wallet to PSIONHQ Vault, AI agents, and third-party services with a single authorisation flow.",
  },
];

const WALLET_ASSET_TYPES = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
    label: "Access Keys",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    label: "Credentials",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: "Digital Tokens",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Identity Proofs",
  },
];

const RECENT_ACTIVITY = [
  { action: "Credential issued", time: "Just now" },
  { action: "Access key rotated", time: "2m ago" },
  { action: "Identity proof shared", time: "1h ago" },
];

export default function WalletSection() {
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
                PSIONHQ Wallet
              </motion.p>
              <motion.h2
                variants={fadeUp}
                className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Digital assets, fully in your control
              </motion.h2>
              <motion.p variants={fadeUp} className="text-base text-foreground/60">
                A self-sovereign wallet built for the modern identity stack. Hold credentials,
                digital tokens, and access rights — and share them on your own terms.
              </motion.p>
            </div>
            <motion.ul
              variants={staggerContainer}
              className="flex flex-col gap-5"
              role="list"
            >
              {WALLET_FEATURES.map(({ label, detail }) => (
                <motion.li key={label} variants={fadeUp} className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{label}</span>
                  <span className="text-sm leading-relaxed text-foreground/60">{detail}</span>
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
            className="relative rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 flex flex-col gap-5"
          >
            {/* Wallet header */}
            <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
              <span className="text-sm font-semibold">My Wallet</span>
              <span className="inline-flex rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-foreground/50 uppercase">
                Self-custodied
              </span>
            </div>

            {/* Asset type grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {WALLET_ASSET_TYPES.map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-foreground/10 bg-background p-3 transition-colors hover:border-foreground/20"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/[0.04] text-foreground/60">
                    {icon}
                  </span>
                  <span className="text-xs font-medium text-foreground/70">{label}</span>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="rounded-xl border border-foreground/10 bg-background p-4 flex flex-col gap-3">
              <p className="text-xs font-medium text-foreground/50">Recent activity</p>
              {RECENT_ACTIVITY.map(({ action, time }) => (
                <div key={action} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
                    <span className="text-xs text-foreground/70">{action}</span>
                  </div>
                  <span className="text-[10px] text-foreground/35">{time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
