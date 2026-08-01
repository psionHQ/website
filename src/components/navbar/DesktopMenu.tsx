import Link from "next/link";
import { ButtonLink } from "@/components/buttons/Button";
import { HEADER_NAV_ROUTES } from "@/constants/routes";

export default function DesktopMenu() {
  return (
    <div className="hidden md:flex items-center gap-6">
      <nav className="flex items-center gap-6">
        {HEADER_NAV_ROUTES.map(({ label, href }) => (
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
        <ButtonLink href="/signup" variant="primary" size="sm">
          Get started
        </ButtonLink>
      </div>
    </div>
  );
}
