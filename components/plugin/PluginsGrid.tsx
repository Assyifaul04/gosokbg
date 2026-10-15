import { PluginCard, type Plugin } from "./PluginCard";

const plugins: Plugin[] = [
  {
    name: "Photoshop Plugin",
    desc: "Hapus background di dalam Photoshop",
    href: "/plugin/photoshop",
    icon: "/images/icons/Photoshop.png",
  },
  {
    name: "Figma Plugin",
    desc: "Hapus background di dalam Figma",
    href: "/plugin/figma",
    icon: "/images/icons/Figma.png",
  },
  {
    name: "Desktop App",
    desc: "Proses banyak gambar sekaligus",
    href: "/plugin/desktop",
    icon: "/images/icons/Desktop.png",
  },
  {
    name: "GIMP Plugin",
    desc: "Hapus background di dalam GIMP",
    href: "/plugin/gimp",
    icon: "/images/icons/Gimp.png",
  },
  {
    name: "Sketch Plugin",
    desc: "Hapus background di dalam Sketch",
    href: "/plugin/sketch",
    icon: "/images/icons/Sketch.png",
  },
  {
    name: "Android App",
    desc: "Hapus background dari perangkat Android",
    href: "/plugin/android",
    icon: "/images/icons/Android.png",
  },
  {
    name: "Web API",
    desc: "Integrasi melalui REST API",
    href: "/plugin/api",
    icon: "/images/icons/Api.png",
  },
  {
    name: "PowerPoint Plugin",
    desc: "Hapus background di dalam slide",
    href: "/plugin/powerpoint",
    icon: "/images/icons/Powerpoint.png",
  },
  {
    name: "CLI Tool",
    desc: "Batch processing dari terminal",
    href: "/plugin/cli",
    icon: "/images/icons/Cli.png",
  },
  {
    name: "Shopify Integration",
    desc: "Hapus background untuk gambar produk",
    href: "/plugin/shopify",
    icon: "/images/icons/Shopify.png",
  },
  {
    name: "Zapier & Make",
    desc: "Otomasi lintas aplikasi",
    href: "/plugin/automation",
    icon: "/images/icons/Zapier.png",
  },
  {
    name: "Pixlr Editor",
    desc: "Editor foto berbasis browser",
    href: "/plugin/pixlr",
    icon: "/images/icons/Pixlr.png",
  },
];

export function PluginsGrid() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <header className="border-b border-gray-200 pb-6 dark:border-gray-800">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Plugin & Integrasi
        </h1>
        <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
          Hubungkan gosokbg dengan tools yang Anda gunakan.
        </p>
      </header>

      {/* Daftar */}
      <div className="mt-2">
        {plugins.map((p) => (
          <PluginCard key={p.name} plugin={p} />
        ))}
      </div>

      {/* Footer bantuan */}
      <div className="mt-10 flex items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Tidak menemukan tool yang Anda pakai?
        </p>
        <a
          href="mailto:hello@gosokbg.com"
          className="text-xs font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          Ajukan integrasi
        </a>
      </div>
    </section>
  );
}