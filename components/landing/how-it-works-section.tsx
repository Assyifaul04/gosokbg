const steps = [
  {
    num: "01",
    title: "Unggah foto",
    desc: "Pilih gambar dari perangkat Anda. Format JPG, PNG, atau WEBP didukung.",
  },
  {
    num: "02",
    title: "Hapus otomatis",
    desc: "Model AI berjalan di browser Anda untuk memisahkan objek dari latar belakang.",
  },
  {
    num: "03",
    title: "Unduh PNG",
    desc: "Pratinjau hasil, lalu unduh PNG transparan siap pakai.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      className="border-t border-gray-200 py-20 dark:border-gray-800"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Cara kerja
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Tiga langkah sederhana
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Tanpa aplikasi tambahan, tanpa registrasi. Semua berjalan langsung
            di browser Anda.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {steps.map((step) => (
            <li key={step.num} className="relative">
              <span className="block text-sm font-medium tabular-nums text-sky-600 dark:text-sky-400">
                {step.num}
              </span>
              <div className="mt-3 border-t border-gray-200 pt-5 dark:border-gray-800">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}