import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "PowerPoint Plugin",
  description:
    "Hapus background gambar sekali klik langsung di dalam slide PowerPoint.",
};

export default function PowerpointPluginPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="PowerPoint plugin"
        description="Buat slide presentasi lebih profesional dengan gambar tanpa background — tanpa keluar dari PowerPoint."
        downloadUrl="https://www.microsoft.com/microsoft-365/powerpoint"
        sectionTitle="Presentasi lebih bersih"
        features={[
          "Hapus background gambar langsung di slide",
          "Hasil otomatis menggantikan gambar di slide",
          "Bekerja dengan PowerPoint 2016 ke atas",
          "Cocok untuk slide produk, tim, dan portofolio",
          "Tidak perlu instalasi tambahan",
        ]}
        screenshot="/images/plugins/Powerpoint.png"
        screenshotAlt="Tampilan plugin PowerPoint"
      />
    </main>
  );
}