import Container from "@/components/layout/Container";

export default function DashboardPage() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-4 text-lg text-foreground/60">
          Manage your PSIONHQ services, monitor usage, and configure your
          account from one place.
        </p>
      </Container>
    </section>
  );
}
