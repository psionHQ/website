"use client";

import { useState } from "react";
import Link from "next/link";

interface Tier {
  name: string;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  priceSuffix: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Free",
    description: "For individuals exploring sovereign infrastructure.",
    monthlyPrice: 0,
    annualPrice: 0,
    priceSuffix: "/mo",
    features: [
      "1 user",
      "1GB encrypted vault",
      "100 AI calls / month",
      "Community support",
    ],
    cta: { label: "Get started", href: "/signup" },
  },
  {
    name: "Pro",
    description: "For teams shipping production applications.",
    monthlyPrice: 29,
    annualPrice: 23,
    priceSuffix: "/mo",
    features: [
      "5 users",
      "50GB encrypted vault",
      "10,000 AI calls / month",
      "Email support",
      "Full API access",
    ],
    cta: { label: "Start free trial", href: "/signup" },
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For organisations with dedicated infrastructure needs.",
    monthlyPrice: null,
    annualPrice: null,
    priceSuffix: "",
    features: [
      "Unlimited users",
      "Dedicated infrastructure",
      "SSO & advanced access controls",
      "Custom SLA",
      "Custom AI model hosting",
    ],
    cta: { label: "Talk to sales", href: "/contact" },
  },
];

const COMPARISON_FEATURES: { label: string; free: string; pro: string; enterprise: string }[] = [
  { label: "Users", free: "1", pro: "5", enterprise: "Unlimited" },
  { label: "Vault storage", free: "1GB", pro: "50GB", enterprise: "Custom" },
  { label: "AI calls / month", free: "100", pro: "10,000", enterprise: "Custom" },
  { label: "API access", free: "—", pro: "Full", enterprise: "Full" },
  { label: "SSO", free: "—", pro: "—", enterprise: "Included" },
  { label: "SLA", free: "—", pro: "—", enterprise: "Custom" },
  { label: "Support", free: "Community", pro: "Email", enterprise: "Dedicated" },
];

export default function PricingCards() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-center gap-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-foreground/15 bg-foreground/[0.03] p-1">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              !annual ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              annual ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Annual
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                annual ? "bg-background/20 text-background" : "bg-foreground/10 text-foreground/60"
              }`}
            >
              Save 20%
            </span>
          </button>
        </div>

        <div className="grid w-full gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const price = annual ? tier.annualPrice : tier.monthlyPrice;
            return (
              <div
                key={tier.name}
                className={`flex flex-col gap-6 rounded-2xl border p-8 ${
                  tier.highlighted
                    ? "border-foreground/30 bg-foreground/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                    : "border-foreground/10 bg-foreground/[0.02]"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{tier.name}</h3>
                    {tier.highlighted && (
                      <span className="rounded-full border border-foreground/20 bg-foreground/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/70">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/60">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  {price === null ? (
                    <span className="text-4xl font-semibold tracking-tight">Custom</span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold tracking-tight">${price}</span>
                      <span className="text-sm text-foreground/50">{tier.priceSuffix}</span>
                    </>
                  )}
                </div>

                <Link
                  href={tier.cta.href}
                  className={
                    tier.highlighted
                      ? "inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80"
                      : "inline-flex h-11 w-full items-center justify-center rounded-full border border-foreground/20 px-7 text-sm font-medium transition-colors hover:border-foreground/40 hover:bg-foreground/[0.04]"
                  }
                >
                  {tier.cta.label}
                </Link>

                <ul className="flex flex-col gap-3" role="list">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-foreground/[0.03]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={10}
                          height={10}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Compare plans
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-foreground/10">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-foreground/10 bg-foreground/[0.02]">
                <th className="p-4 font-semibold text-foreground/70">Feature</th>
                <th className="p-4 font-semibold text-foreground/70">Free</th>
                <th className="p-4 font-semibold text-foreground/70">Pro</th>
                <th className="p-4 font-semibold text-foreground/70">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((row) => (
                <tr key={row.label} className="border-b border-foreground/10 last:border-0">
                  <td className="p-4 font-medium text-foreground/80">{row.label}</td>
                  <td className="p-4 text-foreground/60">{row.free}</td>
                  <td className="p-4 text-foreground/60">{row.pro}</td>
                  <td className="p-4 text-foreground/60">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
