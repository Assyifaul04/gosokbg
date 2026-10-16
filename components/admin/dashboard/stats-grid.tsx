import {
  Users,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  TrendingUp,
  HardDrive,
  UserCheck,
} from "lucide-react";

import { StatCard } from "@/components/admin/stat-card";

function formatBytes(bytes: bigint | null | undefined): string {
  if (!bytes) return "0 B";
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

type Stats = {
  totalUsers: number;
  activeUsers: number;
  totalProcesses: number;
  todayProcesses: number;
  failedProcesses: number;
  successRate: string;
  todayStats: {
    totalProcesses: number;
    successfulProcesses: number;
    failedProcesses: number;
    guestProcesses: number;
    userProcesses: number;
    totalInputBytes: bigint | null;
    totalOutputBytes: bigint | null;
  } | null;
};

export function StatsGrid({ stats }: { stats: Stats }) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Pengguna"
          value={stats.totalUsers}
          icon={Users}
          trend={`${stats.activeUsers} aktif`}
          accent="sky"
        />
        <StatCard
          label="Total Proses"
          value={stats.totalProcesses}
          icon={ImageIcon}
          trend={`${stats.todayProcesses} hari ini`}
          accent="gray"
        />
        <StatCard
          label="Tingkat Sukses"
          value={`${stats.successRate}%`}
          icon={CheckCircle2}
          trend={`${stats.failedProcesses} gagal`}
          accent="green"
        />
        <StatCard
          label="Input Hari Ini"
          value={formatBytes(stats.todayStats?.totalInputBytes)}
          icon={HardDrive}
          trend={`Output: ${formatBytes(stats.todayStats?.totalOutputBytes)}`}
          accent="sky"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          label="Proses Hari Ini"
          value={stats.todayStats?.totalProcesses ?? 0}
          icon={TrendingUp}
          accent="sky"
        />
        <StatCard
          label="Berhasil"
          value={stats.todayStats?.successfulProcesses ?? 0}
          icon={CheckCircle2}
          accent="green"
        />
        <StatCard
          label="Gagal"
          value={stats.todayStats?.failedProcesses ?? 0}
          icon={XCircle}
          accent="red"
        />
        <StatCard
          label="Tamu"
          value={stats.todayStats?.guestProcesses ?? 0}
          icon={UserCheck}
          accent="yellow"
        />
      </div>
    </div>
  );
}