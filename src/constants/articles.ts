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
    slug: "the-case-for-sovereign-ai",
    category: "AI",
    title: "The case for sovereign AI: why control should never leave your hands",
    excerpt:
      "As AI becomes core infrastructure, the question isn't whether you can access powerful models — it's whether you control what happens to your data once you do. We break down the architecture choices that let PSIONHQ AI deliver frontier-grade inference without asking for your trust in return.",
    date: "Jul 26, 2026",
    author: "Amara Osei",
    readTime: "6 min read",
  },
];
