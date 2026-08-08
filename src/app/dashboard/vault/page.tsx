"use client";

import { useEffect, useMemo, useState } from "react";
import PageContainer from "@/components/dashboard/PageContainer";

type Folder = {
  id: number;
  name: string;
  parent_id: number | null;
};

type FileItem = {
  id: number;
  name: string;
  mime_type: string | null;
  size_bytes: number | null;
  folder_id: number | null;
};

type VaultResponse = {
  folders: Folder[];
  files: FileItem[];
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

function getFileType(file: FileItem) {
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
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadVault() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/vault", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load Vault");
        }

        const data: VaultResponse = await response.json();

        if (cancelled) {
          return;
        }

        setFolders(data.folders);
        setFiles(data.files);
      } catch (err) {
        if (cancelled) {
          return;
        }

        console.error(err);
        setError("Unable to load your Vault.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadVault();

    return () => {
      cancelled = true;
    };
  }, []);

  const currentFolder = folders.find(
    (folder) => folder.id === currentFolderId,
  );

  const visibleFolders = useMemo(() => {
    return folders.filter(
      (folder) => folder.parent_id === currentFolderId,
    );
  }, [folders, currentFolderId]);

  const visibleFiles = useMemo(() => {
    const query = search.trim().toLowerCase();

    return files.filter((file) => {
      if (file.folder_id !== currentFolderId) {
        return false;
      }

      if (!query) {
        return true;
      }

      return file.name.toLowerCase().includes(query);
    });
  }, [files, currentFolderId, search]);

  const goToFolder = (folderId: number) => {
    setCurrentFolderId(folderId);
    setSearch("");
  };

  const goBack = () => {
    if (!currentFolder) {
      return;
    }

    setCurrentFolderId(currentFolder.parent_id);
    setSearch("");
  };

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

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            <PlusIcon />
            New
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-foreground/40">
            <SearchIcon />
          </div>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search files..."
            className="h-11 w-full rounded-xl border border-foreground/10 bg-foreground/[0.035] pl-11 pr-4 text-sm text-foreground outline-none transition placeholder:text-foreground/35 focus:border-foreground/20 focus:bg-foreground/[0.05]"
          />
        </div>

        {/* Breadcrumb */}
        <div className="flex min-h-8 items-center gap-2 text-sm">
          {currentFolder ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setCurrentFolderId(null);
                  setSearch("");
                }}
                className="text-foreground/45 transition-colors hover:text-foreground"
              >
                Vault
              </button>

              <span className="text-foreground/25">/</span>

              {currentFolder.parent_id !== null && (
                <>
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground"
                  >
                    <ArrowLeftIcon />
                    Back
                  </button>

                  <span className="text-foreground/25">/</span>
                </>
              )}

              <span className="font-medium text-foreground/80">
                {currentFolder.name}
              </span>
            </>
          ) : (
            <span className="font-medium text-foreground/70">
              All files
            </span>
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
                      key={folder.id}
                      type="button"
                      onClick={() => goToFolder(folder.id)}
                      className="group flex items-center gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.025] p-4 text-left transition hover:border-foreground/20 hover:bg-foreground/[0.05]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.06] text-foreground/65 transition group-hover:text-foreground">
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
                  {currentFolderId !== null ? "Files" : "Recent files"}
                </h2>

                <span className="text-xs text-foreground/35">
                  {visibleFiles.length}{" "}
                  {visibleFiles.length === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/[0.02]">
                {visibleFiles.length > 0 ? (
                  <div>
                    {visibleFiles.map((file) => (
                      <div
                        key={file.id}
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
                          {formatFileSize(file.size_bytes)}
                        </span>

                        <button
                          type="button"
                          aria-label={`Open ${file.name}`}
                          className="rounded-lg px-2 py-1 text-foreground/35 transition hover:bg-foreground/[0.05] hover:text-foreground"
                        >
                          •••
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
    </PageContainer>
  );
}