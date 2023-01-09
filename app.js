//contains the list of coordinates of the winning combinations, plus the characters used for the two players

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
let isGameRunning = true;

/**
 * resets the game's UI:
 * re-enables all squares and hover effects
 * clears the end-game message
 */
const resetUI = () => {
  document.querySelectorAll(".ttt-square").forEach((item) => {
    item.textContent = "";
    item.classList.remove("square-x", "square-o", "winning-line");
    item.disabled = false;
  });
  document.querySelector(".ttt-grid").classList.add("hover-active");
  document.querySelector("#message").textContent = "";
  updateUI();
};

/**
 * updates the game's UI (to be run after each turn):
 * current player indicator
 * current hover effects
 */
const updateUI = () => {
  document.querySelector("#cur-player").textContent =
    gameRules.players[curPlayer];
  document
    .querySelector(".app-container")
    .classList.remove("use-color-x", "use-color-o");
  document
    .querySelector(".app-container")
    .classList.add(`use-color-${gameRules.players[curPlayer].toLowerCase()}`);
};

const restartGame = () => {
  isGameRunning = true;
  curPlayer = 0;
  gameBoard.fill("");
  resetUI();
};
restartGame();

const checkForDraw = () => {
  return gameBoard.every((sq) => {
    return sq !== "";
  });
};

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
      item.forEach((sqIndex) => {
        document
          .querySelector(`[data-sq-index="${sqIndex}"]`)
          .classList.add("winning-line");
      });
    }
  });
  return hasWon;
};

/**
 * Event handler for all the squares
 * @param event - the event object that was triggered
 */
const handleSqClick = (event) => {
  if (isGameRunning) {
    //event handler for squares - start by getting the index of the square clicked
    const sqIndex = event.target.getAttribute("data-sq-index");
    //check if the square is empty - if so, add a mark to it
    if (isEmpty(sqIndex)) {
      gameBoard[sqIndex] = gameRules.players[curPlayer];
      const curSquareElem = document.querySelector(
        `[data-sq-index='${sqIndex}']`
      );
      curSquareElem.blur();
      curSquareElem.textContent = gameRules.players[curPlayer];
      curSquareElem.disabled = true;
      curSquareElem.classList.add(curPlayer === 0 ? "square-x" : "square-o");
      //check to see if a win or draw condition has occurred
      const isWin = checkForWin();
      const isDraw = checkForDraw();
      if (isWin) {
        endGame(`Congrats! Player ${isWin} won!`);
      } else if (isDraw) {
        endGame(`It's a draw!`);
      } else {
        //switch players
        curPlayer = 1 - curPlayer;
        updateUI();
      }
    }
  }
};
/**
 * Ends the game:
 * displays the message passed as a parameter, and disables hover effects
 * @param message - The message to display to the user.
 */
const endGame = (message) => {
  document.querySelector("#message").textContent = message;
  isGameRunning = false;
  document.querySelector(".ttt-grid").classList.remove("hover-active");
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

//add event listener for Reset button
document.getElementById("btn-restart").addEventListener("click", restartGame);
