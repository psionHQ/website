interface HeroBadgeProps {
  label: string;
}

export default function HeroBadge({ label }: HeroBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/[0.07] px-4 py-1.5 backdrop-blur-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0066FF]" />
      <p className="text-xs font-semibold tracking-[0.2em] text-foreground/80 uppercase">
        {label}
      </p>
    </div>
  );
}
