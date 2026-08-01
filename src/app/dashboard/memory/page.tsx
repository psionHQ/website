import type { Metadata } from "next";
import StatsCard from "@/components/dashboard/StatsCard";
import EmptyState from "@/components/dashboard/EmptyState";
import PageContainer from "@/components/dashboard/PageContainer";

export const metadata: Metadata = {
  title: "Memory",
  description: "Sovereign memory — persistent, private, and always in your control.",
};

const STATS = [
  { label: "Total Entries", value: "143", trend: "+5 this week", trendUp: true },
  { label: "Active Sessions", value: "2" },
  { label: "Storage Used", value: "14.2 MB" },
  { label: "Sync Status", value: "Up to date", trend: "Last synced 2 min ago", trendUp: true },
];

interface MemoryEntry {
  id: string;
  content: string;
  tags: string[];
  createdAt: string;
}

const MEMORY_ENTRIES: MemoryEntry[] = [
  {
    id: "m1",
    content: "User prefers concise responses under 3 sentences for technical questions.",
    tags: ["preference", "communication"],
    createdAt: "2 hours ago",
  },
  {
    id: "m2",
    content: "Project: PSIONHQ — building a sovereign AI and data platform. Next milestone: Phase 5 dashboard.",
    tags: ["project", "context"],
    createdAt: "1 day ago",
  },
  {
    id: "m3",
    content: "Tech stack: Next.js 16, Clerk, Tailwind v4, Framer Motion, TypeScript strict mode.",
    tags: ["technical", "stack"],
    createdAt: "2 days ago",
  },
];

export default function MemoryPage() {
  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Memory entries</h2>
          <span className="text-xs text-foreground/40">{MEMORY_ENTRIES.length} entries</span>
        </div>

        {MEMORY_ENTRIES.length === 0 ? (
          <EmptyState
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            }
            title="No memories yet"
            description="Your sovereign memory store is empty. Start an AI session to automatically capture context."
          />
        ) : (
          <div className="flex flex-col gap-3">
            {MEMORY_ENTRIES.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.04]"
              >
                <p className="text-sm leading-relaxed text-foreground/80">{entry.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-2.5 py-0.5 text-xs text-foreground/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="shrink-0 text-xs text-foreground/40">{entry.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
