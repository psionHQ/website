import { DASHBOARD_ROUTES } from "@/constants/routes";
import type { DashboardActivityItem, DashboardLinkCard, DashboardMetric, DashboardSummaryCard } from "@/types/dashboard";

export function getOverviewData() {
  return {
    welcome: {
      eyebrow: "PSION Platform",
      title: "Your production workspace is live.",
      description:
        "This shared shell is the foundation for AI, memory, vault, wallet, and future platform modules.",
      primaryAction: { label: "Open AI workspace", href: DASHBOARD_ROUTES.ai },
      secondaryAction: { label: "Review settings", href: DASHBOARD_ROUTES.settings },
    },
    stats: [
      { label: "AI conversations", value: "18", trend: "+4 this week", trendTone: "positive" },
      { label: "Memory collections", value: "6", trend: "Sovereign sync healthy", trendTone: "neutral" },
      { label: "Vault storage", value: "82.4 MB", trend: "100% encrypted", trendTone: "positive" },
      { label: "Wallet balance", value: "$18,240.00", trend: "2 pending actions", trendTone: "warning" },
    ] satisfies DashboardMetric[],
    userSummary: [
      { label: "Workspace", value: "PSION Personal" },
      { label: "Plan", value: "Founding Access" },
      { label: "Region", value: "Global Edge" },
      { label: "Last sign in", value: "2 minutes ago" },
    ],
    platformStatus: [
      { label: "Authentication", value: "Live", tone: "positive" as const },
      { label: "Dashboard shell", value: "Production-ready", tone: "neutral" as const },
      { label: "Backend modules", value: "Mock mode", tone: "warning" as const },
    ],
    activity: [
      { id: "overview-1", title: "New conversation scaffold created", category: "AI", status: "Ready", tone: "positive", timestamp: "4 minutes ago" },
      { id: "overview-2", title: "Collection \"Strategy\" updated", category: "Memory", status: "Synced", tone: "positive", timestamp: "19 minutes ago" },
      { id: "overview-3", title: "Vault upload placeholder reviewed", category: "Vault", status: "Pending", tone: "warning", timestamp: "48 minutes ago" },
      { id: "overview-4", title: "Wallet activity summary refreshed", category: "Wallet", status: "Queued", tone: "neutral", timestamp: "1 hour ago" },
    ] satisfies DashboardActivityItem[],
    quickActions: [
      {
        title: "Start a new conversation",
        description: "Open the AI workspace and initialize a fresh conversation shell with mock model readiness.",
        href: DASHBOARD_ROUTES.ai,
        cta: "Open AI",
      },
      {
        title: "Search memory",
        description: "Inspect placeholder memory collections, saved knowledge, and timeline architecture.",
        href: DASHBOARD_ROUTES.memory,
        cta: "Open Memory",
      },
      {
        title: "Review security posture",
        description: "Check account security, sessions, and platform notification controls from Settings.",
        href: DASHBOARD_ROUTES.settings,
        cta: "Open Settings",
      },
    ] satisfies DashboardLinkCard[],
    modules: [
      {
        title: "AI",
        description: "Conversation scaffolding, model catalog, and history architecture ready for backend orchestration.",
        href: DASHBOARD_ROUTES.ai,
        metrics: ["6 active threads", "7 model slots", "Prompt composer placeholder"],
      },
      {
        title: "Memory",
        description: "Personal memory, saved knowledge, collections, and search UX are structured for future engines.",
        href: DASHBOARD_ROUTES.memory,
        metrics: ["124 saved memories", "4 timeline groups", "Search ready"],
      },
      {
        title: "Vault",
        description: "Secure files, categories, encryption status, and storage summaries share the same platform shell.",
        href: DASHBOARD_ROUTES.vault,
        metrics: ["12 secure files", "AES-256 placeholder", "3 categories"],
      },
      {
        title: "Wallet",
        description: "Assets, transaction activity, and token support planning are prepared without backend coupling.",
        href: DASHBOARD_ROUTES.wallet,
        metrics: ["4 assets", "12 recent transactions", "Token support queued"],
      },
    ] satisfies DashboardSummaryCard[],
  };
}

export function getAIData() {
  return {
    stats: [
      { label: "Conversation threads", value: "6", trend: "2 awaiting backend", trendTone: "warning" },
      { label: "Models staged", value: "7", trend: "2 internal, 5 partner", trendTone: "neutral" },
      { label: "History retention", value: "90 days", trend: "Policy placeholder", trendTone: "neutral" },
      { label: "New drafts", value: "3", trend: "Updated today", trendTone: "positive" },
    ] satisfies DashboardMetric[],
    conversations: [
      { title: "PSION platform strategy", detail: "12 messages • GPT-ready context", status: "Active", tone: "positive" as const },
      { title: "Vault onboarding flow", detail: "7 messages • awaiting retrieval layer", status: "Draft", tone: "warning" as const },
      { title: "Wallet compliance notes", detail: "4 messages • summary generated", status: "Archived", tone: "neutral" as const },
    ],
    models: [
      { name: "PSION Core", provider: "PSIONHQ", context: "256k", status: "Ready", tone: "positive" as const },
      { name: "Mistral 7B", provider: "Partner", context: "128k", status: "Ready", tone: "positive" as const },
      { name: "Llama 3 70B", provider: "Partner", context: "128k", status: "Staged", tone: "warning" as const },
      { name: "Reasoning Lab", provider: "PSIONHQ", context: "512k", status: "Planned", tone: "neutral" as const },
    ],
    history: [
      { id: "ai-1", title: "Briefing synthesis", category: "Assistant", status: "Complete", tone: "positive", timestamp: "Today • 09:12" },
      { id: "ai-2", title: "Memory indexing prompt", category: "System", status: "Pending", tone: "warning", timestamp: "Today • 08:34" },
      { id: "ai-3", title: "Vault categorization draft", category: "Assistant", status: "Queued", tone: "neutral", timestamp: "Yesterday • 19:21" },
    ] satisfies DashboardActivityItem[],
  };
}

export function getMemoryData() {
  return {
    stats: [
      { label: "Personal memories", value: "124", trend: "+8 this week", trendTone: "positive" },
      { label: "Collections", value: "4", trend: "Shared shell ready", trendTone: "neutral" },
      { label: "Saved knowledge", value: "18", trend: "2 ungrouped notes", trendTone: "warning" },
      { label: "Search scope", value: "Global", trend: "Mock indexing active", trendTone: "neutral" },
    ] satisfies DashboardMetric[],
    collections: [
      { title: "Strategy", description: "Long-term planning, priorities, and roadmap decisions.", count: "42 items" },
      { title: "Research", description: "Captured findings, sources, and verified references.", count: "31 items" },
      { title: "Preferences", description: "User-facing defaults, workflow choices, and tone guidance.", count: "19 items" },
      { title: "Projects", description: "Repository-specific context grouped for future execution.", count: "32 items" },
    ],
    timeline: [
      { id: "memory-1", title: "Saved implementation report preference", category: "Preferences", status: "Stored", tone: "positive", timestamp: "Today • 11:42" },
      { id: "memory-2", title: "Captured dashboard architecture milestone", category: "Projects", status: "Indexed", tone: "neutral", timestamp: "Today • 10:08" },
      { id: "memory-3", title: "Queued vault taxonomy review", category: "Research", status: "Pending", tone: "warning", timestamp: "Yesterday • 16:20" },
    ] satisfies DashboardActivityItem[],
  };
}

export function getVaultData() {
  return {
    stats: [
      { label: "Secure files", value: "12", trend: "+3 this week", trendTone: "positive" },
      { label: "Categories", value: "3", trend: "Taxonomy stabilized", trendTone: "neutral" },
      { label: "Encryption", value: "AES-256", trend: "All mock files protected", trendTone: "positive" },
      { label: "Storage used", value: "82.4 MB", trend: "17.6 MB available tier", trendTone: "warning" },
    ] satisfies DashboardMetric[],
    categories: [
      { title: "Identity", description: "Credentials, attestations, and recovery materials.", count: "4 files" },
      { title: "Operations", description: "Runbooks, policies, and internal operating documents.", count: "5 files" },
      { title: "Finance", description: "Statements, invoices, and settlement artifacts.", count: "3 files" },
    ],
    files: [
      { name: "Recovery-package.pdf", type: "PDF", size: "2.4 MB", status: "Encrypted", tone: "positive" as const, updatedAt: "Today • 07:41" },
      { name: "onboarding-checklist.docx", type: "DOCX", size: "420 KB", status: "Encrypted", tone: "positive" as const, updatedAt: "Yesterday • 18:12" },
      { name: "vendor-due-diligence.zip", type: "ZIP", size: "16.8 MB", status: "Queued scan", tone: "warning" as const, updatedAt: "Yesterday • 12:03" },
    ],
  };
}

export function getWalletData() {
  return {
    stats: [
      { label: "Portfolio value", value: "$18,240.00", trend: "+2.4% this week", trendTone: "positive" },
      { label: "Tracked assets", value: "4", trend: "Multi-asset shell ready", trendTone: "neutral" },
      { label: "Transactions", value: "12", trend: "2 pending confirmations", trendTone: "warning" },
      { label: "Token support", value: "Planned", trend: "PSION token phase unlocked", trendTone: "neutral" },
    ] satisfies DashboardMetric[],
    assets: [
      { symbol: "BTC", name: "Bitcoin", balance: "0.182 BTC", allocation: "42%", change: "+1.2%" },
      { symbol: "ETH", name: "Ethereum", balance: "4.81 ETH", allocation: "34%", change: "+3.8%" },
      { symbol: "USDC", name: "USD Coin", balance: "6,420 USDC", allocation: "20%", change: "0.0%" },
      { symbol: "ARB", name: "Arbitrum", balance: "1,200 ARB", allocation: "4%", change: "-1.1%" },
    ],
    activity: [
      { id: "wallet-1", title: "Received ETH from treasury", category: "Transfer", status: "Confirmed", tone: "positive", timestamp: "Today • 10:02" },
      { id: "wallet-2", title: "USDC settlement to vendor", category: "Payment", status: "Pending", tone: "warning", timestamp: "Today • 08:49" },
      { id: "wallet-3", title: "Portfolio sync completed", category: "System", status: "Synced", tone: "neutral", timestamp: "Yesterday • 21:14" },
    ] satisfies DashboardActivityItem[],
  };
}
