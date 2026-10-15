import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDailyLimit } from "@/lib/settings";

function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

// GET: cek sisa kuota
export async function GET(req: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);
    const guestKey = searchParams.get("guestKey") ?? undefined;

    const userId = session?.user ? (session.user as any).id : null;

    // User login: tanpa batas
    if (userId) {
      return NextResponse.json({
        used: 0,
        limit: -1,
        remaining: -1,
        canProcess: true,
        unlimited: true,
      });
    }

    if (!guestKey) {
      return NextResponse.json(
        { error: "Butuh userId atau guestKey." },
        { status: 400 }
      );
    }

    const limit = await getDailyLimit();
    const today = getToday();

    const quota = await prisma.usageQuota.findFirst({
      where: { guestKey, date: today },
    });

    const used = quota?.used ?? 0;
    const remaining = Math.max(0, limit - used);

    return NextResponse.json({
      used,
      limit,
      remaining,
      canProcess: remaining > 0,
      unlimited: false,
    });
  } catch (err: any) {
    console.error("GET /api/quota error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}

// POST: reserve 1 kuota (hanya untuk tamu)
export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json().catch(() => ({}));
    const guestKey = typeof body.guestKey === "string" ? body.guestKey : null;

    const userId = session?.user ? (session.user as any).id : null;

    // User login: bypass kuota
    if (userId) {
      return NextResponse.json({
        used: 0,
        limit: -1,
        remaining: -1,
        canProcess: true,
        unlimited: true,
      });
    }

    if (!guestKey) {
      return NextResponse.json(
        { error: "Butuh userId atau guestKey." },
        { status: 400 }
      );
    }

    const limit = await getDailyLimit();
    const today = getToday();

    let quota = await prisma.usageQuota.findFirst({
      where: { guestKey, date: today },
    });

    if (!quota) {
      quota = await prisma.usageQuota.create({
        data: {
          guestKey,
          userId: null,
          date: today,
          used: 0,
          limit,
        },
      });
    }

    if (quota.used >= quota.limit) {
      return NextResponse.json(
        {
          error: "Kuota harian habis. Login untuk tanpa batas.",
          used: quota.used,
          limit: quota.limit,
          remaining: 0,
          canProcess: false,
          unlimited: false,
        },
        { status: 429 }
      );
    }

    const updated = await prisma.usageQuota.update({
      where: { id: quota.id },
      data: { used: { increment: 1 } },
    });

    return NextResponse.json({
      used: updated.used,
      limit: updated.limit,
      remaining: Math.max(0, updated.limit - updated.used),
      canProcess: updated.used <= updated.limit,
      unlimited: false,
    });
  } catch (err: any) {
    console.error("POST /api/quota error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}