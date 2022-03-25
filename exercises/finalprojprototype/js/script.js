/**
will you come find me after the world ends?
code by georgie

how much would you do for someone who left you alone?
*/

"use strict";

let state = `start`

let startAnim;
let startSprite;

let button = undefined;

/**
Description of preload
*/
function preload() {
  //loads title screen animation frames
  startAnim = loadAnimation(`assets/images/titleFrame1.jpg`, `assets/images/titleFrame2.jpg`,
  `assets/images/titleFrame3.jpg`);
}


/**
creates a canvas for the simulation to play on
*/
function setup() {
createCanvas(windowWidth,windowHeight);
//sets delay between animation frames
startAnim.frameDelay = 24;

startSprite = createSprite(width / 2, height / 2);
startSprite.addAnimation("intro", startAnim);

let x = 200;
let y = 200;
button = new Button(x, y);
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
  background(75,20,15);
  //startText();
  drawSprite(startSprite);
}

//function for `game` gamestate. creates a background and displays text
function game() {
  background(30,40,150)
  text(`this is where the game goes.`,width/2,height/2)
  button.display();
}

//checks for when the player clicks the mouse and changes gamestate when they do
function mousePressed(){
  if (state === `start`){
    state = `game`
  };
}

function startText(){
  push();
  textAlign(CENTER);
  textSize(24);
  text(`click to start`, width/2, height/2)
  pop();
}
