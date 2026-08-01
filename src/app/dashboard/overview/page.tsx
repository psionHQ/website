import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/cards/Card";
import DashboardSection from "@/components/dashboard/DashboardSection";
import PageContainer from "@/components/dashboard/PageContainer";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";
import { getOverviewData } from "@/services/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.overview;

export default function DashboardOverviewPage() {
  const data = getOverviewData();

  return (
    <PageContainer>
      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="flex flex-col gap-6 p-6" elevated>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">
              {data.welcome.eyebrow}
            </p>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {data.welcome.title}
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/55">
                {data.welcome.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={data.welcome.primaryAction.href}
              className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
            >
              {data.welcome.primaryAction.label}
            </Link>
            <Link
              href={data.welcome.secondaryAction.href}
              className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium text-foreground/75 transition-colors hover:border-foreground/25 hover:text-foreground"
            >
              {data.welcome.secondaryAction.label}
            </Link>
          </div>
        </Card>

        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Platform status</h2>
              <p className="mt-1 text-sm text-foreground/50">
                Shared production architecture is ready for future modules.
              </p>
            </div>
            <StatusBadge tone="brand">Foundation</StatusBadge>
          </div>
          <div className="space-y-3">
            {data.platformStatus.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3"
              >
                <span className="text-sm text-foreground/65">{item.label}</span>
                <StatusBadge tone={item.tone}>{item.value}</StatusBadge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <DashboardSection
          title="Recent activity"
          description="Mock activity shows how future platform events will plug into the shared shell."
        >
          <Card className="overflow-hidden" hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-foreground/10 bg-foreground/[0.03]">
                    <th className="p-4 font-medium text-foreground/60">Event</th>
                    <th className="p-4 font-medium text-foreground/60">Module</th>
                    <th className="p-4 font-medium text-foreground/60">Status</th>
                    <th className="p-4 font-medium text-foreground/60">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.activity.map((item) => (
                    <tr key={item.id} className="border-b border-foreground/10 last:border-b-0">
                      <td className="p-4 text-foreground/80">{item.title}</td>
                      <td className="p-4 text-foreground/55">{item.category}</td>
                      <td className="p-4">
                        <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
                      </td>
                      <td className="p-4 text-foreground/45">{item.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </DashboardSection>

        <DashboardSection
          title="User summary"
          description="Authenticated user context and workspace information remain available across every dashboard route."
        >
          <Card className="p-6" hover={false}>
            <dl className="space-y-4">
              {data.userSummary.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-4 border-b border-foreground/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <dt className="text-sm text-foreground/50">{item.label}</dt>
                  <dd className="text-sm font-medium text-foreground/85">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </DashboardSection>
      </section>

      <DashboardSection
        title="Quick actions"
        description="Each action links into a module already mounted inside the permanent dashboard architecture."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {data.quickActions.map((action) => (
            <Card key={action.title} className="flex flex-col gap-4 p-6" elevated>
              <div className="space-y-2">
                <h3 className="text-base font-semibold">{action.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/55">
                  {action.description}
                </p>
              </div>
              <Link
                href={action.href}
                className="text-sm font-medium text-brand transition-colors hover:text-brand-deep"
              >
                {action.cta} →
              </Link>
            </Card>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection
        title="Module summaries"
        description="Future AI, memory, vault, and wallet phases can plug into these stable route containers without structural rewrites."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {data.modules.map((module) => (
            <Card key={module.title} className="flex flex-col gap-5 p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">{module.title}</h3>
                  <Link
                    href={module.href}
                    className="text-sm font-medium text-brand transition-colors hover:text-brand-deep"
                  >
                    Open
                  </Link>
                </div>
                <p className="text-sm leading-relaxed text-foreground/55">
                  {module.description}
                </p>
              </div>
              <ul className="grid gap-2 sm:grid-cols-3">
                {module.metrics.map((metric) => (
                  <li
                    key={metric}
                    className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3 text-sm text-foreground/65"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </DashboardSection>
    </PageContainer>
  );
}
