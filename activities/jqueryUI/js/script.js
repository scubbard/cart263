/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

// Code goes here

let secret = `Theremin`;
let audioElement = new Audio (`assets/sounds/jangle.mp3`);

$(`#solved-dialog`).dialog({
  autoOpen: false,

  buttons: {
    "yeah!": function(){
      $(this).dialog(`close`);
    }
  }
});

//highlights secret letters on mouseover
$(`.secret`).on(`mouseover`, function(event){
  $(this).addClass(`found`, 500);
});

//makes secret letters draggable
$(`.secret`).draggable({
  helper:`clone`
});

//makes answer area droppable
$(`#answer`).droppable({
  drop: function(event,ui) {
    //get the letter in the dragged element
    let letter = ui.draggable.text();
    //adds letter to answer box
    $(this).append(letter);
    //disables dragging
    ui.draggable.draggable(`disable`);

    ui.draggable.removeClass(`found`,500);

    ui.draggable.off(`mouseover`);

    if ($(`#answer`).text() === secret) {
      $(`#solved-dialog`).dialog(`open`);
      audioElement.play();
    }

  }
});
