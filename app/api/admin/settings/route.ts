import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.appSetting.findMany({
    orderBy: { key: "asc" },
  });

  return NextResponse.json({ settings });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const key = typeof body.key === "string" ? body.key.trim() : "";

    if (!key) {
      return NextResponse.json({ error: "Key wajib diisi." }, { status: 400 });
    }
    if (body.value === undefined || body.value === null) {
      return NextResponse.json({ error: "Value wajib diisi." }, { status: 400 });
    }

    const existing = await prisma.appSetting.findUnique({ where: { key } });
    if (existing) {
      return NextResponse.json(
        { error: "Key sudah ada. Gunakan edit untuk mengubah." },
        { status: 409 }
      );
    }

    const setting = await prisma.appSetting.create({
      data: { key, value: body.value },
    });

    try {
      await prisma.auditLog.create({
        data: {
          adminId: (session.user as any).id,
          action: "CREATE_SETTING",
          targetType: "AppSetting",
          targetId: key,
          details: { key },
        },
      });
    } catch (auditErr) {
      console.error("Audit log failed:", auditErr);
    }

    return NextResponse.json({ setting }, { status: 201 });
  } catch (err: any) {
    console.error("POST /api/admin/settings error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}