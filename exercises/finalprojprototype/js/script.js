/**
will you come find me after the world ends?
code by georgie

how much would you do for someone who left you alone?
*/

"use strict";

let state = `start`

/**
Description of preload
*/
function preload() {

}


/**
creates a canvas for the simulation to play on
*/
function setup() {
createCanvas(windowWidth,windowHeight);
}


//calls function to check game state every frame
function draw() {
  stateCheck();
}
//checks which state the game is currently in and calls related function
function stateCheck(){
  if (state ===  `start`){
    start();
  } else if (state === `game`){
    game();
  }
}
//function for `start` gamestate. creates a background and displays text
function start() {
  background(150,40,30)
  text(`click to start`, width/2, height/2)
}

//function for `game` gamestate. creates a background and displays text
function game() {
  background(30,40,150)
  text(`this is where the game goes.`,width/2,height/2)
}

//checks for when the player clicks the mouse and changes gamestate when they do
function mousePressed(){
  if (state === `start`){
    state = `game`
  };
}
