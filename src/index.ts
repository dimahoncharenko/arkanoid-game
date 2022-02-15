// Controllers
import { GameController } from "./controllers/GameController";

// Helpers
import { createBricks, createBall, createPaddle, Collision } from "./helpers";

// Types
import { Brick } from "~/actors/Brick";
import { Paddle } from "~/actors/Paddle";
import { Ball } from "~/actors/Ball";

// Game constants
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  BRICK_IMAGES,
  BRICK_WIDTH,
  BRICK_HEIGHT,
} from "./setup";

type GameState = {
  score: number;
  isGameOver: boolean;
  isGameWon: boolean;
  bricks: Brick[] | null;
  paddle: Paddle | null;
  ball: Ball | null;
  collision?: Collision;
};

// Set up game status
let state: GameState = {
  score: 0,
  isGameOver: false,
  isGameWon: false,
  bricks: null,
  ball: null,
  paddle: null,
  collision: new Collision(),
};

// Set up game functions
function startGame(this: GameController, state: GameState) {
  state.score = 0;
  state.isGameOver = false;
  state.isGameWon = false;
  state.ball = createBall();
  state.bricks = createBricks();
  state.paddle = createPaddle();
  this.drawScore(state.score);
  this.closeModal();
  this.hideStartButton();
}

function setGameOver(controller: GameController, state: GameState) {
  state.isGameOver = true;
  controller.openModal("Game is Over!", state.score);
  controller.showStartButton();
}

function setGameWon(controller: GameController, state: GameState) {
  state.isGameWon = true;
  controller.openModal("Congratulations!", state.score);
  controller.showStartButton();
}

// Set up game loop
function animate(controller: GameController, state: GameState) {
  controller.clearField();

  // manage drawing and moving of actors
  if (state.bricks) {
    controller.drawActors(state.bricks);

    // handle game won
    if (state.bricks.length <= 0) setGameWon(controller, state);
  }

  if (state.ball) {
    controller.drawActor(state.ball);
    state.ball.update();

    // handle game over
    if (state.ball.pos.y > STAGE_HEIGHT && !state.isGameWon)
      setGameOver(controller, state);

    // handle collision
    if (state.collision) {
      // handle collision between walls and the ball
      state.collision.activateCollisionBetweenBallAndWalls(state.ball);

      // handle collision between the paddle and the ball
      if (
        state.collision.isCollidingBetweenBallAndPaddle(
          state.ball,
          state.paddle!
        )
      ) {
        state.ball.changeYDirection();
      }

      // handle collision between bricks and the ball
      const { index } = state.collision.isCollidingBetweenBallAndBricks(
        state.ball,
        state.bricks!
      );

      if (index > -1) {
        state.score++;
        state.ball.changeYDirection();

        if (state.bricks![index].energy === 1) {
          state.bricks!.splice(index, 1);
        } else {
          state.bricks![index].energy--;
        }

        controller.drawScore(state.score);
      }
    }
  }

  if (state.paddle) {
    controller.drawActor(state.paddle);
    state.paddle.update();
  }

  requestAnimationFrame(animate.bind({}, controller, state));
}

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector<HTMLCanvasElement>("#game");
  const scoreEl = document.querySelector<HTMLDivElement>("#score");
  const startBtn = document.querySelector<HTMLButtonElement>("#start");
  const modal = document.querySelector<HTMLDivElement>("#modal");

  if (canvas && scoreEl && startBtn && modal) {
    const ctx = canvas.getContext("2d");
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    if (ctx) {
      // Set up game controller
      const controller = new GameController(ctx, startBtn, scoreEl, modal);

      controller.initStartButtonHandler(startGame.bind(controller, state));

      // Run game loop
      requestAnimationFrame(() => animate(controller, state));
    }
  }
});
