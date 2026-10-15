import {
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  HardDrive,
  Database,
  Calendar,
} from "lucide-react";
import { StatCard } from "@/components/admin/stat-card";

function formatBytes(value: string): string {
  const n = Number(value);
  if (!n) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function StatsGrid({
  totalProcesses,
  totalSuccess,
  totalFailed,
  totalInputBytes,
  totalOutputBytes,
  activeDays,
}: {
  totalProcesses: number;
  totalSuccess: number;
  totalFailed: number;
  totalInputBytes: string;
  totalOutputBytes: string;
  activeDays: number;
}) {
  const successRate =
    totalProcesses > 0
      ? ((totalSuccess / totalProcesses) * 100).toFixed(1)
      : "0.0";

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        label="Total Proses"
        value={totalProcesses}
        icon={ImageIcon}
        trend={`${activeDays} hari aktif`}
        accent="sky"
      />
      <StatCard
        label="Berhasil"
        value={totalSuccess}
        icon={CheckCircle2}
        trend={`${successRate}% sukses`}
        accent="green"
      />
      <StatCard
        label="Gagal"
        value={totalFailed}
        icon={XCircle}
        accent="red"
      />
      <StatCard
        label="Input"
        value={formatBytes(totalInputBytes)}
        icon={HardDrive}
        accent="gray"
      />
      <StatCard
        label="Output"
        value={formatBytes(totalOutputBytes)}
        icon={Database}
        accent="sky"
      />
      <StatCard
        label="Hari Aktif"
        value={activeDays}
        icon={Calendar}
        accent="gray"
      />
    </div>
  );
}