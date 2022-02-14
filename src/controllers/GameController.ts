// Types
import { Actor } from "~/types";

// Game constants
import { STAGE_WIDTH, STAGE_HEIGHT } from "~/setup";

export class GameController {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private startBtn: HTMLButtonElement,
    private infoEl: HTMLDivElement,
    private scoreEl: HTMLDivElement
  ) {}

  clear() {
    this.ctx.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
  }

  initStartButtonHandler(callback: (this: this) => void) {
    this.startBtn.addEventListener("click", callback.bind(this));
  }

  drawActor(actor: Actor) {
    this.ctx.drawImage(
      actor.image,
      actor.pos.x,
      actor.pos.y,
      actor.width,
      actor.height
    );
  }

  drawActors(actors: Actor[]) {
    actors.forEach((actor) => this.drawActor(actor));
  }

  drawInfo(text: string) {
    this.infoEl.innerHTML = text;
  }

  drawScore(score: number | string) {
    this.scoreEl.innerHTML = score.toString();
  }
}
