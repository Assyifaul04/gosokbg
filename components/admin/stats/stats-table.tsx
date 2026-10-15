"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Row = {
  id: string;
  date: string;
  totalProcesses: number;
  successfulProcesses: number;
  failedProcesses: number;
  guestProcesses: number;
  userProcesses: number;
  totalInputBytes: string;
  totalOutputBytes: string;
};

function formatBytes(value: string): string {
  const n = Number(value);
  if (!n) return "0 B";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function StatsTable({ rows }: { rows: Row[] }) {
  const [limit, setLimit] = useState(10);
  const visible = rows.slice(0, limit);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 dark:border-gray-800">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Rincian Harian
        </h2>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="h-8 rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-700 outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
        >
          <option value={10}>10 hari</option>
          <option value={30}>30 hari</option>
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 bg-gray-50/50 hover:bg-gray-50/50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950">
            <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Tanggal
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Total
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Sukses
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Gagal
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Tamu
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              User
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Input
            </TableHead>
            <TableHead className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Output
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="py-12 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Belum ada data statistik.
              </TableCell>
            </TableRow>
          ) : (
            visible.map((r) => (
              <TableRow
                key={r.id}
                className="border-b border-gray-50 hover:bg-gray-50/60 dark:border-gray-800/60 dark:hover:bg-gray-950/40"
              >
                <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                  {new Date(r.date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-900 dark:text-white">
                  {r.totalProcesses}
                </TableCell>
                <TableCell className="text-sm text-green-600 dark:text-green-400">
                  {r.successfulProcesses}
                </TableCell>
                <TableCell className="text-sm text-red-600 dark:text-red-400">
                  {r.failedProcesses}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                  {r.guestProcesses}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                  {r.userProcesses}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                  {formatBytes(r.totalInputBytes)}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                  {formatBytes(r.totalOutputBytes)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}