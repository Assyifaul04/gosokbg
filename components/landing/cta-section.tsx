//components/landing/cta-section.tsx
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <section className="border-t border-gray-200 bg-gray-50/50 py-20 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Siap hapus background foto Anda?
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Coba sekarang, gratis. Tidak perlu daftar untuk memulai.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/editor"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-600"
            )}
          >
            Mulai Sekarang
          </Link>
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
            )}
          >
            Daftar Gratis
          </Link>
        </div>
      </div>
    </section>
  );
}