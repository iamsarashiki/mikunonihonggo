// ==========================================
// SARASHIKI_OS v4.0: COMPLETE_CENTRAL_HUB
// ==========================================

let currentAnalyzedPattern = null;

// 1. BOOTING SYSTEM
document.addEventListener('DOMContentLoaded', () => {
    console.log("%c [SYS] SARASHIKI_OS: ALL_SYSTEMS_GO ", "color:#39c5bb; background:#000; font-weight:bold;");
    
    // Safety check database
    if (typeof grammarData !== 'undefined') {
        renderCentralHub();      
        populateBabSelect();  
    } else {
        console.error("[!] DATABASE_OFFLINE: Pastikan grammar_data.js sudah dimuat.");
    }
});

// 2. CENTRAL HUB RENDERER (Daftar Bab di Tengah & Scrollable)
function renderCentralHub() {
    const list = document.getElementById('chapter-list');
    if (!list) return;

    list.innerHTML = ''; 

    // Tombol Akses AI Generator (Pink Neon)
    const genBtn = document.createElement('div');
    genBtn.className = 'chapter-item special-nav';
    genBtn.style.cssText = `
        border: 2px solid var(--miku-pink);
        color: var(--miku-pink);
        padding: 15px;
        width: 100%;
        max-width: 400px;
        border-radius: 8px;
        cursor: pointer;
        text-shadow: 0 0 10px var(--miku-pink);
        font-family: Orbitron;
        margin-bottom: 25px;
        text-align: center;
        transition: 0.3s;
    `;
    genBtn.innerHTML = `[ ACCESS_AI_LAB ]`;
    genBtn.onclick = () => showPage('generator');
    list.appendChild(genBtn);

    // Loop Render Bab 1 - 25
    for (let i = 1; i <= 25; i++) {
        const babData = grammarData['bab' + i];
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-item neon-border-cyan';
        
        const title = babData ? babData.title : `CHAPTER ${i}`;
        chapterDiv.innerHTML = `
            <span style="color:var(--miku-cyan); font-family:Orbitron; font-size: 0.7rem;">LEVEL_0${i}</span>
            <span style="color:#fff; font-weight: bold; margin-top: 5px; text-align: center;">${title}</span>
        `;
        
        chapterDiv.onclick = () => selectChapter(i);
        list.appendChild(chapterDiv);
    }
}

// 3. AI GENERATOR LOGIC (Multilingual & Centered Card)
function generateNewBatch() {
    const babId = document.getElementById('select-bab-gen').value;
    const resultGrid = document.getElementById('ai-result-grid');
    if (!babId) return alert("Sarashiki, pilih Bab-nya dulu!");

    resultGrid.innerHTML = '<div class="neon-text-cyan blink">SYNCING_NEON_DATA...</div>';
    
    setTimeout(() => {
        resultGrid.innerHTML = '';
        const patterns = grammarData['bab' + babId].patterns;
        
        patterns.forEach(p => {
            // Database Subjek Acak
            const characters = [
                {jp: "ミクさん", ro: "Miku-san", id: "Miku"},
                {jp: "リザルさん", ro: "Rizaru-san", id: "Rizal"},
                {jp: "わたし", ro: "Watashi", id: "Saya"}
            ];
            const char = characters[Math.floor(Math.random() * characters.length)];
            const cleanPattern = p.label.replace('~', '');

            const card = document.createElement('div');
            card.className = 'ai-result-card';
            card.style.cssText = `
                background:#0a0a0a;
                border:1px solid #222;
                border-top: 4px solid var(--miku-cyan);
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 8px;
                width: 95%;
                max-width: 450px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                animation: fadeIn 0.5s ease;
            `;
            
            card.innerHTML = `
                <div style="color:var(--miku-pink); font-family:Orbitron; font-size:0.6rem; margin-bottom:10px;">[PATTERN_ID: ${p.id}]</div>
                
                <p style="font-size:1.4rem; color:#fff; margin-bottom:5px;">${char.jp} は ${cleanPattern}。</p>
                <p style="font-size:0.9rem; color:var(--miku-cyan); margin-bottom:15px; font-family:Rajdhani;">${char.ro} wa ${cleanPattern.toLowerCase()}.</p>
                
                <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:4px; font-size:0.85rem; color:#eee; line-height:1.4;">
                    <strong style="color:var(--miku-pink);">Artinya:</strong> <br>
                    ${char.id} melakukan aktivitas menggunakan pola <strong>${p.label}</strong>.
                </div>
                
                <button onclick="openAIPopup('${p.id}')" style="margin-top:15px; width:100%; background:transparent; border:1px dashed var(--miku-cyan); color:var(--miku-cyan); padding:10px; cursor:pointer; font-family:Orbitron; font-size:0.7rem; transition:0.3s;">
                    DEEP_ANALYZE_PARTICLE [+]
                </button>
            `;
            resultGrid.appendChild(card);
        });
    }, 600);
}

// 4. DEEP PARTICLE ANALYSIS (AI Logic)
function openAIPopup(patternId) {
    const response = document.getElementById('ai-response');
    currentAnalyzedPattern = null;
    
    for (let k in grammarData) {
        currentAnalyzedPattern = grammarData[k].patterns.find(item => item.id === patternId);
        if (currentAnalyzedPattern) break;
    }

    if (!currentAnalyzedPattern) return;

    renderStaticAnalysis(currentAnalyzedPattern, response);
    generateFreshSentence(); // Buat contoh kalimat tambahan di modal
}

function renderStaticAnalysis(p, container) {
    let particleLogic = "Pola ini fokus pada perubahan bentuk kata kerja/sifat.";
    const label = p.label.toLowerCase();

    // Logika Penjelasan Partikel
    if (label.includes("ni")) {
        particleLogic = `Menggunakan partikel <span style="color:var(--miku-cyan)">に (ni)</span> karena pola ini merujuk pada <strong>titik tujuan</strong> atau <strong>waktu spesifik</strong> terjadinya kegiatan.`;
    } else if (label.includes("de")) {
        particleLogic = `Menggunakan partikel <span style="color:var(--miku-cyan)">で (de)</span> karena menekankan pada <strong>lokasi aktif</strong> atau <strong>alat/cara</strong> aktivitas dilakukan.`;
    } else if (label.includes("ga")) {
        particleLogic = `Menggunakan partikel <span style="color:var(--miku-cyan)">が (ga)</span> untuk memberikan penekanan kuat pada <strong>subjek</strong> atau menunjukkan suatu <strong>kemampuan</strong>.`;
    } else if (label.includes("o") || label.includes("を")) {
        particleLogic = `Menggunakan partikel <span style="color:var(--miku-cyan)">を (o)</span> sebagai penanda <strong>objek langsung</strong> yang menerima tindakan dari kata kerja.`;
    }

    container.innerHTML = `
        <div class="ai-deep-dive" style="text-align:center;">
            <h3 style="color:var(--miku-pink); font-family:Orbitron; text-shadow:0 0 10px var(--miku-pink);">${p.label}</h3>
            
            <div style="background:rgba(57,197,187,0.08); padding:15px; border-left:4px solid var(--miku-cyan); margin:20px 0; text-align:left;">
                <small style="color:var(--miku-cyan); font-family:Orbitron; font-size:0.6rem;">[AI_EXPLANATION]: WHY_THIS_PARTICLE?</small>
                <p style="font-size:0.95rem; color:#fff; margin-top:8px; line-height:1.6;">${particleLogic}</p>
            </div>

            <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:5px; text-align:left;">
                <p style="font-size:0.8rem; color:#aaa;"><strong>Aturan Penggunaan:</strong> <br> ${p.rules}</p>
            </div>
        </div>
    `;
}

// 5. HELPER FUNCTIONS (Navigation & UI)
function showPage(pageId) {
    const genPage = document.getElementById('page-generator');
    const mainHub = document.getElementById('chapter-list');
    
    if (pageId === 'generator') {
        genPage.classList.remove('hidden');
        mainHub.classList.add('hidden');
    } else {
        genPage.classList.add('hidden');
        mainHub.classList.remove('hidden');
    }
}

function selectChapter(num) {
    const data = grammarData['bab' + num];
    const modal = document.getElementById('detail-modal');
    const response = document.getElementById('ai-response');
    if (!data || !modal) return;

    modal.style.display = 'flex';
    response.innerHTML = `
        <h2 style="color:var(--miku-cyan); font-family:Orbitron; text-align:center;">BAB ${num}</h2>
        <p style="text-align:center; color:#888; margin-bottom:20px;">${data.title}</p>
        <div style="display:grid; gap:10px;">
            ${data.patterns.map(p => `
                <button onclick="openAIPopup('${p.id}')" style="background:#111; border:1px solid #333; color:#fff; padding:12px; cursor:pointer; text-align:left; border-radius:4px;">
                    <span style="color:var(--miku-pink)">[→]</span> ${p.label}
                </button>
            `).join('')}
        </div>
    `;
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
    if (!currentAnalyzedPattern || !container) return;
    container.innerHTML = `
        <div style="margin-top:20px; border-top:1px dashed #444; padding-top:15px; text-align:center;">
            <small style="color:var(--miku-pink); font-family:Orbitron;">[AI_VIRTUAL_EXAMPLE]</small>
            <p style="font-size:1.2rem; color:#fff; margin-top:8px;">わたしは ${currentAnalyzedPattern.label.replace('~','')}。</p>
        </div>
    `;
}

function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}
