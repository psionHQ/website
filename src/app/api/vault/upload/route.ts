import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const BUCKET = "vault";

function normalizePath(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/+/g, "/");
}

function isSafePath(path: string): boolean {
  if (!path) {
    return true;
  }

  return path.split("/").every(
    (part) =>
      part.length > 0 &&
      part !== "." &&
      part !== "..",
  );
}

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
    const requestedPath = normalizePath(
      formData.get("path"),
    );

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 },
      );
    }

    if (!isSafePath(requestedPath)) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 },
      );
    }

    const safeFileName = file.name
      .replace(/[^\w.\- ]+/g, "_")
      .replace(/\s+/g, "_");

    if (!safeFileName) {
      return NextResponse.json(
        { error: "Invalid file name" },
        { status: 400 },
      );
    }

    const storagePath = [
      userId,
      requestedPath,
      safeFileName,
    ]
      .filter(Boolean)
      .join("/");

    const supabase =
      await createServerSupabaseClient();

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, file, {
        contentType:
          file.type ||
          "application/octet-stream",
        upsert: false,
      });

    if (error) {
      console.error(
        "Vault Storage upload error:",
        error,
      );

      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        name: file.name,
        path: requestedPath
          ? `${requestedPath}/${safeFileName}`
          : safeFileName,
        mime_type: file.type || null,
        size_bytes: file.size,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Vault upload error:",
      error,
    );

    return NextResponse.json(
      { error: "Invalid upload request" },
      { status: 400 },
    );
  }
}