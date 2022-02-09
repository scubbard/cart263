/**
bubble popper
georgie
*/

"use strict";

//the users webcam
let video;

let handpose = undefined;

let predictions = [];

let bubble = undefined;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
createCanvas(640,480);
video = createCapture(VIDEO);
video.hide();

//bubble!
bubble = {
 x: random(width),
 y: height,
 size: 20,
 vx:0,
 vy:-2,
}

/*
 bubble.x = random(width);
 bubble.y = 0;
 bubble.size = 20;
 bubble.vx = 0;
 bubble.vy = -2;
*/

//loads model, flips video horizontally
handpose = ml5.handpose(video, {
  flipHorizontal: true },
  function() {
    console.log(`Model loaded.`);
  });

//listen for hand on screen
handpose.on(`predict`, function(results) {
  console.log(results);
  predictions = results;
});
}


/**
Description of draw()
*/
function draw() {
background(0);
if (predictions.length > 0){
  let hand = predictions[0];
  let index = hand.annotations.indexFinger;
  let tip = index[3];
  let base = index[0];
  let tipX = tip[0];
  let tipY = tip[1];
  let baseX = base[0];
  let baseY = base[1];

  push();
  noFill()
  stroke(255,255,255);
  strokeWeight(2);
  line(baseX,baseY,tipX,tipY);
  pop();

  push();
  fill(255,0,0);
  circle(baseX,baseY,20);
  pop();



let d = dist(tipX,tipY,bubble.x,bubble.y)

if (d < 15){
  resetBubble();
}

}
push();
fill(255);
circle(bubble.x,bubble.y,bubble.size);
  bubble.y = bubble.y + bubble.vy;

  if (bubble.y < 0) {
    resetBubble();
  }
pop();
}

function resetBubble() {
  bubble.y = height;
  bubble.x = random(width);
}

function displayPin(){

}
