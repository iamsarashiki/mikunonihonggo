// Render Daftar Navigasi
function renderSidebar() {
    const nav = document.getElementById('chapter-nav');
    for (let key in grammarData) {
        const btn = document.createElement('button');
        btn.className = 'chapter-btn';
        btn.innerHTML = `${grammarData[key].title} <span id="stat-${key}"></span>`;
        btn.onclick = () => loadArticle(key);
        nav.appendChild(btn);
        updateSidebarStatus(key);
    }
}

// Load Halaman Artikel
function loadArticle(chapterKey) {
    const viewer = document.getElementById('article-viewer');
    const data = grammarData[chapterKey];
    
    let html = `<h1>${data.title}</h1>`;
    
    data.patterns.forEach(p => {
        const isRead = userProgress[p.id]?.read ? 'checked' : '';
        const isMiku = userProgress[p.id]?.memorized ? 'active-star' : '';
        
        html += `
            <div class="grammar-block">
                <h3>${p.label}</h3>
                <div class="meta-info">
                    <span><b>Penggunaan:</b> ${p.usage}</span>
                </div>
                <p class="desc">${p.desc}</p>
                <div class="rules-box">${p.rules}</div>
                <div class="example-list">
                    ${p.examples.map(ex => `<div>• ${ex.jp} <br><small>${ex.id}</small></div>`).join('')}
                </div>
                <div class="action-bar">
                    <button class="btn-action ${userProgress[p.id]?.read ? 'btn-done' : ''}" 
                            onclick="toggleStatus('${p.id}', 'read', '${chapterKey}')">
                        <i class="fa-solid fa-check"></i> Sudah Dibaca
                    </button>
                    <button class="btn-action ${userProgress[p.id]?.memorized ? 'btn-star' : ''}" 
                            onclick="toggleStatus('${p.id}', 'memorized', '${chapterKey}')">
                        <i class="fa-solid fa-star"></i> Hafal
                    </button>
                </div>
            </div>
        `;
    });
    
    viewer.innerHTML = html;
}

function toggleStatus(id, type, chapterKey) {
    if (!userProgress[id]) userProgress[id] = { read: false, memorized: false };
    userProgress[id][type] = !userProgress[id][type];
    
    localStorage.setItem('mikuProgress', JSON.stringify(userProgress));
    loadArticle(chapterKey);
    updateSidebarStatus(chapterKey);
}

function updateSidebarStatus(chapterKey) {
    const statSpan = document.getElementById(`stat-${chapterKey}`);
    // Logika menghitung berapa yang sudah dibaca/hafal bisa ditambah di sini
}

renderSidebar();
// Fungsi untuk menghitung progress per bab
function updateSidebarStatus(chapterKey) {
    const statSpan = document.getElementById(`stat-${chapterKey}`);
    const data = grammarData[chapterKey];
    const totalPatterns = data.patterns.length;
    
    let readCount = 0;
    let memorizedCount = 0;

    data.patterns.forEach(p => {
        if (userProgress[p.id]?.read) readCount++;
        if (userProgress[p.id]?.memorized) memorizedCount++;
    });

    // Kalkulasi persentase (Fokus ke Memorized/Hafal)
    const percent = Math.round((memorizedCount / totalPatterns) * 100);
    
    statSpan.innerHTML = `
        <span class="badge ${percent === 100 ? 'badge-complete' : 'badge-process'}">
            ${percent}%
        </span>
    `;
}

// Tambahkan CSS untuk badge ini di style.css
// Tambahkan UI untuk Export/Import di Sidebar
const sidebar = document.querySelector('.chapter-sidebar');
const syncDiv = document.createElement('div');
syncDiv.style.marginTop = "20px";
syncDiv.style.paddingTop = "15px";
syncDiv.style.borderTop = "1px solid #333";

syncDiv.innerHTML = `
    <div style="font-size: 12px; color: var(--miku-cyan); margin-bottom: 10px; font-family: 'Orbitron';">Data Sync Protocol</div>
    <button onclick="exportData()" class="chapter-btn" style="font-size: 11px; text-align: center;">Export Progress</button>
    <button onclick="importData()" class="chapter-btn" style="font-size: 11px; text-align: center; border-color: var(--miku-pink);">Import Progress</button>
`;
sidebar.appendChild(syncDiv);

// Fungsi Export
function exportData() {
    const dataStr = localStorage.getItem('mikuProgress');
    if (!dataStr || dataStr === "{}") return alert("Belum ada progress untuk di-export!");
    
    // Copy ke clipboard
    navigator.clipboard.writeText(dataStr).then(() => {
        alert("Data Progress berhasil disalin! Simpan kode ini di catatan/WA untuk dipindah ke device lain.");
    });
}

// Fungsi Import
function importData() {
    const code = prompt("Masukkan kode progress yang sudah kamu copy sebelumnya:");
    if (code) {
        try {
            JSON.parse(code); // Validasi format
            localStorage.setItem('mikuProgress', code);
            location.reload(); // Refresh untuk update status
        } catch (e) {
            alert("Format kode tidak valid!");
        }
    }
}
