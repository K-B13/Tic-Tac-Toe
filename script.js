const startScreen = document.querySelector(".complete-reset")
const chalk = new Audio("chalk-sound")

//linking the boxes to JS via the DOM
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

// temporary while I sort out some other features hope to make it so icons change
let icon1 = "X";
let icon2 = "O";

// let cookie1 = document.cookie
// declaring to variables
// this one will be used to change which icon is being submitted
let iconToBoard = icon1;

// this is used to determine whose turn it is
let turn1 = true;

// function for displaying the selected icons on the customisation screen and on the score boards.
const displayIcon = () => {
  display1.innerText = icon1
  display2.innerText = icon2 
  show1.innerText = icon1
  show2.innerText = icon2
}

// set the scores to 0
score1 = 0
score2 = 0
// this is going to be used in a function that will change the vairable depending on if turn 1 is true or not.
let player = "";
let playerArray;
// checking if game over

//recording players moves to compare with the win conditions to check for a win, also will be used to determine if there is a draw.
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
    iconToBoard = icon2;
    turn1 = false;
  } else {
    iconToBoard = icon1;
    turn1 = true;
    }
}

//function to change the message at the top of the page
const checkTurn = () => {
  message.innerText = `It is ${player}'s turn.`
  changePlayer()
} 

// function for the sound when each tile is selected.
const chalkSound = () => {
  chalk.volume = 0.2;
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
    if (tile.innerText === "" || tile.style.color === "rgba(255, 255, 255, 0.4)") {
      tile.style.color = "rgba(255, 255, 255, 1)";
      tile.innerText = iconToBoard
      turn()
      checkTurn()
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



// Not hugely important just makes it so if on first move you click a grid gap instead of a tile it displays player one's turn.
const start = () => {
  if (message.innerText === "Click a square to begin"){
    player = player1.innerText
    checkTurn()
  }
}
gameBoard.addEventListener("click", start)

//Adds the click event listener to every tile with the function that contains the logic to display the icons.
const clickBox = () => {
  boxes.forEach(arr => {
    arr.addEventListener("click", move)
  })
}
clickBox()

// some variables I will use to determine whether the game has been won or not.
let checkWin = false
let check = false

// adding each players move into a seperate array I plan on using this to ultimatly compare against the win conditions to check to see if someone has won.
const currentPlayer = () => {
  if(!turn1) {
    playerArray = p1
    return playerArray
  } else {
    playerArray = p2
    return playerArray
  }
}

//storing the winning indexes so I can add animation
let winCombo = []

//function to add animation to the winning combo.
const addWinAnimation = () => {
  winCombo.forEach(arr => {
    arr = parseInt(arr)
    boxes[arr].classList.add("text-shadow-pop-tr")
  })
}
// removing the win animation so I can reset it for next game.
const removeWinAnimation = () => {
  winCombo.forEach(arr => {
    arr = parseInt(arr)
    boxes[arr].classList.remove("text-shadow-pop-tr")
  })
}

// comparing the player Arrays with the win conditions. Loops through every win condition. If every value in the win condition is found in a player Array then the game ends. Also deals with the animation of the footer message and adds animation to winning squares
const endCheck = () => {
  if (playerArray.length > 2) {
    for(let i = 0; i < winArray.length; i++){
          winCombo = winArray[i]
          winArray[i].every(el => {
            check =  playerArray.includes(el)
            return check
            })
            if(check) {
              footerMessage.classList.remove("tracking-out-contract-bck-bottom")
              footerMessage.classList.add("focus-in-expand");
              addWinAnimation()
              footerMessage.innerText
               = `${player} has won`
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
      footerMessage.classList.remove("tracking-out-contract-bck-bottom")
      footerMessage.classList.add("focus-in-expand");
      replay()
      
    }
  }
}


// stops the game from continuing after someone has already won. 
const stopGame = () => {
  if (checkWin) {
    boxes.forEach(arr => {
   arr.removeEventListener("click", move)
  })
  addScore()
  replay()
}
}
// removes the animation on each tile when selected so I can readd later when they are clicked.
const refreshAnimation = () => {
  boxes.forEach(arr => {
    arr.classList.remove("flip-in-ver-left")
  })  
}

// update the scoreboard based on who has won.
const addScore = () => {
  if(player === player1.innerText){
    score1 = score1 + 1
    scoreStat1.innerText = score1
  } else {
    score2 = score2 + 1
    scoreStat2.innerText = score2
  }
}

// reveals play again button.
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
  iconToBoard = icon1
  removeWinAnimation()
  gameBoard.classList.remove("slit-in-diagonal-1")
  gameBoard.classList.add("swing-out-bottom-bck")
  // setting an interval so there is a delay so the animation is visable
  setInterval(() => {
    gameBoard.classList.remove("swing-out-bottom-bck")
    gameBoard.classList.add("slit-in-diagonal-1")
  }, 1200)
}

//linking dom elements related to the click of the start game button
const h1 = document.querySelector("h1")
const custimize = document.querySelector(".custimize");
const begin = document.querySelector(".begin");
const ready = document.querySelector(".confirm")

// revealing the customise screen when the start game button is selected.
const toCustomize = () => {
  custimize.classList.add("slide-in-elliptic-bottom-fwd")
  custimize.classList.remove("hidden")
  begin.classList.add("hidden")
  ready.classList.remove("hidden")
  h1.classList.add("text-pop-up-left")
};


begin.addEventListener("click", toCustomize);

// all the code for the custimization code. Array of all the p1 buttons and p2 buttons.
let first = document.querySelectorAll(".first")
first = Array.from(first)
let second = document.querySelectorAll(".second")
second = Array.from(second)

// iconChange1 and iconChange2 are functions that change all relevant information based on the icon selected by the player in the customisation screen. Also stops the two players having the same icon.
const iconChange1 = (e) => {
  if (e.target.innerText !== icon2){
    icon1 = e.target.innerText
    displayIcon()
  } else {
    alert("Players cannot have matching icons")
  }
}
const iconChange2 = (e) => {
  if (e.target.innerText !== icon1){
    icon2 = e.target.innerText
    displayIcon()
  } else {
    alert("Players cannot have matching icons")
  }
}
//adds the icon change 1 function to the buttons under the player 1 section in the custimisation screen.
first.forEach(but => but.addEventListener("click", iconChange1)
)
//adds the icon change 2 function to the buttons under the player 2 section in the custimisation screen.
second.forEach(but => but.addEventListener("click", iconChange2)
)
const p1Hud = document.querySelector(".player1-hud")
const p2Hud = document.querySelector(".player2-hud")

const p1Input = document.querySelector(".p1-input")
const p2Input = document.querySelector(".p2-input")


// function to reveal the board once the user is done with customisation. It also grabs the names input on the customisation screen and preps for the first move.
const revealBoard = () => {
  ready.classList.add("hidden")
  custimize.classList.add("hidden")
  p1Hud.classList.remove("hidden")
  p1Hud.classList.add("roll-in-blurred-left")
  p2Hud.classList.remove("hidden")
  p2Hud.classList.add("roll-in-blurred-right")
  gameBoard.classList.remove("hidden")
  gameBoard.classList.add("slit-in-diagonal-1")
  message.classList.remove("hidden")
  startScreen.classList.remove("hidden")
  if (p1Input.value) {
    player1.innerText = p1Input.value;
  }
  if (p2Input.value){
    player2.innerText = p2Input.value;
  }
  iconToBoard = icon1
  player = player2.innerText
  p1Input.value = ""
  p2Input.value = ""
}

ready.addEventListener("click", revealBoard)

//creates a hover effect that shows the icon that will be input if clicked but shows it slightly faded to make it clear that it hasnt been input yet.
const hoverEffect = (e) => {
  let tile = e.target
  if(!checkWin){
    if (tile.innerText === "") {
      tile.style.color = "rgba(255, 255, 255, 0.4)";
      tile.innerText = iconToBoard;
    }
  }
}
// When the mouse moves off the tile this function clears the tile of the opaque icon on it however doesn't do anything to tiles which have already been clicked.
const removeHover = (e) => {
  let tile = e.target
  if (tile.style.color === "rgba(255, 255, 255, 0.4)") {
    tile.innerText = "";
    tile.style.color = "rgba(255, 255, 255, 1)";
  }
}
// adds the mouseover effect as an event listener to all the tiles
const addMouseOverEffect = () => {
  boxes.forEach(arr => {
    arr.addEventListener("mouseover", hoverEffect)
})
}
addMouseOverEffect()
// adds the remove mouse effect function to the tiles
const removeMouseOverEffect = () => {
  boxes.forEach(arr => {
    arr.addEventListener("mouseout", removeHover)
  })
}
removeMouseOverEffect()

// function for going back to the start screen and should reset everything as it was at the beginning.
const refresh = () => {
  p1Hud.classList.add("hidden")
  p1Hud.classList.remove("roll-in-blurred-left")
  p2Hud.classList.add("hidden")
  p2Hud.classList.remove("roll-in-blurred-right")
  gameBoard.classList.add("hidden")
  gameBoard.classList.remove("slit-in-diagonal-1")
  message.classList.add("hidden")
  startScreen.classList.add("hidden")
  begin.classList.remove("hidden")
  score1 = 0
  score2 = 0
  scoreStat1.innerText = score1
  scoreStat2.innerText = score2
  player1.innerText = "Player1"
  player2.innerText = "Player2"
  icon1 = "X"
  icon2 = "O"
  displayIcon()
  reset()
}

// adds the refresh function to the start screen button.
startScreen.addEventListener("click", refresh)

// /To do on Monday; readme
