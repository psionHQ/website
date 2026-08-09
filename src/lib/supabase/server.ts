import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "./client";

export async function createServerSupabaseClient() {
  const { getToken } = await auth();

  return createSupabaseClient(() => getToken());
}