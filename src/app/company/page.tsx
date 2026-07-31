import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import FooterSection from "@/sections/footer/FooterSection";

export const metadata: Metadata = {
  title: "Company",
  description:
    "We believe privacy, control, and autonomy are not features — they are fundamental rights.",
};

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const VALUES: Value[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Privacy First",
    description:
      "Every decision starts with the question: does this protect our users' data? We design systems that make surveillance structurally impossible, not just discouraged.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Open by Default",
    description:
      "Our protocols, cryptography, and core SDKs are open source and auditable. Trust should come from verification, not marketing claims.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Built to Last",
    description:
      "We design for decades, not funding cycles. Sovereign infrastructure only matters if it outlives any single company — including us.",
  },
];

interface TeamMember {
  name: string;
  role: string;
}

const TEAM: TeamMember[] = [
  { name: "Amara Osei", role: "Co-founder & CEO" },
  { name: "Daniel Kwan", role: "Co-founder & CTO" },
  { name: "Priya Nair", role: "Head of Engineering" },
  { name: "Marcus Alden", role: "Head of Security" },
  { name: "Sofia Rentería", role: "Head of Product" },
  { name: "Theo Bergström", role: "Head of Partnerships" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

const MILESTONES: Milestone[] = [
  {
    year: "2022",
    title: "Founded",
    description:
      "PSIONHQ was founded on the belief that sovereign infrastructure should be a right, not a luxury.",
  },
  {
    year: "2023",
    title: "Alpha",
    description:
      "First private alpha of PSION Vault and PSION ID shipped to a small group of design partners.",
  },
  {
    year: "2024",
    title: "Beta",
    description:
      "Public beta launched across all four products, with the developer platform opening to early adopters.",
  },
  {
    year: "2025",
    title: "General Availability",
    description:
      "PSIONHQ reached general availability with enterprise-grade SLAs, SOC 2 readiness, and global infrastructure.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Building the infrastructure for sovereign intelligence"
        subtitle="We believe privacy, control, and autonomy are not features — they are fundamental rights."
      />

      <section className="py-8 sm:py-12">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-balance text-2xl font-medium leading-relaxed tracking-tight text-foreground/80 sm:text-3xl">
              &ldquo;Every person and organisation deserves infrastructure they can verify, not
              just infrastructure they are asked to trust. That is the standard we hold
              ourselves to, every day.&rdquo;
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Values
              </p>
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                What we hold ourselves to
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.04] text-foreground">
                    {value.icon}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-sm font-semibold">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/60">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Team
              </p>
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                The people behind PSIONHQ
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.06] text-sm font-semibold">
                    {initials(member.name)}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{member.name}</span>
                    <span className="text-xs text-foreground/50">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24 lg:pb-32">
        <Container>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Our story
              </p>
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                From idea to infrastructure
              </h2>
            </div>
            <div className="flex flex-col">
              {MILESTONES.map((milestone, i) => (
                <div
                  key={milestone.year}
                  className="flex gap-6 border-l border-foreground/10 pb-10 pl-8 last:pb-0"
                  style={{ marginLeft: 0 }}
                >
                  <div className="relative -ml-[41px] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-background font-mono text-xs text-foreground/60">
                    {i + 1}
                  </div>
                  <div className="flex flex-col gap-1.5 pt-0.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-foreground/40">
                        {milestone.year}
                      </span>
                      <h3 className="text-sm font-semibold">{milestone.title}</h3>
                    </div>
                    <p className="max-w-xl text-sm leading-relaxed text-foreground/60">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FooterSection />
    </>
  );
}
