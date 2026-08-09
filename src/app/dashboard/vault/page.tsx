"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import PageContainer from "@/components/dashboard/PageContainer";

type StorageFolder = {
  name: string;
  path: string;
};

type StorageFile = {
  name: string;
  path: string;
  size: number | null;
  mime_type: string | null;
  updated_at: string | null;
};

type VaultResponse = {
  folders: StorageFolder[];
  files: StorageFile[];
};

type ActionItem =
  | {
      type: "file";
      item: StorageFile;
    }
  | {
      type: "folder";
      item: StorageFolder;
    };

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

function FolderIcon({
  size = 21,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2h6.5A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
    </svg>
  );
}

function FileIcon({
  size = 21,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </svg>
  );
}

function MoveIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 14h10l1-14" />
      <path d="M9 7V4h6v3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

function formatFileSize(bytes: number | null) {
  if (bytes === null || bytes === undefined) {
    return "—";
  }

  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function getFileType(file: StorageFile) {
  if (file.mime_type) {
    const parts = file.mime_type.split("/");

    if (parts.length === 2) {
      return parts[1].toUpperCase();
    }

    return file.mime_type.toUpperCase();
  }

  const extension = file.name.split(".").pop();

  return extension
    ? extension.toUpperCase()
    : "FILE";
}

function getParentPath(path: string) {
  const parts = path.split("/").filter(Boolean);

  parts.pop();

  return parts.join("/");
}

function getPreviewType(
  mimeType: string | null,
) {
  if (!mimeType) {
    return "unknown";
  }

  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.startsWith("video/")) {
    return "video";
  }

  if (mimeType.startsWith("audio/")) {
    return "audio";
  }

  if (mimeType === "application/pdf") {
    return "pdf";
  }

  if (
    mimeType.startsWith("text/") ||
    mimeType === "application/json"
  ) {
    return "text";
  }

  return "unknown";
}

export default function VaultPage() {
  const [folders, setFolders] = useState<
    StorageFolder[]
  >([]);

  const [files, setFiles] = useState<
    StorageFile[]
  >([]);

  const [currentPath, setCurrentPath] =
    useState("");

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [creatingFolder, setCreatingFolder] =
    useState(false);

  const [busy, setBusy] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [showNewMenu, setShowNewMenu] =
    useState(false);

  const [showNewFolder, setShowNewFolder] =
    useState(false);

  const [newFolderName, setNewFolderName] =
    useState("");

  const [actionItem, setActionItem] =
    useState<ActionItem | null>(null);

  const [actionMenuPath, setActionMenuPath] =
    useState<string | null>(null);

  const [showRename, setShowRename] =
    useState(false);

  const [renameValue, setRenameValue] =
    useState("");

  const [showMove, setShowMove] =
    useState(false);

  const [moveDestination, setMoveDestination] =
    useState("");

  const [showPreview, setShowPreview] =
    useState(false);

  const [previewFile, setPreviewFile] =
    useState<StorageFile | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null);

  const [previewLoading, setPreviewLoading] =
    useState(false);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  async function loadVault(
    path = currentPath,
  ) {
    try {
      setLoading(true);
      setError(null);

      const query = path
        ? `?path=${encodeURIComponent(path)}`
        : "";

      const response = await fetch(
        `/api/vault${query}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data =
        (await response.json()) as VaultResponse & {
          error?: string;
        };

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to load Vault",
        );
      }

      setFolders(data.folders ?? []);
      setFiles(data.files ?? []);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your Vault.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVault(currentPath);
  }, [currentPath]);

  const visibleFolders = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return folders;
    }

    return folders.filter((folder) =>
      folder.name
        .toLowerCase()
        .includes(query),
    );
  }, [folders, search]);

  const visibleFiles = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    if (!query) {
      return files;
    }

    return files.filter((file) =>
      file.name
        .toLowerCase()
        .includes(query),
    );
  }, [files, search]);

  function openFolder(
    folder: StorageFolder,
  ) {
    setSearch("");
    setActionMenuPath(null);
    setCurrentPath(folder.path);
  }

  function goBack() {
    if (!currentPath) {
      return;
    }

    setSearch("");
    setActionMenuPath(null);
    setCurrentPath(
      getParentPath(currentPath),
    );
  }

  function goToRoot() {
    setSearch("");
    setActionMenuPath(null);
    setCurrentPath("");
  }

  async function createFolder() {
    const name =
      newFolderName.trim();

    if (!name) {
      return;
    }

    try {
      setCreatingFolder(true);
      setError(null);

      const response = await fetch(
        "/api/vault",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            action: "create-folder",
            path: currentPath,
            name,
          }),
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to create folder",
        );
      }

      setNewFolderName("");
      setShowNewFolder(false);
      setShowNewMenu(false);

      await loadVault(currentPath);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create folder.",
      );
    } finally {
      setCreatingFolder(false);
    }
  }

  async function uploadFile(
    file: File,
  ) {
    try {
      setUploading(true);
      setError(null);
      setShowNewMenu(false);

      const formData =
        new FormData();

      formData.append(
        "file",
        file,
      );

      formData.append(
        "path",
        currentPath,
      );

      const response =
        await fetch(
          "/api/vault/upload",
          {
            method: "POST",
            body: formData,
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to upload file",
        );
      }

      await loadVault(currentPath);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to upload file.",
      );
    } finally {
      setUploading(false);
    }
  }

  function openFilePicker() {
    setShowNewMenu(false);
    fileInputRef.current?.click();
  }

  async function downloadFile(
    file: StorageFile,
  ) {
    try {
      setError(null);

      const response =
        await fetch(
          `/api/vault/download?path=${encodeURIComponent(
            file.path,
          )}`,
        );

      if (!response.ok) {
        const data =
          await response
            .json()
            .catch(() => null);

        throw new Error(
          data?.error ||
            "Failed to download file",
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob,
        );

      const anchor =
        document.createElement("a");

      anchor.href = url;
      anchor.download = file.name;

      document.body.appendChild(
        anchor,
      );

      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(
        url,
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to download file.",
      );
    }
  }

  async function openPreview(
    file: StorageFile,
  ) {
    try {
      setPreviewFile(file);
      setShowPreview(true);
      setPreviewLoading(true);
      setPreviewUrl(null);
      setError(null);

      const response =
        await fetch(
          `/api/vault/download?path=${encodeURIComponent(
            file.path,
          )}`,
        );

      if (!response.ok) {
        const data =
          await response
            .json()
            .catch(() => null);

        throw new Error(
          data?.error ||
            "Failed to preview file",
        );
      }

      const blob =
        await response.blob();

      const url =
        window.URL.createObjectURL(
          blob,
        );

      setPreviewUrl(url);
    } catch (err) {
      console.error(err);

      setShowPreview(false);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to preview file.",
      );
    } finally {
      setPreviewLoading(false);
    }
  }

  function closePreview() {
    if (previewUrl) {
      window.URL.revokeObjectURL(
        previewUrl,
      );
    }

    setPreviewUrl(null);
    setPreviewFile(null);
    setShowPreview(false);
  }

  /*
   * FIX:
   * ActionItem is a discriminated union.
   * The previous implementation passed
   * "type" and "item" separately, so TypeScript
   * could not prove that they belonged together.
   *
   * We now pass one complete ActionItem object.
   */
  function openActions(
    action: ActionItem,
  ) {
    setActionMenuPath(
      action.item.path,
    );

    setActionItem(action);
  }

  function closeActions() {
    setActionMenuPath(null);
    setActionItem(null);
  }

  function startRename() {
    if (!actionItem) {
      return;
    }

    setRenameValue(
      actionItem.item.name,
    );

    setShowRename(true);
    setShowMove(false);
    setActionMenuPath(null);
  }

  function startMove() {
    if (!actionItem) {
      return;
    }

    setMoveDestination(
      getParentPath(
        actionItem.item.path,
      ),
    );

    setShowMove(true);
    setShowRename(false);
    setActionMenuPath(null);
  }

  async function submitRename() {
    if (!actionItem) {
      return;
    }

    const name =
      renameValue.trim();

    if (!name) {
      return;
    }

    const parentPath =
      getParentPath(
        actionItem.item.path,
      );

    const destinationPath =
      parentPath
        ? `${parentPath}/${name}`
        : name;

    await performPatch(
      actionItem.type === "file"
        ? "rename-file"
        : "rename-folder",
      actionItem.item.path,
      destinationPath,
    );
  }

  async function submitMove() {
    if (!actionItem) {
      return;
    }

    const destinationFolder =
      moveDestination.trim();

    const destinationPath =
      destinationFolder
        ? `${destinationFolder}/${actionItem.item.name}`
        : actionItem.item.name;

    await performPatch(
      actionItem.type === "file"
        ? "move-file"
        : "move-folder",
      actionItem.item.path,
      destinationPath,
    );
  }

  async function performPatch(
    action:
      | "move-file"
      | "rename-file"
      | "move-folder"
      | "rename-folder",
    path: string,
    destinationPath: string,
  ) {
    try {
      setBusy(true);
      setError(null);

      const response =
        await fetch(
          "/api/vault",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              action,
              path,
              destinationPath,
            }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to update item",
        );
      }

      setShowRename(false);
      setShowMove(false);
      setActionItem(null);

      await loadVault(currentPath);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update item.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function deleteItem() {
    if (!actionItem) {
      return;
    }

    const confirmed =
      window.confirm(
        actionItem.type === "folder"
          ? `Delete folder "${actionItem.item.name}" and all files inside it?`
          : `Delete "${actionItem.item.name}"?`,
      );

    if (!confirmed) {
      return;
    }

    try {
      setBusy(true);
      setError(null);
      setActionMenuPath(null);

      const response =
        await fetch(
          `/api/vault?path=${encodeURIComponent(
            actionItem.item.path,
          )}&type=${actionItem.type}`,
          {
            method: "DELETE",
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to delete item",
        );
      }

      setActionItem(null);

      await loadVault(currentPath);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete item.",
      );
    } finally {
      setBusy(false);
    }
  }

  function renderBreadcrumb() {
    const parts =
      currentPath
        .split("/")
        .filter(Boolean);

    return (
      <div className="flex min-h-8 flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          onClick={goToRoot}
          className="font-medium text-foreground/60 transition hover:text-foreground"
        >
          Vault
        </button>

        {parts.map(
          (part, index) => {
            const path =
              parts
                .slice(
                  0,
                  index + 1,
                )
                .join("/");

            const isLast =
              index ===
              parts.length - 1;

            return (
              <div
                key={path}
                className="flex items-center gap-2"
              >
                <span className="text-foreground/25">
                  /
                </span>

                <button
                  type="button"
                  disabled={isLast}
                  onClick={() =>
                    setCurrentPath(
                      path,
                    )
                  }
                  className={
                    isLast
                      ? "font-medium text-foreground"
                      : "text-foreground/55 transition hover:text-foreground"
                  }
                >
                  {part}
                </button>
              </div>
            );
          },
        )}
      </div>
    );
  }

  return (
    <PageContainer className="gap-6">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Vault
            </h1>

            <p className="mt-1 text-sm text-foreground/50">
              Your private and secure
              storage.
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              disabled={
                uploading ||
                creatingFolder ||
                busy
              }
              onClick={() => {
                setError(null);
                setShowNewMenu(
                  (value) => !value,
                );
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlusIcon />

              {uploading
                ? "Uploading..."
                : "New"}
            </button>

            {showNewMenu && (
              <div className="absolute right-0 top-12 z-40 w-52 overflow-hidden rounded-xl border border-foreground/10 bg-background p-1 shadow-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewMenu(
                      false,
                    );
                    setNewFolderName(
                      "",
                    );
                    setShowNewFolder(
                      true,
                    );
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground/80 transition hover:bg-foreground/[0.06]"
                >
                  <FolderIcon size={18} />
                  New folder
                </button>

                <button
                  type="button"
                  onClick={
                    openFilePicker
                  }
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground/80 transition hover:bg-foreground/[0.06]"
                >
                  <UploadIcon />
                  Upload file
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hidden upload input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          disabled={uploading}
          onChange={(event) => {
            const file =
              event.target.files?.[0];

            if (file) {
              uploadFile(file);
            }

            event.currentTarget.value =
              "";
          }}
        />

        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-foreground/40">
            <SearchIcon />
          </div>

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search files..."
            className="h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.035] pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-foreground/20"
          />
        </div>

        {/* Breadcrumb */}
        {renderBreadcrumb()}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-10 text-center">
            <p className="text-sm text-foreground/45">
              Loading Vault...
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-foreground/10">
            {/* Folders */}
            {visibleFolders.length >
              0 && (
              <div className="border-b border-foreground/10">
                <div className="border-b border-foreground/10 px-4 py-3 text-xs font-medium uppercase tracking-wider text-foreground/40">
                  Folders
                </div>

                <div>
                  {visibleFolders.map(
                    (folder) => (
                      <div
                        key={folder.path}
                        className="group relative flex items-center gap-3 border-b border-foreground/[0.06] px-4 py-3 last:border-b-0 hover:bg-foreground/[0.025]"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            openFolder(
                              folder,
                            )
                          }
                          className="flex min-w-0 flex-1 items-center gap-3 text-left"
                        >
                          <span className="text-foreground/55">
                            <FolderIcon />
                          </span>

                          <span className="truncate text-sm font-medium text-foreground/80">
                            {folder.name}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            openActions({
                              type: "folder",
                              item: folder,
                            })
                          }
                          className="rounded-lg p-2 text-foreground/35 opacity-0 transition hover:bg-foreground/[0.06] hover:text-foreground group-hover:opacity-100"
                          aria-label={`Actions for ${folder.name}`}
                        >
                          <MoreIcon />
                        </button>

                        {actionMenuPath ===
                          folder.path && (
                          <ActionsMenu
                            onRename={
                              startRename
                            }
                            onMove={
                              startMove
                            }
                            onDelete={
                              deleteItem
                            }
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Files */}
            {visibleFiles.length >
              0 && (
              <div>
                <div className="border-b border-foreground/10 px-4 py-3 text-xs font-medium uppercase tracking-wider text-foreground/40">
                  Files
                </div>

                <div>
                  {visibleFiles.map(
                    (file) => (
                      <div
                        key={file.path}
                        className="group relative flex items-center gap-3 border-b border-foreground/[0.06] px-4 py-3 last:border-b-0 hover:bg-foreground/[0.025]"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <span className="shrink-0 text-foreground/50">
                            <FileIcon />
                          </span>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-foreground/80">
                              {file.name}
                            </p>

                            <p className="mt-0.5 text-xs text-foreground/35">
                              {getFileType(
                                file,
                              )}{" "}
                              ·{" "}
                              {formatFileSize(
                                file.size,
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              openPreview(
                                file,
                              )
                            }
                            className="rounded-lg p-2 text-foreground/35 transition hover:bg-foreground/[0.06] hover:text-foreground"
                            aria-label={`Preview ${file.name}`}
                          >
                            <EyeIcon />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              downloadFile(
                                file,
                              )
                            }
                            className="rounded-lg p-2 text-foreground/35 transition hover:bg-foreground/[0.06] hover:text-foreground"
                            aria-label={`Download ${file.name}`}
                          >
                            <DownloadIcon />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              openActions({
                                type: "file",
                                item: file,
                              })
                            }
                            className="rounded-lg p-2 text-foreground/35 transition hover:bg-foreground/[0.06] hover:text-foreground"
                            aria-label={`Actions for ${file.name}`}
                          >
                            <MoreIcon />
                          </button>
                        </div>

                        {actionMenuPath ===
                          file.path && (
                          <ActionsMenu
                            onRename={
                              startRename
                            }
                            onMove={
                              startMove
                            }
                            onDelete={
                              deleteItem
                            }
                          />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {/* Empty */}
            {visibleFolders.length ===
              0 &&
              visibleFiles.length ===
                0 && (
              <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground/[0.05] text-foreground/35">
                  <FolderIcon size={24} />
                </div>

                <h2 className="text-sm font-medium text-foreground/70">
                  {search
                    ? "Nothing found"
                    : "This folder is empty"}
                </h2>

                <p className="mt-1 max-w-sm text-sm text-foreground/40">
                  {search
                    ? "Try another search."
                    : "Upload a file or create a new folder to get started."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* New Folder Modal */}
      {showNewFolder && (
        <Modal
          title="New folder"
          onClose={() =>
            setShowNewFolder(false)
          }
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              createFolder();
            }}
            className="space-y-4"
          >
            <input
              autoFocus
              value={newFolderName}
              onChange={(event) =>
                setNewFolderName(
                  event.target.value,
                )
              }
              placeholder="Folder name"
              className="h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-foreground/20"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() =>
                  setShowNewFolder(
                    false,
                  )
                }
                className="rounded-xl px-4 py-2.5 text-sm text-foreground/60 hover:bg-foreground/[0.05]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  creatingFolder ||
                  !newFolderName.trim()
                }
                className="rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background disabled:opacity-50"
              >
                {creatingFolder
                  ? "Creating..."
                  : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Rename Modal */}
      {showRename &&
        actionItem && (
          <Modal
            title={`Rename ${actionItem.type}`}
            onClose={() =>
              setShowRename(false)
            }
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitRename();
              }}
              className="space-y-4"
            >
              <input
                autoFocus
                value={renameValue}
                onChange={(event) =>
                  setRenameValue(
                    event.target.value,
                  )
                }
                className="h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 text-sm text-foreground outline-none focus:border-foreground/20"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowRename(
                      false,
                    )
                  }
                  className="rounded-xl px-4 py-2.5 text-sm text-foreground/60 hover:bg-foreground/[0.05]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    busy ||
                    !renameValue.trim()
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background disabled:opacity-50"
                >
                  <PencilIcon />
                  {busy
                    ? "Saving..."
                    : "Rename"}
                </button>
              </div>
            </form>
          </Modal>
        )}

      {/* Move Modal */}
      {showMove &&
        actionItem && (
          <Modal
            title={`Move ${actionItem.type}`}
            onClose={() =>
              setShowMove(false)
            }
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                submitMove();
              }}
              className="space-y-4"
            >
              <div>
                <p className="mb-2 text-xs text-foreground/40">
                  Destination folder
                </p>

                <input
                  autoFocus
                  value={moveDestination}
                  onChange={(event) =>
                    setMoveDestination(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Leave empty for Vault root"
                  className="h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-foreground/20"
                />

                <p className="mt-2 text-xs text-foreground/35">
                  Example: Projects/2026
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowMove(false)
                  }
                  className="rounded-xl px-4 py-2.5 text-sm text-foreground/60 hover:bg-foreground/[0.05]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background disabled:opacity-50"
                >
                  <MoveIcon />
                  {busy
                    ? "Moving..."
                    : "Move"}
                </button>
              </div>
            </form>
          </Modal>
        )}

      {/* Preview Modal */}
      {showPreview &&
        previewFile && (
          <Modal
            title={previewFile.name}
            wide
            onClose={closePreview}
          >
            <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-xl bg-foreground/[0.035]">
              {previewLoading && (
                <p className="text-sm text-foreground/45">
                  Loading preview...
                </p>
              )}

              {!previewLoading &&
                previewUrl &&
                getPreviewType(
                  previewFile.mime_type,
                ) === "image" && (
                  <img
                    src={previewUrl}
                    alt={previewFile.name}
                    className="max-h-[70vh] max-w-full object-contain"
                  />
                )}

              {!previewLoading &&
                previewUrl &&
                getPreviewType(
                  previewFile.mime_type,
                ) === "video" && (
                  <video
                    src={previewUrl}
                    controls
                    className="max-h-[70vh] max-w-full"
                  />
                )}

              {!previewLoading &&
                previewUrl &&
                getPreviewType(
                  previewFile.mime_type,
                ) === "audio" && (
                  <audio
                    src={previewUrl}
                    controls
                  />
                )}

              {!previewLoading &&
                previewUrl &&
                getPreviewType(
                  previewFile.mime_type,
                ) === "pdf" && (
                  <iframe
                    src={previewUrl}
                    title={previewFile.name}
                    className="h-[70vh] w-full rounded-lg border-0"
                  />
                )}

              {!previewLoading &&
                previewUrl &&
                getPreviewType(
                  previewFile.mime_type,
                ) === "text" && (
                  <iframe
                    src={previewUrl}
                    title={previewFile.name}
                    className="h-[70vh] w-full rounded-lg border-0 bg-background"
                  />
                )}

              {!previewLoading &&
                previewUrl &&
                getPreviewType(
                  previewFile.mime_type,
                ) === "unknown" && (
                  <div className="px-6 py-12 text-center">
                    <FileIcon size={32} />

                    <p className="mt-4 text-sm font-medium text-foreground/70">
                      Preview unavailable
                    </p>

                    <p className="mt-1 text-sm text-foreground/40">
                      Download the file to
                      open it.
                    </p>
                  </div>
                )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-foreground/40">
                {getFileType(
                  previewFile,
                )}{" "}
                ·{" "}
                {formatFileSize(
                  previewFile.size,
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  downloadFile(
                    previewFile,
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background"
              >
                <DownloadIcon />
                Download
              </button>
            </div>
          </Modal>
        )}
    </PageContainer>
  );
}

function ActionsMenu({
  onRename,
  onMove,
  onDelete,
}: {
  onRename: () => void;
  onMove: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute right-12 top-10 z-30 w-44 overflow-hidden rounded-xl border border-foreground/10 bg-background p-1 shadow-2xl">
      <button
        type="button"
        onClick={onRename}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground/75 hover:bg-foreground/[0.06]"
      >
        <PencilIcon />
        Rename
      </button>

      <button
        type="button"
        onClick={onMove}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground/75 hover:bg-foreground/[0.06]"
      >
        <MoveIcon />
        Move
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 hover:bg-red-500/10"
      >
        <TrashIcon />
        Delete
      </button>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
  wide = false,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        className={`w-full ${
          wide ? "max-w-5xl" : "max-w-md"
        } overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-foreground/40 transition hover:bg-foreground/[0.06] hover:text-foreground"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
}