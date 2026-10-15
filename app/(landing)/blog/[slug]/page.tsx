import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "../posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artikel tidak ditemukan | gosokbg" };
  }

  return {
    title: `${post.title} | gosokbg`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-gray-500 dark:text-gray-400">
        <Link
          href="/blog"
          className="font-medium transition-colors hover:text-gray-900 dark:hover:text-white"
        >
          Blog
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span>{post.category}</span>
      </nav>

      {/* Header artikel */}
      <header className="mt-6">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-900 dark:text-white">
            {post.category}
          </span>
          <span aria-hidden>·</span>
          <span>{post.date}</span>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          {post.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {post.excerpt}
        </p>
      </header>

      {/* Isi artikel */}
      <article className="mt-12 space-y-5 border-t border-gray-200 pt-12 text-sm leading-relaxed text-gray-700 dark:border-gray-800 dark:text-gray-300">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>

      {/* Footer artikel */}
      <footer className="mt-14 flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <Link
          href="/blog"
          className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          ← Kembali ke Blog
        </Link>
        <Link
          href="/editor"
          className="text-sm font-medium text-gray-900 transition-colors hover:underline dark:text-white"
        >
          Coba Editor →
        </Link>
      </footer>
    </main>
  );
}