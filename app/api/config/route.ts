import { NextResponse } from "next/server";
import { getMaxUploadMB, isMaintenanceMode } from "@/lib/settings";

export async function GET() {
  try {
    const [maxUploadMB, maintenanceMode] = await Promise.all([
      getMaxUploadMB(),
      isMaintenanceMode(),
    ]);

    return NextResponse.json({ maxUploadMB, maintenanceMode });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Server error" },
      { status: 500 }
    );
  }
}