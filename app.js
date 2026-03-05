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
let swiperInstance = null;
let userProgress = JSON.parse(localStorage.getItem('mikuProgress')) || {};

// 1. Inisialisasi Sidebar
function initSidebar() {
    const list = document.getElementById('chapter-list');
    list.innerHTML = '';
    for (let i = 1; i <= 25; i++) {
        const item = document.createElement('div');
        item.className = 'chapter-item';
        const title = grammarData['bab' + i] ? grammarData['bab' + i].title.split(':')[1] : 'Materi';
        item.innerText = `BAB ${i}: ${title}`;
        item.onclick = () => selectChapter(i, item);
        list.appendChild(item);
    }
}

// 2. Render Slider dengan Tombol Bintang
function selectChapter(num, element) {
    document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    const chapterKey = 'bab' + num;
    const data = grammarData[chapterKey];
    const wrapper = document.getElementById('pattern-slider');
    wrapper.innerHTML = '';

    if (data) {
        data.patterns.forEach(p => {
            const isMemorized = userProgress[p.id] ? 'active' : '';
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <button class="star-btn ${isMemorized}" onclick="toggleMemorize('${p.id}', this)">★</button>
                <div class="card-label" style="color:var(--miku-cyan); font-family:Orbitron; margin-bottom:15px; font-size:1.1rem;">${p.label}</div>
                <p style="font-size:0.9rem; color:#ccc; height: 80px; overflow:hidden;">${p.desc}</p>
                <div style="margin-top:20px; border-top:1px solid #333; padding-top:10px;">
                    <small style="color:var(--miku-pink)">PREVIEW:</small>
                    <p style="font-style:italic; font-size:0.85rem; margin-top:5px;">${p.examples[0].jp}</p>
                </div>
                <button class="btn-learn-more" onclick="openDeepDive('${p.id}')" style="margin-top:auto; padding:12px; border:1px solid var(--miku-cyan); background:transparent; color:white; cursor:pointer; font-family:Orbitron;">DETAIL_DATA</button>
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

// 3. Fitur Hafal (Bintang)
function toggleMemorize(id, btn) {
    if (userProgress[id]) {
        delete userProgress[id];
        btn.classList.remove('active');
    } else {
        userProgress[id] = true;
        btn.classList.add('active');
    }
    localStorage.setItem('mikuProgress', JSON.stringify(userProgress));
}

// 4. AI Deep Dive & Auto-Generator
function openDeepDive(id) {
    const modal = document.getElementById('detail-modal');
    const responseContainer = document.getElementById('ai-response');
    const loading = document.getElementById('ai-loading');
    const genBtn = document.getElementById('ai-generate-btn');
    
    let pattern = null;
    for (let k in grammarData) {
        pattern = grammarData[k].patterns.find(p => p.id === id);
        if (pattern) break;
    }

    modal.style.display = 'flex';
    responseContainer.innerHTML = '';
    loading.classList.remove('hidden');

    genBtn.onclick = () => generateNewSentence(pattern);

    setTimeout(() => {
        loading.classList.add('hidden');
        const content = `
            <strong>[ANALISIS AI]</strong><br>Pola: ${pattern.label}<br>
            Struktur: ${pattern.rules}<br><br>
            Penjelasan: ${pattern.desc}<br><br>
            Contoh Utama: ${pattern.examples[0].jp}<br>
            Artinya: ${pattern.examples[0].id}
        `;
        typeWriterEffect(responseContainer, content);
    }, 800);
}

// 5. Fitur Otomatis Membuat Kalimat Baru (Simulasi AI)
function generateNewSentence(pattern) {
    const responseContainer = document.getElementById('ai-response');
    responseContainer.innerHTML += `<br><br><span style="color:var(--miku-cyan)">[GENERATE_NEW_DATA...]</span><br>`;
    
    // Logika simulasi pembuatan pola otomatis
    const vocab = ["Gohan", "Nihongo", "Miku", "Tokyo", "Ongaku"];
    const randomVocab = vocab[Math.floor(Math.random() * vocab.length)];
    
    setTimeout(() => {
        const newSentence = `<strong>KALIMAT BARU:</strong><br> ${randomVocab} ${pattern.label.includes('wo') ? 'wo' : ''} ... (AI sedang menyesuaikan konteks dengan ${randomVocab}). <br> <em>Gunakan pola ini untuk melatih kreativitasmu!</em>`;
        responseContainer.innerHTML += newSentence;
        responseContainer.scrollTop = responseContainer.scrollHeight;
    }, 1000);
}

// 6. Sync Functions
function exportData() {
    const data = localStorage.getItem('mikuProgress');
    navigator.clipboard.writeText(data).then(() => alert("Data berhasil disalin!"));
}

function importData() {
    const code = prompt("Paste data progress di sini:");
    if(code) {
        localStorage.setItem('mikuProgress', code);
        location.reload();
    }
}

function typeWriterEffect(element, text) {
    let i = 0; element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            if (text.charAt(i) === '<') i = text.indexOf('>', i) + 1; else i++;
            element.innerHTML = text.substring(0, i);
            setTimeout(typing, 10);
        }
    }
    typing();
}

function closeModal() { document.getElementById('detail-modal').style.display = 'none'; }

window.onload = () => { initSidebar(); };
