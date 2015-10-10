'use strict';

//Javascript Logic


//cell-0-0 to -0-2 are the left column from top to bottom
//cell-1-0 to 1-2 are the center column from top to bottom
//cell-2-0 to 2-2 are the right column from top to bottom
var gameBoard = ['cell-0-0', 'cell-1-0', 'cell-2-0',
                'cell-0-1', 'cell-1-1', 'cell-2-1',
                'cell-0-2', 'cell-1-2', 'cell-2-2']


//check for victory


//reset board

//the game was a draw

//shows the winner and resets the board using reset function









//jQuery Logic
$(document).ready(function() {
  //detects a click on one of the nine boxes
  $('.box').on('click', function(event) {
    console.log(event);
    alert('I was clicked'); //maybe an if else statement here
  });

//add more functions here for jQuery
});


