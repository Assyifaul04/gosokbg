import { StatCard } from "@/components/admin/stat-card";
import { Users, Shield, UserCheck, UserX } from "lucide-react";

export function UsersStats({
  total,
  admins,
  active,
}: {
  total: number;
  admins: number;
  active: number;
}) {
  const inactive = total - active;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total" value={total} icon={Users} accent="sky" />
      <StatCard label="Admin" value={admins} icon={Shield} accent="gray" />
      <StatCard label="Aktif" value={active} icon={UserCheck} accent="green" />
      <StatCard label="Nonaktif" value={inactive} icon={UserX} accent="red" />
    </div>
  );
}