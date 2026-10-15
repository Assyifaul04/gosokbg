"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-gray-800",
          description: "group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-sky-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600",
          success:
            "group-[.toaster]:border-green-200 group-[.toaster]:bg-green-50 group-[.toaster]:text-green-800 dark:group-[.toaster]:border-green-900/50 dark:group-[.toaster]:bg-green-950/40 dark:group-[.toaster]:text-green-400",
          error:
            "group-[.toaster]:border-red-200 group-[.toaster]:bg-red-50 group-[.toaster]:text-red-800 dark:group-[.toaster]:border-red-900/50 dark:group-[.toaster]:bg-red-950/40 dark:group-[.toaster]:text-red-400",
        },
      }}
    />
  );
}