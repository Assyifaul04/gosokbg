import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { SupportTable } from "@/components/admin/support/SupportTable";

export const metadata = {
  title: "Support — Admin gosokbg",
};

export const dynamic = "force-dynamic";

export default async function AdminSupportPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const statusFilter = status?.toUpperCase();

  const tickets = await prisma.supportTicket.findMany({
    where: statusFilter
      ? { status: statusFilter as any }
      : undefined,
    orderBy: { updatedAt: "desc" },
    take: 100,
    include: {
      _count: { select: { messages: true } },
      messages: {
        where: { role: "USER" },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { createdAt: true },
      },
    },
  });

  const ticketsWithUnread = tickets.map((t) => {
    const lastUserMessage = t.messages[0]?.createdAt;
    const lastUpdate = t.updatedAt;
    const unreadForAdmin =
      lastUserMessage && lastUserMessage.getTime() === lastUpdate.getTime();
    return {
      id: t.id,
      subject: t.subject,
      name: t.name,
      email: t.email,
      category: t.category,
      status: t.status,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      _count: t._count,
      unreadForAdmin: !!unreadForAdmin,
    };
  });

  const counts = await prisma.supportTicket.groupBy({
    by: ["status"],
    _count: true,
  });

  const countMap = counts.reduce<Record<string, number>>((acc, c) => {
    acc[c.status] = c._count;
    return acc;
  }, {});

  const tabs = [
    { label: "Semua", value: undefined, count: tickets.length },
    { label: "Terbuka", value: "OPEN", count: countMap.OPEN ?? 0 },
    { label: "Diproses", value: "IN_PROGRESS", count: countMap.IN_PROGRESS ?? 0 },
    { label: "Selesai", value: "RESOLVED", count: countMap.RESOLVED ?? 0 },
    { label: "Ditutup", value: "CLOSED", count: countMap.CLOSED ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Support
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Kelola laporan dan pertanyaan dari pengguna.
        </p>
      </header>

      <div className="flex flex-wrap gap-1.5">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.value;
          const href = tab.value
            ? `/admin/support?status=${tab.value.toLowerCase()}`
            : "/admin/support";
          return (
            <Link
              key={tab.label}
              href={href}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 text-[10px] ${
                  isActive ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      <SupportTable tickets={ticketsWithUnread} />
    </div>
  );
}