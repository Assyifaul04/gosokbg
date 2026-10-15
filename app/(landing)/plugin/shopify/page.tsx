import { PluginDetail } from "@/components/plugin/PluginDetail";

export const metadata = {
  title: "Shopify Integration",
  description:
    "Buat gambar produk tanpa background yang siap menjual di toko Shopify Anda.",
};

export default function ShopifyPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <PluginDetail
        category="Plugins"
        title="Shopify integration"
        description="Otomatiskan penghapusan background untuk semua gambar produk di toko Shopify Anda."
        downloadLabel="Pasang di Shopify"
        downloadUrl="https://apps.shopify.com/"
        sectionTitle="Gambar produk yang menjual"
        features={[
          "Otomatis memproses gambar produk baru",
          "Sinkronisasi dengan katalog Shopify",
          "Hasil latar transparan atau putih bersih",
          "Hemat waktu tim e-commerce",
          "Dukungan varian produk dan koleksi",
        ]}
        screenshot="/images/plugins/Shopify.png"
        screenshotAlt="Tampilan integrasi Shopify"
      />
    </main>
  );
}