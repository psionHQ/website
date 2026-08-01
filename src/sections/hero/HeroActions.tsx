import { ButtonLink } from "@/components/buttons/Button";

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
    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
      <ButtonLink
        href={primaryHref}
        variant="primary"
        size="md"
        className="px-8 text-sm font-semibold"
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
      </ButtonLink>
      <ButtonLink
        href={secondaryHref}
        variant="secondary"
        size="md"
        className="px-8 text-sm font-semibold"
      >
        {secondaryLabel}
      </ButtonLink>
    </div>
  );
}
