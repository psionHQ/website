"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Card from "@/components/cards/Card";
import StatusBadge from "@/components/dashboard/StatusBadge";

type View = "none" | "topup" | "send" | "receive" | "history";
type TopUpMethod = "USDT" | "USDC" | "PayPal";

interface Transaction {
  id: string;
  type: "sent" | "received" | "topup" | "usage";
  counterparty: string;
  amount: string;
  timestamp: string;
}

const MOCK_HISTORY: Transaction[] = [
  { id: "tx-1", type: "received", counterparty: "@maya.chen.psionhq", amount: "50 PSI", timestamp: "Today • 09:12" },
  { id: "tx-2", type: "usage", counterparty: "AI agent request", amount: "3 PSI", timestamp: "Today • 08:55" },
  { id: "tx-3", type: "topup", counterparty: "USDT deposit", amount: "100 PSI", timestamp: "Yesterday • 20:10" },
  { id: "tx-4", type: "sent", counterparty: "@james.r.psionhq", amount: "12 PSI", timestamp: "Yesterday • 18:40" },
];

const USER_ID = "@your.psionhq";

export default function WalletBalanceCard() {
  const [view, setView] = useState<View>("none");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [sent, setSent] = useState(false);
  const [topUpMethod, setTopUpMethod] = useState<TopUpMethod>("USDT");
  const [topUpAmount, setTopUpAmount] = useState("");
  const [topUpSubmitted, setTopUpSubmitted] = useState(false);

  const openView = (next: View) => {
    setView(next);
    setSent(false);
    setTopUpSubmitted(false);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleTopUpConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setTopUpSubmitted(true);
  };

  return (
    <Card className="flex flex-col gap-6 p-6" elevated>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-foreground/50">Your balance</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-semibold tracking-tight">0</span>
            <span className="text-sm font-medium text-brand">PSI</span>
          </div>
          <p className="mt-1 text-xs text-foreground/40">1 PSI = 1 USDT = 1 USDC = $1</p>
        </div>
        <StatusBadge tone="neutral">Mock mode</StatusBadge>
      </div>

      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => openView("topup")}
          className="rounded-full bg-brand py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-deep sm:text-sm"
        >
          Top up
        </button>
        <button
          onClick={() => openView("send")}
          className="rounded-full border border-foreground/15 py-2.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground sm:text-sm"
        >
          Send
        </button>
        <button
          onClick={() => openView("receive")}
          className="rounded-full border border-foreground/15 py-2.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground sm:text-sm"
        >
          Receive
        </button>
        <button
          onClick={() => openView("history")}
          className="rounded-full border border-foreground/15 py-2.5 text-xs font-medium text-foreground/80 transition-colors hover:border-foreground/25 hover:text-foreground sm:text-sm"
        >
          History
        </button>
      </div>

      {view === "topup" && (
        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5">
          {topUpSubmitted ? (
            <p className="text-sm text-foreground/70">
              We&apos;ll credit {topUpAmount || "0"} PSI to your balance once the {topUpMethod} payment is confirmed. This usually takes a few minutes.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex gap-2">
                {(["USDT", "USDC", "PayPal"] as TopUpMethod[]).map((method) => (
                  <button
                    key={method}
                    onClick={() => setTopUpMethod(method)}
                    className={`flex-1 rounded-xl border py-2 text-sm font-medium transition-colors ${
                      topUpMethod === method
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-foreground/10 text-foreground/60 hover:border-foreground/20"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <form onSubmit={handleTopUpConfirm} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm text-foreground/60">Amount (PSI)</label>
                  <input
                    value={topUpAmount}
                    onChange={(e) => setTopUpAmount(e.target.value)}
                    placeholder="0"
                    inputMode="decimal"
                    className="w-full rounded-xl border border-foreground/10 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand"
                  />
                </div>

                {topUpMethod !== "PayPal" ? (
                  <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">
                    <p className="text-xs text-foreground/50">Send {topUpMethod} to</p>
                    <p className="mt-1 break-all font-mono text-sm text-foreground/85">
                      TXpsionHQdepositAddress0000000
                    </p>
                    <p className="mt-2 text-xs text-foreground/40">Network: TRC20 · Deposits are matched automatically</p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4">
                    <p className="text-xs text-foreground/50">Send PayPal payment to</p>
                    <p className="mt-1 text-sm text-foreground/85">payments@psionhq.com</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
                >
                  I&apos;ve sent the payment
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {view === "send" && (
        <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5">
          {sent ? (
            <p className="text-sm text-foreground/70">
              Transfer of {amount || "0"} PSI to {recipient || "recipient"} is queued. Real transfers activate once backend balances are connected.
            </p>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-foreground/60">Recipient (PSIONHQ ID)</label>
                <input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="@username.psionhq"
                  className="w-full rounded-xl border border-foreground/10 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-foreground/60">Amount (PSI)</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  inputMode="decimal"
                  className="w-full rounded-xl border border-foreground/10 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-brand"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deep"
              >
                Send PSI
              </button>
            </form>
          )}
        </div>
      )}

      {view === "receive" && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6">
          <div className="rounded-2xl bg-white p-3">
            <QRCodeSVG value={`psionhq:receive:${USER_ID}`} size={160} />
          </div>
          <div className="text-center">
            <p className="text-sm text-foreground/60">Share this ID to receive PSI</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-brand">{USER_ID}</p>
          </div>
          <p className="text-center text-xs text-foreground/40">
            Real IDs will map to authenticated accounts once wired to backend.
          </p>
        </div>
      )}

      {view === "history" && (
        <div className="space-y-2">
          {MOCK_HISTORY.map((tx) => {
            const isPositive = tx.type === "received" || tx.type === "topup";
            const label =
              tx.type === "received" ? "Received from" :
              tx.type === "sent" ? "Sent to" :
              tx.type === "topup" ? "Top up via" :
              "Spent on";
            return (
              <div
                key={tx.id}
                className="flex items-center justify-between rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3"
              >
                <div>
                  <p className="text-sm text-foreground/80">
                    {label} {tx.counterparty}
                  </p>
                  <p className="text-xs text-foreground/40">{tx.timestamp}</p>
                </div>
                <span className={`text-sm font-medium ${isPositive ? "text-emerald-400" : "text-foreground/60"}`}>
                  {isPositive ? "+" : "-"}{tx.amount}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
