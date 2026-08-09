"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

function FolderIcon() {
  return (
    <svg
      width="22"
      height="22"
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

function FileIcon() {
  return (
    <svg
      width="20"
      height="20"
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

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
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

    return file.mime_type;
  }

  const extension = file.name.split(".").pop();

  return extension ? extension.toUpperCase() : "FILE";
}

export default function VaultPage() {
  const [folders, setFolders] = useState<StorageFolder[]>([]);
  const [files, setFiles] = useState<StorageFile[]>([]);

  const [currentPath, setCurrentPath] = useState("");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function loadVault(path = currentPath) {
    try {
      setLoading(true);
      setError(null);

      const query = path
        ? `?path=${encodeURIComponent(path)}`
        : "";

      const response = await fetch(`/api/vault${query}`, {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to load Vault",
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
    const query = search.trim().toLowerCase();

    if (!query) {
      return folders;
    }

    return folders.filter((folder) =>
      folder.name.toLowerCase().includes(query),
    );
  }, [folders, search]);

  const visibleFiles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return files;
    }

    return files.filter((file) =>
      file.name.toLowerCase().includes(query),
    );
  }, [files, search]);

  function openFolder(folder: StorageFolder) {
    setSearch("");
    setCurrentPath(folder.path);
    setShowNewMenu(false);
  }

  function goBack() {
    if (!currentPath) {
      return;
    }

    const parts = currentPath.split("/").filter(Boolean);

    parts.pop();

    setSearch("");
    setCurrentPath(parts.join("/"));
  }

  function goToRoot() {
    setSearch("");
    setCurrentPath("");
  }

  async function createFolder() {
    const name = newFolderName.trim();

    if (!name) {
      return;
    }

    try {
      setCreatingFolder(true);
      setError(null);

      const response = await fetch("/api/vault", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create-folder",
          path: currentPath,
          name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to create folder",
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

  async function uploadFile(file: File) {
    try {
      setUploading(true);
      setError(null);
      setShowNewMenu(false);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("path", currentPath);

      const response = await fetch("/api/vault/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to upload file",
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

  async function downloadFile(file: StorageFile) {
    try {
      setError(null);

      const response = await fetch(
        `/api/vault/download?path=${encodeURIComponent(
          file.path,
        )}`,
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.error || "Failed to download file",
        );
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");

      anchor.href = url;
      anchor.download = file.name;

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to download file.",
      );
    }
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
              Your private and secure storage.
            </p>
          </div>

          <div className="relative">
            <button
              type="button"
              disabled={uploading}
              onClick={() => {
                setError(null);
                setShowNewMenu((value) => !value);
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <PlusIcon />

              {uploading ? "Uploading..." : "New"}
            </button>

            {showNewMenu && (
              <div className="absolute right-0 top-12 z-40 w-48 overflow-hidden rounded-xl border border-foreground/10 bg-background p-1 shadow-2xl">

                <button
                  type="button"
                  onClick={() => {
                    setShowNewMenu(false);
                    setNewFolderName("");
                    setShowNewFolder(true);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground/80 transition hover:bg-foreground/[0.06]"
                >
                  <FolderIcon />
                  New folder
                </button>

                <button
                  type="button"
                  onClick={openFilePicker}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-foreground/80 transition hover:bg-foreground/[0.06]"
                >
                  <UploadIcon />
                  Upload file
                </button>
              </div>
            )}
          </div>
        </div>

        {/* File input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          disabled={uploading}
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              uploadFile(file);
            }

            event.currentTarget.value = "";
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
              setSearch(event.target.value)
            }
            placeholder="Search files..."
            className="h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.035] pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-foreground/20"
          />
        </div>

        {/* Breadcrumb */}
        <div className="flex min-h-8 items-center gap-2 text-sm">

          <button
            type="button"
            onClick={goToRoot}
            className="text-foreground/45 transition hover:text-foreground"
          >
            Vault
          </button>

          {currentPath && (
            <>
              <span className="text-foreground/25">
                /
              </span>

              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1 text-foreground/60 transition hover:text-foreground"
              >
                <ArrowLeftIcon />
                Back
              </button>

              <span className="text-foreground/25">
                /
              </span>

              <span className="font-medium text-foreground/80">
                {
                  currentPath
                    .split("/")
                    .filter(Boolean)
                    .at(-1)
                }
              </span>
            </>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 text-center">
            <p className="text-sm text-foreground/45">
              Loading Vault...
            </p>
          </div>
        ) : (
          <>
            {/* Folders */}
            {visibleFolders.length > 0 && (
              <section>
                <div className="mb-3">
                  <h2 className="text-sm font-medium text-foreground/60">
                    Folders
                  </h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleFolders.map((folder) => (
                    <button
                      key={folder.path}
                      type="button"
                      onClick={() => openFolder(folder)}
                      className="group flex items-center gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.025] p-4 text-left transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground/65">
                        <FolderIcon />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground/85">
                          {folder.name}
                        </p>

                        <p className="mt-0.5 text-xs text-foreground/40">
                          Open folder
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Files */}
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground/60">
                  Files
                </h2>

                <span className="text-xs text-foreground/35">
                  {visibleFiles.length}{" "}
                  {visibleFiles.length === 1
                    ? "item"
                    : "items"}
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
                {visibleFiles.length > 0 ? (
                  <div>
                    {visibleFiles.map((file) => (
                      <div
                        key={file.path}
                        className="flex items-center gap-3 border-b border-foreground/10 px-4 py-4 last:border-b-0"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground/[0.05] text-foreground/55">
                          <FileIcon />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground/80">
                            {file.name}
                          </p>

                          <p className="mt-0.5 text-xs text-foreground/40">
                            {getFileType(file)}
                          </p>
                        </div>

                        <span className="hidden text-xs text-foreground/40 sm:block">
                          {formatFileSize(file.size)}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            downloadFile(file)
                          }
                          className="rounded-lg px-3 py-2 text-xs font-medium text-foreground/60 transition hover:bg-foreground/[0.05] hover:text-foreground"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex min-h-40 flex-col items-center justify-center px-6 text-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-foreground/[0.05] text-foreground/35">
                      <FolderIcon />
                    </div>

                    <p className="mt-3 text-sm font-medium text-foreground/60">
                      {search
                        ? "Nothing found"
                        : "This folder is empty"}
                    </p>

                    <p className="mt-1 max-w-sm text-xs leading-relaxed text-foreground/35">
                      {search
                        ? "Try another search."
                        : "Files and folders you add here will appear in your Vault."}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      {/* New Folder Modal */}
      {showNewFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-2xl border border-foreground/10 bg-background p-6 shadow-2xl">

            <h2 className="text-lg font-semibold text-foreground">
              Create folder
            </h2>

            <p className="mt-1 text-sm text-foreground/50">
              Add a new folder to your Vault.
            </p>

            <input
              autoFocus
              type="text"
              value={newFolderName}
              onChange={(event) =>
                setNewFolderName(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  createFolder();
                }

                if (event.key === "Escape") {
                  setShowNewFolder(false);
                }
              }}
              placeholder="Folder name"
              className="mt-5 h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 text-sm text-foreground outline-none placeholder:text-foreground/35 focus:border-foreground/25"
            />

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() =>
                  setShowNewFolder(false)
                }
                disabled={creatingFolder}
                className="flex-1 rounded-xl border border-foreground/10 px-4 py-3 text-sm font-medium text-foreground/70 transition hover:bg-foreground/[0.05] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={createFolder}
                disabled={
                  !newFolderName.trim() ||
                  creatingFolder
                }
                className="flex-1 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {creatingFolder
                  ? "Creating..."
                  : "Create folder"}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}