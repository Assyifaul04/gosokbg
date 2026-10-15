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

    const existing = await prisma.auditLog.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Audit log tidak ditemukan." },
        { status: 404 }
      );
    }

    await prisma.auditLog.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE /api/admin/audit/[id] error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}