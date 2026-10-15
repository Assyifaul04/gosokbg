import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { ticketMessageSchema } from "@/lib/validations/support";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Harus login" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = ticketMessageSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message ?? "Pesan tidak valid" },
        { status: 400 }
      );
    }

    const ticket = await prisma.supportTicket.findUnique({
      where: { id },
      select: { id: true, userId: true, status: true },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Tiket tidak ditemukan" },
        { status: 404 }
      );
    }

    const isAdmin = (session.user as any).role === "ADMIN";
    const isOwner = ticket.userId === session.user.id;

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Akses ditolak" }, { status: 403 });
    }

    if (ticket.status === "CLOSED") {
      return NextResponse.json(
        { error: "Tiket sudah ditutup" },
        { status: 400 }
      );
    }

    const message = await prisma.supportTicketMessage.create({
      data: {
        ticketId: ticket.id,
        userId: session.user.id,
        role: isAdmin ? "ADMIN" : "USER",
        body: parsed.data.body,
      },
    });

    await prisma.supportTicket.update({
      where: { id: ticket.id },
      data: {
        status: isAdmin ? "IN_PROGRESS" : ticket.status,
        updatedAt: new Date(),
      },
    });

    if (isAdmin) {
      await prisma.auditLog.create({
        data: {
          adminId: session.user.id,
          action: "TICKET_REPLY",
          targetType: "SupportTicket",
          targetId: ticket.id,
        },
      });
    }

    return NextResponse.json({ ok: true, message }, { status: 201 });
  } catch (err) {
    console.error("[SUPPORT_MESSAGE_POST]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}