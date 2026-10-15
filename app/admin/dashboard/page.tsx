import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { StatsGrid } from "@/components/admin/dashboard/stats-grid";
import { RecentProcesses } from "@/components/admin/dashboard/recent-processes";
import { QuickActions } from "@/components/admin/dashboard/quick-actions";

// ============ Bagian async: kartu statistik ============
async function StatsSection() {
  await connection();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    activeUsers,
    totalProcesses,
    todayProcesses,
    failedProcesses,
    todayStats,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isActive: true } }),
    prisma.processingHistory.count(),
    prisma.processingHistory.count({
      where: { createdAt: { gte: today } },
    }),
    prisma.processingHistory.count({ where: { status: "FAILED" } }),
    prisma.dailyStats.findFirst({
      where: { date: today },
      orderBy: { date: "desc" },
    }),
  ]);

  const successRate =
    totalProcesses > 0
      ? (((totalProcesses - failedProcesses) / totalProcesses) * 100).toFixed(1)
      : "0.0";

  const stats = {
    totalUsers,
    activeUsers,
    totalProcesses,
    todayProcesses,
    failedProcesses,
    successRate,
    todayStats: todayStats
      ? {
          totalProcesses: todayStats.totalProcesses,
          successfulProcesses: todayStats.successfulProcesses,
          failedProcesses: todayStats.failedProcesses,
          guestProcesses: todayStats.guestProcesses,
          userProcesses: todayStats.userProcesses,
          totalInputBytes: todayStats.totalInputBytes,
          totalOutputBytes: todayStats.totalOutputBytes,
        }
      : null,
  };

  return <StatsGrid stats={stats} />;
}

// ============ Skeleton ============
function StatsSkeleton() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-900"
          />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-900"
          />
        ))}
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="h-96 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-900" />
  );
}

// ============ Halaman ============
export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Ringkasan
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Statistik dan aktivitas terkini GosokBG.
        </p>
      </div>

      {/* Stat cards */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      {/* Tabel + Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<TableSkeleton />}>
            <RecentProcesses />
          </Suspense>
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}