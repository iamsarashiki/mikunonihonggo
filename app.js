// ==========================================
// SARASHIKI_OS v4.1: STABLE_CENTRAL_CORE
// ==========================================

let currentAnalyzedPattern = null;

// 1. BOOTING SYSTEM (Mencegah Bab tidak muncul)
window.onload = () => {
    console.log("%c [SYS] SARASHIKI_OS: SYSTEM_RESTORE_SUCCESS ", "color:#39c5bb; background:#000; font-weight:bold;");
    
    // Pastikan data dan elemen tersedia
    if (typeof grammarData !== 'undefined' && document.getElementById('chapter-list')) {
        renderCentralHub();      
        populateBabSelect();  
    } else {
        console.error("[!] CRITICAL_ERROR: Elemen #chapter-list atau grammarData tidak ditemukan!");
    }
};

// 2. RENDER CENTRAL HUB (Bab di Tengah & Scrollable)
function renderCentralHub() {
    const list = document.getElementById('chapter-list');
    if (!list) return;

    list.innerHTML = ''; 

    // Tombol Akses AI Generator
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
    `;
    genBtn.innerHTML = `[ ACCESS_AI_LAB ]`;
    genBtn.onclick = () => showPage('generator');
    list.appendChild(genBtn);

    // Render Bab 1 - 25
    for (let i = 1; i <= 25; i++) {
        const babData = grammarData['bab' + i];
        if (!babData) continue;

        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-item';
        chapterDiv.style.cssText = `
            padding: 15px;
            border: 1px solid #222;
            margin-bottom: 10px;
            width: 100%;
            max-width: 400px;
            cursor: pointer;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(0,0,0,0.5);
        `;
        
        chapterDiv.innerHTML = `
            <span style="color:var(--miku-cyan); font-family:Orbitron; font-size: 0.7rem;">LEVEL_0${i}</span>
            <span style="color:#fff; font-weight: bold; margin-top: 5px; text-align: center;">${babData.title}</span>
        `;
        
        chapterDiv.onclick = () => selectChapter(i);
        list.appendChild(chapterDiv);
    }
}

// 3. GENERATOR LOGIC
function generateNewBatch() {
    const babId = document.getElementById('select-bab-gen').value;
    const resultGrid = document.getElementById('ai-result-grid');
    if (!babId) return alert("Pilih Bab-nya dulu, Sarashiki!");

    resultGrid.innerHTML = '<div class="neon-text-cyan blink">SYNCING_DATA...</div>';
    
    setTimeout(() => {
        resultGrid.innerHTML = '';
        const patterns = grammarData['bab' + babId].patterns;
        
        patterns.forEach(p => {
            const card = document.createElement('div');
            card.className = 'ai-result-card';
            card.style.cssText = `
                background:#0a0a0a; border:1px solid #222; border-top: 4px solid var(--miku-cyan);
                padding: 20px; margin-bottom: 20px; border-radius: 8px; width: 90%; max-width: 450px;
            `;
            
            card.innerHTML = `
                <div style="color:var(--miku-pink); font-family:Orbitron; font-size:0.6rem; margin-bottom:10px;">[${p.id}]</div>
                <p style="font-size:1.4rem; color:#fff; margin-bottom:5px;">ミクさんは ${p.label.replace('~','')}。</p>
                <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:4px; font-size:0.85rem; color:#eee;">
                    <strong>Artinya:</strong> Miku melakukan ${p.label}.
                </div>
                <button onclick="openAIPopup('${p.id}')" style="margin-top:15px; width:100%; background:transparent; border:1px dashed var(--miku-cyan); color:var(--miku-cyan); padding:8px; cursor:pointer;">ANALISIS</button>
            `;
            resultGrid.appendChild(card);
        });
    }, 500);
}

// 4. NAVIGATION & MODAL
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
        <div style="display:grid; gap:10px; margin-top:20px;">
            ${data.patterns.map(p => `
                <button onclick="openAIPopup('${p.id}')" style="background:#111; border:1px solid #333; color:#fff; padding:12px; cursor:pointer; text-align:left;">
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
        opt.textContent = `BAB ${i}`;
        select.appendChild(opt);
    }
}

function openAIPopup(pId) { alert("Membuka Analisis: " + pId); /* Tambahkan logika analisis jika perlu */ }
function closeModal() { document.getElementById('detail-modal').style.display = 'none'; }
