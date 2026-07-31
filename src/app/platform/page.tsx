import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import FooterSection from "@/sections/footer/FooterSection";

export const metadata: Metadata = {
  title: "Platform | PSIONHQ",
  description:
    "PSIONHQ is built as a layered platform — from encrypted compute at the bottom to developer APIs at the top.",
};

interface Layer {
  number: string;
  name: string;
  description: string;
  anchor?: string;
}

const LAYERS: Layer[] = [
  {
    number: "01",
    name: "Encrypted Compute",
    description:
      "Trusted execution environments, secure enclaves, and hardware attestation form the foundation. Every workload runs isolated and verifiable, so no operator — including us — can inspect your data in transit or at rest.",
    anchor: "ai",
  },
  {
    number: "02",
    name: "Sovereign Storage",
    description:
      "Zero-knowledge vaults and hardware-backed key management sit above compute. Documents, secrets, and model weights are encrypted client-side before they ever leave your device.",
    anchor: "vault",
  },
  {
    number: "03",
    name: "Identity & Credentials",
    description:
      "Decentralised identifiers and verifiable credentials give every user and service a portable, privacy-preserving identity layer with selective disclosure and no central authority.",
    anchor: "identity",
  },
  {
    number: "04",
    name: "Developer APIs",
    description:
      "REST endpoints, typed SDKs, event streams, and webhooks expose the entire stack to your applications — so you can build on sovereign infrastructure without managing any of it directly.",
  },
];

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "100%", label: "Zero-knowledge by default" },
  { value: "<10ms", label: "Credential verification latency" },
  { value: "SOC 2", label: "Compliance ready" },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="A unified intelligence stack"
        subtitle="PSIONHQ is built as a layered platform — from encrypted compute at the bottom to developer APIs at the top."
        actions={{
          primary: { label: "Start building", href: "/signup" },
          secondary: { label: "Read the docs", href: "/developers" },
        }}
      />

      <section className="py-8 sm:py-12">
        <Container>
          <div className="flex flex-col divide-y divide-foreground/10 rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
            {LAYERS.map((layer) => (
              <div
                key={layer.number}
                id={layer.anchor}
                className="flex flex-col gap-4 p-8 sm:flex-row sm:items-start sm:gap-8 lg:p-10"
              >
                <span className="font-mono text-sm text-foreground/30">{layer.number}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold tracking-tight">{layer.name}</h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-foreground/60">
                    {layer.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="wallet" className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-4 pb-12 text-center">
            <p className="mx-auto text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Key properties
            </p>
            <h2 className="mx-auto max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Engineered for trust from the ground up
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 text-center"
              >
                <span className="text-4xl font-semibold tracking-tight">{stat.value}</span>
                <span className="text-sm text-foreground/60">{stat.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-8 py-14 text-center sm:px-12 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/4 rounded-full bg-foreground/[0.06] blur-[80px]" />
            </div>
            <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start building on the platform
              </h2>
              <Link
                href="/signup"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Get started
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
            </div>
          </div>
        </Container>
      </section>

      <FooterSection />
    </>
  );
}
