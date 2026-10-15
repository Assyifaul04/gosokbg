export function DocsContent() {
  return (
    <article className="min-w-0 space-y-14">
      {/* Header */}
      <header className="border-b border-gray-200 pb-8 dark:border-gray-800">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Dokumentasi
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Panduan Penggunaan gosokbg
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
          Referensi lengkap untuk menghapus background foto langsung di
          browser Anda. Dokumen ini mencakup alur kerja, pilihan model AI,
          integrasi Google Drive, kebijakan kuota, dan praktik privasi.
        </p>
        <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Versi Dokumen
            </dt>
            <dd className="mt-1 font-medium text-gray-900 dark:text-white">
              1.0
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Terakhir Diperbarui
            </dt>
            <dd className="mt-1 font-medium text-gray-900 dark:text-white">
              Oktober 2026
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
              Platform
            </dt>
            <dd className="mt-1 font-medium text-gray-900 dark:text-white">
              Web (Browser)
            </dd>
          </div>
        </dl>
      </header>

      {/* 1. Pengenalan */}
      <section id="pengenalan" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          1. Pengenalan
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          <p>
            <strong className="font-semibold text-gray-900 dark:text-white">
              gosokbg
            </strong>{" "}
            adalah alat penghapus background foto yang berjalan sepenuhnya di
            sisi klien. Anda mengunggah gambar, model AI memisahkan objek dari
            latar belakang, dan Anda mengunduh hasil berupa PNG transparan.
          </p>
          <p>
            Berbeda dari layanan konvensional, gosokbg tidak mengirim gambar
            Anda ke server mana pun. Seluruh komputasi dilakukan di browser
            menggunakan WebGPU dan WebAssembly, sehingga privasi tetap terjaga
            dan latensi jauh lebih rendah.
          </p>
        </div>

        <h3 className="mt-8 text-sm font-semibold text-gray-900 dark:text-white">
          Karakteristik utama
        </h3>
        <dl className="mt-4 divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
          {[
            {
              term: "Pemrosesan lokal",
              desc: "Gambar tidak pernah meninggalkan perangkat Anda.",
            },
            {
              term: "Waktu proses singkat",
              desc: "Rata-rata 1–5 detik, bergantung pada model dan perangkat.",
            },
            {
              term: "Output transparan",
              desc: "Format PNG RGBA dengan tepi objek yang halus.",
            },
            {
              term: "Kuota harian gratis",
              desc: "10 proses per hari tanpa perlu membuat akun.",
            },
          ].map((item) => (
            <div key={item.term} className="py-3 sm:flex sm:gap-6">
              <dt className="text-sm font-medium text-gray-900 sm:w-48 sm:shrink-0 dark:text-white">
                {item.term}
              </dt>
              <dd className="mt-1 text-sm text-gray-600 sm:mt-0 dark:text-gray-400">
                {item.desc}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 2. Memulai */}
      <section id="memulai" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          2. Memulai
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Anda dapat langsung menggunakan gosokbg tanpa registrasi. Ikuti
          langkah berikut untuk memproses gambar pertama Anda.
        </p>

        <ol className="mt-6 space-y-5">
          {[
            {
              title: "Buka halaman Editor",
              desc: "Klik tombol \u201cUnggah\u201d pada navigasi utama, atau akses /editor secara langsung.",
            },
            {
              title: "Pilih atau unggah gambar",
              desc: "Gunakan tombol \u201cPilih Gambar\u201d, seret berkas ke area unggah, atau ambil gambar langsung dari Google Drive.",
            },
            {
              title: "Tunggu proses AI",
              desc: "Model berjalan di browser Anda. Waktu proses 1–5 detik, bergantung pada model dan kemampuan perangkat.",
            },
            {
              title: "Unduh hasil",
              desc: "Klik \u201cDownload PNG\u201d untuk menyimpan hasil dengan latar transparan.",
            },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-300 text-xs font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-300">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="mt-8 text-sm font-semibold text-gray-900 dark:text-white">
          Format dan batasan
        </h3>
        <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Parameter
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Nilai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {[
                ["Format masukan", "JPG, PNG, WEBP"],
                ["Ukuran maksimal", "10 MB (dapat dikonfigurasi)"],
                ["Format keluaran", "PNG (RGBA transparan)"],
                ["Resolusi keluaran", "Sama dengan resolusi masukan"],
              ].map(([k, v]) => (
                <tr key={k} className="bg-white dark:bg-gray-950">
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    {k}
                  </td>
                  <td className="px-4 py-2 text-gray-900 dark:text-white">
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Cara Kerja */}
      <section id="cara-kerja" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          3. Cara Kerja
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          gosokbg menggunakan model segmentasi AI yang dieksekusi langsung di
          browser melalui dua teknologi utama:
        </p>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-white">
              WebGPU
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              API grafis modern yang memungkinkan komputasi paralel pada GPU
              perangkat Anda. Jika tersedia, pemrosesan berjalan jauh lebih
              cepat.
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-900 dark:text-white">
              WebAssembly (WASM)
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Fallback ketika WebGPU tidak tersedia. Pemrosesan berjalan di
              CPU dengan kecepatan mendekati native.
            </dd>
          </div>
        </dl>

        <h3 className="mt-8 text-sm font-semibold text-gray-900 dark:text-white">
          Alur pemrosesan
        </h3>
        <ol className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>1. Gambar dimuat ke memori browser (tidak diunggah ke server).</li>
          <li>2. Model AI menganalisis piksel dan menentukan area objek.</li>
          <li>3. Masker alpha diterapkan untuk memisahkan objek dari latar.</li>
          <li>4. Hasil dikomposisikan menjadi PNG transparan di canvas.</li>
          <li>5. File siap diunduh atau disimpan ke Drive.</li>
        </ol>
      </section>

      {/* 4. Memilih Model AI */}
      <section id="memilih-model" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          4. Memilih Model AI
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Tersedia tiga model dengan trade-off berbeda antara kecepatan,
          ukuran, dan kualitas tepi. Pilih sesuai jenis foto Anda.
        </p>

        <div className="mt-6 space-y-4">
          {[
            {
              name: "MODNet",
              tagline: "Cepat dan ringan",
              desc: "Dioptimalkan untuk foto portrait, selfie, dan foto candid dengan latar belakang alami. Waktu proses paling cepat di antara ketiga model.",
              recommend: "Portrait, selfie, foto kasual",
              size: "~25 MB",
            },
            {
              name: "BiRefNet Lite",
              tagline: "Kualitas tepi tinggi",
              desc: "Unggul untuk ilustrasi, rambut detail, dan objek dengan tepi kompleks. Membutuhkan alokasi RAM lebih besar.",
              recommend: "Ilustrasi, foto produk, rambut detail",
              size: "~94 MB",
            },
            {
              name: "BEN2",
              tagline: "Kualitas profesional",
              desc: "Model terbaru dengan hasil paling halus dan konsisten. Cocok untuk semua jenis foto, termasuk foto formal dan objek beragam.",
              recommend: "Foto formal, objek umum, hasil akhir",
              size: "~235 MB",
            },
          ].map((m) => (
            <div
              key={m.name}
              className="rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {m.name}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {m.size}
                </span>
              </div>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-sky-600 dark:text-sky-400">
                {m.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {m.desc}
              </p>
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Direkomendasikan untuk:
                </span>{" "}
                {m.recommend}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-white">
              Catatan:
            </span>{" "}
            Model diunduh sekali saat pertama kali digunakan, lalu disimpan
            di cache browser. Penggunaan berikutnya tidak memerlukan unduhan
            ulang.
          </p>
        </div>
      </section>

      {/* 5. Simpan ke Google Drive */}
      <section id="menyimpan-drive" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          5. Integrasi Google Drive
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Anda dapat mengambil gambar langsung dari Google Drive, atau
          menyimpan hasil proses kembali ke Drive tanpa mengunduhnya terlebih
          dahulu.
        </p>

        <h3 className="mt-8 text-sm font-semibold text-gray-900 dark:text-white">
          Mengambil gambar dari Drive
        </h3>
        <ol className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            1. Klik tombol{" "}
            <strong className="text-gray-900 dark:text-white">Drive</strong>{" "}
            pada halaman Editor.
          </li>
          <li>2. Setujui izin akses Google Drive (hanya sekali per akun).</li>
          <li>
            3. Klik{" "}
            <strong className="text-gray-900 dark:text-white">
              Ambil dari Drive
            </strong>
            , pilih gambar, lalu konfirmasi.
          </li>
        </ol>

        <h3 className="mt-8 text-sm font-semibold text-gray-900 dark:text-white">
          Menyimpan hasil ke Drive
        </h3>
        <ol className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            1. Setelah proses selesai, klik{" "}
            <strong className="text-gray-900 dark:text-white">
              Simpan ke Drive
            </strong>
            .
          </li>
          <li>2. Pilih folder tujuan (opsional).</li>
          <li>3. File PNG akan tersimpan otomatis di Drive Anda.</li>
        </ol>

        <div className="mt-6 border-l-2 border-sky-500 bg-sky-50/50 py-3 pl-4 dark:bg-sky-950/20">
          <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300">
            <span className="font-semibold text-gray-900 dark:text-white">
              Cakupan akses:
            </span>{" "}
            gosokbg hanya dapat mengakses file yang Anda pilih secara
            eksplisit. Kami tidak memiliki izin untuk membaca file lain di
            Drive Anda.
          </p>
        </div>
      </section>

      {/* 6. Kuota Harian */}
      <section id="kuota" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          6. Kuota Harian
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Setiap pengguna mendapatkan kuota gratis yang direset setiap hari.
          Kuota ini menjaga ketersediaan layanan dan mencegah penyalahgunaan.
        </p>

        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Tipe Pengguna
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Kuota
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Keterangan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              <tr className="bg-white dark:bg-gray-950">
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  Tanpa akun
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  10 proses / hari
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  Cukup untuk penggunaan ringan.
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-950">
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  Dengan akun
                </td>
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  Tanpa batas
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                  Login via Google atau email.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>• Kuota direset otomatis pada pukul 00.00 waktu lokal server.</li>
          <li>• Proses yang gagal tidak mengurangi kuota Anda.</li>
          <li>• Login untuk menghilangkan batas harian sepenuhnya.</li>
        </ul>
      </section>

      {/* 7. Privasi & Keamanan */}
      <section id="privasi" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          7. Privasi dan Keamanan
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          Privasi adalah prinsip utama dalam desain gosokbg. Berikut komitmen
          kami secara rinci.
        </p>

        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Aspek
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300">
                  Kebijakan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {[
                [
                  "Pengiriman gambar",
                  "Tidak ada. Semua pemrosesan terjadi di browser.",
                ],
                [
                  "Penyimpanan file",
                  "Tidak ada. File hanya ada di memori hingga diunduh.",
                ],
                [
                  "Akses Google Drive",
                  "Opsional, terbatas pada file yang Anda pilih.",
                ],
                [
                  "Pelacakan",
                  "Tidak ada pelacakan perilaku atau profiling.",
                ],
                [
                  "Log server",
                  "Tidak menyimpan gambar atau metadata file.",
                ],
              ].map(([k, v]) => (
                <tr key={k} className="bg-white dark:bg-gray-950">
                  <td className="px-4 py-3 align-top text-gray-900 dark:text-white">
                    {k}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. FAQ */}
      <section id="faq" className="scroll-mt-24">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          8. Pertanyaan Umum
        </h2>
        <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-800 dark:border-gray-800">
          {[
            {
              q: "Apakah gosokbg benar-benar gratis?",
              a: "Ya. Anda dapat memproses 10 foto per hari tanpa akun. Login untuk menghilangkan batas harian.",
            },
            {
              q: "Apakah foto saya disimpan di server?",
              a: "Tidak. Semua pemrosesan berjalan di browser Anda. Foto tidak pernah dikirim ke server kami.",
            },
            {
              q: "Format apa yang dihasilkan?",
              a: "PNG transparan (RGBA) yang siap digunakan untuk desain, e-commerce, atau media sosial.",
            },
            {
              q: "Apa itu WebGPU dan apakah perangkat saya mendukung?",
              a: "WebGPU adalah API modern yang memungkinkan AI berjalan lebih cepat di browser. gosokbg mendeteksi WebGPU secara otomatis; jika tidak tersedia, pemrosesan dialihkan ke CPU (lebih lambat namun tetap berfungsi).",
            },
            {
              q: "Mengapa hasilnya terkadang kurang optimal?",
              a: "Kualitas bergantung pada kompleksitas foto. Untuk latar yang ramai atau tepi rumit seperti rambut dan bulu, gunakan model BiRefNet Lite atau BEN2.",
            },
            {
              q: "Apakah saya perlu akun untuk menggunakan Drive?",
              a: "Ya. Fitur Google Drive hanya tersedia untuk pengguna yang login dengan Google, guna menghubungkan Drive secara aman.",
            },
            {
              q: "Apakah model AI diunduh setiap kali saya membuka aplikasi?",
              a: "Tidak. Model disimpan di cache browser setelah unduhan pertama, sehingga penggunaan berikutnya lebih cepat.",
            },
          ].map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm font-medium text-gray-900 dark:text-white">
                <span>{item.q}</span>
                <span className="mt-0.5 shrink-0 text-xs text-gray-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-6 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Masih ada pertanyaan? Hubungi kami di{" "}
          <a
            href="mailto:hello@gosokbg.com"
            className="font-medium text-sky-600 hover:underline dark:text-sky-400"
          >
            hello@gosokbg.com
          </a>
          .
        </p>
      </footer>
    </article>
  );
}