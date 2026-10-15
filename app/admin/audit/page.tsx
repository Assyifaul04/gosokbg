import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { AuditMain } from "@/components/admin/audit/audit-main";
import { AuditStats } from "@/components/admin/audit/audit-stats";

type AuditRow = {
  id: string;
  adminId: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  details: unknown;
  createdAt: Date;
  admin: {
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
};

type AdminIdRow = {
  adminId: string | null;
};

// ============ Bagian async: statistik ============
async function AuditStatsSection() {
  await connection();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [total, todayCount, adminRows] = await Promise.all([
    prisma.auditLog.count(),
    prisma.auditLog.count({ where: { createdAt: { gte: today } } }),
    prisma.auditLog.findMany({
      select: { adminId: true },
      distinct: ["adminId"],
      where: { adminId: { not: null } },
    }) as Promise<AdminIdRow[]>,
  ]);

  const uniqueAdmins = adminRows.length;

  return <AuditStats total={total} today={todayCount} admins={uniqueAdmins} />;
}

// ============ Bagian async: tabel log ============
async function AuditTableSection() {
  await connection();

  const logs = (await prisma.auditLog.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
    include: {
      admin: { select: { name: true, email: true, image: true } },
    },
  })) as AuditRow[];

  const actions = Array.from(new Set(logs.map((l: AuditRow) => l.action))).sort();

  return (
    <AuditMain
      logs={logs.map((l: AuditRow) => ({
        id: l.id,
        adminId: l.adminId,
        adminName: l.admin?.name ?? null,
        adminEmail: l.admin?.email ?? null,
        adminImage: l.admin?.image ?? null,
        action: l.action,
        targetType: l.targetType,
        targetId: l.targetId,
        details: l.details ? JSON.stringify(l.details) : null,
        createdAt: l.createdAt.toISOString(),
      }))}
      actions={actions}
    />
  );
}

// ============ Skeleton ============
function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-900"
        />
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="h-96 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-900" />
  );
}

// ============ Halaman ============
export default function AdminAuditPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Audit Log
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Catatan tindakan admin di GosokBG.
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <AuditStatsSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <AuditTableSection />
      </Suspense>
    </div>
  );
}