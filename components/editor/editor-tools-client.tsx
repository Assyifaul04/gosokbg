"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Sparkles,
  Download,
  RotateCcw,
  ChevronDown,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AIModel } from "@/lib/settings";
import { getModelConfig } from "@/lib/model-config";
import { detectBestDevice } from "@/lib/ai-device";

type Stage = "idle" | "processing" | "done" | "error";

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  dataUrl: string;
  at: number;
};

// Helper: ambil atau buat guest key di localStorage
function getGuestKey(): string {
  if (typeof window === "undefined") return "";
  let key = localStorage.getItem("gosokbg:guestKey");
  if (!key) {
    key =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("gosokbg:guestKey", key);
  }
  return key;
}

// Helper: hitung ukuran byte dari data URL
function estimateBytesFromDataUrl(dataUrl: string): number | undefined {
  if (!dataUrl.startsWith("data:")) return undefined;
  const base64 = dataUrl.split(",")[1];
  if (!base64) return undefined;
  return Math.round((base64.length * 3) / 4);
}

export function EditorToolsClient({
  models,
  activeModelId,
}: {
  models: AIModel[];
  activeModelId: string;
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const [selectedModelId, setSelectedModelId] = useState(activeModelId);
  const [inputUrl, setInputUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showModelMenu, setShowModelMenu] = useState(false);

  const segmenterRef = useRef<any>(null);
  const loadedModelIdRef = useRef<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowModelMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const raw = sessionStorage.getItem("gosokbg:upload");
    if (!raw) {
      router.replace("/editor");
      return;
    }
    try {
      const file = JSON.parse(raw) as UploadedFile;
      setInputUrl(file.dataUrl);
      setFileName(file.name);
      setFileSize(file.size ?? 0);
      setStage("idle");
    } catch {
      router.replace("/editor");
    }
  }, [router]);

  const loadModel = useCallback(async (id: string) => {
    if (segmenterRef.current && loadedModelIdRef.current === id) {
      return segmenterRef.current;
    }

    setProgress("Memuat model AI...");

    try {
      const { pipeline, env } = await import("@huggingface/transformers");
      env.allowLocalModels = false;
      env.useBrowserCache = true;

      const config = getModelConfig(id);
      const device = await detectBestDevice();

      console.log(
        `[GosokBG] Load model: ${config.hfModelId} | dtype: ${config.dtype} | device: ${device}`
      );

      const segmenter = await pipeline("background-removal", config.hfModelId, {
        dtype: config.dtype,
        device,
        progress_callback: (p: any) => {
          if (p.status === "progress" && p.progress) {
            const loaded = p.loaded
              ? (p.loaded / 1024 / 1024).toFixed(1)
              : "?";
            const total = p.total
              ? (p.total / 1024 / 1024).toFixed(1)
              : "?";
            setProgress(
              `Mengunduh model: ${Math.round(p.progress)}% (${loaded}/${total} MB)`
            );
          } else if (p.status === "ready") {
            setProgress("Menyiapkan pemrosesan gambar...");
          }
        },
      });

      segmenterRef.current = segmenter;
      loadedModelIdRef.current = id;
      return segmenter;
    } catch (err: any) {
      console.error("Load error:", err);
      throw new Error(err?.message ?? "Gagal memuat model.");
    }
  }, []);

  async function processHighResCutout(
    segmenter: any,
    imageUrl: string
  ): Promise<{ url: string; width: number; height: number; outputBytes: number }> {
    setProgress("Membaca resolusi gambar...");

    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    const origWidth = img.naturalWidth;
    const origHeight = img.naturalHeight;

    const MAX_INFERENCE_DIM = 1024;
    let inferenceUrl = imageUrl;

    if (origWidth > MAX_INFERENCE_DIM || origHeight > MAX_INFERENCE_DIM) {
      setProgress("Mengoptimalkan ukuran untuk AI...");
      const scale = Math.min(
        MAX_INFERENCE_DIM / origWidth,
        MAX_INFERENCE_DIM / origHeight
      );
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = Math.round(origWidth * scale);
      tempCanvas.height = Math.round(origHeight * scale);
      const tempCtx = tempCanvas.getContext("2d");

      if (tempCtx) {
        tempCtx.imageSmoothingEnabled = true;
        tempCtx.imageSmoothingQuality = "high";
        tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
        inferenceUrl = tempCanvas.toDataURL("image/png");
      }
    }

    setProgress("Menghapus background...");
    const output = await segmenter(inferenceUrl);
    const result = Array.isArray(output) ? output[0] : output;

    let resultBlob: Blob;
    if (result && typeof result.toBlob === "function") {
      resultBlob = await result.toBlob("image/png");
    } else if (result instanceof Blob) {
      resultBlob = result;
    } else if (typeof result === "string") {
      const res = await fetch(result);
      resultBlob = await res.blob();
    } else {
      throw new Error("Format output AI tidak dikenal.");
    }

    setProgress("Menyempurnakan detail tepi...");
    const maskImg = new Image();
    const maskUrl = URL.createObjectURL(resultBlob);
    await new Promise((resolve, reject) => {
      maskImg.onload = resolve;
      maskImg.onerror = reject;
      maskImg.src = maskUrl;
    });
    URL.revokeObjectURL(maskUrl);

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = origWidth;
    finalCanvas.height = origHeight;
    const finalCtx = finalCanvas.getContext("2d", {
      willReadFrequently: false,
    });

    if (!finalCtx) {
      throw new Error("Gagal membuat context canvas.");
    }

    finalCtx.imageSmoothingEnabled = true;
    finalCtx.imageSmoothingQuality = "high";

    finalCtx.drawImage(img, 0, 0, origWidth, origHeight);
    finalCtx.globalCompositeOperation = "destination-in";
    finalCtx.drawImage(maskImg, 0, 0, origWidth, origHeight);
    finalCtx.globalCompositeOperation = "source-over";

    return await new Promise<{
      url: string;
      width: number;
      height: number;
      outputBytes: number;
    }>((resolve, reject) => {
      finalCanvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Gagal menghasilkan file gambar akhir."));
            return;
          }
          resolve({
            url: URL.createObjectURL(blob),
            width: origWidth,
            height: origHeight,
            outputBytes: blob.size,
          });
        },
        "image/png",
        1.0
      );
    });
  }

  // Kirim log ke server (fire & forget)
  async function logToServer(params: {
    modelName: string;
    status: "COMPLETED" | "FAILED";
    inputBytes?: number;
    outputBytes?: number;
    imageWidth?: number;
    imageHeight?: number;
    processingMs?: number;
    errorCode?: string;
    inputFormat?: string;
    outputFormat?: string;
  }) {
    try {
      await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...params,
          guestKey: isLoggedIn ? undefined : getGuestKey(),
        }),
      });
    } catch (err) {
      console.warn("[GosokBG] Log to server failed:", err);
    }
  }

  async function process() {
    if (!inputUrl) return;

    // Cek kuota HANYA kalau user TIDAK login
    if (!isLoggedIn) {
      try {
        const guestKey = getGuestKey();

        const quotaRes = await fetch("/api/quota", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guestKey }),
        });

        if (quotaRes.status === 429) {
          const data = await quotaRes.json().catch(() => ({}));
          setError(
            `Kuota harian habis (${data.used ?? "?"}/${data.limit ?? "?"}). Login untuk tanpa batas, atau coba lagi besok.`
          );
          return;
        }

        if (!quotaRes.ok) {
          const data = await quotaRes.json().catch(() => ({}));
          throw new Error(data.error ?? "Gagal cek kuota.");
        }
      } catch (err: any) {
        console.error("Quota check error:", err);
        setError(err?.message ?? "Gagal cek kuota.");
        return;
      }
    }

    // Lanjut proses AI
    setStage("processing");
    setError(null);

    const startTime = performance.now();
    const inputBytes = fileSize || estimateBytesFromDataUrl(inputUrl);
    const inputFormat = fileName.split(".").pop()?.toLowerCase() ?? "unknown";

    try {
      const segmenter = await loadModel(selectedModelId);
      const result = await processHighResCutout(segmenter, inputUrl);
      const processingMs = Math.round(performance.now() - startTime);

      if (outputUrl) URL.revokeObjectURL(outputUrl);
      setOutputUrl(result.url);
      setStage("done");
      setProgress("");

      logToServer({
        modelName: selectedModelId,
        status: "COMPLETED",
        inputBytes,
        outputBytes: result.outputBytes,
        imageWidth: result.width,
        imageHeight: result.height,
        processingMs,
        inputFormat,
        outputFormat: "png",
      });
    } catch (err: any) {
      console.error("Process error:", err);
      const processingMs = Math.round(performance.now() - startTime);

      setError(err?.message ?? "Gagal memproses gambar.");
      setStage("error");

      logToServer({
        modelName: selectedModelId,
        status: "FAILED",
        inputBytes,
        processingMs,
        errorCode: err?.name ?? "UNKNOWN",
        inputFormat,
        outputFormat: "png",
      });
    }
  }

  function download() {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = fileName.replace(/\.[^.]+$/, "") + "-gosokbg.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function resetOutput() {
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    setOutputUrl(null);
    setStage("idle");
    setError(null);
    setProgress("");
  }

  function resetUpload() {
    sessionStorage.removeItem("gosokbg:upload");
    if (outputUrl) URL.revokeObjectURL(outputUrl);
    router.push("/editor");
  }

  const isProcessing = stage === "processing";
  const selectedModel =
    models.find((m) => m.id === selectedModelId) ?? models[0];
  const selectedConfig = selectedModel
    ? getModelConfig(selectedModel.id)
    : null;

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header: Model picker + aksi */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          {/* Model picker */}
          <div className="relative w-full lg:w-80" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowModelMenu((v) => !v)}
              disabled={isProcessing}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors",
                "hover:border-sky-400",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:border-gray-800 dark:bg-gray-900"
              )}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                    {selectedModel?.name ?? "Pilih Model"}
                  </span>
                  {selectedConfig && (
                    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {selectedConfig.size}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                  {selectedConfig?.tagline ?? selectedModel?.description ?? ""}
                </p>
              </div>
              <ChevronDown
                className={cn(
                  "size-4 shrink-0 text-gray-400 transition-transform",
                  showModelMenu && "rotate-180"
                )}
              />
            </button>

            {showModelMenu && (
              <div className="absolute left-0 top-full z-40 mt-1.5 w-full min-w-[20rem] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950">
                <div className="border-b border-gray-100 px-4 py-2.5 dark:border-gray-800">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Pilih Model AI
                  </p>
                </div>
                <div className="max-h-[24rem] overflow-y-auto py-1">
                  {models.map((m) => {
                    const config = getModelConfig(m.id);
                    const isActive = m.id === selectedModelId;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSelectedModelId(m.id);
                          setShowModelMenu(false);
                          if (outputUrl) URL.revokeObjectURL(outputUrl);
                          setOutputUrl(null);
                          setStage("idle");
                        }}
                        className={cn(
                          "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                          "hover:bg-sky-50 dark:hover:bg-sky-950/40",
                          isActive && "bg-sky-50 dark:bg-sky-950/40"
                        )}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                              {m.name}
                            </span>
                            <span className="shrink-0 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                              {config.size}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                            {config.tagline}
                          </p>
                          <p className="mt-1 text-[11px] leading-snug text-gray-500 dark:text-gray-500">
                            {m.description || config.recommendedFor}
                          </p>
                        </div>
                        {isActive && (
                          <div className="mt-1.5 size-2 shrink-0 rounded-full bg-sky-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-gray-100 px-4 py-2.5 dark:border-gray-800">
                  <p className="text-[10px] leading-relaxed text-gray-400 dark:text-gray-500">
                    Model diunduh sekali, lalu di-cache di browser. Kunjungan
                    berikutnya lebih cepat.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Aksi */}
          <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto">
            {inputUrl && !outputUrl && (
              <Button
                onClick={process}
                disabled={isProcessing}
                className="h-11 flex-1 rounded-lg bg-sky-500 px-5 text-sm font-medium text-white hover:bg-sky-600 disabled:opacity-50 sm:flex-none"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 size-4" />
                    Hapus Background
                  </>
                )}
              </Button>
            )}

            {outputUrl && (
              <>
                <Button
                  onClick={download}
                  className="h-11 flex-1 rounded-lg bg-sky-500 px-5 text-sm font-medium text-white hover:bg-sky-600 sm:flex-none"
                >
                  <Download className="mr-2 size-4" />
                  Download PNG
                </Button>
                <Button
                  variant="outline"
                  onClick={resetOutput}
                  className="h-11 flex-1 rounded-lg border-gray-200 px-5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:flex-none dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  <RotateCcw className="mr-2 size-4" />
                  Proses Ulang
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Progress */}
        {isProcessing && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-400">
            <Loader2 className="size-4 shrink-0 animate-spin" />
            <span>{progress || "Memproses..."}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Dua panel: Sebelum & Sesudah */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Panel: Sebelum */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Sebelum
              </span>
              <span className="max-w-[60%] truncate text-[10px] text-gray-400">
                {fileName || ""}
              </span>
            </div>
            <div
              className="relative h-64 w-full sm:h-72 md:h-80"
              style={{
                backgroundImage:
                  "conic-gradient(at 50% 50%, #e5e7eb 25%, #ffffff 0 50%, #e5e7eb 0 75%, #ffffff 0)",
                backgroundSize: "24px 24px",
              }}
            >
              {inputUrl ? (
                <img
                  src={inputUrl}
                  alt="Input"
                  className="size-full object-contain"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-sm text-gray-400">
                  Belum ada gambar
                </div>
              )}
            </div>
          </div>

          {/* Panel: Sesudah */}
          <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-800">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Sesudah
              </span>
              {outputUrl && (
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                  Selesai
                </span>
              )}
            </div>
            <div
              className="relative h-64 w-full overflow-hidden sm:h-72 md:h-80"
              style={{
                backgroundImage:
                  "conic-gradient(at 50% 50%, #e5e7eb 25%, #ffffff 0 50%, #e5e7eb 0 75%, #ffffff 0)",
                backgroundSize: "24px 24px",
              }}
            >
              {outputUrl ? (
                <>
                  {/* Hasil akhir (transparan) */}
                  <img
                    src={outputUrl}
                    alt="Output"
                    className="size-full object-contain"
                  />

                  {/* Gambar asli dengan background: menghilang ke kiri 1x,
                      menyisakan objek di atas checkerboard */}
                  {inputUrl && (
                    <img
                      key={outputUrl}
                      src={inputUrl}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-10 size-full object-contain"
                      style={{
                        animation:
                          "gosokbgWipeLeft 1.2s ease-in-out 0.4s 1 forwards",
                      }}
                    />
                  )}
                </>
              ) : (
                <div className="flex size-full items-center justify-center px-4 text-center text-sm text-gray-400">
                  Hasil akan muncul di sini
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 pb-8">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition-colors hover:border-sky-400 hover:text-sky-500 disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
            aria-label="Ganti gambar"
          >
            <Plus className="size-4" />
            Ganti Gambar
          </button>
          {inputUrl && (
            <button
              type="button"
              onClick={resetUpload}
              disabled={isProcessing}
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:bg-gray-900 dark:hover:bg-red-950/30"
            >
              <Trash2 className="size-4" />
              Hapus
            </button>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => {
            sessionStorage.setItem(
              "gosokbg:upload",
              JSON.stringify({
                name: file.name,
                type: file.type,
                size: file.size,
                dataUrl: reader.result,
                at: Date.now(),
              })
            );
            if (outputUrl) URL.revokeObjectURL(outputUrl);
            setOutputUrl(null);
            setInputUrl(reader.result as string);
            setFileName(file.name);
            setFileSize(file.size);
            setStage("idle");
            setError(null);
          };
          reader.readAsDataURL(file);
        }}
      />

      {/* Animasi: gambar asli menyusut ke kiri sampai hilang (sekali jalan) */}
      <style jsx global>{`
        @keyframes gosokbgWipeLeft {
          0% {
            clip-path: inset(0 0 0 0);
          }
          100% {
            clip-path: inset(0 100% 0 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          img[style*="gosokbgWipeLeft"] {
            animation: none !important;
            clip-path: inset(0 100% 0 0);
          }
        }
      `}</style>
    </div>
  );
}