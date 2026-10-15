import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) return null;
  if (session.user.role !== "ADMIN") return null;
  if (!session.user.id) return null;
  return session;
}

export async function DELETE(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const ids: string[] = Array.isArray(body?.ids)
    ? body.ids.filter((x: unknown): x is string => typeof x === "string")
    : [];

  if (ids.length === 0) {
    return NextResponse.json(
      { error: "Tidak ada ID yang diberikan" },
      { status: 400 }
    );
  }

  try {
    const result = await prisma.processingHistory.deleteMany({
      where: { id: { in: ids } },
    });

    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "DELETE_PROCESS_BULK",
        targetType: "ProcessingHistory",
        details: { count: result.count, ids },
      },
    });

    return NextResponse.json({ ok: true, count: result.count });
  } catch (err: any) {
    console.error("[DELETE recent-processes bulk]", err);
    return NextResponse.json(
      { error: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}