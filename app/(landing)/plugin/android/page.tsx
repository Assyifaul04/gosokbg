import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Android App",
  description:
    "Edit gambar kapan saja di perangkat mobile dengan aplikasi Android.",
};

export default function AndroidAppPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Android app"
        description="Hapus background foto langsung dari ponsel — hasil PNG transparan siap dibagikan ke media sosial."
        downloadLabel="Download di Play Store"
        downloadUrl="https://play.google.com/store"
        sectionTitle="Edit gambar di mana saja"
        features={[
          "Antarmuka sederhana untuk penggunaan cepat",
          "Dukungan kamera langsung dan galeri",
          "Ekspor PNG transparan resolusi tinggi",
          "Berbagi langsung ke Instagram, WhatsApp, dan lainnya",
          "Tersedia gratis di Google Play",
        ]}
        screenshot="/images/plugins/Android.png"
        screenshotAlt="Tampilan aplikasi Android"
      />
    </main>
  );
}