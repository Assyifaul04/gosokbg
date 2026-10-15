"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  User as UserIcon,
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
import { StatusBadge } from "@/components/admin/status-badge";
import { cn } from "@/lib/utils";

type ProcessItem = {
  id: string;
  userId: string | null;
  guestKey: string | null;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  modelName: string;
  inputFormat: string | null;
  outputFormat: string;
  inputBytes: string | null;
  outputBytes: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  processingMs: number | null;
  errorCode: string | null;
  createdAt: string;
  userName: string | null;
  userEmail: string | null;
};

function formatBytes(value: string | null): string {
  if (!value) return "0 B";
  const n = Number(value);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function HistoryMain({ processes }: { processes: ProcessItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
  >("ALL");
  const [modelFilter, setModelFilter] = useState<string>("ALL");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setConfirmId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const models = useMemo(() => {
    const set = new Set<string>();
    processes.forEach((p) => set.add(p.modelName));
    return Array.from(set).sort();
  }, [processes]);

  const filtered = useMemo(() => {
    return processes.filter((p) => {
      const matchQuery =
        !query ||
        (p.userName ?? "").toLowerCase().includes(query.toLowerCase()) ||
        (p.userEmail ?? "").toLowerCase().includes(query.toLowerCase()) ||
        (p.guestKey ?? "").toLowerCase().includes(query.toLowerCase()) ||
        p.modelName.toLowerCase().includes(query.toLowerCase());

      const matchStatus = statusFilter === "ALL" || p.status === statusFilter;
      const matchModel = modelFilter === "ALL" || p.modelName === modelFilter;

      return matchQuery && matchStatus && matchModel;
    });
  }, [processes, query, statusFilter, modelFilter]);

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
      setSelectedIds(new Set(filtered.map((p) => p.id)));
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/history/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? "Gagal menghapus riwayat.");
      }

      toast.success("Riwayat berhasil dihapus", {
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
      toast.error("Gagal menghapus riwayat", {
        description: err?.message ?? "Terjadi kesalahan.",
      });
    } finally {
      setDeleting(false);
    }
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    if (
      !confirm(`Hapus ${selectedIds.size} riwayat terpilih? Tindakan ini tidak bisa dibatalkan.`)
    ) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/admin/history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error ?? "Gagal menghapus.");
      }

      toast.success("Berhasil dihapus", {
        description: `${data.deleted} riwayat telah dihapus dari database.`,
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

  const allSelected =
    filtered.length > 0 && selectedIds.size === filtered.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Cari pengguna, model, atau guest key..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-md pl-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as
                  | "ALL"
                  | "PENDING"
                  | "PROCESSING"
                  | "COMPLETED"
                  | "FAILED"
              )
            }
            className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-sky-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="ALL">Semua Status</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
          </select>

          <select
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            className="h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-sky-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
          >
            <option value="ALL">Semua Model</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
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
                Pengguna
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Model
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Status
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Dimensi
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Input
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Durasi
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Waktu
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Tidak ada proses ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => {
                const isSelected = selectedIds.has(p.id);
                return (
                  <TableRow
                    key={p.id}
                    className={cn(
                      "border-b border-gray-50 hover:bg-gray-50/60 dark:border-gray-800/60 dark:hover:bg-gray-950/40",
                      isSelected && "bg-sky-50/50 dark:bg-sky-950/20"
                    )}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(p.id)}
                        className="size-4 cursor-pointer rounded border-gray-300 text-sky-500 focus:ring-sky-500 dark:border-gray-700"
                        aria-label={`Pilih ${p.id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                          <UserIcon className="size-4" />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {p.userName ?? "Tamu"}
                          </p>
                          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {p.userEmail ?? p.guestKey ?? "-"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-gray-100 px-2 py-0.5 text-xs dark:bg-gray-800">
                        {p.modelName}
                      </code>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={p.status} />
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {p.imageWidth && p.imageHeight
                        ? `${p.imageWidth}×${p.imageHeight}`
                        : "-"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {formatBytes(p.inputBytes)}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {p.processingMs ? `${p.processingMs} ms` : "-"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(p.createdAt).toLocaleString("id-ID", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className="relative inline-block"
                        ref={confirmId === p.id ? menuRef : null}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setConfirmId((v) => (v === p.id ? null : p.id))
                          }
                          disabled={deleting}
                          className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50 dark:hover:bg-red-950/30"
                          aria-label="Hapus"
                        >
                          <Trash2 className="size-4" />
                        </button>

                        {confirmId === p.id && (
                          <div className="absolute right-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                            <div className="flex items-start gap-2 p-3">
                              <AlertCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-900 dark:text-white">
                                  Hapus riwayat ini?
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
                                onClick={() => handleDelete(p.id)}
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
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Menampilkan {filtered.length} dari {processes.length} proses.
      </p>
    </div>
  );
}