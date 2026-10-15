"use client";

import { useEffect } from "react";
import { detectBestDevice } from "@/lib/ai-device";
import { getModelConfig } from "@/lib/model-config";

export function ModelPreloader({ modelId = "ben2" }: { modelId?: string }) {
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const { pipeline, env } = await import("@huggingface/transformers");
        env.allowLocalModels = false;
        env.useBrowserCache = true;

        const config = getModelConfig(modelId);
        const device = await detectBestDevice();

        if (cancelled) return;

        await pipeline("background-removal", config.hfModelId, {
          dtype: config.dtype,
          device,
        });

        console.log(
          `[GosokBG] Model preloaded (${device}):`,
          modelId,
          config.hfModelId
        );
      } catch (e) {
        console.warn("[GosokBG] Preload gagal:", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [modelId]);

  return null;
}