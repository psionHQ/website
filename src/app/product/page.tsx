import Container from "@/components/layout/Container";

export default function ProductPage() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">Product</h1>
        <p className="mt-4 text-lg text-foreground/60">
          Explore the full suite of PSIONHQ products built for secure AI and
          digital infrastructure.
        </p>
      </Container>
    </section>
  );
}
