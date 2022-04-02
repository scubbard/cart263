//
class SecretButton {

  constructor(x, y) {
    this.x = x;
    this.y = y - 200;
    this.width = 200
    this.height = 60
    this.colour = undefined;
    this.mouseInBox = false;
    this.text = undefined;
    this.textSize = 12;
    this.textFill = undefined;

  }


  mouseCheck() {
    if (clicked === true && mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 && mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2) {
      //this.mouseInBox = true;
      state = `secretEnd`
    } else {
      this.mouseInBox = false;
    }
  }



  buttonCheck() {
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
    push();
    textAlign(CENTER);
    textSize(this.textSize);
    strokeWeight(4)
    stroke(0);
    fill(150, 100, 0);
    text(`it's time.`, this.x - this.x / 2 + 5, this.y - 10, this.width, this.y - 5)
    pop();

  }


  update() {
    this.display();
  }

  display() {
    if (counter > 2) {
      this.makeButton();
    }
  }

}
