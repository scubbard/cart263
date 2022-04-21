//
class Button {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 200
    this.height = 60
    this.colour = undefined;
    this.mouseInBox = false;
    this.text = `wait another day.`;
    this.textFill = undefined;

  }

// add a "if button.isShowing" or something so that buttons aren't clickable until visible
  mouseCheck() {
    if (clicked === true && mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 && mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2) {
      //this.mouseInBox = true;
      nextDay();
    } else {
      this.mouseInBox = false;
    }
  }


  buttonCheck() {
    if (this.mouseInBox === true) {
      this.colour = 40;
      counter += 1;
      //nextDay();
    } else {
      this.colour = 200;
      this.text = `wait another day.`
    }
  }


  dayText() {
    if (counter > 0){
    text(`you waited another day...`, width / 2, height / 4)
  }
    text(todayScene, width / 2, height / 5)
    text(`Day ${counter}`, width / 2, height / 5 - 40);
  };


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
    fill(150, 100, 0);
    text(this.text, this.x, this.y + 5)
    this.dayText();
    pop();

  }


  update() {
    this.display();
  }

  display() {
    if (this.mouseInBox === false) {
      this.makeButton();
    }
  }

}
