import type { Metadata } from "next";
import PageContainer from "@/components/dashboard/PageContainer";
import DashboardSection from "@/components/dashboard/DashboardSection";
import WalletBalanceCard from "@/components/dashboard/WalletBalanceCard";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.wallet;

export default function WalletPage() {
  return (
    <PageContainer>
      <DashboardSection
        title="PSI balance"
        description="Buy, send, and receive PSI — the internal token used across every PSIONHQ agent interaction."
      >
        <div className="max-w-xl">
          <WalletBalanceCard />
        </div>
      </DashboardSection>
    </PageContainer>
  );
}
