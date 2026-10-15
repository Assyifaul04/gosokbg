import { StatCard } from "@/components/admin/stat-card";
import { Image as ImageIcon, CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function HistoryStats({
  total,
  completed,
  failed,
  processing,
}: {
  total: number;
  completed: number;
  failed: number;
  processing: number;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total" value={total} icon={ImageIcon} accent="sky" />
      <StatCard
        label="Berhasil"
        value={completed}
        icon={CheckCircle2}
        accent="green"
      />
      <StatCard label="Gagal" value={failed} icon={XCircle} accent="red" />
      <StatCard
        label="Diproses"
        value={processing}
        icon={Loader2}
        accent="yellow"
      />
    </div>
  );
}