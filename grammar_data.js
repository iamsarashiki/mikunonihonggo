const grammarData = {
    "bab1": {
        title: "Bab 1: Perkenalan Diri (Jikoshoukai)",
        patterns: [
            {
                id: "1.1",
                label: "KB1 wa KB2 desu",
                desc: "KB1 adalah KB2. 'Wa' adalah partikel penanda subjek.",
                rules: "KB1 (Orang/Subjek) + は (wa) + KB2 (Predikat/Identitas) + です (desu).",
                usage: "Sopan (Desu menunjukkan kesopanan).",
                examples: [
                    { jp: "私はワットです。", id: "Saya adalah Watt." },
                    { jp: "彼は医者です。", id: "Dia adalah dokter." }
                ]
            },
            {
                id: "1.2",
                label: "KB1 wa KB2 ja arimasen",
                desc: "KB1 bukan KB2. Bentuk negatif dari 'desu'.",
                rules: "Ja arimasen (Lisan/Standar), Dewa arimasen (Tulisan/Formal).",
                usage: "Sopan.",
                examples: [
                    { jp: "サントスさんは学生じゃありません。", id: "Sdr. Santos bukan mahasiswa." }
                ]
            }
        ]
    },
    "bab2": {
        title: "Bab 2: Benda di Sekitar",
        patterns: [
            {
                id: "2.1",
                label: "Kore / Sore / Are",
                desc: "Kata ganti penunjuk benda.",
                rules: "Kore (Dekat pembicara), Sore (Dekat lawan bicara), Are (Jauh dari keduanya).",
                usage: "Digunakan sebagai subjek kalimat.",
                examples: [
                    { jp: "これは本です。", id: "Ini adalah buku." },
                    { jp: "あれは私の車です。", id: "Itu (jauh) adalah mobil saya." }
                ]
            }
        ]
    }
};

// Inisialisasi Storage Offline
let userProgress = JSON.parse(localStorage.getItem('mikuProgress')) || {};
// Tambahkan ini ke dalam objek grammarData di grammar_data.js
Object.assign(grammarData, {
    "bab3": {
        title: "Bab 3: Tempat & Lokasi (Koko/Soko/Asoko)",
        patterns: [
            {
                id: "3.1",
                label: "Koko / Soko / Asoko wa KB (Tempat) desu",
                desc: "Menunjukkan lokasi benda atau pembicara berada.",
                rules: "Koko (Sini), Soko (Situ), Asoko (Sana). Dokosuka (Di mana?).",
                usage: "Sopan. Bentuk lebih sopan: Kochira, Sochira, Achira.",
                examples: [
                    { jp: "ここは食堂です。", id: "Di sini adalah kantin." },
                    { jp: "お手洗いはあそこです。", id: "Toilet ada di sana." }
                ]
            },
            {
                id: "3.2",
                label: "KB1 wa Doko / Dochira desu ka",
                desc: "Menanyakan keberadaan tempat atau asal negara/perusahaan.",
                rules: "Dochira digunakan untuk bertanya arah atau nama perusahaan/sekolah agar lebih sopan.",
                usage: "Sangat penting untuk situasi formal/kerja.",
                examples: [
                    { jp: "エレベーターはどちらですか。", id: "Lift ada di sebelah mana?" },
                    { jp: "お国はどちらですか。", id: "Berasal dari negara mana?" }
                ]
            }
        ]
    },
    "bab4": {
        title: "Bab 4: Waktu & Kata Kerja Dasar (Masu)",
        patterns: [
            {
                id: "4.1",
                label: "Ima ...-ji ...-pun desu",
                desc: "Menyatakan waktu (Jam dan Menit).",
                rules: "Jam: Angka + ji. Menit: Angka + fun/pun. Kecuali: 4ji (yoji), 9ji (kuji).",
                usage: "Informasi waktu standar.",
                examples: [
                    { jp: "今、八時半です。", id: "Sekarang jam 8.30." },
                    { jp: "ニューヨークは今、何時ですか。", id: "New York sekarang jam berapa?" }
                ]
            },
            {
                id: "4.2",
                label: "KK-masu / KK-masen / KK-mashita",
                desc: "Perubahan bentuk waktu kata kerja (Positif, Negatif, Lampau).",
                rules: "Masu (Akan/Kebiasaan), Masen (Tidak), Mashita (Lampau), Masendeshita (Lampau Negatif).",
                usage: "Bentuk sopan dasar (Teinei-go).",
                examples: [
                    { jp: "毎朝、６時に起きます。", id: "Setiap pagi bangun jam 6." },
                    { jp: "昨晩、勉強しましたか。", id: "Tadi malam apakah sudah belajar?" }
                ]
            }
        ]
    }
});

Object.assign(grammarData, {
    "bab5": {
        title: "Bab 5: Perpindahan (Iku/Kuru/Kaeru)",
        patterns: [
            {
                id: "5.1",
                label: "KB (Tempat) e Ikimasu / Kimasu / Kaerimasu",
                desc: "Menunjukkan arah perpindahan tempat.",
                rules: "Partikel へ (e) diletakkan setelah kata benda tempat.",
                usage: "Arah tujuan.",
                examples: [
                    { jp: "どこへも行きません。", id: "Tidak pergi ke mana pun." },
                    { jp: "来週、日本へ行きます。", id: "Minggu depan akan pergi ke Jepang." }
                ]
            },
            {
                id: "5.2",
                label: "KB (Kendaraan) de Ikimasu",
                desc: "Menunjukkan alat transportasi yang digunakan.",
                rules: "Pengecualian: 'Aruite' (Jalan kaki) tidak memakai partikel 'de'.",
                usage: "Sarana transportasi.",
                examples: [
                    { jp: "電車で会社へ行きます。", id: "Pergi ke kantor dengan kereta." },
                    { jp: "歩いてうちへ帰ります。", id: "Pulang ke rumah dengan jalan kaki." }
                ]
            },
            {
                id: "5.3",
                label: "KB (Orang/Binatang) to KK",
                desc: "Melakukan kegiatan bersama seseorang.",
                rules: "Partikel と (to) berarti 'bersama'.",
                usage: "Penyertaan.",
                examples: [
                    { jp: "家族と日本へ来ました。", id: "Datang ke Jepang bersama keluarga." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab6": {
        title: "Bab 6: Objek & Ajakan (Wo / Issho ni)",
        patterns: [
            {
                id: "6.1",
                label: "KB (Benda) wo KK (Transitif)",
                desc: "Menunjukkan objek dari sebuah tindakan.",
                rules: "Partikel を (wo) digunakan setelah kata benda objek.",
                usage: "Standar Sopan.",
                examples: [
                    { jp: "お酒を飲みます。", id: "Minum sake." },
                    { jp: "パンを食べます。", id: "Makan roti." }
                ]
            },
            {
                id: "6.2",
                label: "Issho ni KK-masen ka",
                desc: "Mengajak lawan bicara melakukan sesuatu bersama.",
                rules: "Bentuk negatif pertanyaan (-masen ka) digunakan untuk ajakan yang lebih sopan/halus.",
                usage: "Sangat Sopan (Ajakan).",
                examples: [
                    { jp: "いっしょに京都へ行きませんか。", id: "Maukah pergi ke Kyoto bersama-sama?" }
                ]
            },
            {
                id: "6.3",
                label: "KK-mashou",
                desc: "Ayo melakukan sesuatu! (Respon setuju atas ajakan).",
                rules: "Bentuk positif yang tegas untuk memulai aksi.",
                usage: "Sopan (Ajakan/Persetujuan).",
                examples: [
                    { jp: "ちょっと休みましょう。", id: "Ayo istirahat sebentar." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab7": {
        title: "Bab 7: Alat & Memberi-Menerima (De / Agemasu)",
        patterns: [
            {
                id: "7.1",
                label: "KB (Alat/Bahasa) de KK",
                desc: "Menunjukkan sarana atau alat untuk melakukan sesuatu.",
                rules: "Bisa berupa bahasa (Nihongo de) atau benda (Hashi de).",
                usage: "Keterangan cara.",
                examples: [
                    { jp: "はしで食べます。", id: "Makan dengan sumpit." },
                    { jp: "日本語でレポートを書きます。", id: "Menulis laporan dalam bahasa Jepang." }
                ]
            },
            {
                id: "7.2",
                label: "KB1 (Orang) ni KB2 wo Agemasu",
                desc: "Memberikan sesuatu (KB2) kepada seseorang (KB1).",
                rules: "Penerima ditandai dengan partikel に (ni).",
                usage: "Arah pemberian.",
                examples: [
                    { jp: "木村さんに花をあげました。", id: "Sudah memberikan bunga kepada Sdr. Kimura." }
                ]
            },
            {
                id: "7.3",
                label: "KB1 (Orang) ni KB2 wo Moraimasu",
                desc: "Menerima sesuatu (KB2) dari seseorang (KB1).",
                rules: "Bisa menggunakan に (ni) atau から (kara) untuk menunjukkan sumber.",
                usage: "Penerimaan.",
                examples: [
                    { jp: "山田さんにプレゼントをもらいました。", id: "Mendapat hadiah dari Sdr. Yamada." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab8": {
        title: "Bab 8: Kata Sifat (I-Adjective & Na-Adjective)",
        patterns: [
            {
                id: "8.1",
                label: "Na-Keiyoushi (desu / ja arimasen)",
                desc: "Kata sifat yang membutuhkan 'Na' jika menempel pada kata benda.",
                rules: "Negatif: Hima ja arimasen. Gabung benda: Kirei NA hito.",
                usage: "Sopan.",
                examples: [
                    { jp: "この町は静かです。", id: "Kota ini sepi." },
                    { jp: "ワットさんは親切な先生です。", id: "Sdr. Watt adalah guru yang ramah." }
                ]
            },
            {
                id: "8.2",
                label: "I-Keiyoushi (desu / ~kunai desu)",
                desc: "Kata sifat yang berakhiran 'i'.",
                rules: "Negatif: Akhiran 'i' diganti 'kunai'. (Samui -> Samukunai).",
                usage: "Sopan.",
                examples: [
                    { jp: "富士山は高いです。", id: "Gunung Fuji tinggi." },
                    { jp: "この料理はあまり辛くないです。", id: "Masakan ini tidak begitu pedas." }
                ]
            }
        ]
    }
});
