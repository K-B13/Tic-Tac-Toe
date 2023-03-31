// thinking later to make the players custimizable and was going to use classes to accomplish this
class Player {
   constructor(name, icon){
    this.name = name;
    this.icon = icon;
   }
}

const chalk = new Audio("chalk-sound")
//linking up player scoreboards names
const p1Score = document.querySelector("#score1")
const p2Score = document.querySelector("#score2")
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
const boxes = Array.from(document.querySelectorAll(".playing-tiles"))


// for the custimization screen 
const display1 = document.querySelector(".display1");
const display2 = document.querySelector(".display2");

// query selecting useful elements.
const message = document.querySelector(".message");
const gameBoard = document.querySelector(".game-board");
const footerMessage = document.querySelector("footer h2");
const player1 = document.querySelector("#score1");
const player2 = document.querySelector("#score2");
const scoreStat1 = document.querySelector(".score-stat1");
const scoreStat2 = document.querySelector(".score-stat2");
const playAgain  = document.querySelector(".play-again");
const show1 = document.querySelector(".show-icon1")
const show2 = document.querySelector(".show-icon2")

// declaring to variables
// this one will be used to change which icon is being submitted
let iconToBoard = "";

// this is used to determine whose turn it is
let turn1 = true;

// temporary while I sort out some other features hope to make it so icons change
let icon1 = "X";
let icon2 = "O";

const displayIcon = () => {
  display1.innerText = icon1
  display2.innerText = icon2 
  show1.innerText = icon1
  show2.innerText = icon2
}

score1 = 0
score2 = 0
// this is going to be used in a function that will change the vairable depending on if turn 1 is true or not.
let player = p2Score.innerText;

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
again.innerText = "Play Again";

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
  message.innerText = `It is ${player}'s turn.`
  changePlayer()
} 

const chalkSound = () => {
  chalk.play()
  setTimeout(() => {
      chalk.pause();
      chalk.currentTime = 0;
  }, 500)
}

// function in the event listener which makes the icons appear.
const move = (e) => {
  e.target.classList.add("flip-in-ver-left")
  
  let tile = e.target
  let tileIndex = tile.getAttribute(["data-index"])
    if (tile.innerText === ""){
      turn()
      checkTurn()
      tile.innerText = iconToBoard
      chalkSound()
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
    player = p1Score.innerText
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
    for(let i = 0; i < winArray.length; i++){
          winArray[i].every(el => {
            check =  playerArray.includes(el)
            return check
            })
            if(check) {
              footerMessage.classList.remove("tracking-out-contract-bck-bottom")
              footerMessage.classList.add("focus-in-expand");
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

// stops the game from continuing after someone has already won. 
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
const refreshAnimation = () => {
  box1.classList.remove("flip-in-ver-left")
  box2.classList.remove("flip-in-ver-left")
  box3.classList.remove("flip-in-ver-left")
  box4.classList.remove("flip-in-ver-left")
  box5.classList.remove("flip-in-ver-left")
  box6.classList.remove("flip-in-ver-left")
  box7.classList.remove("flip-in-ver-left")
  box8.classList.remove("flip-in-ver-left")
  box9.classList.remove("flip-in-ver-left")
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

// reveals play again button
const replay = () => {
  playAgain.classList.remove("hidden")
  again.addEventListener("click", reset)
  message.innerText = `Click play again to restart`
}

// resets the board
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
  message.innerText = "Click a square to begin"
  turn1 = true;
  player = ""
  footerMessage.classList.remove("focus-in-expand");
  footerMessage.classList.add("tracking-out-contract-bck-bottom")
  changePlayer()
  refreshAnimation()
}

const h1 = document.querySelector("h1")
const custimize = document.querySelector(".custimize");
const begin = document.querySelector(".begin");
const ready = document.querySelector(".confirm")
const toCustomize = () => {
  custimize.classList.add("slide-in-elliptic-bottom-fwd")
  custimize.classList.remove("hidden")
  begin.classList.add("hidden")
  ready.classList.remove("hidden")
  h1.classList.add("text-pop-up-left")
};


begin.addEventListener("click", toCustomize);

// all the code for the custimization code.
let first = document.querySelectorAll(".first")
first = Array.from(first)
let second = document.querySelectorAll(".second")
second = Array.from(second)
const iconChange1 = (e) => {
  icon1 = e.target.innerText
  displayIcon()
}
const iconChange2 = (e) => {
  icon2 = e.target.innerText
  displayIcon()
}
first.forEach(but => but.addEventListener("click", iconChange1)
)
second.forEach(but => but.addEventListener("click", iconChange2)
)
const p1Hud = document.querySelector(".player1-hud")
const p2Hud = document.querySelector(".player2-hud")

const p1Input = document.querySelector(".p1-input")
const p2Input = document.querySelector(".p2-input")



const revealBoard = () => {
  custimize.classList.add("hidden")
  p1Hud.classList.remove("hidden")
  p1Hud.classList.add("roll-in-blurred-left")
  p2Hud.classList.remove("hidden")
  p2Hud.classList.add("roll-in-blurred-right")
  gameBoard.classList.remove("hidden")
  gameBoard.classList.add("slit-in-diagonal-1")
  message.classList.remove("hidden")
  ready.classList.add("hidden")
  if (p1Input.value) {
    p1Score.innerText = p1Input.value;
  }
  if (p2Input.value){
    p2Score.innerText = p2Input.value;
  }
}

ready.addEventListener("click", revealBoard)

// box1.addEventListener("mouseover", move);
// box2.addEventListener("mouseover", move);
// box3.addEventListener("mouseover", move);
// box4.addEventListener("mouseover", move);
// box5.addEventListener("mouseover", move);
// box6.addEventListener("mouseover", move);
// box7.addEventListener("mouseover", move);
// box8.addEventListener("mouseover", move);
// box9.addEventListener("mouseover", move);
