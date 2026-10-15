import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  accent = "sky",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  accent?: "sky" | "green" | "red" | "gray" | "yellow";
}) {
  const accentMap = {
    sky: "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400",
    green: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400",
    red: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
    yellow:
      "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
    gray: "bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-400",
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-colors hover:border-sky-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-sky-800">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {trend}
            </p>
          )}
        </div>
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-lg",
            accentMap[accent]
          )}
        >
          <Icon className="size-5" />
        </span>
      </div>
    </div>
  );
}