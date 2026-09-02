let musica = 0;

let musicas = [
    {
        nome: "A Ultima Djamba - Link Do Zap",
        arquivo: "musicas/ultimadjamba.mp3"
    },
    {
        nome: "Drain You - Nirvana",
        arquivo: "musicas/drainyou.mp3"
    },
    {
        nome: "OSK - Nebrugg",
        arquivo: "musicas/osk.mp3"
    },
    {
        nome: "Do Lado Dela - Lil Zé",
        arquivo: "musicas/doladodela.mp3"
    }
];

let audio = new Audio();

function atualizarMusica() {
    document.getElementById("musica-atual").textContent = musicas[musica].nome;
    audio.src = musicas[musica].arquivo;
}

function tocarMusica() {
    audio.play();
}

function pausarMusica() {
    audio.pause();
}

function proximaMusica() {
    musica++;

    if (musica >= musicas.length) {
        musica = 0;
    }

    atualizarMusica();
    tocarMusica();
}

function musicaAnterior() {
    musica--;

    if (musica < 0) {
        musica = musicas.length - 1;
    }

    atualizarMusica();
    tocarMusica();
}

audio.addEventListener("loadedmetadata", function() {
    document.getElementById("duracao").textContent =
        formatarTempo(audio.duration);
});

audio.addEventListener("timeupdate", function() {
    let progresso = document.getElementById("progresso");

    progresso.value = (audio.currentTime / audio.duration) * 100;

    document.getElementById("tempo-atual").textContent =
        formatarTempo(audio.currentTime);
});

document.getElementById("progresso").addEventListener("input", function() {
    audio.currentTime =
        (this.value / 100) * audio.duration;
});

document.getElementById("volume").addEventListener("input", function() {
    audio.volume = this.value;
});

audio.addEventListener("ended", function() {
    proximaMusica();
});

/* DISCO GIRANDO */

audio.addEventListener("play", function() {
    document.querySelector(".disco").classList.add("girando");
});

audio.addEventListener("pause", function() {
    document.querySelector(".disco").classList.remove("girando");
});

function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = Math.floor(segundos % 60);

    if (segundosRestantes < 10) {
        segundosRestantes = "0" + segundosRestantes;
    }

    return minutos + ":" + segundosRestantes;
}

atualizarMusica();