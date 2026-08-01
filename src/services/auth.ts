import { env, isAuthConfigured } from "@/config/env";
import { apiClient } from "@/lib/api/client";
import { AppError } from "@/lib/errors";
import type { AuthActionResult, AuthSession, SignInInput, SignUpInput } from "@/types";
import type { Result } from "@/types/common";
import { ok } from "@/utils/result";

async function pendingProviderResult(): Promise<Result<AuthActionResult, AppError>> {
  return ok({ status: "pending-provider", session: null });
}

export async function signInWithPassword(
  payload: SignInInput,
): Promise<Result<AuthActionResult, AppError>> {
  if (!isAuthConfigured) return pendingProviderResult();

  return apiClient.request<AuthActionResult, SignInInput>(`/auth/${env.authProvider}/signin`, {
    method: "POST",
    body: payload,
  });
}

export async function signUpWithPassword(
  payload: SignUpInput,
): Promise<Result<AuthActionResult, AppError>> {
  if (!isAuthConfigured) return pendingProviderResult();

  return apiClient.request<AuthActionResult, SignUpInput>(`/auth/${env.authProvider}/signup`, {
    method: "POST",
    body: payload,
  });
}

export async function signOut(): Promise<Result<{ signedOut: boolean }, AppError>> {
  if (!isAuthConfigured) return ok({ signedOut: true });

  return apiClient.request<{ signedOut: boolean }>(`/auth/${env.authProvider}/signout`, {
    method: "POST",
  });
}

export async function getSession(): Promise<Result<AuthSession | null, AppError>> {
  if (!isAuthConfigured) return ok(null);

  return apiClient.request<AuthSession | null>(`/auth/${env.authProvider}/session`);
}
