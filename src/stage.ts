import { type CanvasWrapper } from "./canvas-wrapper.ts";
import * as Color from "./color.ts";

export enum CellType {
  None,
  Plane,
  Start,
  Goal,
}

export type Cell =
  | [CellType.None]
  | [CellType.Plane]
  | [CellType.Start | CellType.Goal, 0 | 1 | 2 | 3 | 4 | 5];

export class Stage {
  d: readonly (readonly Readonly<Cell>[])[];
  #width: number;

  constructor(d: Cell[][]) {
    this.d = structuredClone(d);
    this.#width = Math.max(...d.map((v) => v.length));
  }

  get width(): number {
    return this.#width;
  }
  get height(): number {
    return this.d.length;
  }

  draw(cw: CanvasWrapper) {
    const { ctx } = cw;
    const r = cw.width / 30;
    const rcos30 = r * 0.8660254037844386;

    const path = new Path2D();
    for (let i = 0; i < this.d.length; i++) {
      const l = this.d[i];
      for (let j = 0; j < l.length; j++) {
        const c = l[j];

        const x = (j * 2 + i) * rcos30 + 100;
        const y = i * r * 1.5 + 100;

        if (c[0] === CellType.None) continue;
        cw.hex(x, y, r);

        switch (c[0]) {
          case CellType.Start:
          case CellType.Goal: {
            const srsin = r * Math.sin(c[1] * Math.PI / 3) / 2;
            const srcos = r * Math.cos(c[1] * Math.PI / 3) / 2;
            ctx.beginPath();
            ctx.moveTo(x + srsin, y - srcos);
            ctx.lineTo(x + srcos, y + srsin);
            ctx.lineTo(x - srsin, y + srcos);
            ctx.moveTo(x + srcos, y + srsin);
            ctx.lineTo(x - srcos, y - srsin);
            ctx.strokeStyle = c[0] === CellType.Start
              ? Color.start
              : Color.goal;
            ctx.lineWidth = r / 8;
            ctx.stroke();
            break;
          }
        }
      }
    }
    ctx.fillStyle = Color.hexFill;
    ctx.fill(path);
    ctx.strokeStyle = Color.gray;
    ctx.lineWidth = r / 15;
    ctx.stroke(path);
  }
}
