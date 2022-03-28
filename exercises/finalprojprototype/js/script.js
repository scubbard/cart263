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
let endButton = undefined;
let secretButton = undefined;

let clicked = false;

let giveUpMessages = [`give up.`,`they aren't coming.`,`would they do this for you?`,`it's time to move on.`];
let giveUpText = `give up.`


let counter = 0;

let scenes = [`sunny`, `grey`, `rainy`, `night`];
let todayScene;

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
  createCanvas(windowWidth, windowHeight);
  //sets delay between animation frames
  startAnim.frameDelay = 24;

  startSprite = createSprite(width / 2, height / 2);
  startSprite.addAnimation("intro", startAnim);

  let x = width - width + 200;
  let y = height - 200;
  button = new Button(x, y);

  let x2 = x;
  let y2 = y - 100;
  endButton = new EndButton(x,y);

  secretButton = new SecretButton(x,y)
}


//calls function to check game state every frame
function draw() {
  stateCheck();
}
//checks which state the game is currently in and calls related function
function stateCheck() {
  if (state === `start`) {
    start();
  } else if (state === `game`) {
    game();
  } else if (state === `endGame`) {
    endGame();
  } else if (state === `secretEnd`) {
    secretEnd();
  }
}
//function for `start` gamestate. creates a background and displays text
function start() {
  background(75, 20, 15);
  //startText();
  drawSprite(startSprite);
}

//function for `game` gamestate. creates a background and displays text
function game() {
  background(30, 40, 150)
  text(`this is where the game goes.`, width / 2, height / 2)
  button.display();
  endButton.display();
  secretButton.display();
}

function endGame() {
  background(100, 40, 20)
  endText();
}

function secretEnd() {
  background(40,100,20);
  textSize(secretButton.textSize);
  text(`sometimes ya gotta do it yerself!`, width/2, height/2);
}

//checks for when the player clicks the mouse and changes gamestate when they do
function mousePressed() {
  if (state === `start`) {
    state = `game`
  }
  clicked = true;
  button.mouseCheck();
  endButton.mouseCheck();
  secretButton.mouseCheck();
}

function endText(){
  push();
  textAlign(CENTER);
  textSize(24);
  strokeWeight(4)
  stroke(0);
  fill(150,100,0);
  text(`you survived ${counter} days out there, before it all ended.`, width / 2, height / 2)
  text(`try again, maybe they'll come this time.`, width/2, height/2 + 30);
  pop();
}

function nextDay() {
  counter += 1;
  todayScene = random(scenes);
  giveUpText = random(giveUpMessages);
  print(`WORKING!`);
  button.mouseInBox = false;
  secretButton.textSize += 1;
  print(button.mouseInBox, counter);
};


function startText() {
  push();
  textAlign(CENTER);
  textSize(24);
  text(`click to start`, width / 2, height / 2)
  pop();
}
