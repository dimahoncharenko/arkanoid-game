// Shared types
export type Point = {
  x: number;
  y: number;
};

export class Actor {
  constructor(
    public image: HTMLImageElement,
    public pos: Point,
    public width: number,
    public height: number
  ) {}
}
