"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      className="toaster group"
      position="top-right"
      offset={16}
      gap={10}
      duration={3500}
      closeButton
      richColors={false}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg group-[.toaster]:px-4 group-[.toaster]:py-3 group-[.toaster]:text-sm dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:text-white dark:group-[.toaster]:border-gray-800",
          title: "group-[.toast]:font-medium",
          description:
            "group-[.toast]:text-gray-500 group-[.toast]:text-xs dark:group-[.toast]:text-gray-400",
          actionButton:
            "group-[.toast]:bg-sky-500 group-[.toast]:text-white group-[.toast]:rounded-md group-[.toast]:text-xs group-[.toast]:font-medium",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-600 group-[.toast]:rounded-md group-[.toast]:text-xs dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-300",
          closeButton:
            "group-[.toast]:bg-white group-[.toast]:text-gray-400 group-[.toast]:border-gray-200 dark:group-[.toast]:bg-gray-900 dark:group-[.toast]:text-gray-500 dark:group-[.toast]:border-gray-800",
          success:
            "group-[.toaster]:border-green-200 group-[.toaster]:bg-green-50 group-[.toaster]:text-green-800 dark:group-[.toaster]:border-green-900/50 dark:group-[.toaster]:bg-green-950/40 dark:group-[.toaster]:text-green-400",
          error:
            "group-[.toaster]:border-red-200 group-[.toaster]:bg-red-50 group-[.toaster]:text-red-800 dark:group-[.toaster]:border-red-900/50 dark:group-[.toaster]:bg-red-950/40 dark:group-[.toaster]:text-red-400",
          warning:
            "group-[.toaster]:border-yellow-200 group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-800 dark:group-[.toaster]:border-yellow-900/50 dark:group-[.toaster]:bg-yellow-950/40 dark:group-[.toaster]:text-yellow-400",
          info: "group-[.toaster]:border-sky-200 group-[.toaster]:bg-sky-50 group-[.toaster]:text-sky-800 dark:group-[.toaster]:border-sky-900/50 dark:group-[.toaster]:bg-sky-950/40 dark:group-[.toaster]:text-sky-400",
          loading:
            "group-[.toaster]:border-gray-200 group-[.toaster]:bg-white group-[.toaster]:text-gray-700 dark:group-[.toaster]:border-gray-800 dark:group-[.toaster]:bg-gray-900 dark:group-[.toaster]:text-gray-300",
        },
      }}
    />
  );
}