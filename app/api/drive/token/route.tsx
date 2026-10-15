import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

  if (!account?.access_token) {
    return NextResponse.json(
      { error: "Drive belum terhubung" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    accessToken: account.access_token,
    hasDriveScope: account.scope?.includes("drive") ?? false,
  });
}