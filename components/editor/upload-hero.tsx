"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { UploadCloud, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConnectDriveButton } from "@/components/editor/connect-drive-button";
import { cn } from "@/lib/utils";

function getGuestKey(): string {
  if (typeof window === "undefined") return "";
  let key = localStorage.getItem("gosokbg:guestKey");
  if (!key) {
    key =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `guest-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem("gosokbg:guestKey", key);
  }
  return key;
}

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
};

export function UploadHero() {
  const router = useRouter();
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;

  const inputRef = useRef<HTMLInputElement>(null);
  const [isReading, setIsReading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFetchingDrive, setIsFetchingDrive] = useState(false);
  const [maxSizeMB, setMaxSizeMB] = useState<number>(10);
  const [quota, setQuota] = useState<{
    used: number;
    limit: number;
    remaining: number;
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/config");
        if (res.ok) {
          const data = await res.json();
          if (typeof data.maxUploadMB === "number") {
            setMaxSizeMB(data.maxUploadMB);
          }
        }
      } catch {}

      if (isLoggedIn) {
        setQuota({ used: 0, limit: -1, remaining: -1 });
        return;
      }

      try {
        const guestKey = getGuestKey();
        const res = await fetch(`/api/quota?guestKey=${guestKey}`);
        if (res.ok) {
          const data = await res.json();
          setQuota({
            used: data.used,
            limit: data.limit,
            remaining: data.remaining,
          });
        }
      } catch {}
    })();
  }, [isLoggedIn]);

  // Simpan ke sessionStorage dan redirect ke editor
  const goToEditor = useCallback(
    (name: string, type: string, size: number, dataUrl: string) => {
      sessionStorage.setItem(
        "gosokbg:upload",
        JSON.stringify({
          name,
          type,
          size,
          dataUrl,
          at: Date.now(),
        })
      );
      router.push("/editor/tools");
    },
    [router]
  );

  const handleFile = useCallback(
    (file: File) => {
      const maxBytes = maxSizeMB * 1024 * 1024;

      if (!file.type.startsWith("image/")) {
        alert("File harus berupa gambar (JPG, PNG, WEBP).");
        return;
      }
      if (file.size > maxBytes) {
        alert(`Ukuran maksimal ${maxSizeMB} MB.`);
        return;
      }

      setIsReading(true);
      const reader = new FileReader();
      reader.onload = () => {
        try {
          goToEditor(file.name, file.type, file.size, reader.result as string);
        } catch {
          alert("Gambar terlalu besar untuk diproses. Coba gambar lain.");
          setIsReading(false);
        }
      };
      reader.onerror = () => {
        alert("Gagal membaca file. Coba lagi.");
        setIsReading(false);
      };
      reader.readAsDataURL(file);
    },
    [maxSizeMB, goToEditor]
  );

  // Handler ketika user pilih file dari Google Drive
  const handleDriveFile = useCallback(
    async (driveFile: DriveFile) => {
      setIsFetchingDrive(true);
      try {
        const res = await fetch("/api/drive/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileId: driveFile.id }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error ?? "Gagal download dari Drive");
        }

        const data = await res.json();
        const file = data.file;

        const maxBytes = maxSizeMB * 1024 * 1024;
        if (file.size > maxBytes) {
          alert(`Ukuran file dari Drive melebihi ${maxSizeMB} MB.`);
          return;
        }

        goToEditor(file.name, file.mimeType, file.size, file.dataUrl);
      } catch (err: any) {
        alert(err?.message ?? "Gagal ambil file dari Drive");
      } finally {
        setIsFetchingDrive(false);
      }
    },
    [maxSizeMB, goToEditor]
  );

  function handlePick() {
    inputRef.current?.click();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  const busy = isReading || isFetchingDrive;

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center gap-5 rounded-2xl transition-all",
        isDragging && "scale-[1.02] bg-sky-50/50 dark:bg-sky-950/20"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          size="lg"
          onClick={handlePick}
          disabled={busy}
          className="h-12 rounded-full bg-sky-500 px-8 text-base text-white shadow-md shadow-sky-500/20 hover:bg-sky-600 disabled:opacity-60"
        >
          {isReading ? (
            <>
              <Loader2 className="mr-2 size-5 animate-spin" />
              Membaca...
            </>
          ) : (
            <>
              <UploadCloud className="mr-2 size-5" />
              Pilih Gambar
            </>
          )}
        </Button>

        <ConnectDriveButton onFilePicked={handleDriveFile} />
      </div>

      {isFetchingDrive && (
        <p className="text-xs text-sky-600 dark:text-sky-400">
          Mengambil file dari Drive...
        </p>
      )}

      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {isDragging
            ? "Lepaskan file di sini..."
            : "atau seret & lepas file ke area ini"}
        </p>
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          JPG, PNG, atau WEBP · Maks {maxSizeMB} MB
        </p>
      </div>

      {quota && (
        <div className="w-full max-w-xs rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center text-xs text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          {quota.limit === -1 ? (
            <span className="font-semibold text-green-600 dark:text-green-400">
              ✓ Tanpa batas (login)
            </span>
          ) : (
            <>
              Kuota hari ini:{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {quota.used}/{quota.limit}
              </span>{" "}
              · Sisa{" "}
              <span
                className={
                  quota.remaining > 0
                    ? "font-semibold text-sky-600 dark:text-sky-400"
                    : "font-semibold text-red-600 dark:text-red-400"
                }
              >
                {quota.remaining}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}