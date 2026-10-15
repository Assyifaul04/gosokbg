import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Photoshop Plugin",
  description:
    "Potongan presisi untuk rambut, bulu, dan gambar kompleks — langsung di dalam Photoshop.",
};

export default function PhotoshopPluginPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Photoshop plugin"
        description="Potongan presisi untuk rambut, bulu, dan gambar kompleks — langsung di dalam Photoshop tanpa berpindah aplikasi."
        downloadUrl="https://www.adobe.com/products/photoshop.html"
        sectionTitle="Hapus background dengan satu klik"
        features={[
          "Hemat waktu edit dengan pengeditan gambar otomatis",
          "Hasilkan bayangan 3D otomatis dengan satu klik",
          "Edit bebas dengan penghapusan background berlapis",
          "Tanpa berpindah aplikasi, langsung di Photoshop",
          "Dukungan masker dan alpha channel penuh",
        ]}
        screenshot="/images/plugins/Photoshop.png"
        screenshotAlt="Tampilan plugin Photoshop"
      />
    </main>
  );
}