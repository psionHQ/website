import {
  AIIcon,
  IdeasIcon,
  MemoryIcon,
  OverviewIcon,
  SettingsIcon,
  VaultIcon,
  WalletIcon,
} from "@/components/dashboard/DashboardIcons";
import { DASHBOARD_ROOT_ROUTE, DASHBOARD_ROUTES } from "@/constants/routes";
import type { DashboardNavItem, DashboardPageId, DashboardPageMeta } from "@/types/dashboard";

export const DASHBOARD_PAGE_META: Record<DashboardPageId, DashboardPageMeta> = {
  overview: {
    title: "Overview",
    description:
      "Monitor your PSION platform, activity, and module readiness from one shared workspace.",
  },
  ai: {
    title: "AI",
    description:
      "Prepare conversations, models, and orchestration workflows before inference services go live.",
  },
  memory: {
    title: "Memory",
    description: "",
  },
  ideas: {
    title: "Ideas",
    description: "",
  },
  vault: {
    title: "Vault",
    description:
      "Track secure files, encryption posture, and storage readiness before vault services connect.",
  },
  wallet: {
    title: "Wallet",
    description: "",
  },
  settings: {
    title: "Settings",
    description:
      "Manage profile, security, sessions, notifications, and preferences without changing auth flows.",
  },
};

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  {
    id: "overview",
    label: "Overview",
    href: DASHBOARD_ROUTES.overview,
    icon: OverviewIcon,
  },
  { id: "ai", label: "AI", href: DASHBOARD_ROUTES.ai, icon: AIIcon },
  {
    id: "memory",
    label: "Memory",
    href: DASHBOARD_ROUTES.memory,
    icon: MemoryIcon,
  },
  {
    id: "ideas",
    label: "Ideas",
    href: DASHBOARD_ROUTES.ideas,
    icon: IdeasIcon,
  },
  { id: "vault", label: "Vault", href: DASHBOARD_ROUTES.vault, icon: VaultIcon },
  {
    id: "wallet",
    label: "Wallet",
    href: DASHBOARD_ROUTES.wallet,
    icon: WalletIcon,
  },
  {
    id: "settings",
    label: "Settings",
    href: DASHBOARD_ROUTES.settings,
    icon: SettingsIcon,
  },
];

export const DASHBOARD_PATH_TO_PAGE: Record<string, DashboardPageId> = {
  [DASHBOARD_ROOT_ROUTE]: "overview",
  [DASHBOARD_ROUTES.overview]: "overview",
  [DASHBOARD_ROUTES.ai]: "ai",
  [DASHBOARD_ROUTES.memory]: "memory",
  [DASHBOARD_ROUTES.ideas]: "ideas",
  [DASHBOARD_ROUTES.vault]: "vault",
  [DASHBOARD_ROUTES.wallet]: "wallet",
  [DASHBOARD_ROUTES.settings]: "settings",
};
