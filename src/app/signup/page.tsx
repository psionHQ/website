import type { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "@/components/forms/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | PSIONHQ",
  description: "Create a PSIONHQ account to start building with secure AI and digital infrastructure.",
};

export default function SignUpPage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            PSIONHQ
          </Link>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
            <p className="text-sm text-foreground/60">
              Start building with secure AI and digital infrastructure.
            </p>
          </div>
        </div>
        <SignUpForm />
      </div>
    </section>
  );
}
