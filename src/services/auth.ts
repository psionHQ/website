import { auth, currentUser } from "@clerk/nextjs/server";
import type { AuthSession, AuthUser } from "@/types";
import type { Result } from "@/types/common";
import { ok, err } from "@/utils/result";
import { AppError } from "@/lib/errors";

/**
 * Server-side: returns the current authenticated session, or null if not signed in.
 * Use this in Server Components, Route Handlers, and Server Actions.
 */
export async function getSession(): Promise<Result<AuthSession | null, AppError>> {
  try {
    const { userId } = await auth();
    if (!userId) return ok(null);

    const user = await currentUser();
    if (!user) return ok(null);

    const authUser: AuthUser = {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      name: user.fullName ?? undefined,
      avatarUrl: user.imageUrl ?? undefined,
    };

    return ok({
      user: authUser,
      expiresAt: "",
    });
  } catch (error) {
    return {
      ok: false,
      error: new AppError({
        code: "SESSION_ERROR",
        message: "Failed to retrieve session.",
        details: error,
      }),
    };
  }
}

/**
 * Server-side: returns the current authenticated user, or null if not signed in.
 */
export async function getCurrentUser(): Promise<Result<AuthUser | null, AppError>> {
  try {
    const user = await currentUser();
    if (!user) return ok(null);

    return ok({
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      name: user.fullName ?? undefined,
      avatarUrl: user.imageUrl ?? undefined,
    });
  } catch (error) {
    return {
      ok: false,
      error: new AppError({
        code: "USER_FETCH_ERROR",
        message: "Failed to retrieve current user.",
        details: error,
      }),
    };
  }
}

// Re-export err so callers that previously imported from services don't break.
export { ok, err };

