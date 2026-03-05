let currentAudio = new Audio();

function playTrack(title, file) {
    const playerText = document.getElementById('now-playing');
    const progressBar = document.getElementById('progress');

    // Animasi Ganti Lagu
    playerText.innerText = "LOADING...";
    
    setTimeout(() => {
        playerText.innerText = "NOW PLAYING: " + title;
        // Di sini kamu ganti dengan file asli dari YouTube/Spotify/Server kamu
        // currentAudio.src = file; 
        // currentAudio.play();
    }, 500);
}

// Update Progress Bar (Dummy Simulation)
setInterval(() => {
    const bar = document.getElementById('progress');
    let width = parseInt(bar.style.width) || 0;
    if (width < 100) bar.style.width = (width + 1) + "%";
    else bar.style.width = "0%";
}, 1000);
