"use client";

import Image from "next/image";

import { UploadHero } from "@/components/editor/upload-hero";
import { ModelPreloader } from "@/components/editor/model-preloader";
import { SamplePickers } from "@/components/editor/sample-pickers";

export default function EditorPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <ModelPreloader modelId="modnet" />

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        {/* KIRI */}
        <div className="flex flex-col items-center md:items-start">
          {/* Gambar + Heading rapat */}
          <div className="flex flex-col items-center md:items-start">
            {/* Container: background biru bergeser ke kiri 1x, lalu tampak transparan */}
            <div className="relative h-56 w-56 overflow-hidden rounded-3xl shadow-xl sm:h-64 sm:w-64 md:h-72 md:w-72 bg-gray-100 dark:bg-gray-900 border border-sky-100 dark:border-sky-900/50">
              {/* 1. Base: Pattern Checkerboard (Simulasi Transparansi PNG) */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%),linear-gradient(-45deg,#e5e7eb_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e5e7eb_75%),linear-gradient(-45deg,transparent_75%,#e5e7eb_75%)] bg-[size:16px_16px] bg-[position:0_0,0_8px,8px_-8px,-8px_0px] dark:bg-[linear-gradient(45deg,#1f2937_25%,transparent_25%),linear-gradient(-45deg,#1f2937_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f2937_75%),linear-gradient(-45deg,transparent_75%,#1f2937_75%)]" />

              {/* 2. Panel biru: tampil dulu, geser ke kiri sekali, lalu tetap hilang */}
              <div
                className="absolute inset-0 z-10 bg-[#00A9F4]"
                style={{
                  animation: "slideLeftBg 1.2s ease-in-out 0.8s 1 forwards",
                }}
              />

              {/* 3. Foto Utama (Orang) */}
              <Image
                src="/images/hero-person.png"
                alt="Hero Person"
                fill
                className="relative z-20 object-contain"
                priority
                unoptimized
              />
            </div>

            <h1 className="mt-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-left dark:text-white">
              Gosok background
              <br />
              dalam <span className="text-sky-500">sekejap</span>
            </h1>
          </div>

          <p className="mt-4 max-w-md text-center text-base text-gray-600 md:text-left dark:text-gray-400">
            Unggah foto, biarkan gosokbg memisahkan objek dari latar belakang.
            Hasilnya PNG transparan siap pakai.
          </p>
        </div>

        {/* KANAN */}
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border-2 border-dashed border-sky-200 bg-gradient-to-br from-sky-50/50 to-white p-8 shadow-sm sm:p-12 dark:border-sky-900/40 dark:from-sky-950/20 dark:to-gray-950">
            <UploadHero />
          </div>

          <SamplePickers />

          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Dengan mengunggah gambar, Anda menyetujui{" "}
            <a
              href="/terms"
              className="font-medium text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
            >
              Ketentuan Layanan
            </a>{" "}
            dan{" "}
            <a
              href="/privacy"
              className="font-medium text-sky-600 underline-offset-4 hover:underline dark:text-sky-400"
            >
              Kebijakan Privasi
            </a>{" "}
            gosokbg.
          </p>
        </div>
      </div>

      {/* CSS Animasi: geser ke kiri satu kali */}
      <style jsx global>{`
        @keyframes slideLeftBg {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [style*="slideLeftBg"] {
            animation: none !important;
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}