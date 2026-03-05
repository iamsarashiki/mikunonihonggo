// ==========================================
// SARASHIKI_OS: CORE LOGIC v3.0 [ULTIMATE]
// ==========================================

let currentAnalyzedPattern = null;
let isGenMinimized = false;

// 1. BOOTING SYSTEM
document.addEventListener('DOMContentLoaded', () => {
    console.log("SARASHIKI_SYSTEM: Booting...");
    renderSidebar();      
    populateBabSelect();  
});

// 2. SIDEBAR ENGINE
function renderSidebar() {
    const sidebarNav = document.getElementById('chapter-list');
    if (!sidebarNav) return;

    sidebarNav.innerHTML = ''; 

    // Tombol Lab Generator
    const genNav = document.createElement('div');
    genNav.className = 'chapter-item special-nav';
    genNav.innerHTML = `<span style="color:var(--miku-pink)">[AI]</span> POLA GENERATOR`;
    genNav.onclick = () => showPage('generator');
    sidebarNav.appendChild(genNav);

    const hr = document.createElement('hr');
    hr.style.border = "0.5px solid #222";
    hr.style.margin = "10px 0";
    sidebarNav.appendChild(hr);

    // Loop Bab 1 - 25
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
        
        chapterDiv.onclick = () => {
            document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
            chapterDiv.classList.add('active');
            selectChapter(i); 
        };
        sidebarNav.appendChild(chapterDiv);
    }
}

// 3. AUTO POP-UP (CHAPTER LIST)
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
                <h3 style="color:var(--miku-cyan); font-family:Orbitron;">CHAPTER_${num}: ${data.title}</h3>
                <p style="font-size:0.7rem; color:#666; margin-bottom:15px;">PILIH POLA UNTUK ANALISIS MENDALAM:</p>
            </div>
            <div class="modal-pattern-grid" style="display:grid; gap:8px;">
        `;

        data.patterns.forEach(p => {
            htmlContent += `
                <button onclick="openAIPopup('${p.id}')" class="btn-ai-gen" style="text-align:left; width:100%; padding:10px;">
                    <span style="color:var(--miku-pink)">[→]</span> ${p.label}
                </button>
            `;
        });
        htmlContent += `</div>`;
        response.innerHTML = htmlContent;
    }, 500);
}

// 4. AI ANALYSIS & REFRESH LOGIC
function openAIPopup(patternId) {
    const response = document.getElementById('ai-response');
    const genContainer = document.getElementById('ai-generated-container');
    
    // Cari Pola
    currentAnalyzedPattern = null;
    for (let k in grammarData) {
        currentAnalyzedPattern = grammarData[k].patterns.find(item => item.id === patternId);
        if (currentAnalyzedPattern) break;
    }

    if (!currentAnalyzedPattern) return;

    // Pasang fungsi Refresh ke tombol footer
    document.getElementById('gen-btn-ai').onclick = () => generateFreshSentence();

    // Render Analisis Statis
    renderStaticAnalysis(currentAnalyzedPattern, response);
    // Generate Kalimat Pertama
    generateFreshSentence();
}

function renderStaticAnalysis(p, container) {
    let particleLogic = "Pola ini merupakan struktur perubahan kata kerja/sifat.";
    const label = p.label.toLowerCase();

    if (label.includes("ni")) particleLogic = "Partikel <span class='particle-highlight'>に (ni)</span> menunjukkan titik tujuan atau waktu spesifik.";
    else if (label.includes("de")) particleLogic = "Partikel <span class='particle-highlight'>で (de)</span> menunjukkan tempat aksi atau sarana/alat.";
    else if (label.includes("ga")) particleLogic = "Partikel <span class='particle-highlight'>が (ga)</span> menekan subjek atau menunjukkan keinginan/kemampuan.";
    else if (label.includes("o") || label.includes("を")) particleLogic = "Partikel <span class='particle-highlight'>を (o)</span> menandai objek langsung dari kata kerja.";

    container.innerHTML = `
        <div class="ai-deep-dive">
            <h3 style="color:var(--miku-cyan); font-family:Orbitron; border-bottom:1px solid #333; padding-bottom:5px;">${p.label}</h3>
            <div class="particle-analysis" style="margin-top:15px; background:rgba(57,197,187,0.05); padding:12px; border-left:3px solid var(--miku-cyan);">
                <strong style="color:var(--miku-cyan); font-size:0.7rem;">[PARTICLE_LOGIC_ANALYSIS]</strong>
                <p style="font-size:0.85rem; margin-top:5px;">${particleLogic}</p>
            </div>
            <div style="margin-top:15px; font-size:0.8rem; color:#888;">
                <span style="color:var(--miku-pink);">[RULES]:</span> ${p.rules}
            </div>
        </div>
    `;
}

function generateFreshSentence() {
    const container = document.getElementById('ai-generated-container');
    const p = currentAnalyzedPattern;
    const subs = ["Miku", "Rizal-san", "Sensei", "Watashi"];
    const s = subs[Math.floor(Math.random() * subs.length)];

    container.innerHTML = `
        <div class="new-ai-sentence" style="margin-top:20px; border-top:1px dashed #444; padding-top:15px; animation: fadeIn 0.4s ease;">
            <small style="color:var(--miku-pink); font-family:Orbitron;">[NEW_AI_GENERATED_EXAMPLE]</small>
            <p style="font-weight:bold; font-size:1.1rem; color:#fff; margin-top:5px;">${s} wa Nihongo o benkyou ${p.label.replace('~','')}.</p>
            <p style="font-size:0.8rem; color:#aaa;">"Aktivitas ${s} terkait pola ${p.label}."</p>
        </div>
    `;
}

// 5. GENERATOR LAB FUNCTIONS
function showPage(pageId) {
    const genPage = document.getElementById('page-generator');
    const mainSwiper = document.querySelector('.mySwiper');
    if (pageId === 'generator') {
        genPage.classList.remove('hidden');
        mainSwiper.classList.add('hidden');
    } else {
        genPage.classList.add('hidden');
        mainSwiper.classList.remove('hidden');
    }
}

function toggleGeneratorMinimize() {
    const container = document.getElementById('page-generator');
    const btnText = document.getElementById('btn-minimize-gen');
    isGenMinimized = !isGenMinimized;
    
    if (isGenMinimized) {
        container.classList.add('is-minimized');
        btnText.innerHTML = `[+] EXPAND_INTERFACE`;
    } else {
        container.classList.remove('is-minimized');
        btnText.innerHTML = `[_] MINIMIZE_INTERFACE`;
    }
}

function populateBabSelect() {
    const select = document.getElementById('select-bab-gen');
    if (!select) return;
    select.innerHTML = '<option value="">-- PILIH BAB --</option>';
    for (let i = 1; i <= 25; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `BAB ${i} - ${grammarData['bab' + i]?.title || ''}`;
        select.appendChild(opt);
    }
}

function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}



// ==========================================
// MODUL GENERATOR LAB (Fungsi Eksekusi)
// ==========================================

// 1. Cek jumlah pola saat Bab dipilih di Generator
function checkPatternCount() {
    const babId = document.getElementById('select-bab-gen').value;
    const btnAdvanced = document.getElementById('btn-advanced');
    const advBox = document.getElementById('advanced-pattern-list');
    const checkboxContainer = document.getElementById('checkbox-container');
    
    // Reset tampilan
    btnAdvanced.classList.add('hidden');
    advBox.classList.add('hidden');
    checkboxContainer.innerHTML = '';

    if (!babId || !grammarData['bab' + babId]) return;

    const patterns = grammarData['bab' + babId].patterns;

    // Jika pola lebih dari 1, munculkan tombol Opsi Lanjutan
    if (patterns.length > 1) {
        btnAdvanced.classList.remove('hidden');
        
        // Isi checkbox untuk pilihan spesifik
        patterns.forEach(p => {
            const label = document.createElement('label');
            label.style.display = 'flex';
            label.style.alignItems = 'center';
            label.style.gap = '8px';
            label.style.fontSize = '0.7rem';
            label.style.color = '#fff';
            
            label.innerHTML = `
                <input type="checkbox" value="${p.id}" class="pattern-checkbox" checked>
                ${p.label}
            `;
            checkboxContainer.appendChild(label);
        });
    }
}

// 2. Toggle Buka/Tutup Opsi Lanjutan
function toggleAdvancedOptions() {
    const advBox = document.getElementById('advanced-pattern-list');
    advBox.classList.toggle('hidden');
}

// 3. Eksekusi Generate Banyak Pola (Main Feature)
function generateNewBatch() {
    const babId = document.getElementById('select-bab-gen').value;
    const resultGrid = document.getElementById('ai-result-grid');
    const statusText = document.getElementById('gen-status-text');

    if (!babId) {
        alert("Pilih Bab terlebih dahulu, Sarashiki!");
        return;
    }

    // Ambil pola yang dicentang saja
    const selectedCheckboxes = document.querySelectorAll('.pattern-checkbox:checked');
    let selectedPatternIds = Array.from(selectedCheckboxes).map(cb => cb.value);

    // Jika tidak ada yang dicentang (atau opsi lanjutan tertutup), ambil semua pola di bab itu
    if (selectedPatternIds.length === 0) {
        selectedPatternIds = grammarData['bab' + babId].patterns.map(p => p.id);
    }

    // Efek Loading
    statusText.innerText = "GENERATING_VIRTUAL_CONTEXT...";
    resultGrid.innerHTML = '<div class="loading-spinner">PROCESSING...</div>';

    setTimeout(() => {
        resultGrid.innerHTML = ''; // Bersihkan loading
        
        selectedPatternIds.forEach(id => {
            const p = grammarData['bab' + babId].patterns.find(item => item.id === id);
            if (!p) return;

            // Logika kalimat acak
            const subs = ["Miku", "Rizal", "Afif", "Ragil", "Sensei"];
            const s = subs[Math.floor(Math.random() * subs.length)];
            
            const card = document.createElement('div');
            card.className = 'ai-result-card';
            card.style.cssText = `
                background: rgba(255,255,255,0.03);
                border: 1px solid #333;
                padding: 15px;
                border-radius: 5px;
                animation: fadeIn 0.5s ease;
            `;

            card.innerHTML = `
                <div style="color:var(--miku-cyan); font-family:Orbitron; font-size:0.8rem; margin-bottom:10px;">[${p.label}]</div>
                <p style="font-weight:bold; color:#fff; margin-bottom:5px;">${s} wa ${p.label.replace('~', '')} koto ga dekimasu.</p>
                <p style="font-size:0.75rem; color:#888; font-style:italic;">"Generated Example for ${p.id}"</p>
                <button onclick="openAIPopup('${p.id}')" style="margin-top:10px; background:none; border:1px solid var(--miku-pink); color:var(--miku-pink); font-size:0.6rem; padding:3px 8px; cursor:pointer;">DEEP_ANALYZE</button>
            `;
            
            resultGrid.appendChild(card);
        });

        statusText.innerText = `Berhasil generate ${selectedPatternIds.length} pola baru.`;
    }, 800);
}
