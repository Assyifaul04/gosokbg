import Link from "next/link";
import { posts } from "./posts";

export const metadata = {
  title: "Blog | gosokbg",
  description: "Artikel dan informasi terbaru dari gosokbg.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Blog
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Artikel &amp; Informasi
        </h1>
        <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          Tips editing, panduan penggunaan, dan update fitur terbaru seputar
          gosokbg.
        </p>
      </header>

      {/* Artikel utama */}
      <section className="mt-14">
        <Link
          href={`/blog/${featured.slug}`}
          className="group block rounded-2xl border border-gray-200 p-6 transition-colors hover:border-gray-300 sm:p-8 dark:border-gray-800 dark:hover:border-gray-700"
        >
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              {featured.category}
            </span>
            <span aria-hidden>·</span>
            <span>{featured.date}</span>
            <span aria-hidden>·</span>
            <span>{featured.readingTime}</span>
          </div>

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-gray-900 group-hover:underline sm:text-2xl dark:text-white">
            {featured.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {featured.excerpt}
          </p>
          <p className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
            Baca selengkapnya →
          </p>
        </Link>
      </section>

      {/* Artikel lainnya */}
      {rest.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
            Artikel Lainnya
          </h2>

          <ul className="mt-6 divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block py-5"
                >
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {post.category}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{post.date}</span>
                    <span aria-hidden>·</span>
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="mt-2 text-base font-medium text-gray-900 group-hover:underline dark:text-white">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}