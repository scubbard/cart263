/**
will you come find me after the world ends?
code by georgie

how much would you do for someone who left you alone?
*/

"use strict";

let state = `start`

let userData = {
  name: `survivor`,
  saveCounter: undefined
};

let gameSong;
let deadSong;
let winSong;

let startAnim;
let startSprite;

let coldAnim;
let coldSprite;

let rainyAnim;
let rainySprite;

let nightPic;

let hazyPic;

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

let scenes = [`cold`, `hazy`, `rainy`, `night`];
let todayScene;


//array of different events that cause different effects on the player
let events = [{
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
    text: `you heard something scratching on the walls, further down the cave.
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
  {
    text: `you found a can of soup. delish.`,
    health: +20
  },
  {
    text: `the fire was warm today. made you think of home.`,
    health: +10
  },
  {
    text: `you found a spare pack of bandages and some iodine. just in case.`,
    health: +30
  },
  {
    text: `you found a grocery store that was mostly untouched. lucky.`,
    health: +40
  },
  {
    text: `you found someone's journal. it seems like they only lasted a couple days.`,
    health: 0
  },
  {
    text: `as it turns out, that abandoned building wasn't actually abandoned.
    you're lucky all they hit was your leg.`,
    health: -40
  },
  {
    text: ``,
    health: -40
  },

]

/**
Description of preload
*/
function preload() {
  //loads title screen animation frames
  startAnim = loadAnimation(`assets/images/titleFrame1.jpg`, `assets/images/titleFrame2.jpg`,
    `assets/images/titleFrame3.jpg`);
  coldAnim = loadAnimation(`assets/images/cold1.png`, `assets/images/cold2.png`, `assets/images/cold3.png`)
  rainyAnim = loadAnimation(`assets/images/rainy1.png`, `assets/images/rainy2.png`, `assets/images/rainy3.png`, `assets/images/rainy4.png`)
  winPic = loadImage(`assets/images/END.png`);
  hazyPic = loadImage(`assets/images/hazy.png`);
  nightPic = loadImage(`assets/images/night.png`);

  gameSong = loadSound(`assets/sounds/IMCA_SOUND_4.mp3`);
  deadSong = loadSound(`assets/sounds/IMCA_SOUND_5.mp3`);
  winSong = loadSound(`assets/sounds/IMCA_SOUND_1.mp3`);
}


/**
creates a canvas for the simulation to play on
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  //sets delay between animation frames
  startAnim.frameDelay = 24;
  coldAnim.frameDelay = 24;
  rainyAnim.frameDelay = 24;

  let data = JSON.parse(localStorage.getItem(`user-data`));

  if (data) {
    beatCheck();
  } else {
    userData.name = prompt(`do i even remember my name`, ``);
    //userData.beat = true
    // Save the user data
    localStorage.setItem(`user-data`, JSON.stringify(userData));
    //data code by Pippin Barr (https://pippinbarr.github.io/cart263/topics/data/web-storage-api.html)
  }


  startSprite = createSprite(width / 2, height / 2);
  startSprite.addAnimation("intro", startAnim);

  coldSprite = createSprite(width / 2, height / 2);
  coldSprite.addAnimation("cold", coldAnim);

  rainySprite = createSprite(width / 2, height / 2);
  rainySprite.addAnimation("rainy", rainyAnim);

  let x = width - width + 200;
  let y = height - 200;
  button = new Button(x, y);

  let x2 = x;
  let y2 = y - 100;
  endButton = new EndButton(x, y);

  secretButton = new SecretButton(x, y);

  healthBar = new HealthBar(x, y);
  healthMap = map(player.health, 0, 300, 0, 100);
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
  background(30)
  playGameSong();
  introCheck();
  sceneCheck();
  button.display();
  endButton.display();
  secretButton.display();
  healthBar.display();
  eventText();
  healthCheck();
}

function endGame() {
  background(100, 40, 20)
  playDeadSong();
  endText();
}

function coldDay() {
  drawSprite(coldSprite);
}

function rainyDay() {
  drawSprite(rainySprite);
}

function nightDay() {
  push();
  imageMode(CENTER);
  image(nightPic, width / 2, height / 2);
  pop();
}

function hazyDay() {
  push();
  imageMode(CENTER)
  image(hazyPic, width / 2, height / 2)
  pop();
}

function beatCheck() {
  if (userData.saveCounter > 1) {
    state = `secretEnd`
  };
}

function sceneCheck() {
  if (todayScene === `cold`) {
    coldDay();
  } else if (todayScene === `hazy`) {
    hazyDay();
  } else if (todayScene === `night`) {
    nightDay();
  } else if (todayScene === `rainy`) {
    rainyDay();
  };
}

function healthCheck() {
  if (player.health < 1 || healthMap < 1) {
    state = `endGame`
    print(`working???`);
  }
}

function secretEnd() {
  if (counter > 1) {
    background(40, 50, 20);
    imageMode(CENTER);
    image(winPic, width / 2, height / 2)
  } else {
    state = `game`
  }
  playWinSong();
  //userData.beat = true;
}

function chooseEvent() {
  let currentEvent = random(events);
  player.health += currentEvent.health;
  player.text = currentEvent.text;
}

function eventText() {
  push();
  textAlign(CENTER);
  textSize(24);
  stroke(0);
  strokeWeight(10);
  fill(150, 40, 40);
  text(player.text, width / 2, height / 3);
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
  userData.saveCounter = counter;
  localStorage.setItem(`user-data`, JSON.stringify(userData));
  todayScene = random(scenes);
  //sceneCheck();
  giveUpText = random(giveUpMessages);
  chooseEvent();
  print(`WORKING!`);
  button.mouseInBox = false;
  secretButton.textSize += 1;
  secretButton.colour += 5;
  print(button.mouseInBox, counter);
  healthCheck();
};

function introText() {
  push();
  textAlign(CENTER);
  textSize(18);
  strokeWeight(4)
  stroke(0);
  fill(0, 100, 150);
  text(`i barely got out of the city... where are you?`, width / 2, height / 2)
  pop();
}

function introCheck() {
  if (counter <= 1) {
    introText();
  }
}

function playGameSong() {
  if (!gameSong.isPlaying() && state === `game`) {
    gameSong.loop()
  }
}

function playDeadSong() {
  gameSong.stop();
  if (!deadSong.isPlaying() && state === `endGame`) {
    deadSong.loop()
  }
}

function playWinSong() {
  gameSong.stop();
  if (!winSong.isPlaying() && state === `secretEnd`) {
    winSong.loop()
  }
}

function startText() {
  push();
  textAlign(CENTER);
  textSize(24);
  text(`click to start`, width / 2, height / 2)
  pop();
}
