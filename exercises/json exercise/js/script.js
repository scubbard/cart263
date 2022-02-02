/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//global variable to store json data
let tarot;
let fortune =  `No fortune loaded.`;

function preload() {
  //tarot = loadJSON("assets/data/tarot_interpretations.json");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  //let card = random(tarot.tarot_interpretations);
  //fortune = random(card.fortune_telling);
}


function draw() {
  background(0);
  //let description = tarot.description;
  //let thirdShadowMeaning = tarot.tarot_interpretations[2].meanings.light[2];

  push();
    textSize(30);
    textAlign(CENTER,CENTER);
    fill(100,0,20);
    rectMode(CENTER);
    text(fortune, width/2,height/2, width/2);
  pop();
}

function mousePressed(){
  loadJSON("assets/data/tarot_interpretations.json", tarotLoaded);
}

function tarotLoaded(data) {
  tarot = data;
  let card = random(tarot.tarot_interpretations);
  fortune = random(card.fortune_telling);
}
