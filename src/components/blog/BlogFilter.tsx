"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { type Article, ARTICLES } from "@/constants/articles";

const CATEGORIES = ["All", "AI", "Security", "Identity", "Engineering"] as const;

export default function BlogFilter() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo<Article[]>(
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
