import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
      provider: "google",
    },
  });

  if (!account) {
    return NextResponse.json({ error: "Account not found" }, { status: 404 });
  }

  const hasDrive = account.scope?.includes("drive") ?? false;

  await prisma.account.update({
    where: { id: account.id },
    data: {
      hasDriveScope: hasDrive,
      driveScopeGrantedAt: hasDrive ? new Date() : null,
    },
  });

  return NextResponse.json({ hasDriveScope: hasDrive });
}