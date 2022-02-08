/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let state = `denied`;

//sets defaults for `spyProfile`
let spyProfile = {
  name: `REDACTED`,
  alias: `REDACTED`,
  secretWeapon: `REDACTED`,
  password: `REDACTED`,
  location: `REDACTED`,
};

let lineBreak = 100;

let tarotData;
let objectData;
let instrumentData;
let locationData;

let lineX = 80;


let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

let accessX = 80;
let accessY = 600;


//loads password, weapon, alias, and location datasets from github
function preload() {
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  locationData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries.json`);
}


//creates canvas, checks if user has accessed site before with password
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
  }
}


//creates background, displays profile, runs function to check if access is "granted"
// or "denied"
function draw() {
  background(180, 120, 40);
  displaySpyProfile();
  access();
}

function displaySpyProfile() {
//creates a rectangle that looks like. paper
  paperRectangle();
//displays 5 properties of spyProfile (name, alias, weapon, location, password)
  push();
  textFont(`Courier`);
  textSize(30);
  textAlign(LEFT);
  stroke(0);
  text(`**CLASSIFIED**`, lineX, lineBreak)
  text(`AGENT NAME: ${spyProfile.name}`, lineX, lineBreak + 50);
  text(`AGENT ALIAS: ${spyProfile.alias}`, lineX, lineBreak + 100);
  text(`REQUESTED ARMS: ${spyProfile.secretWeapon}`, lineX, lineBreak + 150);
  text(`MISSION LOCATION: ${spyProfile.location}`, lineX, lineBreak + 200);
  text(`AGENT IDENTIFICATION PHRASE: ${spyProfile.password}`, lineX, lineBreak + 250);
  pop();

//text prompting user to click the mouse and hear responsiveVoice read aloud their mission
  push();
  textFont(`Helvetica`);
  textSize(30);
  stroke(0);
  strokeWeight(2);
  textAlign(RIGHT);
  text(`CLICK TO RECEIVE MISSION`, width - lineX, lineBreak);
  pop();

}

//generates a random spy profile based on aforementioned datasets
function generateSpyProfile() {
  spyProfile.name = prompt(`Name.`);
  spyProfile.alias = `The ${random(instrumentData.instruments)}`;
  spyProfile.secretWeapon = random(objectData.objects);
  spyProfile.location = random(locationData.countries);
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

//bit of a clumsy check to make sure access isn't "denied" when the user accesses
//the site for the first time
  if (spyProfile.name === `**REDACTED**`){
    state = `denied`
  } else {
    state = `granted`;
  }

//saves the users spy profile
  localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}
function dataAssign() {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
  spyProfile.location = data.location;
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
    ${spyProfile.secretWeapon} in order to retreive the codec from ${spyProfile.location}.
    Good luck, ${spyProfile.name}`);
  responsiveVoice.speak(script, "UK English Male", {
    rate: 1
  }, {
    pitch: 0.2
  })
}

//checks if password is correct and displays corresponding message
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
