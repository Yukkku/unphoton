import { CanvasWrapper } from "./canvas-wrapper.ts";
import { Cell, CellType, Stage } from "./stage.ts";

export const g = (cw: CanvasWrapper) => {
  const r: Cell[][] = [];
  for (let i = 0; i < 10; i++) {
    const v: Cell[] = [];
    for (let j = i; j < 10; j += 2) v.push([CellType.None]);
    for (let j = 0; j < 16; j++) v.push([CellType.Void]);
    r.push(v);
  }
  const v = new Stage(r);
  v.draw(cw);
};
