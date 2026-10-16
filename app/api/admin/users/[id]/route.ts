import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  if (id === (session.user as any).id) {
    return NextResponse.json(
      { error: "Tidak bisa mengubah akun sendiri" },
      { status: 400 }
    );
  }

  const data: { isActive?: boolean; role?: "USER" | "ADMIN" } = {};
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;
  if (body.role === "USER" || body.role === "ADMIN") data.role = body.role;

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "Tidak ada perubahan valid" },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  await prisma.auditLog.create({
    data: {
      adminId: (session.user as any).id,
      action:
        data.isActive !== undefined
          ? "UPDATE_USER_STATUS"
          : "UPDATE_USER_ROLE",
      targetType: "User",
      targetId: id,
      details: data,
    },
  });

  return NextResponse.json({ user: updated });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  if (id === (session.user as any).id) {
    return NextResponse.json(
      { error: "Tidak bisa menghapus akun sendiri" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true },
  });

  if (!existing) {
    return NextResponse.json(
      { error: "Pengguna tidak ditemukan" },
      { status: 404 }
    );
  }

  if (existing.role === "ADMIN") {
    return NextResponse.json(
      { error: "Admin tidak dapat dihapus. Turunkan role terlebih dahulu." },
      { status: 400 }
    );
  }

  // Catat audit log SEBELUM hapus, karena setelah dihapus relasi bisa hilang
  await prisma.auditLog.create({
    data: {
      adminId: (session.user as any).id,
      action: "DELETE_USER",
      targetType: "User",
      targetId: id,
      details: { email: existing.email },
    },
  });

  // Hapus user — relasi cascade otomatis menghapus account/session/quota
  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}