// ==========================================
// SARASHIKI_OS: CORE LOGIC v2.5
// ==========================================

// 1. INISIALISASI SISTEM (SAAT HALAMAN DIMUAT)
document.addEventListener('DOMContentLoaded', () => {
    console.log("SARASHIKI_SYSTEM: Booting...");
    renderSidebar();      // Munculkan daftar Bab di Sidebar
    populateBabSelect();  // Isi dropdown di halaman Generator
    
    // Inisialisasi Swiper (Jika masih ingin ada slider di home)
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }
});

// 2. FUNGSI RENDER SIDEBAR (MEMUNCULKAN DAFTAR BAB)
function renderSidebar() {
    const sidebarNav = document.getElementById('chapter-list');
    if (!sidebarNav) return;

    sidebarNav.innerHTML = ''; // Bersihkan sidebar

    // Tombol Khusus: POLA GENERATOR
    const genNav = document.createElement('div');
    genNav.className = 'chapter-item special-nav';
    genNav.innerHTML = `<span style="color:var(--miku-pink)">[AI]</span> POLA GENERATOR`;
    genNav.onclick = () => showPage('generator');
    sidebarNav.appendChild(genNav);

    // Garis Pembatas
    const hr = document.createElement('hr');
    hr.style.border = "0.5px solid #222";
    hr.style.margin = "10px 0";
    sidebarNav.appendChild(hr);

    // Render Bab 1 - 25 dari grammar_data.js
    for (let i = 1; i <= 25; i++) {
        const babKey = 'bab' + i;
        const babData = typeof grammarData !== 'undefined' ? grammarData[babKey] : null;
        
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-item';
        
        const title = babData ? babData.title : `CHAPTER ${i}`;
        
        chapterDiv.innerHTML = `
            <span class="ch-num">${i < 10 ? '0' + i : i}</span>
            <span class="ch-title">${title}</span>
        `;
        
        // KLIK BAB -> LANGSUNG POP-UP
        chapterDiv.onclick = () => {
            document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
            chapterDiv.classList.add('active');
            selectChapter(i); // Trigger Pop-up
        };
        
        sidebarNav.appendChild(chapterDiv);
    }
}

// 3. FUNGSI POP-UP OTOMATIS SAAT BAB DIKLIK
function selectChapter(num) {
    const data = grammarData['bab' + num];
    const modal = document.getElementById('detail-modal');
    const response = document.getElementById('ai-response');
    const loading = document.getElementById('ai-loading');

    if (!data) return;

    modal.style.display = 'flex';
    loading.classList.remove('hidden');
    response.innerHTML = '';
    document.getElementById('ai-generated-container').innerHTML = '';

    setTimeout(() => {
        loading.classList.add('hidden');
        
        let htmlContent = `
            <div class="modal-bab-header">
                <h3 style="color:var(--miku-cyan); font-family:Orbitron; margin-bottom:5px;">CHAPTER_${num}: ${data.title}</h3>
                <p style="font-size:0.7rem; color:#666;">DATABASE_SYNC_SUCCESSFUL // ${data.patterns.length} PATTERNS</p>
            </div>
            <div class="modal-pattern-grid" style="display:grid; gap:10px; margin-top:20px;">
        `;

        data.patterns.forEach(p => {
            htmlContent += `
                <button onclick="openAIPopup('${p.id}')" class="btn-ai-gen" style="text-align:left; width:100%; padding:12px; border:1px solid #333; background:rgba(255,255,255,0.02);">
                    <span style="color:var(--miku-pink); font-size:0.7rem;">[ANALYZE]</span> 
                    <span style="margin-left:10px; color:#fff;">${p.label}</span>
                </button>
            `;
        });

        htmlContent += `</div>`;
        response.innerHTML = htmlContent;
    }, 600);
}

// 4. FUNGSI NAVIGASI HALAMAN (GENERATOR VS HOME)
function showPage(pageId) {
    const genPage = document.getElementById('page-generator');
    const mainSwiper = document.querySelector('.mySwiper');

    if (pageId === 'generator') {
        genPage.classList.remove('hidden');
        mainSwiper.classList.add('hidden');
        populateBabSelect();
    } else {
        genPage.classList.add('hidden');
        mainSwiper.classList.remove('hidden');
    }
}

// 5. ISI DROPDOWN GENERATOR
function populateBabSelect() {
    const select = document.getElementById('select-bab-gen');
    if (!select || select.options.length > 0) return;

    for (let i = 1; i <= 25; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `BAB ${i} - ${grammarData['bab' + i]?.title || ''}`;
        select.appendChild(option);
    }
}

// 6. FUNGSI CLOSE MODAL
function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

// Tambahkan sisa fungsi generator kamu (checkPatternCount, toggleAdvancedOptions, dll) di bawah sini...mentById('detail-modal');
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






// Variabel global untuk menyimpan pola yang sedang dianalisis
let currentAnalyzedPattern = null;

function openAIPopup(patternId) {
    const modal = document.getElementById('detail-modal');
    const response = document.getElementById('ai-response');
    const genContainer = document.getElementById('ai-generated-container');
    const loading = document.getElementById('ai-loading');
    
    modal.style.display = 'flex';
    loading.classList.remove('hidden');
    response.innerHTML = '';
    genContainer.innerHTML = ''; // Kosongkan area kalimat

    // Cari data pola dari database
    currentAnalyzedPattern = null;
    for (let k in grammarData) {
        currentAnalyzedPattern = grammarData[k].patterns.find(item => item.id === patternId);
        if (currentAnalyzedPattern) break;
    }

    if (!currentAnalyzedPattern) {
        response.innerHTML = "ERROR: Pattern Data Not Found.";
        return;
    }

    // Pasang fungsi klik ke tombol Refresh
    document.getElementById('gen-btn-ai').onclick = () => generateFreshSentence();

    // Simulasi AI memproses data
    setTimeout(() => {
        loading.classList.add('hidden');
        
        // 1. Tampilkan Analisis Dasar (Hanya render sekali)
        renderStaticAnalysis(currentAnalyzedPattern, response);
        
        // 2. Langsung hasilkan 1 kalimat pertama secara otomatis
        generateFreshSentence();
        
    }, 800);
}

// FUNGSI UNTUK MERENDER PENJELASAN PARTIKEL (TETAP)
function renderStaticAnalysis(p, container) {
    let particleLogic = "Pola ini digunakan sesuai struktur dasar tata bahasa.";
    const label = p.label.toLowerCase();

    if (label.includes("ni")) {
        particleLogic = "Partikel <span class='particle-highlight'>に (ni)</span> menunjukkan titik tujuan spesifik atau waktu tetap.";
    } else if (label.includes("de")) {
        particleLogic = "Partikel <span class='particle-highlight'>で (de)</span> digunakan untuk menandai tempat aktivitas atau alat bantu.";
    } else if (label.includes("ga")) {
        particleLogic = "Partikel <span class='particle-highlight'>が (ga)</span> memberi penekanan pada subjek atau menunjukkan potensi/kemampuan.";
    } else if (label.includes("o") || label.includes("を")) {
        particleLogic = "Partikel <span class='particle-highlight'>を (o)</span> bertindak sebagai penanda objek langsung.";
    }

    container.innerHTML = `
        <div class="ai-deep-dive">
            <h3 style="color:var(--miku-cyan); font-family:Orbitron; border-bottom:1px solid #333; padding-bottom:5px; margin:0;">${p.label}</h3>
            
            <div class="particle-analysis" style="margin-top:15px; background:rgba(57,197,187,0.05); padding:12px; border-left:3px solid var(--miku-cyan);">
                <strong style="color:var(--miku-cyan); font-family:Orbitron; font-size:0.7rem;">[PARTICLE_LOGIC_ANALYSIS]</strong>
                <p style="font-size:0.85rem; margin-top:8px; line-height:1.4;">${particleLogic}</p>
            </div>

            <div style="margin-top:15px; font-size:0.8rem; color:#888;">
                <span style="color:var(--miku-pink);">[RULES]:</span> ${p.rules}
            </div>
        </div>
    `;
}

// FUNGSI UNTUK MERENDER KALIMAT BARU SAAT DI-REFRESH
function generateFreshSentence() {
    const container = document.getElementById('ai-generated-container');
    const p = currentAnalyzedPattern;
    if (!p) return;

    // Database Acak Sederhana
    const subjects = ["Miku", "Rizal-san", "Sensei", "Kareshi", "Watashi"];
    const actions = ["Nihongo o benkyou", "Sushi o tabe", "Tokyo e iki", "Uta o utai"];
    
    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const a = actions[Math.floor(Math.random() * actions.length)];

    let generatedJp = `${s} wa ${a} ${p.label}.`;
    let generatedId = `(AI) ${s} melakukan aktivitas terkait pola ${p.label}.`;

    // Render ulang ke kontainer (menimpa yang lama) dengan efek transisi ringan
    container.innerHTML = `
        <div class="new-ai-sentence" style="margin-top:20px; border-top:1px dashed #444; padding-top:15px; animation: fadeIn 0.4s ease;">
            <small style="color:var(--miku-pink); font-family:Orbitron;">[AI_GENERATED_EXAMPLE]</small>
            <p style="font-weight:bold; font-size:1.1rem; margin-top:8px; color:#fff;">${generatedJp}</p>
            <p style="font-size:0.85rem; color:#aaa; font-style:italic;">"${generatedId}"</p>
        </div>
    `;
}
function renderSidebar() {
    const sidebarNav = document.getElementById('chapter-list');
    if (!sidebarNav) return; // Keamanan jika elemen tidak ditemukan

    // 1. Bersihkan Sidebar
    sidebarNav.innerHTML = '';

    // 2. Tambahkan kembali Tombol Generator AI (Wajib ada di paling atas)
    const genNav = document.createElement('div');
    genNav.className = 'chapter-item special-nav';
    genNav.style.marginBottom = "10px";
    genNav.onclick = () => showPage('generator');
    genNav.innerHTML = `<span style="color:var(--miku-pink)">[AI]</span> POLA GENERATOR`;
    sidebarNav.appendChild(genNav);

    // 3. Tambahkan Garis Pembatas
    const hr = document.createElement('hr');
    hr.style.border = "0.5px solid #222";
    hr.style.margin = "10px 0";
    sidebarNav.appendChild(hr);

    // 4. Generate Daftar Bab 1 - 25
    for (let i = 1; i <= 25; i++) {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-item';
        
        // Cek apakah data Bab ada di grammar_data.js
        const babData = grammarData['bab' + i];
        const title = babData ? babData.title : `CHAPTER_${i}`;
        
        chapterDiv.innerHTML = `
            <span class="ch-num">${i < 10 ? '0' + i : i}</span>
            <span class="ch-title">${title}</span>
        `;
        
        // Klik Bab -> Langsung Pop-up
        chapterDiv.onclick = (e) => {
            // Hapus class active dari semua bab
            document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
            chapterDiv.classList.add('active');
            
            // Panggil fungsi Pop-up
            selectChapter(i, chapterDiv);
        };
        
        sidebarNav.appendChild(chapterDiv);
    }
}

// EKSEKUSI SAAT HALAMAN DIBUKA
document.addEventListener('DOMContentLoaded', () => {
    renderSidebar();
    console.log("SARASHIKI_OS: Sidebar Rendered.");
});
