"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  ArrowUpIcon,
  MessageIcon,
} from "@/components/icons";

const productLinks = [
  { href: "/editor", label: "Editor" },
  { href: "/plugin", label: "Plugin" },
  { href: "/support", label: "Bantuan" },
  { href: "/docs", label: "Dokumentasi" },
];

const companyLinks = [
  { href: "/about", label: "Tentang Kami" },
  { href: "/support", label: "Hubungi Kami" },
  { href: "/blog", label: "Blog" },
];

const legalLinks = [
  { href: "/terms", label: "Ketentuan Layanan" },
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/cookies", label: "Kebijakan Cookie" },
];

const socialLinks = [
  {
    href: "https://github.com/gosokbg",
    label: "GitHub",
    Icon: GithubIcon,
  },
  {
    href: "https://twitter.com/gosokbg",
    label: "X",
    Icon: TwitterIcon,
  },
  {
    href: "https://linkedin.com/company/gosokbg",
    label: "LinkedIn",
    Icon: LinkedinIcon,
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + sosial */}
          <div className="md:col-span-5">
            <Link href="/" aria-label="gosokbg" className="inline-flex">
              <Image
                src="/images/gosokbg.png"
                alt="gosokbg"
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
                unoptimized
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Alat penghapus background foto yang berjalan langsung di
              browser. Hasil PNG transparan, tanpa mengirim gambar ke server.
            </p>

            {/* Sosial + Bantuan */}
            <div className="mt-6 flex items-center gap-1">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              ))}

              <Link
                href="/support"
                aria-label="Bantuan & Dukungan"
                title="Bantuan & Dukungan"
                className="grid size-9 place-items-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
              >
                <MessageIcon className="size-4" />
              </Link>
            </div>
          </div>

          {/* Produk */}
          <nav aria-label="Produk" className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Produk
            </h3>
            <ul className="mt-5 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Perusahaan */}
          <nav aria-label="Perusahaan" className="md:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Perusahaan
            </h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal" className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Legal
            </h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-gray-200 pt-6 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:text-gray-400">
          <p>© {year} gosokbg. Seluruh hak cipta dilindungi.</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("gosokbg-cookie-consent");
                window.location.reload();
              }}
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              Preferensi Cookie
            </button>
            <p>Dibuat di Indonesia.</p>
          </div>
        </div>
      </div>

      {/* Tombol ke atas */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="fixed bottom-6 right-6 z-50 grid size-10 place-items-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white"
        >
          <ArrowUpIcon className="size-4" />
        </button>
      )}
    </footer>
  );
}