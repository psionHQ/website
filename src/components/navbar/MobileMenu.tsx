import Link from "next/link";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
  { label: "Company", href: "/company" },
];

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-foreground/10">
      <nav className="flex flex-col py-4">
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
