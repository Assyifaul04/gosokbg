import { SupportContent } from "@/components/support/SupportContent";

export const metadata = {
  title: "Bantuan & Dukungan — gosokbg",
  description:
    "Laporkan bug atau kirim pertanyaan. Semua laporan tercatat dan ditindaklanjuti oleh tim gosokbg.",
};

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <SupportContent />
    </main>
  );
}