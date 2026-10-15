export type DeviceType = "webgpu" | "wasm";

let cachedDevice: DeviceType | null = null;

export async function detectBestDevice(): Promise<DeviceType> {
  if (cachedDevice) return cachedDevice;

  const hasWebGPU =
    typeof navigator !== "undefined" &&
    "gpu" in navigator &&
    typeof (navigator as any).gpu?.requestAdapter === "function";

  if (!hasWebGPU) {
    cachedDevice = "wasm";
    return cachedDevice;
  }

  try {
    const adapter = await (navigator as any).gpu.requestAdapter();
    cachedDevice = adapter ? "webgpu" : "wasm";
  } catch {
    cachedDevice = "wasm";
  }

  return cachedDevice;
}

export function resetDeviceCache() {
  cachedDevice = null;
}