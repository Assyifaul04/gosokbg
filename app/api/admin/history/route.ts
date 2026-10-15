import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type HistoryItem = {
  id: string;
  userId: string | null;
  guestKey: string | null;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  modelName: string;
  inputFormat: string | null;
  outputFormat: string;
  inputBytes: bigint | null;
  outputBytes: bigint | null;
  imageWidth: number | null;
  imageHeight: number | null;
  processingMs: number | null;
  errorCode: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
  user: { name: string | null; email: string | null } | null;
};

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const take = Math.min(Number(searchParams.get("take") ?? 100), 500);
  const skip = Number(searchParams.get("skip") ?? 0);
  const status = searchParams.get("status") ?? undefined;
  const modelName = searchParams.get("modelName") ?? undefined;

  const where = {
    ...(status ? { status: status as any } : {}),
    ...(modelName ? { modelName } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.processingHistory.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    }) as Promise<HistoryItem[]>,
    prisma.processingHistory.count({ where }),
  ]);

  return NextResponse.json({
    items: items.map((p: HistoryItem) => ({
      ...p,
      inputBytes: p.inputBytes?.toString() ?? null,
      outputBytes: p.outputBytes?.toString() ?? null,
    })),
    total,
    take,
    skip,
  });
}

// DELETE massal: hapus beberapa id sekaligus
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const ids: string[] = Array.isArray(body.ids) ? body.ids : [];

    if (ids.length === 0) {
      return NextResponse.json({ error: "Tidak ada ID." }, { status: 400 });
    }

    const result = await prisma.processingHistory.deleteMany({
      where: { id: { in: ids } },
    });

    try {
      await prisma.auditLog.create({
        data: {
          adminId: (session.user as any).id,
          action: "BULK_DELETE_HISTORY",
          targetType: "ProcessingHistory",
          details: { count: result.count, ids },
        },
      });
    } catch (auditErr) {
      console.error("Audit log failed:", auditErr);
    }

    return NextResponse.json({ deleted: result.count });
  } catch (err: any) {
    console.error("DELETE /api/admin/history error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}