export type ModelConfig = {
  id: string;
  name: string;
  hfModelId: string;
  dtype: "fp32" | "fp16" | "q8" | "int8" | "uint8" | "q4";
  size: string;
  /** Deskripsi singkat untuk dropdown — 1 baris, maks ~60 karakter */
  tagline: string;
  /** Kegunaan detail — muncul di tooltip/info */
  description: string;
  /** Tingkat kesulitan: ringan / sedang / berat */
  weight: "ringan" | "sedang" | "berat";
  /** Estimasi waktu proses */
  speed: string;
  /** Rekomendasi penggunaan */
  recommendedFor: string;
};

export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  modnet: {
    id: "modnet",
    name: "MODNet",
    hfModelId: "Xenova/modnet",
    dtype: "q8",
    size: "~25 MB",
    tagline: "Cepat & ringan",
    description:
      "Cocok untuk foto portrait dan selfie dengan latar belakang alami. Waktu proses paling cepat, tetapi kurang akurat untuk foto formal atau latar belakang solid.",
    weight: "ringan",
    speed: "~1 detik",
    recommendedFor: "Portrait, selfie, foto candid",
  },
  birefnet: {
    id: "birefnet",
    name: "BiRefNet Lite",
    hfModelId: "studioludens/birefnet-lite-512",
    dtype: "fp16",
    size: "~94 MB",
    note: "",
    tagline: "Kualitas tepi terbaik",
    description:
      "Model dengan akurasi tepi paling tinggi. Sangat baik untuk ilustrasi, rambut halus, dan objek kompleks. Membutuhkan RAM lebih besar dan waktu proses lebih lama.",
    weight: "sedang",
    speed: "~3 detik",
    recommendedFor: "Ilustrasi, foto dengan rambut detail, produk",
  },
  ben2: {
    id: "ben2",
    name: "BEN2",
    hfModelId: "onnx-community/BEN2-ONNX",
    dtype: "fp16",
    size: "~235 MB",
    tagline: "Kualitas profesional",
    description:
      "Model terbaru dari Hugging Face dengan hasil paling halus. Cocok untuk semua jenis foto termasuk foto formal. Membutuhkan koneksi cepat saat unduhan pertama.",
    weight: "berat",
    speed: "~5 detik",
    recommendedFor: "Foto formal, produk, semua jenis objek",
  },
} as Record<string, ModelConfig>;

export const FALLBACK_MODEL_ID = "Xenova/modnet";
export const FALLBACK_DTYPE = "q8" as const;

export function getModelConfig(id: string): ModelConfig {
  return (
    MODEL_CONFIGS[id] ?? {
      id,
      name: id,
      hfModelId: FALLBACK_MODEL_ID,
      dtype: FALLBACK_DTYPE,
      size: "~25 MB",
      tagline: "Model default",
      description: "Model default untuk fallback.",
      weight: "ringan",
      speed: "~1 detik",
      recommendedFor: "Semua jenis foto",
    }
  );
}