"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Plus, Trash2, AlertCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SettingItem = {
  key: string;
  value: unknown;
  updatedAt: string;
};

const presets = [
  {
    key: "ai.model.modnet",
    value: JSON.stringify({
      name: "MODNet",
      enabled: true,
      description: "Cepat & ringan · Portrait & selfie",
    }),
    label: "Model MODNet",
  },
  {
    key: "ai.model.birefnet",
    value: JSON.stringify({
      name: "BiRefNet Lite",
      enabled: true,
      description: "Kualitas tepi terbaik · Ilustrasi & detail",
    }),
    label: "Model BiRefNet",
  },
  {
    key: "ai.model.ben2",
    value: JSON.stringify({
      name: "BEN2",
      enabled: true,
      description: "Kualitas profesional · Semua jenis foto",
    }),
    label: "Model BEN2",
  },
  { key: "ai.activeModel", value: '"modnet"', label: "Model aktif" },
  { key: "quota.dailyLimit", value: "10", label: "Kuota harian" },
  { key: "upload.maxSizeMB", value: "10", label: "Batas upload MB" },
  { key: "app.maintenanceMode", value: "false", label: "Maintenance" },
];

function wrapValue(v: unknown): unknown {
  if (v === null || v === undefined) return { value: null };
  if (typeof v === "object") return v;
  return { value: v };
}

function unwrapValue(v: unknown): unknown {
  if (v && typeof v === "object" && !Array.isArray(v) && "value" in v) {
    const wrapped = v as { value: unknown };
    if (Object.keys(v).length === 1) return wrapped.value;
  }
  return v;
}

export function SettingsMain({ settings }: { settings: SettingItem[] }) {
  const router = useRouter();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  function startEdit(item: SettingItem) {
    setEditingKey(item.key);
    setEditValue(JSON.stringify(unwrapValue(item.value), null, 2));
    setError(null);
  }

  function cancelEdit() {
    setEditingKey(null);
    setEditValue("");
    setError(null);
  }

  async function handleSave(key: string) {
    setError(null);
    let parsed: unknown;
    try {
      parsed = JSON.parse(editValue);
    } catch {
      setError("Format JSON tidak valid.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/settings/${encodeURIComponent(key)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: wrapValue(parsed) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal menyimpan.");
      }
      setEditingKey(null);
      router.refresh();
    } catch (e: any) {
      setError(e.message ?? "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  async function handleAdd() {
    setError(null);
    if (!newKey.trim()) {
      setError("Key wajib diisi.");
      return;
    }
    if (!newValue.trim()) {
      setError("Value wajib diisi.");
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(newValue);
    } catch {
      setError("Format JSON tidak valid.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: newKey.trim(),
          value: wrapValue(parsed),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal menambahkan.");
      }
      setNewKey("");
      setNewValue("");
      router.refresh();
    } catch (e: any) {
      setError(e.message ?? "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(key: string) {
    if (!confirm(`Hapus setting "${key}"?`)) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/settings/${encodeURIComponent(key)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Gagal menghapus.");
      }
      router.refresh();
    } catch (e: any) {
      setError(e.message ?? "Terjadi kesalahan.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form tambah */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Tambah Pengaturan
        </h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => {
                setNewKey(p.key);
                setNewValue(p.value);
              }}
              className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs text-gray-600 transition-colors hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 dark:border-gray-800 dark:text-gray-400 dark:hover:border-sky-600 dark:hover:bg-sky-950/40 dark:hover:text-sky-400"
            >
              + {p.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input
            placeholder="key (contoh: ai.model.modnet)"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            className="rounded-lg font-mono text-sm"
          />
          <Input
            placeholder='value JSON (contoh: {"name":"MODNet","enabled":true})'
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="rounded-lg font-mono text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={saving}
          className={cn(
            buttonVariants(),
            "mt-3 rounded-lg bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50"
          )}
        >
          <Plus className="mr-2 size-4" />
          {saving ? "Menyimpan..." : "Tambah"}
        </button>
      </div>

      {/* Tabel settings */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50 hover:bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950">
              <TableHead className="w-64 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Key
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Value
              </TableHead>
              <TableHead className="w-40 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Diperbarui
              </TableHead>
              <TableHead className="w-32 text-right" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                  Belum ada pengaturan. Gunakan form di atas untuk menambahkan.
                </TableCell>
              </TableRow>
            ) : (
              settings.map((item) => {
                const isEditing = editingKey === item.key;
                return (
                  <TableRow
                    key={item.key}
                    className="border-b border-gray-50 hover:bg-gray-50/60 dark:border-gray-800/60 dark:hover:bg-gray-950/40"
                  >
                    <TableCell className="align-top">
                      <code className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                        {item.key}
                      </code>
                    </TableCell>
                    <TableCell className="align-top">
                      {isEditing ? (
                        <textarea
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          rows={6}
                          className="w-full rounded-lg border border-gray-200 bg-white p-2 font-mono text-xs text-gray-700 outline-none focus:border-sky-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                        />
                      ) : (
                        <pre className="max-h-32 overflow-auto whitespace-pre-wrap rounded-lg bg-sky-50 px-2.5 py-1.5 font-mono text-xs text-sky-800 dark:bg-sky-950/40 dark:text-sky-300">
                          {JSON.stringify(unwrapValue(item.value), null, 2)}
                        </pre>
                      )}
                    </TableCell>
                    <TableCell className="align-top text-xs text-gray-500 dark:text-gray-400">
                      {new Date(item.updatedAt).toLocaleString("id-ID", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </TableCell>
                    <TableCell className="text-right align-top">
                      {isEditing ? (
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleSave(item.key)}
                            disabled={saving}
                            className={cn(
                              buttonVariants({ size: "sm" }),
                              "rounded-lg bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50"
                            )}
                          >
                            <Save className="mr-1 size-3.5" />
                            Simpan
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className={cn(
                              buttonVariants({ size: "sm", variant: "outline" }),
                              "rounded-lg border-gray-200 text-gray-700 dark:border-gray-800 dark:text-gray-300"
                            )}
                          >
                            Batal
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-950/40"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.key)}
                            className="rounded-lg p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                            aria-label="Hapus"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        {settings.length} pengaturan tersimpan.
      </p>
    </div>
  );
}