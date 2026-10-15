import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "CLI Tool",
  description:
    "Batch-edit gambar dalam hitungan detik langsung dari terminal.",
};

export default function CliPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Command Line Interface"
        description="Otomasi penghapusan background untuk ribuan gambar melalui perintah terminal sederhana."
        downloadLabel="Lihat di GitHub"
        downloadUrl="https://github.com/"
        sectionTitle="Batch-edit dalam hitungan detik"
        features={[
          "Proses seluruh folder dengan satu perintah",
          "Dukungan pipe dan scripting shell",
          "Cross-platform: Linux, macOS, Windows",
          "Konfigurasi via file .env atau flag CLI",
          "Cocok untuk pipeline CI/CD dan server",
        ]}
        screenshot="/images/plugins/Cli.png"
        screenshotAlt="Contoh penggunaan CLI"
      />
    </main>
  );
}