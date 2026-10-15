import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

import { SessionProvider } from "@/components/session/provider";
import { ThemeProvider } from "@/components/session/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://gosokbg.vercel.app"
  ),

  title: {
    default: "GosokBG — Hapus Background Foto Gratis Online",
    template: "%s | GosokBG",
  },

  description:
    "Hapus background foto secara otomatis dan gratis dengan GosokBG. Gunakan AI untuk membuat gambar PNG transparan, menghapus latar belakang foto produk, dan mengedit gambar langsung di browser.",

  applicationName: "GosokBG",
  category: "photo editing",

  keywords: [
    // Keyword pendek (broad reach)
    "hapus background",
    "remove bg",
    "remove background",
    "background remover",
    "penghapus background",
    "hapus bg",
    "edit foto",
    "png transparan",

    // Keyword menengah
    "hapus background foto",
    "hapus background online",
    "hapus background gratis",
    "hapus latar belakang foto",
    "penghapus background foto",
    "remove background online",
    "background remover gratis",
    "AI background remover",
    "transparent background maker",

    // Long-tail (spesifik, kompetisi rendah)
    "hapus background foto produk",
    "cara hapus background foto online",
    "hapus background foto gratis tanpa aplikasi",
    "hapus latar belakang foto otomatis",
    "aplikasi hapus background di browser",
    "hapus background otomatis dengan AI",
    "buat PNG transparan online",
    "edit foto background transparan",
    "hapus background foto tanpa daftar",
    "foto tanpa background",
    "gambar PNG transparan",
    "edit foto online gratis",

    // Brand
    "GosokBG",
    "gosokbg",
  ],

  openGraph: {
    title: "GosokBG — Hapus Background Foto Gratis Online",
    description:
      "Hapus background foto otomatis dengan AI. Buat gambar PNG transparan dan unduh hasilnya langsung dari browser.",
    type: "website",
    locale: "id_ID",
    siteName: "GosokBG",
  },

  twitter: {
    card: "summary_large_image",
    title: "GosokBG — Hapus Background Foto Gratis Online",
    description:
      "Hapus background foto gratis secara online dengan AI dan unduh gambar PNG transparan menggunakan GosokBG.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  other: {
    "google-adsense-account": "ca-pub-2352891869256632",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2352891869256632"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}