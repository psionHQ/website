import type { Metadata } from "next";
import StatsCard from "@/components/dashboard/StatsCard";
import EmptyState from "@/components/dashboard/EmptyState";
import PageContainer from "@/components/dashboard/PageContainer";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Self-custodied wallet — your assets, your keys, your sovereignty.",
};

const STATS = [
  { label: "Total Balance", value: "$1,240.00", trend: "+$84.20 this week", trendUp: true },
  { label: "ETH Balance", value: "0.4821 ETH" },
  { label: "USDC Balance", value: "1,002.50 USDC" },
  { label: "Transactions", value: "24", trend: "This month", trendUp: true },
];

type TxType = "Received" | "Sent" | "Swap";
type TxStatus = "Confirmed" | "Pending" | "Failed";

interface Transaction {
  id: string;
  description: string;
  type: TxType;
  amount: string;
  status: TxStatus;
  time: string;
}

const TRANSACTIONS: Transaction[] = [
  { id: "tx1", description: "Received ETH", type: "Received", amount: "+0.12 ETH", status: "Confirmed", time: "3 hrs ago" },
  { id: "tx2", description: "USDC transfer out", type: "Sent", amount: "-500 USDC", status: "Pending", time: "5 hrs ago" },
  { id: "tx3", description: "ETH → USDC swap", type: "Swap", amount: "0.05 ETH", status: "Confirmed", time: "2 days ago" },
  { id: "tx4", description: "Received USDC", type: "Received", amount: "+250 USDC", status: "Confirmed", time: "4 days ago" },
  { id: "tx5", description: "Sent ETH", type: "Sent", amount: "-0.08 ETH", status: "Failed", time: "1 week ago" },
];

const TX_TYPE_CLASSES: Record<TxType, string> = {
  Received: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Sent: "border-foreground/15 bg-foreground/[0.04] text-foreground/60",
  Swap: "border-amber-500/30 bg-amber-500/10 text-amber-400",
};

const TX_STATUS_CLASSES: Record<TxStatus, string> = {
  Confirmed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function WalletPage() {
  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Transactions</h2>
          <span className="text-xs text-foreground/40">{TRANSACTIONS.length} this month</span>
        </div>

        {TRANSACTIONS.length === 0 ? (
          <EmptyState
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            }
            title="No transactions yet"
            description="Your self-custodied wallet transaction history will appear here once you start sending and receiving assets."
          />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-foreground/10">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                  <th className="p-4 font-semibold text-foreground/70">Description</th>
                  <th className="p-4 font-semibold text-foreground/70">Type</th>
                  <th className="p-4 font-semibold text-foreground/70">Amount</th>
                  <th className="p-4 font-semibold text-foreground/70">Status</th>
                  <th className="p-4 font-semibold text-foreground/70">Time</th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="border-b border-foreground/10 last:border-0 transition-colors hover:bg-foreground/[0.02]">
                    <td className="p-4 font-medium text-foreground/90">{tx.description}</td>
                    <td className="p-4">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs ${TX_TYPE_CLASSES[tx.type]}`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-4 font-medium text-foreground/80">{tx.amount}</td>
                    <td className="p-4">
                      <span className={`rounded-full border px-2.5 py-0.5 text-xs ${TX_STATUS_CLASSES[tx.status]}`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-foreground/50">{tx.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
