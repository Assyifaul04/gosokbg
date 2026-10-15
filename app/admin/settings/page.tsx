import { Suspense } from "react";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import { SettingsMain } from "@/components/admin/settings/settings-main";
import { SettingsStats } from "@/components/admin/settings/settings-stats";

type SettingRow = {
  key: string;
  value: unknown;
  updatedAt: Date;
};

// ============ Bagian async: statistik ============
async function SettingsStatsSection() {
  await connection();

  const [total, lastUpdated] = await Promise.all([
    prisma.appSetting.count(),
    prisma.appSetting.findFirst({
      orderBy: { updatedAt: "desc" },
      select: { updatedAt: true },
    }),
  ]);

  return (
    <SettingsStats
      total={total}
      lastUpdated={lastUpdated?.updatedAt.toISOString() ?? null}
    />
  );
}

// ============ Bagian async: tabel settings ============
async function SettingsTableSection() {
  await connection();

  const settings = (await prisma.appSetting.findMany({
    orderBy: { key: "asc" },
  })) as SettingRow[];

  return (
    <SettingsMain
      settings={settings.map((s: SettingRow) => ({
        key: s.key,
        value: s.value ?? null,
        updatedAt: s.updatedAt.toISOString(),
      }))}
    />
  );
}

// ============ Skeleton ============
function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {[1, 2].map((i) => (
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
export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pengaturan
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Konfigurasi aplikasi GosokBG.
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <SettingsStatsSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <SettingsTableSection />
      </Suspense>
    </div>
  );
}