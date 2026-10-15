import Link from "next/link";

type Ticket = {
  id: string;
  subject: string;
  category: string;
  status: string;
  createdAt: Date;
  _count: { messages: number };
};

const statusStyles: Record<string, string> = {
  OPEN: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400",
  IN_PROGRESS:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  RESOLVED:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  CLOSED: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400",
};

const categoryLabels: Record<string, string> = {
  BUG: "Laporan bug",
  QUESTION: "Pertanyaan",
  FEEDBACK: "Saran",
  PARTNERSHIP: "Kerja sama",
};

export function TicketList({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 py-12 text-center dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Belum ada tiket.
        </p>
        <Link
          href="/support"
          className="mt-2 inline-block text-xs font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          Buat tiket baru →
        </Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 dark:divide-gray-900">
      {tickets.map((t) => (
        <li key={t.id}>
          <Link
            href={`/support/${t.id}`}
            className="block py-4 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-900/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {t.subject}
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {categoryLabels[t.category] ?? t.category} ·{" "}
                  {new Date(t.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  · {t._count.messages} pesan
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
                  statusStyles[t.status] ?? statusStyles.CLOSED
                }`}
              >
                {t.status.replace("_", " ")}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}