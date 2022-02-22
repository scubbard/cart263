/**
the lighthouse
code by georgie

*/

"use strict";


let proverbData;
let proverb = `no proverb loaded`;

/**
Description of preload
*/
function preload() {
 proverbData = loadJSON(`assets/data/sailor.json`);
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

push();
textSize(30);
textAlign(CENTER);
fill(40,80,90);
strokeWeight(4);
stroke(0);
rectMode(CENTER);
text(proverb, width/2, height/2, width/2);
pop();
}

function mousePressed(){
 proverb = random(proverbData.proverbs);
 responsiveVoice.speak(proverb,"UK English Male", {
   pitch: 0.75,
   rate: 0.75
 });
}

/*
function proverbsLoaded(data){
  proverbs = data;
  proverbs = random(proverbs.sailor);

}
*/
