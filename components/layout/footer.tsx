import Link from "next/link";
import Image from "next/image";

const productLinks = [
  { href: "/editor", label: "Uploads" },
  { href: "/plugins", label: "Plugins" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
];

const companyLinks = [
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Hubungi Kami" },
  { href: "/blog", label: "Blog" },
];

const legalLinks = [
  { href: "/terms", label: "Ketentuan Layanan" },
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/cookies", label: "Kebijakan Cookie" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Grid utama */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center"
              aria-label="GosokBG"
            >
              <Image
                src="/images/gosokbg.png"
                alt="GosokBG"
                width={160}
                height={40}
                className="h-9 w-auto object-contain"
                unoptimized
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Hapus background foto otomatis langsung di browser Anda. Hasil
              PNG transparan, gratis 5 proses per hari, tanpa perlu daftar.
            </p>

            {/* Badge privasi */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
              <span className="size-2 rounded-full bg-green-500" />
              Foto Anda tidak dikirim ke server
            </div>
          </div>

          {/* Produk */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
              Produk
            </h3>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
              Perusahaan
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {year} GosokBG. Hak cipta dilindungi.
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500">
            Dibuat dengan ❤️ di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}