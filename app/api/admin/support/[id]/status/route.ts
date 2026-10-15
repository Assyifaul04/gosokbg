import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const statusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await auth();
    if (!session?.user?.id || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = statusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
    }

    const ticket = await prisma.supportTicket.update({
      where: { id },
      data: {
        status: parsed.data.status,
        resolvedAt:
          parsed.data.status === "RESOLVED" || parsed.data.status === "CLOSED"
            ? new Date()
            : null,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminId: session.user.id,
        action: "TICKET_STATUS_CHANGE",
        targetType: "SupportTicket",
        targetId: ticket.id,
        details: { status: parsed.data.status },
      },
    });

    return NextResponse.json({ ok: true, ticket });
  } catch (err) {
    console.error("[ADMIN_TICKET_STATUS_PATCH]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}