"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ShowcaseItem = {
  id: string;
  label: string;
  image: string;
  alt: string;
};

const ITEMS: ShowcaseItem[] = [
  {
    id: "produk",
    label: "Produk",
    image: "/images/produk.png",
    alt: "Contoh foto produk dengan background biru dan hasil tanpa background",
  },
  {
    id: "grafik",
    label: "Grafik",
    image: "/images/grafik.png",
    alt: "Contoh grafik dengan background biru dan hasil tanpa background",
  },
];

function CompareSlider({ image, alt }: { image: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [position, setPosition] = useState(50);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, percent)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Bandingkan gambar sebelum dan sesudah background dihapus"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="relative aspect-[16/9] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl border border-gray-200 bg-white outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-gray-800 dark:bg-gray-950"
    >
      {/* Lapisan bawah: hasil transparan (kotak-kotak + gambar) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#ffffff",
          backgroundImage:
            "conic-gradient(#f3f4f6 25%, transparent 25% 50%, #f3f4f6 50% 75%, transparent 75%)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          draggable={false}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Lapisan atas: background biru (di-clip sesuai slider) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div
          className="relative h-full w-full"
          style={{
            background:
              "linear-gradient(180deg, #0d8ddb 0%, #1a9ee0 35%, #35aee8 70%, #5cc2ef 100%)",
          }}
        >
          {/* Aksen awan halus di kiri bawah */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-1/2 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at bottom left, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 35%, transparent 70%)",
            }}
          />

          {/* Subjek di atas background biru */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            draggable={false}
            className="relative h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Garis pemisah + handle */}
      <div
        className="pointer-events-none absolute inset-y-0"
        style={{ left: `${position}%` }}
      >
        <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white shadow-[0_0_8px_rgba(0,0,0,0.15)]" />
        <div className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-sky-600 text-white shadow-lg">
          <ChevronLeft className="h-4 w-4" />
          <ChevronRight className="-ml-1 h-4 w-4" />
        </div>
      </div>

      {/* Label "Sebelum" / "Sesudah" */}
      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        Sebelum
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-sky-600 px-3 py-1 text-xs font-medium text-white">
        Sesudah
      </span>
    </div>
  );
}

export function QualityShowcaseSection() {
  const [activeId, setActiveId] = useState(ITEMS[0].id);
  const active = ITEMS.find((i) => i.id === activeId) ?? ITEMS[0];

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Geser untuk melihat hasilnya
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Bandingkan gambar asli dengan hasil setelah background dihapus.
            Semua pemrosesan berjalan langsung di browser Anda.
          </p>
        </div>

        {/* Tab */}
        <div
          role="tablist"
          aria-label="Kategori gambar"
          className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
        >
          {ITEMS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(item.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sky-600 text-white shadow-sm"
                    : "border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Slider */}
        <div className="mt-6">
          <CompareSlider
            key={active.id}
            image={active.image}
            alt={active.alt}
          />
        </div>

        {/* Hint */}
        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-500">
          Geser garis putih ke kiri atau kanan untuk membandingkan
        </p>
      </div>
    </section>
  );
}