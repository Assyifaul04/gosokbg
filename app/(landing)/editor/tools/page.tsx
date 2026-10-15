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

export default function EditorToolsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] items-center justify-center text-sm text-gray-500">
          Memuat editor...
        </div>
      }
    >
      <ToolsContent />
    </Suspense>
  );
}