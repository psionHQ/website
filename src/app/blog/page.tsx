import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/layout/Container";
import PageHero from "@/components/ui/PageHero";
import BlogFilter from "@/components/blog/BlogFilter";
import FooterSection from "@/sections/footer/FooterSection";

export const metadata: Metadata = {
  title: "Blog | PSIONHQ",
  description:
    "Deep dives on AI security, sovereign infrastructure, privacy engineering, and the future of digital identity.",
};

const FEATURED_ARTICLE = {
  slug: "the-case-for-sovereign-ai",
  category: "AI",
  title: "The case for sovereign AI: why control should never leave your hands",
  excerpt:
    "As AI becomes core infrastructure, the question isn't whether you can access powerful models — it's whether you control what happens to your data once you do. We break down the architecture choices that let PSION AI deliver frontier-grade inference without asking for your trust in return.",
  date: "Jul 26, 2026",
  author: "Amara Osei",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights from the PSION team"
        subtitle="Deep dives on AI security, sovereign infrastructure, privacy engineering, and the future of digital identity."
      />

      <section className="py-8 sm:py-12">
        <Container>
          <Link
            href={`/blog/${FEATURED_ARTICLE.slug}`}
            className="group flex flex-col gap-6 rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-8 transition-colors hover:border-foreground/20 hover:bg-foreground/[0.05] sm:p-12"
          >
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-foreground/20 bg-foreground/[0.06] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/70">
                Featured
              </span>
              <span className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/60">
                {FEATURED_ARTICLE.category}
              </span>
            </div>
            <h2 className="max-w-3xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              {FEATURED_ARTICLE.title}
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-foreground/60 sm:text-base">
              {FEATURED_ARTICLE.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground/45">
                {FEATURED_ARTICLE.author} · {FEATURED_ARTICLE.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-foreground/70">
                Read
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={14}
                  height={14}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        </Container>
      </section>

      <section className="py-8 sm:py-12">
        <Container>
          <BlogFilter />
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-32">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-8 py-14 sm:px-12 lg:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/4 rounded-full bg-foreground/[0.06] blur-[80px]" />
            </div>
            <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Get new posts in your inbox
              </h2>
              <p className="text-base text-foreground/60">
                No spam, ever. Just deep dives on security, identity, and sovereign AI —
                delivered a couple of times a month.
              </p>
              <form className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="h-11 flex-1 rounded-full border border-foreground/15 bg-background px-5 text-sm outline-none placeholder:text-foreground/40 focus:border-foreground/40"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      <FooterSection />
    </>
  );
}
