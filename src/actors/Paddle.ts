// Types
import { Actor, Point } from "~/types";

// Game constants
import { STAGE_WIDTH } from "~/setup";

export class Paddle extends Actor {
  private moveLeft = false;
  private moveRight = false;

  constructor(
    paddleImage: string,
    paddlePos: Point,
    paddleWidth: number,
    paddleHeight: number,
    private speed: number
  ) {
    super(new Image(), paddlePos, paddleWidth, paddleHeight);
    this.image.src = paddleImage;

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  update() {
    if (this.moveLeft && this.pos.x > 0) {
      this.pos.x -= this.speed;
    } else if (this.moveRight && this.pos.x < STAGE_WIDTH - this.width) {
      this.pos.x += this.speed;
    }
  }

  handleKeyDown({ key }: KeyboardEvent) {
    switch (key) {
      case "ArrowLeft":
        this.moveLeft = true;
        break;
      case "ArrowRight":
        this.moveRight = true;
        break;
    }
  }

  handleKeyUp({ key }: KeyboardEvent) {
    switch (key) {
      case "ArrowLeft":
        this.moveLeft = false;
        break;
      case "ArrowRight":
        this.moveRight = false;
        break;
    }
  }
}
