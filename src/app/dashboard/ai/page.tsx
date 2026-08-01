import type { Metadata } from "next";
import Card from "@/components/cards/Card";
import DashboardSection from "@/components/dashboard/DashboardSection";
import EmptyState from "@/components/dashboard/EmptyState";
import PageContainer from "@/components/dashboard/PageContainer";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";
import { getAIData } from "@/services/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.ai;

export default function AIPage() {
  const data = getAIData();

  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardSection
          title="Conversations"
          description="Conversation architecture is in place for threaded sessions, summaries, and assistant state."
        >
          <div className="space-y-3">
            {data.conversations.map((conversation) => (
              <Card key={conversation.title} className="flex items-start justify-between gap-4 p-5">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-foreground/85">
                    {conversation.title}
                  </h3>
                  <p className="text-sm text-foreground/50">{conversation.detail}</p>
                </div>
                <StatusBadge tone={conversation.tone}>{conversation.status}</StatusBadge>
              </Card>
            ))}
          </div>
        </DashboardSection>

        <DashboardSection
          title="New conversation"
          description="A dedicated composer area is reserved for future inference workflows."
        >
          <EmptyState
            title="Conversation composer placeholder"
            description="Prompt drafting, model selection, and orchestration controls will mount here in a future AI phase."
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                <path d="m2 17 10 5 10-5" />
                <path d="m2 12 10 5 10-5" />
              </svg>
            }
          />
        </DashboardSection>
      </section>

      <DashboardSection
        title="Models"
        description="Mock model catalog and readiness signals can later be replaced by service-backed availability checks."
      >
        <Card className="overflow-hidden" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/[0.03]">
                  <th className="p-4 font-medium text-foreground/60">Model</th>
                  <th className="p-4 font-medium text-foreground/60">Provider</th>
                  <th className="p-4 font-medium text-foreground/60">Context</th>
                  <th className="p-4 font-medium text-foreground/60">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.models.map((model) => (
                  <tr key={model.name} className="border-b border-foreground/10 last:border-b-0">
                    <td className="p-4 font-medium text-foreground/85">{model.name}</td>
                    <td className="p-4 text-foreground/55">{model.provider}</td>
                    <td className="p-4 text-foreground/55">{model.context}</td>
                    <td className="p-4">
                      <StatusBadge tone={model.tone}>{model.status}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </DashboardSection>

      <DashboardSection
        title="Chat history"
        description="History retention and audit entries already fit inside the shared dashboard event model."
      >
        <div className="space-y-3">
          {data.history.map((item) => (
            <Card key={item.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground/85">{item.title}</h3>
                <p className="text-sm text-foreground/50">{item.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge tone={item.tone}>{item.status}</StatusBadge>
                <span className="text-xs text-foreground/45">{item.timestamp}</span>
              </div>
            </Card>
          ))}
        </div>
      </DashboardSection>
    </PageContainer>
  );
}
