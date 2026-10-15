import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
      <div className="mx-auto max-w-3xl text-center">
        {/* Badge kecil */}
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
          <span className="size-1.5 rounded-full bg-sky-500" />
          Pemrosesan 100% di browser
        </span>

        {/* Judul */}
        <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
          Hapus background foto
          <br className="hidden sm:block" />{" "}
          <span className="text-sky-600 dark:text-sky-400">
            otomatis dalam sekejap
          </span>
        </h1>

        {/* Deskripsi */}
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-400">
          gosokbg memisahkan objek dari latar belakang langsung di perangkat
          Anda. Hasil PNG transparan, siap pakai untuk produk, profil, atau
          desain.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/editor"
            className="inline-flex w-full items-center justify-center rounded-md bg-sky-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-700 sm:w-auto"
          >
            Mulai hapus background
          </Link>
          <Link
            href="/#cara-kerja"
            className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900 sm:w-auto dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-white"
          >
            Lihat cara kerja
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-6 text-xs text-gray-500 dark:text-gray-500">
          Gratis 10 proses per hari · Tanpa kartu kredit · Tanpa unggah ke server
        </p>
      </div>
    </section>
  );
}