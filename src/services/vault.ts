import { createServerSupabaseClient } from "@/lib/supabase/server";

export interface VaultFolder {
  id: number;
  parent_id: number | null;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface VaultFile {
  id: number;
  folder_id: number | null;
  name: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  encryption_version: number;
  created_at: string;
  updated_at: string;
}

export interface VaultData {
  folders: VaultFolder[];
  files: VaultFile[];
}

export async function getVaultData(): Promise<VaultData> {
  const supabase = await createServerSupabaseClient();

  const [foldersResult, filesResult] = await Promise.all([
    supabase
      .from("vault_folders")
      .select(
        "id, parent_id, name, created_at, updated_at"
      )
      .order("name", { ascending: true }),

    supabase
      .from("vault_files")
      .select(
        "id, folder_id, name, storage_path, mime_type, size_bytes, encryption_version, created_at, updated_at"
      )
      .order("updated_at", { ascending: false }),
  ]);

  if (foldersResult.error) {
    throw foldersResult.error;
  }

  if (filesResult.error) {
    throw filesResult.error;
  }

  return {
    folders: foldersResult.data ?? [],
    files: filesResult.data ?? [],
  };
}