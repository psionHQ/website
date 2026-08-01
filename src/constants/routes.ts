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
