import { Suspense } from "react";
import { connection } from "next/server";
import { getAIModels, getActiveModel } from "@/lib/settings";
import { EditorToolsClient } from "@/components/editor/editor-tools-client";

async function ToolsContent() {
  await connection();

  const [models, activeModel] = await Promise.all([
    getAIModels(),
    getActiveModel(),
  ]);

  const modelList =
    models.length > 0
      ? models
      : [
          {
            id: "modnet",
            name: "MODNet",
            description: "Foto manusia & portrait",
            enabled: true,
          },
        ];

  const active =
    modelList.find((m) => m.id === activeModel)?.id ?? modelList[0].id;

  return <EditorToolsClient models={modelList} activeModelId={active} />;
}

// Kerangka loading: meniru layout editor supaya halaman tidak "melompat"
function EditorSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-gray-50 dark:bg-gray-950"
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Header: pemilih model + tombol aksi */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="h-[62px] w-full animate-pulse rounded-lg border border-gray-200 bg-white lg:w-80 dark:border-gray-800 dark:bg-gray-900" />
          <div className="h-11 w-full animate-pulse rounded-lg bg-sky-200/70 lg:w-48 dark:bg-sky-900/40" />
        </div>

        {/* Dua panel gambar */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center border-b border-gray-100 px-4 py-3 dark:border-gray-800">
                <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="h-64 w-full animate-pulse bg-gray-100 sm:h-72 md:h-80 dark:bg-gray-800/60" />
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Memuat editor...
        </p>
      </div>
    </div>
  );
}

export default function EditorToolsPage() {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <ToolsContent />
    </Suspense>
  );
}