//components/landing/hero-section.tsx
import Link from "next/link";
import { Upload } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
          Hapus background foto{" "}
          <span className="text-sky-500">otomatis dalam sekejap</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
          GosokBG menghapus latar belakang foto langsung di browser Anda.
          Hasil PNG transparan, siap pakai untuk produk, profil, atau desain.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/editor"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-600 sm:w-auto"
            )}
          >
            <Upload className="mr-2 size-4" />
            Mulai Hapus Background
          </Link>
          <Link
            href="/#cara-kerja"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-full border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 sm:w-auto"
            )}
          >
            Lihat Cara Kerja
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Tidak perlu kartu kredit · Foto diproses di perangkat Anda
        </p>
      </div>

      {/* Preview placeholder */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl border border-gray-200 bg-gradient-to-br from-sky-50 to-gray-50 dark:border-gray-800 dark:from-sky-950/20 dark:to-gray-900"
          />
        ))}
      </div>
    </section>
  );
}