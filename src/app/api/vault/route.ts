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

  const parts = path.split("/");

  return parts.every(
    (part) =>
      part.length > 0 &&
      part !== "." &&
      part !== "..",
  );
}

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const url = new URL(request.url);

    const requestedPath = normalizePath(
      url.searchParams.get("path") ?? "",
    );

    if (!isSafePath(requestedPath)) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 },
      );
    }

    const storagePath = requestedPath
      ? `${userId}/${requestedPath}`
      : userId;

    const supabase =
      await createServerSupabaseClient();

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(storagePath, {
        limit: 1000,
        offset: 0,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (error) {
      console.error(
        "Vault Storage list error:",
        error,
      );

      return NextResponse.json(
        { error: "Failed to load Vault" },
        { status: 500 },
      );
    }

    const folders = (data ?? [])
      .filter((item) => !item.id)
      .map((item) => {
        const path = requestedPath
          ? `${requestedPath}/${item.name}`
          : item.name;

        return {
          name: item.name,
          path,
        };
      });

    const files = (data ?? [])
      .filter(
        (item) =>
          Boolean(item.id) &&
          item.name !== ".keep",
      )
      .map((item) => {
        const path = requestedPath
          ? `${requestedPath}/${item.name}`
          : item.name;

        return {
          name: item.name,
          path,
          size: item.metadata?.size ?? null,
          mime_type:
            item.metadata?.mimetype ?? null,
          updated_at:
            item.updated_at ?? null,
        };
      });

    return NextResponse.json({
      folders,
      files,
    });
  } catch (error) {
    console.error("Vault GET error:", error);

    return NextResponse.json(
      { error: "Failed to load Vault" },
      { status: 500 },
    );
  }
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

    const body = await request.json();

    if (body?.action !== "create-folder") {
      return NextResponse.json(
        { error: "Unsupported action" },
        { status: 400 },
      );
    }

    const parentPath = normalizePath(
      body?.path ?? "",
    );

    const folderName =
      typeof body?.name === "string"
        ? body.name.trim()
        : "";

    if (!folderName) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 },
      );
    }

    if (
      folderName === "." ||
      folderName === ".." ||
      folderName.includes("/") ||
      folderName.includes("\\")
    ) {
      return NextResponse.json(
        { error: "Invalid folder name" },
        { status: 400 },
      );
    }

    if (!isSafePath(parentPath)) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 },
      );
    }

    const folderPath = parentPath
      ? `${userId}/${parentPath}/${folderName}`
      : `${userId}/${folderName}`;

    const keepFilePath = `${folderPath}/.keep`;

    const supabase =
      await createServerSupabaseClient();

    const placeholder = new Blob([""], {
      type: "application/octet-stream",
    });

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(keepFilePath, placeholder, {
        contentType:
          "application/octet-stream",
        upsert: false,
      });

    if (error) {
      console.error(
        "Vault folder creation error:",
        error,
      );

      return NextResponse.json(
        { error: "Failed to create folder" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        name: folderName,
        path: parentPath
          ? `${parentPath}/${folderName}`
          : folderName,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Vault POST error:", error);

    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 },
    );
  }
}