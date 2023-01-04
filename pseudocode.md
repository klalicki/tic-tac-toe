start of game

set up game
array of 9 strings, all empty

ask if 1p or 2p?
set curPlayer to 1

button event listener
is the current square empty? if not exit
set the current square to current player
checkBoard()
if win, run winning procedure
if not wine:
  switch players

checkBoard:
for each item in list of winning combos:
  if all 3 are the same, return which one it is
  if not, return " "

