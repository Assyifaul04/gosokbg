type AllInOneSectionProps = {
  image?: string;
};

export function AllInOneSection({
  image = "/images/feature.png",
}: AllInOneSectionProps) {
  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Teks */}
        <div className="max-w-md">

          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            Penghapus background AI serba bisa
          </h2>

          <p className="mt-6 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
            <strong className="font-semibold text-gray-900 dark:text-white">
              gosokbg
            </strong>{" "}
            
            adalah alat penghapus background berkualitas tinggi yang
            memudahkan Anda{" "}
            <strong className="font-semibold text-gray-900 dark:text-white">
              memotong objek
            </strong>{" "}
            dan memisahkannya dari latar belakang dengan akurasi luar biasa.
          </p>

          <p className="mt-4 text-[15px] leading-relaxed text-gray-600 dark:text-gray-400">
            Tapi tidak berhenti di situ. Hasilnya berupa{" "}
            <strong className="font-semibold text-gray-900 dark:text-white">
              PNG transparan
            </strong>{" "}
            yang siap dipakai untuk desain, e-commerce, atau media sosial —
            tanpa perlu aplikasi tambahan.
          </p>

          <ul className="mt-6 space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
            {[
              "Pemrosesan langsung di browser",
              "Hasil PNG transparan resolusi penuh",
              "Gratis tanpa perlu daftar akun",
            ].map((f) => (
              <li key={f} className="flex gap-3">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-sky-500" />
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Gambar */}
        <div className="justify-self-center md:justify-self-end">
          <div className="flex rounded-[2rem] bg-gradient-to-b from-sky-100 to-slate-200 p-2 shadow-sm dark:from-sky-950/40 dark:to-gray-900">
            <div className="h-80 w-64 overflow-hidden rounded-3xl bg-white dark:bg-gray-950 sm:h-96 sm:w-72">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image}
                alt="Contoh hasil penghapusan background"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}