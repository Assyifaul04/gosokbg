import Link from "next/link";
import Image from "next/image";

export type Plugin = {
  name: string;
  desc: string;
  href: string;
  icon: string;
};

export function PluginCard({ plugin }: { plugin: Plugin }) {
  const { name, desc, href, icon } = plugin;

  return (
    <Link
      href={href}
      className="group flex items-center gap-4 border-b border-gray-100 py-5 transition-colors last:border-b-0 hover:bg-sky-50/40 dark:border-gray-900 dark:hover:bg-sky-950/20"
    >
      {/* Icon tanpa kotak */}
      <Image
        src={icon}
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 object-contain"
      />

      {/* Teks */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium text-gray-900 transition-colors group-hover:text-sky-600 dark:text-white dark:group-hover:text-sky-400">
          {name}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
          {desc}
        </p>
      </div>

      {/* Panah */}
      <svg
        viewBox="0 0 16 16"
        className="size-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-sky-500 dark:text-gray-700 dark:group-hover:text-sky-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 4l4 4-4 4" />
      </svg>
    </Link>
  );
}