import Link from "next/link";
import Image from "next/image";

export type PluginDetailProps = {
  category: string;
  categoryHref?: string;
  title: string;
  description: string;
  downloadLabel?: string;
  downloadUrl: string;
  sectionTitle: string;
  features: string[];
  screenshot: string;
  screenshotAlt: string;
};

export function PluginDetail({
  category,
  categoryHref = "/plugin",
  title,
  description,
  downloadLabel = "Download",
  downloadUrl,
  sectionTitle,
  features,
  screenshot,
  screenshotAlt,
}: PluginDetailProps) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
        <Link
          href="/"
          className="transition-colors hover:text-sky-600 dark:hover:text-sky-400"
        >
          Beranda
        </Link>
        <span>/</span>
        <Link
          href={categoryHref}
          className="transition-colors hover:text-sky-600 dark:hover:text-sky-400"
        >
          {category}
        </Link>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400">{title}</span>
      </nav>

      {/* Header */}
      <header className="mt-6 border-b border-gray-200 pb-8 dark:border-gray-800">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
        >
          {downloadLabel}
          <svg
            viewBox="0 0 16 16"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M8 3v7M5 7l3 3 3-3M3 13h10" />
          </svg>
        </a>
      </header>

      {/* Screenshot */}
      <div className="mt-8 overflow-hidden rounded-md border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
        <Image
          src={screenshot}
          alt={screenshotAlt}
          width={800}
          height={500}
          priority
          className="mx-auto h-auto max-h-72 w-auto max-w-full object-contain"
        />
      </div>

      {/* Fitur */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
          {sectionTitle}
        </h2>
        <ul className="mt-4 space-y-2.5">
          {features.map((f) => (
            <li
              key={f}
              className="flex gap-3 text-sm text-gray-600 dark:text-gray-400"
            >
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-sky-500" />
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-12 flex items-center justify-between gap-4 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          href={categoryHref}
          className="text-xs font-medium text-gray-500 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
        >
          ← Kembali ke daftar plugin
        </Link>
        <a
          href="mailto:hello@gosokbg.com"
          className="text-xs font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          Butuh bantuan?
        </a>
      </footer>
    </article>
  );
}