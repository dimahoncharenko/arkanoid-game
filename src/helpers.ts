// Actors
import { Brick } from "./actors/Brick";
import { Paddle } from "./actors/Paddle";
import { Ball } from "./actors/Ball";

// Game constants
import {
  LEVEL,
  STAGE_COLS,
  STAGE_WIDTH,
  STAGE_HEIGHT,
  BRICK_ENERGY,
  BRICK_HEIGHT,
  BRICK_IMAGES,
  BRICK_PADDING,
  BRICK_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_SPEED,
  PADDLE_STARTX,
  PADDLE_WIDTH,
  BALL_STARTX,
  BALL_STARTY,
  BALL_SIZE,
  BALL_SPEED,
  STAGE_PADDING,
} from "./setup";

// Sprites
import PaddleSprite from "~/images/paddle.png";
import BallSprite from "~/images/ball.png";
import { Actor } from "./types";

export const createBricks = () => {
  return LEVEL.reduce<Brick[]>((ack, curr, index) => {
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
};

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

export const isCollidingBetweenPointAndBox = (point: Actor, box: Actor) => {
  if (
    point.pos.x + point.width > box.pos.x &&
    point.pos.x < box.pos.x + box.width &&
    point.pos.y + point.height > box.pos.y &&
    point.pos.y < box.pos.y + box.height
  ) {
    return true;
  }
  return false;
};

export class Collision {
  isCollidingBricks(ball: Ball, bricks: Brick[]) {
    let isColliding = false;
    bricks.forEach((brick, index) => {
      if (isCollidingBetweenPointAndBox(ball, brick)) {
        ball.changeYDirection();
        if (brick.energy === 1) {
          bricks.splice(index, 1);
        } else {
          brick.energy--;
        }
        isColliding = true;
      }
    });

    return isColliding;
  }

  activateBallCollision(ball: Ball, paddle: Paddle) {
    // Handle collision between the ball and the paddle
    if (
      ball.pos.x + ball.width > paddle.pos.x &&
      ball.pos.x < paddle.pos.x + paddle.width &&
      ball.pos.y + ball.height === paddle.pos.y
    ) {
      ball.changeYDirection();
    }
    // Handle collision between horizontal walls and the ball
    else if (ball.pos.x === 0 || ball.pos.x + ball.width === STAGE_WIDTH) {
      ball.changeXDirection();
    }
    // handle collision between the top wall and the ball
    else if (ball.pos.y === 0) {
      ball.changeYDirection();
    }
  }
}
