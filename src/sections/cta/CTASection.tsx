import Link from "next/link";
import Container from "@/components/layout/Container";

const CTA_CONTENT = {
  eyebrow: "Get started",
  heading: "Build on the intelligence stack",
  subtext:
    "Join the developers and teams shipping with PSION. Secure AI, sovereign identity, encrypted vaults, and digital wallets — production-ready from day one.",
  primaryAction: { label: "Start building", href: "/get-started" },
  secondaryAction: { label: "Talk to us", href: "/contact" },
};

export default function CTASection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-8 py-16 text-center sm:px-12 lg:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute top-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-foreground/5 blur-3xl" />
          </div>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              {CTA_CONTENT.eyebrow}
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {CTA_CONTENT.heading}
            </h2>
            <p className="max-w-lg text-base text-foreground/60">
              {CTA_CONTENT.subtext}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={CTA_CONTENT.primaryAction.href}
                className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background"
              >
                {CTA_CONTENT.primaryAction.label}
              </Link>
              <Link
                href={CTA_CONTENT.secondaryAction.href}
                className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium text-foreground"
              >
                {CTA_CONTENT.secondaryAction.label}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
