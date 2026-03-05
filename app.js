// Global Variables
let swiperInstance = null;
let userProgress = JSON.parse(localStorage.getItem('mikuProgress')) || {};

// 1. Fungsi Utama untuk Memulai Aplikasi
function initApp() {
    console.log("System Check: Memulai Sinkronisasi Bab...");
    const list = document.getElementById('chapter-list');
    
    // Pastikan grammarData sudah ada
    if (typeof grammarData === 'undefined') {
        console.error("ERROR: Data 'grammarData' tidak ditemukan! Pastikan grammar_data.js sudah dipanggil.");
        list.innerHTML = "<div style='color:red; padding:10px;'>Data Error: grammar_data.js not found.</div>";
        return;
    }

    list.innerHTML = '';
    // Render Bab 1 - 25
    for (let i = 1; i <= 25; i++) {
        const chapterKey = 'bab' + i;
        const data = grammarData[chapterKey];
        
        if (data) {
            const item = document.createElement('div');
            item.className = 'chapter-item';
            // Ambil judul setelah tanda titik dua
            const titleDisplay = data.title.includes(':') ? data.title.split(':')[1] : data.title;
            item.innerHTML = `<span style="color:var(--miku-pink)">[B${i}]</span> ${titleDisplay}`;
            item.onclick = () => selectChapter(i, item);
            list.appendChild(item);
        }
    }
    console.log("System Check: 25 Bab Berhasil Dimuat.");
}

// 2. Fungsi Memilih Bab & Render Slider
function selectChapter(num, element) {
    // UI Update
    document.querySelectorAll('.chapter-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    const chapterKey = 'bab' + num;
    const data = grammarData[chapterKey];
    const wrapper = document.getElementById('pattern-slider');
    
    wrapper.innerHTML = ''; // Reset Slider

    if (data && data.patterns) {
        data.patterns.forEach(p => {
            const isMemorized = userProgress[p.id] ? 'active' : '';
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <button class="star-btn ${isMemorized}" onclick="event.stopPropagation(); toggleMemorize('${p.id}', this)">★</button>
                <div class="card-label">${p.label}</div>
                <div style="font-size:0.85rem; color:#888; margin-bottom:10px; font-family:Orbitron;">ID: ${p.id}</div>
                <p class="card-desc" style="color:#ccc; font-size:0.95rem; line-height:1.5;">${p.desc}</p>
                
                <div style="margin-top:auto; padding-top:15px; border-top:1px solid #222;">
                    <div style="color:var(--miku-pink); font-size:0.7rem; margin-bottom:5px;">PREVIEW_DATA:</div>
                    <div style="font-style:italic; font-size:0.85rem;">${p.examples[0].jp}</div>
                </div>

                <button class="btn-learn-more" onclick="openDeepDive('${p.id}')" style="width:100%; margin-top:15px; padding:10px; border:1px solid var(--miku-cyan); background:transparent; color:white; font-family:Orbitron; cursor:pointer;">DETAIL_ANALYSIS</button>
            `;
            wrapper.appendChild(slide);
        });

        // Re-inisialisasi Swiper
        if (swiperInstance) swiperInstance.destroy();
        swiperInstance = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            coverflowEffect: { rotate: 20, stretch: 0, depth: 100, modifier: 1, slideShadows: false },
            pagination: { el: ".swiper-pagination", clickable: true }
        });

        // Update Status Player
        document.getElementById('now-playing').innerText = `ANALYZING: ${data.title}`;
    }
}

// 3. FITUR OTOMATIS: AI Pattern Generator (Simulasi)
function generateNewSentence(pattern) {
    const responseContainer = document.getElementById('ai-response');
    responseContainer.innerHTML += `<div style="color:var(--miku-cyan); margin: 15px 0;">[SYSTEM]: Generating new pattern from Bab ${pattern.id.split('.')[0]}...</div>`;
    
    // Database Kosakata N4 untuk Generator
    const subjects = ["Watashi", "Tanaka-san", "Miku", "Tomodachi", "Kazoku"];
    const objects = ["Sake", "Nihongo", "Sushi", "Anime", "Uta"];
    const places = ["Osaka", "Tokyo", "Gakkou", "Kouen"];

    const s = subjects[Math.floor(Math.random() * subjects.length)];
    const o = objects[Math.floor(Math.random() * objects.length)];
    const p = places[Math.floor(Math.random() * places.length)];

    let generatedText = "";
    
    // Logika cerdas sederhana berdasarkan kata kunci pola
    if(pattern.label.includes("wa")) {
        generatedText = `${s} wa ${o} ga suki desu. (Saya suka ${o})`;
    } else if(pattern.label.includes("ni")) {
        generatedText = `${s} wa ${p} ni ikimasu. (Saya pergi ke ${p})`;
    } else {
        generatedText = `${s} wa ${o} o mimasu. (Saya melihat ${o})`;
    }

    setTimeout(() => {
        responseContainer.innerHTML += `
            <div style="background:rgba(255,20,147,0.1); padding:10px; border-left:3px solid var(--miku-pink);">
                <strong>NEW_VARIATION:</strong><br>
                ${generatedText}<br>
                <small style="color:#888;">*AI-Generated for practice only.</small>
            </div>
        `;
        responseContainer.scrollTop = responseContainer.scrollHeight;
    }, 1000);
}

// 4. Selebihnya fungsi pendukung (Hafal, Export, Import, Modal)
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
            <h3 style="color:var(--miku-cyan)">[DATA_ANALYSIS: ${pattern.label}]</h3><br>
            <strong>RULES:</strong> ${pattern.rules}<br>
            <strong>USAGE:</strong> ${pattern.usage}<br><br>
            <strong>CORE_EXAMPLE:</strong><br>
            ${pattern.examples[0].jp}<br>
            <span style="color:#888;">(${pattern.examples[0].id})</span>
        `;
        typeWriterEffect(responseContainer, content);
    }, 600);
}

function typeWriterEffect(element, text) {
    let i = 0; element.innerHTML = "";
    function typing() {
        if (i < text.length) {
            if (text.charAt(i) === '<') i = text.indexOf('>', i) + 1; else i++;
            element.innerHTML = text.substring(0, i);
            setTimeout(typing, 5);
        }
    }
    typing();
}

function closeModal() { document.getElementById('detail-modal').style.display = 'none'; }
function exportData() { navigator.clipboard.writeText(localStorage.getItem('mikuProgress')).then(() => alert("Progress Berhasil Di-export!")); }
function importData() { const code = prompt("Paste Progress Code:"); if(code) { localStorage.setItem('mikuProgress', code); location.reload(); } }

// Pastikan inisialisasi dipanggil setelah halaman siap
window.addEventListener('DOMContentLoaded', initApp);
