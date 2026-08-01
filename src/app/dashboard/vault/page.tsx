import type { Metadata } from "next";
import StatsCard from "@/components/dashboard/StatsCard";
import EmptyState from "@/components/dashboard/EmptyState";
import PageContainer from "@/components/dashboard/PageContainer";

export const metadata: Metadata = {
  title: "Vault",
  description: "Encrypted document vault — your data, your keys, your control.",
};

const STATS = [
  { label: "Items Stored", value: "38", trend: "+3 this week", trendUp: true },
  { label: "Storage Used", value: "82.4 MB" },
  { label: "Encryption", value: "AES-256", trend: "All items encrypted", trendUp: true },
  { label: "Last Access", value: "18 min ago" },
];

interface VaultItem {
  id: string;
  name: string;
  type: string;
  size: string;
  encrypted: boolean;
  updatedAt: string;
}

const VAULT_ITEMS: VaultItem[] = [
  { id: "v1", name: "Identity Documents", type: "Folder", size: "12.4 MB", encrypted: true, updatedAt: "1 day ago" },
  { id: "v2", name: "API Keys Backup", type: "JSON", size: "2.1 KB", encrypted: true, updatedAt: "3 days ago" },
  { id: "v3", name: "Recovery Phrases", type: "Text", size: "512 B", encrypted: true, updatedAt: "1 week ago" },
  { id: "v4", name: "Legal Contracts", type: "Folder", size: "48.2 MB", encrypted: true, updatedAt: "2 weeks ago" },
  { id: "v5", name: "Credentials Export", type: "JSON", size: "8.9 KB", encrypted: true, updatedAt: "1 month ago" },
];

export default function VaultPage() {
  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Vault contents</h2>
          <span className="text-xs text-foreground/40">{VAULT_ITEMS.length} items</span>
        </div>

        {VAULT_ITEMS.length === 0 ? (
          <EmptyState
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
            title="Vault is empty"
            description="Upload your first encrypted document to start securing your files in your personal vault."
          />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-foreground/10">
            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                  <th className="p-4 font-semibold text-foreground/70">Name</th>
                  <th className="p-4 font-semibold text-foreground/70">Type</th>
                  <th className="p-4 font-semibold text-foreground/70">Size</th>
                  <th className="p-4 font-semibold text-foreground/70">Encrypted</th>
                  <th className="p-4 font-semibold text-foreground/70">Updated</th>
                </tr>
              </thead>
              <tbody>
                {VAULT_ITEMS.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-foreground/10 last:border-0 transition-colors hover:bg-foreground/[0.02]"
                  >
                    <td className="p-4 font-medium text-foreground/90">{item.name}</td>
                    <td className="p-4">
                      <span className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-0.5 text-xs text-foreground/60">
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 text-foreground/60">{item.size}</td>
                    <td className="p-4">
                      {item.encrypted && (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-400">
                          AES-256
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-foreground/50">{item.updatedAt}</td>
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
