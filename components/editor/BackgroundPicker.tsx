"use client";

import { useEffect, useState } from "react";
import { Palette, Check, Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";

export type BgMode = "transparent" | "color";

export const PRESET_COLORS = [
  { label: "Putih", value: "#ffffff" },
  { label: "Hitam", value: "#000000" },
  { label: "Merah", value: "#ef4444" },
  { label: "Biru", value: "#3b82f6" },
  { label: "Hijau", value: "#22c55e" },
  { label: "Kuning", value: "#eab308" },
  { label: "Ungu", value: "#a855f7" },
  { label: "Pink", value: "#ec4899" },
  { label: "Abu", value: "#6b7280" },
  { label: "Cyan", value: "#06b6d4" },
];

const STORAGE_KEY = "gosokbg:customColors";
const MAX_CUSTOM = 20;

function loadCustomColors(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string");
  } catch {
    return [];
  }
}

function saveCustomColors(colors: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
  } catch {
    // ignore quota errors
  }
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-gray-900";

function Swatch({
  value,
  label,
  active,
  onClick,
}: {
  value: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "relative size-7 rounded-lg border transition-transform hover:scale-110",
        focusRing,
        active
          ? "border-sky-500 ring-2 ring-sky-200 dark:ring-sky-900"
          : "border-gray-200 dark:border-gray-700"
      )}
      style={{ backgroundColor: value }}
    >
      {active && (
        <Check
          className="absolute inset-0 m-auto size-3.5 text-white drop-shadow"
          strokeWidth={3}
        />
      )}
    </button>
  );
}

export function BackgroundPicker({
  mode,
  color,
  onModeChange,
  onColorChange,
}: {
  mode: BgMode;
  color: string;
  onModeChange: (mode: BgMode) => void;
  onColorChange: (color: string) => void;
}) {
  const [customColors, setCustomColors] = useState<string[]>([]);

  // Muat dari localStorage saat mount
  useEffect(() => {
    setCustomColors(loadCustomColors());
  }, []);

  const isAlreadySaved =
    customColors.includes(color.toLowerCase()) ||
    PRESET_COLORS.some((c) => c.value.toLowerCase() === color.toLowerCase());

  function addCurrentColor() {
    const value = color.toLowerCase();
    if (isAlreadySaved) return;
    const next = [value, ...customColors].slice(0, MAX_CUSTOM);
    setCustomColors(next);
    saveCustomColors(next);
  }

  function removeCustomColor(value: string) {
    const next = customColors.filter((c) => c !== value);
    setCustomColors(next);
    saveCustomColors(next);
  }

  const segmentBase =
    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors";

  return (
    <div className="border-t border-gray-100 bg-gray-50/60 px-4 py-4 dark:border-gray-800 dark:bg-gray-900/60">
      {/* Header + pilihan mode */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600 ring-1 ring-sky-100 dark:bg-sky-950/40 dark:text-sky-400 dark:ring-sky-900/50">
            <Palette className="size-3.5" />
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Background
          </span>
        </div>

        <div
          role="group"
          aria-label="Mode background"
          className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5 dark:border-gray-800 dark:bg-gray-950"
        >
          <button
            type="button"
            aria-pressed={mode === "transparent"}
            onClick={() => onModeChange("transparent")}
            className={cn(
              segmentBase,
              focusRing,
              mode === "transparent"
                ? "bg-sky-50 text-sky-700 shadow-sm dark:bg-sky-950/40 dark:text-sky-400"
                : "text-gray-600 hover:text-sky-600 dark:text-gray-400"
            )}
          >
            <span
              className="size-3.5 rounded-sm border border-gray-300 dark:border-gray-600"
              style={{
                backgroundImage:
                  "conic-gradient(at 50% 50%, #d1d5db 25%, #ffffff 0 50%, #d1d5db 0 75%, #ffffff 0)",
                backgroundSize: "8px 8px",
              }}
            />
            Transparan
          </button>

          <button
            type="button"
            aria-pressed={mode === "color"}
            onClick={() => onModeChange("color")}
            className={cn(
              segmentBase,
              focusRing,
              mode === "color"
                ? "bg-sky-50 text-sky-700 shadow-sm dark:bg-sky-950/40 dark:text-sky-400"
                : "text-gray-600 hover:text-sky-600 dark:text-gray-400"
            )}
          >
            <span
              className="size-3.5 rounded-sm border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: color }}
            />
            Warna
          </button>
        </div>
      </div>

      {mode === "color" && (
        <div className="mt-4 space-y-4">
          {/* Color picker + simpan */}
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 transition-colors hover:border-sky-400 dark:border-gray-800 dark:bg-gray-950">
              <input
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                aria-label="Pilih warna bebas"
                className="size-5 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <span className="font-mono text-xs text-gray-600 dark:text-gray-400">
                {color}
              </span>
            </label>

            <button
              type="button"
              onClick={addCurrentColor}
              disabled={isAlreadySaved}
              title={
                isAlreadySaved
                  ? "Warna sudah tersimpan"
                  : "Simpan warna ini ke daftar"
              }
              className={cn(
                "inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition-colors",
                focusRing,
                isAlreadySaved
                  ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-700"
                  : "border-gray-200 bg-white text-gray-600 hover:border-sky-400 hover:text-sky-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400"
              )}
            >
              <Plus className="size-3.5" />
              Simpan warna
            </button>
          </div>

          {/* Preset */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              Warna dasar
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map((c) => (
                <Swatch
                  key={c.value}
                  value={c.value}
                  label={c.label}
                  active={color.toLowerCase() === c.value.toLowerCase()}
                  onClick={() => onColorChange(c.value)}
                />
              ))}
            </div>
          </div>

          {/* Warna kustom */}
          {customColors.length > 0 && (
            <div className="border-t border-gray-200 pt-3 dark:border-gray-800">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  Warna saya ({customColors.length}/{MAX_CUSTOM})
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCustomColors([]);
                    saveCustomColors([]);
                  }}
                  className={cn(
                    "rounded text-xs text-gray-400 transition-colors hover:text-red-500",
                    focusRing
                  )}
                >
                  Hapus semua
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {customColors.map((value) => (
                  <div key={value} className="group relative">
                    <Swatch
                      value={value}
                      label={value}
                      active={color.toLowerCase() === value}
                      onClick={() => onColorChange(value)}
                    />

                    {/* Tombol hapus muncul saat hover / fokus */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomColor(value);
                      }}
                      title="Hapus warna ini"
                      aria-label={`Hapus warna ${value}`}
                      className="absolute -right-1.5 -top-1.5 hidden size-4 items-center justify-center rounded-full bg-red-500 text-white shadow focus-visible:flex group-hover:flex"
                    >
                      <X className="size-2.5" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Petunjuk */}
          <p className="text-xs leading-relaxed text-gray-400 dark:text-gray-500">
            Pilih warna bebas lewat color picker, lalu klik{" "}
            <span className="font-medium text-gray-500 dark:text-gray-400">
              Simpan warna
            </span>{" "}
            untuk menambahkannya ke daftar warna Anda.
          </p>
        </div>
      )}
    </div>
  );
}