"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function OAuthButtons() {
  const { signIn } = useSignIn();
  const [error, setError] = useState<string | null>(null);

  async function handleOAuth(provider: "oauth_google" | "oauth_github") {
    if (!signIn) return;
    setError(null);
    const { error: ssoError } = await signIn.sso({
      strategy: provider,
      redirectUrl: "/sso-callback",
      redirectCallbackUrl: "/signin",
    });
    if (ssoError) {
      setError(ssoError.longMessage ?? "OAuth sign in failed.");
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {error && <p className="text-sm text-foreground/70">{error}</p>}
      <button
        type="button"
        onClick={() => void handleOAuth("oauth_google")}
        className="inline-flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-foreground/15 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-foreground/[0.04]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.3-1.7 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.6-2.5C16.9 3.2 14.7 2 12 2 6.9 2 2.7 6.2 2.7 11.3S6.9 20.6 12 20.6c6.9 0 9.6-4.9 9.6-7.4 0-.5 0-.9-.1-1.2H12z" />
        </svg>
        Continue with Google
      </button>
      <button
        type="button"
        onClick={() => void handleOAuth("oauth_github")}
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
