import type { Metadata } from "next";
import Container from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Changelog | PSIONHQ",
  description: "Release notes and updates for the PSIONHQ platform.",
};

const ENTRIES = [
  {
    version: "0.5.0",
    date: "2026",
    title: "Production Dashboard Platform",
    changes: [
      "Authenticated user dashboard with real user data",
      "Email/password and OAuth sign-in (Google, GitHub)",
      "Shared dashboard layout and routed workspace modules",
    ],
  },
  {
    version: "0.4.0",
    date: "2026",
    title: "Authentication Foundation",
    changes: [
      "Platform foundation architecture (config, types, services)",
      "Sign in and sign up forms",
      "Service-layer abstractions for auth and contact",
    ],
  },
  {
    version: "0.1.0",
    date: "2026",
    title: "Public Website Launch",
    changes: [
      "Marketing site with 10-section home page",
      "Product, platform, pricing, developers, and company pages",
      "Design system, SEO metadata, sitemap, and 404 page",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="bg-black text-white">
      <Container>
        <div className="py-20 sm:py-24 lg:py-32 max-w-3xl mx-auto">
          <p className="text-sm font-medium text-[#0066FF] mb-4">Updates</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12">
            Changelog
          </h1>

          <div className="space-y-16">
            {ENTRIES.map((entry) => (
              <div key={entry.version}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-sm font-mono text-[#0066FF]">
                    v{entry.version}
                  </span>
                  <span className="text-sm text-foreground/40">
                    {entry.date}
                  </span>
                </div>
                <h2 className="text-xl font-semibold mb-4">{entry.title}</h2>
                <ul className="space-y-2">
                  {entry.changes.map((change) => (
                    <li
                      key={change}
                      className="flex gap-3 text-foreground/70 leading-relaxed"
                    >
                      <span className="text-[#0066FF] mt-1.5">&bull;</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
