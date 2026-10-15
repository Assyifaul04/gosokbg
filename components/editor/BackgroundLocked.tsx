"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";

export function BackgroundLocked() {
  const pathname = usePathname();
  const loginHref = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  return (
    <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-4 dark:border-gray-800 dark:bg-gray-900/60">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 ring-1 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-400 dark:ring-sky-900/50">
            <Lock className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Ganti background dengan warna
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              Fitur ini tersedia untuk pengguna yang sudah login.
            </p>
          </div>
        </div>

        <Link
          href={loginHref}
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg bg-sky-500 px-4 text-xs font-medium text-white shadow-sm transition-colors hover:bg-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
        >
          Login sekarang
        </Link>
      </div>
    </div>
  );
}