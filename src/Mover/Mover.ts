import P5 from "p5";
export class Mover {
  private p: P5.Graphics;
  private position: P5.Vector;
  private velocity: P5.Vector;
  private diameter: number;
  constructor(
    p: P5.Graphics,
    position: P5.Vector,
    velocity: P5.Vector,
    diameter: number,
  ) {
    this.p = p;
    this.position = position;
    this.velocity = velocity;
    this.diameter = diameter;
  }

  public update() {
    this.position.sub(this.velocity);
  }

  public draw() {
    this.p.push();
    this.p.translate(this.position.x, this.position.y, 0.0);
    this.p.circle(0, 0, this.diameter);
    this.p.pop();
  }

  public isCheckEdge() {
    if (this.position.y < -this.p.height * 0.5 - this.diameter) {
      this.position.y = this.p.height * 0.5 + this.diameter;
    }
  }
}
