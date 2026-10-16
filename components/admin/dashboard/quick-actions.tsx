import Link from "next/link";
import {
  Users,
  Image as ImageIcon,
  BarChart3,
  Settings,
  ScrollText,
} from "lucide-react";

const actions = [
  {
    href: "/admin/users",
    label: "Pengguna",
    desc: "Kelola akun",
    icon: Users,
  },
  {
    href: "/admin/history",
    label: "Riwayat",
    desc: "Lihat aktivitas",
    icon: ImageIcon,
  },
  {
    href: "/admin/stats",
    label: "Statistik",
    desc: "Tren harian",
    icon: BarChart3,
  },
  {
    href: "/admin/audit",
    label: "Audit",
    desc: "Log admin",
    icon: ScrollText,
  },
  {
    href: "/admin/settings",
    label: "Pengaturan",
    desc: "Konfigurasi",
    icon: Settings,
  },
];

export function QuickActions() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
        Aksi Cepat
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {actions.map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="group flex items-center gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:border-sky-300 hover:bg-sky-50/50 dark:border-gray-800 dark:hover:border-sky-800 dark:hover:bg-sky-950/20"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-md bg-sky-100 text-sky-600 transition-colors group-hover:bg-sky-500 group-hover:text-white dark:bg-sky-950 dark:text-sky-400">
              <a.icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {a.label}
              </p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {a.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}