import { Suspense } from "react";
import { HistoryMain } from "@/components/admin/history/history-main";
import { HistoryStats } from "@/components/admin/history/history-stats";
import { prisma } from "@/lib/prisma";

type HistoryRow = {
  id: string;
  userId: string | null;
  guestKey: string | null;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  modelName: string;
  inputFormat: string | null;
  outputFormat: string;
  inputBytes: bigint | null;
  outputBytes: bigint | null;
  imageWidth: number | null;
  imageHeight: number | null;
  processingMs: number | null;
  errorCode: string | null;
  createdAt: Date;
  user: { name: string | null; email: string | null } | null;
};

// ============ Bagian async yang baca DB ============
async function HistoryStatsSection() {
  const [totalProcesses, completedCount, failedCount, processingCount] =
    await Promise.all([
      prisma.processingHistory.count(),
      prisma.processingHistory.count({ where: { status: "COMPLETED" } }),
      prisma.processingHistory.count({ where: { status: "FAILED" } }),
      prisma.processingHistory.count({ where: { status: "PROCESSING" } }),
    ]);

  return (
    <HistoryStats
      total={totalProcesses}
      completed={completedCount}
      failed={failedCount}
      processing={processingCount}
    />
  );
}

async function HistoryTableSection() {
  const processes = (await prisma.processingHistory.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
    },
  })) as HistoryRow[];

  return (
    <HistoryMain
      processes={processes.map((p: HistoryRow) => ({
        id: p.id,
        userId: p.userId,
        guestKey: p.guestKey,
        status: p.status,
        modelName: p.modelName,
        inputFormat: p.inputFormat,
        outputFormat: p.outputFormat,
        inputBytes: p.inputBytes ? p.inputBytes.toString() : null,
        outputBytes: p.outputBytes ? p.outputBytes.toString() : null,
        imageWidth: p.imageWidth,
        imageHeight: p.imageHeight,
        processingMs: p.processingMs,
        errorCode: p.errorCode,
        createdAt: p.createdAt.toISOString(),
        userName: p.user?.name ?? null,
        userEmail: p.user?.email ?? null,
      }))}
    />
  );
}

// ============ Placeholder saat data dimuat ============
function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
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
export default function AdminHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Riwayat Proses
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Semua aktivitas pemrosesan gambar di GosokBG.
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <HistoryStatsSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <HistoryTableSection />
      </Suspense>
    </div>
  );
}