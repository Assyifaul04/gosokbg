"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  User as UserIcon,
  Eye,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AuditItem = {
  id: string;
  adminId: string | null;
  adminName: string | null;
  adminEmail: string | null;
  adminImage: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  details: string | null;
  createdAt: string;
};

function actionColor(action: string): string {
  if (action.startsWith("DELETE") || action.includes("REMOVE"))
    return "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400";
  if (action.startsWith("CREATE") || action.includes("ADD"))
    return "bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400";
  if (action.startsWith("UPDATE") || action.includes("EDIT"))
    return "bg-sky-100 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400";
  return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
}

export function AuditMain({
  logs,
  actions,
}: {
  logs: AuditItem[];
  actions: string[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const clearAllRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setConfirmId(null);
      }
      if (clearAllRef.current && !clearAllRef.current.contains(e.target as Node)) {
        setShowClearAll(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const matchQuery =
        !query ||
        (l.adminName ?? "").toLowerCase().includes(query.toLowerCase()) ||
        (l.adminEmail ?? "").toLowerCase().includes(query.toLowerCase()) ||
        l.action.toLowerCase().includes(query.toLowerCase()) ||
        (l.targetType ?? "").toLowerCase().includes(query.toLowerCase());

      const matchAction = actionFilter === "ALL" || l.action === actionFilter;

      return matchQuery && matchAction;
    });
  }, [logs, query, actionFilter]);

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === filtered.length && filtered.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((l) => l.id)));
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/audit/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? "Gagal menghapus audit log.");
      }

      toast.success("Audit log dihapus", {
        description: "1 baris telah dihapus dari database.",
      });

      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setConfirmId(null);
      router.refresh();
    } catch (err: any) {
      console.error("Delete error:", err);
      toast.error("Gagal menghapus", {
        description: err?.message ?? "Terjadi kesalahan.",
      });
    } finally {
      setDeleting(false);
    }
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    if (
      !confirm(
        `Hapus ${selectedIds.size} audit log terpilih? Tindakan ini tidak bisa dibatalkan.`
      )
    ) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/audit", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? "Gagal menghapus.");
      }

      toast.success("Berhasil dihapus", {
        description: `${data.deleted} audit log telah dihapus dari database.`,
      });

      setSelectedIds(new Set());
      router.refresh();
    } catch (err: any) {
      console.error("Bulk delete error:", err);
      toast.error("Gagal menghapus", {
        description: err?.message ?? "Terjadi kesalahan.",
      });
    } finally {
      setDeleting(false);
    }
  }

  async function handleClearAll() {
    setShowClearAll(false);
    if (
      !confirm(
        "Hapus SEMUA audit log? Tindakan ini tidak bisa dibatalkan dan akan mengosongkan seluruh riwayat tindakan admin."
      )
    ) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/audit", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? "Gagal menghapus semua.");
      }

      toast.success("Semua audit log dihapus", {
        description: `${data.deleted} baris telah dikosongkan.`,
      });

      setSelectedIds(new Set());
      router.refresh();
    } catch (err: any) {
      console.error("Clear all error:", err);
      toast.error("Gagal menghapus semua", {
        description: err?.message ?? "Terjadi kesalahan.",
      });
    } finally {
      setDeleting(false);
    }
  }

  const allSelected =
    filtered.length > 0 && selectedIds.size === filtered.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Cari admin, aksi, atau target..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-md pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-sky-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="ALL">Semua Aksi</option>
            {actions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          {/* Hapus Semua */}
          <div className="relative" ref={clearAllRef}>
            <button
              type="button"
              onClick={() => setShowClearAll((v) => !v)}
              disabled={deleting || logs.length === 0}
              className="flex h-9 items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-900/50 dark:hover:bg-red-950/30"
            >
              <Trash2 className="size-4" />
              Hapus Semua
            </button>

            {showClearAll && (
              <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                <div className="flex items-start gap-2 p-4">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Hapus semua audit log?
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {logs.length} baris akan dihapus permanen. Tindakan ini
                      tidak bisa dibatalkan.
                    </p>
                  </div>
                </div>
                <div className="flex border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => setShowClearAll(false)}
                    className="flex-1 border-r border-gray-100 px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    disabled={deleting}
                    className="flex flex-1 items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/30"
                  >
                    {deleting ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="size-3.5" />
                    )}
                    Ya, hapus semua
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2.5 dark:border-sky-900/50 dark:bg-sky-950/40">
          <p className="text-sm font-medium text-sky-800 dark:text-sky-300">
            {selectedIds.size} dipilih
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedIds(new Set())}
              disabled={deleting}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100 disabled:opacity-50 dark:text-sky-300 dark:hover:bg-sky-950"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleBulkDelete}
              disabled={deleting}
              className="flex items-center gap-1.5 rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-600 disabled:opacity-50"
            >
              {deleting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
              Hapus {selectedIds.size}
            </button>
          </div>
        </div>
      )}

      {/* Tabel */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50 hover:bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950">
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={toggleSelectAll}
                  className="size-4 cursor-pointer rounded border-gray-300 text-sky-500 focus:ring-sky-500 dark:border-gray-700"
                  aria-label="Pilih semua"
                />
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Admin
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Aksi
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Target
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Waktu
              </TableHead>
              <TableHead className="w-24 text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Tidak ada log ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((l) => {
                const isSelected = selectedIds.has(l.id);
                return (
                  <TableRow
                    key={l.id}
                    className={cn(
                      "border-b border-gray-50 hover:bg-gray-50/60 dark:border-gray-800/60 dark:hover:bg-gray-950/40",
                      isSelected && "bg-sky-50/50 dark:bg-sky-950/20"
                    )}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(l.id)}
                        className="size-4 cursor-pointer rounded border-gray-300 text-sky-500 focus:ring-sky-500 dark:border-gray-700"
                        aria-label={`Pilih ${l.id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {l.adminImage ? (
                          <Image
                            src={l.adminImage}
                            alt={l.adminName ?? "Admin"}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <span className="grid size-8 place-items-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                            <UserIcon className="size-4" />
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {l.adminName ?? "Sistem"}
                          </p>
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {l.adminEmail ?? "-"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={actionColor(l.action)}>
                        {l.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {l.targetType ? (
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {l.targetType}
                          </span>
                          {l.targetId && (
                            <span className="truncate text-xs text-gray-500 dark:text-gray-400">
                              #{l.targetId.slice(0, 8)}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(l.createdAt).toLocaleString("id-ID", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {/* Detail */}
                        <div
                          className="relative inline-block"
                          ref={openId === l.id ? menuRef : null}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenId((v) => (v === l.id ? null : l.id))
                            }
                            className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Lihat detail"
                          >
                            <Eye className="size-4" />
                          </button>

                          {openId === l.id && (
                            <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 text-left shadow-lg dark:border-gray-800 dark:bg-gray-950">
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                                Detail Log
                              </p>
                              <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-xs text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                                {l.details
                                  ? JSON.stringify(
                                      JSON.parse(l.details),
                                      null,
                                      2
                                    )
                                  : "Tidak ada detail."}
                              </pre>
                            </div>
                          )}
                        </div>

                        {/* Hapus */}
                        <div
                          className="relative inline-block"
                          ref={confirmId === l.id ? menuRef : null}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setConfirmId((v) => (v === l.id ? null : l.id))
                            }
                            disabled={deleting}
                            className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-950/30"
                            aria-label="Hapus"
                          >
                            <Trash2 className="size-4" />
                          </button>

                          {confirmId === l.id && (
                            <div className="absolute right-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                              <div className="flex items-start gap-2 p-3">
                                <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                                <div className="min-w-0">
                                  <p className="text-xs font-medium text-gray-900 dark:text-white">
                                    Hapus log ini?
                                  </p>
                                  <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                                    Tindakan ini tidak bisa dibatalkan.
                                  </p>
                                </div>
                              </div>
                              <div className="flex border-t border-gray-100 dark:border-gray-800">
                                <button
                                  type="button"
                                  onClick={() => setConfirmId(null)}
                                  disabled={deleting}
                                  className="flex-1 border-r border-gray-100 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-900"
                                >
                                  Batal
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(l.id)}
                                  disabled={deleting}
                                  className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/30"
                                >
                                  {deleting ? (
                                    <Loader2 className="size-3 animate-spin" />
                                  ) : (
                                    <Trash2 className="size-3" />
                                  )}
                                  Hapus
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Menampilkan {filtered.length} dari {logs.length} log.
      </p>
    </div>
  );
}