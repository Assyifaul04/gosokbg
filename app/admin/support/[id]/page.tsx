import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { AdminTicketThread } from "@/components/admin/support/AdminTicketThread";
import { StatusBadge } from "@/components/admin/support/StatusBadge";

const categoryLabels: Record<string, string> = {
  BUG: "Laporan bug",
  QUESTION: "Pertanyaan",
  FEEDBACK: "Saran",
  PARTNERSHIP: "Kerja sama",
};

export const dynamic = "force-dynamic";

export default async function AdminTicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ticket = await prisma.supportTicket.findUnique({
    where: { id },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { name: true, image: true } },
        },
      },
    },
  });

  if (!ticket) notFound();

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
        <Link
          href="/admin/support"
          className="transition-colors hover:text-sky-600 dark:hover:text-sky-400"
        >
          Support
        </Link>
        <span>/</span>
        <span className="text-gray-500 dark:text-gray-400">Tiket</span>
      </nav>

      <header className="border-b border-gray-200 pb-6 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={ticket.status} />
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {categoryLabels[ticket.category] ?? ticket.category}
          </span>
        </div>

        <h1 className="mt-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {ticket.subject}
        </h1>

        <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex gap-1.5">
            <dt className="text-gray-400 dark:text-gray-500">Nama:</dt>
            <dd>{ticket.name}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="text-gray-400 dark:text-gray-500">Email:</dt>
            <dd>{ticket.email}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="text-gray-400 dark:text-gray-500">Dibuat:</dt>
            <dd>
              {new Date(ticket.createdAt).toLocaleString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </dd>
          </div>
        </dl>
      </header>

      <AdminTicketThread
        ticketId={ticket.id}
        messages={ticket.messages}
        status={ticket.status}
      />
    </div>
  );
}