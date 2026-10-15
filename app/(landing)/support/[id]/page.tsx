import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TicketThread } from "@/components/support/TicketThread";

const categoryLabels: Record<string, string> = {
  BUG: "Laporan bug",
  QUESTION: "Pertanyaan",
  FEEDBACK: "Saran",
  PARTNERSHIP: "Kerja sama",
};

const statusLabels: Record<string, string> = {
  OPEN: "Terbuka",
  IN_PROGRESS: "Diproses",
  RESOLVED: "Selesai",
  CLOSED: "Ditutup",
};

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

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

  const isOwner = ticket.userId === session?.user?.id;
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  if (!isOwner && !isAdmin) {
    redirect("/support");
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <nav className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
          <Link
            href="/support"
            className="transition-colors hover:text-sky-600 dark:hover:text-sky-400"
          >
            Bantuan
          </Link>
          <span>/</span>
          <span className="text-gray-500 dark:text-gray-400">Tiket</span>
        </nav>

        <header className="mt-6 border-b border-gray-200 pb-6 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              {categoryLabels[ticket.category] ?? ticket.category}
            </span>
            <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-700 dark:bg-sky-950/40 dark:text-sky-400">
              {statusLabels[ticket.status] ?? ticket.status}
            </span>
          </div>
          <h1 className="mt-3 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {ticket.subject}
          </h1>
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            Dibuat{" "}
            {new Date(ticket.createdAt).toLocaleString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </header>

        <div className="mt-8">
          <TicketThread
            ticketId={ticket.id}
            messages={ticket.messages}
            status={ticket.status}
            currentRole={isAdmin ? "ADMIN" : "USER"}
          />
        </div>
      </section>
    </main>
  );
}