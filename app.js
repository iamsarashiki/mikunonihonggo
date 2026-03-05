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



// 1. Fungsi Utama di Halaman Generator
function generateNewBatch() {
    const babNum = document.getElementById('select-bab-gen').value;
    const grid = document.getElementById('ai-result-grid');
    const sourceData = grammarData['bab' + babNum];

    if (!sourceData) return;

    grid.innerHTML = '<p class="blink">PROCESSING_ALGORITHM...</p>';

    setTimeout(() => {
        grid.innerHTML = '';
        sourceData.patterns.forEach(p => {
            const card = document.createElement('div');
            card.className = 'ai-card';
            card.innerHTML = `
                <div style="font-size: 0.6rem; color: var(--miku-pink); font-family: Orbitron;">[SOURCE: BAB_${babNum}]</div>
                <h4 style="color:var(--miku-cyan); margin: 10px 0;">${p.label}</h4>
                <button onclick="openAIPopup('${p.id}')" class="btn-ai-gen" style="width:100%">ANALYZE_STRUCTURE [AI]</button>
            `;
            grid.appendChild(card);
        });
    }, 800);
}

// 2. Fungsi Pop-up Analisis Mendalam
function openAIPopup(patternId) {
    const modal = document.getElementById('detail-modal');
    const response = document.getElementById('ai-response');
    const loading = document.getElementById('ai-loading');
    
    modal.style.display = 'flex';
    loading.classList.remove('hidden');
    response.innerHTML = '';

    // Cari data pola
    let p = null;
    for (let k in grammarData) {
        p = grammarData[k].patterns.find(item => item.id === patternId);
        if (p) break;
    }

    // Simulasi AI Berpikir (Analisis Partikel)
    setTimeout(() => {
        loading.classList.add('hidden');
        
        // Logika Analisis Partikel Otomatis
        let particleNote = "Partikel ini berfungsi sebagai penanda objek atau arah sesuai konteks kalimat.";
        if (p.label.includes("ni")) {
            particleNote = "Penggunaan partikel <span class='particle-highlight'>ni</span> di sini menunjukkan titik tujuan spesifik atau waktu tetap. Berbeda dengan 'e' yang lebih fokus ke arah perjalanan.";
        } else if (p.label.includes("de")) {
            particleNote = "Partikel <span class='particle-highlight'>de</span> digunakan karena menunjukkan tempat terjadinya suatu aktivitas aktif atau alat yang digunakan.";
        } else if (p.label.includes("ga")) {
            particleNote = "Partikel <span class='particle-highlight'>ga</span> digunakan untuk memberikan penekanan pada subjek atau menyatakan kemampuan/keinginan.";
        }

        const subjects = ["Miku", "Rizal-san", "Sensei", "Kareshi"];
        const s = subjects[Math.floor(Math.random() * subjects.length)];

        response.innerHTML = `
            <div class="ai-deep-dive">
                <h3 style="color:var(--miku-cyan); font-family:Orbitron; border-bottom:1px solid #333; padding-bottom:5px;">${p.label}</h3>
                <p style="margin:15px 0; font-size:0.95rem;">${p.desc}</p>
                
                <div class="new-ai-sentence">
                    <small style="color:var(--miku-pink)">[NEW_GENERATED_EXAMPLE]</small>
                    <p style="font-weight:bold; font-size:1.1rem; margin-top:5px;">${s} wa Nihongo no benkyou <span class="particle-highlight">${p.label}</span>.</p>
                </div>

                <div class="particle-analysis">
                    <strong style="color:var(--miku-cyan)">[PARTICLE_LOGIC]:</strong><br>
                    ${particleNote}
                </div>

                <div style="margin-top:15px; font-size:0.8rem; color:#666;">
                    *Perubahan bentuk kata kerja mengikuti aturan: <br> ${p.rules}
                </div>
            </div>
        `;
    }, 1200);
}



// 1. Cek Jumlah Pola Saat Bab Dipilih
function checkPatternCount() {
    const babNum = document.getElementById('select-bab-gen').value;
    const data = grammarData['bab' + babNum];
    const btnAdv = document.getElementById('btn-advanced');
    const advBox = document.getElementById('advanced-pattern-list');
    
    // Reset View
    advBox.classList.add('hidden');
    
    if (data && data.patterns.length > 1) {
        btnAdv.classList.remove('hidden'); // Munculkan tombol Lanjutan
        renderPatternCheckboxes(data.patterns);
    } else {
        btnAdv.classList.add('hidden'); // Sembunyikan jika pola cuma 1 atau 0
    }
}

// 2. Render Daftar Checkbox Pola
function renderPatternCheckboxes(patterns) {
    const container = document.getElementById('checkbox-container');
    container.innerHTML = '';
    
    patterns.forEach(p => {
        const label = document.createElement('label');
        label.className = 'checkbox-item';
        label.innerHTML = `
            <input type="checkbox" value="${p.id}" class="pattern-checkbox" checked>
            <span>${p.label}</span>
        `;
        container.appendChild(label);
    });
}

function toggleAdvancedOptions() {
    document.getElementById('advanced-pattern-list').classList.toggle('hidden');
}

// 3. Fungsi Generate yang Sudah Difilter
function generateNewBatch() {
    const babNum = document.getElementById('select-bab-gen').value;
    const grid = document.getElementById('ai-result-grid');
    const sourceData = grammarData['bab' + babNum];
    
    // Ambil ID pola yang dicentang saja
    const selectedIds = Array.from(document.querySelectorAll('.pattern-checkbox:checked')).map(cb => cb.value);

    if (!sourceData) return;
    
    grid.innerHTML = '<p class="blink">FILTERING_DATA...</p>';

    setTimeout(() => {
        grid.innerHTML = '';
        
        // Filter pola berdasarkan pilihan user
        const filteredPatterns = sourceData.patterns.filter(p => {
            // Jika tidak ada pilihan lanjutan (tombol sembunyi), ambil semua. 
            // Jika ada pilihan, ambil yang dicentang.
            return selectedIds.length === 0 ? true : selectedIds.includes(p.id);
        });

        filteredPatterns.forEach(p => {
            const card = document.createElement('div');
            card.className = 'ai-card';
            card.innerHTML = `
                <div style="font-size: 0.6rem; color: var(--miku-pink); font-family: Orbitron;">[SELECTED_PATTERN]</div>
                <h4 style="color:var(--miku-cyan); margin: 10px 0;">${p.label}</h4>
                <button onclick="openAIPopup('${p.id}')" class="btn-ai-gen" style="width:100%">GENERATE_NEW_VARIATION</button>
            `;
            grid.appendChild(card);
        });
        
        if(filteredPatterns.length === 0) grid.innerHTML = "<p>Pilih minimal satu pola untuk di-generate.</p>";
    }, 600);
}


function openAIPopup(patternId) {
    const modal = document.getElementById('detail-modal');
    const response = document.getElementById('ai-response');
    const loading = document.getElementById('ai-loading');
    
    modal.style.display = 'flex';
    loading.classList.remove('hidden');
    response.innerHTML = '';

    // 1. Cari data pola yang spesifik dari database
    let p = null;
    for (let k in grammarData) {
        p = grammarData[k].patterns.find(item => item.id === patternId);
        if (p) break;
    }

    if (!p) {
        response.innerHTML = "ERROR: Pattern Data Not Found.";
        return;
    }

    // 2. Simulasi AI Berpikir (Deep Analysis)
    setTimeout(() => {
        loading.classList.add('hidden');
        
        // --- LOGIKA ANALISIS PARTIKEL OTOMATIS ---
        let particleLogic = "";
        const label = p.label.toLowerCase();

        if (label.includes("ni")) {
            particleLogic = "Partikel <span class='particle-highlight'>に (ni)</span> di sini menunjukkan titik tujuan atau waktu spesifik terjadinya aktivitas.";
        } else if (label.includes("de")) {
            particleLogic = "Partikel <span class='particle-highlight'>で (de)</span> digunakan untuk menandai tempat terjadinya aksi aktif atau sarana/alat.";
        } else if (label.includes("ga")) {
            particleLogic = "Partikel <span class='particle-highlight'>が (ga)</span> digunakan untuk menekankan subjek atau menunjukkan kemampuan (potential) dan keinginan.";
        } else if (label.includes("o") || label.includes("を")) {
            particleLogic = "Partikel <span class='particle-highlight'>を (o)</span> digunakan sebagai penanda objek langsung dari kata kerja transitif.";
        } else if (label.includes("wa")) {
            particleLogic = "Partikel <span class='particle-highlight'>は (wa)</span> berfungsi sebagai penanda topik utama dalam kalimat ini.";
        } else {
            particleLogic = `Pola <span class='particle-highlight'>${p.label}</span> merupakan bentuk perubahan kata kerja/sifat yang berfungsi untuk ${p.desc.toLowerCase()}.`;
        }

        // --- LOGIKA GENERATOR CONTOH KALIMAT (Disesuaikan dengan pola) ---
        // Kita ambil kosakata dari database internal kita
        const subjects = ["Miku", "Rizal-san", "Tanaka-san", "Tomodachi"];
        const s = subjects[Math.floor(Math.random() * subjects.length)];
        
        // Membuat kalimat berdasarkan 'rules' atau 'label'
        let generatedJp = "";
        let generatedId = "";

        if (p.label.includes("~te")) {
            generatedJp = `${s} wa uchi e kaette, gohan o tabemasu.`;
            generatedId = `${s} pulang ke rumah, lalu makan.`;
        } else if (p.label.includes("koto ga deki")) {
            generatedJp = `${s} wa Nihongo o hanasu koto ga dekimasu.`;
            generatedId = `${s} bisa berbicara bahasa Jepang.`;
        } else {
            // Jika pola tidak spesifik, gunakan struktur dasar yang menggabungkan pola
            generatedJp = `${s} wa mainichi benkyou ${p.label.replace('~', '')}.`;
            generatedId = `${s} setiap hari ${p.desc.toLowerCase()}.`;
        }

        // 3. Render ke Modal
        response.innerHTML = `
            <div class="ai-deep-dive">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #333; padding-bottom:10px;">
                    <h3 style="color:var(--miku-cyan); font-family:Orbitron; margin:0;">${p.label}</h3>
                    <span style="font-size:0.6rem; color:var(--miku-pink);">ID: ${p.id}</span>
                </div>

                <div class="new-ai-sentence" style="margin-top:20px;">
                    <small style="color:var(--miku-pink); font-family:Orbitron;">[NEW_AI_GENERATED_EXAMPLE]</small>
                    <p style="font-weight:bold; font-size:1.1rem; margin-top:5px; color:#fff;">${generatedJp}</p>
                    <p style="font-size:0.85rem; color:#888; font-style:italic;">"${generatedId}"</p>
                </div>

                <div class="particle-analysis" style="margin-top:20px; background:rgba(57,197,187,0.05); padding:15px; border-left:3px solid var(--miku-cyan);">
                    <strong style="color:var(--miku-cyan); font-family:Orbitron; font-size:0.7rem;">[PARTICLE_LOGIC_ANALYSIS]</strong>
                    <p style="font-size:0.9rem; margin-top:8px; line-height:1.5;">${particleLogic}</p>
                </div>

                <div style="margin-top:20px; padding:10px; border:1px dashed #444; font-size:0.8rem;">
                    <span style="color:var(--miku-pink);">[RE-MIX_RULES]:</span><br>
                    ${p.rules}
                </div>
            </div>
        `;
    }, 1000);
}





let isGenMinimized = false;

function toggleGeneratorMinimize() {
    const container = document.getElementById('page-generator');
    const btnText = document.getElementById('btn-minimize-gen');
    const icon = document.getElementById('min-icon');
    const statusText = document.getElementById('gen-status-text');

    isGenMinimized = !isGenMinimized;

    if (isGenMinimized) {
        container.classList.add('is-minimized');
        btnText.innerHTML = `<span id="min-icon">[+]</span> EXPAND_INTERFACE`;
        statusText.style.display = 'none'; // Sembunyikan deskripsi agar hemat ruang
    } else {
        container.classList.remove('is-minimized');
        btnText.innerHTML = `<span id="min-icon">[_]</span> MINIMIZE_INTERFACE`;
        statusText.style.display = 'block';
    }
}

// Tambahan: Pastikan saat pindah halaman, status kembali normal (Expand)
function showPage(pageId) {
    document.querySelectorAll('.sub-page, .swiper').forEach(el => el.classList.add('hidden'));
    
    if (pageId === 'generator') {
        const genPage = document.getElementById('page-generator');
        genPage.classList.remove('hidden');
        
        // Reset minimize status saat masuk ke halaman
        genPage.classList.remove('is-minimized');
        isGenMinimized = false;
        document.getElementById('btn-minimize-gen').innerHTML = `<span id="min-icon">[_]</span> MINIMIZE_INTERFACE`;
        
        populateBabSelect();
    } else {
        document.querySelector('.swiper').classList.remove('hidden');
    }
}
