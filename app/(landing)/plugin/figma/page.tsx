import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Figma Plugin",
  description:
    "Integrasikan penghapus background dengan Figma untuk alur kerja desain yang lebih cepat.",
};

export default function FigmaPluginPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Figma plugin"
        description="Hapus background langsung di dalam Figma — sempurna untuk desain UI, mockup produk, dan aset presentasi."
        downloadUrl="https://www.figma.com/community"
        sectionTitle="Alur kerja desain tanpa hambatan"
        features={[
          "Hapus background tanpa keluar dari Figma",
          "Hasil langsung menjadi layer baru di frame Anda",
          "Kompatibel dengan Figma Design dan FigJam",
          "Mendukung banyak seleksi sekaligus",
          "Bekerja dengan komponen dan variant",
        ]}
        screenshot="/images/plugins/Figma.png"
        screenshotAlt="Tampilan plugin Figma"
      />
    </main>
  );
}