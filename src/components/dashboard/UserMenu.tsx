"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { DASHBOARD_ROUTES } from "@/constants/routes";
import { getInitials } from "@/utils/dashboard";

/**
 * User avatar button with a dropdown menu for settings and sign-out.
 */
export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const userName = user?.name ?? user?.email ?? "User";
  const userAvatar = user?.avatarUrl;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="User menu"
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-foreground/15 bg-foreground/[0.06] text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
      >
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={userName}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        ) : (
          getInitials(userName)
        )}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-12 z-20 flex w-52 flex-col gap-1 rounded-2xl border border-foreground/10 bg-background p-2 shadow-lg"
        >
          <div className="border-b border-foreground/10 px-3 py-2">
            <p className="truncate text-sm font-medium text-foreground/85">{userName}</p>
            {user?.email ? (
              <p className="truncate text-xs text-foreground/45">{user.email}</p>
            ) : null}
          </div>
          <Link
            href={DASHBOARD_ROUTES.settings}
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-2 text-sm text-foreground/70 transition-colors hover:bg-foreground/[0.04]"
          >
            Settings
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              void logout();
            }}
            className="rounded-xl px-3 py-2 text-left text-sm text-foreground/70 transition-colors hover:bg-foreground/[0.04]"
          >
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
