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
            className="px-4 py-2.5 text-sm font-medium text-foreground/65 hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
        <div className="mx-4 mt-3 flex flex-col gap-2 border-t border-foreground/10 pt-3">
          <Link
            href="/signin"
            className="flex h-9 items-center justify-center rounded-full border border-foreground/20 text-sm font-medium text-foreground transition-colors hover:border-foreground/40"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="flex h-9 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-80"
          >
            Get started
          </Link>
        </div>
      </nav>
    </div>
  );
}
