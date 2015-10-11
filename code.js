'use strict';

///Javascript Logic///


//cell-0-0 to -0-2 are the left column from top to bottom
//cell-1-0 to 1-2 are the center column from top to bottom
//cell-2-0 to 2-2 are the right column from top to bottom
// var gameBoard = ['cell-0-0', 'cell-1-0', 'cell-2-0',
//                 'cell-0-1', 'cell-1-1', 'cell-2-1',
//                 'cell-0-2', 'cell-1-2', 'cell-2-2']  //use version below??

var playerX = 'X';
var playerO = 'O';
var xWin; // = false;?
var oWin; // = false;?



//variables that will hold the unique box IDs
var topLeft;
var topMid;
var topRight;
var centerLeft;
var centerMid;
var centerRight;
var botLeft;
var botMid;
var botRight;



//is there an X or O already in this square

//check for victory
var checkVictory = function checkVictory () {
  if ((topLeft === topMid && topLeft === topRight && (topLeft === 'X')) || //top row wins
  (centerLeft === centerMid && centerLeft === centerRight && (centerLeft === 'X')) || //mid row wins
  (botLeft === botMid && botLeft === botRight && (botLeft === 'X')) || // bot row wins
  (topLeft === centerLeft && topLeft === botLeft && (topLeft === 'X')) || //left col wins
  (topMid === centerMid && topMid === botMid && (topMid === 'X')) || //mid col wins
  (topRight === centerRight && topRight === botRight && (topRight === 'X')) || //right col wins
  (topLeft === centerMid && topLeft === botRight && (topLeft === 'X')) || //diagonal win
  (topRight === centerMid && topRight === botLeft && (topRight === 'X')) //diagonal win
  ) {
    //xWin = true?;

  } else if ((topLeft === topMid && topLeft === topRight && (topLeft === 'O')) || //top row wins
  (centerLeft === centerMid && centerLeft === centerRight && (centerLeft === 'O')) || //mid row wins
  (botLeft === botMid && botLeft === botRight && (botLeft === 'O')) || // bot row wins
  (topLeft === centerLeft && topLeft === botLeft && (topLeft === 'O')) || //left col wins
  (topMid === centerMid && topMid === botMid && (topMid === 'O')) || //mid col wins
  (topRight === centerRight && topRight === botRight && (topRight === 'O')) || //right col wins
  (topLeft === centerMid && topLeft === botRight && (topLeft === 'O')) || //diagonal win
  (topRight === centerMid && topRight === botLeft && (topRight === 'O')) //diagonal win
  ) {
    //oWin = true?;

  } else { //tie logic here
      if (((topLeft === "X") || (topLeft === "O")) && ((centerLeft === "X") ||
      (centerLeft === "O")) && ((bOtLeft === "X") || (bOtLeft === "O")) && ((tOpMid === "X") ||
      (tOpMid === "O")) && ((centerMid === "X") || (centerMid === "O")) && ((bOtMid === "X") ||
      (bOtMid === "O")) && ((tOpRight === "X") || (tOpRight === "O")) && ((centerRight === "X") ||
      (centerRight === "O")) && ((bOtRight === "X") || (bOtRight === "O"))) {
        console.log("It's a tie!"); //use alert()?
      }
  }

};

//reset board

//the game was a draw

//shows the winner and resets the board using reset function









///jQuery Logic///
$(document).ready(function() {
  //detects a click on one of the nine boxes
  $('.box').on('click', function(event) {
    console.log(event);
    alert('I was clicked'); //maybe an if else statement here
  });

//add more functions here for jQuery
});


