console.log("all connected")

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
const box5 = document.querySelector("#box5")
const box6 = document.querySelector("#box6")
const box7 = document.querySelector("#box7")
const box8 = document.querySelector("#box8")
const box9 = document.querySelector("#box9")
const message = document.querySelector(".message")
const gameBoard = document.querySelector(".game-board")

// declaring to variables
// this one will be used to change which icon is being submitted
let iconToBoard = "";
// this is used to determine whose turn it is
let turn1 = true;
// temporary while I sort out some other features hope to make it so icons change
const icon1 = "X";
const icon2 = "O";

//function which changes which icon is being submitted and changes the turn1 and determines which icon is displayed.
const turn = () => {
  if(turn1){
    iconToBoard = icon1;
    console.log(iconToBoard);
    turn1 = false;
    console.log(turn1)
  } else {
    iconToBoard = icon2;
    console.log(iconToBoard);
    turn1 = true;
    console.log(turn1)
    }
}

//function to change the message at the top of the page
const checkTurn = () => {
  if (turn1) {
    message.innerText = "It is player 1's turn."
    console.log(turn1)
  } else {
    console.log(turn1)
    message.innerText = "It is player 2's turn."
  }
} 

// function in the event listener which makes the icons appear.
const move = (e) => {
  let tile = e.target
  if (tile.innerText === ""){
    turn()
    checkTurn()
    tile.innerText = iconToBoard
    
  } 
}

const start = () => {
  if (message.innerText === "Click a square to begin"){
    checkTurn()
  }
}

box1.addEventListener("click", move);
box2.addEventListener("click", move);
box3.addEventListener("click", move);
box4.addEventListener("click", move);
box5.addEventListener("click", move);
box6.addEventListener("click", move);
box7.addEventListener("click", move);
box8.addEventListener("click", move);
box9.addEventListener("click", move);
gameBoard.addEventListener("click", start)

