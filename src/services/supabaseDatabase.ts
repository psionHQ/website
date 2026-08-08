import { createServerSupabaseClient } from "@/lib/supabase/server";
import type {
  DatabaseClient,
  DatabaseDelete,
  DatabaseInsert,
  DatabaseUpdate,
} from "@/types/database";

export function createSupabaseDatabase(): DatabaseClient {
  return {
    async insert<TRecord>(
      table: string,
      input: DatabaseInsert<TRecord>,
    ): Promise<TRecord> {
      const supabase = await createServerSupabaseClient();

      const { data, error } = await supabase
        .from(table)
        .insert(input.data)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as TRecord;
    },

    async findById<TRecord>(
      table: string,
      id: string,
    ): Promise<TRecord | null> {
      const supabase = await createServerSupabaseClient();

      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data as TRecord | null;
    },

    async findMany<TRecord>(
      table: string,
      userId: string,
    ): Promise<TRecord[]> {
      const supabase = await createServerSupabaseClient();

      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("user_id", userId);

      if (error) {
        throw error;
      }

      return (data ?? []) as TRecord[];
    },

    async update<TRecord>(
      table: string,
      input: DatabaseUpdate<TRecord>,
    ): Promise<TRecord> {
      const supabase = await createServerSupabaseClient();

      const { data, error } = await supabase
        .from(table)
        .update(input.data)
        .eq("id", input.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as TRecord;
    },

    async delete(
      table: string,
      input: DatabaseDelete,
    ): Promise<void> {
      const supabase = await createServerSupabaseClient();

      const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", input.id);

      if (error) {
        throw error;
      }
    },
  };
}