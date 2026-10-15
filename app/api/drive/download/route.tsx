import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json(
        { error: "fileId wajib diisi" },
        { status: 400 }
      );
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

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: account.access_token });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // Ambil metadata dulu
    const meta = await drive.files.get({
      fileId,
      fields: "id, name, mimeType, size",
    });

    // Download isi file
    const fileRes = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" }
    );

    const buffer = Buffer.from(fileRes.data as ArrayBuffer);

    // Kembalikan sebagai base64 data URL supaya bisa dipakai di client
    const base64 = buffer.toString("base64");
    const mimeType = meta.data.mimeType ?? "image/png";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      ok: true,
      file: {
        id: meta.data.id,
        name: meta.data.name,
        mimeType,
        size: Number(meta.data.size ?? buffer.length),
        dataUrl,
      },
    });
  } catch (err: any) {
    console.error("Download dari Drive gagal:", err);
    return NextResponse.json(
      { error: err?.message ?? "Gagal download file" },
      { status: 500 }
    );
  }
}