import Link from "next/link";
import { ButtonLink } from "@/components/buttons/Button";

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
          <ButtonLink
            href="/signin"
            variant="secondary"
            size="md"
            className="w-full justify-center"
          >
            Sign in
          </ButtonLink>
          <ButtonLink
            href="/signup"
            variant="primary"
            size="md"
            className="w-full justify-center"
          >
            Get started
          </ButtonLink>
        </div>
      </nav>
    </div>
  );
}
