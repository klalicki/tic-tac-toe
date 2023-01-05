(() => {
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
})();
