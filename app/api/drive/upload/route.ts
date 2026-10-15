// app/api/drive/upload/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Ambil account Google user dari database
  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, provider: "google" },
  });

  if (!account?.access_token) {
    return NextResponse.json({ error: "Drive belum terhubung" }, { status: 400 });
  }

  // 2. Siapkan OAuth2 client dengan token yang ada
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: account.access_token });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  // 3. Terima file dari request
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }

  // 4. Convert ke buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // 5. Upload ke Drive
  try {
    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: "image/png",
      },
      media: {
        mimeType: "image/png",
        body: buffer,
      },
      fields: "id, name, webViewLink",
    });

    return NextResponse.json({
      success: true,
      fileId: response.data.id,
      link: response.data.webViewLink,
    });
  } catch (error) {
    console.error("Upload ke Drive gagal:", error);
    return NextResponse.json({ error: "Gagal upload" }, { status: 500 });
  }
}