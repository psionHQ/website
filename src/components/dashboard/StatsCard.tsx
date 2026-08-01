import Card from "@/components/cards/Card";
import type { DashboardTone } from "@/types/dashboard";

interface StatsCardProps {
  label: string;
  value: string;
  trend?: string;
  trendTone?: Extract<DashboardTone, "positive" | "warning" | "critical" | "neutral">;
}

const TREND_CLASSES = {
  positive: "text-emerald-400",
  warning: "text-amber-400",
  critical: "text-red-400",
  neutral: "text-foreground/45",
} as const;

/**
 * A single metric card for dashboard statistics.
 */
export default function StatsCard({ label, value, trend, trendTone = "neutral" }: StatsCardProps) {
  return (
    <Card className="flex flex-col gap-2 p-5" hover={false}>
      <span className="text-xs text-foreground/50">{label}</span>
      <span className="text-2xl font-semibold tracking-tight">{value}</span>
      {trend ? <span className={`text-xs ${TREND_CLASSES[trendTone]}`}>{trend}</span> : null}
    </Card>
  );
}
