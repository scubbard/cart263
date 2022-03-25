//
class Button {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100
    this.height = 50
    this.colour = undefined;
    this.mouseInBox = false;

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
    } else {
      this.colour = 200;
    }
  }

  makeButton() {
    push();
    rectMode(CENTER)
    this.buttonCheck();
    fill(this.colour);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }


  update() {
    this.display();
  }

  display() {
    this.makeButton();
  }

}
