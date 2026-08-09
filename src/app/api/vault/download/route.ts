import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const BUCKET = "vault";

function normalizePath(value: string): string {
  return value
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/+/g, "/");
}

function isSafePath(path: string): boolean {
  if (!path) {
    return false;
  }

  return path.split("/").every(
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
        { error: "Invalid file path" },
        { status: 400 },
      );
    }

    const storagePath = `${userId}/${requestedPath}`;

    const supabase =
      await createServerSupabaseClient();

    const { data, error } =
      await supabase.storage
        .from(BUCKET)
        .download(storagePath);

    if (error || !data) {
      console.error(
        "Vault Storage download error:",
        error,
      );

      return NextResponse.json(
        { error: "Failed to download file" },
        { status: 404 },
      );
    }

    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type":
          data.type ||
          "application/octet-stream",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(
          requestedPath.split("/").pop() || "file",
        )}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error(
      "Vault download error:",
      error,
    );

    return NextResponse.json(
      { error: "Failed to download file" },
      { status: 500 },
    );
  }
}