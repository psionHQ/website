"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { AuthActionResult, AuthSession, AuthUser } from "@/types";
import type { Result } from "@/types/common";
import { getSession, signOut } from "@/services/auth";

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
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<AuthSession | null>(null);

  const refreshSession = useCallback(async (): Promise<Result<AuthSession | null, Error>> => {
    const result = await getSession();
    if (result.ok) {
      setSession(result.data);
      return { ok: true, data: result.data };
    }

    return { ok: false, error: result.error };
  }, []);

  const logout = useCallback(async (): Promise<Result<{ signedOut: boolean }, Error>> => {
    const result = await signOut();
    if (result.ok) {
      setSession(null);
      return { ok: true, data: result.data };
    }

    return { ok: false, error: result.error };
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const result = await getSession();
      if (!mounted) return;
      if (result.ok) {
        setSession(result.data);
      }
      setIsLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      session,
      user: session?.user ?? null,
      refreshSession,
      logout,
    }),
    [isLoading, logout, refreshSession, session],
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
