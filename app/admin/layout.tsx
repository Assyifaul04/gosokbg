import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AppSidebar } from "@/components/admin/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/session/theme-provider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin/dashboard");
  }

  if ((session.user as any).role !== "ADMIN") {
    redirect("/");
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="gosokbg-admin-theme"
    >
      <SidebarProvider>
        <AppSidebar user={session.user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 px-4 dark:border-gray-800">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Admin Panel
            </h1>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-6">{children}</main>
        </SidebarInset>
        <Toaster />
      </SidebarProvider>
    </ThemeProvider>
  );
}