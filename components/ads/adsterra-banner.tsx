"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "gosokbg-cookie-consent";

export function AdsterraBanner() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // 1. Cek status cookie saat pertama kali halaman dimuat
    const checkConsent = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.value === "all") {
            setHasConsent(true);
            return;
          }
        } catch {}
      }
      setHasConsent(false);
    };

    checkConsent();

    // 2. Dengarkan event jika user baru saja mengklik "Terima Semua"
    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setHasConsent(customEvent.detail?.value === "all");
    };

    window.addEventListener("gosokbg:consent-changed", handleConsentChange);
    return () => {
      window.removeEventListener("gosokbg:consent-changed", handleConsentChange);
    };
  }, []);

  // Jangan tampilkan iklan jika belum setuju
  if (!hasConsent) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* ========================================================
          1. ADSTERRA NATIVE BANNER
          ======================================================== */}
      <div className="my-8 flex w-full justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div id="container-1d5e88f2e29afa44f3ffa7be1a66b6e5" className="w-full flex justify-center" />
        
        {/* 
          TAMENG IKLAN NEGATIF:
          Ganti "18,23,45" dengan ID tipe iklan yang ingin diblokir dari Adsterra.
          (Tanyakan ke support Adsterra untuk ID spesifik seperti iklan judi/dewasa)
        */}
        <Script
          id="adsterra-native"
          async
          data-cfasync="false"
          src="https://bauval.org/21/1d5e88f2e29afa44f3ffa7be1a66b6e5"
          data-block-ad-types="18,23,45" 
          strategy="afterInteractive"
        />
      </div>

      {/* ========================================================
          2. ADSTERRA IFRAME BANNER (320x50)
          ======================================================== */}
      <div className="my-6 flex justify-center">
        {/* Script konfigurasi atOptions */}
        <Script id="adsterra-options" strategy="afterInteractive">
          {`atOptions = {
            'key' : 'e2ba86b9528f4499590c12b8feaae79f',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };`}
        </Script>
        
        {/* Script pemanggil iklan dengan tameng iklan negatif */}
        <Script
          id="adsterra-invoke"
          src="https://bauval.org/22/e2ba86b9528f4499590c12b8feaae79f"
          data-block-ad-types="18,23,45"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}