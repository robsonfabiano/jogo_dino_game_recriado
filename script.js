const dino = document.querySelector('.dino'); //Seleciona todo o elemento (classe) .dino do css.
const backgrownd = document.querySelector('.fundoPrincipal');


let estaPulando = false; //para verificar depois se está pulando, não pular até descer
let posicaoDinossauro = 0;

console.log(dino);//testa no console do browser se está chamando o elemento  querySelector armazanado na constante dino

function lidaComKeyup(evento1) {
    if (evento1.keyCode === 32) {// compara se foi pressionada a tecla com código 32, que é o espaço
        if (!estaPulando) {
            pular();
        }
    }
}

//Função que muda a posição do elemento dino para cima de 10 em 10 px a cada 20 milisegundos de intervalo até 150 px
//E faz descer quando estiver em 150px de 10 em 10 px a cada 20 ms.
function pular() {    
    estaPulando = true;
    let upIntervalo = setInterval(() => {
        if (posicaoDinossauro >= 150) {
            clearInterval(upIntervalo); //limpa intervalo apos subida

            //Função que faz o elemento descer de 10 em 10 px até chegar em na posição 0 
            let downIntervalo = setInterval(() => {
                if (posicaoDinossauro <= 0) {
                    clearInterval(downIntervalo);  // Limpa intervalo antes de descer  
                    estaPulando = false;
                } else {
                    posicaoDinossauro -= 10;
                    dino.style.bottom = posicaoDinossauro + 'px';
                }
            }, 20);


        } else {
            posicaoDinossauro += 10; //Faz subir a posição em 10px
            dino.style.bottom = posicaoDinossauro + 'px';
        }

    }, 20);//Intervalo de 20 milisegundos


}


function criaCactus() {
    const cacto = document.createElement('div'); //Cria uma div no html 
    let posicaoCactus = 1000;
    let tempoRandomico = Math.random() * 6000;//Gera número aleatório, entre 0,0 e 1,0 que aqui será utilizado para o tempo que aparecerá un novo cacto

    cacto.classList.add('cactus'); //Adiciona uma classe class="cactus" na div criada acima para ser estilizada como CSS
    backgrownd.appendChild(cacto); //Cria filho
    cacto.style.left = posicaoCactus + 'px';


    let leftIntervalo = setInterval(() => {
        if (posicaoCactus < -60) {
            clearInterval(leftIntervalo);
            backgrownd.removeChild(cacto);
        } else if (posicaoCactus > 0 && posicaoCactus < 60 && posicaoDinossauro < 60) {//Caso entre em contato com o dinossauro:
            //game over
            clearInterval(leftIntervalo);
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';

        } else {
            posicaoCactus -= 10;
            cacto.style.left = posicaoCactus + 'px'; //posiciona o elemento cacto tantos pixels da esquerda para a direita
        }

    }, 20);
setTimeout(criaCactus, tempoRandomico); //chama a própria função para gerar outro cacto com tempo randômico

}

criaCactus();

document.addEventListener('keyup', lidaComKeyup); //Adiciona um evento tipo keyup e chama a função lidaComKeyup para tratá-la
