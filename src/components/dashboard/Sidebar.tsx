"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV_ITEMS } from "@/constants/dashboard";
import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useAuth } from "@/providers/AuthProvider";
import { getInitials, isDashboardRouteActive } from "@/utils/dashboard";

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

/**
 * Persistent dashboard navigation with responsive desktop and mobile variants.
 */
export default function Sidebar({ mobile = false, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const userName = user?.name ?? user?.email ?? "User";
  const userEmail = user?.email ?? "";
  const userAvatar = user?.avatarUrl;

  return (
    <aside
      className={`flex h-full flex-col justify-between gap-8 ${
        mobile
          ? "w-full max-w-xs border-r border-foreground/10 bg-background/98 p-5 backdrop-blur"
          : "hidden w-72 shrink-0 border-r border-foreground/10 bg-foreground/[0.02] p-6 lg:flex"
      }`}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Link
              href={DASHBOARD_ROUTES.overview}
              onClick={onNavigate}
              className="text-lg font-semibold tracking-tight"
            >
              PSIONHQ
            </Link>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/35">
              Platform
            </p>
          </div>
          {mobile ? (
            <button
              type="button"
              onClick={onNavigate}
              aria-label="Close navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground"
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : null}
        </div>

        <nav aria-label="Dashboard navigation" className="flex flex-col gap-1">
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const isActive = isDashboardRouteActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 ${
                  isActive
                    ? "bg-foreground/[0.08] font-medium text-foreground"
                    : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground"
                }`}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/[0.03]">
                  <Icon className="h-4 w-4" />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4">
        <div className="flex items-center gap-3">
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt={userName}
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-full border border-foreground/15 object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-foreground/[0.06] text-xs font-semibold">
              {getInitials(userName)}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground/85">{userName}</p>
            <p className="truncate text-xs text-foreground/45">{userEmail}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
