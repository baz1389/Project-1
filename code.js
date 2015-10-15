'use strict';

///Javascript Logic///

var tttapi = tttapi || {};
var currentPlayer = 'O';
var moveCounter = 0; //counter for # of moves in game - max 9
var token;
var board_new = [];

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

  //  var form2object = function(form) {
  //   var data = {};
  //   $(form).children().each(function(index, element) {
  //     var type = $(this).attr('type');
  //     if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
  //       data[$(this).attr('name')] = $(this).val();
  //     }
  //   });
  //   return data;
  // };
  // var wrap = function wrap(root, formData) {
  //   var wrapper = {};
  //   wrapper[root] = formData;
  //   return wrapper;
  // }; // {"credentials" : {"email" : , "password": }}

  // $('#login').on('submit', function(e) {
  //   var credentials = wrap('credentials', form2object(this));
  //   console.log(credentials);
  //   var logincb = function logincb(error, data) {
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }
  //     console.log(JSON.stringify(data));
  //     $('#result').val(JSON.stringify(data, null, 4));
  //     token = data.user.token; //data is marked cells
  //   };
  //   e.preventDefault();
  //   tttapi.login(credentials, logincb);
  // });


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
    //       }, token,






    //   data, token, function() {

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
  //create game
  // tttapi.createGame(token, callback)

});


//create, mark, show if we can
