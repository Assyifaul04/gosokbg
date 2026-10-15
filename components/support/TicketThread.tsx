"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Message = {
  id: string;
  role: "USER" | "ADMIN";
  body: string;
  createdAt: Date;
  user: { name: string | null; image: string | null } | null;
};

export function TicketThread({
  ticketId,
  messages,
  status,
  currentRole,
}: {
  ticketId: string;
  messages: Message[];
  status: string;
  currentRole: "USER" | "ADMIN";
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  const isClosed = status === "CLOSED" || status === "RESOLVED";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!body.trim()) return;

    setSending(true);
    try {
      const res = await fetch(`/api/support/${ticketId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      });

      if (res.ok) {
        setBody("");
        toast.success("Balasan terkirim");
        router.refresh();
      } else {
        const err = await res.json().catch(() => ({}));
        toast.error("Gagal mengirim balasan", {
          description: err?.error ?? "Coba lagi beberapa saat lagi.",
        });
      }
    } catch {
      toast.error("Koneksi bermasalah", {
        description: "Periksa internet Anda dan coba lagi.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <ol className="space-y-5">
        {messages.map((m) => {
          const isAdmin = m.role === "ADMIN";
          return (
            <li
              key={m.id}
              className={`flex gap-3 ${isAdmin ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                  isAdmin
                    ? "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {isAdmin ? "A" : "U"}
              </div>

              <div
                className={`max-w-[85%] rounded-lg border px-4 py-3 ${
                  isAdmin
                    ? "border-sky-200 bg-sky-50/50 dark:border-sky-900 dark:bg-sky-950/20"
                    : "border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
                }`}
              >
                <div className="flex items-baseline gap-2">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">
                    {isAdmin ? "Tim gosokbg" : m.user?.name ?? "Anda"}
                  </p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">
                    {new Date(m.createdAt).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {m.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {isClosed ? (
        <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          Tiket ini sudah ditutup. Buat tiket baru jika masih ada pertanyaan.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="Tulis balasan..."
            required
            maxLength={5000}
            className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending || !body.trim()}
              className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Mengirim..." : "Kirim balasan"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}