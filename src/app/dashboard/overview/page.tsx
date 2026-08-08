import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/cards/Card";
import PageContainer from "@/components/dashboard/PageContainer";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";
import { DASHBOARD_ROUTES } from "@/constants/routes";

export const metadata: Metadata = DASHBOARD_PAGE_META.overview;

const modules = [
  {
    title: "PsionHQ AI",
    description: "Conversations, agents, tasks, and intelligence.",
    href: DASHBOARD_ROUTES.ai,
    action: "Open PsionHQ AI",
  },
  {
    title: "PsionHQ Memory",
    description: "Your knowledge, context, and saved information.",
    href: DASHBOARD_ROUTES.memory,
    action: "Open PsionHQ Memory",
  },
  {
    title: "PsionHQ Ideas",
    description: "Capture ideas and turn them into projects.",
    href: DASHBOARD_ROUTES.ideas,
    action: "Open PsionHQ Ideas",
  },
  {
    title: "PsionHQ Vault",
    description: "Your secure space for protected information.",
    href: DASHBOARD_ROUTES.vault,
    action: "Open PsionHQ Vault",
  },
  {
    title: "PsionHQ Wallet",
    description: "Assets, payments, and financial activity.",
    href: DASHBOARD_ROUTES.wallet,
    action: "Open PsionHQ Wallet",
  },
];

const recentActivity = [
  {
    title: "PsionHQ AI",
    description: "Your AI workspace is ready.",
    status: "Ready",
  },
  {
    title: "PsionHQ Memory",
    description: "Your memory system is available.",
    status: "Ready",
  },
  {
    title: "PsionHQ Vault",
    description: "Your secure storage is available.",
    status: "Ready",
  },
];

export default function DashboardOverviewPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Main Home card */}
        <section>
          <div className="flex flex-col gap-6 rounded-3xl border border-foreground/10 bg-foreground/[0.025] p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
                  PSIONHQ
                </p>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Welcome to your workspace.
                </h1>

                <p className="text-sm leading-6 text-foreground/55 sm:text-base">
                  One place to work with PsionHQ AI, manage memory, develop
                  ideas, protect information, and manage your wallet.
                </p>
              </div>

              <div className="shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/20 bg-brand/[0.08] text-2xl font-semibold text-brand">
                  Ψ
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={DASHBOARD_ROUTES.ai}
                className="inline-flex h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
              >
                PsionHQ AI
              </Link>

              <Link
                href={DASHBOARD_ROUTES.memory}
                className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/15 px-6 text-sm font-medium text-foreground/75 transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                PsionHQ Memory
              </Link>
            </div>
          </div>
        </section>

        {/* PsionHQ AI */}
        <section>
          <Card className="overflow-hidden p-6 sm:p-7" elevated>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-brand/20 bg-brand/[0.08] text-xl font-semibold text-brand">
                  Ψ
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand">
                    PSI
                  </p>

                  <h2 className="mt-1 text-lg font-semibold tracking-tight">
                    PsionHQ AI
                  </h2>

                  <p className="mt-1 text-sm text-foreground/50">
                    Your intelligent layer across the PsionHQ platform.
                  </p>
                </div>
              </div>

              <StatusBadge tone="brand">Ready</StatusBadge>
            </div>
          </Card>
        </section>

        {/* PsionHQ modules */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              PsionHQ Platform
            </h2>

            <p className="mt-1 text-sm text-foreground/50">
              Everything important is one step away.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => (
              <Card
                key={module.title}
                className="flex min-h-[190px] flex-col justify-between gap-6 p-6"
                elevated
              >
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {module.title}
                  </h3>

                  <p className="text-sm leading-6 text-foreground/50">
                    {module.description}
                  </p>
                </div>

                <Link
                  href={module.href}
                  className="text-sm font-medium text-brand transition-colors hover:text-brand-deep"
                >
                  {module.action} →
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* System status */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              System status
            </h2>

            <p className="mt-1 text-sm text-foreground/50">
              A simple view of your PsionHQ environment.
            </p>
          </div>

          <Card className="p-5" hover={false}>
            <div className="divide-y divide-foreground/10">
              {recentActivity.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground/85">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm text-foreground/45">
                      {item.description}
                    </p>
                  </div>

                  <StatusBadge tone="positive">
                    {item.status}
                  </StatusBadge>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Recent activity */}
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Recent activity
            </h2>

            <p className="mt-1 text-sm text-foreground/50">
              Important activity will appear here as the platform grows.
            </p>
          </div>

          <Card className="p-5" hover={false}>
            <div className="space-y-1">
              <div className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground/80">
                    PsionHQ opened
                  </p>

                  <p className="mt-1 text-xs text-foreground/40">
                    Your PsionHQ workspace is active.
                  </p>
                </div>

                <span className="text-xs text-foreground/35">Now</span>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3">
                <div>
                  <p className="text-sm font-medium text-foreground/80">
                    Workspace initialized
                  </p>

                  <p className="mt-1 text-xs text-foreground/40">
                    Core PsionHQ modules are connected.
                  </p>
                </div>

                <span className="text-xs text-foreground/35">Today</span>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </PageContainer>
  );
}