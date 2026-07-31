import Container from "@/components/layout/Container";

export default function DevelopersPage() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">Developers</h1>
        <p className="mt-4 text-lg text-foreground/60">
          Access documentation, SDKs, and resources to integrate PSIONHQ into
          your applications.
        </p>
      </Container>
    </section>
  );
}
