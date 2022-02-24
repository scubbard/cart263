/**
the lighthouse
code by georgie

*/

"use strict";

let state = `start`


let proverbData;
let proverb = ``;
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

let goodWords = [`hello`, `hi`, `hey`];

/**
Description of preload
*/
function preload() {
 proverbData = loadJSON(`assets/data/sailor.json`);
 myFont = loadFont(`assets/fonts/ampersand.ttf`);
 frameOne = loadImage(`assets/images/startFrame1.png`);
 frameTwo = loadImage(`assets/images/startFrame2.png`);

 startAnim = loadAnimation(`assets/images/startFrame1.png`,`assets/images/startFrame2.png`)

 roomAnim = loadAnimation(`assets/images/room1.png`, `assets/images/room2.png`,
`assets/images/room3.png`);

 talkAnim = loadAnimation(`assets/images/talk1.png`, `assets/images/talk2.png`,
   `assets/images/talk3.png`);
}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth,windowHeight);
startAnim.frameDelay = 24;
talkAnim.frameDelay = 24;
roomAnim.frameDelay = 24;

startSprite = createSprite(width/2, height/2);
startSprite.addAnimation("intro", startAnim);

roomSprite = createSprite(width/2, height/2);
roomSprite.addAnimation("room", roomAnim);

talkSprite = createSprite(width/2, height/2);
talkSprite.addAnimation("talk", talkAnim);
}

function start(){
  background(30,40,60);
  drawSprite(startSprite);
}

function game(){
  background(60,20,20);
  //wordTyped();
  keyPressed();

  drawSprite(roomSprite);

  push();
  textSize(30);
  textAlign(CENTER);
  fill(40,80,90);
  strokeWeight(4);
  stroke(0);
  rectMode(CENTER);
  text(proverb, width/2, height/2, width/2);
  pop();

  push();
  textSize(24);
  textAlign(CENTER);
  textFont(myFont);
  fill(255);
  text(typing, width/2, height/4);
  pop();
}

/**
Description of draw()
*/
function draw() {
stateCheck();
}


function animate(){

}

function mousePressed(){
if (state === `start`){
  state = `game`;
}

}

function proverbSpeak(){
  proverb = random(proverbData.proverbs);
  if (!responsiveVoice.isPlaying()){
    responsiveVoice.speak(proverb,"UK English Male", {
    pitch: 0.75,
    rate: 0.75
  })
  }
}

function keyTyped() {
  stroke(0);
  typing += key;
}


function wordCheck(){
  currentWord = typing
  if (!goodWords.includes(currentWord)) {
    proverbSpeak();
      }
    }

    function keyPressed() {
      if (keyCode === BACKSPACE) {
        typing = typing.substring(0, typing.length - 1);
      } else if (keyCode === DOWN_ARROW){
        wordCheck();
        print(currentWord);
      }
    }

function stateCheck(){
  if (state === `start`){
    start();
  } else if (state === `game`){
    game();
  }
}
