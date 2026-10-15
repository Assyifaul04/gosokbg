import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();

    // Validasi input
    const modelName = typeof body.modelName === "string" ? body.modelName : "";
    const status = body.status as
      | "PENDING"
      | "PROCESSING"
      | "COMPLETED"
      | "FAILED";

    if (!modelName) {
      return NextResponse.json(
        { error: "modelName wajib diisi." },
        { status: 400 }
      );
    }

    if (!["PENDING", "PROCESSING", "COMPLETED", "FAILED"].includes(status)) {
      return NextResponse.json(
        { error: "Status tidak valid." },
        { status: 400 }
      );
    }

    // User login pakai userId, tamu pakai guestKey
    const userId = session?.user ? (session.user as any).id : null;
    const guestKey = userId
      ? null
      : typeof body.guestKey === "string"
      ? body.guestKey
      : null;

    const inputBytes =
      typeof body.inputBytes === "number" ? body.inputBytes : null;
    const outputBytes =
      typeof body.outputBytes === "number" ? body.outputBytes : null;
    const imageWidth =
      typeof body.imageWidth === "number" ? body.imageWidth : null;
    const imageHeight =
      typeof body.imageHeight === "number" ? body.imageHeight : null;
    const processingMs =
      typeof body.processingMs === "number" ? body.processingMs : null;
    const errorCode =
      typeof body.errorCode === "string" ? body.errorCode : null;
    const inputFormat =
      typeof body.inputFormat === "string" ? body.inputFormat : null;
    const outputFormat =
      typeof body.outputFormat === "string" ? body.outputFormat : "png";

    // 1. Simpan riwayat proses
    const history = await prisma.processingHistory.create({
      data: {
        userId,
        guestKey,
        status,
        modelName,
        inputFormat,
        outputFormat,
        inputBytes: inputBytes ? BigInt(inputBytes) : null,
        outputBytes: outputBytes ? BigInt(outputBytes) : null,
        imageWidth,
        imageHeight,
        processingMs,
        errorCode,
      },
    });

    // 2. Update DailyStats (hanya kalau status COMPLETED atau FAILED)
    if (status === "COMPLETED" || status === "FAILED") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isGuest = !userId;
      const isSuccess = status === "COMPLETED";

      await prisma.dailyStats.upsert({
        where: { date: today },
        update: {
          totalProcesses: { increment: 1 },
          successfulProcesses: isSuccess ? { increment: 1 } : undefined,
          failedProcesses: !isSuccess ? { increment: 1 } : undefined,
          guestProcesses: isGuest ? { increment: 1 } : undefined,
          userProcesses: !isGuest ? { increment: 1 } : undefined,
          totalInputBytes: inputBytes
            ? { increment: BigInt(inputBytes) }
            : undefined,
          totalOutputBytes: outputBytes
            ? { increment: BigInt(outputBytes) }
            : undefined,
        },
        create: {
          date: today,
          totalProcesses: 1,
          successfulProcesses: isSuccess ? 1 : 0,
          failedProcesses: !isSuccess ? 1 : 0,
          guestProcesses: isGuest ? 1 : 0,
          userProcesses: !isGuest ? 1 : 0,
          totalInputBytes: inputBytes ? BigInt(inputBytes) : BigInt(0),
          totalOutputBytes: outputBytes ? BigInt(outputBytes) : BigInt(0),
        },
      });
    }

    return NextResponse.json({
      ok: true,
      historyId: history.id,
    });
  } catch (err: any) {
    console.error("POST /api/process error:", err);
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}