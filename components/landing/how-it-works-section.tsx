//components/landing/how-it-works-section.tsx
import { Upload, Sparkles, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "1. Unggah Foto",
    desc: "Pilih gambar dari perangkat Anda. Format JPG, PNG, atau WEBP didukung.",
  },
  {
    icon: Sparkles,
    title: "2. Hapus Otomatis",
    desc: "Model AI berjalan di browser Anda untuk memisahkan objek dari latar belakang.",
  },
  {
    icon: Download,
    title: "3. Unduh PNG",
    desc: "Pratinjau hasil, lalu unduh PNG transparan siap pakai.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      className="border-t border-gray-200 bg-gray-50/50 py-20 dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Cara kerja GosokBG
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Tiga langkah sederhana, tanpa aplikasi tambahan.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                <step.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}