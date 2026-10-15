import Link from "next/link";

import { StatusBadge } from "./StatusBadge";

type Ticket = {
  id: string;
  subject: string;
  name: string;
  email: string;
  category: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  _count: { messages: number };
  unreadForAdmin: boolean;
};

const categoryLabels: Record<string, string> = {
  BUG: "Laporan bug",
  QUESTION: "Pertanyaan",
  FEEDBACK: "Saran",
  PARTNERSHIP: "Kerja sama",
};

export function SupportTable({ tickets }: { tickets: Ticket[] }) {
  if (tickets.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 py-16 text-center dark:border-gray-800">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Belum ada tiket masuk.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Subjek
            </th>
            <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell dark:text-gray-400">
              Pengirim
            </th>
            <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell dark:text-gray-400">
              Kategori
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th className="hidden px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell dark:text-gray-400">
              Tanggal
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
          {tickets.map((t) => (
            <tr
              key={t.id}
              className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/50"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/admin/support/${t.id}`}
                  className="flex items-center gap-2 text-gray-900 hover:text-sky-600 dark:text-white dark:hover:text-sky-400"
                >
                  <span className="truncate font-medium">{t.subject}</span>
                  {t.unreadForAdmin && (
                    <span className="shrink-0 rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-medium text-white">
                      Baru
                    </span>
                  )}
                </Link>
                <p className="mt-0.5 truncate text-xs text-gray-500 sm:hidden dark:text-gray-400">
                  {t.name}
                </p>
              </td>
              <td className="hidden px-4 py-3 text-gray-600 sm:table-cell dark:text-gray-400">
                <p className="truncate">{t.name}</p>
                <p className="truncate text-xs text-gray-400 dark:text-gray-500">
                  {t.email}
                </p>
              </td>
              <td className="hidden px-4 py-3 text-gray-600 md:table-cell dark:text-gray-400">
                {categoryLabels[t.category] ?? t.category}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={t.status} />
              </td>
              <td className="hidden px-4 py-3 text-xs text-gray-500 lg:table-cell dark:text-gray-400">
                {new Date(t.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}