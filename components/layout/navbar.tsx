"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  BookOpen,
  Wand2,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/session/theme-toggle";

// Menu publik tanpa ikon (kecuali Docs)
const publicLinks = [
  { href: "/editor", label: "Unggah" },
  { href: "/plugin", label: "Plugin" },
  { href: "/support", label: "Bantuan" },
];

export function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "loading";
  const closeMenu = () => setOpen(false);

  const role = (session?.user as any)?.role;
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* KIRI: Logo + Docs + Menu Publik */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            onClick={closeMenu}
            aria-label="GosokBG"
          >
            <Image
              src="/images/gosokbg.png"
              alt="GosokBG"
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Menu desktop di samping logo */}
          <nav className="hidden items-center gap-5 md:flex">
            {/* Docs — pakai ikon, dekat logo */}
            <Link
              href="/docs"
              className="flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
            >
              <BookOpen className="size-4" />
              Docs
            </Link>

            {/* Menu lain — tanpa ikon */}
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* KANAN: Tema + Aksi */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          {isLoading ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-gray-100 dark:bg-gray-800" />
          ) : session?.user ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-gray-200 p-0.5 transition-colors hover:border-sky-400 dark:border-gray-800 dark:hover:border-sky-600"
                aria-label="Menu akun"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "Pengguna"}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <span className="grid size-8 place-items-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                    <UserIcon className="size-4" />
                  </span>
                )}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                  {/* Info pengguna */}
                  <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {session.user.name ?? "Pengguna"}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {session.user.email}
                    </p>
                    {isAdmin && (
                      <span className="mt-2 inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:bg-sky-950/60 dark:text-sky-400">
                        Admin
                      </span>
                    )}
                  </div>

                  {/* Menu: Editor */}
                  <Link
                    href="/editor"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 dark:text-gray-300 dark:hover:bg-sky-950/40"
                  >
                    <Wand2 className="size-4" />
                    Editor
                  </Link>

                  {/* Menu: Dasbor (admin) */}
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 dark:text-gray-300 dark:hover:bg-sky-950/40"
                    >
                      <LayoutDashboard className="size-4" />
                      Dasbor
                    </Link>
                  )}

                  {/* Menu: Docs */}
                  <Link
                    href="/docs"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 dark:text-gray-300 dark:hover:bg-sky-950/40"
                  >
                    <BookOpen className="size-4" />
                    Docs
                  </Link>

                  {/* Keluar */}
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:border-gray-800 dark:hover:bg-red-950/30"
                  >
                    <LogOut className="size-4" />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "rounded-none text-gray-700 hover:bg-gray-100 hover:text-sky-600 dark:text-gray-300 dark:hover:bg-gray-800"
                )}
              >
                Masuk
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "rounded-none bg-sky-500 text-white hover:bg-sky-600"
                )}
              >
                Daftar Gratis
              </Link>
            </>
          )}
        </div>

        {/* Tombol Mobile */}
        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          className="text-gray-700 md:hidden dark:text-gray-300"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Menu Mobile */}
      <div
        className={cn(
          "overflow-hidden border-t border-gray-200 transition-all md:hidden dark:border-gray-800",
          open ? "max-h-[600px]" : "max-h-0 border-t-0"
        )}
      >
        <div className="flex flex-col gap-2 bg-white px-4 py-4 dark:bg-black">
          {/* Docs — pakai ikon */}
          <Link
            href="/docs"
            onClick={closeMenu}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 dark:text-gray-300 dark:hover:bg-sky-950/40"
          >
            <BookOpen className="size-4" />
            Docs
          </Link>

          {/* Menu lain — tanpa ikon */}
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 dark:text-gray-300 dark:hover:bg-sky-950/40"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-2 flex items-center justify-between rounded-md px-3 py-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Tema
            </span>
            <ThemeToggle />
          </div>

          <div className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
            {session?.user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "Pengguna"}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="grid size-9 place-items-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                      <UserIcon className="size-4" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {session.user.name ?? "Pengguna"}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      {session.user.email}
                    </p>
                    {isAdmin && (
                      <span className="mt-1 inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:bg-sky-950/60 dark:text-sky-400">
                        Admin
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  href="/editor"
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 dark:text-gray-300 dark:hover:bg-sky-950/40"
                >
                  <Wand2 className="size-4" />
                  Editor
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin/dashboard"
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-sky-50 dark:text-gray-300 dark:hover:bg-sky-950/40"
                  >
                    <LayoutDashboard className="size-4" />
                    Dasbor
                  </Link>
                )}

                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                  )}
                  onClick={() => {
                    closeMenu();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  <LogOut className="mr-2 size-4" />
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "border-gray-200 text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  Masuk
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className={cn(
                    buttonVariants(),
                    "bg-sky-500 text-white hover:bg-sky-600"
                  )}
                >
                  Daftar Gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}