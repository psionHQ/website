"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { FORM_INPUT_CLASSNAMES } from "@/constants/forms";
import { EyeIcon } from "@/components/forms/FormIcons";
import OAuthButtons from "@/components/forms/OAuthButtons";
import { validateSignUpInput } from "@/lib/validation";

type Step = "register" | "verify";

export default function SignUpForm() {
  const { signUp } = useSignUp();
  const router = useRouter();

  const [step, setStep] = useState<Step>("register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
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

    if (!signUp) return;

    setIsSubmitting(true);
    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] ?? "";
      const lastName = nameParts.slice(1).join(" ") || undefined;

      const { error: signUpError } = await signUp.password({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (signUpError) {
        setMessage(signUpError.longMessage ?? signUpError.message ?? "Unable to create account.");
        return;
      }

      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        setMessage(sendError.longMessage ?? "Unable to send verification email.");
        return;
      }

      setStep("verify");
    } catch {
      setMessage("Unable to create account right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (!signUp) return;

    setIsSubmitting(true);
    try {
      const { error: verifyError } = await signUp.verifications.verifyEmailCode({
        code: verificationCode,
      });

      if (verifyError) {
        setMessage(verifyError.longMessage ?? "Invalid verification code.");
        return;
      }

      if (signUp.status === "complete") {
        const { error: finalizeError } = await signUp.finalize();
        if (finalizeError) {
          setMessage(finalizeError.longMessage ?? "Account could not be activated.");
          return;
        }
        router.push("/dashboard");
      } else {
        setMessage("Verification could not be completed. Please try again.");
      }
    } catch {
      setMessage("Unable to verify email right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === "verify") {
    return (
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-1.5 text-center">
          <p className="text-sm text-foreground/70">
            We sent a verification code to <strong className="text-foreground">{email}</strong>.
            Enter it below to activate your account.
          </p>
        </div>
        <form onSubmit={handleVerify} className="flex flex-col gap-5">
          {message && <p className="text-sm text-foreground/70">{message}</p>}

          <div className="flex flex-col gap-2">
            <label htmlFor="verify-code" className="text-sm font-medium text-foreground/80">
              Verification code
            </label>
            <input
              id="verify-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              required
              value={verificationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
              placeholder="123456"
              className={FORM_INPUT_CLASSNAMES}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-60"
          >
            {isSubmitting ? "Verifying..." : "Verify email"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/60">
          Wrong email?{" "}
          <button
            type="button"
            onClick={() => { setStep("register"); setMessage(null); }}
            className="font-medium text-foreground hover:text-foreground/70"
          >
            Go back
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <form onSubmit={handleRegister} className="flex flex-col gap-5">
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
