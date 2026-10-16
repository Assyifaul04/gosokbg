"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  DataTable,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EmptyState,
} from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";

type ProcessRow = {
  id: string;
  modelName: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  inputBytes: string | null;
  processingMs: number | null;
  createdAt: string;
  guestKey: string | null;
  userName: string | null;
  userEmail: string | null;
};

function formatBytes(bytes: string | null): string {
  if (!bytes) return "0 B";
  const n = Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleString("id-ID", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export function RecentProcessesTable({ rows }: { rows: ProcessRow[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeletingAll, setIsDeletingAll] = useState(false);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Hapus proses milik "${name}"? Tindakan tidak dapat dibatalkan.`)) {
      return;
    }

    setDeletingId(id);

    const promise = fetch(`/api/admin/dashboard/recent-processes/${id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal menghapus data");
      }
      return res.json();
    });

    toast.promise(promise, {
      loading: "Menghapus data...",
      success: () => {
        startTransition(() => router.refresh());
        return "Data berhasil dihapus";
      },
      error: (err) => err?.message ?? "Gagal menghapus data",
      finally: () => setDeletingId(null),
    });
  }

  async function handleDeleteAll() {
    if (rows.length === 0) return;

    if (
      !confirm(
        `Hapus SEMUA (${rows.length}) proses yang tampil? Tindakan tidak dapat dibatalkan.`
      )
    ) {
      return;
    }

    setIsDeletingAll(true);

    const ids = rows.map((r) => r.id);

    const promise = fetch(`/api/admin/dashboard/recent-processes`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    }).then(async (res) => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal menghapus data");
      }
      return res.json() as Promise<{ ok: true; count: number }>;
    });

    toast.promise(promise, {
      loading: "Menghapus semua data...",
      success: (data) => {
        startTransition(() => router.refresh());
        return `${data.count ?? ids.length} data berhasil dihapus`;
      },
      error: (err) => err?.message ?? "Gagal menghapus data",
      finally: () => setIsDeletingAll(false),
    });
  }

  const isBusy = isDeletingAll || isPending || deletingId !== null;

  return (
    <DataTable
      title="Proses Terbaru"
      action={
        rows.length > 0 ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleDeleteAll}
            disabled={isBusy}
            className="h-8 rounded-md border-red-200 px-2.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 sm:px-3 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            {isDeletingAll ? (
              <>
                <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                <span className="hidden sm:inline">Menghapus...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <>
                <Trash2 className="mr-1.5 size-3.5" />
                <span className="hidden sm:inline">Hapus Semua</span>
                <span className="sm:hidden">Semua</span>
              </>
            )}
          </Button>
        ) : null
      }
    >
      {rows.length === 0 ? (
        <EmptyState message="Belum ada proses." />
      ) : (
        <>
          {/* Mobile: card view */}
          <div className="divide-y divide-gray-100 dark:divide-gray-900 md:hidden">
            {rows.map((p) => {
              const isDeleting = deletingId === p.id;
              return (
                <div key={p.id} className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {p.userName ?? "Tamu"}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                        {p.userEmail ?? p.guestKey ?? "-"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(p.id, p.userName ?? p.userEmail ?? "Tamu")
                      }
                      disabled={isBusy}
                      className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:border-gray-800 dark:text-gray-400 dark:hover:border-red-900 dark:hover:bg-red-950/40"
                    >
                      {isDeleting ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {p.modelName}
                    </span>
                    <span className="text-gray-300 dark:text-gray-700">·</span>
                    <StatusBadge status={p.status} />
                    <span className="text-gray-300 dark:text-gray-700">·</span>
                    <span>{formatBytes(p.inputBytes)}</span>
                    {p.processingMs && (
                      <>
                        <span className="text-gray-300 dark:text-gray-700">·</span>
                        <span>{p.processingMs} ms</span>
                      </>
                    )}
                  </div>

                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    {formatDate(p.createdAt)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Desktop: table view */}
          <div className="hidden md:block">
            <Table>
              <THead>
                <TR>
                  <TH>Pengguna</TH>
                  <TH>Model</TH>
                  <TH>Status</TH>
                  <TH>Ukuran Input</TH>
                  <TH>Durasi</TH>
                  <TH>Waktu</TH>
                  <TH>Aksi</TH>
                </TR>
              </THead>
              <TBody>
                {rows.map((p) => {
                  const isDeleting = deletingId === p.id;
                  return (
                    <TR key={p.id}>
                      <TD>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {p.userName ?? "Tamu"}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {p.userEmail ?? p.guestKey ?? "-"}
                          </span>
                        </div>
                      </TD>
                      <TD>{p.modelName}</TD>
                      <TD>
                        <StatusBadge status={p.status} />
                      </TD>
                      <TD>{formatBytes(p.inputBytes)}</TD>
                      <TD>{p.processingMs ? `${p.processingMs} ms` : "-"}</TD>
                      <TD>{formatDate(p.createdAt)}</TD>
                      <TD>
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(
                              p.id,
                              p.userName ?? p.userEmail ?? "Tamu"
                            )
                          }
                          disabled={isBusy}
                          title="Hapus data ini"
                          className="inline-flex size-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:text-gray-400 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-400"
                        >
                          {isDeleting ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="size-3.5" />
                          )}
                        </button>
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </div>
        </>
      )}
    </DataTable>
  );
}