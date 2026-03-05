// ==========================================
// SARASHIKI_OS v3.7: ULTIMATE_NEON_CORE
// ==========================================

let currentAnalyzedPattern = null;

// ==========================================
// FIX: SIDEBAR RENDERER & SYSTEM BOOT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log("SARASHIKI_OS: Initializing...");
    
    // Gunakan interval kecil untuk memastikan grammarData sudah ter-load
    const checkData = setInterval(() => {
        if (typeof grammarData !== 'undefined') {
            clearInterval(checkData);
            renderSidebar();
            populateBabSelect();
            console.log("SARASHIKI_OS: Database Connected & Sidebar Rendered.");
        }
    }, 100);
});

function renderSidebar() {
    const sidebarNav = document.getElementById('chapter-list');
    if (!sidebarNav) return console.error("Element #chapter-list tidak ditemukan!");

    sidebarNav.innerHTML = ''; // Clear existing content

    // 1. Tombol Generator (Neon Style)
    const genNav = document.createElement('div');
    genNav.className = 'chapter-item special-nav';
    genNav.style.border = "1px solid var(--miku-pink)";
    genNav.style.boxShadow = "0 0 10px rgba(255, 0, 127, 0.2)";
    genNav.innerHTML = `<span style="color:var(--miku-pink); text-shadow:0 0 5px var(--miku-pink);">[AI]</span> POLA GENERATOR`;
    genNav.onclick = () => {
        showPage('generator');
        if(window.innerWidth < 768) toggleSidebar(); 
    };
    sidebarNav.appendChild(genNav);

    const hr = document.createElement('hr');
    hr.style.borderColor = "#222";
    hr.style.margin = "15px 0";
    sidebarNav.appendChild(hr);

    // 2. Render Bab 01 - 25
    for (let i = 1; i <= 25; i++) {
        const babKey = 'bab' + i;
        const babData = grammarData[babKey];
        
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-item';
        // Tambahkan efek Neon Cyan pada nomor bab
        const title = babData ? babData.title : `CHAPTER ${i}`;
        
        chapterDiv.innerHTML = `
            <span class="ch-num" style="color:var(--miku-cyan); font-family:Orbitron; text-shadow:0 0 5px var(--miku-cyan);">${i < 10 ? '0' + i : i}</span>
            <span class="ch-title" style="margin-left:10px; color:#fff;">${title}</span>
        `;
        
        chapterDiv.onclick = () => {
            // Remove active class from others
            document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
            chapterDiv.classList.add('active');
            
            // Neon effect on active
            chapterDiv.style.borderRight = "3px solid var(--miku-cyan)";
            
            selectChapter(i); 
            if(window.innerWidth < 768) toggleSidebar(); 
        };
        sidebarNav.appendChild(chapterDiv);
    }
}

// 3. POP-UP & AI ANALYSIS ENGINE
function selectChapter(num) {
    const data = grammarData['bab' + num];
    const modal = document.getElementById('detail-modal');
    const response = document.getElementById('ai-response');
    const loading = document.getElementById('ai-loading');

    if (!data || !modal) return;

    modal.style.display = 'flex';
    loading.classList.remove('hidden');
    response.innerHTML = '';
    document.getElementById('ai-generated-container').innerHTML = '';

    setTimeout(() => {
        loading.classList.add('hidden');
        let htmlContent = `
            <div class="modal-bab-header">
                <h3 style="color:var(--miku-cyan); font-family:Orbitron; text-shadow:0 0 8px var(--miku-cyan);">BAB ${num}: ${data.title}</h3>
                <p style="font-size:0.75rem; color:#888; margin-bottom:15px;">DATABASE_SYNC_SUCCESSFUL</p>
            </div>
            <div class="modal-pattern-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px;">
        `;

        data.patterns.forEach(p => {
            htmlContent += `
                <button onclick="openAIPopup('${p.id}')" class="btn-ai-gen" style="text-align:left; width:100%; padding:12px; background:#0a0a0a; border:1px solid #333; color:#fff; cursor:pointer;">
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

    // Tombol Refresh di Footer Pop-up
    const refreshBtn = document.getElementById('gen-btn-ai');
    if(refreshBtn) refreshBtn.onclick = () => generateFreshSentence();

    renderStaticAnalysis(currentAnalyzedPattern, response);
    generateFreshSentence();
}

function renderStaticAnalysis(p, container) {
    let particleLogic = "AI menganalisis struktur perubahan kata.";
    const label = p.label.toLowerCase();

    // Logika Penjelasan Partikel Bahasa Indonesia
    if (label.includes("ni")) particleLogic = "Partikel <span style='color:var(--miku-cyan)'>に (ni)</span> digunakan karena menunjukkan target tujuan atau waktu spesifik.";
    else if (label.includes("de")) particleLogic = "Partikel <span style='color:var(--miku-cyan)'>で (de)</span> digunakan karena menunjukkan lokasi aktivitas atau alat yang digunakan.";
    else if (label.includes("ga")) particleLogic = "Partikel <span style='color:var(--miku-cyan)'>が (ga)</span> digunakan untuk menekankan subjek atau menunjukkan kemampuan/potensi.";
    else if (label.includes("o") || label.includes("を")) particleLogic = "Partikel <span style='color:var(--miku-cyan)'>を (o)</span> digunakan sebagai penanda objek langsung dari tindakan.";

    container.innerHTML = `
        <div class="ai-deep-dive">
            <h3 style="color:var(--miku-pink); font-family:Orbitron; text-shadow:0 0 5px var(--miku-pink);">${p.label}</h3>
            <div style="background:rgba(57,197,187,0.05); padding:15px; border-left:3px solid var(--miku-cyan); margin:15px 0;">
                <strong style="color:var(--miku-cyan); font-size:0.7rem;">[WHY_THIS_PARTICLE?]</strong>
                <p style="font-size:0.9rem; color:#fff; margin-top:5px; line-height:1.5;">${particleLogic}</p>
            </div>
            <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:4px;">
                <p style="font-size:0.8rem; color:#aaa;"><strong>Aturan:</strong> ${p.rules}</p>
            </div>
        </div>
    `;
}

// 4. GENERATOR LAB (MULTILINGUAL)
function generateNewBatch() {
    const babId = document.getElementById('select-bab-gen').value;
    const resultGrid = document.getElementById('ai-result-grid');
    if (!babId) return alert("Pilih Bab Dahulu!");

    resultGrid.innerHTML = '<div style="color:var(--miku-cyan);" class="blink">SYNCING_NEON_DATA...</div>';
    
    setTimeout(() => {
        resultGrid.innerHTML = '';
        const patterns = grammarData['bab' + babId].patterns;
        
        patterns.forEach(p => {
            const characters = [{jp:"ミクさん", ro:"Miku-san", id:"Miku"}, {jp:"リザルさん", ro:"Rizaru-san", id:"Rizal"}];
            const char = characters[Math.floor(Math.random() * characters.length)];
            const card = document.createElement('div');
            card.className = 'ai-result-card';
            card.style.cssText = "background:#0a0a0a; border:1px solid #222; border-left:4px solid var(--miku-cyan); padding:15px; margin-bottom:12px; border-radius:4px;";
            
            card.innerHTML = `
                <div style="color:var(--miku-pink); font-size:0.6rem; font-family:Orbitron; margin-bottom:5px;">[${p.id}]</div>
                <p style="font-size:1.2rem; color:#fff; margin-bottom:2px;">${char.jp} は ${p.label.replace('~','')}。</p>
                <p style="font-size:0.8rem; color:var(--miku-cyan); margin-bottom:10px;">${char.ro} wa ${p.label.replace('~','').toLowerCase()}.</p>
                <div style="background:rgba(255,255,255,0.02); padding:8px; font-size:0.85rem;">
                    <strong>Artinya:</strong> ${char.id} melakukan ${p.label}.
                </div>
                <button onclick="openAIPopup('${p.id}')" style="margin-top:10px; width:100%; background:transparent; border:1px solid #333; color:var(--miku-cyan); padding:5px; cursor:pointer; font-size:0.6rem; font-family:Orbitron;">DETAIL_ANALYZE</button>
            `;
            resultGrid.appendChild(card);
        });
    }, 600);
}

// 5. MISC FUNCTIONS
function generateFreshSentence() {
    const container = document.getElementById('ai-generated-container');
    if (!currentAnalyzedPattern) return;
    container.innerHTML = `
        <div style="margin-top:20px; border-top:1px dashed #444; padding-top:15px;">
            <small style="color:var(--miku-pink); font-family:Orbitron;">[AI_GENERATED_EXAMPLE]</small>
            <p style="font-size:1.1rem; color:#fff; margin-top:5px;">わたしは ${currentAnalyzedPattern.label.replace('~','')}。</p>
        </div>
    `;
}

function showPage(pageId) {
    const genPage = document.getElementById('page-generator');
    const mainSwiper = document.querySelector('.mySwiper');
    if (pageId === 'generator') {
        genPage.classList.remove('hidden');
        if(mainSwiper) mainSwiper.classList.add('hidden');
    } else {
        genPage.classList.add('hidden');
        if(mainSwiper) mainSwiper.classList.remove('hidden');
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

function closeModal() { document.getElementById('detail-modal').style.display = 'none'; }
