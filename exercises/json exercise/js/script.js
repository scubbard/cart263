/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//global variable to store json data
let tarot;
let fortune;

function preload() {
  tarot = loadJSON("assets/data/tarot_interpretations.json");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  let card = random(tarot.tarot_interpretations);
  fortune = random(card.fortune_telling);
}


function draw() {
  background(0);

  // Display the fortune
  push();
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255, 255, 0);
  // Center the resulting text box
  // Use width and height properties to break up the text
  text(fortune, width / 2, height / 2, width /2, height / 2);
  pop();
}
