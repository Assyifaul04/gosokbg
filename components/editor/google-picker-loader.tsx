"use client";

import Script from "next/script";

export function GooglePickerLoader() {
  return (
    <Script
      src="https://apis.google.com/js/api.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && (window as any).gapi) {
          (window as any).gapi.load("picker", () => {
            console.log("[GosokBG] Google Picker siap");
          });
        }
      }}
    />
  );
}