import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/layout/Container";
import FooterSection from "@/sections/footer/FooterSection";
import { ARTICLES } from "@/constants/articles";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Link
              href="/blog"
              className="mb-10 inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
            >
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
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              All articles
            </Link>

            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-foreground/15 bg-foreground/[0.04] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/60">
                  {article.category}
                </span>
                <span className="text-xs text-foreground/40">
                  {article.author} · {article.date} · {article.readTime}
                </span>
              </div>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                {article.title}
              </h1>
              <p className="text-lg leading-relaxed text-foreground/60">{article.excerpt}</p>
            </div>

            <div className="mt-12 border-t border-foreground/10 pt-12">
              <p className="text-sm leading-relaxed text-foreground/50">
                Full article coming soon.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <FooterSection />
    </>
  );
}
