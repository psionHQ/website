import type { ComponentType } from "react";
import type { DashboardRoute } from "@/constants/routes";

export type DashboardTone = "neutral" | "brand" | "positive" | "warning" | "critical";

export type DashboardPageId = "overview" | "ai" | "memory" | "vault" | "wallet" | "settings";

export interface DashboardMetric {
  label: string;
  value: string;
  trend?: string;
  trendTone?: Extract<DashboardTone, "positive" | "warning" | "critical" | "neutral">;
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  category: string;
  status: string;
  tone: DashboardTone;
  timestamp: string;
}

export interface DashboardLinkCard {
  title: string;
  description: string;
  href: string;
  cta: string;
}

export interface DashboardSummaryCard {
  title: string;
  description: string;
  href: string;
  metrics: string[];
}

export interface DashboardPageMeta {
  title: string;
  description: string;
}

export interface DashboardIconProps {
  className?: string;
}

export interface DashboardNavItem {
  id: DashboardPageId;
  label: string;
  href: DashboardRoute;
  icon: ComponentType<DashboardIconProps>;
}
