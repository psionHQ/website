"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

/**
 * Handles the OAuth redirect callback from Clerk.
 * After a successful OAuth sign-in or sign-up, Clerk redirects here to
 * complete the session handshake before forwarding to /dashboard.
 */
export default function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
