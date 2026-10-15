import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type AuditRow = {
  id: string;
  adminId: string | null;
  action: string;
  targetType: string | null;
  targetId: string | null;
  details: unknown;
  createdAt: Date;
  admin: {
    name: string | null;
    email: string | null;
    image: string | null;
  } | null;
};

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const take = Math.min(Number(searchParams.get("take") ?? 100), 500);
  const skip = Number(searchParams.get("skip") ?? 0);
  const action = searchParams.get("action") ?? undefined;

  const where = {
    ...(action ? { action } : {}),
  };

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" },
      include: {
        admin: { select: { name: true, email: true, image: true } },
      },
    }) as Promise<AuditRow[]>,
    prisma.auditLog.count({ where }),
  ]);

  return NextResponse.json({
    logs: logs.map((l: AuditRow) => ({
      id: l.id,
      adminId: l.adminId,
      adminName: l.admin?.name ?? null,
      adminEmail: l.admin?.email ?? null,
      adminImage: l.admin?.image ?? null,
      action: l.action,
      targetType: l.targetType,
      targetId: l.targetId,
      details: l.details ?? null,
      createdAt: l.createdAt,
    })),
    total,
    take,
    skip,
  });
}

// DELETE massal atau hapus semua
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const ids: string[] = Array.isArray(body.ids) ? body.ids : [];
    const all: boolean = body.all === true;

    if (!all && ids.length === 0) {
      return NextResponse.json(
        { error: "Tidak ada ID atau flag all." },
        { status: 400 }
      );
    }

    // Hapus semua
    if (all) {
      const result = await prisma.auditLog.deleteMany();
      return NextResponse.json({
        deleted: result.count,
        all: true,
      });
    }

    // Hapus berdasarkan ID
    const result = await prisma.auditLog.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ deleted: result.count, all: false });
  } catch (err: any) {
    console.error("DELETE /api/admin/audit error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}