/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let spyProfile = {
  name: `REDACTED`,
  alias: `REDACTED`,
  secretWeapon: `REDACTED`,
  password: `REDACTED`
};

let lineBreak = 100;

let tarotData;
let objectData;
let instrumentData;
let card;

let lineX = 100;

let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

/**
Description of preload
*/
function preload() {
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`)
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`)
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  if (data) {
    let password = prompt(`Password.`)

    if (password === data.password) {
      dataAssign();
    }
  } else {
    generateSpyProfile();
  }
}


/**
Description of draw()
*/
function draw() {
  background(180, 120, 40);
  displaySpyProfile();
}

function displaySpyProfile() {
  push();
  textFont(`Courier`);
  textSize(30);
  textAlign(LEFT);
  stroke(0);
  text(`**CLASSIFIED**`, lineX, lineBreak)
  text(spyProfile.name, lineX, lineBreak + 50);
  text(spyProfile.alias, lineX, lineBreak + 100);
  text(spyProfile.secretWeapon, lineX, lineBreak + 150);
  text(spyProfile.password, lineX, lineBreak + 200);
  pop();
}

function generateSpyProfile() {
  spyProfile.name = prompt(`Name.`);
  spyProfile.alias = `The ${random(instrumentData.instruments)}`;
  spyProfile.secretWeapon = random(objectData.objects);
  card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);


  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

function dataAssign() {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
}
