import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { key } = await params;
    const decodedKey = decodeURIComponent(key);
    const body = await req.json();

    if (body.value === undefined || body.value === null) {
      return NextResponse.json({ error: "Value wajib diisi." }, { status: 400 });
    }

    const existing = await prisma.appSetting.findUnique({
      where: { key: decodedKey },
    });
    if (!existing) {
      return NextResponse.json({ error: "Key tidak ditemukan." }, { status: 404 });
    }

    const setting = await prisma.appSetting.update({
      where: { key: decodedKey },
      data: { value: body.value },
    });

    try {
      await prisma.auditLog.create({
        data: {
          adminId: (session.user as any).id,
          action: "UPDATE_SETTING",
          targetType: "AppSetting",
          targetId: decodedKey,
          details: { key: decodedKey },
        },
      });
    } catch (auditErr) {
      console.error("Audit log failed:", auditErr);
    }

    return NextResponse.json({ setting });
  } catch (err: any) {
    console.error("PUT error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { key } = await params;
    const decodedKey = decodeURIComponent(key);

    const existing = await prisma.appSetting.findUnique({
      where: { key: decodedKey },
    });
    if (!existing) {
      return NextResponse.json({ error: "Key tidak ditemukan." }, { status: 404 });
    }

    await prisma.appSetting.delete({ where: { key: decodedKey } });

    try {
      await prisma.auditLog.create({
        data: {
          adminId: (session.user as any).id,
          action: "DELETE_SETTING",
          targetType: "AppSetting",
          targetId: decodedKey,
          details: { key: decodedKey },
        },
      });
    } catch (auditErr) {
      console.error("Audit log failed:", auditErr);
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}