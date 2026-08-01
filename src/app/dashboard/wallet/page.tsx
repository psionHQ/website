import type { Metadata } from "next";
import Card from "@/components/cards/Card";
import DashboardSection from "@/components/dashboard/DashboardSection";
import PageContainer from "@/components/dashboard/PageContainer";
import StatsCard from "@/components/dashboard/StatsCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";
import { getWalletData } from "@/services/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.wallet;

export default function WalletPage() {
  const data = getWalletData();

  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <DashboardSection
          title="Assets"
          description="Asset cards define the structure for balances, pricing, and allocations before wallet services connect."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {data.assets.map((asset) => (
              <Card key={asset.symbol} className="flex flex-col gap-4 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">{asset.symbol}</h3>
                    <p className="text-sm text-foreground/50">{asset.name}</p>
                  </div>
                  <StatusBadge tone="brand">{asset.allocation}</StatusBadge>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-semibold tracking-tight">{asset.balance}</p>
                  <p className="text-sm text-foreground/50">7d change {asset.change}</p>
                </div>
              </Card>
            ))}
          </div>
        </DashboardSection>

        <DashboardSection
          title="Future PSION token support"
          description="This reserved surface will host issuance, balances, and utility workflows in a later wallet phase."
        >
          <Card className="flex h-full flex-col gap-5 p-6" elevated>
            <StatusBadge tone="brand">Planned</StatusBadge>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight">
                Token architecture is already accounted for.
              </h3>
              <p className="text-sm leading-relaxed text-foreground/55">
                The wallet shell includes space for future PSION token balances, transfers, staking, and governance without a structural rewrite.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li>• Dedicated balance and allocation surfaces</li>
              <li>• Shared activity feed with wallet transactions</li>
              <li>• Settings and security hooks already available</li>
            </ul>
          </Card>
        </DashboardSection>
      </section>

      <DashboardSection
        title="Transactions"
        description="Transaction architecture is ready for settlement data, statuses, and future filtering controls."
      >
        <div className="space-y-3">
          {data.activity.map((item) => (
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

      <DashboardSection
        title="Activity"
        description="Wallet operations and future automations can reuse the same shared layout, navigation, and state primitives."
      >
        <Card className="p-6" hover={false}>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-sm text-foreground/50">Networks</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">Ethereum + L2</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-sm text-foreground/50">Pending approvals</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">2</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
              <p className="text-sm text-foreground/50">Automation readiness</p>
              <p className="mt-2 text-xl font-semibold tracking-tight">Shared shell ready</p>
            </div>
          </div>
        </Card>
      </DashboardSection>
    </PageContainer>
  );
}
