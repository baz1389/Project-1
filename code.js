'use strict';

///Javascript Logic///

var currentPlayer = 'O';
var moveCounter = 0; //counter for # of moves in game - max 9
var token; //user token once logged in
var board_new = []; //creates a 1D array for API

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
      currentPlayer = 'X';
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

//determine winner
var winnerIs = function (player) {
  return winRow(player) || winCol(player) || winDiag(player);
};

//declare winner
var getWinner = function() {
  if (winnerIs('X')) {
    return 'X';
  }
  if (winnerIs('O')) {
    return 'O';
  }
  if (moveCounter === 9) {
    return 'tie';
  }
  return null;
};

//reset board
var clearBoard = function () {
  for(var i = 0; i < gameBoard.length; i++) {
    for(var j = 0; j < gameBoard[i].length; j++) {
      gameBoard[i][j] = null;
    }
  }
  $('.box').html('');
  moveCounter = 0;
  currentPlayer = 'O';
  $('.message').css('color', '#CF5300');
  $('.message').text('Current Player: X');
};

///jQuery///

$(document).ready(function() {

  $('.remove').on('click', function() {
    $('#api').addClass('hide');
  });

  $('.show').on('click', function() {
    $('#api').removeClass('show');
  });

  //fills a box with an X or O
  $('.box').on('click', function(event) {
    var boxClickedOn = event.target;
    var row = boxClickedOn.dataset.row;
    var col = boxClickedOn.dataset.col;
    if (gameBoard[row][col] !== null || getWinner()) {return;}

    $(boxClickedOn).html(switchPlayer());
    gameBoard[row][col] = currentPlayer;
    moveCounter++;

    // tttapi.markCell(game.id,
    //       {
    //         "game": {
    //           "cell": {
    //             "index": "1",
    //             "value": "x"
    //           }
    //         }
    //       },
    //       token, function() {

    // });


    if(boxClickedOn) {
      //alternates message at top of board based on whose turn it is
      $('.message').text('Current Player: ' + currentPlayer);
    }

    if (getWinner()){
      if(winnerIs(currentPlayer)) {
        $('.message').html(currentPlayer + " is the winner!");
        $('.message').css('color', 'green')
      } else {
        $('.message').html("The game is a tie!");
      }
      $('#reset').text("Play Again?");
      $('.message').css('color', 'green')
    }

  });

  $('#reset').on('click', clearBoard);

});

