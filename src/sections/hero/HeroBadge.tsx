interface HeroBadgeProps {
  label: string;
}

export default function HeroBadge({ label }: HeroBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.04] px-4 py-1.5 backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-foreground/50" />
      <p className="text-xs font-semibold tracking-[0.2em] text-foreground/70 uppercase">
        {label}
      </p>
    </div>
  );
}
