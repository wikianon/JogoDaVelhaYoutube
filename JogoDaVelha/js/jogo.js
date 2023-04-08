/*Logica do Jogo da Velha*/

//Selecionando todas as células pegando o atributo "data-cell"
const cellElements = document.querySelectorAll("[data-cell]");

//Selecionando a board pelo atributo "data-board"
const board = document.querySelector("[data-board]");

//Pegando o atributo pra colocar a mensagen na tela
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");

//Pegando a caixa da mensagen pelo atributo para colocar a mensagen na tela.
const winningMessage = document.querySelector("[data-winning-message]");

//Selecionando o botão de Reiniciar
const restartButton = document.querySelector("[data-restart-button]");

//Variavel para verificar a vez do marcador
let isCircleTurn;


/*Lista para verificar as combinaçoes da vitória na matriz
0,1,2
3,4,5
6,7,8
*/
const winningCombinations = [

  //Vitórias na horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  //Vitórias na vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //Vitórias na diagonal
  [0, 4, 8],
  [2, 4, 6],
];

/*Classe para pegar os jogadores da partida
********************************************/
//Variaveis globais para pegar o nome dos jogadores
var jogador1, jogador2;
var jogadorAtual;

class Jogador {
  constructor(nome) {
    this.nome = nome;
  }
}

function setLabelJogador() {
  document.getElementById("jogadorAtual").innerHTML = "<h1>Jogador atual: <span style='color: red'>" + jogadorAtual.nome + "</span></h1>";
}

//Para esconder a board e mostrar o formulario temos que colocar dentro do window.onload.
window.onload = function () {

  //Mostra o formulario dos jogadores
  document.getElementById("formJogadores").style.visibility = "visible";

  //Deixa a board do jogo escondida até definir os nomes.
  document.getElementById("boardId").style.visibility = "hidden";

  //Deixa o label do jogadorAtual escondido até definir os nomes dos jogadores.
  document.getElementById("jogadorAtual").style.visibility = "hidden";

}

//Função para pegar os nomes dos jogadores
function getJogadores(){

  let nomeJogador1 = document.getElementById("jogador1").value;

  let nomeJogador2 = document.getElementById("jogador2").value;

  jogador1 = new Jogador(nomeJogador1); //Xis

  jogador2 = new Jogador(nomeJogador2); //Circle
}

//Função que coloca ao lado da classe board a classe "circle ou xis"
function startGame() {

  getJogadores();

  //Após definição dos jogadores mostra a tabela do jogo
  document.getElementById("boardId").style.visibility = "visible";

  //Após definição dos jogadores esconde o formulário
  document.getElementById("formJogadores").style.visibility = "hidden";

  //Após esconder o formulário dos jogadores mostra o jogador atual da rodada.
  document.getElementById("jogadorAtual").style.visibility = "visible";

  //Começa pelo Xis
  isCircleTurn = true;

  for (const cell of cellElements) {

    cell.classList.remove("xis");

    cell.classList.remove("circle");

    cell.removeEventListener("click", handleClick);

    cell.addEventListener("click", handleClick, { once: true });

  }

  setBoardHoverClass();

  winningMessage.classList.remove("show-winning-message");

  //Quando reiniciar a partida limpa os campos de input
  document.getElementById("jogador1").value = "";
  document.getElementById("jogador2").value = "";
}

//Função que irá encerrar o jogo
function endGame(isDraw) {

  if (isDraw) {

    winningMessageTextElement.innerText = "Empate!";

  } else {

    winningMessageTextElement.innerHTML = isCircleTurn
      ? "<span style='color: blue;'>" + jogador1.nome.toString().toUpperCase() + "</span>" + " Venceu!"
      : "<span style='color: blue;'>" + jogador2.nome.toString().toUpperCase() + "</span>" + " Venceu!";

  }

  /*Adicionando a classe "show-winning-message", 
  na div onde esta a classe "winning-message",
  para mostrar a mensagen de vitória.*/
  winningMessage.classList.add("show-winning-message");
}

//Função que irá verificar as vitórias.
function checkForWin(currentPlayer) {

  return winningCombinations.some((combination) => {

    return combination.every((index) => {

      return cellElements[index].classList.contains(currentPlayer);

    });

  });

}

//Função que irá verificar o empate
function checkForDraw() {

  return [...cellElements].every((cell) => {

    return cell.classList.contains("xis") || cell.classList.contains("circle");

  });
}

//Função para adicionar o Circulo ou X na célula
function placeMark(cell, classToAdd) {

  cell.classList.add(classToAdd);

}

//Função que remove o Circulo ou X da célula
function setBoardHoverClass() {

  board.classList.remove("xis");
  board.classList.remove("circle");

  if (isCircleTurn) {

    board.classList.add("xis");

    //Seta o jogador atual da rodada
    jogadorAtual = jogador1;
    setLabelJogador();

  } else {

    board.classList.add("circle");

    //Seta o jogador Atual da rodada
    jogadorAtual = jogador2;
    setLabelJogador();

  }
}

//Função que irá mudar de Jogador
function swapTurns() {

  isCircleTurn = !isCircleTurn;

  setBoardHoverClass();

}

function handleClick(e) {

  //Coloca a marca (X ou Círculo)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "xis" : "circle";

  placeMark(cell, classToAdd);

  //Verifica por vitória
  const isWin = checkForWin(classToAdd);

  //Verifica por empate
  const isDraw = checkForDraw();

  if (isWin) {

    //Vitoria
    endGame(false);

    //Empate
  } else if (isDraw) {

    endGame(true);

  } else {

    //Muda o Marcador para Circulo ou X
    swapTurns();

  }
}

//startGame();

restartButton.addEventListener("click", function (e) {

  startGame();

  //Após reiniciar o jogo mostra o formulário
  document.getElementById("formJogadores").style.visibility = "visible";

  //Após reiniciar o jogo esconde a board do jogo
  document.getElementById("boardId").style.visibility = "hidden";

  //Após reiniciar o jogo esconde o label do jogadorAtual
  document.getElementById("jogadorAtual").style.visibility = "hidden";
});