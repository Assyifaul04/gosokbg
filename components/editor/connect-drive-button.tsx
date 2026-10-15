"use client";

import { useState, useEffect, useCallback } from "react";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DriveIcon } from "@/components/icons/drive-icon";

declare global {
  interface Window {
    google?: any;
    gapi?: any;
  }
}

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
};

export function ConnectDriveButton({
  onFilePicked,
}: {
  onFilePicked?: (file: DriveFile) => void;
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [pickerLoading, setPickerLoading] = useState(false);

  const hasDriveScope = (session?.user as any)?.hasDriveScope as
    | boolean
    | undefined;

  useEffect(() => {
    if (hasDriveScope && !syncing) {
      setSyncing(true);
      fetch("/api/drive/grant", { method: "POST" })
        .catch(() => {})
        .finally(() => setSyncing(false));
    }
  }, [hasDriveScope, syncing]);

  async function handleConnect() {
    setLoading(true);
    try {
      await signIn(
        "google",
        { callbackUrl: "/editor" },
        {
          scope:
            "openid email profile https://www.googleapis.com/auth/drive.file",
          include_granted_scopes: "true",
        }
      );
    } catch {
      setLoading(false);
    }
  }

  const openPicker = useCallback(async () => {
    if (!window.google?.picker) {
      alert("Google Picker belum siap. Coba lagi sebentar.");
      return;
    }

    setPickerLoading(true);
    try {
      const res = await fetch("/api/drive/token");
      if (!res.ok) {
        throw new Error("Gagal ambil token Drive");
      }
      const { accessToken } = await res.json();

      if (!accessToken) {
        throw new Error("Access token kosong");
      }

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const appId = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;

      if (!apiKey || !appId) {
        throw new Error(
          "NEXT_PUBLIC_GOOGLE_API_KEY atau NEXT_PUBLIC_GOOGLE_APP_ID belum di-set"
        );
      }

      const picker = new window.google.picker.PickerBuilder()
        .addView(
          new window.google.picker.View(
            window.google.picker.ViewId.DOCS_IMAGES
          )
        )
        .setOAuthToken(accessToken)
        .setDeveloperKey(apiKey)
        .setAppId(appId)
        .setCallback((data: any) => {
          if (data.action === window.google.picker.Action.PICKED) {
            const doc = data.docs[0];
            const file: DriveFile = {
              id: doc.id,
              name: doc.name,
              mimeType: doc.mimeType,
              thumbnailLink: doc.thumbnails?.[0]?.url,
            };
            onFilePicked?.(file);
            setPickerLoading(false);
          } else if (data.action === window.google.picker.Action.CANCEL) {
            setPickerLoading(false);
          }
        })
        .build();

      picker.setVisible(true);
    } catch (err: any) {
      console.error("Picker error:", err);
      alert(err?.message ?? "Gagal buka Google Picker");
      setPickerLoading(false);
    }
  }, [onFilePicked]);

  // Sudah terhubung → tombol pakai ikon Drive, tanpa teks
  if (hasDriveScope) {
    return (
      <Button
        onClick={openPicker}
        disabled={pickerLoading}
        variant="outline"
        size="icon"
        title="Ambil dari Drive"
        aria-label="Ambil dari Drive"
        className="size-12 shrink-0 rounded-full border-gray-200 hover:border-sky-400 hover:bg-sky-50 dark:border-gray-800 dark:hover:border-sky-600 dark:hover:bg-sky-950/40"
      >
        {pickerLoading ? (
          <Loader2 className="size-5 animate-spin text-gray-400" />
        ) : (
          <DriveIcon className="size-5" />
        )}
      </Button>
    );
  }

  // Belum terhubung → tombol dengan ikon Drive + teks "Drive"
  return (
    <Button
      onClick={handleConnect}
      disabled={loading}
      variant="outline"
      className="h-12 gap-2 rounded-full border-gray-200 px-6 hover:border-sky-400 hover:bg-sky-50 dark:border-gray-800 dark:hover:border-sky-600 dark:hover:bg-sky-950/40"
    >
      <DriveIcon className="size-5" />
      {loading ? "Menghubungkan..." : "Drive"}
    </Button>
  );
}