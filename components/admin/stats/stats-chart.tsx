"use client";

type Point = {
  date: string;
  total: number;
  success: number;
  failed: number;
};

export function StatsChart({ data }: { data: Point[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          7 Hari Terakhir
        </h2>
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Belum ada data.
        </p>
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.total), 1);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          7 Hari Terakhir
        </h2>
        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-sky-500" />
            Total
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-green-500" />
            Sukses
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-sm bg-red-500" />
            Gagal
          </span>
        </div>
      </div>

      <div className="mt-6 flex h-56 items-end gap-3">
        {data.map((d) => {
          const totalH = (d.total / max) * 100;
          const successH = (d.success / max) * 100;
          const failedH = (d.failed / max) * 100;
          return (
            <div
              key={d.date}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="relative flex h-full w-full items-end justify-center gap-0.5">
                <div
                  className="w-3 rounded-t bg-sky-500/30"
                  style={{ height: `${totalH}%` }}
                  title={`Total: ${d.total}`}
                />
                <div
                  className="w-3 rounded-t bg-green-500"
                  style={{ height: `${successH}%` }}
                  title={`Sukses: ${d.success}`}
                />
                <div
                  className="w-3 rounded-t bg-red-500"
                  style={{ height: `${failedH}%` }}
                  title={`Gagal: ${d.failed}`}
                />
              </div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">
                {new Date(d.date).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}