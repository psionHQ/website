import type { Metadata } from "next";
import Card from "@/components/cards/Card";
import DashboardSection from "@/components/dashboard/DashboardSection";
import EmptyState from "@/components/dashboard/EmptyState";
import PageContainer from "@/components/dashboard/PageContainer";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";
import { getMemoryData } from "@/services/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.memory;

export default function MemoryPage() {
  const data = getMemoryData();

  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardSection
          title="Personal memory"
          description="Structured memory collections are ready for a future engine without changing the route shell."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {data.collections.map((collection) => (
              <Card key={collection.title} className="flex flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-foreground/85">
                    {collection.title}
                  </h3>
                  <StatusBadge tone="brand">{collection.count}</StatusBadge>
                </div>
                <p className="text-sm leading-relaxed text-foreground/55">
                  {collection.description}
                </p>
              </Card>
            ))}
          </div>
        </DashboardSection>

        <DashboardSection
          title="Search"
          description="Search architecture is present now so indexing can attach later without a redesign."
        >
          <Card className="flex flex-col gap-4 p-5" hover={false}>
            <label className="space-y-2 text-sm font-medium text-foreground/75">
              <span>Search saved knowledge</span>
              <input
                type="search"
                placeholder="Search memories, collections, and saved knowledge"
                className="w-full rounded-2xl border border-foreground/15 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground/25 focus:bg-foreground/[0.06]"
              />
            </label>
            <EmptyState
              title="No search results yet"
              description="Query results will appear here once the memory engine and indexing backend are enabled."
            />
          </Card>
        </DashboardSection>
      </section>

      <DashboardSection
        title="Timeline"
        description="Timeline entries preview how memory capture, indexing, and retrieval will appear in production."
      >
        <div className="space-y-3">
          {data.timeline.map((entry) => (
            <Card key={entry.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground/85">{entry.title}</h3>
                <p className="text-sm text-foreground/50">{entry.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge tone={entry.tone}>{entry.status}</StatusBadge>
                <span className="text-xs text-foreground/45">{entry.timestamp}</span>
              </div>
            </Card>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection
        title="Saved knowledge"
        description="Collections, notes, and future retrieval summaries can coexist inside the same shared content container."
      >
        <Card className="p-6" elevated>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/35">Collections</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">4</p>
              <p className="mt-1 text-sm text-foreground/50">Curated groups for long-term context.</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/35">Knowledge entries</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">18</p>
              <p className="mt-1 text-sm text-foreground/50">Reusable notes and verified findings.</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/35">Retrieval readiness</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight">Mock</p>
              <p className="mt-1 text-sm text-foreground/50">Prepared for future indexing and ranking services.</p>
            </div>
          </div>
        </Card>
      </DashboardSection>
    </PageContainer>
  );
}
