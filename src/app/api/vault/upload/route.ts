import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");
    const folderPathValue = formData.get("folder_path");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 },
      );
    }

    const folderPath =
      typeof folderPathValue === "string"
        ? folderPathValue.trim().replace(/^\/+|\/+$/g, "")
        : "";

    const safeFileName = file.name
      .replace(/[^\w.\- ]+/g, "_")
      .replace(/\s+/g, "_");

    const storagePath = [
      userId,
      folderPath,
      safeFileName,
    ]
      .filter(Boolean)
      .join("/");

    const supabase = await createServerSupabaseClient();

    const { error } = await supabase.storage
      .from("vault")
      .upload(storagePath, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      console.error("Vault storage upload error:", error);

      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        name: file.name,
        path: storagePath,
        mime_type: file.type || null,
        size_bytes: file.size,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Vault upload error:", error);

    return NextResponse.json(
      { error: "Invalid upload request" },
      { status: 400 },
    );
  }
}