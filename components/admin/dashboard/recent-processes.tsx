import { prisma } from "@/lib/prisma";
import {
  DataTable,
  Table,
  THead,
  TBody,
  TR,
  TH,
  TD,
  EmptyState,
} from "@/components/admin/data-table";
import { StatusBadge } from "@/components/admin/status-badge";

function formatBytes(bytes: bigint | null | undefined): string {
  if (!bytes) return "0 B";
  const n = Number(bytes);
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

async function getRecentProcesses() {
  return prisma.processingHistory.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true, name: true } } },
  });
}

type ProcessWithUser = Awaited<ReturnType<typeof getRecentProcesses>>[number];

export async function RecentProcesses() {
  const processes: ProcessWithUser[] = await getRecentProcesses();

  return (
    <DataTable title="Proses Terbaru">
      {processes.length === 0 ? (
        <EmptyState message="Belum ada proses." />
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Pengguna</TH>
              <TH>Model</TH>
              <TH>Status</TH>
              <TH>Ukuran Input</TH>
              <TH>Durasi</TH>
              <TH>Waktu</TH>
            </TR>
          </THead>
          <TBody>
            {processes.map((p) => (
              <TR key={p.id}>
                <TD>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {p.user?.name ?? "Tamu"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {p.user?.email ?? p.guestKey ?? "-"}
                    </span>
                  </div>
                </TD>
                <TD>{p.modelName}</TD>
                <TD>
                  <StatusBadge status={p.status} />
                </TD>
                <TD>{formatBytes(p.inputBytes)}</TD>
                <TD>{p.processingMs ? `${p.processingMs} ms` : "-"}</TD>
                <TD>
                  {new Date(p.createdAt).toLocaleString("id-ID", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}
    </DataTable>
  );
}