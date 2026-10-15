//components/landing/features-section.tsx
import { Zap, ShieldCheck, Image as ImageIcon, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Cepat",
    desc: "Pemrosesan berjalan di browser, tanpa antre server.",
  },
  {
    icon: ShieldCheck,
    title: "Privat",
    desc: "Foto Anda tidak dikirim ke server kami.",
  },
  {
    icon: ImageIcon,
    title: "PNG Transparan",
    desc: "Hasil RGBA dengan tepi yang halus.",
  },
  {
    icon: Sparkles,
    title: "Gratis",
    desc: "5 proses per hari tanpa perlu akun.",
  },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Kenapa pakai GosokBG?
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Dirancang untuk kecepatan, privasi, dan hasil yang bersih.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors hover:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-sky-800"
            >
              <span className="grid size-10 place-items-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}