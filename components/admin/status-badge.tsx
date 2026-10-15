import { cn } from "@/lib/utils";

const statusMap = {
  PENDING:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400",
  PROCESSING:
    "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400",
  COMPLETED:
    "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
  FAILED: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
};

const roleMap = {
  USER: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  ADMIN: "bg-sky-100 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400",
};

export function StatusBadge({
  status,
}: {
  status: keyof typeof statusMap;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
        statusMap[status]
      )}
    >
      {status}
    </span>
  );
}

export function RoleBadge({ role }: { role: keyof typeof roleMap }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
        roleMap[role]
      )}
    >
      {role}
    </span>
  );
}