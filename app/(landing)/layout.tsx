import { ThemeProvider } from "@/components/session/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { MaintenancePage } from "@/components/layout/maintenance-page";
import { GooglePickerLoader } from "@/components/editor/google-picker-loader";
import { AdsterraBanner } from "@/components/ads/adsterra-banner";
import { isMaintenanceMode } from "@/lib/settings";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const maintenance = await isMaintenanceMode();

  if (maintenance) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="gosokbg-landing-theme"
      >
        <MaintenancePage />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="gosokbg-landing-theme"
    >
      <GooglePickerLoader />

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        {/* Iklan Adsterra muncul di sini jika user setuju */}
        <AdsterraBanner />

        <Footer />
      </div>

      <Toaster />
    </ThemeProvider>
  );
}