"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { DASHBOARD_ROUTES } from "@/constants/routes";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * User avatar button with a dropdown menu for settings and sign-out.
 */
export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const userName = user?.name ?? user?.email ?? "User";
  const userAvatar = user?.avatarUrl;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="User menu"
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-foreground/15 bg-foreground/[0.06] text-xs font-semibold"
      >
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={userName}
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        ) : (
          initials(userName)
        )}
      </button>

      {open && (
        <>
          {/* backdrop to close on outside click */}
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-10"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-11 z-20 flex w-44 flex-col gap-1 rounded-xl border border-foreground/10 bg-background p-2 shadow-lg">
            <Link
              href={DASHBOARD_ROUTES.settings}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-foreground/70 hover:bg-foreground/[0.04]"
            >
              Settings
            </Link>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                void logout();
              }}
              className="rounded-lg px-3 py-2 text-left text-sm text-foreground/70 hover:bg-foreground/[0.04]"
            >
              Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
