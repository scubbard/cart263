/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let state = `denied`;

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

let lineX = 80;


let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

let accessX = 80;
let accessY = 600;


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
      state = `granted`
    }
  } else {
    generateSpyProfile();
    state = `denied`
  }
}


/**
Description of draw()
*/
function draw() {
  background(180, 120, 40);
  displaySpyProfile();
  access();
}

function displaySpyProfile() {

  paperRectangle();

  push();
  textFont(`Courier`);
  textSize(30);
  textAlign(LEFT);
  stroke(0);
  text(`**CLASSIFIED**`, lineX, lineBreak)
  text(`AGENT NAME: ${spyProfile.name}`, lineX, lineBreak + 50);
  text(`AGENT ALIAS: ${spyProfile.alias}`, lineX, lineBreak + 100);
  text(`REQUESTED ARMS: ${spyProfile.secretWeapon}`, lineX, lineBreak + 150);
  text(`AGENT IDENTIFICATION PHRASE: ${spyProfile.password}`, lineX, lineBreak + 200);
  pop();

  push();
  textFont(`Helvetica`);
  textSize(30);
  stroke(0);
  strokeWeight(2);
  textAlign(RIGHT);
  text(`CLICK TO RECEIVE MISSION`, width - lineX, lineBreak);
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

function paperRectangle() {
  push();
  rectMode(CORNERS);
  fill(255, 255, 230);
  rect(20, 20, 800, 1000);
  pop();
}

function mousePressed() {
  spokenCommand();
}

//function to make RV speak a script detailing the agent's "mission"
function spokenCommand() {
  let script = (`${spyProfile.alias}, your mission is to use your
    ${spyProfile.secretWeapon} in order to retreive the codec from X-COM.
    Good luck, ${spyProfile.name}`);
  responsiveVoice.speak(script, "UK English Male", {
    rate: 1
  }, {
    pitch: 0.2
  })
}

function access() {
  if (state === `granted`) {
    push();
      textFont(`Courier`);
      textAlign(LEFT);
      textSize(40);
      fill(40, 255, 0)
      text(`ACCESS GRANTED`, accessX, accessY);
    pop();
  } else if (state === `denied`) {
    push();
      textFont(`Courier`);
      textAlign(LEFT);
      textSize(40);
      fill(255, 40, 0)
      text(`ACCESS DENIED`, accessX, accessY);
    pop();
  }
}
