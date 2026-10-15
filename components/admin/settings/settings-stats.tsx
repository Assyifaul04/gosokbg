import { StatCard } from "@/components/admin/stat-card";
import { Settings, Clock } from "lucide-react";

export function SettingsStats({
  total,
  lastUpdated,
}: {
  total: number;
  lastUpdated: string | null;
}) {
  const lastUpdatedLabel = lastUpdated
    ? new Date(lastUpdated).toLocaleString("id-ID", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "Belum pernah";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StatCard
        label="Total Pengaturan"
        value={total}
        icon={Settings}
        accent="sky"
      />
      <StatCard
        label="Terakhir Diubah"
        value={lastUpdatedLabel}
        icon={Clock}
        accent="gray"
      />
    </div>
  );
}