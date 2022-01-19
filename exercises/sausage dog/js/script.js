/**
wheres sausage dog
georgie

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;

let animalImages = [];
let animals = [];

let sausageDogImage = undefined;
let sausageDog = undefined;
/**
Description of preload
*/
function preload() {
  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }

  sausageDogImage = loadImage(`assets/images/sausage-dog.png`)
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
  background(60,0,10);

  for (let i = 0; i < animals.length; i++) {
    animals[i].update();
  }

  sausageDog.update();

}

function mousePressed() {
  sausageDog.mousePressed();
};
