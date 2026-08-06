"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend integration pending — see docs/Development.md
    setSubmitted(true);
  };

  return (
    <main className="bg-black text-white min-h-screen flex items-center">
      <Container>
        <div className="max-w-sm mx-auto py-20 sm:py-24">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Reset your password
          </h1>
          <p className="text-foreground/60 mb-10">
            Enter the email associated with your account and we&apos;ll send
            you a link to reset your password.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6">
              <p className="text-sm text-foreground/80">
                If an account exists for{" "}
                <span className="text-white font-medium">{email}</span>,
                you&apos;ll receive a reset link shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground/70 mb-2"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-foreground/10 bg-foreground/[0.02] px-5 py-3 text-white placeholder:text-foreground/30 focus:outline-none focus:border-[#0066FF] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#0066FF] hover:bg-[#0040CC] text-white font-medium py-3 transition-colors"
              >
                Send reset link
              </button>
            </form>
          )}

          <p className="text-sm text-foreground/50 mt-8">
            Remembered your password?{" "}
            <Link href="/signin" className="text-[#0066FF] hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
