import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import FooterSection from "@/sections/footer/FooterSection";

export const metadata: Metadata = {
  title: "Product | PSIONHQ",
  description:
    "Four deeply integrated products that give individuals and teams total control over AI, identity, storage, and value.",
};

interface Product {
  id: string;
  icon: React.ReactNode;
  name: string;
  tagline: string;
  features: string[];
  href: string;
}

const PRODUCTS: Product[] = [
  {
    id: "ai",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    name: "PSION AI",
    tagline: "Secure inference and private model fine-tuning, verifiable end to end.",
    features: [
      "Secure inference inside encrypted enclaves",
      "Private fine-tuning on your own data, never shared",
      "Cryptographically verifiable model outputs",
    ],
    href: "/platform#ai",
  },
  {
    id: "id",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    name: "PSION ID",
    tagline: "Decentralised identity and portable credentials you fully control.",
    features: [
      "Decentralised identifiers issued to you, not a platform",
      "Portable credentials that work across any application",
      "Privacy-preserving authentication with selective disclosure",
    ],
    href: "/platform#identity",
  },
  {
    id: "vault",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    name: "PSION Vault",
    tagline: "Encrypted document storage protected by hardware-backed keys.",
    features: [
      "Encrypted document and file storage at rest and in transit",
      "Hardware-backed key management with secure enclaves",
      "Zero-knowledge access — only you can decrypt your data",
    ],
    href: "/platform#vault",
  },
  {
    id: "wallet",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={22}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
    name: "PSION Wallet",
    tagline: "Non-custodial assets and credentials, held entirely by you.",
    features: [
      "Non-custodial storage for digital assets",
      "Multi-chain support across major networks",
      "Unified credential management alongside your funds",
    ],
    href: "/platform#wallet",
  },
];

function ProductCard({ icon, name, tagline, features, href }: Product) {
  return (
    <div className="group flex flex-col gap-6 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.04]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.04] text-foreground transition-colors group-hover:border-foreground/20">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
        <p className="text-sm leading-relaxed text-foreground/60">{tagline}</p>
      </div>
      <ul className="flex flex-col gap-3" role="list">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
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
            <span className="text-sm leading-relaxed text-foreground/70">{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
      >
        Learn more
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
  );
}

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="Product Suite"
        title="Built for sovereign intelligence"
        subtitle="Four deeply integrated products that give individuals and teams total control over AI, identity, storage, and value."
        actions={{
          primary: { label: "Get started", href: "/signup" },
          secondary: { label: "View pricing", href: "/pricing" },
        }}
      />

      <section className="py-8 sm:py-12">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-8 py-14 sm:px-12 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/4 rounded-full bg-foreground/[0.06] blur-[80px]" />
            </div>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                One unified API surface
              </h2>
              <p className="max-w-lg text-base text-foreground/60">
                All products share one unified API surface. Build once, deploy everywhere —
                across AI, identity, storage, and wallets.
              </p>
              <Link
                href="/developers"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80"
              >
                Explore the developer docs
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
