"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
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
    label: "AI Inference",
    href: "/dashboard/ai",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "Vault",
    href: "/dashboard/vault",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: "Wallet",
    href: "/dashboard/wallet",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    label: "Identity",
    href: "/dashboard/identity",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "API Keys",
    href: "/dashboard/api-keys",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const STATS = [
  { label: "AI Calls This Month", value: "2,847" },
  { label: "Vault Items", value: "143" },
  { label: "Identity Claims", value: "12" },
  { label: "API Keys", value: "3" },
];

interface ActivityRow {
  event: string;
  type: string;
  status: "Success" | "Pending" | "Failed";
  time: string;
}

const ACTIVITY: ActivityRow[] = [
  { event: "AI inference request", type: "AI", status: "Success", time: "2 min ago" },
  { event: "Vault document accessed", type: "Vault", status: "Success", time: "18 min ago" },
  { event: "New API key issued", type: "API", status: "Success", time: "1 hr ago" },
  { event: "Credential verification", type: "Identity", status: "Pending", time: "3 hrs ago" },
  { event: "Wallet transfer signed", type: "Wallet", status: "Failed", time: "1 day ago" },
];

const STATUS_CLASSES: Record<ActivityRow["status"], string> = {
  Success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  Pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  Failed: "border-red-500/30 bg-red-500/10 text-red-400",
};

const QUICK_ACTIONS = [
  {
    label: "New AI Query",
    description: "Run a private inference request against any hosted model.",
    href: "/dashboard/ai",
  },
  {
    label: "Upload to Vault",
    description: "Encrypt and store a new document in your vault.",
    href: "/dashboard/vault",
  },
  {
    label: "Issue Credential",
    description: "Create a new verifiable credential for a user or service.",
    href: "/dashboard/identity",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function DashboardShell() {
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userName = user?.name ?? user?.email ?? "User";
  const userEmail = user?.email ?? "";
  const userAvatar = user?.avatarUrl;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-foreground/10 p-6 lg:flex">
        <div className="flex flex-col gap-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            PSIONHQ
          </Link>
          <nav className="flex flex-col gap-1" role="list">
            {NAV_ITEMS.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  index === 0
                    ? "bg-foreground/[0.06] font-medium text-foreground"
                    : "text-foreground/60 hover:bg-foreground/[0.04] hover:text-foreground"
                }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            ))}
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

      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground/60 transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  aria-expanded={userMenuOpen}
                  className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-foreground/15 bg-foreground/[0.06] text-xs font-semibold"
                >
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt={userName}
                      width={36}
                      height={36}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials(userName)
                  )}
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-11 z-10 flex w-44 flex-col gap-1 rounded-xl border border-foreground/10 bg-background p-2 shadow-lg">
                    <Link
                      href="/dashboard/settings"
                      className="rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/[0.04]"
                    >
                      Settings
                    </Link>
                    <button
                      type="button"
                      onClick={() => { void logout(); }}
                      className="rounded-lg px-3 py-2 text-left text-sm text-foreground/70 hover:bg-foreground/[0.04]"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5"
              >
                <span className="text-xs text-foreground/50">{stat.label}</span>
                <span className="text-2xl font-semibold tracking-tight">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Recent activity</h2>
            <div className="overflow-x-auto rounded-2xl border border-foreground/10">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                    <th className="p-4 font-semibold text-foreground/70">Event</th>
                    <th className="p-4 font-semibold text-foreground/70">Type</th>
                    <th className="p-4 font-semibold text-foreground/70">Status</th>
                    <th className="p-4 font-semibold text-foreground/70">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {ACTIVITY.map((row) => (
                    <tr key={row.event} className="border-b border-foreground/10 last:border-0">
                      <td className="p-4 text-foreground/80">{row.event}</td>
                      <td className="p-4">
                        <span className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-0.5 text-xs text-foreground/60">
                          {row.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs ${STATUS_CLASSES[row.status]}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 text-foreground/50">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold tracking-tight">Quick actions</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.04]"
                >
                  <h3 className="text-sm font-semibold">{action.label}</h3>
                  <p className="text-sm leading-relaxed text-foreground/60">
                    {action.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
