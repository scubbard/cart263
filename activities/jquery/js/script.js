/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/
"use strict";


let fiveSyllableLines = [`Once upon a time`, `Tonight, the air bites`, `Cold wind, colder night`,
  `The fire crackles`, `Floating through the trees`, `They come marching home`, `Snow on the mountain`,
  `It is all over`, `You were, and you are`, `It ends, we remain`
];

let sevenSyllableLines = [`And it says, you will remain`, `It flows along the river`, `Snapping like a fallen branch`,
  `Warm, soft, by the fireside`, `We forget, but they do not`, `Forest leaves will remember`,
  `Footprints in the snow remain`
];

let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);

line1.innerText = random(fiveSyllableLines)
line2.innerText = random(sevenSyllableLines)
line3.innerText = random(fiveSyllableLines)

// Code goes here

addListeners();

function addListeners() {
  line1.addEventListener(`click`, lineClicked);
  line2.addEventListener(`click`, lineClicked);
  line3.addEventListener(`click`, lineClicked);
}

function lineClicked(event) {
  fadeOut(event.target, 1);
}


function setNewLine(element) {
  if (element === line1 || element === line3) {
    element.innerText = random(fiveSyllableLines);
  } else {
    element.innerText = random(sevenSyllableLines);
  }
}

function fadeOut(element, opacity){
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  if (opacity > 0){
    requestAnimationFrame(function() {
      fadeOut(element,opacity);
    });
  } else {
    setNewLine(element);
    fadeIn(element, 0);
  }
}

function fadeIn(element, opacity){
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  if (opacity < 1) {
    requestAnimationFrame(function(){
      fadeIn(element, opacity);
    })
  }
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
