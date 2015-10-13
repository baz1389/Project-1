'use strict';

///Javascript Logic///

var player;
var count; //counter for # of moves in game - max 9

var gameBoard =
[
    [null, null, null], //[0][0], [0][1], [0][2]
    [null, null, null], //[1][0], [1][1], [1][2]
    [null, null, null]  //[2][0], [2][1], [2][2]
];

//is there a X or O in this index
var checkSquare = function () {
  for(var i = 0; i < gameBoard.length; i++) {
    for(var j = 0; i < gameBoard[i]; j++) {
      if (gameBoard[i][j] !== null){
        return false;
      }
    }
  }
};

var changePlayer = function (){
  if (player === 'O'){
    player = 'X';
  }
  else{
    player = 'O';
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
var gotThree = function gotThree(player, indexOne, indexTwo, indexThree) {
  return (indexOne === player) && (indexTwo === player) && (indexThree === player);
};

//determine winner
var getWinner = function() {
  if (winnerIs('X')) {
    return 'X';
  }
  if (winnerIs('O')) {
    return 'O';
  }
  return null;
};

//declare winner
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
  //detects a click on one of the nine boxes
  $('.box').on('click', function(event) {
    $(this).text('X');

    // console.log(event);
    // alert('I was clicked'); //maybe an if else statement here
  });

//add more functions here for jQuery
});

