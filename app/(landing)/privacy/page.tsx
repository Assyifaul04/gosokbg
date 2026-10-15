export const metadata = {
  title: "Kebijakan Privasi | gosokbg",
  description:
    "Kebijakan privasi gosokbg, alat penghapus background foto yang memproses gambar secara lokal di browser Anda.",
};

const lastUpdated = "14 Februari 2026";

const sections = [
  {
    title: "1. Komitmen Kami",
    paragraphs: [
      "Terima kasih telah mempercayai gosokbg. Kami memahami bahwa privasi adalah hal yang penting bagi Anda, dan kami ingin Anda merasa tenang saat menggunakan layanan kami.",
      "Kebijakan Privasi ini menjelaskan bagaimana kami menangani informasi saat Anda menggunakan gosokbg. Kami berusaha menuliskannya dengan bahasa yang jelas dan mudah dipahami.",
      "Dengan menggunakan gosokbg, Anda dianggap telah membaca dan memahami kebijakan ini.",
    ],
  },
  {
    title: "2. Prinsip Utama Kami",
    paragraphs: [
      "gosokbg dibangun dengan satu prinsip sederhana: gambar Anda tetap milik Anda, dan tidak perlu meninggalkan perangkat Anda.",
      "Seluruh proses penghapusan background dilakukan langsung di browser Anda. Tidak ada unggahan gambar ke server kami, tidak ada penyimpanan gambar di pihak kami, dan tidak ada akses terhadap gambar Anda dalam bentuk apa pun.",
    ],
  },
  {
    title: "3. Informasi yang Kami Kumpulkan",
    paragraphs: [
      "Kami tidak mengumpulkan, menyimpan, atau memproses gambar yang Anda gunakan di gosokbg. Gambar Anda tidak pernah meninggalkan perangkat Anda.",
      "Kami juga tidak meminta Anda membuat akun, memasukkan alamat email, atau memberikan data pribadi apa pun untuk menggunakan layanan ini.",
      "Namun, perlu Anda ketahui bahwa layanan pihak ketiga yang kami gunakan — seperti penyedia hosting dan jaringan iklan — dapat mengumpulkan informasi teknis secara otomatis. Penjelasan lebih lanjut ada pada bagian berikutnya.",
    ],
  },
  {
    title: "4. Log Akses Teknis",
    paragraphs: [
      "Seperti layanan web pada umumnya, penyedia hosting kami dapat mencatat log akses teknis secara otomatis — misalnya alamat IP, jenis browser, sistem operasi, dan waktu kunjungan.",
      "Log ini digunakan semata-mata untuk keperluan keamanan dan operasional, seperti memantau kinerja situs dan mencegah penyalahgunaan. Log ini tidak terkait dengan gambar yang Anda proses, dan tidak kami gunakan untuk mengidentifikasi Anda.",
    ],
  },
  {
    title: "5. Cookie dan Penyimpanan Lokal",
    paragraphs: [
      "gosokbg menggunakan penyimpanan lokal browser untuk menyimpan preferensi sederhana, seperti tema terang atau gelap. Data ini tetap berada di perangkat Anda, dan tidak pernah dikirim ke kami.",
      "Selain itu, kami menampilkan iklan melalui Google AdSense untuk mendukung keberlangsungan layanan ini. Google dan mitra periklanannya dapat menggunakan cookie untuk menayangkan iklan yang relevan berdasarkan kunjungan Anda sebelumnya di situs ini atau situs lain.",
      "Anda dapat mengatur preferensi iklan yang dipersonalisasi melalui Pengaturan Iklan Google di adssettings.google.com, atau menonaktifkan cookie pihak ketiga melalui aboutads.info.",
      "Untuk informasi lebih lanjut, silakan merujuk pada Kebijakan Cookie kami yang terpisah.",
    ],
  },
  {
    title: "6. Layanan Pihak Ketiga",
    paragraphs: [
      "Kami bekerja sama dengan pihak ketiga untuk keperluan hosting dan penayangan iklan. Dua pihak utama yang perlu Anda ketahui adalah:",
    ],
    list: [
      "Penyedia hosting, yang membantu kami menjalankan situs dan menjaga keamanannya.",
      "Google AdSense, yang menampilkan iklan dan dapat menggunakan cookie untuk personalisasi. Kebijakan privasi Google dapat Anda baca di policies.google.com/privacy.",
    ],
  },
  {
    title: "7. Keamanan",
    paragraphs: [
      "Karena gambar Anda tidak pernah meninggalkan perangkat Anda, risiko kebocoran gambar dari sisi kami sangat minimal.",
      "Kami tetap berupaya menjaga layanan agar berjalan dengan aman, termasuk dengan menggunakan koneksi terenkripsi (HTTPS) saat Anda mengakses situs kami. Namun, seperti layanan digital lainnya, kami tidak dapat menjamin keamanan yang sepenuhnya bebas dari risiko.",
    ],
  },
  {
    title: "8. Hak Anda",
    paragraphs: [
      "Karena kami tidak menyimpan data pribadi Anda, tidak ada data yang perlu Anda minta untuk dihapus atau diakses dari kami.",
      "Untuk data yang dikumpulkan oleh pihak ketiga seperti Google, Anda dapat menggunakan pengaturan privasi yang mereka sediakan, atau menghubungi mereka secara langsung.",
      "Jika Anda memiliki pertanyaan atau kekhawatiran tentang bagaimana gosokbg menangani privasi, Anda selalu dapat menghubungi kami melalui halaman dukungan.",
    ],
  },
  {
    title: "9. Perubahan Kebijakan",
    paragraphs: [
      "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu, seiring dengan perkembangan layanan. Versi terbaru akan selalu tersedia di halaman ini, dengan tanggal pembaruan yang tercantum di bagian atas.",
      "Kami akan berusaha menginformasikan perubahan penting kepada pengguna. Dengan terus menggunakan layanan setelah perubahan diterbitkan, Anda dianggap menyetujui kebijakan yang telah diperbarui.",
    ],
  },
  {
    title: "10. Hubungi Kami",
    paragraphs: [
      "Jika Anda memiliki pertanyaan, masukan, atau keberatan mengenai Kebijakan Privasi ini, silakan menghubungi kami melalui halaman dukungan yang tersedia di situs ini. Kami akan dengan senang hati membantu Anda.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      {/* Header */}
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Kebijakan Privasi
        </h1>
        <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          Privasi Anda adalah hal yang kami utamakan. Kebijakan ini menjelaskan
          bagaimana gosokbg menjaga gambar dan informasi Anda, dengan bahasa
          yang mudah dipahami.
        </p>
        <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
          Terakhir diperbarui: {lastUpdated}
        </p>
      </header>

      {/* Sections */}
      <div className="mt-14 space-y-12">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
              {section.title}
            </h2>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {section.list && (
                <ul className="ml-5 list-disc space-y-2 marker:text-gray-400 dark:marker:text-gray-600">
                  {section.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer catatan */}
      <div className="mt-16 border-t border-gray-200 pt-6 dark:border-gray-800">
        <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-500">
          Dokumen ini merupakan bagian dari layanan gosokbg. Kami juga
          menganjurkan Anda untuk membaca Ketentuan Layanan dan Kebijakan
          Cookie kami.
        </p>
      </div>
    </main>
  );
}