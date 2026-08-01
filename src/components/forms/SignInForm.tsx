"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { FORM_INPUT_CLASSNAMES } from "@/constants/forms";
import { EyeIcon } from "@/components/forms/FormIcons";
import OAuthButtons from "@/components/forms/OAuthButtons";
import { validateSignInInput } from "@/lib/validation";

export default function SignInForm() {
  const { signIn } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const errors = validateSignInInput({ email, password });
    const firstError = Object.values(errors)[0];
    if (firstError) {
      setMessage(firstError);
      return;
    }

    if (!signIn) return;

    setIsSubmitting(true);
    try {
      const { error: passwordError } = await signIn.password({
        emailAddress: email,
        password,
      });

      if (passwordError) {
        setMessage(passwordError.longMessage ?? passwordError.message ?? "Invalid email or password.");
        return;
      }

      if (signIn.status === "complete") {
        const { error: finalizeError } = await signIn.finalize();
        if (finalizeError) {
          setMessage(finalizeError.longMessage ?? "Sign in could not be completed.");
          return;
        }
        router.push("/dashboard");
      } else {
        setMessage("Sign in could not be completed. Please try again.");
      }
    } catch {
      setMessage("Unable to complete sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {message && <p className="text-sm text-foreground/70">{message}</p>}

        <div className="flex flex-col gap-2">
          <label htmlFor="signin-email" className="text-sm font-medium text-foreground/80">
            Email
          </label>
          <input
            id="signin-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className={FORM_INPUT_CLASSNAMES}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="signin-password" className="text-sm font-medium text-foreground/80">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-foreground/50 hover:text-foreground/80">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="signin-password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className={`${FORM_INPUT_CLASSNAMES} pr-11`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-foreground/40 hover:text-foreground/70"
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-60"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="flex items-center gap-4">
        <hr className="flex-1 border-foreground/10" />
        <span className="text-xs text-foreground/40">or continue with</span>
        <hr className="flex-1 border-foreground/10" />
      </div>

      <OAuthButtons />

      <p className="text-center text-sm text-foreground/60">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-foreground hover:text-foreground/70">
          Sign up →
        </Link>
      </p>
    </div>
  );
}
