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
    <div className="hidden md:flex items-center gap-6">
      <nav className="flex items-center gap-6">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium text-foreground/65 hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3 border-l border-foreground/10 pl-6">
        <Link
          href="/signin"
          className="text-sm font-medium text-foreground/65 hover:text-foreground transition-colors"
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          className="inline-flex h-8 items-center rounded-full bg-foreground px-4 text-xs font-medium text-background transition-opacity hover:opacity-80"
        >
          Get started
        </Link>
      </div>
    </div>
  );
}
