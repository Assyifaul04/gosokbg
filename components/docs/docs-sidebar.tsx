"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const sections = [
  { id: "pengenalan", label: "Pengenalan" },
  { id: "memulai", label: "Memulai" },
  { id: "cara-kerja", label: "Cara Kerja" },
  { id: "memilih-model", label: "Memilih Model AI" },
  { id: "menyimpan-drive", label: "Simpan ke Google Drive" },
  { id: "kuota", label: "Kuota Harian" },
  { id: "privasi", label: "Privasi & Keamanan" },
  { id: "faq", label: "Pertanyaan Umum" },
];

export function DocsSidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("pengenalan");

  // Highlight section yang sedang di-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nav = (
    <nav aria-label="Daftar isi dokumentasi">
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        Daftar Isi
      </p>
      <ul className="space-y-0.5 border-l border-gray-200 dark:border-gray-800">
        {sections.map((s) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => handleClick(s.id)}
              aria-current={active === s.id ? "true" : undefined}
              className={cn(
                "-ml-px block w-full border-l-2 py-2 pl-4 pr-3 text-left text-sm transition-colors",
                active === s.id
                  ? "border-sky-500 font-medium text-sky-600 dark:text-sky-400"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-100"
              )}
            >
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <span>Daftar Isi</span>
          <span className="text-xs text-gray-400">
            {open ? "Tutup" : "Buka"}
          </span>
        </button>

        {open && (
          <div className="mt-2 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
            {nav}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">{nav}</div>
      </aside>
    </>
  );
}