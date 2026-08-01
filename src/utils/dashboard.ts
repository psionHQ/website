import { DASHBOARD_PAGE_META, DASHBOARD_PATH_TO_PAGE } from "@/constants/dashboard";
import { DASHBOARD_ROOT_ROUTE, DASHBOARD_ROUTES } from "@/constants/routes";
import type { DashboardPageId, DashboardPageMeta } from "@/types/dashboard";

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function normalizeDashboardPath(pathname: string) {
  return pathname === DASHBOARD_ROOT_ROUTE ? DASHBOARD_ROUTES.overview : pathname;
}

export function getDashboardPageId(pathname: string): DashboardPageId | null {
  const normalizedPath = normalizeDashboardPath(pathname);
  return DASHBOARD_PATH_TO_PAGE[normalizedPath] ?? null;
}

export function getDashboardPageMeta(pathname: string): DashboardPageMeta {
  const pageId = getDashboardPageId(pathname);
  return pageId ? DASHBOARD_PAGE_META[pageId] : { title: "Dashboard", description: "PSION platform workspace." };
}

export function isDashboardRouteActive(pathname: string, href: string) {
  const normalizedPath = normalizeDashboardPath(pathname);
  return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
}
