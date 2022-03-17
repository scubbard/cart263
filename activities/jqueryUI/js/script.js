/**
dogboy
code by georgie

*/

"use strict";

// Code goes here
let secret = `ibelieve`;

//loads audio into page
let audioElement = new Audio(`assets/sounds/jangle.mp3`);

$(`#instruction-dialog`).dialog({
  autoOpen: true,
  buttons: {
    "got it": function() {
      $(this).dialog(`close`);
    }
  }
});


$(`#solved-dialog`).dialog({
  //prevents dialog box from opening immediately
  autoOpen: false,
  //adds button to click upon completing task
  buttons: {
    "yeah!": function() {
      $(this).dialog(`close`);
    }
  }
});

//highlights secret letters on mouseover

$(`.secret`).on(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
});



//makes secret letters draggable
$(`.secret`).draggable({
  helper: `clone`
});



//makes answer area droppable
$(`#answer`).droppable({
  drop: function(event, ui) {
    //get the letter in the dragged element
    let letter = ui.draggable.text();
    //adds letter to answer box
    $(this).append(letter);
    //disables dragging
    ui.draggable.draggable(`disable`);
    //removes the found class from the letter, turning it back to white
    ui.draggable.removeClass(`found`, 500);
    //prevents the letter from being moused over and turning red again
    ui.draggable.off(`mouseover`);
    //if statement telling the program to show the dialog box and play the sfx
    //only if the player has solved the puzzle
    if ($(`#answer`).text() === secret) {
      $(`#solved-dialog`).dialog(`open`);
      audioElement.play();
    }
  }
});
