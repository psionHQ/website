"use client";

import { useState } from "react";
import Card from "@/components/cards/Card";
import StatusBadge from "@/components/dashboard/StatusBadge";

type View = "collections" | "timeline";

interface Collection {
  title: string;
  description: string;
  count: string;
}

interface TimelineEntry {
  id: string;
  title: string;
  category: string;
  status: string;
  tone: "positive" | "warning" | "neutral";
  timestamp: string;
}

const COLLECTIONS: Collection[] = [
  { title: "Strategy", description: "Long-term planning, priorities, and roadmap decisions.", count: "42" },
  { title: "Research", description: "Captured findings, sources, and verified references.", count: "31" },
  { title: "Preferences", description: "User-facing defaults, workflow choices, and tone guidance.", count: "19" },
  { title: "Projects", description: "Repository-specific context grouped for future execution.", count: "32" },
];

const TIMELINE: TimelineEntry[] = [
  { id: "memory-1", title: "Saved implementation report preference", category: "Preferences", status: "Stored", tone: "positive", timestamp: "Today • 11:42" },
  { id: "memory-2", title: "Captured dashboard architecture milestone", category: "Projects", status: "Indexed", tone: "neutral", timestamp: "Today • 10:08" },
  { id: "memory-3", title: "Queued vault taxonomy review", category: "Research", status: "Pending", tone: "warning", timestamp: "Yesterday • 16:20" },
];

const TONE_DOT: Record<TimelineEntry["tone"], string> = {
  positive: "bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]",
  warning: "bg-amber-400 shadow-[0_0_10px_2px_rgba(251,191,36,0.5)]",
  neutral: "bg-brand shadow-[0_0_10px_2px_rgba(0,102,255,0.5)]",
};

function SearchIcon() {
  return (
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
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function MemoryCard() {
  const [view, setView] = useState<View>("collections");
  const [query, setQuery] = useState("");

  return (
    <Card className="flex flex-col gap-6 p-6" elevated>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/35">
          <SearchIcon />
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your memory"
          className="w-full rounded-2xl border border-foreground/15 bg-foreground/[0.04] py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-brand/50 focus:bg-foreground/[0.06]"
        />
      </div>

      <div className="inline-flex w-fit rounded-full border border-foreground/10 bg-foreground/[0.03] p-1">
        <button
          onClick={() => setView("collections")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            view === "collections"
              ? "bg-brand text-white"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          Collections
        </button>
        <button
          onClick={() => setView("timeline")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            view === "timeline"
              ? "bg-brand text-white"
              : "text-foreground/60 hover:text-foreground"
          }`}
        >
          Timeline
        </button>
      </div>

      {view === "collections" && (
        <div className="grid gap-3 sm:grid-cols-2">
          {COLLECTIONS.filter((c) =>
            c.title.toLowerCase().includes(query.toLowerCase())
          ).map((collection) => (
            <div
              key={collection.title}
              className="group relative flex flex-col gap-2 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5 transition-colors hover:border-brand/30"
            >
              <span className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-brand via-brand/60 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground/90">{collection.title}</h3>
                <span className="text-xl font-semibold tracking-tight text-brand">{collection.count}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/50">{collection.description}</p>
            </div>
          ))}
        </div>
      )}

      {view === "timeline" && (
        <div className="relative pl-6">
          <span className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent" />
          <div className="space-y-5">
            {TIMELINE.map((entry) => (
              <div key={entry.id} className="relative">
                <span
                  className={`absolute -left-6 top-1.5 h-[9px] w-[9px] rounded-full ${TONE_DOT[entry.tone]}`}
                />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-foreground/85">{entry.title}</p>
                    <p className="text-xs text-foreground/40">{entry.category} · {entry.timestamp}</p>
                  </div>
                  <StatusBadge tone={entry.tone}>{entry.status}</StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
