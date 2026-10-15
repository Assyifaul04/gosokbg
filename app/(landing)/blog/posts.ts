export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  content: string[];
};

export const posts: Post[] = [
  {
    slug: "kenapa-hapus-background-langsung-di-browser-lebih-aman",
    title: "Kenapa Hapus Background Langsung di Browser Lebih Aman",
    excerpt:
      "Sebagian besar alat hapus background mengunggah foto Anda ke server. Ini alasan kenapa memproses gambar langsung di browser jauh lebih aman.",
    date: "14 Februari 2026",
    readingTime: "5 menit",
    category: "Privasi",
    content: [
      "Ketika Anda mengunggah foto ke sebuah situs web, foto itu meninggalkan perangkat Anda. Ia berpindah ke server milik orang lain, melewati jaringan internet, dan disimpan di suatu tempat yang tidak Anda ketahui. Bagi banyak orang, ini bukan masalah besar. Tetapi untuk foto pribadi, dokumen identitas, atau gambar produk yang belum dipublikasikan, ini bisa menjadi risiko yang serius.",
      "Sebagian besar alat penghapus background online bekerja dengan pola ini: unggah, tunggu, unduh. Server mereka menerima gambar Anda, memprosesnya dengan model AI yang berat, lalu mengirimkan hasilnya kembali. Dalam proses itu, gambar Anda melewati beberapa titik yang tidak Anda kendalikan.",
      "gosokbg mengambil pendekatan yang berbeda. Semua proses berjalan langsung di browser Anda. Tidak ada unggahan, tidak ada antrean, dan tidak ada data yang berpindah ke server mana pun. Gambar Anda tetap berada di perangkat Anda, dari awal hingga akhir.",
      "Ini dimungkinkan oleh teknologi web modern. Browser masa kini sudah cukup kuat untuk menjalankan model pemrosesan gambar secara lokal, tanpa perlu bantuan server. Selama beberapa tahun terakhir, kemampuan ini berkembang pesat, dan sekarang cukup matang untuk digunakan sehari-hari.",
      "Apa artinya bagi Anda? Pertama, privasi Anda terjaga sepenuhnya. Tidak ada pihak lain yang bisa melihat foto yang Anda proses. Kedua, tidak ada antrean, sehingga hasilnya muncul dalam hitungan detik, bukan menit. Ketiga, Anda bisa menggunakannya bahkan saat koneksi internet tidak stabil, karena prosesnya tidak bergantung pada server.",
      "Untuk pekerjaan profesional seperti desain produk, fotografi, atau pembuatan konten, privasi bukan kemewahan — ini kebutuhan dasar. Klien Anda mempercayakan gambar mereka kepada Anda, dan Anda bertanggung jawab untuk menjaganya tetap aman. Memilih alat yang memproses secara lokal adalah salah satu cara paling sederhana untuk memenuhi tanggung jawab itu.",
      "gosokbg dibangun dengan prinsip ini sejak awal. Bukan karena tren, tetapi karena kami percaya bahwa alat yang baik seharusnya tidak meminta Anda menyerahkan data Anda sebagai harga.",
    ],
  },
  {
    slug: "panduan-lengkap-menghapus-background-foto-produk",
    title: "Panduan Lengkap Menghapus Background Foto Produk",
    excerpt:
      "Langkah demi langkah menghapus background foto produk untuk keperluan toko online, katalog, dan media sosial.",
    date: "10 Februari 2026",
    readingTime: "7 menit",
    category: "Panduan",
    content: [
      "Foto produk yang bersih adalah salah satu faktor terpenting dalam penjualan online. Pembeli tidak bisa memegang produk Anda, jadi mereka mengandalkan gambar untuk menilai kualitas. Latar belakang yang berantakan, bayangan yang tidak rata, atau warna yang tidak konsisten bisa membuat produk terlihat murah — meskipun kualitasnya sebenarnya bagus.",
      "Standar industri untuk foto produk e-commerce adalah latar putih bersih atau transparan. Marketplace besar seperti Shopee, Tokopedia, dan Amazon sering mensyaratkan latar putih untuk foto utama. Untuk keperluan katalog internal atau materi promosi, latar transparan lebih fleksibel karena bisa ditempatkan di berbagai desain.",
      "Langkah pertama adalah menyiapkan foto yang baik. Ambil gambar produk dengan pencahayaan merata, idealnya menggunakan dua sumber cahaya dari sisi kiri dan kanan. Hindari bayangan keras yang jatuh ke latar belakang. Kalau perlu, gunakan latar polos berwarna netral saat memotret, meskipun nantinya akan dihapus.",
      "Setelah foto siap, buka editor gosokbg di browser. Seret foto ke area kerja atau klik untuk memilih dari perangkat. Tidak ada proses unggah ke server, jadi Anda bisa langsung bekerja tanpa menunggu.",
      "Tekan tombol hapus background. Dalam beberapa detik, latar belakang akan hilang dan tersisa produk Anda dengan latar transparan. Periksa hasilnya dengan cermat, terutama di bagian tepi produk yang memiliki detail halus seperti kabel, rantai, atau tekstur kain.",
      "Kalau ada bagian yang masih terlihat kasar, Anda bisa memotret ulang dengan latar yang lebih kontras. Misalnya, produk gelap sebaiknya dipotret di latar terang, dan sebaliknya. Kontras yang tinggi membuat pemisahan jauh lebih bersih.",
      "Terakhir, unduh hasilnya dalam format PNG. Format ini mendukung transparansi, sehingga produk Anda bisa langsung ditempelkan ke desain banner, katalog PDF, atau konten media sosial tanpa perlu diedit ulang.",
      "Untuk konsistensi katalog, gunakan pengaturan yang sama untuk seluruh foto produk Anda. Sudut pengambilan, jarak, dan pencahayaan sebaiknya seragam. Ini membuat toko online Anda terlihat lebih profesional dan mudah dipercaya.",
      "Dengan alur kerja yang tepat, Anda bisa memproses puluhan foto produk dalam waktu kurang dari satu jam. Tidak perlu software mahal, tidak perlu langganan bulanan, dan tidak perlu menyerahkan foto klien Anda ke pihak lain.",
    ],
  },
  {
    slug: "kesalahan-umum-saat-memotret-untuk-hapus-background",
    title: "7 Kesalahan Umum Saat Memotret untuk Hapus Background",
    excerpt:
      "Kualitas hasil hapus background sangat ditentukan oleh foto aslinya. Hindari tujuh kesalahan ini agar hasilnya maksimal.",
    date: "6 Februari 2026",
    readingTime: "6 menit",
    category: "Tips",
    content: [
      "Alat hapus background tidak bisa menyulap foto yang buruk menjadi hasil yang sempurna. Sebagus apa pun teknologinya, kualitas akhir tetap bergantung pada kualitas foto aslinya. Berikut tujuh kesalahan yang paling sering terjadi, dan cara menghindarinya.",
      "Kesalahan pertama: latar belakang terlalu ramai. Latar dengan banyak objek, tekstur, atau pola membuat pemisahan menjadi sulit. Alat harus menebak mana subjek dan mana latar. Sebisa mungkin, gunakan latar polos atau gradasi sederhana saat memotret.",
      "Kesalahan kedua: pencahayaan yang tidak merata. Bayangan keras di sekitar subjek sering disalahartikan sebagai bagian dari latar belakang. Sebaliknya, subjek yang terlalu gelap bisa menyatu dengan latar yang juga gelap. Gunakan cahaya yang lembut dan merata dari beberapa arah.",
      "Kesalahan ketiga: kontras yang rendah antara subjek dan latar. Rambut pirang di latar putih, atau baju hitam di latar gelap, adalah mimpi buruk bagi alat hapus background. Pilih latar yang kontras dengan subjek Anda, terutama di area tepi.",
      "Kesalahan keempat: resolusi terlalu kecil. Foto beresolusi rendah kehilangan detail di tepi subjek. Hasilnya terlihat kasar dan bergerigi setelah background dihapus. Gunakan resolusi yang cukup, minimal 1000 piksel di sisi terpanjang.",
      "Kesalahan kelima: subjek bergerak saat dipotret. Foto yang blur atau goyang menghasilkan tepi yang tidak tegas. Alat jadi kesulitan menentukan batas subjek. Gunakan kecepatan rana yang cukup tinggi, atau letakkan kamera di tripod.",
      "Kesalahan keenam: memotret terlalu jauh. Subjek yang kecil di dalam frame besar berarti detailnya sedikit. Dekatkan kamera ke subjek sehingga ia memenuhi sebagian besar frame. Ini memberi alat lebih banyak informasi untuk bekerja.",
      "Kesalahan ketujuh: menggunakan zoom digital. Zoom digital hanya memotong dan memperbesar piksel, sehingga kualitasnya menurun. Kalau perlu mendekat, gunakan zoom optik atau mendekatlah secara fisik ke subjek.",
      "Dengan memperhatikan tujuh hal ini, Anda akan menghemat banyak waktu. Alih-alih mengulang proses berkali-kali untuk hasil yang sama, Anda bisa mendapatkan hasil yang bersih di percobaan pertama.",
    ],
  },
  {
    slug: "png-vs-jpg-format-terbaik-untuk-hasil-transparan",
    title: "PNG vs JPG: Format Terbaik untuk Hasil Transparan",
    excerpt:
      "Kenapa hasil hapus background harus disimpan sebagai PNG, bukan JPG? Ini penjelasan lengkapnya.",
    date: "1 Februari 2026",
    readingTime: "4 menit",
    category: "Edukasi",
    content: [
      "Setiap kali Anda menyimpan gambar, ada format yang harus dipilih. Dua yang paling umum adalah JPG dan PNG. Keduanya punya kegunaan masing-masing, tetapi ketika berbicara tentang gambar transparan, hanya satu yang bisa digunakan.",
      "JPG, atau JPEG, adalah format yang dirancang untuk memotret. Ia menggunakan kompresi yang mengurangi ukuran file dengan mengorbankan sebagian detail. JPG tidak mendukung transparansi. Ketika Anda menghapus background dari sebuah gambar JPG, bagian yang kosong akan otomatis terisi dengan warna putih atau hitam, tergantung pengaturan.",
      "PNG, atau Portable Network Graphics, dibuat untuk keperluan web. Ia mendukung transparansi penuh, sehingga bagian yang kosong benar-benar kosong — bukan berwarna putih, tetapi tidak ada sama sekali. PNG juga menggunakan kompresi tanpa kehilangan kualitas, sehingga detail tepi tetap tajam.",
      "Untuk hasil hapus background, PNG adalah pilihan yang tepat. Ini karena transparansi memungkinkan Anda menempatkan subjek di atas latar apa pun, tanpa garis putih di sekelilingnya.",
      "Bayangkan Anda menghapus background dari foto produk, lalu menempelkannya ke banner promosi berwarna biru. Kalau hasilnya JPG, akan ada sisa putih di tepi produk yang membuatnya terlihat kasar. Kalau PNG, produk akan menyatu dengan latar biru dengan mulus.",
      "Ukuran file PNG memang lebih besar dibanding JPG. Untuk gambar yang sama, PNG bisa dua hingga lima kali lebih besar. Namun untuk gambar transparan, ini adalah harga yang wajar. Kompresi PNG tidak merusak detail, sehingga kualitasnya tetap terjaga untuk keperluan profesional.",
      "Satu catatan: tidak semua PNG harus berukuran besar. Kalau Anda hanya butuh gambar dengan sedikit warna, PNG akan sangat efisien. Kalau Anda butuh foto natural dengan banyak gradasi, ukurannya akan lebih besar.",
      "Kesimpulannya sederhana. Untuk hasil hapus background, selalu gunakan PNG. Untuk foto biasa tanpa transparansi, JPG masih pilihan yang baik. Ketahui kapan menggunakan masing-masing, dan hasil kerja Anda akan selalu terlihat profesional.",
    ],
  },
  {
    slug: "update-gosokbg-februari-2026",
    title: "Update gosokbg Februari 2026",
    excerpt:
      "Rangkuman peningkatan kecepatan, kualitas tepi, dan kemudahan penggunaan yang baru saja dirilis.",
    date: "1 Februari 2026",
    readingTime: "3 menit",
    category: "Update",
    content: [
      "Awal tahun ini kami fokus pada tiga hal: kecepatan, kualitas, dan kemudahan penggunaan. Berikut rangkuman pembaruan yang sudah tersedia untuk semua pengguna gosokbg.",
      "Pertama, kecepatan pemrosesan meningkat signifikan. Rata-rata waktu hapus background turun sekitar 40 persen dibanding versi sebelumnya. Peningkatan paling terasa pada perangkat kelas menengah, di mana proses yang sebelumnya memakan waktu beberapa detik kini selesai hampir seketika.",
      "Kedua, kualitas tepi pada objek detail telah diperbaiki. Rambut, dedaunan, dan serat kain sekarang terlihat lebih halus setelah background dihapus. Kami melatih ulang model pemrosesan dengan fokus pada area tepi, dan hasilnya terlihat jauh lebih natural ketika subjek ditempatkan di latar baru.",
      "Ketiga, antarmuka editor kami sederhanakan. Tombol utama sekarang lebih mudah ditemukan, dan alurnya lebih ringkas dari awal hingga akhir. Kami menghilangkan beberapa langkah yang ternyata tidak perlu, berdasarkan analisis perilaku pengguna.",
      "Dukungan mode gelap juga disempurnakan. Kontras warna disesuaikan agar mata lebih nyaman saat bekerja di malam hari, terutama untuk sesi yang panjang.",
      "Kami juga memperbaiki beberapa bug kecil yang dilaporkan pengguna. Khususnya, masalah pada browser Safari versi lama yang kadang membuat gambar gagal dimuat. Sekarang sudah berjalan normal di semua browser modern.",
      "Terima kasih kepada semua pengguna yang telah memberikan masukan. Setiap laporan membantu kami memahami di mana kami perlu memperbaiki diri. Kalau Anda menemukan masalah atau punya ide fitur baru, jangan ragu untuk menghubungi kami melalui halaman support.",
      "Ke depan, kami akan terus mengembangkan gosokbg dengan prinsip yang sama: cepat, aman, dan tanpa ribet. Tidak ada langganan tersembunyi, tidak ada data yang disimpan, dan tidak ada kompromi pada privasi.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}