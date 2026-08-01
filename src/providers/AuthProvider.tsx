"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import type { AuthSession, AuthUser } from "@/types";
import type { Result } from "@/types/common";

interface AuthContextValue {
  isLoading: boolean;
  session: AuthSession | null;
  user: AuthUser | null;
  refreshSession: () => Promise<Result<AuthSession | null, Error>>;
  logout: () => Promise<Result<{ signedOut: boolean }, Error>>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();

  const authUser = useMemo<AuthUser | null>(
    () =>
      isSignedIn && user
        ? {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress ?? "",
            name: user.fullName ?? undefined,
            avatarUrl: user.imageUrl ?? undefined,
          }
        : null,
    [isSignedIn, user],
  );

  const session = useMemo<AuthSession | null>(
    () => (authUser ? { user: authUser, expiresAt: "" } : null),
    [authUser],
  );

  const refreshSession = useCallback(async (): Promise<Result<AuthSession | null, Error>> => {
    return { ok: true, data: session };
  }, [session]);

  const logout = useCallback(async (): Promise<Result<{ signedOut: boolean }, Error>> => {
    try {
      await signOut();
      return { ok: true, data: { signedOut: true } };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error : new Error("Sign out failed"),
      };
    }
  }, [signOut]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading: !isLoaded,
      session,
      user: authUser,
      refreshSession,
      logout,
    }),
    [isLoaded, session, authUser, refreshSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
