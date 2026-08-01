"use client";

import { useState } from "react";
import Link from "next/link";
import { FORM_INPUT_CLASSNAMES } from "@/constants/forms";
import { MESSAGES } from "@/constants/messages";
import { EyeIcon } from "@/components/forms/FormIcons";
import OAuthButtons from "@/components/forms/OAuthButtons";
import { validateSignUpInput } from "@/lib/validation";
import { signUpWithPassword } from "@/services/auth";

export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const errors = validateSignUpInput({
      fullName,
      email,
      password,
      confirmPassword,
      agreed,
    });
    const firstError = Object.values(errors)[0];
    if (firstError) {
      setMessage(firstError);
      return;
    }

    setIsSubmitting(true);
    const result = await signUpWithPassword({
      fullName,
      email,
      password,
      confirmPassword,
      agreed,
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setMessage(MESSAGES.auth.genericError);
      return;
    }

    if (result.data.status === "pending-provider") {
      setMessage(MESSAGES.auth.pending);
    }
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {message && <p className="text-sm text-foreground/70">{message}</p>}

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-name" className="text-sm font-medium text-foreground/80">
            Full name
          </label>
          <input
            id="signup-name"
            type="text"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Jane Doe"
            className={FORM_INPUT_CLASSNAMES}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-email" className="text-sm font-medium text-foreground/80">
            Work email
          </label>
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@company.com"
            className={FORM_INPUT_CLASSNAMES}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-password" className="text-sm font-medium text-foreground/80">
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
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

        <div className="flex flex-col gap-2">
          <label htmlFor="signup-confirm-password" className="text-sm font-medium text-foreground/80">
            Confirm password
          </label>
          <input
            id="signup-confirm-password"
            type={showPassword ? "text" : "password"}
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="••••••••"
            className={FORM_INPUT_CLASSNAMES}
          />
        </div>

        <label className="flex items-start gap-2.5 text-sm text-foreground/60">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-foreground/25 bg-background accent-foreground"
          />
          I agree to the{" "}
          <Link href="/terms" className="font-medium text-foreground hover:text-foreground/70">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-foreground hover:text-foreground/70">
            Privacy Policy
          </Link>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <div className="flex items-center gap-4">
        <hr className="flex-1 border-foreground/10" />
        <span className="text-xs text-foreground/40">or continue with</span>
        <hr className="flex-1 border-foreground/10" />
      </div>

      <OAuthButtons />

      <p className="text-center text-sm text-foreground/60">
        Already have an account?{" "}
        <Link href="/signin" className="font-medium text-foreground hover:text-foreground/70">
          Sign in
        </Link>
      </p>
    </div>
  );
}
