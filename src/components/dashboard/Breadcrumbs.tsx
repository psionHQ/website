"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_ROUTES } from "@/constants/routes";

const ROUTE_LABELS: Record<string, string> = {
  [DASHBOARD_ROUTES.overview]: "Overview",
  [DASHBOARD_ROUTES.ai]: "AI",
  [DASHBOARD_ROUTES.memory]: "Memory",
  [DASHBOARD_ROUTES.vault]: "Vault",
  [DASHBOARD_ROUTES.wallet]: "Wallet",
  [DASHBOARD_ROUTES.settings]: "Settings",
};

/**
 * Breadcrumb trail showing the current dashboard section.
 * Renders "Dashboard / <Section>" for all sub-pages.
 */
export default function Breadcrumbs() {
  const pathname = usePathname();
  const currentLabel = ROUTE_LABELS[pathname];

  if (!currentLabel || pathname === DASHBOARD_ROUTES.overview) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-foreground/40">
      <Link href={DASHBOARD_ROUTES.overview} className="hover:text-foreground/60 transition-colors">
        Dashboard
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-foreground/60">{currentLabel}</span>
    </nav>
  );
}
