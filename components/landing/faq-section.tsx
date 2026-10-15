const faqs = [
  {
    q: "Apakah gosokbg gratis?",
    a: "Ya. Anda bisa memproses 10 foto per hari tanpa perlu membuat akun.",
  },
  {
    q: "Apakah foto saya diunggah ke server?",
    a: "Tidak. Pemrosesan berjalan langsung di browser Anda, jadi foto tetap di perangkat.",
  },
  {
    q: "Format apa yang dihasilkan?",
    a: "PNG transparan (RGBA) yang bisa langsung dipakai untuk desain atau e-commerce.",
  },
  {
    q: "Apa perlu akun untuk mulai?",
    a: "Tidak. Login hanya diperlukan jika Anda ingin kuota tanpa batas.",
  },
];

export function FaqSection() {
  return (
    <section
      id="faq"
      className="border-t border-gray-200 py-20 dark:border-gray-800"
    >
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-sky-600 dark:text-sky-400">
            FAQ
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Pertanyaan umum
          </h2>
        </div>

        <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
          {faqs.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium text-gray-900 dark:text-white">
                <span>{item.q}</span>
                <span className="mt-0.5 shrink-0 text-xs text-gray-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}