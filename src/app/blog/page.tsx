import Container from "@/components/layout/Container";

export default function BlogPage() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-foreground/60">
          Insights, updates, and deep dives from the PSIONHQ team on AI,
          security, and digital infrastructure.
        </p>
      </Container>
    </section>
  );
}
