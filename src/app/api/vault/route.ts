import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const BUCKET = "vault";
const PAGE_SIZE = 1000;
const REMOVE_BATCH_SIZE = 100;

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

function isSafeName(name: string): boolean {
  if (!name) {
    return false;
  }

  return (
    name !== "." &&
    name !== ".." &&
    !name.includes("/") &&
    !name.includes("\\")
  );
}

function userStoragePath(
  userId: string,
  path: string,
): string {
  return path
    ? `${userId}/${path}`
    : userId;
}

async function listAllObjects(
  supabase: Awaited<
    ReturnType<typeof createServerSupabaseClient>
  >,
  prefix: string,
): Promise<string[]> {
  const results: string[] = [];
  const foldersToVisit = [prefix];

  while (foldersToVisit.length > 0) {
    const current = foldersToVisit.pop();

    if (!current) {
      continue;
    }

    let offset = 0;

    while (true) {
      const { data, error } =
        await supabase.storage
          .from(BUCKET)
          .list(current, {
            limit: PAGE_SIZE,
            offset,
            sortBy: {
              column: "name",
              order: "asc",
            },
          });

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        break;
      }

      for (const item of data) {
        const itemPath =
          `${current}/${item.name}`;

        if (item.id) {
          results.push(itemPath);
        } else {
          foldersToVisit.push(itemPath);
        }
      }

      if (data.length < PAGE_SIZE) {
        break;
      }

      offset += PAGE_SIZE;
    }
  }

  return results;
}

async function removeObjects(
  supabase: Awaited<
    ReturnType<typeof createServerSupabaseClient>
  >,
  paths: string[],
) {
  for (
    let index = 0;
    index < paths.length;
    index += REMOVE_BATCH_SIZE
  ) {
    const batch = paths.slice(
      index,
      index + REMOVE_BATCH_SIZE,
    );

    if (batch.length === 0) {
      continue;
    }

    const { error } =
      await supabase.storage
        .from(BUCKET)
        .remove(batch);

    if (error) {
      throw error;
    }
  }
}

async function moveObjects(
  supabase: Awaited<
    ReturnType<typeof createServerSupabaseClient>
  >,
  objects: string[],
  fromPrefix: string,
  toPrefix: string,
) {
  for (const sourcePath of objects) {
    const relativePath =
      sourcePath.startsWith(
        `${fromPrefix}/`,
      )
        ? sourcePath.slice(
            `${fromPrefix}/`.length,
          )
        : sourcePath;

    const destinationPath =
      `${toPrefix}/${relativePath}`;

    const { error } =
      await supabase.storage
        .from(BUCKET)
        .move(
          sourcePath,
          destinationPath,
        );

    if (error) {
      throw error;
    }
  }
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

    const requestedPath =
      normalizePath(
        url.searchParams.get("path") ?? "",
      );

    if (!isSafePath(requestedPath)) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 },
      );
    }

    const storagePath =
      userStoragePath(
        userId,
        requestedPath,
      );

    const supabase =
      await createServerSupabaseClient();

    const { data, error } =
      await supabase.storage
        .from(BUCKET)
        .list(storagePath, {
          limit: PAGE_SIZE,
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
        {
          error:
            "Failed to load Vault",
        },
        { status: 500 },
      );
    }

    const folders =
      (data ?? [])
        .filter(
          (item) => !item.id,
        )
        .map((item) => ({
          name: item.name,
          path: requestedPath
            ? `${requestedPath}/${item.name}`
            : item.name,
        }));

    const files =
      (data ?? [])
        .filter(
          (item) =>
            Boolean(item.id) &&
            item.name !== ".keep",
        )
        .map((item) => ({
          name: item.name,
          path: requestedPath
            ? `${requestedPath}/${item.name}`
            : item.name,
          size:
            typeof item.metadata?.size ===
            "number"
              ? item.metadata.size
              : null,
          mime_type:
            item.metadata?.mimetype ??
            null,
          updated_at:
            item.updated_at ?? null,
        }));

    return NextResponse.json({
      folders,
      files,
    });
  } catch (error) {
    console.error(
      "Vault GET error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Failed to load Vault",
      },
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

    const body =
      await request.json();

    if (
      body?.action !==
      "create-folder"
    ) {
      return NextResponse.json(
        {
          error:
            "Unsupported action",
        },
        { status: 400 },
      );
    }

    const parentPath =
      normalizePath(
        body?.path ?? "",
      );

    const folderName =
      typeof body?.name === "string"
        ? body.name.trim()
        : "";

    if (!isSafePath(parentPath)) {
      return NextResponse.json(
        {
          error:
            "Invalid path",
        },
        { status: 400 },
      );
    }

    if (!isSafeName(folderName)) {
      return NextResponse.json(
        {
          error:
            "Invalid folder name",
        },
        { status: 400 },
      );
    }

    const supabase =
      await createServerSupabaseClient();

    /*
     * Resolve parent folder.
     *
     * Root:
     *   parent_id = NULL
     *
     * Nested:
     *   parent_id = existing folder id
     */
    let parentId:
      | number
      | null = null;

    if (parentPath) {
      const parts =
        parentPath.split("/");

      let currentParentId:
        | number
        | null = null;

      for (const part of parts) {
        let query = supabase
          .from("vault_folders")
          .select("id")
          .eq(
            "clerk_user_id",
            userId,
          )
          .eq("name", part)
          .limit(1);

        if (
          currentParentId === null
        ) {
          query = query.is(
            "parent_id",
            null,
          );
        } else {
          query = query.eq(
            "parent_id",
            currentParentId,
          );
        }

        const {
          data: folder,
          error: folderError,
        } = await query.maybeSingle();

        if (folderError) {
          console.error(
            "Vault parent lookup error:",
            folderError,
          );

          return NextResponse.json(
            {
              error:
                "Failed to resolve parent folder",
            },
            { status: 500 },
          );
        }

        if (!folder) {
          return NextResponse.json(
            {
              error:
                "Parent folder not found",
            },
            { status: 404 },
          );
        }

        currentParentId =
          folder.id;
      }

      parentId =
        currentParentId;
    }

    /*
     * PostgreSQL FIRST
     */
    const {
      data: folder,
      error: folderError,
    } = await supabase
      .from("vault_folders")
      .insert({
        clerk_user_id: userId,
        parent_id: parentId,
        name: folderName,
      })
      .select(
        "id, clerk_user_id, parent_id, name, created_at, updated_at",
      )
      .single();

    if (folderError) {
      console.error(
        "Vault folder database creation error:",
        folderError,
      );

      return NextResponse.json(
        {
          error:
            "Failed to create folder",
        },
        { status: 500 },
      );
    }

    /*
     * Storage SECOND
     */
    const folderPath =
      parentPath
        ? `${userId}/${parentPath}/${folderName}`
        : `${userId}/${folderName}`;

    const keepFilePath =
      `${folderPath}/.keep`;

    const placeholder =
      new Blob([""], {
        type:
          "application/octet-stream",
      });

    const {
      error: storageError,
    } = await supabase.storage
      .from(BUCKET)
      .upload(
        keepFilePath,
        placeholder,
        {
          contentType:
            "application/octet-stream",
          upsert: false,
        },
      );

    /*
     * Rollback DB if Storage fails.
     */
    if (storageError) {
      console.error(
        "Vault folder storage creation error:",
        storageError,
      );

      await supabase
        .from("vault_folders")
        .delete()
        .eq(
          "id",
          folder.id,
        )
        .eq(
          "clerk_user_id",
          userId,
        );

      return NextResponse.json(
        {
          error:
            "Failed to create folder storage",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        folder,
        name: folderName,
        path: parentPath
          ? `${parentPath}/${folderName}`
          : folderName,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Vault POST error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Invalid request",
      },
      { status: 400 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body =
      await request.json();

    const action =
      body?.action;

    if (
      action !== "move-file" &&
      action !== "rename-file" &&
      action !== "move-folder" &&
      action !== "rename-folder"
    ) {
      return NextResponse.json(
        {
          error:
            "Unsupported action",
        },
        { status: 400 },
      );
    }

    const sourcePath =
      normalizePath(
        body?.path ?? "",
      );

    const destinationPath =
      normalizePath(
        body?.destinationPath ?? "",
      );

    if (
      !sourcePath ||
      !isSafePath(sourcePath)
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid source path",
        },
        { status: 400 },
      );
    }

    if (
      !destinationPath ||
      !isSafePath(
        destinationPath,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid destination path",
        },
        { status: 400 },
      );
    }

    const supabase =
      await createServerSupabaseClient();

    /*
     * FILE
     */
    if (
      action === "move-file" ||
      action === "rename-file"
    ) {
      const sourceStoragePath =
        userStoragePath(
          userId,
          sourcePath,
        );

      const destinationStoragePath =
        userStoragePath(
          userId,
          destinationPath,
        );

      const { error } =
        await supabase.storage
          .from(BUCKET)
          .move(
            sourceStoragePath,
            destinationStoragePath,
          );

      if (error) {
        console.error(
          "Vault file move error:",
          error,
        );

        return NextResponse.json(
          {
            error:
              "Failed to move or rename file",
          },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        type: "file",
        path: destinationPath,
      });
    }

    /*
     * FOLDER
     */
    const sourcePrefix =
      userStoragePath(
        userId,
        sourcePath,
      );

    const destinationPrefix =
      userStoragePath(
        userId,
        destinationPath,
      );

    if (
      destinationPrefix ===
        sourcePrefix ||
      destinationPrefix.startsWith(
        `${sourcePrefix}/`,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "A folder cannot be moved inside itself",
        },
        { status: 400 },
      );
    }

    const objects =
      await listAllObjects(
        supabase,
        sourcePrefix,
      );

    if (
      objects.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "Folder is empty or does not exist",
        },
        { status: 404 },
      );
    }

    await moveObjects(
      supabase,
      objects,
      sourcePrefix,
      destinationPrefix,
    );

    return NextResponse.json({
      success: true,
      type: "folder",
      path: destinationPath,
      moved: objects.length,
    });
  } catch (error) {
    console.error(
      "Vault PATCH error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Failed to move or rename item",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const url =
      new URL(request.url);

    let body: {
      path?: unknown;
      type?: unknown;
    } = {};

    try {
      body =
        await request.json();
    } catch {
      // DELETE may also use query parameters.
    }

    const requestedPath =
      normalizePath(
        body.path ??
          url.searchParams.get(
            "path",
          ) ??
          "",
      );

    const type =
      typeof body.type === "string"
        ? body.type
        : url.searchParams.get(
            "type",
          ) ?? "file";

    if (
      !requestedPath ||
      !isSafePath(
        requestedPath,
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid path",
        },
        { status: 400 },
      );
    }

    if (
      type !== "file" &&
      type !== "folder"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid item type",
        },
        { status: 400 },
      );
    }

    const supabase =
      await createServerSupabaseClient();

    const storagePath =
      userStoragePath(
        userId,
        requestedPath,
      );

    /*
     * FILE DELETE
     */
    if (type === "file") {
      const { error } =
        await supabase.storage
          .from(BUCKET)
          .remove([
            storagePath,
          ]);

      if (error) {
        console.error(
          "Vault file delete error:",
          error,
        );

        return NextResponse.json(
          {
            error:
              "Failed to delete file",
          },
          { status: 500 },
        );
      }

      return NextResponse.json({
        success: true,
        type: "file",
        path: requestedPath,
      });
    }

    /*
     * FOLDER DELETE
     */
    const objects =
      await listAllObjects(
        supabase,
        storagePath,
      );

    if (objects.length > 0) {
      await removeObjects(
        supabase,
        objects,
      );
    }

    return NextResponse.json({
      success: true,
      type: "folder",
      path: requestedPath,
      deleted: objects.length,
    });
  } catch (error) {
    console.error(
      "Vault DELETE error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Failed to delete item",
      },
      { status: 500 },
    );
  }
}