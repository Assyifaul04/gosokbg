import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const existing = await prisma.processingHistory.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Riwayat tidak ditemukan." },
        { status: 404 }
      );
    }

    await prisma.processingHistory.delete({ where: { id } });

    // Audit log — dibungkus try/catch supaya tidak gagal total
    try {
      await prisma.auditLog.create({
        data: {
          adminId: (session.user as any).id,
          action: "DELETE_HISTORY",
          targetType: "ProcessingHistory",
          targetId: id,
          details: {
            modelName: existing.modelName,
            status: existing.status,
          },
        },
      });
    } catch (auditErr) {
      console.error("Audit log failed:", auditErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /api/admin/history/[id] error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}