const gameRules = {
  winningConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  players: ["X", "O"],
};

//set up gameboard
let curPlayer;
let gameBoard = new Array(9);

const updateUI = () => {
  document.querySelector("#cur-player").textContent =
    gameRules.players[curPlayer];
};

const restartGame = () => {
  curPlayer = 0;
  gameBoard.fill("");
  updateUI();
};
restartGame();

/**
 * Checks the game board for winning conditions,
 * returns false if the game hasn't been won yet
 * if the game has been won, returns the winning player
 * @returns either the winning player, or false if the game hasn't been won yet
 */
const checkForWin = () => {
  let hasWon = false;
  //iterate through each possible winning condition
  gameRules.winningConditions.forEach((item) => {
    //create an array containing the values of the game board in the positions for this winning condition
    const lineToCheck = item.map((sqIndex) => {
      return gameBoard[sqIndex];
    });
    //check if 1) all squares on this line are equal AND 2) all squares in this line have a value
    const lineResult = lineToCheck.every((value, _index, array) => {
      return value === array[0] && value !== "";
    });
    if (lineResult) {
      hasWon = lineToCheck[0];
    }
  });
  return hasWon;
};

/**
 * Event handler for all the squares
 * @param event - the event object that was triggered
 */
const handleSqClick = (event) => {
  //event handler for squares - start by getting the index of the square clicked
  const sqIndex = event.target.getAttribute("data-sq-index");
  //check if the square is empty - if so, add a mark to it
  if (isEmpty(sqIndex)) {
    gameBoard[sqIndex] = gameRules.players[curPlayer];
    document.querySelector(`[data-sq-index='${sqIndex}']`).textContent =
      gameRules.players[curPlayer];
    const isWin = checkForWin();
    if (isWin) {
      console.log(`game over! player ${isWin} won`);
    } else {
      //switch players
      curPlayer = 1 - curPlayer;
      updateUI();
    }
  }
};

/**
 * Check if a square is empty (legal to click)
 * @param index - the index of the square that we want to check
 * @returns The function isEmpty is returning a boolean value.
 */
const isEmpty = (index) => {
  return gameBoard[index] === "";
};

//add event listener to squares
document.querySelectorAll(".ttt-square").forEach((el) => {
  el.addEventListener("click", handleSqClick);
});
