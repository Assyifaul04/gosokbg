import Link from "next/link";

export function CtaSection() {
  return (
    <section className="border-t border-gray-200 py-20 dark:border-gray-800">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Siap hapus background foto Anda?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Coba sekarang, gratis. Tidak perlu daftar untuk memulai.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/editor"
            className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-700"
          >
            Mulai sekarang
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white"
          >
            Daftar gratis
          </Link>
        </div>
      </div>
    </section>
  );
}