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








// Database Status Offline
let userProgress = JSON.parse(localStorage.getItem('miku_n4_progress')) || {};
let userUnderstanding = JSON.parse(localStorage.getItem('miku_n4_understood')) || {};
let swiperInstance = null;

// Fungsi Render Slider dengan Dual Status (Star & Check)
function selectChapter(num, element) {
    document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    const chapterKey = 'bab' + num;
    const data = grammarData[chapterKey];
    const wrapper = document.getElementById('pattern-slider');
    
    wrapper.innerHTML = ''; 

    if (data && data.patterns) {
        data.patterns.forEach(p => {
            const isStarred = userProgress[p.id] ? 'active' : '';
            const isUnderstood = userUnderstanding[p.id] ? 'active' : '';
            const cardClass = userUnderstanding[p.id] ? 'is-understood' : '';
            
            const slide = document.createElement('div');
            slide.className = `swiper-slide ${cardClass}`;
            slide.innerHTML = `
                <div class="card-actions">
                    <button class="star-btn ${isStarred}" onclick="event.stopPropagation(); toggleStar('${p.id}', this)">★</button>
                    <button class="check-btn ${isUnderstood}" onclick="event.stopPropagation(); toggleCheck('${p.id}', this)">✔</button>
                </div>
                
                <div class="understood-label">COMPLETED</div>

                <div class="card-label">${p.label}</div>
                <p class="card-desc">${p.desc}</p>
                
                <div class="preview-box" style="margin-top:20px; padding:10px; background:rgba(255,255,255,0.03); border-radius:5px;">
                    <small style="color:var(--miku-pink); font-family:Orbitron; font-size:0.6rem;">EXAMPLE_STREAM</small>
                    <p style="font-size:0.85rem; margin-top:5px; font-style:italic;">${p.examples[0].jp}</p>
                </div>

                <button class="btn-learn-more" onclick="openDeepDive('${p.id}')" style="margin-top:auto; padding:12px; border:1px solid var(--miku-cyan); background:transparent; color:white; font-family:Orbitron; cursor:pointer;">ACCESS_DATA</button>
            `;
            wrapper.appendChild(slide);
        });

        if (swiperInstance) swiperInstance.destroy();
        swiperInstance = new Swiper(".mySwiper", {
            effect: "coverflow", grabCursor: true, centeredSlides: true,
            slidesPerView: "auto", coverflowEffect: { rotate: 20, stretch: 0, depth: 100, modifier: 1, slideShadows: false },
            pagination: { el: ".swiper-pagination", clickable: true }
        });
    }
}

// FUNGSI CHECKLIST (SUDAH MENGERTI)
function toggleCheck(id, btn) {
    const slide = btn.closest('.swiper-slide');
    
    if (userUnderstanding[id]) {
        delete userUnderstanding[id];
        btn.classList.remove('active');
        slide.classList.remove('is-understood');
    } else {
        userUnderstanding[id] = true;
        btn.classList.add('active');
        slide.classList.add('is-understood');
        
        // Efek Suara/Notifikasi kecil (Opsional)
        console.log(`[SYSTEM]: Pola ${id} ditandai sebagai SELESAI.`);
    }
    
    // Simpan Offline
    localStorage.setItem('miku_n4_understood', JSON.stringify(userUnderstanding));
}

// Update Fungsi Export untuk menyertakan data Checklist
function exportData() {
    const allData = {
        stars: userProgress,
        checks: userUnderstanding
    };
    const dataString = JSON.stringify(allData);
    
    navigator.clipboard.writeText(dataString).then(() => {
        alert("SARASHIKI_SYSTEM: Semua data (Hafal & Checklist) berhasil disalin!");
    });
}

// Update Fungsi Import
function importData() {
    const inputCode = prompt("MASUKKAN KODE SINKRONISASI:");
    if (inputCode) {
        try {
            const parsed = JSON.parse(inputCode);
            userProgress = parsed.stars || {};
            userUnderstanding = parsed.checks || {};
            
            localStorage.setItem('miku_n4_progress', JSON.stringify(userProgress));
            localStorage.setItem('miku_n4_understood', JSON.stringify(userUnderstanding));
            
            alert("SYSTEM: Sinkronisasi Berhasil!");
            location.reload();
        } catch (e) {
            alert("ERROR: Kode tidak kompatibel.");
        }
    }
}

function toggleStar(id, btn) {
    if (userProgress[id]) {
        delete userProgress[id];
        btn.classList.remove('active');
    } else {
        userProgress[id] = true;
        btn.classList.add('active');
    }
    localStorage.setItem('miku_n4_progress', JSON.stringify(userProgress));
}
    
