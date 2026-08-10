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
  const { signIn, errors, fetchStatus } = useSignIn();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [useBackupCode, setUseBackupCode] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const isSubmitting = fetchStatus === "fetching";

  async function finalizeSignIn() {
    if (!signIn) {
      setMessage("Authentication is still loading. Please try again.");
      return;
    }

    const { error } = await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        /*
         * Clerk may require an additional session task.
         */
        if (session?.currentTask) {
          console.error(
            "PsionHQ Clerk session task:",
            session.currentTask,
          );

          setMessage(
            "Your account requires an additional verification step before you can continue.",
          );

          return;
        }

        const url = decorateUrl("/dashboard");

        if (url.startsWith("http")) {
          window.location.href = url;
          return;
        }

        router.push(url);
      },
    });

    if (error) {
      console.error(
        "PsionHQ Clerk finalize error:",
        error,
      );

      setMessage(
        error.longMessage ??
          error.message ??
          "Sign in could not be completed. Please try again.",
      );
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage(null);

    if (!signIn) {
      setMessage(
        "Authentication is still loading. Please try again.",
      );
      return;
    }

    const validationErrors = validateSignInInput({
      email,
      password,
    });

    const firstError = Object.values(validationErrors)[0];

    if (firstError) {
      setMessage(firstError);
      return;
    }

    try {
      const { error } = await signIn.password({
        emailAddress: email.trim(),
        password,
      });

      if (error) {
        console.error(
          "PsionHQ Clerk password sign-in error:",
          error,
        );

        setMessage(
          error.longMessage ??
            error.message ??
            "Invalid email or password.",
        );

        return;
      }

      /*
       * Password authentication succeeded.
       */
      if (signIn.status === "complete") {
        await finalizeSignIn();
        return;
      }

      /*
       * MFA is required.
       *
       * The previous version stopped here and only displayed
       * "Additional verification is required".
       *
       * Now we keep the sign-in flow alive and show the MFA UI.
       */
      if (signIn.status === "needs_second_factor") {
        setMessage(null);
        setCode("");
        setUseBackupCode(false);

        return;
      }

      /*
       * Device/client trust verification.
       */
      if (signIn.status === "needs_client_trust") {
        setMessage(
          "Additional device verification is required to complete sign in.",
        );

        return;
      }

      console.error(
        "PsionHQ unexpected sign-in status:",
        signIn.status,
      );

      setMessage(
        "Sign in requires additional verification.",
      );
    } catch (error) {
      console.error(
        "PsionHQ sign-in exception:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to complete sign in right now.",
      );
    }
  }

  async function handleMFASubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMessage(null);

    if (!signIn) {
      setMessage(
        "Authentication is still loading. Please try again.",
      );
      return;
    }

    const trimmedCode = code.trim();

    if (!trimmedCode) {
      setMessage("Enter your verification code.");
      return;
    }

    try {
      let error = null;

      /*
       * Authenticator application:
       * 6-digit TOTP code.
       */
      if (!useBackupCode) {
        const result = await signIn.mfa.verifyTOTP({
          code: trimmedCode,
        });

        error = result.error;
      }

      /*
       * Backup code.
       */
      if (useBackupCode) {
        const result = await signIn.mfa.verifyBackupCode({
          code: trimmedCode,
        });

        error = result.error;
      }

      if (error) {
        console.error(
          "PsionHQ Clerk MFA verification error:",
          error,
        );

        setMessage(
          error.longMessage ??
            error.message ??
            "The verification code is invalid. Please try again.",
        );

        return;
      }

      /*
       * MFA verification succeeded.
       */
      if (signIn.status === "complete") {
        await finalizeSignIn();
        return;
      }

      /*
       * MFA verification did not complete the sign-in.
       */
      console.error(
        "PsionHQ unexpected MFA status:",
        signIn.status,
      );

      setMessage(
        "Verification was not completed. Please try again.",
      );
    } catch (error) {
      console.error(
        "PsionHQ MFA exception:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to verify your account right now.",
      );
    }
  }

  /*
   * MFA SCREEN
   *
   * This is the important part that was missing before.
   */
  if (signIn?.status === "needs_second_factor") {
    return (
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">
            Verify your account
          </h1>

          <p className="text-sm text-foreground/60">
            {useBackupCode
              ? "Enter one of your backup codes."
              : "Enter the 6-digit code from your authenticator app."}
          </p>
        </div>

        <form
          onSubmit={handleMFASubmit}
          className="flex flex-col gap-5"
        >
          {message && (
            <p
              role="alert"
              className="text-sm text-foreground/70"
            >
              {message}
            </p>
          )}

          <div className="flex flex-col gap-2">
            <label
              htmlFor="mfa-code"
              className="text-sm font-medium text-foreground/80"
            >
              {useBackupCode
                ? "Backup code"
                : "Authenticator code"}
            </label>

            <input
              id="mfa-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              value={code}
              onChange={(event) =>
                setCode(event.target.value)
              }
              placeholder={
                useBackupCode
                  ? "Enter backup code"
                  : "000000"
              }
              className={FORM_INPUT_CLASSNAMES}
              disabled={isSubmitting}
            />
          </div>

          {errors?.fields?.code?.message && (
            <p
              role="alert"
              className="text-sm text-foreground/70"
            >
              {errors.fields.code.message}
            </p>
          )}

          <button
            type="submit"
            disabled={
              isSubmitting ||
              !code.trim()
            }
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Verifying..."
              : "Verify"}
          </button>

          <button
            type="button"
            onClick={() => {
              setUseBackupCode(
                (previous) => !previous,
              );
              setCode("");
              setMessage(null);
            }}
            disabled={isSubmitting}
            className="text-sm text-foreground/60 transition-colors hover:text-foreground disabled:opacity-50"
          >
            {useBackupCode
              ? "Use authenticator app instead"
              : "Use a backup code instead"}
          </button>
        </form>

        <p className="text-center text-sm text-foreground/50">
          Your account requires additional verification
          before access can be granted.
        </p>
      </div>
    );
  }

  /*
   * NORMAL SIGN-IN SCREEN
   */
  return (
    <div className="flex w-full flex-col gap-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {message && (
          <p
            role="alert"
            className="text-sm text-foreground/70"
          >
            {message}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="signin-email"
            className="text-sm font-medium text-foreground/80"
          >
            Email
          </label>

          <input
            id="signin-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="you@company.com"
            className={FORM_INPUT_CLASSNAMES}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="signin-password"
              className="text-sm font-medium text-foreground/80"
            >
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-xs text-foreground/50 hover:text-foreground/80"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="signin-password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="••••••••"
              className={`${FORM_INPUT_CLASSNAMES} pr-11`}
              disabled={isSubmitting}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (previous) => !previous,
                )
              }
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-foreground/40 hover:text-foreground/70"
              disabled={isSubmitting}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            !email.trim() ||
            !password
          }
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Signing in..."
            : "Sign in"}
        </button>
      </form>

      <div className="flex items-center gap-4">
        <hr className="flex-1 border-foreground/10" />

        <span className="text-xs text-foreground/40">
          or continue with
        </span>

        <hr className="flex-1 border-foreground/10" />
      </div>

      <OAuthButtons />

      <p className="text-center text-sm text-foreground/60">
        Don&apos;t have an account?{" "}

        <Link
          href="/signup"
          className="font-medium text-foreground hover:text-foreground/70"
        >
          Sign up →
        </Link>
      </p>
    </div>
  );
}