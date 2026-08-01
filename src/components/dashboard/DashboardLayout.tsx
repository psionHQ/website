import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Full-page shell for all authenticated dashboard views.
 * Renders the persistent sidebar on the left and the top header above each page's content.
 * Must be used inside the Clerk / Auth provider tree.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex flex-1 flex-col overflow-auto">{children}</main>
      </div>
    </div>
  );
}
