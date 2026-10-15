//components/landing/faq-section.tsx
const faqs = [
  {
    q: "Apakah GosokBG gratis?",
    a: "Ya. Anda bisa memproses 5 foto per hari tanpa perlu membuat akun.",
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
    a: "Tidak. Login hanya diperlukan jika Anda ingin menyimpan riwayat atau kuota lebih.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Pertanyaan umum
        </h2>

        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {item.q}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}