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

let counterPopped = 0;

let counterMissed = 0;

let bubbleSong;

function preload(){
  bubbleSong = loadSound(`assets/sounds/bubble theme.mp3`);
}

/**
setup ml5 to capture video from webcam and not show feed
*/
function setup() {
createCanvas(640,480);
video = createCapture(VIDEO);
video.hide();

//make a bubble!
bubble = {
 x: random(width),
 y: height,
 size: 20,
 vx:0,
 vy:-2,
 red:255,
 green: 255,
 blue: 255,
}


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
counterDisplay();
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
  resetBubblePopped();
}

}
push();
fill(bubble.red,bubble.green,bubble.blue);
circle(bubble.x,bubble.y,bubble.size);
  bubble.y = bubble.y + bubble.vy;

  if (bubble.y < 0) {
    resetBubbleMissed();
  }
pop();
musicPlay();
}

//checks if bubble was reset due to being popped
function resetBubblePopped() {
  bubble.y = height;
  bubble.x = random(width);
  bubble.vy = random(-2,-5)
  bubble.red = random(255);
  bubble.green = random(255);
  bubble.blue = random(255);
  counterPopped ++
}

//checks if bubble was reset due to being missed
function resetBubbleMissed(){
  bubble.y = height;
  bubble.x = random(width);
  bubble.vy = random(-2,-5)
  bubble.red = random(255);
  bubble.green = random(255);
  bubble.blue = random(255);
  counterMissed ++
}

//displays counters that show number of bubbles missed and popped
function counterDisplay(){
  push();
    textAlign(LEFT);
    textSize(24);
    stroke(0,200,20);
    strokeWeight(4);
    text(counterPopped,width/5,height/4);
  pop();

  push();
    textAlign(RIGHT);
    textSize(24);
    stroke(255,0,20);
    strokeWeight(4);
    text(counterMissed,width - width/5,height/4);
  pop();
}

function musicPlay(){
  if (!bubbleSong.isPlaying()){
    bubbleSong.loop();
  } else {
    bubbleSong.stop();
  }
}
