import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Zapier & Make",
  description:
    "Otomasi alur kerja lintas aplikasi dengan Zapier dan Make.",
};

export default function AutomationPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Zapier & Make"
        description="Hubungkan penghapus background dengan ribuan aplikasi lain melalui otomasi tanpa kode."
        downloadLabel="Jelajahi automasi"
        downloadUrl="https://zapier.com/"
        sectionTitle="Otomasi tanpa menulis kode"
        features={[
          "Trigger otomatis saat ada gambar baru di Drive atau Dropbox",
          "Kirim hasil ke Slack, Notion, atau email",
          "Dukungan kondisi dan filter lanjutan",
          "Ribuan aplikasi terintegrasi",
          "Cocok untuk tim marketing dan operasional",
        ]}
        screenshot="/images/plugins/Zapier.png"
        screenshotAlt="Tampilan automasi Zapier & Make"
      />
    </main>
  );
}