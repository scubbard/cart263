/**
the lighthouse
code by georgie

*/

"use strict";


let proverbData;
let proverb = `no proverb loaded`;
let typing = ``;
let lastWord = ``;
let currentWord = ``;
let myFont;

/**
Description of preload
*/
function preload() {
 proverbData = loadJSON(`assets/data/sailor.json`);
 myFont = loadFont(`assets/fonts/ampersand.ttf`);
}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth,windowHeight);

}


/**
Description of draw()
*/
function draw() {
background(30,40,60);
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

function mousePressed(){
 proverb = random(proverbData.proverbs);
 responsiveVoice.speak(proverb,"UK English Male", {
   pitch: 0.75,
   rate: 0.75
 });
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
