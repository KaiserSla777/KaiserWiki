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

    let musicaAtual = document.getElementById("musica-atual");

    if (!musicaAtual) return;

    musicaAtual.textContent = musicas[musica].nome;

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


/* =========================
   SALVAR MÚSICA
   ========================= */

function salvarEstado() {

    localStorage.setItem("musica", musica);
    localStorage.setItem("tempo", audio.currentTime);
    localStorage.setItem("volume", audio.volume);
}


/* =========================
   RECUPERAR MÚSICA
   ========================= */

function carregarEstado() {

    let musicaSalva = localStorage.getItem("musica");
    let tempoSalvo = localStorage.getItem("tempo");
    let volumeSalvo = localStorage.getItem("volume");

    if (musicaSalva !== null) {
        musica = Number(musicaSalva);
    }

    atualizarMusica();

    let volume = document.getElementById("volume");

    if (volume && volumeSalvo !== null) {

        audio.volume = Number(volumeSalvo);
        volume.value = Number(volumeSalvo);

    }

    audio.addEventListener("loadedmetadata", function() {

        if (tempoSalvo !== null) {
            audio.currentTime = Number(tempoSalvo);
        }

    }, { once: true });
}


/* =========================
   PROGRESSO
   ========================= */

audio.addEventListener("loadedmetadata", function() {

    let duracao = document.getElementById("duracao");

    if (duracao) {
        duracao.textContent = formatarTempo(audio.duration);
    }

});


audio.addEventListener("timeupdate", function() {

    let progresso = document.getElementById("progresso");

    if (progresso && !isNaN(audio.duration)) {

        progresso.value =
            (audio.currentTime / audio.duration) * 100;

    }

    let tempoAtual = document.getElementById("tempo-atual");

    if (tempoAtual) {

        tempoAtual.textContent =
            formatarTempo(audio.currentTime);

    }

    salvarEstado();

});


/* =========================
   BARRA DE PROGRESSO
   ========================= */

let barraProgresso = document.getElementById("progresso");

if (barraProgresso) {

    barraProgresso.addEventListener("input", function() {

        audio.currentTime =
            (this.value / 100) * audio.duration;

    });

}


/* =========================
   VOLUME
   ========================= */

let barraVolume = document.getElementById("volume");

if (barraVolume) {

    barraVolume.addEventListener("input", function() {

        audio.volume = this.value;

        salvarEstado();

    });

}


/* =========================
   DISCO
   ========================= */

audio.addEventListener("play", function() {

    let disco = document.querySelector(".disco");

    if (disco) {
        disco.classList.add("girando");
    }

});


audio.addEventListener("pause", function() {

    let disco = document.querySelector(".disco");

    if (disco) {
        disco.classList.remove("girando");
    }

});


/* =========================
   QUANDO ACABAR
   ========================= */

audio.addEventListener("ended", function() {

    proximaMusica();

});


/* =========================
   FORMATA TEMPO
   ========================= */

function formatarTempo(segundos) {

    let minutos = Math.floor(segundos / 60);

    let segundosRestantes =
        Math.floor(segundos % 60);

    if (segundosRestantes < 10) {

        segundosRestantes =
            "0" + segundosRestantes;

    }

    return minutos + ":" + segundosRestantes;
}


/* =========================
   INICIAR
   ========================= */

carregarEstado();


/* =========================
   PESQUISA DA KAISERWIKI
   ========================= */

let artigos = [

    {
        nome: "Grand Theft Auto V",
        descricao: "Jogo de ação e aventura da Rockstar Games.",
        link: "artigos/gta.html"
    },

    {
        nome: "Minecraft",
        descricao: "Jogo sandbox de exploração, construção e sobrevivência.",
        link: "artigos/minecraft.html"
    },

    {
        nome: "Hollow Knight",
        descricao: "Jogo de ação e aventura ambientado em Hallownest.",
        link: "artigos/hollow-knight.html"
    },

    {
        nome: "Dying Light",
        descricao: "Jogo de ação e sobrevivência com parkour.",
        link: "artigos/dying-light.html"
    },

    {
        nome: "Half-Life 2",
        descricao: "Clássico jogo de tiro em primeira pessoa da Valve.",
        link: "artigos/half-life-2.html"
    },
    
    {
    nome: "Tokyo Ghoul",
    descricao: "Anime de ação, terror e fantasia sombria.",
    link: "artigos/tokyo-ghoul.html"
    },


    {
    nome: "The God of High School",
    descricao: "Anime de ação e artes marciais.",
    link: "artigos/the-god-of-high-school.html"
    },

    {
    nome: "Solo Leveling",
    descricao: "Anime de ação e fantasia que acompanha a evolução de Sung Jin-Woo.",
    link: "artigos/solo-leveling.html"
    },

    {
    nome: "Fire Force",
    descricao: "Anime de ação e fantasia sobre brigadas especiais que combatem os Infernais.",
    link: "artigos/fire-force.html"
    },

    {
    nome: "The Walking Dead",
    descricao: "Série de drama, terror e ação em um mundo pós-apocalíptico.",
    link: "artigos/the-walking-dead.html"
    },

    {
    nome: "Stranger Things",
    descricao: "Série de ficção científica, terror e mistério.",
    link: "artigos/stranger-things.html"
    },

    {
    nome: "Invocação do Mal",
    descricao: "Filme de terror e suspense dirigido por James Wan.",
    link: "artigos/invocacao-do-mal.html"
    },

    {
    nome: "Corra!",
    descricao: "Filme de terror e suspense dirigido por Jordan Peele.",
    link: "artigos/corra.html"
    },

    {
    nome: "Filmes e Séries",
    descricao: "Categoria de filmes e séries da KaiserWiki.",
    link: "artigos/filmes.html"
    },

    {
    nome: "Curiosidades",
    descricao: "Fatos curiosos e informações interessantes.",
    link: "artigos/curiosidades.html"
    },

    {
    nome: "Terror",
    descricao: "Jogos, filmes, criaturas e mistérios assustadores.",
    link: "artigos/terror.html"
    },

    {
    nome: "The Walking Dead",
    descricao: "Série de drama, terror e ação em um mundo pós-apocalíptico.",
    link: "artigos/the-walking-dead.html"
    },

    {
    nome: "Stranger Things",
    descricao: "Série de ficção científica, terror e mistério.",
    link: "artigos/stranger-things.html"
    },

    {
    nome: "Invocação do Mal",
    descricao: "Filme de terror e suspense dirigido por James Wan.",
    link: "artigos/invocacao-do-mal.html"
    },

    {
    nome: "Corra!",
    descricao: "Filme de terror e suspense dirigido por Jordan Peele.",
    link: "artigos/corra.html"
    },

    {
    nome: "Sexta-Feira 13",
    descricao: "Franquia clássica de terror conhecida pelo personagem Jason Voorhees.",
    link: "artigos/sexta-feira-13.html"
    },

    {
    nome: "Pânico",
    descricao: "Franquia de terror e suspense conhecida pelo personagem Ghostface.",
    link: "artigos/panico.html"
    },

    {
    nome: "O Exorcista",
    descricao: "Clássico filme de terror sobrenatural.",
    link: "artigos/o-exorcista.html"
    },

    {
    nome: "Resident Evil",
    descricao: "Franquia de jogos de terror e sobrevivência criada pela Capcom.",
    link: "artigos/resident-evil.html"
    },

    {
    nome: "Outlast",
    descricao: "Jogo de terror e sobrevivência desenvolvido pela Red Barrels.",
    link: "artigos/outlast.html"
    }
];


function pesquisar() {

    let campo = document.getElementById("campo-pesquisa");

    let resultados = document.getElementById("resultados");

    if (!campo || !resultados) return;

    let texto =
        campo.value.toLowerCase().trim();

    resultados.innerHTML = "";

    if (texto === "") {
        return;
    }

    let encontrados = artigos.filter(function(artigo) {

        return artigo.nome
            .toLowerCase()
            .includes(texto);

    });


    if (encontrados.length === 0) {

        resultados.innerHTML =
            "<p>❌ Nenhum artigo encontrado.</p>";

        return;

    }


    encontrados.forEach(function(artigo) {

        resultados.innerHTML += `

            <div class="resultado">

                <a href="${artigo.link}">
                    ★ ${artigo.nome}
                </a>

                <p>
                    ${artigo.descricao}
                </p>

            </div>

        `;

    });

}
/* =========================
   CURIOSIDADE DO DIA
   ========================= */

let curiosidades = [

    {
        categoria: "💻 Tecnologia",
        titulo: "Você sabia?",
        texto: "Reiniciar um dispositivo pode resolver alguns problemas temporários porque programas e processos são carregados novamente."
    },

    {
        categoria: "🔐 Segurança",
        titulo: "Dica útil",
        texto: "Evite usar a mesma senha em várias contas. Se uma senha vazar, outras contas também podem ficar vulneráveis."
    },

    {
        categoria: "🌎 Geografia",
        titulo: "Você sabia?",
        texto: "A Terra gira em torno de seu próprio eixo e também orbita o Sol."
    },

    {
        categoria: "🧠 Ciência",
        titulo: "Você sabia?",
        texto: "O sono participa de processos importantes relacionados à memória, aprendizagem e recuperação do organismo."
    },

    {
        categoria: "🧊 Ciência",
        titulo: "Você sabia?",
        texto: "O gelo flutua na água porque possui densidade menor que a água líquida."
    },

    {
        categoria: "🌱 Natureza",
        titulo: "Você sabia?",
        texto: "As plantas realizam fotossíntese, utilizando luz, água e dióxido de carbono para produzir matéria orgânica."
    },

    {
        categoria: "📱 Tecnologia",
        titulo: "Dica útil",
        texto: "Manter aplicativos e sistemas atualizados pode corrigir problemas e melhorar a segurança do dispositivo."
    },

    {
        categoria: "🌐 Internet",
        titulo: "Dica útil",
        texto: "Antes de clicar em um link suspeito, confira o endereço do site e procure sinais de páginas falsas."
    },

    {
        categoria: "💾 Computadores",
        titulo: "Você sabia?",
        texto: "Arquivos importantes podem ser perdidos por falhas de hardware, exclusões acidentais ou outros problemas. Fazer backups ajuda a evitar essa perda."
    },

    {
        categoria: "🔋 Tecnologia",
        titulo: "Dica útil",
        texto: "Fechar aplicativos que você não está usando pode liberar memória e recursos em alguns dispositivos."
    },

    {
        categoria: "🌡️ Ciência",
        titulo: "Você sabia?",
        texto: "A temperatura é uma medida relacionada à energia térmica das partículas de uma substância."
    },

    {
        categoria: "🌙 Astronomia",
        titulo: "Você sabia?",
        texto: "A Lua não possui luz própria. O brilho que vemos vem da luz do Sol refletida por sua superfície."
    },

    {
        categoria: "☀️ Astronomia",
        titulo: "Você sabia?",
        texto: "A luz do Sol leva cerca de 8 minutos e 20 segundos para chegar à Terra."
    },

    {
        categoria: "🧪 Ciência",
        titulo: "Você sabia?",
        texto: "A água é formada por moléculas compostas por dois átomos de hidrogênio e um de oxigênio."
    },

    {
        categoria: "🗺️ Geografia",
        titulo: "Você sabia?",
        texto: "Os mapas são representações da superfície terrestre e podem destacar diferentes informações, como relevo, fronteiras ou estradas."
    },

    {
        categoria: "📚 Estudos",
        titulo: "Dica útil",
        texto: "Estudar em sessões menores e fazer pausas pode ajudar a manter a concentração por mais tempo."
    },

    {
        categoria: "🧠 Estudos",
        titulo: "Dica útil",
        texto: "Explicar um assunto com suas próprias palavras é uma maneira de verificar se você realmente entendeu o conteúdo."
    },

    {
        categoria: "💰 Cotidiano",
        titulo: "Dica útil",
        texto: "Anotar seus gastos ajuda a entender para onde seu dinheiro está indo."
    },

    {
        categoria: "🔎 Internet",
        titulo: "Dica útil",
        texto: "Quando uma informação parecer muito surpreendente, procure outras fontes confiáveis antes de acreditar ou compartilhar."
    },

    {
        categoria: "⚡ Ciência",
        titulo: "Você sabia?",
        texto: "A eletricidade está relacionada ao movimento e à interação de cargas elétricas."
    }

];

function mostrarCuriosidade() {

    let titulo = document.getElementById("titulo-curiosidade");
    let texto = document.getElementById("texto-curiosidade");
    let data = document.getElementById("data-curiosidade");

    if (!titulo || !texto || !data) return;

    let hoje = new Date();

    let inicio = new Date(hoje.getFullYear(), 0, 0);

    let diferenca =
        hoje - inicio;

    let umDia =
        1000 * 60 * 60 * 24;

    let diaDoAno =
        Math.floor(diferenca / umDia);

    let indice =
        diaDoAno % curiosidades.length;

    titulo.textContent =
        curiosidades[indice].categoria + " " +
        curiosidades[indice].titulo;

    texto.textContent =
        curiosidades[indice].texto;

    data.textContent =
        "📅 Curiosidade do dia: " +
        hoje.toLocaleDateString("pt-BR");
}

mostrarCuriosidade();

/* =========================
/* =========================
   EASTER EGG SECRETO
   ========================= */

let codigoSecreto = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight"
];

let teclasDigitadas = [];

/* PC - sequência de teclas */

document.addEventListener("keydown", function(event) {

    teclasDigitadas.push(event.key);

    if (teclasDigitadas.length > codigoSecreto.length) {
        teclasDigitadas.shift();
    }

    let acertou = teclasDigitadas.every(function(tecla, indice) {
        return tecla === codigoSecreto[indice];
    });

    if (acertou) {
        window.location.href = "paginas/segredo.html";
    }

});


/* CELULAR - tocar 8 vezes no logo */

let logoSecreto = document.getElementById("logo-secreto");

let toques = 0;
let ultimoToque = 0;

if (logoSecreto) {

    logoSecreto.addEventListener("click", function() {

        let agora = Date.now();

        if (agora - ultimoToque > 1500) {
            toques = 0;
        }

        toques++;

        ultimoToque = agora;

        if (toques >= 8) {
            window.location.href = "paginas/segredo.html";
        }

    });

}

function desbloquearArquivo() {

    let senha = document.getElementById("senha-secreta").value
        .toLowerCase()
        .trim();

    let mensagem = document.getElementById("mensagem-secreta");

    if (senha === "kaiser") {

        mensagem.textContent = "🔓 ACESSO CONCEDIDO...";

        setTimeout(function() {

            if (window.location.pathname.includes("/paginas/")) {
                window.location.href = "arquivo-oculto.html";
            } else {
                window.location.href = "paginas/arquivo-oculto.html";
            }

        }, 1000);

    } else {

        mensagem.textContent = "❌ Palavra incorreta.";

    }

}

function desbloquearNamorada() {

    let senha = document.getElementById("senha-namorada").value
        .toLowerCase()
        .trim();

    let mensagem = document.getElementById("mensagem-namorada");

    if (senha === "25/07") {

        mensagem.textContent = "💗 ACESSO CONCEDIDO...";

        setTimeout(function() {

            window.location.href = "para-ela.html";

        }, 1000);

    } else {

        mensagem.textContent = "❌ Essa senha não parece ser a certa...";

    }

}