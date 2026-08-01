"use client";

import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import UserMenu from "@/components/dashboard/UserMenu";
import { DASHBOARD_ROUTES } from "@/constants/routes";

const PAGE_TITLES: Record<string, string> = {
  [DASHBOARD_ROUTES.overview]: "Overview",
  [DASHBOARD_ROUTES.ai]: "AI",
  [DASHBOARD_ROUTES.memory]: "Memory",
  [DASHBOARD_ROUTES.vault]: "Vault",
  [DASHBOARD_ROUTES.wallet]: "Wallet",
  [DASHBOARD_ROUTES.settings]: "Settings",
};

/**
 * Top bar for the dashboard: shows the current page title, breadcrumbs,
 * a notifications button, and the user menu.
 */
export default function DashboardHeader() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className="flex items-center justify-between border-b border-foreground/10 px-6 py-4 sm:px-8 lg:px-10">
      <div className="flex flex-col gap-0.5">
        <Breadcrumbs />
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}
