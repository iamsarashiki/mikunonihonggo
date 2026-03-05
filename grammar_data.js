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
