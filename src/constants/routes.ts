export interface NavRoute {
  label: string;
  href: string;
}

export const HEADER_NAV_ROUTES: NavRoute[] = [
  { label: "Product", href: "/product" },
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
  { label: "Company", href: "/company" },
];

export const PUBLIC_SITE_ROUTES = [
  "",
  "/product",
  "/platform",
  "/pricing",
  "/developers",
  "/company",
  "/blog",
  "/contact",
] as const;

export const DASHBOARD_ROOT_ROUTE = "/dashboard";

export const DASHBOARD_ROUTES = {
  overview: "/dashboard/overview",
  ai: "/dashboard/ai",
  memory: "/dashboard/memory",
  vault: "/dashboard/vault",
  wallet: "/dashboard/wallet",
  settings: "/dashboard/settings",
} as const;

export type DashboardRoute = (typeof DASHBOARD_ROUTES)[keyof typeof DASHBOARD_ROUTES];
