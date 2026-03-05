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
Object.assign(grammarData, {
    "bab9": {
        title: "Bab 9: Suka, Bisa, & Partikel 'Ga'",
        patterns: [
            {
                id: "9.1",
                label: "KB ga Suki / Kirai / Jouzu / Heta desu",
                desc: "Menyatakan kesukaan, ketidaksukaan, kemahiran, atau ketidakterampilan.",
                rules: "Objek ditandai dengan partikel が (ga), bukan を (wo).",
                usage: "Sopan. Heta/Kirai sebaiknya digunakan hati-hati agar tidak menyinggung.",
                examples: [
                    { jp: "私はイタリア料理が好きです。", id: "Saya suka masakan Italia." },
                    { jp: "サントスさんは絵が上手です。", id: "Sdr. Santos pandai menggambar." }
                ]
            },
            {
                id: "9.2",
                label: "KB ga Wakarimasu / Arimasu",
                desc: "Menyatakan pemahaman atau kepemilikan benda mati.",
                rules: "Wakarimasu (Paham), Arimasu (Ada/Punya). Gunakan partikel が (ga).",
                usage: "Sopan.",
                examples: [
                    { jp: "英語がわかりますか。", id: "Apakah kamu paham bahasa Inggris?" },
                    { jp: "お金がありますか。", id: "Apakah kamu punya uang?" }
                ]
            },
            {
                id: "9.3",
                label: "Karashiki (Alasan), Kekka (Akibat)",
                desc: "Menyatakan alasan atau sebab.",
                rules: "Kalimat Alasan + から (kara), + Kalimat Akibat.",
                usage: "Standar. Bisa diletakkan di akhir kalimat untuk menjawab 'Doushite' (Kenapa).",
                examples: [
                    { jp: "時間がありませんから、タクシーで行きます。", id: "Karena tidak ada waktu, saya pergi dengan taksi." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab10": {
        title: "Bab 10: Keberadaan (Arimasu / Imasu)",
        patterns: [
            {
                id: "10.1",
                label: "KB (Tempat) ni KB (Benda/Orang) ga Arimasu / Imasu",
                desc: "Menyatakan keberadaan di suatu tempat.",
                rules: "Arimasu (Benda mati/Tanaman), Imasu (Orang/Hewan). Tempat + に (ni).",
                usage: "Sopan.",
                examples: [
                    { jp: "机の上に本があります。", id: "Di atas meja ada buku." },
                    { jp: "あそこに男の人がいます。", id: "Di sana ada laki-laki." }
                ]
            },
            {
                id: "10.2",
                label: "KB (Benda/Orang) wa KB (Tempat) ni Arimasu / Imasu",
                desc: "Menyatakan lokasi dari subjek yang sudah diketahui.",
                rules: "Subjek + は (wa) + Tempat + に (ni) + Arimasu/Imasu.",
                usage: "Sopan.",
                examples: [
                    { jp: "ミラーさんは事務所にいます。", id: "Sdr. Miller ada di kantor." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab11": {
        title: "Bab 11: Bilangan & Kuantitas (Josuushi)",
        patterns: [
            {
                id: "11.1",
                label: "Kata Bilangan (Kuantitas)",
                desc: "Cara meletakkan jumlah dalam kalimat.",
                rules: "Biasanya diletakkan tepat sebelum kata kerja, tanpa partikel.",
                usage: "Standar.",
                examples: [
                    { jp: "りんごを４つ買いました。", id: "Saya membeli 4 buah apel." },
                    { jp: "学生が５人います。", id: "Ada 5 orang siswa." }
                ]
            },
            {
                id: "11.2",
                label: "Kikan (Jangka Waktu)",
                desc: "Menyatakan berapa lama suatu kegiatan dilakukan.",
                rules: "Gunakan ~jikan (jam), ~shuukan (minggu), ~kagetsu (bulan), ~nen (tahun).",
                usage: "Sopan.",
                examples: [
                    { jp: "国で２ヶ月日本語を勉強しました。", id: "Belajar bahasa Jepang di negara asal selama 2 bulan." }
                ]
            },
            {
                id: "11.3",
                label: "Dake (Hanya)",
                desc: "Membatasi jumlah atau benda.",
                rules: "Diletakkan setelah kata bilangan atau kata benda.",
                usage: "Standar.",
                examples: [
                    { jp: "休みは日曜日だけです。", id: "Liburnya hanya hari Minggu saja." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab12": {
        title: "Bab 12: Perbandingan (Lebih & Paling)",
        patterns: [
            {
                id: "12.1",
                label: "KB1 wa KB2 yori (Kata Sifat) desu",
                desc: "KB1 lebih (Kata Sifat) daripada KB2.",
                rules: "KB2 adalah pembandingnya (Yori = Daripada).",
                usage: "Sopan.",
                examples: [
                    { jp: "この車はあの車より速いです。", id: "Mobil ini lebih cepat daripada mobil itu." }
                ]
            },
            {
                id: "12.2",
                label: "KB1 to KB2 to dochira ga (Kata Sifat) desu ka",
                desc: "Membandingkan dua pilihan (Mana yang lebih...?).",
                rules: "Jawaban: KB1 no hou ga (Kata Sifat) desu.",
                usage: "Sopan.",
                examples: [
                    { jp: "コーヒーと紅茶とどちらが好きですか。", id: "Antara kopi dan teh, mana yang lebih kamu suka?" }
                ]
            },
            {
                id: "12.3",
                label: "KB (Kelompok) de nani/dore/itsu ga ichiban (Kata Sifat) desu ka",
                desc: "Menyatakan yang 'Paling' dalam suatu lingkup/kelompok.",
                rules: "Ichiban (Nomor satu/Paling).",
                usage: "Sopan.",
                examples: [
                    { jp: "一年でいつが一番寒いですか。", id: "Dalam setahun, kapan yang paling dingin?" },
                    { jp: "家族で父が一番背が高いです。", id: "Di keluarga, ayah yang paling tinggi." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab13": {
        title: "Bab 13: Keinginan (Hoshii & Tai)",
        patterns: [
            {
                id: "13.1",
                label: "KB ga Hoshii desu",
                desc: "Ingin (memiliki) suatu benda.",
                rules: "Objek keinginan menggunakan partikel が (ga).",
                usage: "Sopan. Digunakan untuk keinginan diri sendiri.",
                examples: [
                    { jp: "私は新しいパソコンが欲しいです。", id: "Saya ingin (punya) laptop baru." }
                ]
            },
            {
                id: "13.2",
                label: "KK (Masu-kei) + Tai desu",
                desc: "Ingin melakukan suatu tindakan.",
                rules: "Hilangkan ~masu, ganti dengan ~tai. (Iki-masu -> Iki-tai).",
                usage: "Sopan.",
                examples: [
                    { jp: "日本へ行きたいです。", id: "Saya ingin pergi ke Jepang." },
                    { jp: "喉が渇きましたから、水を飲みたいです。", id: "Karena haus, saya ingin minum air." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab14": {
        title: "Bab 14: Bentuk TE & Perintah Halus",
        patterns: [
            {
                id: "14.1",
                label: "KK-te kudasai",
                desc: "Tolong lakukan (Perintah halus/Permohonan).",
                rules: "Gunakan KK bentuk TE + ください (kudasai).",
                usage: "Sopan.",
                examples: [
                    { jp: "すみませんが、漢字を教えてください。", id: "Maaf, tolong ajarkan saya kanji." }
                ]
            },
            {
                id: "14.2",
                label: "KK-te imasu",
                desc: "Sedang melakukan sesuatu (Present Continuous).",
                rules: "Bentuk TE + います (imasu).",
                usage: "Sopan.",
                examples: [
                    { jp: "今、雨が降っています。", id: "Sekarang sedang turun hujan." },
                    { jp: "ミラーさんは今、電話をかけています。", id: "Sdr. Miller sekarang sedang menelepon." }
                ]
            },
            {
                id: "14.3",
                label: "KK (Masu-kei) mashou ka",
                desc: "Menawarkan bantuan (Bagaimana kalau saya bantu...?).",
                rules: "Berbeda dengan 'Mashou' (Ayo), ini adalah tawaran bantuan.",
                usage: "Sangat Sopan.",
                examples: [
                    { jp: "荷物を持ちましょうか。", id: "Bagaimana kalau saya bawakan barangnya?" }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab15": {
        title: "Bab 15: Izin & Status (Te mo ii / Te wa ikemasen)",
        patterns: [
            {
                id: "15.1",
                label: "KK-te mo ii desu ka",
                desc: "Meminta izin (Bolehkah saya...?).",
                rules: "KK Bentuk TE + もいいです (mo ii desu).",
                usage: "Sopan.",
                examples: [
                    { jp: "ここで写真を撮ってもいいですか。", id: "Bolehkah mengambil foto di sini?" }
                ]
            },
            {
                id: "15.2",
                label: "KK-te wa ikemasen",
                desc: "Larangan (Tidak boleh... / Dilarang...).",
                rules: "KK Bentuk TE + は いけません (wa ikemasen).",
                usage: "Sopan tapi tegas (Instruksi/Aturan).",
                examples: [
                    { jp: "ここでタバコを吸ってはいけません。", id: "Tidak boleh merokok di sini." }
                ]
            },
            {
                id: "15.3",
                label: "KK-te imasu (Status/Pekerjaan)",
                desc: "Menyatakan keadaan yang menetap atau kebiasaan.",
                rules: "Digunakan untuk: Tempat tinggal (Sunde imasu), Menikah (Kekkon shite imasu), Mengenal (Shitte imasu).",
                usage: "Sopan.",
                examples: [
                    { jp: "私は大阪に住んでいます。", id: "Saya tinggal di Osaka." },
                    { jp: "ミラーさんはIMCで働いています。", id: "Sdr. Miller bekerja di IMC." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab16": {
        title: "Bab 16: Menyambung Kalimat (Te-form Connection)",
        patterns: [
            {
                id: "16.1",
                label: "KK1-te, KK2-te, KK3-masu",
                desc: "Urutan kegiatan yang dilakukan berurutan.",
                rules: "Kata kerja sebelumnya diubah ke bentuk TE, kata kerja terakhir menentukan waktu (Lampau/Tidak).",
                usage: "Narasi kegiatan.",
                examples: [
                    { jp: "朝起きて、シャワーを浴びて、学校へ行きます。", id: "Pagi bangun, mandi, lalu pergi ke sekolah." }
                ]
            },
            {
                id: "16.2",
                label: "KS-i (~kute) / KS-na (~de) / KB (~de)",
                desc: "Menyambung dua atau lebih kata sifat/kata benda.",
                rules: "I-adj: hapus 'i' ganti 'kute'. Na-adj/KB: tambah 'de'.",
                usage: "Deskripsi.",
                examples: [
                    { jp: "この部屋は広くて、明るいです。", id: "Kamar ini luas dan terang." },
                    { jp: "ミラーさんは若くて、親切です。", id: "Sdr. Miller muda dan ramah." }
                ]
            },
            {
                id: "16.3",
                label: "KK1-te kara, KK2-masu",
                desc: "Setelah melakukan KK1, baru melakukan KK2.",
                rules: "Menekankan urutan waktu yang pasti.",
                usage: "Sopan.",
                examples: [
                    { jp: "仕事が終わってから、飲みに行きましょう。", id: "Setelah pekerjaan selesai, mari pergi minum." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab17": {
        title: "Bab 17: Bentuk NAI (Larangan & Keharusan)",
        patterns: [
            {
                id: "17.1",
                label: "KK-nai de kudasai",
                desc: "Tolong jangan... (Larangan halus).",
                rules: "KK Bentuk NAI + でください (de kudasai).",
                usage: "Sopan.",
                examples: [
                    { jp: "ここで写真を撮らないでください。", id: "Tolong jangan ambil foto di sini." }
                ]
            },
            {
                id: "17.2",
                label: "KK-nakereba narimasen",
                desc: "Harus melakukan sesuatu.",
                rules: "KK Bentuk NAI (hapus 'i') + ければなりません (kereba narimasen).",
                usage: "Kewajiban/Sopan.",
                examples: [
                    { jp: "薬を飲まなければなりません。", id: "Harus minum obat." }
                ]
            },
            {
                id: "17.3",
                label: "KK-nakute mo ii desu",
                desc: "Tidak harus / Tidak perlu melakukan sesuatu.",
                rules: "KK Bentuk NAI (hapus 'i') + くてもいいです (kute mo ii desu).",
                usage: "Pemberian kelonggaran.",
                examples: [
                    { jp: "明日は来なくてもいいです。", id: "Besok tidak perlu datang juga tidak apa-apa." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab18": {
        title: "Bab 18: Bentuk Kamus (Kemampuan & Hobi)",
        patterns: [
            {
                id: "18.1",
                label: "KK (Jishokei) koto ga dekimasu",
                desc: "Menyatakan kemampuan melakukan sesuatu.",
                rules: "KK Jishokei + こと (koto) + ができます (ga dekimasu).",
                usage: "Sopan. 'Koto' mengubah kata kerja menjadi kata benda.",
                examples: [
                    { jp: "ミラーさんは漢字を読むことができます。", id: "Sdr. Miller bisa membaca kanji." },
                    { jp: "カードで払うことができます。", id: "Bisa membayar dengan kartu." }
                ]
            },
            {
                id: "18.2",
                label: "Watashi no shumi wa KK (Jishokei) koto desu",
                desc: "Menyatakan hobi/kegemaran.",
                rules: "Subjek + は + KK Jishokei + ことです (koto desu).",
                usage: "Sopan.",
                examples: [
                    { jp: "私の趣味は音楽を聞くことです。", id: "Hobi saya adalah mendengarkan musik." }
                ]
            },
            {
                id: "18.3",
                label: "KK1 (Jishokei) mae ni, KK2",
                desc: "Melakukan KK1 sebelum KK2.",
                rules: "KK1 Jishokei + まえに (mae ni) + KK2.",
                usage: "Urutan waktu.",
                examples: [
                    { jp: "寝る前に、日記を書きます。", id: "Sebelum tidur, menulis buku harian." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab19": {
        title: "Bab 19: Bentuk TA (Pengalaman & Saran)",
        patterns: [
            {
                id: "19.1",
                label: "KK-ta koto ga arimasu",
                desc: "Menyatakan pengalaman (Pernah...).",
                rules: "KK Bentuk TA + ことがあります (koto ga arimasu).",
                usage: "Sopan.",
                examples: [
                    { jp: "北海道へ行ったことがあります。", id: "Pernah pergi ke Hokkaido." },
                    { jp: "馬に乗ったことがあります。", id: "Pernah naik kuda." }
                ]
            },
            {
                id: "19.2",
                label: "KK1-tari, KK2-tari shimasu",
                desc: "Menyebutkan beberapa kegiatan secara acak (Tidak berurutan).",
                rules: "KK1-ta(ri) + KK2-ta(ri) + します (shimasu).",
                usage: "Berbeda dengan 'Te, Te' (berurutan), Tari-tari tidak harus urut.",
                examples: [
                    { jp: "日曜日はテニスをしたり、買い物をしたりします。", id: "Hari Minggu main tenis, belanja, dsb." }
                ]
            },
            {
                id: "19.3",
                label: "KK-ta hou ga ii desu",
                desc: "Memberikan saran (Sebaiknya...).",
                rules: "KK Bentuk TA + ほうがいいです (hou ga ii desu).",
                usage: "Sopan (Memberi nasihat).",
                examples: [
                    { jp: "毎日運動したほうがいいです。", id: "Sebaiknya berolahraga setiap hari." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab20": {
        title: "Bab 20: Bahasa Kasual (Futsuu-tai)",
        patterns: [
            {
                id: "20.1",
                label: "Bentuk Biasa (Futsuu-kei)",
                desc: "Mengubah pola sopan (~masu/desu) menjadi kasual.",
                rules: "Iku (Ikimasu), Ikanai (Ikimasen), Itta (Ikimashita), Ittanai (Ikimasendeshita).",
                usage: "Digunakan kepada teman, keluarga, atau bawahan.",
                examples: [
                    { jp: "ご飯、食べる？", id: "Makan nasi? (Sopan: Tabemasu ka?)" },
                    { jp: "明日、暇？", id: "Besok luang? (Sopan: Hima desu ka?)" }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab21": {
        title: "Bab 21: Pendapat & Kutipan (To Omoimasu / To Iimasu)",
        patterns: [
            {
                id: "21.1",
                label: "Futsuu-kei + to omoimasu",
                desc: "Saya rasa / Menurut saya...",
                rules: "Gunakan Bentuk Biasa (Futsuu-kei) sebelum と思います.",
                usage: "Menyatakan opini.",
                examples: [
                    { jp: "日本は物価が高いと思います。", id: "Menurut saya harga barang di Jepang mahal." }
                ]
            },
            {
                id: "21.2",
                label: "Futsuu-kei + to iimashita",
                desc: "Berkata bahwa... (Kutipan tidak langsung).",
                rules: "Menyampaikan pesan orang lain.",
                usage: "Laporan informasi.",
                examples: [
                    { jp: "ミラーさんは「明日休みます」と言いました。", id: "Sdr. Miller berkata 'Besok saya libur'." }
                ]
            }
        ]
    },
    "bab22": {
        title: "Bab 22: Kalimat Modifikasi (Meishi Shuushoku)",
        patterns: [
            {
                id: "22.1",
                label: "KK (Futsuu-kei) + Kata Benda",
                desc: "Menjelaskan kata benda menggunakan kalimat.",
                rules: "Kalimat penjelas diletakkan di DEPAN kata benda.",
                usage: "Sangat penting untuk deskripsi detail.",
                examples: [
                    { jp: "これは私が撮った写真です。", id: "Ini adalah foto yang SAYA POTRET." },
                    { jp: "あそこにいる人は
                        ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab23": {
        title: "Bab 23: Waktu Kejadian (Toki / To)",
        patterns: [
            {
                id: "23.1",
                label: "KK (Jishokei) + Toki",
                desc: "Saat / Ketika melakukan sesuatu.",
                rules: "Bisa digunakan untuk KK, KS, maupun KB.",
                usage: "Keterangan waktu.",
                examples: [
                    { jp: "図書館で本を借りる時、カードがいります。", id: "Saat meminjam buku di perpus, butuh kartu." }
                ]
            }
        ]
    },
    "bab24": {
        title: "Bab 24: Pemberian Jasa (Te-agemasu / Te-moraimasu)",
        patterns: [
            {
                id: "24.1",
                label: "KK-te agemasu / moraimasu / kuremasu",
                desc: "Melakukan sesuatu demi kebaikan orang lain.",
                rules: "Kuremasu: Orang lain melakukan sesuatu untuk SAYA.",
                usage: "Budaya kesopanan Jepang.",
                examples: [
                    { jp: "私は佐藤さんに傘を貸してあげました。", id: "Saya meminjamkan payung kepada Sdr. Sato (sebagai bantuan)." },
                    { jp: "母は私にセーターを送ってくれました。", id: "Ibu mengirimkan sweter untuk saya." }
                ]
            }
        ]
    }
});
Object.assign(grammarData, {
    "bab25": {
        title: "Bab 25: Pengandaian (Tara / Te mo)",
        patterns: [
            {
                id: "25.1",
                label: "KK-ta + ra (Tara)",
                desc: "Kalau... / Jika... (Kondisional).",
                rules: "Bentuk Lampau (Ta-kei) + ら (ra).",
                usage: "Pengandaian.",
                examples: [
                    { jp: "お金があったら、旅行します。", id: "Kalau punya uang, saya akan jalan-jalan." }
                ]
            },
            {
                id: "25.2",
                label: "KK-te mo / KS-kute mo",
                desc: "Walaupun... / Meskipun...",
                rules: "Bentuk TE + も (mo).",
                usage: "Kontras.",
                examples: [
                    { jp: "雨が降っても、出かけます。", id: "Meskipun hujan turun, saya akan pergi keluar." }
                ]
            }
        ]
    }
});
