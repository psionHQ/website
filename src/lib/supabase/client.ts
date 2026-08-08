import { createClient } from "@supabase/supabase-js";
import { env } from "@/config/env";

type AccessTokenProvider = () => Promise<string | null>;

export function createSupabaseClient(
  accessToken: AccessTokenProvider,
) {
  if (!env.supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured");
  }

  if (!env.supabasePublishableKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is not configured",
    );
  }

  return createClient(
    env.supabaseUrl,
    env.supabasePublishableKey,
    {
      accessToken,
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );
}