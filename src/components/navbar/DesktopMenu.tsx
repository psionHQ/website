import Link from "next/link";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
  { label: "Company", href: "/company" },
];

export default function DesktopMenu() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_LINKS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
