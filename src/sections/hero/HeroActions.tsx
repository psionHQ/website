import Link from "next/link";

interface HeroActionsProps {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export default function HeroActions({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroActionsProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
      <Link
        href={primaryHref}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80"
      >
        {primaryLabel}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
      <Link
        href={secondaryHref}
        className="inline-flex h-11 items-center justify-center rounded-full border border-foreground/20 px-7 text-sm font-medium text-foreground transition-colors hover:border-foreground/40 hover:bg-foreground/[0.04]"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}
