// Types
import { Actor } from "./types";

// Actors
import { Brick } from "./actors/Brick";
import { Paddle } from "./actors/Paddle";
import { Ball } from "./actors/Ball";

// Sprites
import PaddleSprite from "~/images/paddle.png";
import BallSprite from "~/images/ball.png";

// Game constants
import {
  LEVEL,
  STAGE_PADDING,
  STAGE_COLS,
  STAGE_HEIGHT,
  STAGE_WIDTH,
  BRICK_ENERGY,
  BRICK_HEIGHT,
  BRICK_IMAGES,
  BRICK_PADDING,
  BRICK_WIDTH,
  PADDLE_STARTX,
  PADDLE_HEIGHT,
  PADDLE_SPEED,
  PADDLE_WIDTH,
  BALL_STARTX,
  BALL_STARTY,
  BALL_SIZE,
  BALL_SPEED,
} from "~/setup";

export const createBricks = () =>
  LEVEL.reduce<Brick[]>((ack, curr, index) => {
    if (curr === 0) return ack;

    const row = Math.floor((index + 1) / STAGE_COLS);
    const col = index % STAGE_COLS;

    const x = STAGE_PADDING + col * (BRICK_PADDING + BRICK_WIDTH);
    const y = STAGE_PADDING + row * (BRICK_PADDING + BRICK_HEIGHT);

    return [
      ...ack,
      new Brick(
        BRICK_IMAGES[curr],
        { x, y },
        BRICK_WIDTH,
        BRICK_HEIGHT,
        BRICK_ENERGY[curr]
      ),
    ];
  }, []);

export const createPaddle = () =>
  new Paddle(
    PaddleSprite,
    { x: PADDLE_STARTX, y: STAGE_HEIGHT - PADDLE_HEIGHT },
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    PADDLE_SPEED
  );

export const createBall = () =>
  new Ball(
    BallSprite,
    { x: BALL_STARTX, y: BALL_STARTY },
    BALL_SIZE,
    BALL_SPEED
  );

export class Collision {
  isCollidingBetweenBallAndPaddle(ball: Ball, paddle: Paddle) {
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      return true;
    }
    return false;
  }

  isCollidingBetweenBallAndBricks(ball: Ball, bricks: Brick[]) {
    let res = { index: -1 };
    bricks.forEach((brick, index) => {
      if (this.isCollidingPointAndBox(ball, brick)) {
        res = { index };
      }
    });
    return res;
  }

  isCollidingPointAndBox(point: Actor, box: Actor) {
    if (
      point.pos.x < box.pos.x + box.width &&
      point.pos.x + point.width > box.pos.x &&
      point.pos.y < box.pos.y + box.height &&
      point.pos.y + point.height > box.pos.y
    ) {
      return true;
    }
    return false;
  }

  activateCollisionBetweenBallAndWalls(ball: Ball) {
    // handle collision between side corners of the stage and the ball
    if (ball.pos.x < 0 || ball.pos.x + ball.width > STAGE_WIDTH) {
      ball.changeXDirection();
    }
    // handle collision between top corner of the stage and the ball
    else if (ball.pos.y < 0) {
      ball.changeYDirection();
    }
  }
}
