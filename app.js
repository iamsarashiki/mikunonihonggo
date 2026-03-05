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





// 1. Fungsi Navigasi Halaman
function showPage(pageId) {
    document.querySelectorAll('.sub-page, .swiper').forEach(el => el.classList.add('hidden'));
    
    if (pageId === 'generator') {
        document.getElementById('page-generator').classList.remove('hidden');
        populateBabSelect();
    } else {
        document.querySelector('.swiper').classList.remove('hidden');
    }
}

// 2. Isi Dropdown Bab
function populateBabSelect() {
    const select = document.getElementById('select-bab-gen');
    if (select.children.length > 0) return;
    
    for (let i = 1; i <= 25; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerText = `DATABASE BAB ${i}`;
        select.appendChild(opt);
    }
}

// 3. Fungsi Utama: Olah Data Website ke Pola Baru
function generateNewBatch() {
    const babNum = document.getElementById('select-bab-gen').value;
    const grid = document.getElementById('ai-result-grid');
    const sourceData = grammarData['bab' + babNum];

    if (!sourceData) return alert("SYSTEM: Data Bab belum ter-sinkronisasi.");

    grid.innerHTML = '<p style="color:var(--miku-cyan)">PROCESSING_ALGORITHM... Please Wait.</p>';

    // Simulasi AI sedang mengolah data website
    setTimeout(() => {
        grid.innerHTML = '';
        
        // Ambil setiap pola dari data asli, lalu olah
        sourceData.patterns.forEach(p => {
            const newVariation = createAIVariation(p);
            
            const card = document.createElement('div');
            card.className = 'ai-card';
            card.innerHTML = `
                <div style="font-size: 0.6rem; color: var(--miku-pink); font-family: Orbitron; margin-bottom: 10px;">[AI_RECONSTRUCTED_FROM_BAB_${babNum}]</div>
                <h4 style="color:var(--miku-cyan); margin-bottom:10px;">${p.label} (New Context)</h4>
                <p style="font-size: 0.9rem; line-height: 1.5; margin-bottom:15px;">${newVariation.explanation}</p>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 4px;">
                    <p style="font-weight: bold; color: #fff;">${newVariation.japanese}</p>
                    <p style="font-size: 0.8rem; color: #888;">${newVariation.indonesia}</p>
                </div>
            `;
            grid.appendChild(card);
        });
        
        document.getElementById('now-playing').innerText = `AI_GEN: ${sourceData.title} processed.`;
    }, 1200);
}

// 4. Algoritma Variasi Kalimat
function createAIVariation(pattern) {
    const subjects = ["Miku", "Rizal-san", "Afif-san", "Sensei", "Kareshi"];
    const actions = ["Tokyo e iku", "Sushi o taberu", "Nihongo o benkyou suru", "Uta o utau"];
    
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const a = actions[Math.floor(Math.random() * actions.length)];
    
    // Logika pengolahan data mentah ke pola baru
    return {
        explanation: `Dalam konteks baru ini, ${pattern.label} digunakan oleh AI untuk memberikan penekanan pada aktivitas ${s}.`,
        japanese: `${s} wa ${a} ${pattern.label.includes('n desu') ? 'n desu' : 'koto ga dekimasu'}.`,
        indonesia: `(AI) ${s} benar-benar akan ${a.toLowerCase()} menggunakan pola ini.`
    };
}
