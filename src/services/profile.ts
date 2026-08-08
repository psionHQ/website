import { createServerSupabaseClient } from "@/lib/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

export interface Profile {
  id: number;
  created_at: string;
  clerk_user_id: string;
}

async function getClerkUserId(): Promise<string> {
  const user = await currentUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  return user.id;
}

export async function getOrCreateProfile(): Promise<Profile> {
  const clerkUserId = await getClerkUserId();
  const supabase = await createServerSupabaseClient();

  const { data: existing, error: selectError } = await supabase
    .from("profiles")
    .select("id, created_at, clerk_user_id")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();

  if (selectError) {
    throw selectError;
  }

  if (existing) {
    return existing as Profile;
  }

  const { data: created, error: insertError } = await supabase
    .from("profiles")
    .insert({ clerk_user_id: clerkUserId })
    .select("id, created_at, clerk_user_id")
    .single();

  if (insertError) {
    throw insertError;
  }

  return created as Profile;
}

export async function getProfile(): Promise<Profile | null> {
  const clerkUserId = await getClerkUserId();
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, created_at, clerk_user_id")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Profile | null;
}