import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type DailyStatsRow = {
  id: string;
  date: Date;
  totalProcesses: number;
  successfulProcesses: number;
  failedProcesses: number;
  guestProcesses: number;
  userProcesses: number;
  totalInputBytes: bigint;
  totalOutputBytes: bigint;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const take = Math.min(Number(searchParams.get("take") ?? 30), 90);

  const rows = (await prisma.dailyStats.findMany({
    take,
    orderBy: { date: "desc" },
  })) as DailyStatsRow[];

  return NextResponse.json({
    rows: rows.map((r: DailyStatsRow) => ({
      id: r.id,
      date: r.date,
      totalProcesses: r.totalProcesses,
      successfulProcesses: r.successfulProcesses,
      failedProcesses: r.failedProcesses,
      guestProcesses: r.guestProcesses,
      userProcesses: r.userProcesses,
      totalInputBytes: r.totalInputBytes.toString(),
      totalOutputBytes: r.totalOutputBytes.toString(),
    })),
  });
}