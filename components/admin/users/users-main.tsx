"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Search,
  MoreHorizontal,
  Shield,
  User as UserIcon,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserItem = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function UsersMain({ users }: { users: UserItem[] }) {
  const router = useRouter();
  const { data: session } = useSession();
  const currentUserId = (session?.user as any)?.id;

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | "USER" | "ADMIN">("ALL");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchQuery =
        !query ||
        (u.name ?? "").toLowerCase().includes(query.toLowerCase()) ||
        (u.email ?? "").toLowerCase().includes(query.toLowerCase());
      const matchRole = roleFilter === "ALL" || u.role === roleFilter;
      const matchStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && u.isActive) ||
        (statusFilter === "INACTIVE" && !u.isActive);
      return matchQuery && matchRole && matchStatus;
    });
  }, [users, query, roleFilter, statusFilter]);

  async function patchUser(id: string, body: Record<string, unknown>) {
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal mengubah data");
      }
      toast.success("Berhasil diperbarui");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal mengubah data");
    } finally {
      setBusy(null);
      setOpenMenuId(null);
    }
  }

  async function deleteUser(id: string, name: string) {
    if (
      !confirm(
        `Hapus pengguna "${name}"? Semua data terkait (riwayat, kuota, tiket) akan ikut terhapus. Tindakan ini tidak bisa dibatalkan.`
      )
    ) {
      return;
    }

    setDeletingId(id);
    setOpenMenuId(null);

    const promise = fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal menghapus pengguna");
      }
      return res.json();
    });

    toast.promise(promise, {
      loading: "Menghapus pengguna...",
      success: () => {
        router.refresh();
        return "Pengguna berhasil dihapus";
      },
      error: (err) => err?.message ?? "Gagal menghapus pengguna",
      finally: () => setDeletingId(null),
    });
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Cari nama atau email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-md pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value as "ALL" | "USER" | "ADMIN")
            }
            className="h-9 flex-1 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-sky-500 sm:flex-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="ALL">Semua Role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "ALL" | "ACTIVE" | "INACTIVE"
              )
            }
            className="h-9 flex-1 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-sky-500 sm:flex-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="ALL">Semua Status</option>
            <option value="ACTIVE">Aktif</option>
            <option value="INACTIVE">Nonaktif</option>
          </select>
        </div>
      </div>

      {/* Desktop: Table */}
      <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white md:block dark:border-gray-800 dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50 hover:bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950">
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Pengguna
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Email
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Role
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Terdaftar
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Tidak ada pengguna ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((u) => {
                const isSelf = u.id === currentUserId;
                const isDeleting = deletingId === u.id;
                return (
                  <TableRow
                    key={u.id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 dark:border-gray-800/60 dark:hover:bg-gray-950/40"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {u.image ? (
                          <Image
                            src={u.image}
                            alt={u.name ?? "User"}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="grid size-8 place-items-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                            <UserIcon className="size-4" />
                          </span>
                        )}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {u.name ?? "-"}
                          {isSelf && (
                            <span className="ml-2 text-xs font-normal text-gray-400">
                              (Anda)
                            </span>
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {u.email ?? "-"}
                    </TableCell>
                    <TableCell>
                      {u.role === "ADMIN" ? (
                        <Badge className="gap-1 rounded-md bg-sky-100 text-sky-700 hover:bg-sky-100 dark:bg-sky-950/60 dark:text-sky-400">
                          <Shield className="size-3" />
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="rounded-md">
                          User
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          u.isActive
                            ? "text-sm text-green-600 dark:text-green-400"
                            : "text-sm text-red-600 dark:text-red-400"
                        }
                      >
                        {u.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(u.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className="relative inline-block"
                        ref={openMenuId === u.id ? menuRef : null}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((v) => (v === u.id ? null : u.id))
                          }
                          disabled={busy === u.id || isDeleting}
                          className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
                          aria-label="Menu aksi"
                        >
                          {isDeleting ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="size-4" />
                          )}
                        </button>

                        {openMenuId === u.id && (
                          <div className="absolute right-0 top-full z-50 mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                            <button
                              type="button"
                              onClick={() =>
                                patchUser(u.id, { isActive: !u.isActive })
                              }
                              disabled={isSelf}
                              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-900"
                            >
                              {u.isActive ? "Nonaktifkan" : "Aktifkan"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                patchUser(u.id, {
                                  role: u.role === "ADMIN" ? "USER" : "ADMIN",
                                })
                              }
                              disabled={isSelf}
                              className="flex w-full items-center border-t border-gray-100 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
                            >
                              {u.role === "ADMIN"
                                ? "Jadikan User"
                                : "Jadikan Admin"}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteUser(
                                  u.id,
                                  u.name ?? u.email ?? "pengguna ini"
                                )
                              }
                              disabled={isSelf}
                              className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:text-red-400 dark:hover:bg-red-950/30"
                            >
                              <Trash2 className="size-3.5" />
                              Hapus Pengguna
                            </button>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: Card View */}
      <div className="space-y-3 md:hidden">
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 py-12 text-center dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tidak ada pengguna ditemukan.
            </p>
          </div>
        ) : (
          filtered.map((u) => {
            const isSelf = u.id === currentUserId;
            const isDeleting = deletingId === u.id;
            return (
              <div
                key={u.id}
                className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {u.image ? (
                      <Image
                        src={u.image}
                        alt={u.name ?? "User"}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-full"
                      />
                    ) : (
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                        <UserIcon className="size-5" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {u.name ?? "-"}
                        {isSelf && (
                          <span className="ml-1.5 text-xs font-normal text-gray-400">
                            (Anda)
                          </span>
                        )}
                      </p>
                      <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        {u.email ?? "-"}
                      </p>
                    </div>
                  </div>

                  <div
                    className="relative shrink-0"
                    ref={openMenuId === u.id ? menuRef : null}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((v) => (v === u.id ? null : u.id))
                      }
                      disabled={busy === u.id || isDeleting}
                      className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-gray-800"
                      aria-label="Menu aksi"
                    >
                      {isDeleting ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <MoreHorizontal className="size-4" />
                      )}
                    </button>

                    {openMenuId === u.id && (
                      <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                        <button
                          type="button"
                          onClick={() =>
                            patchUser(u.id, { isActive: !u.isActive })
                          }
                          disabled={isSelf}
                          className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-900"
                        >
                          {u.isActive ? "Nonaktifkan" : "Aktifkan"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            patchUser(u.id, {
                              role: u.role === "ADMIN" ? "USER" : "ADMIN",
                            })
                          }
                          disabled={isSelf}
                          className="flex w-full items-center border-t border-gray-100 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
                        >
                          {u.role === "ADMIN" ? "Jadikan User" : "Jadikan Admin"}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteUser(
                              u.id,
                              u.name ?? u.email ?? "pengguna ini"
                            )
                          }
                          disabled={isSelf}
                          className="flex w-full items-center gap-2 border-t border-gray-100 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:text-red-400 dark:hover:bg-red-950/30"
                        >
                          <Trash2 className="size-3.5" />
                          Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                  {u.role === "ADMIN" ? (
                    <Badge className="gap-1 rounded-md bg-sky-100 text-sky-700 hover:bg-sky-100 dark:bg-sky-950/60 dark:text-sky-400">
                      <Shield className="size-3" />
                      Admin
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="rounded-md">
                      User
                    </Badge>
                  )}
                  <span
                    className={`text-xs ${
                      u.isActive
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {u.isActive ? "Aktif" : "Nonaktif"}
                  </span>
                  <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(u.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Menampilkan {filtered.length} dari {users.length} pengguna.
      </p>
    </div>
  );
}