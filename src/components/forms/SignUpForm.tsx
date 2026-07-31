"use client";

import { useState } from "react";
import Link from "next/link";

const inputClasses =
  "h-11 w-full rounded-xl border border-foreground/15 bg-background px-4 text-sm outline-none placeholder:text-foreground/40 focus:border-foreground/40";

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.8 21.8 0 0 1 5.06-6.06M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.8 21.8 0 0 1-3.22 4.44M1 1l22 22" />
        <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function OAuthButtons() {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-foreground/15 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-foreground/[0.04]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.2 14.7 2 12 2 6.9 2 2.7 6.2 2.7 11.3S6.9 20.6 12 20.6c6.9 0 9.6-4.9 9.6-7.4 0-.5 0-.9-.1-1.2H12z" />
        </svg>
        Continue with Google
      </button>
      <button
        type="button"
        className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-foreground/15 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-foreground/[0.04]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
        Continue with GitHub
      </button>
    </div>
  );
}

export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex w-full flex-col gap-8">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-5"
      >
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
            className={inputClasses}
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
            className={inputClasses}
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
              className={`${inputClasses} pr-11`}
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
            className={inputClasses}
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
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80"
        >
          Create account
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
