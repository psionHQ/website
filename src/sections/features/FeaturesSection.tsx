import Container from "@/components/layout/Container";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
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
    title: "Secure AI Infrastructure",
    description:
      "Run AI workloads with end-to-end encryption and verifiable compute. Your models and data never leave your control.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
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
    title: "Sovereign Identity",
    description:
      "Issue and verify decentralised identities across any platform. Portable, privacy-preserving credentials you own.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
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
    title: "Encrypted Vault",
    description:
      "Store sensitive documents, keys, and data in hardware-backed vaults. Zero-knowledge access ensures only you can read your secrets.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
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
    title: "Digital Wallet",
    description:
      "Hold, transfer, and manage digital assets and credentials from a single non-custodial wallet. Full control, no intermediaries.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Developer APIs",
    description:
      "Integrate PSION capabilities into any stack with type-safe SDKs, REST APIs, and real-time event streams.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
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
    title: "Privacy by Default",
    description:
      "Every PSION product is architected around a privacy-first principle. Collect only what is needed. Protect everything.",
  },
];

function FeatureCard({ icon, title, description }: Feature) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 text-foreground">
        {icon}
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-foreground/60">{description}</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Platform
            </p>
            <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to build with intelligence
            </h2>
            <p className="max-w-xl text-base text-foreground/60">
              PSION brings together AI, identity, secure storage, and digital assets into one
              unified platform designed for the next generation of applications.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
