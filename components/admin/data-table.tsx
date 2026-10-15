//components/dashboard/data-table.tsx
import { ReactNode } from "react";

export function DataTable({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        {action}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

export function Table({ children }: { children: ReactNode }) {
  return <table className="w-full text-sm">{children}</table>;
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead className="border-b border-gray-100 bg-gray-50/50 text-xs uppercase tracking-wide text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
      {children}
    </thead>
  );
}

export function TBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
      {children}
    </tbody>
  );
}

export function TR({ children }: { children: ReactNode }) {
  return (
    <tr className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-950/60">
      {children}
    </tr>
  );
}

export function TH({ children }: { children: ReactNode }) {
  return <th className="px-5 py-3 text-left font-medium">{children}</th>;
}

export function TD({ children }: { children: ReactNode }) {
  return (
    <td className="px-5 py-3 text-gray-700 dark:text-gray-300">{children}</td>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="px-5 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
      {message}
    </div>
  );
}