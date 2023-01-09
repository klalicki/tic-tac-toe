(() => {
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

  /**
   * Restarts (or starts) the game:
   * clears the board
   * sets X as the current player
   * resets all UI elements
   */
  const restartGame = () => {
    isGameRunning = true;
    curPlayer = 0;
    gameBoard.fill("");
    resetUI();
  };

  /**
   * Checks for a draw condition, which is met if every square is full
   * @returns a boolean value.
   */
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
    gameRules.winningConditions.forEach((winningCondition) => {
      //create an array containing the values of the game board in the positions for this winning condition
      const lineToCheck = winningCondition.map((sqIndex) => {
        return gameBoard[sqIndex];
      });
      //check if 1) all squares on this line are equal AND 2) all squares in this line have a value
      const lineIsWin = lineToCheck.every((value, _index, array) => {
        return value === array[0] && value !== "";
      });
      //if the line is a winning condition, return the player who has won.
      //add the 'winning line' around the squares that created the win condition
      if (lineIsWin) {
        hasWon = lineToCheck[0];
        winningCondition.forEach((sqIndex) => {
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
        //UI updates to mark the square:
        //unfocus the square (to get rid of focus/hover styling)
        curSquareElem.blur();
        //add the player character (X or O) to the square
        curSquareElem.textContent = gameRules.players[curPlayer];
        //disable the square so it is not clickable/selectable
        curSquareElem.disabled = true;
        //add a class to the square to color it according to player
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
          curPlayer = curPlayer === 1 ? 0 : 1;
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

  //start the game
  restartGame();
})();
