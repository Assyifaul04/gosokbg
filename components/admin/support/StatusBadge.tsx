const statusStyles: Record<string, string> = {
  OPEN: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400",
  IN_PROGRESS:
    "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  RESOLVED:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  CLOSED: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400",
};

const statusLabels: Record<string, string> = {
  OPEN: "Terbuka",
  IN_PROGRESS: "Diproses",
  RESOLVED: "Selesai",
  CLOSED: "Ditutup",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${
        statusStyles[status] ?? statusStyles.CLOSED
      }`}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}