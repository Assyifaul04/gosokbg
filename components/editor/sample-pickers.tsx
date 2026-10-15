"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const SAMPLES = [
  { src: "/images/1.png", label: "Contoh 1" },
  { src: "/images/2.png", label: "Contoh 2" },
  { src: "/images/3.png", label: "Contoh 3" },
  { src: "/images/4.png", label: "Contoh 4" },
];

export function SamplePickers() {
  const router = useRouter();
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  async function handlePick(index: number, src: string) {
    if (loadingIndex !== null) return;
    setLoadingIndex(index);

    try {
      // Fetch gambar dari /public, konversi ke dataURL
      const res = await fetch(src);
      if (!res.ok) {
        throw new Error(`Gagal memuat gambar: ${res.status}`);
      }
      const blob = await res.blob();

      // Nama file dari URL
      const fileName = src.split("/").pop() ?? `sample-${index + 1}.png`;

      // Baca sebagai data URL
      const reader = new FileReader();
      reader.onload = () => {
        try {
          sessionStorage.setItem(
            "gosokbg:upload",
            JSON.stringify({
              name: fileName,
              type: blob.type || "image/png",
              size: blob.size,
              dataUrl: reader.result,
              at: Date.now(),
            })
          );
          router.push("/editor/tools");
        } catch {
          alert("Gambar terlalu besar untuk diproses.");
          setLoadingIndex(null);
        }
      };
      reader.onerror = () => {
        alert("Gagal membaca gambar.");
        setLoadingIndex(null);
      };
      reader.readAsDataURL(blob);
    } catch (err: any) {
      console.error("Sample pick error:", err);
      alert(err?.message ?? "Gagal memuat gambar contoh.");
      setLoadingIndex(null);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/40">
      <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
        Belum punya gambar? Coba salah satu:
      </p>
      <div className="flex flex-wrap gap-3">
        {SAMPLES.map((sample, i) => {
          const isLoading = loadingIndex === i;
          const isDisabled = loadingIndex !== null && !isLoading;

          return (
            <button
              key={sample.src}
              type="button"
              onClick={() => handlePick(i, sample.src)}
              disabled={isDisabled || isLoading}
              aria-label={sample.label}
              className={cn(
                "group relative size-16 overflow-hidden rounded-lg border border-gray-200 transition-all",
                "hover:border-sky-400 hover:shadow-sm",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-gray-800 dark:hover:border-sky-600"
              )}
            >
              <Image
                src={sample.src}
                alt={sample.label}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="64px"
                unoptimized
              />

              {/* Overlay loading */}
              {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-black/70">
                  <Loader2 className="size-4 animate-spin text-sky-500" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}