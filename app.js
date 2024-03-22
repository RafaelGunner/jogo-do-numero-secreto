let listaDeNumerossorteados = [];
let numeroLimite = 10000
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextos(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextos('h1', 'Jogo do Número Secreto');
    exibirTextos('p', 'Escolha um número entre 1 e 10000');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextos('h1', 'Acertou Mizeravi');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}`
        exibirTextos('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextos('p', 'O Número Secreto é MENOR');
        } else {
            exibirTextos('p', 'O Número secreto é MAIOR');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerossorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerossorteados = [];
    }

    if (listaDeNumerossorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerossorteados.push(numeroEscolhido);
        console.log(listaDeNumerossorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}