"use client";

import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import UserMenu from "@/components/dashboard/UserMenu";
import { getDashboardPageMeta } from "@/utils/dashboard";

interface DashboardHeaderProps {
  mobileNavOpen: boolean;
  onMobileNavToggle: () => void;
}

/**
 * Top bar for the dashboard: page title, breadcrumbs, notifications, and user menu.
 */
export default function DashboardHeader({
  mobileNavOpen,
  onMobileNavToggle,
}: DashboardHeaderProps) {
  const pathname = usePathname();
  const { title, description } = getDashboardPageMeta(pathname);

  return (
    <header className="border-b border-foreground/10 bg-background/95 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <button
            type="button"
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-controls="dashboard-mobile-navigation"
            aria-expanded={mobileNavOpen}
            onClick={onMobileNavToggle}
            className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 text-foreground/70 transition-colors hover:border-foreground/20 hover:text-foreground lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="min-w-0 space-y-1">
            <Breadcrumbs />
            <div className="space-y-1">
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/50">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand" />
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
