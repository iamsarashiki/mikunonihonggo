// ==========================================
// SARASHIKI_OS v3.5: NEON_PROTOCOL [RESPONSIVE]
// ==========================================

let currentAnalyzedPattern = null;

// 1. BOOTING SYSTEM WITH NEON LOG
document.addEventListener('DOMContentLoaded', () => {
    console.log("%c [SYS] SARASHIKI_OS: NEON_SYSTEM_ACTIVE ", "color:#39c5bb; background:#000; font-weight:bold;");
    
    if (typeof grammarData !== 'undefined') {
        renderSidebar();      
        populateBabSelect();  
    } else {
        console.error("[!] DATABASE_OFFLINE: Periksa grammar_data.js");
    }
});

// 2. SIDEBAR ENGINE (MOBILE FRIENDLY)
function renderSidebar() {
    const sidebarNav = document.getElementById('chapter-list');
    if (!sidebarNav) return;
    sidebarNav.innerHTML = ''; 

    // Tombol Lab Generator dengan Efek Neon Pink
    const genNav = document.createElement('div');
    genNav.className = 'chapter-item special-nav neon-border-pink';
    genNav.innerHTML = `<span class="neon-text-pink">[AI]</span> POLA GENERATOR`;
    genNav.onclick = () => {
        showPage('generator');
        if(window.innerWidth < 768) toggleSidebar(); // Auto-close di mobile
    };
    sidebarNav.appendChild(genNav);

    const hr = document.createElement('hr');
    hr.className = "neon-hr";
    sidebarNav.appendChild(hr);

    // Loop Bab 1 - 25
    for (let i = 1; i <= 25; i++) {
        const babData = grammarData['bab' + i];
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-item neon-hover-cyan';
        const title = babData ? babData.title : `CHAPTER ${i}`;
        
        chapterDiv.innerHTML = `
            <span class="ch-num">${i < 10 ? '0' + i : i}</span>
            <span class="ch-title">${title}</span>
        `;
        
        chapterDiv.onclick = () => {
            document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
            chapterDiv.classList.add('active');
            selectChapter(i); 
            if(window.innerWidth < 768) toggleSidebar(); 
        };
        sidebarNav.appendChild(chapterDiv);
    }
}

// 3. AUTO POP-UP & AI ANALYSIS (BAHASA INDONESIA)
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
            <div class="modal-bab-header neon-text-cyan">
                <h3 style="font-family:Orbitron;">CHAPTER_${num}: ${data.title}</h3>
                <p style="font-size:0.7rem; color:#888;">DATABASE_SYNC_SUCCESS // ${data.patterns.length} POLA</p>
            </div>
            <div class="modal-pattern-grid">
        `;

        data.patterns.forEach(p => {
            htmlContent += `
                <button onclick="openAIPopup('${p.id}')" class="btn-neon-small">
                    <span style="color:var(--miku-pink)">[→]</span> ${p.label}
                </button>
            `;
        });
        htmlContent += `</div>`;
        response.innerHTML = htmlContent;
    }, 500);
}

function openAIPopup(patternId) {
    const response = document.getElementById('ai-response');
    currentAnalyzedPattern = null;
    for (let k in grammarData) {
        currentAnalyzedPattern = grammarData[k].patterns.find(item => item.id === patternId);
        if (currentAnalyzedPattern) break;
    }

    if (!currentAnalyzedPattern) return;

    document.getElementById('gen-btn-ai').onclick = () => generateFreshSentence();
    
    // Penjelasan AI dalam Bahasa Indonesia
    const label = currentAnalyzedPattern.label.toLowerCase();
    let particleLogic = "Pola ini mengatur struktur kalimat secara umum.";
    if (label.includes("ni")) particleLogic = "Menggunakan <span class='neon-text-cyan'>に (ni)</span> sebagai penanda target atau waktu.";
    else if (label.includes("de")) particleLogic = "Menggunakan <span class='neon-text-cyan'>で (de)</span> sebagai penanda lokasi atau alat.";

    response.innerHTML = `
        <div class="ai-deep-dive">
            <h3 class="neon-text-pink">${currentAnalyzedPattern.label}</h3>
            <div class="neon-box-cyan" style="margin:15px 0; padding:10px;">
                <small>[LOGIKA_AI]</small>
                <p style="font-size:0.85rem;">${particleLogic}</p>
            </div>
            <p style="font-size:0.8rem; border-top:1px solid #333; padding-top:10px;">${currentAnalyzedPattern.rules}</p>
        </div>
    `;
    generateFreshSentence();
}

// 4. GENERATOR LAB (RESPONSIVE GRID)
function generateNewBatch() {
    const babId = document.getElementById('select-bab-gen').value;
    const resultGrid = document.getElementById('ai-result-grid');
    if (!babId) return;

    resultGrid.innerHTML = '<div class="neon-text-cyan blink">SYNCING_DATA...</div>';
    
    setTimeout(() => {
        resultGrid.innerHTML = '';
        const patterns = grammarData['bab' + babId].patterns;
        
        patterns.forEach(p => {
            const card = document.createElement('div');
            card.className = 'ai-result-card neon-border-cyan';
            
            card.innerHTML = `
                <div class="card-id neon-text-pink">[${p.id}]</div>
                <p class="jp-text">ミクさんは ${p.label.replace('~','')}。</p>
                <p class="id-text"><strong>Artinya:</strong> Miku melakukan ${p.label}.</p>
                <button onclick="openAIPopup('${p.id}')" class="btn-mini-neon">ANALISIS</button>
            `;
            resultGrid.appendChild(card);
        });
    }, 600);
}

// 5. HELPER FUNCTIONS
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

function generateFreshSentence() {
    const container = document.getElementById('ai-generated-container');
    if (!currentAnalyzedPattern) return;
    container.innerHTML = `
        <div class="neon-box-pink" style="margin-top:15px; padding:10px;">
            <small class="blink">[NEW_GEN]</small>
            <p style="font-size:1.1rem;">わたしは ${currentAnalyzedPattern.label.replace('~','')}。</p>
        </div>
    `;
}

function closeModal() { document.getElementById('detail-modal').style.display = 'none'; }   card.className = 'ai-result-card';
            card.style.cssText = `
                background: rgba(0,0,0,0.3);
                border: 1px solid var(--miku-cyan);
                padding: 15px;
                border-radius: 8px;
                animation: fadeIn 0.5s ease;
                border-left: 4px solid var(--miku-pink);
            `;

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
                    <span style="color:var(--miku-cyan); font-family:Orbitron; font-size:0.75rem;">[ID: ${p.id}]</span>
                    <span style="background:var(--miku-pink); color:#000; font-size:0.6rem; padding:2px 5px; font-weight:bold;">N4_LEVEL</span>
                </div>
function generateNewBatch() {
    // 1. Ambil elemen-elemen penting
    const selectBab = document.getElementById('select-bab-gen');
    const resultGrid = document.getElementById('ai-result-grid'); // Pastikan ID ini ada di HTML
    
    if (!selectBab) return;
    const babId = selectBab.value;

    if (!babId) {
        alert("Pilih Bab terlebih dahulu, Sarashiki!");
        return;
    }

    // 2. Ambil pola yang dipilih (atau semua pola jika tidak ada yang dicentang)
    const selectedCheckboxes = document.querySelectorAll('.pattern-checkbox:checked');
    let selectedPatternIds = Array.from(selectedCheckboxes).map(cb => cb.value);

    // Ambil database pola dari bab yang dipilih
    const babData = grammarData['bab' + babId];
    if (!babData) return;

    if (selectedPatternIds.length === 0) {
        selectedPatternIds = babData.patterns.map(p => p.id);
    }

    // 3. Efek Loading Visual
    resultGrid.innerHTML = '<div style="color:var(--miku-cyan); font-family:Orbitron; font-size:0.7rem; padding:20px;">GENERATING_VIRTUAL_CONTEXT...</div>';

    setTimeout(() => {
        resultGrid.innerHTML = ''; // Bersihkan loading
        
        selectedPatternIds.forEach(id => {
            const p = babData.patterns.find(item => item.id === id);
            if (!p) return;

            // Logika Kalimat Acak (Hiragana & Katakana)
            const characters = [
                { jp: "ミクさん", ro: "Miku-san", id: "Miku" },
                { jp: "リザルさん", ro: "Rizaru-san", id: "Rizal" },
                { jp: "わたし", ro: "Watashi", id: "Saya" }
            ];
            const char = characters[Math.floor(Math.random() * characters.length)];
            const cleanPattern = p.label.replace('~', '');

            // Buat elemen Card
            const card = document.createElement('div');
            card.className = 'ai-result-card'; // Pastikan class ini ada di CSS
            card.style.cssText = `
                background: rgba(255,255,255,0.03);
                border: 1px solid #333;
                border-left: 3px solid var(--miku-pink);
                padding: 12px;
                margin-bottom: 10px;
                border-radius: 4px;
            `;

            card.innerHTML = `
                <div style="font-size:0.6rem; color:var(--miku-cyan); margin-bottom:5px;">[${p.id}]</div>
                <p style="font-size:1rem; color:#fff; margin-bottom:2px;">${char.jp} は ${cleanPattern}。</p>
                <p style="font-size:0.75rem; color:#888; margin-bottom:8px;">${char.ro} wa ${cleanPattern.toLowerCase()}.</p>
                <div style="font-size:0.8rem; color:#eee; border-top:1px solid #222; padding-top:5px;">
                    <strong>Artinya:</strong> ${char.id} melakukan ${p.label}.
                </div>
                <button onclick="openAIPopup('${p.id}')" style="margin-top:10px; width:100%; background:transparent; border:1px solid #444; color:#aaa; font-size:0.6rem; padding:5px; cursor:pointer;">ANALISIS_PARTIKEL</button>
            `;
            
            resultGrid.appendChild(card);
        });
    }, 600);
}

// ==========================================
// AI PARTICLE ANALYSIS ENGINE (DETAILED)
// ==========================================

function renderStaticAnalysis(p, container) {
    let particleLogic = "";
    const label = p.label.toLowerCase();

    // Logika AI untuk menjelaskan "Kenapa pakai partikel ini?"
    if (label.includes("ni") || label.includes("に")) {
        particleLogic = `
            AI mendeteksi penggunaan partikel <span class='particle-highlight'>に (ni)</span>. 
            <strong>Alasannya:</strong> Partikel ini digunakan karena kalimat menunjukkan 
            <em>titik tujuan</em> atau <em>waktu spesifik</em>. Dalam konteks pola <strong>${p.label}</strong>, 
            ia berfungsi mengunci target aktivitas agar tidak tertukar dengan tempat kejadian biasa.
        `;
    } else if (label.includes("de") || label.includes("で")) {
        particleLogic = `
            AI mendeteksi penggunaan partikel <span class='particle-highlight'>で (de)</span>. 
            <strong>Alasannya:</strong> Partikel ini dipilih karena fokus kalimat adalah pada 
            <em>sarana, alat, atau lokasi aktif</em> terjadinya suatu kegiatan. Ini menegaskan 
            bahwa subjek menggunakan 'sesuatu' untuk mencapai hasil dari pola <strong>${p.label}</strong>.
        `;
    } else if (label.includes("ga") || label.includes("が")) {
        particleLogic = `
            AI mendeteksi penggunaan partikel <span class='particle-highlight'>が (ga)</span>. 
            <strong>Alasannya:</strong> Partikel ini digunakan untuk memberikan 
            <em>penekanan pada subjek</em> atau menunjukkan <em>objek dari kata kerja statis</em> 
            (seperti kemampuan/keinginan). Ini menjelaskan kenapa fokusnya ada pada 'siapa' atau 'apa' 
            yang memiliki sifat <strong>${p.label}</strong>.
        `;
    } else if (label.includes("o") || label.includes("を")) {
        particleLogic = `
            AI mendeteksi penggunaan partikel <span class='particle-highlight'>を (o)</span>. 
            <strong>Alasannya:</strong> Partikel ini wajib ada karena pola <strong>${p.label}</strong> 
            melibatkan <em>objek langsung</em> yang menerima tindakan. Tanpa partikel ini, 
            hubungan antara kata benda dan kata kerja dalam pola ini akan menjadi tidak jelas.
        `;
    } else {
        particleLogic = `
            AI menganalisis bahwa pola <strong>${p.label}</strong> ini lebih berfokus pada 
            <em>perubahan bentuk kata (Konjugasi)</em> daripada partikel tunggal. 
            Fokus utamanya adalah bagaimana makna kalimat berubah total setelah kata kerja digabungkan.
        `;
    }

    container.innerHTML = `
        <div class="ai-deep-dive" style="animation: slideInUp 0.4s ease;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                <div style="width:10px; height:10px; background:var(--miku-cyan); border-radius:50%; box-shadow: 0 0 10px var(--miku-cyan);"></div>
                <h3 style="color:var(--miku-cyan); font-family:Orbitron; margin:0;">${p.label}</h3>
            </div>
            
            <div class="particle-analysis" style="background:rgba(57,197,187,0.08); padding:15px; border-left:4px solid var(--miku-cyan); border-radius: 0 8px 8px 0;">
                <div style="font-family:Orbitron; font-size:0.65rem; color:var(--miku-pink); letter-spacing:1px; margin-bottom:10px;">
                    [SYSTEM_AI_EXPLANATION]: WHY_THIS_PARTICLE?
                </div>
                <p style="font-size:0.9rem; color:#fff; line-height:1.6; margin:0;">
                    ${particleLogic}
                </p>
            </div>

            <div class="rule-box" style="margin-top:20px; padding:12px; background:rgba(255,255,255,0.03); border:1px dashed #444; border-radius:5px;">
                <span style="color:var(--miku-pink); font-size:0.7rem; font-family:Orbitron;">[USAGE_RULES]:</span>
                <p style="font-size:0.8rem; color:#ccc; margin-top:5px; line-height:1.4;">${p.rules}</p>
            </div>
        </div>
    `;
}
