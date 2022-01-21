class SausageDog extends Animal {


  constructor(x , y , image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = 0.25;
    this.barking = false;
  }

  update() {
    super.update();

    if (this.found) {
      this.angle += this.rotationSpeed;
    }
  }



  mousePressed() {
    if (mouseX > this.x - this.image.width/2 &&
        mouseX < this.x + this.image.width/2 &&
        mouseY > this.y - this.image.height/2 &&
        mouseY < this.y + this.image.height/2) {
          this.found = true;
          state = `end`;
        }
  }

  keyPressed(){
    if(keyCode === DOWN_ARROW) {
      this.found = false;
    }
  }

  barkCheck(){
    if (mouseX > this.x - this.image.width/0.5 &&
        mouseX < this.x + this.image.width/0.5 &&
        mouseY > this.y - this.image.height/0.5 &&
        mouseY < this.y + this.image.height/0.5){
          this.barking = true;
        } else this.barking = false;
  }

}
