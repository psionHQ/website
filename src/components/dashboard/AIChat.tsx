"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { DASHBOARD_ROUTES } from "@/constants/routes";

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

const MAX_TEXTAREA_HEIGHT = 200;

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [webSearch, setWebSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setAttachments((prev) => [...prev, ...Array.from(files).map((f) => f.name)]);
    setMenuOpen(false);
    e.target.value = "";
  };

  const removeAttachment = (name: string) => {
    setAttachments((prev) => prev.filter((a) => a !== name));
  };

  const sendMessage = () => {
    const text = draft.trim();
    if ((!text && attachments.length === 0) || sending) return;

    const attachmentNote = attachments.length
      ? `\n\n[Attached: ${attachments.join(", ")}]`
      : "";

    setSending(true);
    setMessages((prev) => [
      ...prev,
      { id: `msg-${Date.now()}`, role: "user", content: text + attachmentNote, timestamp: "Just now" },
    ]);
    setDraft("");
    setAttachments([]);
    requestAnimationFrame(resizeTextarea);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-resp`,
          role: "assistant",
          content: webSearch
            ? "Searching the web and combining that with your saved Memory and Ideas context…"
            : "That's an interesting direction. Based on your saved Memory about platform architecture and the Ideas you captured, we could approach this by...",
          timestamp: "Just now",
        },
      ]);
      setSending(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <header className="border-b border-foreground/10 bg-background/95 px-6 py-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={DASHBOARD_ROUTES.overview}
              aria-label="Back to dashboard"
              className="rounded-lg p-1 text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Link>
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
                className={`max-w-xs rounded-2xl px-5 py-3 sm:max-w-md ${
                  msg.role === "user"
                    ? "bg-brand text-white"
                    : "border border-foreground/10 bg-foreground/[0.03] text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
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
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          {attachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {attachments.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/[0.05] px-3 py-1 text-xs text-foreground/70"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() => removeAttachment(name)}
                    className="text-foreground/40 hover:text-foreground/80"
                    aria-label={`Remove ${name}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="relative flex items-end gap-2 rounded-3xl border border-foreground/15 bg-foreground/[0.04] px-3 py-2 transition-colors focus-within:border-brand/50 focus-within:bg-foreground/[0.06]">
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="mb-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground/60 transition-colors hover:border-foreground/30 hover:text-foreground"
                aria-label="Add attachment or tools"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute bottom-11 left-0 w-56 rounded-2xl border border-foreground/10 bg-background shadow-xl">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center gap-3 rounded-t-2xl px-4 py-3 text-left text-sm text-foreground/80 hover:bg-foreground/[0.05]"
                  >
                    <svg className="h-4 w-4 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4v16m8-8H4" />
                    </svg>
                    Add files
                  </button>
                  <div className="flex items-center justify-between px-4 py-3 text-sm text-foreground/80">
                    <span className="flex items-center gap-3">
                      <svg className="h-4 w-4 text-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
                        <path strokeWidth="1.75" strokeLinecap="round" d="M3 12h18M12 3c2.5 2.7 2.5 14.3 0 18M12 3c-2.5 2.7-2.5 14.3 0 18" />
                      </svg>
                      Web search
                    </span>
                    <button
                      type="button"
                      onClick={() => setWebSearch((v) => !v)}
                      className={`relative h-5 w-9 rounded-full transition-colors ${webSearch ? "bg-brand" : "bg-foreground/15"}`}
                      aria-pressed={webSearch}
                      aria-label="Toggle web search"
                    >
                      <span
                        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                          webSearch ? "translate-x-4" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                resizeTextarea();
              }}
              onKeyDown={handleKeyDown}
              disabled={sending}
              placeholder="Message PSIONHQ…"
              rows={1}
              className="max-h-[200px] flex-1 resize-none bg-transparent py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={(!draft.trim() && attachments.length === 0) || sending}
              className="mb-1 shrink-0 rounded-full bg-brand p-2.5 text-white transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>

          <p className="mt-2 text-center text-xs text-foreground/30">
            Enter to send · Shift + Enter for a new line
          </p>
        </form>
      </div>
    </div>
  );
}
