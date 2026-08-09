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
  const { signIn, errors, fetchStatus } =
    useSignIn();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [message, setMessage] =
    useState<string | null>(null);

  const isSubmitting =
    fetchStatus === "fetching";

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

    const validationErrors =
      validateSignInInput({
        email,
        password,
      });

    const firstError =
      Object.values(validationErrors)[0];

    if (firstError) {
      setMessage(firstError);
      return;
    }

    try {
      const { error } =
        await signIn.password({
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
       * Successful password authentication.
       * Clerk has created a sign-in session,
       * but it is not active yet.
       */
      if (signIn.status === "complete") {
        const { error: finalizeError } =
          await signIn.finalize({
            navigate: ({
              session,
              decorateUrl,
            }) => {
              /*
               * Clerk can return a pending session
               * task after authentication.
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

              const url =
                decorateUrl("/dashboard");

              /*
               * Clerk may return an absolute URL
               * when Safari cookie refresh is required.
               */
              if (url.startsWith("http")) {
                window.location.href = url;
                return;
              }

              /*
               * Normal Next.js navigation.
               */
              router.push(url);
            },
          });

        if (finalizeError) {
          console.error(
            "PsionHQ Clerk finalize error:",
            finalizeError,
          );

          setMessage(
            finalizeError.longMessage ??
              finalizeError.message ??
              "Sign in could not be completed. Please try again.",
          );

          return;
        }

        return;
      }

      /*
       * MFA is enabled for this account.
       */
      if (
        signIn.status ===
        "needs_second_factor"
      ) {
        setMessage(
          "Additional verification is required to complete sign in.",
        );

        return;
      }

      /*
       * Client trust can be required when
       * signing in from a new device/browser.
       */
      if (
        signIn.status ===
        "needs_client_trust"
      ) {
        setMessage(
          "Additional device verification is required to complete sign in.",
        );

        return;
      }

      /*
       * Unexpected Clerk state.
       */
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

  const clerkError =
    errors?.[0]?.longMessage ??
    errors?.[0]?.message ??
    null;

  const visibleMessage =
    message ?? clerkError;

  return (
    <div className="flex w-full flex-col gap-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
      >
        {visibleMessage && (
          <p
            role="alert"
            className="text-sm text-foreground/70"
          >
            {visibleMessage}
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
              setEmail(
                event.target.value,
              )
            }
            placeholder="you@company.com"
            className={
              FORM_INPUT_CLASSNAMES
            }
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
                setPassword(
                  event.target.value,
                )
              }
              placeholder="••••••••"
              className={`${FORM_INPUT_CLASSNAMES} pr-11`}
              disabled={isSubmitting}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (previous) =>
                    !previous,
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
              <EyeIcon
                open={showPassword}
              />
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