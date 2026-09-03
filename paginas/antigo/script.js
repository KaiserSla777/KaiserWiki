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
    document.getElementById("musica-atual").textContent =
        musicas[musica].nome;

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

    salvarEstado();
}

function musicaAnterior() {
    musica--;

    if (musica < 0) {
        musica = musicas.length - 1;
    }

    atualizarMusica();
    tocarMusica();

    salvarEstado();
}

/* SALVAR MÚSICA E POSIÇÃO */

function salvarEstado() {
    localStorage.setItem("musica", musica);
    localStorage.setItem("tempo", audio.currentTime);
    localStorage.setItem("volume", audio.volume);
}

/* RECUPERAR MÚSICA */

function carregarEstado() {
    let musicaSalva = localStorage.getItem("musica");
    let tempoSalvo = localStorage.getItem("tempo");
    let volumeSalvo = localStorage.getItem("volume");

    if (musicaSalva !== null) {
        musica = Number(musicaSalva);
    }

    atualizarMusica();

    if (volumeSalvo !== null) {
        audio.volume = Number(volumeSalvo);
        document.getElementById("volume").value = Number(volumeSalvo);
    }

    audio.addEventListener("loadedmetadata", function() {
        if (tempoSalvo !== null) {
            audio.currentTime = Number(tempoSalvo);
        }
    }, { once: true });
}

/* PROGRESSO */

audio.addEventListener("loadedmetadata", function() {
    document.getElementById("duracao").textContent =
        formatarTempo(audio.duration);
});

audio.addEventListener("timeupdate", function() {
    let progresso = document.getElementById("progresso");

    if (!isNaN(audio.duration)) {
        progresso.value =
            (audio.currentTime / audio.duration) * 100;
    }

    document.getElementById("tempo-atual").textContent =
        formatarTempo(audio.currentTime);

    salvarEstado();
});

/* BARRA DE PROGRESSO */

document.getElementById("progresso").addEventListener("input", function() {
    audio.currentTime =
        (this.value / 100) * audio.duration;
});

/* VOLUME */

document.getElementById("volume").addEventListener("input", function() {
    audio.volume = this.value;
    salvarEstado();
});

/* DISCO */

audio.addEventListener("play", function() {
    document.querySelector(".disco").classList.add("girando");
});

audio.addEventListener("pause", function() {
    document.querySelector(".disco").classList.remove("girando");
});

/* QUANDO ACABAR */

audio.addEventListener("ended", function() {
    proximaMusica();
});

/* FORMATA TEMPO */

function formatarTempo(segundos) {
    let minutos = Math.floor(segundos / 60);
    let segundosRestantes = Math.floor(segundos % 60);

    if (segundosRestantes < 10) {
        segundosRestantes = "0" + segundosRestantes;
    }

    return minutos + ":" + segundosRestantes;
}

/* INICIAR */

carregarEstado();