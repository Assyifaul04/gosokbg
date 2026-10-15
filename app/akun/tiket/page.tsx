import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TicketList } from "@/components/support/TicketList";

export const metadata = {
  title: "Tiket Saya — gosokbg",
};

export default async function MyTicketsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: { select: { messages: true } },
      messages: {
        where: { role: "ADMIN" },
        select: { id: true, createdAt: true },
      },
    },
  });

  const ticketsWithUnread = tickets.map((t) => {
    const lastRead = t.userLastReadAt ?? new Date(0);
    const unreadCount = t.messages.filter(
      (m) => m.createdAt > lastRead
    ).length;
    return {
      id: t.id,
      subject: t.subject,
      category: t.category,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      _count: t._count,
      unreadCount,
    };
  });

  const totalUnread = ticketsWithUnread.reduce(
    (sum, t) => sum + t.unreadCount,
    0
  );

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400"
        >
          <svg
            viewBox="0 0 16 16"
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 4L6 8l4 4" />
          </svg>
          Kembali ke beranda
        </Link>

        <header className="mt-6 border-b border-gray-200 pb-6 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Tiket Saya
            </h1>
            {totalUnread > 0 && (
              <span className="rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-medium text-white">
                {totalUnread} baru
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">
            Semua laporan dan pertanyaan yang Anda kirim.
          </p>
        </header>

        <div className="mt-8">
          <TicketList tickets={ticketsWithUnread} />
        </div>

        <div className="mt-8 border-t border-gray-100 pt-6 dark:border-gray-900">
          <Link
            href="/support"
            className="text-xs font-medium text-sky-600 hover:underline dark:text-sky-400"
          >
            + Buat tiket baru
          </Link>
        </div>
      </section>
    </main>
  );
}