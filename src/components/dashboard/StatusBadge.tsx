import type { ReactNode } from "react";
import type { DashboardTone } from "@/types/dashboard";

interface StatusBadgeProps {
  children: ReactNode;
  tone?: DashboardTone;
}

const TONE_CLASSES: Record<DashboardTone, string> = {
  neutral: "border-foreground/15 bg-foreground/[0.04] text-foreground/60",
  brand: "border-brand/30 bg-brand/10 text-brand",
  positive: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  critical: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function StatusBadge({ children, tone = "neutral" }: StatusBadgeProps) {
  return <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs ${TONE_CLASSES[tone]}`}>{children}</span>;
}
