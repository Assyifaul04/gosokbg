"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "gosokbg-cookie-consent";
const CONSENT_VERSION = "2";
const ADSENSE_CLIENT = "ca-pub-2352891869256632";
const MONETAG_ZONE = "12087479";

type ConsentValue = "all" | "essential";

type StoredConsent = {
  value: ConsentValue;
  version: string;
  timestamp: string;
};

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setVisible(true);
      return;
    }

    try {
      const parsed: StoredConsent = JSON.parse(saved);

      if (
        parsed.version !== CONSENT_VERSION ||
        (parsed.value !== "all" && parsed.value !== "essential")
      ) {
        setVisible(true);
        return;
      }

      setConsent(parsed.value);
    } catch {
      setVisible(true);
    }
  }, []);

  const saveConsent = (value: ConsentValue) => {
    const payload: StoredConsent = {
      value,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setConsent(value);
    setVisible(false);

    window.dispatchEvent(
      new CustomEvent("gosokbg:consent-changed", {
        detail: { value },
      })
    );
  };

  const shouldLoadAds = consent === "all" && !visible;

  return (
    <>
      {shouldLoadAds && (
        <>
          <Script
            id="adsbygoogle-loader"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />

          <Script
            id="monetag-ad-tag"
            src="https://nap5k.com/tag.min.js"
            data-zone={MONETAG_ZONE}
            strategy="afterInteractive"
          />
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-label="Persetujuan cookie"
          aria-modal="false"
          className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-md"
        >
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/95 shadow-lg backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/95">
            <div
              aria-hidden="true"
              className="h-1 w-full bg-gradient-to-r from-blue-600 to-indigo-500"
            />

            <div className="p-5 sm:p-6">
              <h2 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                Bantu GosokBG tetap gratis
              </h2>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Kamu bisa memilih apakah iklan opsional boleh dimuat.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                GosokBG menggunakan penyimpanan esensial untuk menjalankan
                situs. Jika kamu menyetujui, Google AdSense dan Monetag
                dapat digunakan untuk menayangkan iklan. Penyedia iklan
                dapat menggunakan teknologi penyimpanan atau pemrosesan
                data sesuai kebijakan dan pengaturan yang berlaku.
              </p>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                <li>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Tetap gratis
                  </span>{" "}
                  — iklan membantu mendukung pengembangan GosokBG.
                </li>

                <li>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Privasi gambar
                  </span>{" "}
                  — baca Kebijakan Privasi untuk mengetahui cara kerja
                  pemrosesan gambar dan data situs.
                </li>

                <li>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Pilihan kamu
                  </span>{" "}
                  — pilih Terima Semua untuk mengizinkan iklan opsional,
                  atau Tolak Semua untuk menolaknya.
                </li>
              </ul>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => saveConsent("all")}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:from-blue-700 hover:to-indigo-600 hover:shadow-md dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-400 dark:hover:to-indigo-400"
                >
                  Terima Semua
                </button>

                <button
                  type="button"
                  onClick={() => saveConsent("essential")}
                  className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900"
                >
                  Tolak Semua
                </button>
              </div>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-400 dark:text-gray-500">
                Informasi selengkapnya tersedia di{" "}
                <Link
                  href="/cookies"
                  className="text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400"
                >
                  Kebijakan Cookie
                </Link>{" "}
                dan Kebijakan Privasi.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}