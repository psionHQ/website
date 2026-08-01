"use client";

import { useState } from "react";
import Card from "@/components/cards/Card";
import PageContainer from "@/components/dashboard/PageContainer";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/providers/AuthProvider";

type SettingsTab =
  | "profile"
  | "security"
  | "sessions"
  | "notifications"
  | "preferences";

const TABS: { id: SettingsTab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "sessions", label: "Sessions" },
  { id: "notifications", label: "Notifications" },
  { id: "preferences", label: "Preferences" },
];

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-foreground/70">
      <span>{label}</span>
      <input
        type="text"
        defaultValue={value}
        className="rounded-2xl border border-foreground/15 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-foreground/25 focus:bg-foreground/[0.06]"
      />
    </label>
  );
}

function ProfilePanel({ userName, userEmail }: { userName: string; userEmail: string }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Profile</h2>
        <p className="text-sm leading-relaxed text-foreground/55">
          Profile settings are scaffolded here while Clerk remains the source of truth for authentication.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Display name" value={userName} />
        <Field label="Email address" value={userEmail} />
      </div>
      <Card className="flex items-center justify-between gap-4 p-5" hover={false}>
        <div>
          <h3 className="text-sm font-semibold text-foreground/85">Profile completeness</h3>
          <p className="mt-1 text-sm text-foreground/50">
            Future onboarding prompts and workspace setup can plug into this section.
          </p>
        </div>
        <StatusBadge tone="brand">Ready</StatusBadge>
      </Card>
    </div>
  );
}

function SecurityPanel() {
  const items = [
    {
      title: "Password",
      description: "Managed by Clerk with no custom authentication logic introduced here.",
      action: "Review in auth provider",
    },
    {
      title: "Multi-factor authentication",
      description: "Reserved for additional security controls and challenge state.",
      action: "Planned",
    },
    {
      title: "Recovery options",
      description: "Future recovery and backup workflows can mount inside the same shell.",
      action: "Planned",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Security</h2>
        <p className="text-sm leading-relaxed text-foreground/55">
          Security settings preserve the Clerk-backed auth foundation while preparing room for future platform controls.
        </p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.title} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground/85">{item.title}</h3>
              <p className="mt-1 text-sm text-foreground/50">{item.description}</p>
            </div>
            <StatusBadge tone="neutral">{item.action}</StatusBadge>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SessionsPanel() {
  const sessions = [
    { device: "MacBook Pro", detail: "Chrome • Current session", location: "Berlin, DE" },
    { device: "iPhone", detail: "Safari • 2 hours ago", location: "Berlin, DE" },
    { device: "Linux workstation", detail: "Firefox • Yesterday", location: "Remote" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Sessions</h2>
        <p className="text-sm leading-relaxed text-foreground/55">
          Active session management is modeled now so device controls can attach later without changing the layout.
        </p>
      </div>
      <div className="space-y-3">
        {sessions.map((session) => (
          <Card key={session.device} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground/85">{session.device}</h3>
              <p className="mt-1 text-sm text-foreground/50">{session.detail}</p>
            </div>
            <span className="text-xs text-foreground/45">{session.location}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

function NotificationsPanel() {
  const notifications = [
    {
      title: "AI conversation updates",
      description: "Notify when long-running conversation tasks complete.",
      enabled: true,
    },
    {
      title: "Memory indexing alerts",
      description: "Show readiness and ingestion updates for future memory services.",
      enabled: true,
    },
    {
      title: "Vault access events",
      description: "Alert when secure files are accessed or shared.",
      enabled: false,
    },
    {
      title: "Wallet activity",
      description: "Notify on incoming, outgoing, and scheduled wallet activity.",
      enabled: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Notifications</h2>
        <p className="text-sm leading-relaxed text-foreground/55">
          Notification preferences now share a stable container with future delivery channels and policies.
        </p>
      </div>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card key={notification.title} className="flex items-center justify-between gap-4 p-5">
            <div>
              <h3 className="text-sm font-semibold text-foreground/85">{notification.title}</h3>
              <p className="mt-1 text-sm text-foreground/50">{notification.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notification.enabled}
              className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border transition-colors ${
                notification.enabled
                  ? "border-brand/30 bg-brand/20"
                  : "border-foreground/20 bg-foreground/[0.06]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full transition-transform ${
                  notification.enabled
                    ? "translate-x-[22px] bg-brand"
                    : "translate-x-[3px] bg-foreground/40"
                }`}
              />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PreferencesPanel() {
  const preferences = [
    { label: "Interface density", value: "Comfortable" },
    { label: "Default landing page", value: "Overview" },
    { label: "Time zone", value: "UTC+0" },
    { label: "Theme", value: "PSION Dark" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold tracking-tight">Preferences</h2>
        <p className="text-sm leading-relaxed text-foreground/55">
          Workspace preferences are prepared here for personalization, module defaults, and future platform controls.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {preferences.map((preference) => (
          <Card key={preference.label} className="p-5" hover={false}>
            <p className="text-sm text-foreground/50">{preference.label}</p>
            <p className="mt-2 text-base font-semibold text-foreground/85">{preference.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const { user } = useAuth();

  const userName = user?.name ?? user?.email ?? "User";
  const userEmail = user?.email ?? "user@psionhq.com";

  return (
    <PageContainer>
      <div className="flex gap-2 overflow-x-auto rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-foreground/[0.09] text-foreground"
                : "text-foreground/50 hover:text-foreground/75"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card className="p-6 sm:p-7" hover={false} elevated>
        {activeTab === "profile" ? (
          <ProfilePanel userName={userName} userEmail={userEmail} />
        ) : null}
        {activeTab === "security" ? <SecurityPanel /> : null}
        {activeTab === "sessions" ? <SessionsPanel /> : null}
        {activeTab === "notifications" ? <NotificationsPanel /> : null}
        {activeTab === "preferences" ? <PreferencesPanel /> : null}
      </Card>
    </PageContainer>
  );
}
