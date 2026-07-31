import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import NetworkVisual from "@/components/illustrations/NetworkVisual";
import FooterSection from "@/sections/footer/FooterSection";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "PSIONHQ is built as a layered platform — from encrypted compute at the bottom to developer APIs at the top.",
};

interface Layer {
  number: string;
  name: string;
  description: string;
  tags: string[];
  anchor?: string;
}

const LAYERS: Layer[] = [
  {
    number: "01",
    name: "Encrypted Compute",
    description:
      "Trusted execution environments, secure enclaves, and hardware attestation form the foundation. Every workload runs isolated and verifiable, so no operator — including us — can inspect your data in transit or at rest.",
    tags: ["Intel TDX", "AMD SEV-SNP", "ARM CCA", "Remote Attestation"],
    anchor: "ai",
  },
  {
    number: "02",
    name: "Sovereign Storage",
    description:
      "Zero-knowledge vaults and hardware-backed key management sit above compute. Documents, secrets, and model weights are encrypted client-side before they ever leave your device.",
    tags: ["AES-256-GCM", "FIPS 140-3 HSM", "Client-side encryption", "Immutable audit log"],
    anchor: "vault",
  },
  {
    number: "03",
    name: "Identity & Credentials",
    description:
      "Decentralised identifiers and verifiable credentials give every user and service a portable, privacy-preserving identity layer with selective disclosure and no central authority.",
    tags: ["W3C DID Core 1.0", "W3C VC 2.0", "Selective disclosure", "Zero-knowledge proofs"],
    anchor: "identity",
  },
  {
    number: "04",
    name: "Digital Assets & Wallet",
    description:
      "A non-custodial wallet layer lets users hold, transfer, and manage digital assets and credentials from one interface — with programmable permissions enforced cryptographically.",
    tags: ["Non-custodial", "Multi-chain", "Programmable signing", "Hardware key binding"],
    anchor: "wallet",
  },
  {
    number: "05",
    name: "Developer APIs",
    description:
      "REST endpoints, typed SDKs, event streams, and webhooks expose the entire stack to your applications — so you can build on sovereign infrastructure without managing any of it directly.",
    tags: ["REST + gRPC", "TypeScript · Python · Go · Rust", "Webhooks", "OpenAPI spec"],
  },
];

interface Stat {
  value: string;
  label: string;
  detail: string;
}

const STATS: Stat[] = [
  { value: "100%", label: "Zero-knowledge by default", detail: "No plaintext ever stored server-side" },
  { value: "<10ms", label: "Credential verification", detail: "p95 latency on global PoPs" },
  { value: "AES-256", label: "Encryption standard", detail: "GCM mode, client-side keying" },
  { value: "SOC 2", label: "Compliance ready", detail: "Type II report available on request" },
  { value: "99.99%", label: "Availability SLA", detail: "Across all production regions" },
  { value: "FIPS", label: "140-3 Level 3 HSM", detail: "Hardware key management" },
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

      {/* Architecture overview */}
      <section className="pb-8 sm:pb-12">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Illustration */}
            <div
              aria-hidden="true"
              className="relative flex items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/[0.07] blur-[60px]" />
              </div>
              <NetworkVisual />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066FF]">
                Architecture overview
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Five layers, one coherent platform
              </h2>
              <p className="text-base leading-relaxed text-foreground/60">
                Every PSION product maps to a discrete layer of the stack. They can be used
                independently, but the real power emerges when you compose them — AI inference
                that reads from the vault, credentials that gate wallet access, all surfaced
                through a unified API.
              </p>
              <ul className="flex flex-col gap-3" role="list">
                {["Encrypted compute foundation", "Zero-knowledge storage above it", "Portable identity layer", "Self-custodied digital assets", "Unified developer API surface"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground/70">
                    <span
                      aria-hidden="true"
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-foreground/[0.03]"
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
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Layer breakdown */}
      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Stack layers
              </p>
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                What each layer does
              </h2>
            </div>
            <div className="flex flex-col divide-y divide-foreground/10 rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
              {LAYERS.map((layer) => (
                <div
                  key={layer.number}
                  id={layer.anchor}
                  className="flex flex-col gap-5 p-8 sm:flex-row sm:items-start sm:gap-8 lg:p-10"
                >
                  <span className="font-mono text-sm text-foreground/30 sm:w-8 sm:shrink-0">
                    {layer.number}
                  </span>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold tracking-tight">{layer.name}</h3>
                    <p className="max-w-2xl text-sm leading-relaxed text-foreground/60">
                      {layer.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {layer.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-2.5 py-1 font-mono text-[10px] text-foreground/45"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-20 sm:py-24 lg:py-32 border-t border-foreground/10">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Key properties
              </p>
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Engineered for trust from the ground up
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 text-center"
                >
                  <span className="text-4xl font-semibold tracking-tight">{stat.value}</span>
                  <span className="text-sm font-medium text-foreground/80">{stat.label}</span>
                  <span className="text-xs text-foreground/45">{stat.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-8 py-14 text-center sm:px-12 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 translate-y-1/4 rounded-full bg-[#0066FF]/[0.08] blur-[80px]" />
            </div>
            <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start building on the platform
              </h2>
              <p className="text-base text-foreground/60">
                Free tier available. No credit card required. Production-ready in minutes.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0066FF] px-7 text-sm font-medium text-white transition-colors hover:bg-[#0040CC]"
                >
                  Get started free
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
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-7 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/[0.06]"
                >
                  Talk to an engineer
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FooterSection />
    </>
  );
}
