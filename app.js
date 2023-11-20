let listaDeNumerosSorteados = [];
let multiplicadorDoRandom = 100;
let numeroSecreto = gerarNumeroAleatorio (); tentativas = 1;

function exibirTextonaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextonaTela('h1', 'Jogo do Número Secreto - Versão 1.0, criado por Filipe Ballico de Moraes.');
    exibirTextonaTela('p', 'Escolha um número entre 1 e 100');
    document.getElementById('chutar').removeAttribute('disabled');
}

exibirMensagemInicial();

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        verificarChute().click;
        console.log('Chutei');
    }
})

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextonaTela('h1', 'Parabéns! Você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextonaTela('p', mensagemTentativas);
        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled')
    } else {
        if (chute > numeroSecreto) {
            exibirTextonaTela('h1', 'Não! Você errou!');
            exibirTextonaTela('p', 'O número é menor!');
        } else {
            exibirTextonaTela('h1', 'Não! Você errou!');
            exibirTextonaTela('p', 'O número é maior!');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * multiplicadorDoRandom + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == multiplicadorDoRandom) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio ();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}