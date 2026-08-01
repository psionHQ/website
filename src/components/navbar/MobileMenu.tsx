import { ButtonLink } from "@/components/buttons/Button";
import { HEADER_NAV_ROUTES } from "@/constants/routes";
import Link from "next/link";

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-foreground/10">
      <nav className="flex flex-col py-4">
        {HEADER_NAV_ROUTES.map(({ label, href }) => (
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
