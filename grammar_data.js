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
