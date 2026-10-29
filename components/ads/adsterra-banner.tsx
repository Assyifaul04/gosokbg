"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "gosokbg-cookie-consent";

export function AdsterraBanner() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Cek consent saat pertama kali load
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

    // Dengarkan event jika user baru saja mengklik "Terima Semua"
    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      setHasConsent(customEvent.detail?.value === "all");
    };

    window.addEventListener("gosokbg:consent-changed", handleConsentChange);
    return () => {
      window.removeEventListener("gosokbg:consent-changed", handleConsentChange);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/* 1. Adsterra Native Banner */}
      <div className="my-8 flex justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div id="container-1d5e88f2e29afa44f3ffa7be1a66b6e5" className="w-full" />
        <Script
          id="adsterra-native"
          async
          data-cfasync="false"
          src="https://bauval.org/21/1d5e88f2e29afa44f3ffa7be1a66b6e5"
          strategy="afterInteractive"
        />
      </div>

      {/* 2. Adsterra Iframe Banner (320x50) */}
      <div className="my-6 flex justify-center">
        <Script id="adsterra-options" strategy="afterInteractive">
          {`atOptions = { 'key' : 'e2ba86b9528f4499590c12b8feaae79f', 'format' : 'iframe', 'height' : 50, 'width' : 320, 'params' : {} };`}
        </Script>
        <Script
          id="adsterra-invoke"
          src="https://bauval.org/22/e2ba86b9528f4499590c12b8feaae79f"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}