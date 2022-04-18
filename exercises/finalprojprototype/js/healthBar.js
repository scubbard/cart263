class HealthBar {

  constructor(x, y) {
    this.x = width / 2;
    this.y = height - 50;
    this.barWidth = 300;
    this.barHeight = 30;
    this.healthWidth = healthMap;
    this.healthHeight = 30;
  }

  drawBar() {
    push();
    rectMode(CENTER);
    fill(255);
    rect(this.x, this.y, this.barWidth, this.barHeight);
    pop();
  }

  drawHealthBar() {
    push();
    rectMode(CENTER);
    fill(20, 180, 20);
    rect(this.x, this.y, this.healthWidth, this.healthHeight);
    pop();
    push();
    textAlign(CENTER);
    text(`health: ${player.health}`, this.x, this.y);
    pop();
  }



  update() {
    this.display();
  }

  display() {
    this.drawBar();
    this.drawHealthBar();
  }

}
