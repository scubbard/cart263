class FoodBar {

  constructor(x, y) {
    this.x = width / 2;
    this.y = height - 50;
    this.barWidth = 300;
    this.barHeight = 30;
    this.foodWidth = foodMap;
    this.foodHeight = 30;
  }

  drawBar() {
    push();
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.barWidth, this.barHeight);
    pop();
  }

  drawfoodBar() {
    push();
    rectMode(CENTER);
    fill(20, 180, 20);
    rect(this.x, this.y, this.foodWidth, this.foodHeight);
    pop();
    push();
    textAlign(CENTER);
    text(`food: ${food}`, this.x, this.y);
    pop();
  }



  update() {
    this.display();
  }

  display() {
    this.drawBar();
    this.drawfoodBar();
  }

}
