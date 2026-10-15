import { ThemeProvider } from "@/components/session/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { MaintenancePage } from "@/components/layout/maintenance-page";
import { GooglePickerLoader } from "@/components/editor/google-picker-loader";
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
      {/* Script Google Picker — client component */}
      <GooglePickerLoader />

      <div className="flex min-h-svh flex-col bg-white dark:bg-black">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
}