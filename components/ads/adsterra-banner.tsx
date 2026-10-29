"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const STORAGE_KEY = "gosokbg-cookie-consent";

export function AdsterraBanner() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
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
      {/* ========================================================
          1. ADSTERRA NATIVE BANNER (Otomatis Menyesuaikan Lebar)
          ======================================================== */}
      <div className="my-8 flex w-full justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div id="container-1d5e88f2e29afa44f3ffa7be1a66b6e5" className="w-full flex justify-center" />
        
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
          2. ADSTERRA IFRAME BANNER 468x60 (Tampil di Desktop/Tablet)
          ======================================================== */}
      <div className="my-6 hidden md:flex justify-center">
        <Script id="adsterra-options-468" strategy="afterInteractive">
          {`atOptions = {
            'key' : 'f7180847c500317af19a11a9b9c121c8',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };`}
        </Script>
        
        <Script
          id="adsterra-invoke-468"
          src="https://bauval.org/22/f7180847c500317af19a11a9b9c121c8"
          data-block-ad-types="18,23,45"
          strategy="afterInteractive"
        />
      </div>

      {/* ========================================================
          3. ADSTERRA IFRAME BANNER 320x50 (Tampil di Mobile/HP)
          ======================================================== */}
      <div className="my-6 flex md:hidden justify-center">
        <Script id="adsterra-options-320" strategy="afterInteractive">
          {`atOptions = {
            'key' : 'e2ba86b9528f4499590c12b8feaae79f',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };`}
        </Script>
        
        <Script
          id="adsterra-invoke-320"
          src="https://bauval.org/22/e2ba86b9528f4499590c12b8feaae79f"
          data-block-ad-types="18,23,45"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}