"use client";

import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import PageContainer from "@/components/dashboard/PageContainer";

type Tab = "profile" | "security" | "notifications" | "api";

const TABS: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "api", label: "API" },
];

function ProfileTab({ userName, userEmail }: { userName: string; userEmail: string }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold">Personal information</h3>
        <p className="text-sm text-foreground/50">Update your name and email address.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="display-name" className="text-xs font-medium text-foreground/60">
              Display name
            </label>
            <input
              id="display-name"
              type="text"
              defaultValue={userName}
              className="rounded-lg border border-foreground/15 bg-foreground/[0.04] px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground/30 focus:bg-foreground/[0.06]"
              placeholder="Your name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-foreground/60">
              Email address
            </label>
            <input
              id="email"
              type="email"
              defaultValue={userEmail}
              className="rounded-lg border border-foreground/15 bg-foreground/[0.04] px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground/30 focus:bg-foreground/[0.06]"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="flex">
          <button
            type="button"
            className="rounded-lg bg-foreground px-4 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-80"
          >
            Save changes
          </button>
        </div>
      </div>
      <div className="border-t border-foreground/10 pt-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold text-red-400">Danger zone</h3>
          <p className="text-sm text-foreground/50">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <div className="mt-4">
          <button
            type="button"
            className="rounded-lg border border-red-500/30 bg-red-500/[0.06] px-4 py-2 text-xs font-semibold text-red-400 transition-colors hover:border-red-500/50 hover:bg-red-500/10"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold">Authentication</h3>
        <p className="text-sm text-foreground/50">Manage your sign-in methods and two-factor authentication.</p>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { label: "Password", description: "Set via Clerk authentication", action: "Change password" },
          { label: "Two-factor authentication", description: "Add an extra layer of security to your account", action: "Enable 2FA" },
          { label: "Active sessions", description: "Manage devices currently signed in to your account", action: "View sessions" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-foreground/10 p-4"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs text-foreground/50">{item.description}</span>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg border border-foreground/15 px-3 py-1.5 text-xs font-medium text-foreground/70 transition-colors hover:border-foreground/25 hover:text-foreground"
            >
              {item.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab() {
  const notifications = [
    { label: "AI request completed", description: "Notify when an AI inference request finishes", enabled: true },
    { label: "Vault activity", description: "Alert when files in your vault are accessed", enabled: true },
    { label: "Wallet transactions", description: "Notify on incoming and outgoing transactions", enabled: false },
    { label: "Security alerts", description: "Critical alerts for suspicious sign-in attempts", enabled: true },
    { label: "Product updates", description: "New features and platform announcements", enabled: false },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold">Notification preferences</h3>
        <p className="text-sm text-foreground/50">Choose what events you want to be notified about.</p>
      </div>
      <div className="flex flex-col gap-3">
        {notifications.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-xl border border-foreground/10 p-4"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs text-foreground/50">{item.description}</span>
            </div>
            <div
              className={`relative flex h-5 w-9 cursor-pointer items-center rounded-full border transition-colors ${
                item.enabled
                  ? "border-brand bg-brand/20"
                  : "border-foreground/20 bg-foreground/[0.06]"
              }`}
              role="switch"
              aria-checked={item.enabled}
              tabIndex={0}
            >
              <span
                className={`absolute h-3.5 w-3.5 rounded-full transition-transform ${
                  item.enabled ? "translate-x-[18px] bg-brand" : "translate-x-[2px] bg-foreground/40"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function APITab() {
  const keys = [
    { name: "Production key", prefix: "psk_live_****", created: "Jan 12, 2025", lastUsed: "2 min ago" },
    { name: "Development key", prefix: "psk_test_****", created: "Jan 8, 2025", lastUsed: "1 day ago" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm font-semibold">API keys</h3>
          <p className="text-sm text-foreground/50">Manage programmatic access to your PSIONHQ account.</p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-lg bg-foreground px-3 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-80"
        >
          Create key
        </button>
      </div>
      <div className="flex flex-col gap-3">
        {keys.map((key) => (
          <div
            key={key.name}
            className="flex flex-col gap-3 rounded-xl border border-foreground/10 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">{key.name}</span>
              <span className="font-mono text-xs text-foreground/50">{key.prefix}</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-foreground/40">
              <span>Created {key.created}</span>
              <span>Last used {key.lastUsed}</span>
              <button
                type="button"
                className="rounded-lg border border-red-500/20 bg-red-500/[0.04] px-2.5 py-1 text-xs font-medium text-red-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10"
              >
                Revoke
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const { user } = useAuth();

  const userName = user?.name ?? user?.email ?? "User";
  const userEmail = user?.email ?? "";

  return (
    <PageContainer>
      <div className="flex flex-col gap-6">
        <div className="flex gap-1 overflow-x-auto rounded-xl border border-foreground/10 bg-foreground/[0.02] p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-foreground/[0.08] text-foreground"
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6">
          {activeTab === "profile" && <ProfileTab userName={userName} userEmail={userEmail} />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "api" && <APITab />}
        </div>
      </div>
    </PageContainer>
  );
}
