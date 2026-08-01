interface StatsCardProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

/**
 * A single metric card for the dashboard statistics grid.
 * Follows the PSIONHQ card design: rounded-2xl, subtle border, dark surface.
 */
export default function StatsCard({ label, value, trend, trendUp }: StatsCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
      <span className="text-xs text-foreground/50">{label}</span>
      <span className="text-2xl font-semibold tracking-tight">{value}</span>
      {trend && (
        <span
          className={`text-xs ${trendUp ? "text-emerald-400" : "text-red-400"}`}
        >
          {trend}
        </span>
      )}
    </div>
  );
}
