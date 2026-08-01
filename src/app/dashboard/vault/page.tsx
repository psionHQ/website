import type { Metadata } from "next";
import Card from "@/components/cards/Card";
import DashboardSection from "@/components/dashboard/DashboardSection";
import EmptyState from "@/components/dashboard/EmptyState";
import PageContainer from "@/components/dashboard/PageContainer";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";
import { getVaultData } from "@/services/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.vault;

export default function VaultPage() {
  const data = getVaultData();

  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardSection
          title="Secure files"
          description="File management is scaffolded now so storage, scanning, and upload services can attach later."
        >
          <Card className="overflow-hidden" hover={false}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-foreground/10 bg-foreground/[0.03]">
                    <th className="p-4 font-medium text-foreground/60">File</th>
                    <th className="p-4 font-medium text-foreground/60">Type</th>
                    <th className="p-4 font-medium text-foreground/60">Size</th>
                    <th className="p-4 font-medium text-foreground/60">Status</th>
                    <th className="p-4 font-medium text-foreground/60">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {data.files.map((file) => (
                    <tr key={file.name} className="border-b border-foreground/10 last:border-b-0">
                      <td className="p-4 font-medium text-foreground/85">{file.name}</td>
                      <td className="p-4 text-foreground/55">{file.type}</td>
                      <td className="p-4 text-foreground/55">{file.size}</td>
                      <td className="p-4">
                        <StatusBadge tone={file.tone}>{file.status}</StatusBadge>
                      </td>
                      <td className="p-4 text-foreground/45">{file.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </DashboardSection>

        <DashboardSection
          title="Upload placeholder"
          description="The upload surface is intentionally non-functional until vault backend services arrive."
        >
          <EmptyState
            title="Uploads will connect here"
            description="Drag-and-drop ingestion, client encryption, and file processing will plug into this reserved vault surface in a later phase."
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
                <path d="M12 16V4" />
                <path d="m7 9 5-5 5 5" />
                <path d="M20 16.74A4 4 0 0 1 16 20H8a4 4 0 0 1-4-3.26" />
              </svg>
            }
          />
        </DashboardSection>
      </section>

      <DashboardSection
        title="Categories"
        description="File taxonomy is already organized into reusable vault primitives."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {data.categories.map((category) => (
            <Card key={category.title} className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground/85">{category.title}</h3>
                <StatusBadge tone="brand">{category.count}</StatusBadge>
              </div>
              <p className="text-sm leading-relaxed text-foreground/55">
                {category.description}
              </p>
            </Card>
          ))}
        </div>
      </DashboardSection>

      <DashboardSection
        title="Encryption status"
        description="Storage and encryption summaries are modeled now for later backend integration."
      >
        <Card className="p-6" elevated>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-sm text-foreground/50">Cipher suite</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">AES-256</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-sm text-foreground/50">Key handling</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">Client-managed</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-sm text-foreground/50">Storage summary</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">82.4 MB / 100 MB</p>
            </div>
          </div>
        </Card>
      </DashboardSection>
    </PageContainer>
  );
}
