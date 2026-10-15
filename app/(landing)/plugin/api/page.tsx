import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Web API",
  description:
    "Pelajari API penghapus background untuk integrasi ke aplikasi Anda sendiri.",
};

export default function ApiPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Web API"
        description="Integrasikan penghapusan background ke aplikasi, situs, atau layanan Anda melalui REST API sederhana."
        downloadLabel="Lihat dokumentasi API"
        downloadUrl="https://developer.mozilla.org/"
        sectionTitle="Integrasi untuk developer"
        features={[
          "Endpoint REST sederhana dengan autentikasi API Key",
          "Dukungan JSON dan multipart/form-data",
          "Kuota gratis untuk pengembangan dan testing",
          "SDK tersedia untuk JavaScript, Python, dan PHP",
          "Webhook untuk notifikasi hasil asinkron",
        ]}
        screenshot="/images/plugins/Api.png"
        screenshotAlt="Contoh dokumentasi API"
      />
    </main>
  );
}