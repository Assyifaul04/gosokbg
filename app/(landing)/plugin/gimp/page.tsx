import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "GIMP Plugin",
  description:
    "Hapus background langsung dengan satu klik di dalam GIMP, editor gambar open source.",
};

export default function GimpPluginPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="GIMP plugin"
        description="Tambahkan kemampuan penghapusan background AI ke GIMP tanpa perlu berpindah tools."
        downloadUrl="https://www.gimp.org/downloads/"
        sectionTitle="Satu klik, background hilang"
        features={[
          "Terintegrasi langsung ke menu GIMP",
          "Hasil masuk sebagai layer baru dengan alpha channel",
          "Dukungan GIMP 2.10 dan versi lebih baru",
          "Gratis dan open source",
          "Ringan, tidak membebani memori",
        ]}
        screenshot="/images/plugins/Gimp.png"
        screenshotAlt="Tampilan plugin GIMP"
      />
    </main>
  );
}