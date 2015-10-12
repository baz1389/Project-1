'use strict';

///Javascript Logic///

var playerX = 'X';
var playerO = 'O';

var gameBoard =
[
    [null, null, null], //[0][0], [0][1], [0][2]
    [null, null, null], //[1][0], [1][1], [1][2]
    [null, null, null]  //[2][0], [2][1], [2][2]
];

//set an index to X or O

var setSquare = function setSquare(player, row, col) {
    checkerboard[row][col] = player;
    return checkerboard;
};

//is there a X or O in this index
var checkSquare = function checkSquare() {

};


//check for victory
var checkWinner = function checkWinner() {
  for(var i = 0;) {

  }

};

//reset board

var clearBoard = function clearBoard(row, col) {
  for(var i = 0; i < gameBoard.length; i++) {
    for(var j = 0; j < gameBoard[i].length; j++) {
      gameBoard[i][j] = null;
    }
  }
};

///jQuery Logic///

///jQuery Logic///
$(document).ready(function() {
  //detects a click on one of the nine boxes
  $('.box').on('click', function(event) {
    console.log(event);
    alert('I was clicked'); //maybe an if else statement here
  });

//add more functions here for jQuery
});

