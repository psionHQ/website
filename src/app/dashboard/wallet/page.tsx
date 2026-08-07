import type { Metadata } from "next";
import PageContainer from "@/components/dashboard/PageContainer";
import WalletBalanceCard from "@/components/dashboard/WalletBalanceCard";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.wallet;

export default function WalletPage() {
  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-2xl">
        <WalletBalanceCard />
      </div>
    </PageContainer>
  );
}
