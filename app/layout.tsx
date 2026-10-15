import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { SessionProvider } from "@/components/session/provider";
import { ThemeProvider } from "@/components/session/theme-provider";
import { CookieConsent } from "@/components/cookie-consent";

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

const siteUrl = "https://gosokbg.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "GosokBG — Hapus Background Foto Gratis Online",
    template: "%s | GosokBG",
  },

  description:
    "Hapus background foto secara otomatis dan gratis dengan GosokBG. Gunakan AI untuk membuat gambar PNG transparan, menghapus latar belakang foto produk, dan mengedit gambar langsung di browser.",

  applicationName: "GosokBG",
  category: "photo editing",

  keywords: [
    "hapus background",
    "remove bg",
    "remove background",
    "background remover",
    "penghapus background",
    "hapus bg",
    "edit foto",
    "png transparan",
    "hapus background foto",
    "hapus background online",
    "hapus background gratis",
    "hapus latar belakang foto",
    "penghapus background foto",
    "remove background online",
    "background remover gratis",
    "AI background remover",
    "transparent background maker",
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
    url: siteUrl,
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

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GosokBG",
  alternateName: ["GosokBG", "gosokbg", "gosokbg.vercel.app"],
  url: `${siteUrl}/`,
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
      <head>
        {/* Script verifikasi AdSense — untuk deteksi bot Google.
            Tidak memuat iklan, tidak memasang cookie iklan. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2352891869256632"
          crossOrigin="anonymous"
        />
      </head>

      <body className="min-h-screen bg-background font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
          }}
        />

        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            {/* Banner consent + loader AdSense kondisional */}
            <CookieConsent />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}