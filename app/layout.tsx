//app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

import { SessionProvider } from "@/components/session/provider";
import { ThemeProvider } from "@/components/session/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GosokBG — Hapus Background Foto Otomatis",
    template: "%s | GosokBG",
  },
  description:
    "Hapus background foto otomatis langsung di browser. Hasil PNG transparan, gratis 5 proses per hari, tanpa perlu daftar.",
  keywords: [
    "hapus background",
    "remove bg",
    "png transparan",
    "edit foto online",
    "gosokbg",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    title: "GosokBG — Hapus Background Foto Otomatis",
    description:
      "Hapus background foto otomatis langsung di browser. Hasil PNG transparan, gratis 5 proses per hari.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "GosokBG — Hapus Background Foto Otomatis",
    description:
      "Hapus background foto otomatis langsung di browser. Hasil PNG transparan, gratis.",
  },
  other: {
    "google-adsense-account": "ca-pub-2352891869256632",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2352891869256632"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}