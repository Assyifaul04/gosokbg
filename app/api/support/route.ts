import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { supportTicketSchema } from "@/lib/validations/support";

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60_000;

function checkRateLimit(key: string) {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || entry.resetAt < now) {
    rateLimit.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }

  if (entry.count >= LIMIT) {
    return {
      ok: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  entry.count += 1;
  return { ok: true };
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    const h = await headers();
    const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const key = session?.user?.id ?? ip;

    const rl = checkRateLimit(key);
    if (!rl.ok) {
      return NextResponse.json(
        {
          error: `Terlalu banyak laporan. Coba lagi dalam ${rl.retryAfter} detik.`,
        },
        { status: 429 }
      );
    }

    const parsed = supportTicketSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        {
          error: firstIssue?.message ?? "Data tidak valid",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const userAgent = h.get("user-agent") ?? undefined;
    const ipHash = crypto
      .createHash("sha256")
      .update(ip + (process.env.IP_SALT ?? "gosokbg"))
      .digest("hex")
      .slice(0, 32);

    const ticket = await prisma.supportTicket.create({
      data: {
        userId: session?.user?.id ?? null,
        name: parsed.data.name,
        email: parsed.data.email,
        category: parsed.data.category,
        subject: parsed.data.subject,
        message: parsed.data.message,
        userAgent,
        ipHash,
        messages: {
          create: {
            userId: session?.user?.id ?? null,
            role: "USER",
            body: parsed.data.message,
          },
        },
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, ticket }, { status: 201 });
  } catch (err) {
    console.error("[SUPPORT_POST]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}