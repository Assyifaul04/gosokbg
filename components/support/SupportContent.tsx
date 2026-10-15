"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const categories = [
  { value: "BUG", label: "Laporan bug" },
  { value: "QUESTION", label: "Pertanyaan" },
  { value: "FEEDBACK", label: "Saran & masukan" },
  { value: "PARTNERSHIP", label: "Kerja sama" },
];

const contactChannels = [
  {
    label: "Email",
    value: "izzastudio140@gmail.com",
    href: "mailto:izzastudio140@gmail.com",
    note: "Untuk pertanyaan umum dan kerja sama",
  },
  {
    label: "Dokumentasi",
    value: "Lihat panduan",
    href: "/docs",
    note: "Jawaban cepat untuk pertanyaan umum",
  },
];

export function SupportContent() {
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      category: String(data.get("category") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const { ticket } = await res.json();
        form.reset();
        toast.success("Laporan diterima", {
          description: "Mengalihkan ke halaman tiket...",
          duration: 2000,
        });
        setTimeout(() => {
          window.location.href = `/support/${ticket.id}`;
        }, 1200);
        return;
      }

      const err = await res.json().catch(() => ({}));

      if (res.status === 429) {
        toast.error("Terlalu banyak laporan", {
          description:
            err?.error ??
            "Anda telah mencapai batas pengiriman. Coba lagi nanti.",
        });
      } else if (res.status === 400) {
        toast.error("Laporan tidak dapat dikirim", {
          description:
            err?.error ??
            "Periksa kembali isi laporan Anda, lalu coba lagi.",
        });
      } else if (res.status === 500) {
        toast.error("Terjadi kesalahan pada server", {
          description: "Coba lagi beberapa saat lagi.",
        });
      } else {
        toast.error("Gagal mengirim laporan", {
          description: err?.error ?? "Coba lagi beberapa saat lagi.",
        });
      }
    } catch {
      toast.error("Koneksi bermasalah", {
        description: "Periksa internet Anda dan coba lagi.",
      });
    } finally {
      setStatus("idle");
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <header className="border-b border-gray-200 pb-8 dark:border-gray-800">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          Bantuan & Dukungan
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          Laporkan bug atau kirim pertanyaan. Semua laporan tercatat dan akan
          ditindaklanjuti oleh tim kami.
        </p>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[280px_1fr]">
        <aside>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
            Kanal kontak
          </h2>
          <ul className="mt-5 divide-y divide-gray-100 dark:divide-gray-900">
            {contactChannels.map((c) => (
              <li key={c.label} className="py-4 first:pt-0">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                  {c.label}
                </p>
                <Link
                  href={c.href}
                  className="mt-0.5 block break-all text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
                  {...(c.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {c.value}
                </Link>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  {c.note}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-gray-100 pt-6 dark:border-gray-900">
            <Link
              href="/akun/tiket"
              className="text-xs font-medium text-sky-600 hover:underline dark:text-sky-400"
            >
              Lihat tiket saya →
            </Link>
          </div>
        </aside>

        <div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  Nama
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Kategori
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue=""
                className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Subjek
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                minLength={3}
                maxLength={150}
                className="mt-1.5 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300"
              >
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                minLength={10}
                maxLength={5000}
                className="mt-1.5 w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
              />
              <p className="mt-1.5 text-[11px] text-gray-400 dark:text-gray-500">
                Gunakan bahasa yang sopan. Pesan dengan kata tidak pantas atau
                tautan berlebihan akan ditolak otomatis.
              </p>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Mengirim..." : "Kirim laporan"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}