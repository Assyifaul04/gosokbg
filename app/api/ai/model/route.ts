import { NextResponse } from "next/server";
import { getAIModels, getActiveModel } from "@/lib/settings";

export async function GET() {
  const [models, active] = await Promise.all([
    getAIModels(),
    getActiveModel(),
  ]);

  return NextResponse.json({ models, active });
}