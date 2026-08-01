import type { Metadata } from "next";
import StatsCard from "@/components/dashboard/StatsCard";
import EmptyState from "@/components/dashboard/EmptyState";
import PageContainer from "@/components/dashboard/PageContainer";

export const metadata: Metadata = {
  title: "AI",
  description: "Sovereign AI inference — run private models with zero data retention.",
};

const STATS = [
  { label: "Requests This Month", value: "2,847", trend: "+12% from last month", trendUp: true },
  { label: "Avg Latency", value: "142 ms", trend: "-8 ms from last week", trendUp: true },
  { label: "Tokens Used", value: "1.2M", trend: "+180K this week", trendUp: true },
  { label: "Models Available", value: "7" },
];

interface Model {
  name: string;
  provider: string;
  context: string;
  status: "Available" | "Beta" | "Coming Soon";
}

const MODELS: Model[] = [
  { name: "PSION-7B", provider: "PSIONHQ", context: "128k", status: "Available" },
  { name: "PSION-13B", provider: "PSIONHQ", context: "64k", status: "Available" },
  { name: "Mistral 7B Instruct", provider: "Mistral AI", context: "32k", status: "Available" },
  { name: "Llama 3 8B", provider: "Meta", context: "128k", status: "Available" },
  { name: "Llama 3 70B", provider: "Meta", context: "128k", status: "Beta" },
  { name: "Gemma 2 9B", provider: "Google", context: "8k", status: "Available" },
  { name: "PSION-70B", provider: "PSIONHQ", context: "256k", status: "Coming Soon" },
];

const STATUS_CLASSES: Record<Model["status"], string> = {
  Available: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Beta: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  "Coming Soon": "border-foreground/15 bg-foreground/[0.04] text-foreground/50",
};

const recentRequests: { prompt: string; model: string; tokens: number; latency: string; time: string }[] = [];

export default function AIPage() {
  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Available models</h2>
        <div className="overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                <th className="p-4 font-semibold text-foreground/70">Model</th>
                <th className="p-4 font-semibold text-foreground/70">Provider</th>
                <th className="p-4 font-semibold text-foreground/70">Context</th>
                <th className="p-4 font-semibold text-foreground/70">Status</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map((model) => (
                <tr key={model.name} className="border-b border-foreground/10 last:border-0">
                  <td className="p-4 font-medium text-foreground/90">{model.name}</td>
                  <td className="p-4 text-foreground/60">{model.provider}</td>
                  <td className="p-4 text-foreground/60">{model.context}</td>
                  <td className="p-4">
                    <span className={`rounded-full border px-2.5 py-0.5 text-xs ${STATUS_CLASSES[model.status]}`}>
                      {model.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight">Recent requests</h2>
        {recentRequests.length === 0 ? (
          <EmptyState
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            }
            title="No requests yet"
            description="Your AI inference history will appear here once you start making requests through the API or SDK."
          />
        ) : null}
      </div>
    </PageContainer>
  );
}
