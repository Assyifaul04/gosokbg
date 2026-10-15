import { prisma } from "@/lib/prisma";

export type AIModel = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

export const DEFAULT_MODELS: AIModel[] = [
  {
    id: "modnet",
    name: "MODNet",
    description: "Cepat & ringan · Portrait & selfie",
    enabled: true,
  },
  {
    id: "birefnet",
    name: "BiRefNet Lite",
    description: "Kualitas tepi terbaik · Ilustrasi & detail",
    enabled: true,
  },
  {
    id: "ben2",
    name: "BEN2",
    description: "Kualitas profesional · Semua jenis foto",
    enabled: true,
  },
];

type SettingRow = { key: string; value: unknown };
type ModelMeta = { name: string; enabled: boolean; description: string };

function unwrap<T>(v: unknown, fallback: T): T {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "object" && !Array.isArray(v) && "value" in v) {
    const wrapped = v as { value: unknown };
    if (Object.keys(v).length === 1) return (wrapped.value as T) ?? fallback;
  }
  return v as T;
}

export async function getAIModels(): Promise<AIModel[]> {
  const settings = (await prisma.appSetting.findMany({
    where: { key: { startsWith: "ai.model." } },
    orderBy: { key: "asc" },
  })) as SettingRow[];

  if (settings.length === 0) return DEFAULT_MODELS;

  const models: AIModel[] = [];
  for (const s of settings) {
    const id = s.key.replace("ai.model.", "");
    const meta = unwrap<ModelMeta | null>(s.value, null);
    if (!meta || typeof meta !== "object") continue;
    if (!meta.enabled) continue;
    models.push({
      id,
      name: meta.name ?? id,
      description: meta.description ?? "",
      enabled: meta.enabled,
    });
  }
  return models;
}

export async function getActiveModel(): Promise<string> {
  const setting = await prisma.appSetting.findUnique({
    where: { key: "ai.activeModel" },
  });
  if (!setting) return "modnet";
  return unwrap<string>(setting.value, "modnet");
}

export async function getDailyLimit(): Promise<number> {
  const setting = await prisma.appSetting.findUnique({
    where: { key: "quota.dailyLimit" },
  });
  if (!setting) return 5;
  const n = unwrap<number>(setting.value, 5);
  return typeof n === "number" ? n : 5;
}

export async function getMaxUploadMB(): Promise<number> {
  const setting = await prisma.appSetting.findUnique({
    where: { key: "upload.maxSizeMB" },
  });
  if (!setting) return 10;
  const n = unwrap<number>(setting.value, 10);
  return typeof n === "number" ? n : 10;
}

export async function isMaintenanceMode(): Promise<boolean> {
  const setting = await prisma.appSetting.findUnique({
    where: { key: "app.maintenanceMode" },
  });
  if (!setting) return false;
  return unwrap<boolean>(setting.value, false);
}