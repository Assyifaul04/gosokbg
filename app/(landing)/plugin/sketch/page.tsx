import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Sketch Plugin",
  description:
    "Tingkatkan alur kerja desain Sketch Anda dengan penghapusan background otomatis.",
};

export default function SketchPluginPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Sketch plugin"
        description="Hapus background aset desain langsung di dalam Sketch — tanpa perlu membuka aplikasi lain."
        downloadUrl="https://www.sketch.com/"
        sectionTitle="Desain lebih cepat, hasil lebih bersih"
        features={[
          "Akses dari menu Plugins di Sketch",
          "Hasil otomatis masuk sebagai layer baru",
          "Mendukung banyak artboard sekaligus",
          "Cocok untuk aset ikon, ilustrasi, dan mockup",
          "Ringan dan tidak mengganggu performa Sketch",
        ]}
        screenshot="/images/plugins/Sketch.png"
        screenshotAlt="Tampilan plugin Sketch"
      />
    </main>
  );
}