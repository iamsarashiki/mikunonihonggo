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
