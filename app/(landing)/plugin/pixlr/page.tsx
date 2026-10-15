import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Pixlr Editor",
  description:
    "Edit lanjutan di browser tanpa instalasi, lengkap dengan penghapus background AI.",
};

export default function PixlrPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Pixlr editor"
        description="Editor foto berbasis browser dengan alat lengkap — penghapusan background, layer, masker, dan filter."
        downloadLabel="Buka Pixlr"
        downloadUrl="https://pixlr.com/"
        sectionTitle="Editor lengkap di browser"
        features={[
          "Berjalan langsung di browser tanpa instalasi",
          "Dukungan layer, masker, dan blending mode",
          "Penghapus background AI terintegrasi",
          "Template desain siap pakai",
          "Gratis dengan opsi upgrade premium",
        ]}
        screenshot="/images/plugins/Pixlr.png"
        screenshotAlt="Tampilan Pixlr editor"
      />
    </main>
  );
}