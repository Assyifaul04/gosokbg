import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { StatsGrid } from "@/components/admin/stats/stats-grid";
import { StatsChart } from "@/components/admin/stats/stats-chart";
import { StatsTable } from "@/components/admin/stats/stats-table";

type DailyStatsRow = {
  id: string;
  date: Date;
  totalProcesses: number;
  successfulProcesses: number;
  failedProcesses: number;
  guestProcesses: number;
  userProcesses: number;
  totalInputBytes: bigint;
  totalOutputBytes: bigint;
};

// ============ Bagian async: kartu ringkasan ============
async function StatsSummarySection() {
  const rows = (await prisma.dailyStats.findMany({
    take: 30,
    orderBy: { date: "desc" },
  })) as DailyStatsRow[];

  const totalProcesses = rows.reduce((a, r) => a + r.totalProcesses, 0);
  const totalSuccess = rows.reduce((a, r) => a + r.successfulProcesses, 0);
  const totalFailed = rows.reduce((a, r) => a + r.failedProcesses, 0);

  // Konversi BigInt ke string di server — jangan kirim BigInt ke client
  const totalInputBytes = rows
    .reduce((a, r) => a + r.totalInputBytes, BigInt(0))
    .toString();
  const totalOutputBytes = rows
    .reduce((a, r) => a + r.totalOutputBytes, BigInt(0))
    .toString();

  return (
    <StatsGrid
      totalProcesses={totalProcesses}
      totalSuccess={totalSuccess}
      totalFailed={totalFailed}
      totalInputBytes={totalInputBytes}
      totalOutputBytes={totalOutputBytes}
      activeDays={rows.length}
    />
  );
}

// ============ Bagian async: chart 7 hari terakhir ============
async function StatsChartSection() {
  const rows = (await prisma.dailyStats.findMany({
    take: 7,
    orderBy: { date: "desc" },
  })) as DailyStatsRow[];

  const data = rows.reverse().map((r) => ({
    date: r.date.toISOString().slice(0, 10),
    total: r.totalProcesses,
    success: r.successfulProcesses,
    failed: r.failedProcesses,
  }));

  return <StatsChart data={data} />;
}

// ============ Bagian async: tabel 30 hari ============
async function StatsTableSection() {
  const rows = (await prisma.dailyStats.findMany({
    take: 30,
    orderBy: { date: "desc" },
  })) as DailyStatsRow[];

  return (
    <StatsTable
      rows={rows.map((r: DailyStatsRow) => ({
        id: r.id,
        date: r.date.toISOString(),
        totalProcesses: r.totalProcesses,
        successfulProcesses: r.successfulProcesses,
        failedProcesses: r.failedProcesses,
        guestProcesses: r.guestProcesses,
        userProcesses: r.userProcesses,
        totalInputBytes: r.totalInputBytes.toString(),
        totalOutputBytes: r.totalOutputBytes.toString(),
      }))}
    />
  );
}

// ============ Skeleton ============
function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-900"
        />
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-72 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-900" />
  );
}

function TableSkeleton() {
  return (
    <div className="h-96 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-900" />
  );
}

// ============ Halaman ============
export default function AdminStatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Statistik
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ringkasan aktivitas harian GosokBG.
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <StatsSummarySection />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <StatsChartSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <StatsTableSection />
      </Suspense>
    </div>
  );
}