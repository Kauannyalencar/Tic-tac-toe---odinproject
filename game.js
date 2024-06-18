const square = document.querySelectorAll(".square")
const player = document.querySelector(".word");
const winnerPara = document.querySelector(".winner");
let gameActive = false;
const modal = document.querySelector(".modal")
const p1 = document.querySelector("input#p1")
const p2 = document.querySelector("input#p2")
const endScreen = document.querySelector(".btns-end")
const reset = document.querySelector(".reset")

let currentPlayer = {
  name: '',
  mark: "X"

}


const gameBoard = Array(9).fill('')

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]
//Iterar por cada combinação para ver se alguma "bate".
const changePlayer = () => {
  currentPlayer.mark = currentPlayer.mark === "X" ? "O" : "X"
  currentPlayer.name = currentPlayer.name === p1.value ? p2.value : p1.value
  player.textContent = currentPlayer.mark
}

function checkWinner(currentPl) {
  for (const cada of winningCombinations) {
    const [a, b, c] = cada

    //  It extracts values from the right-hand side (the iterable object or array)
    console.log(gameBoard[a], gameBoard[b], gameBoard[c]);
    if (gameBoard[a] === currentPl && gameBoard[b] === gameBoard[a] && gameBoard[b] === gameBoard[c]) {
      gameActive = false
      player.textContent = ''
      return true
    }
  }

  gameBoard.some(board => board === "" ? gameActive = true : gameActive = false)

}

//Colocando a mark na posição do click
square.forEach((place, i) => {
  place.addEventListener("click", () => {
    if (place.textContent.trim() === '' && gameActive) {
      gameBoard[i] = currentPlayer.mark;
      place.textContent = gameBoard[i]
      gamePlay()
      console.log(gameActive);
      changePlayer()
    } else if (!gameActive) {
      resetGame()
      return;
    } else {
      alert("Ocupado")
    }
  })
});

const gamePlay = () => {
  if (checkWinner(currentPlayer.mark)) {
    winnerPara.textContent = `${currentPlayer.name} won!`
  }else if (!gameActive) {
    alert("tie")
  }
}

function resetGame() {
  gameBoard.fill('')
  square.forEach(item => item.textContent = '')
  const playAgain = document.createElement('button')
  endScreen.appendChild(playAgain)
  playAgain.addEventListener("click", location.reload())
}

modal.addEventListener("submit", (e) => {
  e.preventDefault()
  if (p1.value === '') {
    alert("Please enter a name")
  }else{
    modal.style.display = 'none';
    currentPlayer.name = p1.value
    gameActive = true
  }
})

reset.addEventListener("click", resetGame)
