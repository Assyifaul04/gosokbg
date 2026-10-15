import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  // Cek login + role admin
  if (!session?.user || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  // Cegah admin mengubah dirinya sendiri
  if (id === (session.user as any).id) {
    return NextResponse.json(
      { error: "Tidak bisa mengubah akun sendiri" },
      { status: 400 }
    );
  }

  // Validasi input
  const data: { isActive?: boolean; role?: "USER" | "ADMIN" } = {};
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;
  if (body.role === "USER" || body.role === "ADMIN") data.role = body.role;

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "Tidak ada perubahan valid" },
      { status: 400 }
    );
  }

  // Update
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

  // Catat audit log
  await prisma.auditLog.create({
    data: {
      adminId: (session.user as any).id,
      action: data.isActive !== undefined ? "UPDATE_USER_STATUS" : "UPDATE_USER_ROLE",
      targetType: "User",
      targetId: id,
      details: data,
    },
  });

  return NextResponse.json({ user: updated });
}