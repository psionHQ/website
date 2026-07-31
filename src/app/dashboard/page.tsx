import type { Metadata } from "next";
import DashboardShell from "@/components/dashboard/DashboardShell";

// Note: the root layout always renders the public Header above this page.
// The DashboardShell below builds its own app-style sidebar/topbar within
// the remaining viewport space.

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your PSIONHQ services, monitor usage, and configure your account.",
};

export default function DashboardPage() {
  return <DashboardShell />;
}
