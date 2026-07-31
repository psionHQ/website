import type { Metadata } from "next";
import Link from "next/link";
import SignInForm from "@/components/forms/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your PSIONHQ account to access your dashboard and services.",
};

export default function SignInPage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            PSIONHQ
          </Link>
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-foreground/60">Sign in to your account</p>
          </div>
        </div>
        <SignInForm />
      </div>
    </section>
  );
}
