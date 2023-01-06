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
let curPlayer = 0;

let gameBoard = new Array(9);

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
    //check if 1) all items on this line are equal AND 2) all items on this line
    const lineResult = lineToCheck.every((value, index, array) => {
      return value === array[0] && typeof value !== "undefined";
    });
    console.log(lineResult);
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
};

/**
 * Check if a square is empty (legal to click)
 * @param index - the index of the square that we want to check
 * @returns The function isEmpty is returning a boolean value.
 */
const isEmpty = (index) => {
  return typeof gameBoard[index] === "undefined";
};

//add event listener to squares
document.querySelectorAll(".ttt-square").forEach((el) => {
  el.addEventListener("click", handleSqClick);
});
