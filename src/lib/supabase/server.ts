import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase/client";

export async function createServerSupabaseClient() {
  const { getToken } = await auth();

  return createSupabaseClient(() => getToken());
}