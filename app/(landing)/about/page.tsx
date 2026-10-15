import Link from "next/link";

export const metadata = {
  title: "Tentang Kami | gosokbg",
  description:
    "Tentang gosokbg, alat penghapus background foto yang berjalan langsung di browser.",
};

const values = [
  {
    title: "Privasi Utama",
    desc: "Semua proses berjalan lokal di browser. Gambar Anda tidak pernah dikirim ke server kami.",
  },
  {
    title: "Cepat & Ringan",
    desc: "Tanpa antrean upload, tanpa menunggu proses server. Hasil instan dalam hitungan detik.",
  },
  {
    title: "Bisa di Mana Saja",
    desc: "Berjalan di desktop maupun mobile. Cukup buka browser, dan mulai bekerja.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Hero */}
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Tentang Kami
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Hapus background, tanpa ribet
        </h1>
        <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          gosokbg adalah alat penghapus background foto yang berjalan langsung
          di browser Anda. Semua proses dilakukan secara lokal, sehingga gambar
          tidak perlu dikirim ke server.
        </p>
      </header>

      {/* Values */}
      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
          Yang Kami Utamakan
        </h2>

        <dl className="mt-6 divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
          {values.map(({ title, desc }) => (
            <div key={title} className="py-5 sm:grid sm:grid-cols-3 sm:gap-6">
              <dt className="text-sm font-medium text-gray-900 dark:text-white">
                {title}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-gray-600 sm:col-span-2 sm:mt-0 dark:text-gray-400">
                {desc}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Cerita */}
      <section className="mt-14">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
          Mengapa gosokbg dibuat?
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          <p>
            Kami percaya bahwa alat yang bagus tidak harus rumit. Banyak
            penghapus background online yang mengharuskan Anda mengunggah foto
            ke server mereka — yang berarti gambar Anda berpindah tangan, dan
            Anda harus menunggu antrean.
          </p>
          <p>
            gosokbg mengambil pendekatan berbeda: semua diproses langsung di
            browser Anda. Tidak ada unggahan, tidak ada antrean, dan tidak ada
            data yang perlu disimpan. Hasilnya adalah alat yang cepat, aman,
            dan bisa digunakan siapa saja tanpa perlu membuat akun.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/editor"
          className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          Coba Editor
        </Link>
        <Link
          href="/support"
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900"
        >
          Hubungi Kami
        </Link>
      </section>
    </main>
  );
}