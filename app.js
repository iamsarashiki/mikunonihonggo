let swiperInstance = null;

// 1. Render Daftar Bab 1-25
function initSidebar() {
    const list = document.getElementById('chapter-list');
    for (let i = 1; i <= 25; i++) {
        const item = document.createElement('div');
        item.className = 'chapter-item';
        item.innerText = `BAB ${i}: ${grammarData['bab' + i]?.title.split(':')[1] || 'Materi'}`;
        item.onclick = () => selectChapter(i, item);
        list.appendChild(item);
    }
}

// 2. Pilih Bab & Render Slider
function selectChapter(num, element) {
    // Update UI Sidebar
    document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    const chapterKey = 'bab' + num;
    const data = grammarData[chapterKey];
    const wrapper = document.getElementById('pattern-slider');
    wrapper.innerHTML = ''; // Clear slider

    if (data) {
        data.patterns.forEach(p => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div style="color:var(--miku-cyan); font-family:Orbitron; margin-bottom:15px;">${p.label}</div>
                <p style="font-size:0.9rem; line-height:1.4; color:#ccc;">${p.desc}</p>
                <div style="margin-top:20px; border-top:1px solid #333; paddingTop:10px;">
                    <small style="color:var(--miku-pink)">CONTOH:</small>
                    <p style="font-style:italic; font-size:0.85rem; margin-top:5px;">${p.examples[0].jp}</p>
                </div>
                // Di dalam loop data.patterns.forEach(p => { ...
// Ganti bagian button menjadi:
<button class="btn-learn-more" onclick="openDeepDive('${p.id}')" style="margin-top:auto; padding:10px; border:1px solid var(--miku-cyan); background:transparent; color:white; cursor:pointer;">DETAIL_DATA</button>            `;
            wrapper.appendChild(slide);
        });

        // Re-init Swiper
        if (swiperInstance) swiperInstance.destroy();
        swiperInstance = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: { rotate: 30, stretch: 0, depth: 100, modifier: 1, slideShadows: false },
            pagination: { el: ".swiper-pagination", clickable: true }
        });

        // Feedback Audio Palsu
        document.getElementById('now-playing').innerText = `SYNCING: ${data.title}...`;
    }
}

// Init App
window.onload = () => {
    initSidebar();
    // Simulasi Progress Bar
    setInterval(() => {
        const fill = document.getElementById('progress-bar');
        let w = parseInt(fill.style.width) || 30;
        fill.style.width = (w >= 100 ? 0 : w + 0.5) + "%";
    }, 100);
};

function exportData() {
    alert("SYSTEM: Data N4 Protocol disalin ke Clipboard!");
}
// Fungsi untuk membuka Detail Data
function openDeepDive(id) {
    const modal = document.getElementById('detail-modal');
    const responseContainer = document.getElementById('ai-response');
    const loading = document.getElementById('ai-loading');
    
    // Cari data berdasarkan ID
    let selectedPattern = null;
    for (let key in grammarData) {
        selectedPattern = grammarData[key].patterns.find(p => p.id === id);
        if (selectedPattern) break;
    }

    if (!selectedPattern) return;

    modal.style.display = 'flex';
    responseContainer.innerHTML = '';
    loading.classList.remove('hidden');

    // Simulasi AI Berpikir
    setTimeout(() => {
        loading.classList.add('hidden');
        
        // Teks penjelasan yang akan di-"ketik" oleh AI
        const fullAnalysis = `
            [SYSTEM_REPORT]: Pola ${selectedPattern.label} terdeteksi.<br><br>
            <strong>PENGGUNAAN:</strong> ${selectedPattern.usage}<br>
            <strong>STRUKTUR:</strong> ${selectedPattern.rules}<br><br>
            <strong>ANALISIS_AI:</strong><br>
            Pola ini sangat krusial untuk level N4. Dalam konteks percakapan di Jepang, gunakan pola ini untuk ${selectedPattern.desc.toLowerCase()}. <br><br>
            <strong>CONTOH_KALIMAT:</strong><br>
            1. ${selectedPattern.examples[0].jp}<br>
            (${selectedPattern.examples[0].id})<br><br>
            <em>Catatan Sarashiki: Pastikan intonasi tepat agar terdengar natural bagi penutur asli.</em>
        `;

        typeWriterEffect(responseContainer, fullAnalysis);
    }, 1200);
}

// Fungsi Efek Mengetik AI
function typeWriterEffect(element, text) {
    let i = 0;
    element.innerHTML = "";
    
    function typing() {
        if (i < text.length) {
            // Jika bertemu tag HTML, lompat ke akhir tag
            if (text.charAt(i) === '<') {
                i = text.indexOf('>', i) + 1;
            } else {
                i++;
            }
            element.innerHTML = text.substring(0, i);
            setTimeout(typing, 5); // Kecepatan mengetik
        }
    }
    typing();
}

function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}






// Database Kosakata N4 untuk Simulasi AI
const aiVocab = {
    subjects: ["Watashi", "Tanaka-san", "Miku-chan", "Kazoku", "Tomodachi"],
    objects: ["Nihongo", "Sushi", "Ongaku", "Anime", "Uta", "Hon"],
    places: ["Tokyo", "Osaka", "Gakkou", "Umi", "Kouen"],
    verbs: ["mimasu", "tabemasu", "kikimasu", "ikimasu", "benkyou shimasu"]
};

let currentActivePattern = null;

function openDeepDive(id) {
    const modal = document.getElementById('detail-modal');
    const response = document.getElementById('ai-response');
    const genContainer = document.getElementById('ai-generated-container');
    
    // Cari data pola
    for (let k in grammarData) {
        currentActivePattern = grammarData[k].patterns.find(p => p.id === id);
        if (currentActivePattern) break;
    }

    modal.style.display = 'flex';
    genContainer.innerHTML = ''; // Reset kalimat otomatis sebelumnya
    
    // Tampilkan analisis dasar
    response.innerHTML = `
        <h4 style="color:var(--miku-cyan)">[POLA: ${currentActivePattern.label}]</h4>
        <p style="margin:10px 0;">${currentActivePattern.desc}</p>
        <div style="font-size:0.8rem; color:#888;">RULES: ${currentActivePattern.rules}</div>
    `;

    // Set fungsi tombol AI
    document.getElementById('gen-btn-ai').onclick = () => generateAISentence();
}

// FUNGSI UTAMA: AI GENERATOR AUTOMATIC
function generateAISentence() {
    const container = document.getElementById('ai-generated-container');
    const s = aiVocab.subjects[Math.floor(Math.random() * aiVocab.subjects.length)];
    const o = aiVocab.objects[Math.floor(Math.random() * aiVocab.objects.length)];
    const v = aiVocab.verbs[Math.floor(Math.random() * aiVocab.verbs.length)];
    
    // Simulasi pembuatan pola berdasarkan partikel
    let resultJp = "";
    let resultId = "";

    // Logika cerdas sederhana: Menyesuaikan partikel dengan pola yang dipilih
    if (currentActivePattern.label.includes("wa")) {
        resultJp = `${s} wa ${o} ga suki desu.`;
        resultId = `${s} suka ${o.toLowerCase()}.`;
    } else if (currentActivePattern.label.includes("ni")) {
        const p = aiVocab.places[Math.floor(Math.random() * aiVocab.places.length)];
        resultJp = `${s} wa ${p} ni ikimasu.`;
        resultId = `${s} pergi ke ${p.toLowerCase()}.`;
    } else {
        resultJp = `${s} wa ${o} o ${v}.`;
        resultId = `${s} sedang ${v.replace('masu', '')} ${o.toLowerCase()}.`;
    }

    // Render ke UI
    const div = document.createElement('div');
    div.className = 'new-ai-sentence';
    div.innerHTML = `
        <small style="color:var(--miku-pink)">[AI_GENERATED_DATA]</small>
        <p style="font-size:0.9rem; margin-top:5px;"><strong>${resultJp}</strong></p>
        <p style="font-size:0.8rem; color:#aaa;">(${resultId})</p>
    `;
    
    // Selalu taruh yang terbaru di atas
    container.insertBefore(div, container.firstChild);
}

