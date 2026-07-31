"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export interface Article {
  slug: string;
  category: "AI" | "Security" | "Identity" | "Engineering";
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "confidential-inference-at-scale",
    category: "AI",
    title: "Confidential inference at scale: lessons from running LLMs inside TEEs",
    excerpt:
      "What we learned scaling encrypted model inference across thousands of concurrent sessions without ever exposing plaintext prompts.",
    date: "Jul 18, 2026",
    author: "Priya Nair",
    readTime: "8 min read",
  },
  {
    slug: "zero-knowledge-vaults-explained",
    category: "Security",
    title: "Zero-knowledge vaults, explained",
    excerpt:
      "A practical walkthrough of how PSION Vault ensures that even we can't read your encrypted documents.",
    date: "Jul 2, 2026",
    author: "Marcus Alden",
    readTime: "6 min read",
  },
  {
    slug: "portable-credentials-future",
    category: "Identity",
    title: "Why portable credentials are the future of digital identity",
    excerpt:
      "Centralised identity providers create single points of failure. Here's how decentralised credentials fix that.",
    date: "Jun 24, 2026",
    author: "Amara Osei",
    readTime: "7 min read",
  },
  {
    slug: "building-type-safe-sdks",
    category: "Engineering",
    title: "Building type-safe SDKs across five languages",
    excerpt:
      "How we keep our TypeScript, Python, Go, and Rust SDKs consistent using a shared schema pipeline.",
    date: "Jun 10, 2026",
    author: "Daniel Kwan",
    readTime: "10 min read",
  },
  {
    slug: "hardware-attestation-primer",
    category: "Security",
    title: "A primer on hardware attestation and why it matters",
    excerpt:
      "Trusted execution environments are only as strong as their attestation. Here's what to look for.",
    date: "May 29, 2026",
    author: "Marcus Alden",
    readTime: "9 min read",
  },
  {
    slug: "fine-tuning-without-leaking-data",
    category: "AI",
    title: "Fine-tuning models without ever leaking your training data",
    excerpt:
      "The architecture behind PSION AI's private fine-tuning pipeline, and the guarantees it provides.",
    date: "May 14, 2026",
    author: "Priya Nair",
    readTime: "8 min read",
  },
  {
    slug: "selective-disclosure-credentials",
    category: "Identity",
    title: "Selective disclosure: proving facts without revealing data",
    excerpt:
      "How verifiable credentials let you prove you're over 18 without ever sharing your birthdate.",
    date: "Apr 30, 2026",
    author: "Sofia Rentería",
    readTime: "5 min read",
  },
];

const CATEGORIES = ["All", "AI", "Security", "Identity", "Engineering"] as const;

export default function BlogFilter() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? ARTICLES : ARTICLES.filter((article) => article.category === active)),
    [active],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            aria-pressed={active === category}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === category
                ? "border-foreground/30 bg-foreground text-background"
                : "border-foreground/15 text-foreground/60 hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.04]"
          >
            <span className="w-fit rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/60">
              {article.category}
            </span>
            <h3 className="text-base font-semibold leading-snug tracking-tight">
              {article.title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/60">{article.excerpt}</p>
            <div className="mt-auto flex items-center justify-between text-xs text-foreground/45">
              <span>{article.author}</span>
              <span>
                {article.date} · {article.readTime}
              </span>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-foreground/50">
            No articles in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
