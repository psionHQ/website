"use client";

import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-1",
    role: "assistant",
    content: "Hey! I've got context from your Memory and recent Ideas. What would you like to explore or build today?",
    timestamp: "Just now",
  },
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;

    setSending(true);
    setMessages((prev) => [
      ...prev,
      { id: `msg-${Date.now()}`, role: "user", content: text, timestamp: "Just now" },
    ]);
    setDraft("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-resp`,
          role: "assistant",
          content:
            "That's an interesting direction. Based on your saved Memory about platform architecture and the Ideas you captured, we could approach this by...",
          timestamp: "Just now",
        },
      ]);
      setSending(false);
    }, 1200);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="border-b border-foreground/10 bg-background/95 px-6 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="rounded-lg p-1 hover:bg-foreground/5">
              <svg className="h-5 w-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm font-medium text-foreground/60">PSIONHQ</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-foreground/15 bg-foreground/[0.03] px-3 py-1.5">
              <p className="text-xs font-medium text-brand">450 PSI</p>
            </div>
            <button className="rounded-lg p-1 hover:bg-foreground/5">
              <svg className="h-5 w-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto max-w-2xl space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs rounded-2xl px-5 py-3 ${
                  msg.role === "user"
                    ? "bg-brand text-white"
                    : "border border-foreground/10 bg-foreground/[0.03] text-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="border border-foreground/10 bg-foreground/[0.03] rounded-2xl px-5 py-3">
                <p className="text-sm text-foreground/50">Thinking…</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-foreground/10 bg-background/95 px-6 py-6 backdrop-blur">
        <form onSubmit={handleSend} className="mx-auto max-w-2xl">
          <div className="flex gap-3">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={sending}
              placeholder="Message PSIONHQ…"
              className="flex-1 rounded-full border border-foreground/15 bg-foreground/[0.04] px-5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-brand/50 focus:bg-foreground/[0.06] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!draft.trim() || sending}
              className="rounded-full bg-brand p-3 text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
