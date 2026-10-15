import { PluginsGrid } from "@/components/plugin/PluginsGrid";

export const metadata = {
  title: "Plugin & Integrasi — gosokbg",
  description:
    "Hubungkan gosokbg dengan tools yang Anda gunakan — desain, developer, dan e-commerce.",
};

export default function PluginPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginsGrid />
    </main>
  );
}