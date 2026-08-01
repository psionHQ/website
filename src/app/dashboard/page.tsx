import type { Metadata } from "next";
import Link from "next/link";
import StatsCard from "@/components/dashboard/StatsCard";
import PageContainer from "@/components/dashboard/PageContainer";
import { DASHBOARD_ROUTES } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your PSIONHQ services, monitor usage, and configure your account.",
};

const STATS = [
  { label: "AI Calls This Month", value: "2,847", trend: "+12% from last month", trendUp: true },
  { label: "Memory Entries", value: "143", trend: "+5 this week", trendUp: true },
  { label: "Vault Items", value: "38", trend: "Encrypted & secured", trendUp: true },
  { label: "Wallet Balance", value: "$1,240.00" },
];

type ActivityStatus = "Success" | "Pending" | "Failed";

interface ActivityRow {
  event: string;
  type: string;
  status: ActivityStatus;
  time: string;
}

const ACTIVITY: ActivityRow[] = [
  { event: "AI inference request", type: "AI", status: "Success", time: "2 min ago" },
  { event: "Memory snapshot saved", type: "Memory", status: "Success", time: "14 min ago" },
  { event: "Vault document accessed", type: "Vault", status: "Success", time: "18 min ago" },
  { event: "Wallet transfer initiated", type: "Wallet", status: "Pending", time: "3 hrs ago" },
  { event: "Settings updated", type: "Settings", status: "Success", time: "1 day ago" },
];

const STATUS_CLASSES: Record<ActivityStatus, string> = {
  Success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

const QUICK_ACTIONS = [
  {
    label: "New AI Query",
    description: "Run a private inference request against any hosted model.",
    href: DASHBOARD_ROUTES.ai,
  },
  {
    label: "Save Memory",
    description: "Persist a new memory entry to your sovereign memory store.",
    href: DASHBOARD_ROUTES.memory,
  },
  {
    label: "Upload to Vault",
    description: "Encrypt and store a new document in your personal vault.",
    href: DASHBOARD_ROUTES.vault,
  },
];

export default function DashboardPage() {
  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Recent activity</h2>
        <div className="overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                <th className="p-4 font-semibold text-foreground/70">Event</th>
                <th className="p-4 font-semibold text-foreground/70">Type</th>
                <th className="p-4 font-semibold text-foreground/70">Status</th>
                <th className="p-4 font-semibold text-foreground/70">Time</th>
              </tr>
            </thead>
            <tbody>
              {ACTIVITY.map((row) => (
                <tr key={row.event} className="border-b border-foreground/10 last:border-0">
                  <td className="p-4 text-foreground/80">{row.event}</td>
                  <td className="p-4">
                    <span className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-0.5 text-xs text-foreground/60">
                      {row.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs ${STATUS_CLASSES[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-foreground/50">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Quick actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.04]"
            >
              <h3 className="text-sm font-semibold">{action.label}</h3>
              <p className="text-sm leading-relaxed text-foreground/60">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
