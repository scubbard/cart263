/**
wheres sausage dog
georgie

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let state = `start`

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;

let winSound = undefined;
let songIsPlaying = false;

let red = 1;
let green = 1;
let blue = 1;
/**
Description of preload
*/
function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
  winSound = loadSound(`assets/sounds/wee.mp3`);

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);

  //create animals
  for(let i = 0; i < NUM_ANIMALS; i++){
    let x = random(0,width);
    let y = random(0,height);
    let animalImage = random(animalImages);
    let animal = new Animal(x,y, animalImage);
    animals.push(animal);
  }

  let x = random(0,width);
  let y = random(0,height);
  sausageDog = new SausageDog(x,y, sausageDogImage);
}


/**
Description of draw()
*/
function draw() {
  callStates();

}

function mousePressed() {
  sausageDog.mousePressed();
  if (state === `start`) {
    state = `game`;
  }
};

function start(){
  background(100,0,10);
  push();
    textAlign(CENTER);
    textSize(100);
    text(`find the sausage dog!
click to start!`,width/2,height/2);
  pop();
}

function game(){

background(60,0,10);
  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  sausageDog.update();
}

function end() {
  push();
    textAlign(CENTER);
    textSize(100);
    translate(width/2,height/2);
    rotate( radians(frameCount) );
    strokeWeight(8);
    stroke(red, green, blue,);
    fill(255);
    text(`good job!`,0,0);
    colourChange();
  pop();

  winMusic();
}

function colourChange(){
  if(red < 254){
    red = red + 1
  } else if (green > 254){
    green = green + 1
  } else if (blue > 254){
    blue = blue + 1
  } else if (red === 254 &&
      green === 254 &&
      blue === 254){
        red = 1;
        green = 1;
        blue = 1;
      }
}

function winMusic() {
  if (!winSound.isPlaying()) {
    winSound.loop();
    if (state != `end`) {
      winSound.stop();
    }
  }
}

function callStates() {
  if (state === `start`) {
    start();
  } else if (state === `game`){
    game();
  } else if (state === `end`) {
    end();
  }
}
