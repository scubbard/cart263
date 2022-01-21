/**
wheres sausage dog
georgie

simulation in which you, the audience, must find a sausage dog among its many
compatriots.
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

let barkingSound = undefined;
let isBarking = false;

let red = 1;
let green = 1;
let blue = 1;
/**
load array of random animals to disguise sausage dog, also loads images of
animals and sounds for finding dog and winning
*/
function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`);
  winSound = loadSound(`assets/sounds/wee.mp3`);

  barkingSound = loadSound(`assets/sounds/bark.wav`);

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

  resetText();
  bark();
}

function end() {
  colourChange();
  push();
    textAlign(CENTER);
    textSize(100);
    translate(width/2,height/2);
    rotate( radians(frameCount) );
    strokeWeight(8);
    stroke(red, green, blue,);
    fill(255);
    text(`good job!`,0,0);
  pop();
  winMusic();
  bark();
}

function colourChange(){
  if(red < 250){
    red = red + 1
  } else if (green > 254){
    green = green + 1
  } else if (blue > 254){
    blue = blue + 1
  } else {
        red = 1;
        green = random(0,100);
        blue = random(0,100);
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

function keyPressed(){
  if (keyCode === DOWN_ARROW){
    state = `start`
    winSound.stop();
    sausageDog.keyPressed();
  }
}

function resetText(){
  push();
    textAlign(CENTER);
    textSize(25);
    strokeWeight(4)
    stroke(0);
    fill(200,100,60);
    text(`press the down arrow to reset`,width/2,height - height/4);
  pop();
}

function bark(){
  sausageDog.barkCheck();
  if (sausageDog.barking === true &&
      state != `start`){
    barkSound();
  } else barkingSound.stop();
}

function barkSound(){
  if(!barkingSound.isPlaying()){
    barkingSound.loop();
  }
}
