import Container from "@/components/layout/Container";

export default function GlobalLoading() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="h-4 w-28 animate-pulse rounded-full bg-foreground/10" />
          <div className="h-10 w-full max-w-2xl animate-pulse rounded-xl bg-foreground/10" />
          <div className="h-6 w-full max-w-3xl animate-pulse rounded-xl bg-foreground/10" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-36 animate-pulse rounded-2xl border border-foreground/10 bg-foreground/[0.03]" />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
