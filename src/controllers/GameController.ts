// Types
import { Actor } from "~/types";

// Game constants
import { STAGE_HEIGHT, STAGE_WIDTH } from "~/setup";

export class GameController {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private startBtn: HTMLButtonElement,
    private scoreEl: HTMLDivElement,
    private modal: HTMLDivElement
  ) {}

  initStartButtonHandler(callback: (this: this) => void) {
    this.startBtn.addEventListener("click", callback.bind(this));
  }

  clearField() {
    this.ctx.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
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

  drawScore(score: string | number) {
    this.scoreEl.textContent = score.toString();
  }

  openModal(message: string, score: number | string) {
    this.modal.children[0].textContent = message;
    this.modal.children[1].textContent = `Your score: ${score}`;
    this.modal.classList.add("active");
  }

  closeModal() {
    this.modal.classList.remove("active");
  }

  hideStartButton() {
    this.startBtn.style.display = "none";
  }

  showStartButton() {
    this.startBtn.style.display = "inline-block";
  }
}
