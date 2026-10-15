import { prisma } from "@/lib/prisma";
import { RecentProcessesTable } from "./recent-processes-table";

async function getRecentProcesses() {
  return prisma.processingHistory.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true, name: true } } },
  });
}

export async function RecentProcesses() {
  const processes = await getRecentProcesses();

  // Map ke plain object: BigInt tidak bisa dikirim ke client component
  const rows = processes.map((p) => ({
    id: p.id,
    modelName: p.modelName,
    status: p.status,
    inputBytes: p.inputBytes != null ? p.inputBytes.toString() : null,
    processingMs: p.processingMs,
    createdAt: p.createdAt.toISOString(),
    guestKey: p.guestKey,
    userName: p.user?.name ?? null,
    userEmail: p.user?.email ?? null,
  }));

  return <RecentProcessesTable rows={rows} />;
}