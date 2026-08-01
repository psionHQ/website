"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_ROOT_ROUTE, DASHBOARD_ROUTES } from "@/constants/routes";
import { getDashboardPageMeta } from "@/utils/dashboard";

/**
 * Breadcrumb trail showing the current dashboard section.
 */
export default function Breadcrumbs() {
  const pathname = usePathname();
  const { title } = getDashboardPageMeta(pathname);
  const isOverview =
    pathname === DASHBOARD_ROOT_ROUTE || pathname === DASHBOARD_ROUTES.overview;

  if (isOverview) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs text-foreground/40"
    >
      <Link
        href={DASHBOARD_ROUTES.overview}
        className="transition-colors hover:text-foreground/60"
      >
        Dashboard
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-foreground/60">{title}</span>
    </nav>
  );
}
