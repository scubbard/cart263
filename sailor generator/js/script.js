/**
sailor saying simulator
code by georgie

*/

"use strict";

let state = `start`


let proverbData;
let proverb = `Say something to me, boy.`;
let typing = ``;
let lastWord = ``;
let currentWord = ``;
let myFont;
let frameOne;
let frameTwo;

let startAnim;
let startSprite;

let talkAnim;
let talkSprite;

let roomAnim;
let roomSprite;

let secretWords = [`Winslow`, `Wake`];
let secretAnswer = [`Where'd ye learn that name, boy?`, `That's not a name ye should go bandying about.`,
`Stay out of the lighthouse.`];
let answerUsed;

/**
loads all json files and assets
*/
function preload() {
  proverbData = loadJSON(`assets/data/sailor.json`);
  myFont = loadFont(`assets/fonts/ampersand.ttf`);
  frameOne = loadImage(`assets/images/startFrame1.png`);
  frameTwo = loadImage(`assets/images/startFrame2.png`);

  startAnim = loadAnimation(`assets/images/startFrame1.png`, `assets/images/startFrame2.png`)

  roomAnim = loadAnimation(`assets/images/room1.png`, `assets/images/room2.png`,
    `assets/images/room3.png`);

  talkAnim = loadAnimation(`assets/images/talk1.png`, `assets/images/talk2.png`,
    `assets/images/talk3.png`);
}


/**
creates canvas, sets delay between animation frames, and initializes animations
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  startAnim.frameDelay = 24;
  talkAnim.frameDelay = 24;
  roomAnim.frameDelay = 24;

  startSprite = createSprite(width / 2, height / 2);
  startSprite.addAnimation("intro", startAnim);

  roomSprite = createSprite(width / 2, height / 2);
  roomSprite.addAnimation("room", roomAnim);

  talkSprite = createSprite(width / 2, height / 2);
  talkSprite.addAnimation("talk", talkAnim);
}
//creates `title screen` and activates animates
function start() {
  background(30, 40, 60);
  drawSprite(startSprite);
}
//function called when the state is `game`
function game() {
  background(60, 20, 20);
  keyPressed();
  proverbText();
  drawSprite(roomSprite);


  push();
  textSize(24);
  textAlign(CENTER);
  textFont(myFont);
  fill(255);
  text(typing, width / 2, height / 4);
  pop();
}

/**
consistently running function to check which state the game is/if anything is being said
*/
function draw() {
  stateCheck();
  talkCheck();
}

//the `click to start` function
function mousePressed() {
  if (state === `start`) {
    state = `game`;
  }
}
//loads a random proverb from a preloaded list and calls responsiveVoice to say it aloud
function proverbSpeak() {
  proverb = random(proverbData.proverbs);
  if (!responsiveVoice.isPlaying()) {
    responsiveVoice.speak(proverb, "UK English Male", {
      pitch: 0.75,
      rate: 0.75
    })
  }
}

//loads one of the `secret answers` and calls responsiveVoice to say it aloud
function secretSpeak() {
   answerUsed = random(secretAnswer);
  if (!responsiveVoice.isPlaying()) {
    responsiveVoice.speak(answerUsed, "UK English Male", {
      pitch: 0.75,
      rate: 0.75
    })
  }
}
//logs keys being typed and adds them to the `typing` string
function keyTyped() {
  stroke(0);
  typing += key;
}

//checks if the word being typed should trigger the proverb answer or a secret answer
function wordCheck() {
  currentWord = typing
  if (!secretWords.includes(currentWord)) {
    state = `talking`
  } else if (secretWords.includes(currentWord)) {
    state = `secretTalking`
  }
}
//checks if a key is pressed that will delete the phrase or enter it
function keyPressed() {
  if (keyCode === BACKSPACE) {
    typing = typing.substring(0, typing.length - 1);
  } else if (keyCode === DOWN_ARROW) {
    wordCheck();
    print(currentWord);
    textDelete();
  }
}
//function that deletes all text in the `typing` string
function textDelete() {
  typing = ``;
}
//state function called when responsiveVoice is speaking
function talking() {
  background(60, 20, 20);
  drawSprite(talkSprite);
  proverbSpeak();
}
//state function called when responsive voice is telling a secret answer
function secretTalking() {
  secretText();
  background(60, 20, 20);
  drawSprite(talkSprite);
  secretSpeak();

}

//function that prevents talking state from continuously being called
function talkCheck(){
  if (!responsiveVoice.isPlaying() && state != `start`){
    state = `game`
  }
}

//displays proverb text
function proverbText() {
  push();
  textSize(23);
  textFont(myFont);
  textAlign(CENTER);
  fill(0);
  rectMode(CENTER);
  text(`"${proverb}"`, width / 2, height - height / 6, width / 2);
  pop();
}
//displays secret text
function secretText() {
  push();
  textSize(23);
  textFont(myFont);
  textAlign(CENTER);
  fill(0);
  rectMode(CENTER);
  text(`"${answerUsed}"`, width / 2, height - height / 6, width / 2);
  pop();
}
//checks states and calls correlating function
function stateCheck() {
  if (state === `start`) {
    start();
  } else if (state === `game`) {
    game();
  } else if (state === `talking`)
    talking();
    else if (state === `secretTalking`)
    secretTalking();
}
