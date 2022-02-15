// Types
import { Actor, Point } from "~/types";

export class Ball extends Actor {
  private speed: Point;

  constructor(
    ballImage: string,
    ballPos: Point,
    ballSize: number,
    speed: number
  ) {
    super(new Image(), ballPos, ballSize, ballSize);
    this.image.src = ballImage;
    this.speed = {
      x: speed,
      y: -speed,
    };
  }

  changeYDirection() {
    this.speed.y = -this.speed.y;
  }

  changeXDirection() {
    this.speed.x = -this.speed.x;
  }

  update() {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }
}
