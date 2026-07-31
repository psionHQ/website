import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import FooterSection from "@/sections/footer/FooterSection";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Type-safe SDKs, REST APIs, and real-time streams. Integrate sovereign AI, identity, and secure storage into any stack.",
};

interface QuickstartStep {
  step: string;
  title: string;
  code: React.ReactNode;
}

const QUICKSTART_STEPS: QuickstartStep[] = [
  {
    step: "01",
    title: "Install the SDK",
    code: (
      <>
        <span className="text-foreground/40">$</span>{" "}
        <span className="text-foreground/90">npm install</span>{" "}
        <span className="text-foreground/70">@psion/sdk</span>
      </>
    ),
  },
  {
    step: "02",
    title: "Initialize the client",
    code: (
      <>
        <span className="text-purple-300/80">import</span>{" "}
        <span className="text-foreground/90">{"{ Psion }"}</span>{" "}
        <span className="text-purple-300/80">from</span>{" "}
        <span className="text-amber-200/80">&quot;@psion/sdk&quot;</span>
        {"\n\n"}
        <span className="text-purple-300/80">const</span>{" "}
        <span className="text-foreground/90">psion</span> ={" "}
        <span className="text-purple-300/80">new</span>{" "}
        <span className="text-sky-300/80">Psion</span>
        {"({"}
        {"\n  "}
        <span className="text-foreground/70">apiKey</span>:{" "}
        <span className="text-amber-200/80">process.env.PSION_API_KEY</span>,
        {"\n"}
        {"})"}
      </>
    ),
  },
  {
    step: "03",
    title: "Make your first call",
    code: (
      <>
        <span className="text-purple-300/80">const</span>{" "}
        <span className="text-foreground/90">response</span> ={" "}
        <span className="text-purple-300/80">await</span>{" "}
        <span className="text-foreground/90">psion</span>.
        <span className="text-sky-300/80">ai</span>.
        <span className="text-sky-300/80">infer</span>
        {"({"}
        {"\n  "}
        <span className="text-foreground/70">prompt</span>:{" "}
        <span className="text-amber-200/80">&quot;Summarise this document&quot;</span>,
        {"\n  "}
        <span className="text-foreground/70">model</span>:{" "}
        <span className="text-amber-200/80">&quot;psion-secure-v1&quot;</span>,
        {"\n"}
        {"})"}
      </>
    ),
  },
];

interface Sdk {
  name: string;
  install: string;
  href: string;
  icon: React.ReactNode;
}

const SDKS: Sdk[] = [
  {
    name: "TypeScript / JS",
    install: "npm install @psion/sdk",
    href: "https://github.com/psionhq/sdk-js",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    name: "Python",
    install: "pip install psion-sdk",
    href: "https://github.com/psionhq/sdk-python",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
      </svg>
    ),
  },
  {
    name: "Go",
    install: "go get github.com/psionhq/sdk-go",
    href: "https://github.com/psionhq/sdk-go",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Rust",
    install: "cargo add psion-sdk",
    href: "https://github.com/psionhq/sdk-rust",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

interface Resource {
  label: string;
  description: string;
  href: string;
}

const RESOURCES: Resource[] = [
  { label: "API Reference", description: "Full REST endpoint documentation", href: "/developers#api" },
  { label: "Changelog", description: "Latest releases and platform updates", href: "/changelog" },
  { label: "Status Page", description: "Live uptime and incident history", href: "/status" },
  { label: "Discord", description: "Chat with the community and team", href: "https://discord.gg/psionhq" },
  { label: "GitHub", description: "Open-source SDKs and examples", href: "https://github.com/psionhq" },
  { label: "Examples", description: "Sample apps built on PSION", href: "/developers#examples" },
];

function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-foreground/10 bg-foreground/[0.03] p-5 font-mono text-[13px] leading-relaxed whitespace-pre-wrap">
      <code>{children}</code>
    </pre>
  );
}

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow="Developers"
        title="Build with PSION"
        subtitle="Type-safe SDKs, REST APIs, and real-time streams. Integrate sovereign AI, identity, and secure storage into any stack."
        actions={{
          primary: { label: "Read the docs", href: "/developers#api" },
          secondary: { label: "View on GitHub", href: "https://github.com/psionhq" },
        }}
      />

      <section id="api" className="py-8 sm:py-12">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Quickstart
              </p>
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                From zero to first response in minutes
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {QUICKSTART_STEPS.map((item) => (
                <div key={item.step} className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-foreground/30">{item.step}</span>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                  </div>
                  <CodeBlock>{item.code}</CodeBlock>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="sdks" className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-8">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Official SDKs
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {SDKS.map((sdk) => (
                <Link
                  key={sdk.name}
                  href={sdk.href}
                  className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.04]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.04] text-foreground transition-colors group-hover:border-foreground/20">
                    {sdk.icon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">{sdk.name}</h3>
                    <code className="text-xs text-foreground/50 break-all">{sdk.install}</code>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="examples" className="pb-20 sm:pb-24 lg:pb-32">
        <Container>
          <div className="flex flex-col gap-8">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Resources
            </h2>
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {RESOURCES.map((resource) => (
                <Link
                  key={resource.label}
                  href={resource.href}
                  className="flex items-center justify-between gap-4 border-b border-foreground/10 py-4 transition-colors hover:border-foreground/20"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{resource.label}</span>
                    <span className="text-xs text-foreground/50">{resource.description}</span>
                  </div>
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
                    className="shrink-0 text-foreground/30"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FooterSection />
    </>
  );
}
