import type { Metadata } from "next";
import AIChat from "@/components/dashboard/AIChat";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.ai;

export default function AIPage() {
  return <AIChat />;
}
