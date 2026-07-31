interface HeroBadgeProps {
  label: string;
}

export default function HeroBadge({ label }: HeroBadgeProps) {
  return (
    <p className="inline-flex rounded-full border border-foreground/15 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-foreground/70 uppercase">
      {label}
    </p>
  );
}
