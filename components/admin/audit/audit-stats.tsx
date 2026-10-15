import { StatCard } from "@/components/admin/stat-card";
import { ScrollText, Calendar, Users } from "lucide-react";

export function AuditStats({
  total,
  today,
  admins,
}: {
  total: number;
  today: number;
  admins: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="Total Log" value={total} icon={ScrollText} accent="sky" />
      <StatCard
        label="Hari Ini"
        value={today}
        icon={Calendar}
        accent="gray"
      />
      <StatCard
        label="Admin Aktif"
        value={admins}
        icon={Users}
        accent="green"
      />
    </div>
  );
}