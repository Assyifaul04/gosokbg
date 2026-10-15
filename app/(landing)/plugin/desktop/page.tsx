import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Desktop App",
  description:
    "Edit ribuan gambar sekaligus dengan aplikasi desktop untuk Windows dan macOS.",
};

export default function DesktopAppPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Desktop app"
        description="Proses batch ribuan gambar dalam satu kali jalan. Cocok untuk fotografer, agensi, dan tim e-commerce."
        downloadLabel="Download untuk desktop"
        downloadUrl="https://www.microsoft.com/windows"
        sectionTitle="Edit ribuan gambar sekaligus"
        features={[
          "Batch processing untuk folder besar",
          "Berjalan offline tanpa koneksi internet",
          "Dukungan GPU untuk pemrosesan lebih cepat",
          "Preset output otomatis (PNG transparan, JPG, WEBP)",
          "Integrasi langsung dengan folder Google Drive",
        ]}
        screenshot="/images/plugins/Desktop.png"
        screenshotAlt="Tampilan aplikasi desktop"
      />
    </main>
  );
}