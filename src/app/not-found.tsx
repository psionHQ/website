import Link from "next/link";
import Container from "@/components/layout/Container";
import FooterSection from "@/sections/footer/FooterSection";

export default function NotFound() {
  return (
    <>
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-20">
        <Container>
          <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            <p className="font-mono text-sm text-[#0066FF]">404</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Page not found
            </h1>
            <p className="text-base text-foreground/60">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0066FF] px-7 text-sm font-medium text-white transition-colors hover:bg-[#0040CC]"
            >
              Back to home
            </Link>
          </div>
        </Container>
      </section>
      <FooterSection />
    </>
  );
}
