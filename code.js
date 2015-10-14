'use strict';

///Javascript Logic///

var currentPlayer = 'O';

var gameBoard =
[
    [null, null, null], //[0][0], [0][1], [0][2]
    [null, null, null], //[1][0], [1][1], [1][2]
    [null, null, null]  //[2][0], [2][1], [2][2]
];

//alternate between X and O
var switchPlayer = function() {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
    return 'O';
  } else {
      currentPlayer = 'X'
      return 'X';
  }
};

//win by rows
var winRow = function (player) {
  return gotThree(player, gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]) ||
         gotThree(player, gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]) ||
         gotThree(player, gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]);
};

//win by columns
var winCol = function (player) {
  return gotThree(player, gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]) ||
         gotThree(player, gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]) ||
         gotThree(player, gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]);
};

//win by diagonal
var winDiag = function (player) {
  return gotThree(player, gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]) ||
         gotThree(player, gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]);
};

//three in a row
var gotThree = function (player, indexOne, indexTwo, indexThree) {
  return (indexOne === player) && (indexTwo === player) && (indexThree === player);
};

//declare winner
var getWinner = function() {
  if (winnerIs('X')) {
    return 'X';
  }
  if (winnerIs('O')) {
    return 'O';
  }
  return null;
};

//determine winner
var winnerIs = function (player) {
  return winRow(player) || winCol(player) || winDiag(player);
};

//reset board
var clearBoard = function clearBoard(row, col) {
  for(var i = 0; i < gameBoard.length; i++) {
    for(var j = 0; j < gameBoard[i].length; j++) {
      gameBoard[i][j] = null;
    }
  }
};


///jQuery///

$(document).ready(function() {

  var moveCounter; //counter for # of moves in game - max 9

  //fills a box with an X or O
  $('#board').on('click', function(event) {
    var boxClickedOn = event.target;
    $(boxClickedOn).html(switchPlayer());
      //if(boxClickedOn !== null)

  });

  $('#button').on('click', function() {
    var buttonClicked = event.target;
    $(buttonClicked).html('Play Again?');
  });


  //add more functions here for jQuery
});

