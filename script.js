// thinking later to make the players custimizable and was going to use classes to accomplish this
class Player {
   constructor(name, icon){
    this.name = name;
    this.icon = icon;
   }
}
// connecting my tiles via the dom.
const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
const box5 = document.querySelector("#box5");
const box6 = document.querySelector("#box6");
const box7 = document.querySelector("#box7");
const box8 = document.querySelector("#box8");
const box9 = document.querySelector("#box9");
// query selecting useful elements.
const message = document.querySelector(".message")
const gameBoard = document.querySelector(".game-board")
const footerMessage = document.querySelector("footer h2")
const player1 = document.querySelector("#score1")
const player2 = document.querySelector("#score2")
const scoreStat1 = document.querySelector(".score-stat1")
const scoreStat2 = document.querySelector(".score-stat2")
const playAgain  = document.querySelector(".play-again")

// declaring to variables
// this one will be used to change which icon is being submitted
let iconToBoard = "";
// this is used to determine whose turn it is
let turn1 = true;
// temporary while I sort out some other features hope to make it so icons change
const icon1 = "X";
const icon2 = "O";

score1 = 0
score2 = 0
// this is going to be used in a function that will change the vairable depending on if turn 1 is true or not.
let player = "";

let playerArray;
// checking if game over

//recording players moves
p1 = [];
p2 = [];
//Array of all the winning combinations
const winArray = [
  ["0", "1", "2"],
  ["0", "4", "8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["2", "4", "6"],
  ["3", "4", "5"],
  ["6", "7", "8"],
]
// create button for play again
again = document.createElement("button");
playAgain.append(again);
again.classList.add("replay-button");
playAgain.classList.add("hidden")
again.innerText = "Reset";
// function to change the variable player, this functions purpose is so I have a variable with the name of the player whose turn just went.
const changePlayer = () => {
  if(!turn1) {
    player = player1.innerText;
  } else {
    player = player2.innerText;
  }
}

//function which changes which icon is being submitted and changes the turn1 and determines which icon is displayed.
const turn = () => {
  if(turn1){
    iconToBoard = icon1;
    turn1 = false;
  } else {
    iconToBoard = icon2;
    turn1 = true;
    }
}

//function to change the message at the top of the page
const checkTurn = () => {
  changePlayer()
  if (turn1) {
    message.innerText = "It is player 1's turn."
  } else {
    message.innerText = "It is player 2's turn."
  }
} 

// function in the event listener which makes the icons appear.
const move = (e) => {
  let tile = e.target
  let tileIndex = tile.getAttribute(["data-index"])
  if (tile.innerText === ""){
    turn()
    checkTurn()
    tile.innerText = iconToBoard
    if(!turn1) {
      p1.push(tileIndex)
      p1 = p1.sort()
    } else {
      p2.push(tileIndex)
      p2 = p2.sort()
    }
  } 
  
  currentPlayer()
  endCheck()
  checkDraw()
  stopGame()
}

const start = () => {
  if (message.innerText === "Click a square to begin"){
    checkTurn()
  }
}
const clickBox = () => {
  box1.addEventListener("click", move);
  box2.addEventListener("click", move);
  box3.addEventListener("click", move);
  box4.addEventListener("click", move);
  box5.addEventListener("click", move);
  box6.addEventListener("click", move);
  box7.addEventListener("click", move);
  box8.addEventListener("click", move);
  box9.addEventListener("click", move);
}
clickBox()
gameBoard.addEventListener("click", start)

let checkWin = false
let check = false
// adding each players move into a seperate array I plan on using this to ultimatly compare against the win conditions to check to see if someone has won
const currentPlayer = () => {
  if(!turn1) {
    playerArray = p1
    return playerArray
  } else {
    playerArray = p2
    return playerArray
  }
}
// comparing the player Arrays with the win conditions. Loops through every win condition. If every value in the win condition is found in a player Array then the game ends
const endCheck = () => {
  if (playerArray.length > 2) {
    for(let i = 0; i<winArray.length; i++){
          winArray[i].every(el => {
            check =  playerArray.includes(el)
            return check
            })
            if(check) {
              footerMessage.innerText = `${player} has won`
              checkWin = true
              break
            }
        }
      }
  } 

// checks if all boxes are filled (well technically checks if p1 has made 5 moves and p2 has made 4 moves)
const checkDraw = () => {
  if(!checkWin){
    if(p1.length === 5 && p2.length === 4){
      footerMessage.innerText = "The game has ended as a draw"
      replay()
    }
  }
}

const stopGame = () => {
  if (checkWin) {
    box1.removeEventListener("click", move);
    box2.removeEventListener("click", move);
    box3.removeEventListener("click", move);
    box4.removeEventListener("click", move);
    box5.removeEventListener("click", move);
    box6.removeEventListener("click", move);
    box7.removeEventListener("click", move);
    box8.removeEventListener("click", move);
    box9.removeEventListener("click", move);
    addScore()
    replay()
  }
}
// update the scoreboard based on who has won
const addScore = () => {
  if(player === player1.innerText){
    score1 = score1 + 1
    scoreStat1.innerText = score1
  } else {
    score2 = score2 + 1
    scoreStat2.innerText = score2
  }
}

const replay = () => {
  playAgain.classList.remove("hidden")
  again.addEventListener("click", reset)
  message.innerText = `Click play again to restart`
}

const reset = () => {
  clickBox()
  playAgain.classList.add("hidden")
  for(i=0; i<= 8; i++){
    const cleanSlate = document.querySelector(`[data-index = "${i}"]`)
    cleanSlate.innerText = ""
  }
  checkWin = false
  p1 = []
  p2 = []
  footerMessage.innerText = ""
  message.innerText = "Click a square to begin"
  turn1 = true;
  player = ""
  changePlayer()
}

