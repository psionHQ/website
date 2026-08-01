"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { DASHBOARD_ROUTES } from "@/constants/routes";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Overview",
    href: DASHBOARD_ROUTES.overview,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    label: "AI",
    href: DASHBOARD_ROUTES.ai,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "Memory",
    href: DASHBOARD_ROUTES.memory,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    label: "Vault",
    href: DASHBOARD_ROUTES.vault,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: "Wallet",
    href: DASHBOARD_ROUTES.wallet,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: DASHBOARD_ROUTES.settings,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Persistent left-hand navigation sidebar for the dashboard.
 * Visible on lg screens and above; collapses on smaller breakpoints.
 */
export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const userName = user?.name ?? user?.email ?? "User";
  const userEmail = user?.email ?? "";
  const userAvatar = user?.avatarUrl;

  return (
    <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-foreground/10 p-6 lg:flex">
      <div className="flex flex-col gap-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          PSIONHQ
        </Link>
        <nav className="flex flex-col gap-1" aria-label="Dashboard navigation">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === DASHBOARD_ROUTES.overview
                ? pathname === DASHBOARD_ROUTES.overview
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-foreground/[0.06] font-medium text-foreground"
                    : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground"
                }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3 border-t border-foreground/10 pt-4">
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={userName}
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-full border border-foreground/15 object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.06] text-xs font-semibold">
            {initials(userName)}
          </div>
        )}
        <div className="flex flex-col overflow-hidden">
          <span className="truncate text-sm font-medium">{userName}</span>
          <span className="truncate text-xs text-foreground/50">{userEmail}</span>
        </div>
      </div>
    </aside>
  );
}
