import { NextResponse } from "next/server";
import { getVaultData } from "@/services/vault";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const data = await getVaultData();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Vault API error:", error);

    return NextResponse.json(
      { error: "Failed to load Vault data" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body?.name === "string" ? body.name.trim() : "";

    const parentId =
      body?.parent_id === null || body?.parent_id === undefined
        ? null
        : Number(body.parent_id);

    if (!name) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 },
      );
    }

    if (parentId !== null && !Number.isInteger(parentId)) {
      return NextResponse.json(
        { error: "Invalid parent folder" },
        { status: 400 },
      );
    }

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from("vault_folders")
      .insert({
        name,
        parent_id: parentId,
      })
      .select("id, parent_id, name, created_at, updated_at")
      .single();

    if (error) {
      console.error("Vault folder creation error:", error);

      return NextResponse.json(
        { error: "Failed to create folder" },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Vault POST error:", error);

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}