"use client";

import { useState } from "react";
import Card from "@/components/cards/Card";
import StatusBadge from "@/components/dashboard/StatusBadge";

interface Idea {
  id: string;
  text: string;
  timestamp: string;
}

const INITIAL_IDEAS: Idea[] = [
  { id: "idea-3", text: "What if the agent could summarize a whole month of ideas into three themes automatically?", timestamp: "2 days ago" },
  { id: "idea-2", text: "Add a lightweight referral loop — PSI reward for inviting a friend who tops up.", timestamp: "1 week ago" },
  { id: "idea-1", text: "Explore a weekly digest email pulling from Memory + Ideas together.", timestamp: "2 weeks ago" },
];

export default function IdeasCard() {
  const [ideas, setIdeas] = useState<Idea[]>(INITIAL_IDEAS);
  const [draft, setDraft] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setIdeas((prev) => [
      { id: `idea-${Date.now()}`, text, timestamp: "Just now" },
      ...prev,
    ]);
    setDraft("");
    setAnalysis(null);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setAnalysis(null);
    // Backend agent integration pending — this simulates the eventual summary flow
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysis(
        `Across ${ideas.length} entries, a pattern is forming around connecting existing modules together (Memory, Wallet, notifications) rather than building isolated features. Once the AI agent is connected, this summary will be generated from your real notebook.`
      );
    }, 1400);
  };

  return (
    <Card className="flex flex-col gap-6 p-6" elevated>
      <form onSubmit={handleAdd} className="space-y-3">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write down whatever just came to mind…"
          rows={3}
          className="w-full resize-none rounded-2xl border border-foreground/15 bg-foreground/[0.04] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-brand/50 focus:bg-foreground/[0.06]"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!draft.trim()}
            className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save idea
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/35">
          {ideas.length} saved {ideas.length === 1 ? "idea" : "ideas"}
        </p>
        <button
          onClick={handleAnalyze}
          disabled={analyzing || ideas.length === 0}
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:border-brand/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          {analyzing ? "Analyzing…" : "Analyze with Agent"}
        </button>
      </div>

      {(analysis || analyzing) && (
        <div className="rounded-2xl border border-brand/25 bg-brand/[0.06] p-5">
          <div className="mb-2 flex items-center gap-2">
            <StatusBadge tone="brand">Agent summary</StatusBadge>
          </div>
          <p className="text-sm leading-relaxed text-foreground/75">
            {analyzing ? "Reading through your notebook…" : analysis}
          </p>
        </div>
      )}

      <div className="relative pl-6">
        <span className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-foreground/20 via-foreground/10 to-transparent" />
        <div className="space-y-5">
          {ideas.map((idea) => (
            <div key={idea.id} className="relative">
              <span className="absolute -left-6 top-1.5 h-[9px] w-[9px] rounded-full bg-brand shadow-[0_0_10px_2px_rgba(0,102,255,0.5)]" />
              <p className="text-sm text-foreground/85">{idea.text}</p>
              <p className="mt-0.5 text-xs text-foreground/40">{idea.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
