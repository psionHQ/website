"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

/**
 * Full-page shell for authenticated dashboard routes.
 * The AI route renders as a standalone full-screen chat without the
 * shared sidebar/header shell.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const isStandalone = pathname?.startsWith("/dashboard/ai") ?? false;

  useEffect(() => {
    if (!mobileNavOpen) {
      return undefined;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [mobileNavOpen]);

  if (isStandalone) {
    return <div className="min-h-screen bg-background text-foreground">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileNavOpen(false)}
          />
          <div id="dashboard-mobile-navigation" className="relative z-10 h-full">
            <Sidebar mobile onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          mobileNavOpen={mobileNavOpen}
          onMobileNavToggle={() => setMobileNavOpen((prev) => !prev)}
        />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
