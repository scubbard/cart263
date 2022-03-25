//
class Button {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 200
    this.height = 60
    this.colour = undefined;
    this.mouseInBox = false;
    this.text =  `wait another day.`;
    this.textFill = undefined;

  }

  mouseCheck(){
    if (mouseIsPressed && mouseX > this.x - this.width/2 &&
       mouseX < this.x + this.width/2 && mouseY > this.y - this.height/2 &&
     mouseY < this.y + this.height/2) {
         this.mouseInBox = true;
       } else {
         this.mouseInBox = false;
       }
  }

  buttonCheck() {
    this.mouseCheck();
    if (this.mouseInBox === true) {
      this.colour = 40;
      this.text = ``
      state = `gameTwo`
    } else {
      this.colour = 200;
      this.text = `wait another day.`
    }
  }

  makeButton() {
    push();
    rectMode(CENTER)
    this.buttonCheck();
    fill(this.colour);
    rect(this.x, this.y, this.width, this.height);
    pop();
    push();
    textAlign(CENTER);
    textSize(24);
    strokeWeight(4)
    stroke(0);
    fill(150,100,0);
    text(this.text,this.x,this.y + 5)
    pop();
  }


  update() {
    this.display();
  }

  display() {
    this.makeButton();
  }

}
