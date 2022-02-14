// Types
import { Actor, Point } from "~/types";

export class Ball extends Actor {
  private speed: Point;
  constructor(
    ballImage: string,
    ballPos: Point,
    ballSize: number,
    ballSpeed: number
  ) {
    super(new Image(), ballPos, ballSize, ballSize);
    this.image.src = ballImage;
    this.speed = {
      x: ballSpeed,
      y: -ballSpeed,
    };
  }

  update() {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }

  changeYDirection() {
    this.speed.y = -this.speed.y;
  }

  changeXDirection() {
    this.speed.x = -this.speed.x;
  }
}
