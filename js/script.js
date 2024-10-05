document.addEventListener('DOMContentLoaded', () => {
    const cartasFacil = [
        { name: 'celtics', img: 'images/celtics.png' },
        { name: 'chicago', img: 'images/chicago.png' },
        { name: 'dallas', img: 'images/dallas.png' },
        { name: 'golden state', img: 'images/golden_state.png' },
        { name: 'miami heat', img: 'images/miami_heat.png' },
        { name: 'oklahoma', img: 'images/oklahoma.png' },
        { name: 'celtics', img: 'images/celtics.png' },
        { name: 'chicago', img: 'images/chicago.png' },
        { name: 'dallas', img: 'images/dallas.png' },
        { name: 'golden state', img: 'images/golden_state.png' },
        { name: 'miami heat', img: 'images/miami_heat.png' },
        { name: 'oklahoma', img: 'images/oklahoma.png' }
    ];

    const cartasDificil = [
        { name: 'celtics', img: 'images/celtics.png' },
        { name: 'chicago', img: 'images/chicago.png' },
        { name: 'dallas', img: 'images/dallas.png' },
        { name: 'golden state', img: 'images/golden_state.png' },
        { name: 'miami heat', img: 'images/miami_heat.png' },
        { name: 'oklahoma', img: 'images/oklahoma.png' },
        { name: 'celtics', img: 'images/celtics.png' },
        { name: 'chicago', img: 'images/chicago.png' },
        { name: 'dallas', img: 'images/dallas.png' },
        { name: 'golden state', img: 'images/golden_state.png' },
        { name: 'miami heat', img: 'images/miami_heat.png' },
        { name: 'oklahoma', img: 'images/oklahoma.png' },
        { name: 'celtics', img: 'images/celtics.png' },
        { name: 'chicago', img: 'images/chicago.png' },
        { name: 'dallas', img: 'images/dallas.png' },
        { name: 'golden state', img: 'images/golden_state.png' },
        { name: 'miami heat', img: 'images/miami_heat.png' },
        { name: 'oklahoma', img: 'images/oklahoma.png' },
        { name: 'celtics', img: 'images/celtics.png' },
        { name: 'chicago', img: 'images/chicago.png' },
        { name: 'dallas', img: 'images/dallas.png' },
        { name: 'golden state', img: 'images/golden_state.png' },
        { name: 'miami heat', img: 'images/miami_heat.png' },
        { name: 'oklahoma', img: 'images/oklahoma.png' }
    ];

    let cartasSelecionadas = cartasFacil; // Cartas padrão para o nível fácil
    let tempoMemorizacao = 1000; // Tempo padrão de memorização
    const tabuleiro = document.querySelector('.tabuleiro');
    const placar = document.querySelector('#pontuacao');
    const btnJogarNovamente = document.querySelector('#btn-jogar-novamente'); // Botão jogar novamente
    
    let pontuacao = 0;
    let cartasEscolhidas = [];
    let cartasEscolhidasId = [];
    let combinacaoCartas = [];

    // Botões para escolher a dificuldade
    const botaoFacil = document.querySelector('#facil');
    const botaoDificil = document.querySelector('#dificil');

    // Adicionar eventos para os botões de dificuldade
    botaoFacil.addEventListener('click', () => iniciarJogo('facil'));
    botaoDificil.addEventListener('click', () => iniciarJogo('dificil'));

    // Função para iniciar o jogo com base no nível
    function iniciarJogo(nivel) {
        btnJogarNovamente.style.display = 'none'; // Esconder o botão no início do jogo

        if (nivel === 'facil') {
            cartasSelecionadas = cartasFacil; // 12 cartas no nível fácil
            tempoMemorizacao = 1000; // 1 segundo para memorizar
            tabuleiro.classList.remove('nivel-dificil'); // Remover classe do difícil, caso exista
            tabuleiro.classList.add('nivel-facil'); // Adicionar classe do fácil
        } else if (nivel === 'dificil') {
            cartasSelecionadas = cartasDificil; // 24 cartas no nível difícil
            tempoMemorizacao = 500; // Meio segundo para memorizar
            tabuleiro.classList.remove('nivel-facil'); // Remover classe do fácil, caso exista
            tabuleiro.classList.add('nivel-dificil'); // Adicionar classe do difícil
        }

        cartasSelecionadas.sort(() => 0.5 - Math.random());
        criarTabuleiro();
        combinacaoCartas = []; // Limpar combinações
        pontuacao = 0; // Resetar pontuação
        atualizarPlacar(); // Reiniciar o placar
    }

    // Função para criar o tabuleiro
    function criarTabuleiro() {
        tabuleiro.innerHTML = ''; // Limpar o tabuleiro anterior
        for (let i = 0; i < cartasSelecionadas.length; i++) {
            const carta = document.createElement('img');
            carta.setAttribute('src', 'images/nba_logo.png');
            carta.setAttribute('data-id', i);
            carta.addEventListener('click', revelarCarta);
            tabuleiro.appendChild(carta);
        }
    }

    // Função para atualizar o placar
    function atualizarPlacar() {
        placar.textContent = `Pontuação: ${pontuacao}`;
    }

    // Função para verificar se houve uma combinação
    function verificarCombinacao() {
        const cartasNoTabuleiro = document.querySelectorAll('img');
        const [idCarta1, idCarta2] = cartasEscolhidasId;

        if (cartasEscolhidas[0] === cartasEscolhidas[1] && idCarta1 !== idCarta2) {
            // Se as cartas combinarem, deixá-las "apagadas"
            cartasNoTabuleiro[idCarta1].setAttribute('src', 'images/certo.png');
            cartasNoTabuleiro[idCarta2].setAttribute('src', 'images/certo.png');
            cartasNoTabuleiro[idCarta1].removeEventListener('click', revelarCarta);
            cartasNoTabuleiro[idCarta2].removeEventListener('click', revelarCarta);
            combinacaoCartas.push(cartasEscolhidas);
            pontuacao += 10; // Adicionar 10 pontos para cada combinação correta
        } else {
            // Se não combinar, virar as cartas de volta após o tempo definido e subtrair 2 pontos
            setTimeout(() => {
                cartasNoTabuleiro[idCarta1].setAttribute('src', 'images/nba_logo.png');
                cartasNoTabuleiro[idCarta2].setAttribute('src', 'images/nba_logo.png');
                pontuacao -= 2; // Subtrair 2 pontos para cada erro
                atualizarPlacar();
            }, tempoMemorizacao);
        }

        // Limpar arrays para a próxima jogada
        cartasEscolhidas = [];
        cartasEscolhidasId = [];

        // Atualizar o placar após o acerto
        atualizarPlacar();

        // Verificar se todas as combinações foram encontradas
        if (combinacaoCartas.length === cartasSelecionadas.length / 2) {
            placar.textContent = 'Parabéns! Você encontrou todas as combinações!';
            salvarPontuacao();
            mostrarRanking();
            btnJogarNovamente.style.display = 'block'; // Mostrar o botão "Jogar Novamente" ao final do jogo
        }
    }

    // Função para revelar a carta ao clicar
    function revelarCarta() {
        let cartaId = this.getAttribute('data-id');

        // Verificar se a carta já foi clicada
        if (!cartasEscolhidasId.includes(cartaId)) {
            cartasEscolhidas.push(cartasSelecionadas[cartaId].name);
            cartasEscolhidasId.push(cartaId);
            this.setAttribute('src', cartasSelecionadas[cartaId].img);

            // Verificar se já foram selecionadas duas cartas
            if (cartasEscolhidas.length === 2) {
                setTimeout(verificarCombinacao, 500);
            }
        }
    }

    // Função para salvar a pontuação no ranking
    function salvarPontuacao() {
        const nomeJogador = prompt('Insira seu nome para o ranking:');
        if (!nomeJogador) return;

        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];
        ranking.push({ nome: nomeJogador, pontuacao });

        // Ordenar o ranking por pontuação (do maior para o menor)
        ranking.sort((a, b) => b.pontuacao - a.pontuacao);

        // Salvar no LocalStorage
        localStorage.setItem('ranking', JSON.stringify(ranking));
    }

    // Função para exibir o ranking
    function mostrarRanking() {
        let ranking = JSON.parse(localStorage.getItem('ranking')) || [];

        const rankingDiv = document.querySelector('#ranking');
        rankingDiv.innerHTML = '<h2>Ranking</h2><ul>';
        
        ranking.forEach((jogador, index) => {
            rankingDiv.innerHTML += `<li>${index + 1}. ${jogador.nome}: ${jogador.pontuacao} pontos</li>`;
        });

        rankingDiv.innerHTML += '</ul>';
    }

    // Adicionar evento para o botão de jogar novamente
    btnJogarNovamente.addEventListener('click', () => {
        iniciarJogo('facil'); // Reiniciar o jogo no modo fácil por padrão
    });
});
