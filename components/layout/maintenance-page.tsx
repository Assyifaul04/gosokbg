import { Wrench } from "lucide-react";

export function MaintenancePage() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="max-w-md text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400">
          <Wrench className="size-8" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
          Sedang Maintenance
        </h1>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          GosokBG sedang dalam perbaikan. Silakan coba lagi beberapa saat lagi.
        </p>
      </div>
    </div>
  );
}