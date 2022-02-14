// Game controller
import { GameController } from "~/controllers/GameController";

// Actors
import { Ball } from "./actors/Ball";
import { Paddle } from "./actors/Paddle";
import { Brick } from "./actors/Brick";

// Helpers
import { Collision, createBall, createBricks, createPaddle } from "./helpers";

// Game constants
import { STAGE_HEIGHT, STAGE_WIDTH, TEST } from "./setup";

// Types
type GameStatus = {
  score: number;
  isGameOver: boolean;
  isGameWon: boolean;
  ball: Ball;
  paddle: Paddle;
  bricks: Brick[];
  collision?: Collision;
};

// Set up game status
let status: GameStatus = {
  score: 0,
  isGameOver: false,
  isGameWon: false,
  ball: createBall(),
  paddle: createPaddle(),
  bricks: createBricks(),
  collision: new Collision(),
};

// Set up game functions
function startGame(
  this: GameController,
  status: GameStatus,
  modal: HTMLDivElement
) {
  modal.classList.remove("active");
  status.isGameOver = false;
  status.isGameWon = false;
  status.score = 0;
  this.drawInfo("");
  this.drawScore(status.score);

  animate(this, status, modal);
}

function setGameOver(controller: GameController) {
  controller.drawInfo("Game Over!");
}

function setGameWon(controller: GameController, modal: HTMLDivElement) {
  modal.classList.add("active");
  controller.drawInfo("Game Won!");
}

// Set up game loop
function animate(
  controller: GameController,
  status: GameStatus,
  modal: HTMLDivElement
) {
  // Clear whole canvas
  controller.clear();

  // manage drawing actors
  controller.drawActors(status.bricks);
  controller.drawActor(status.paddle);
  controller.drawActor(status.ball);

  // manage moving actors
  status.ball.update();
  status.paddle.update();

  // handle collision of actors
  if (status.collision) {
    // collision between walls, paddle and ball
    status.collision.activateBallCollision(status.ball, status.paddle);

    // collision between bricks and ball
    if (status.collision.isCollidingBricks(status.ball, status.bricks)) {
      status.score++;
      controller.drawScore(status.score);
    }
  }

  // handle when game is over
  if (status.ball.pos.y > STAGE_HEIGHT) return setGameOver(controller);
  // handle when game is won
  if (status.bricks.length <= 0) return setGameWon(controller, modal);

  if (TEST) {
    console.log(status.bricks);
    console.log("Frame!");
  }

  requestAnimationFrame(() => animate(controller, status, modal));
}

window.addEventListener("DOMContentLoaded", () => {
  // Manage querying necessary elements
  const canvas = document.querySelector<HTMLCanvasElement>("#game");
  const startBtn = document.querySelector<HTMLButtonElement>("#start");
  const infoEl = document.querySelector<HTMLDivElement>("#info");
  const scoreEl = document.querySelector<HTMLDivElement>("#score");
  const gameWon = document.querySelector<HTMLDivElement>("#gameWon");

  if (canvas && startBtn && infoEl && scoreEl && gameWon) {
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Set up game controller
      const controller = new GameController(ctx, startBtn, infoEl, scoreEl);
      controller.initStartButtonHandler(
        startGame.bind(controller, status, gameWon)
      );
    }
  }
});
