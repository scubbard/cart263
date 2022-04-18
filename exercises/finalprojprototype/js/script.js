/**
will you come find me after the world ends?
code by georgie

how much would you do for someone who left you alone?
*/

"use strict";

let state = `start`

let userData = {
  name: `survivor`
};

let startAnim;
let startSprite;

let button = undefined;
let endButton = undefined;
let secretButton = undefined;
let healthBar = undefined;

let winPic;


let player = {
  health: 100,
  text: ``
};

let healthMap = 300;

let clicked = false;

let giveUpMessages = [`give up.`, `they aren't coming.`, `would they do this for you?`, `it's time to move on.`];
let giveUpText = `give up.`


let counter = 0;

let scenes = [`sunny`, `grey`, `rainy`, `night`];
let todayScene;

//array of different events that cause different effects on the player
let events = [
  {
    text: `you ate some expired beans.`,
    health: -15
  },
  {
    text: `you slept okay.`,
    health: 0,
  },
  {
    text: `you had a dream about rabbits.`,
    health: 0,
  },
  {
    text:`you heard something scratching on the walls, further down the cave.
    it freaked you out.`,
    health: -10
  },
  {
    text: `you tripped on a rock and twisted your ankle.`,
    health: -20
  },
  {
    text: `something came in and tried to steal your food.
    you barely fought it off. at least, you think it was looking
    for your food.`,
    health: -40
  },
  {
    text: `you haven't eaten in a few days. you're hungry.`,
    health: -10
  },
]

/**
Description of preload
*/
function preload() {
  //loads title screen animation frames
  startAnim = loadAnimation(`assets/images/titleFrame1.jpg`, `assets/images/titleFrame2.jpg`,
    `assets/images/titleFrame3.jpg`);
  winPic = loadImage(`assets/images/winner.png`);
}


/**
creates a canvas for the simulation to play on
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  //sets delay between animation frames
  startAnim.frameDelay = 24;

  let data = JSON.parse(localStorage.getItem(`user-data`));

  if (data) {
    state = `secretEnd`
  } else {
    userData.name = prompt(`do i even remember my name`, ``);
    // Save the user data
    localStorage.setItem(`user-data`, JSON.stringify(userData));
    //data code by Pippin Barr (https://pippinbarr.github.io/cart263/topics/data/web-storage-api.html)
  }


  startSprite = createSprite(width / 2, height / 2);
  startSprite.addAnimation("intro", startAnim);

  let x = width - width + 200;
  let y = height - 200;
  button = new Button(x, y);

  let x2 = x;
  let y2 = y - 100;
  endButton = new EndButton(x, y);

  secretButton = new SecretButton(x, y);

  healthBar = new HealthBar(x, y);
  healthMap = map(healthMap, 0, 300, 0, 100);
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
  healthBar.display();
  eventText();
}

function endGame() {
  background(100, 40, 20)
  endText();
}

function secretEnd() {
  background(40, 100, 20);
  imageMode(CENTER);
  image(winPic, width/2,height/2)
}

function chooseEvent(){
  let currentEvent = random(events);
  player.health += currentEvent.health;
  player.text = currentEvent.text;
}

function eventText(){
  push();
  textAlign(CENTER);
  textSize(20);
  text(player.text, width/2, height/3);
  pop();
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

function endText() {
  push();
  textAlign(CENTER);
  textSize(24);
  strokeWeight(4)
  stroke(0);
  fill(150, 100, 0);
  text(`you survived ${counter} days out there, before it all ended.`, width / 2, height / 2)
  text(`try again, maybe they'll come this time.`, width / 2, height / 2 + 30);
  pop();
}

function nextDay() {
  counter += 1;
  todayScene = random(scenes);
  giveUpText = random(giveUpMessages);
  chooseEvent();
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
