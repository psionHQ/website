import Container from "@/components/layout/Container";

export default function SignInPage() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">Sign In</h1>
        <p className="mt-4 text-lg text-foreground/60">
          Sign in to your PSIONHQ account to access your dashboard and services.
        </p>
      </Container>
    </section>
  );
}
