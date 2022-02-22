/**
the lighthouse
code by georgie

*/

"use strict";

let state = `start`


let proverbData;
let proverb = `no proverb loaded`;
let typing = ``;
let lastWord = ``;
let currentWord = ``;
let myFont;
let frameOne;
let frameTwo;

let anim;
let sprite;

/**
Description of preload
*/
function preload() {
 proverbData = loadJSON(`assets/data/sailor.json`);
 myFont = loadFont(`assets/fonts/ampersand.ttf`);
 frameOne = loadImage(`assets/images/startFrame1.png`);
 frameTwo = loadImage(`assets/images/startFrame2.png`);

 anim = loadAnimation(`assets/images/startFrame1.png`,`assets/images/startFrame2.png`)
}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth,windowHeight);
anim.frameDelay = 24;

sprite = createSprite(width/2, height/2);
sprite.addAnimation("intro", anim);
}

function start(){
  background(30,40,60);
  drawSprites();
}

function game(){
  background(200,20,20);
  wordTyped();

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
  textSize(18);
  textAlign(CENTER);
  textFont(myFont);
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

/*
if (state === `game`){
 proverb = random(proverbData.proverbs);
 responsiveVoice.speak(proverb,"UK English Male", {
   pitch: 0.75,
   rate: 0.75
 }); */
}


function keyTyped() {
  stroke(0);
  typing += key;
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    typing = typing.substring(0, typing.length - 1);
  }
}

function wordTyped(){
  if (typing === `lantern`) {
    background(200,0,0);
      }
    }






function stateCheck(){
  if (state === `start`){
    start();
  } else if (state === `game`){
    game();
  }
}
