// Types
import { Actor, Point } from "~/types";

export class Brick extends Actor {
  constructor(
    brickImage: string,
    brickPos: Point,
    brickWidth: number,
    brickHeight: number,
    public energy: number
  ) {
    super(new Image(), brickPos, brickWidth, brickHeight);
    this.image.src = brickImage;
  }
}
