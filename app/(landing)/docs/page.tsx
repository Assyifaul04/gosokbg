import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { DocsContent } from "@/components/docs/docs-content";

export const metadata = {
  title: "Dokumentasi — gosokbg",
  description:
    "Panduan penggunaan gosokbg: cara menghapus background foto, memilih model AI, dan menyimpan hasil ke Google Drive.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <DocsSidebar />
        <DocsContent />
      </div>
    </div>
  );
}