import { CanvasWrapper } from "./canvas-wrapper.ts";
import * as Color from "./color.ts";
import { Func, isAccepted, next, start, UPPER_WIDTH } from "./simulator.ts";
import { sleep } from "./util.ts";

export enum CellType {
  None,
  Plane,
  Start,
  Goal,
  Mirror,
}

export type Cell =
  | [CellType.None]
  | [CellType.Plane]
  | [CellType.Start | CellType.Goal, 0 | 1 | 2 | 3 | 4 | 5]
  | [CellType.Mirror, 0 | 1 | 2 | 3 | 4 | 5];

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

  draw(cw: CanvasWrapper, f?: Func, t = 0) {
    const { ctx, r } = cw;
    const rcos30 = r * 0.8660254037844386;

    const dx = 100;
    const dy = 100;

    for (let i = 0; i < this.d.length; i++) {
      const l = this.d[i];
      for (let j = 0; j < l.length; j++) {
        const c = l[j];

        const x = (j * 2 + i) * rcos30 + dx;
        const y = i * r * 1.5 + dy;

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

    if (f) {
      const p = new Float64Array(65536);
      for (const [s, v] of f) {
        const n = v.norm();
        for (const c of s) {
          p[c.charCodeAt(0)] += n;
        }
      }
      const rot: [number, number][] = [
        [0, rcos30 * 2],
        [r * 1.5, rcos30],
        [r * 1.5, 0 - rcos30],
        [0, rcos30 * -2],
        [r * -1.5, 0 - rcos30],
        [r * -1.5, rcos30],
      ];
      for (let i = 0; i < this.d.length; i++) {
        const l = this.d[i];
        for (let j = 0; j < l.length; j++) {
          const x = (j * 2 + i) * rcos30 + dx;
          const y = i * r * 1.5 + dy;
          for (let d = 0; d < 6; d++) {
            ctx.beginPath();
            ctx.arc(
              x + rot[d][1] * t,
              y + rot[d][0] * t,
              r / 5,
              0,
              Math.PI * 2,
            );
            ctx.fillStyle = `rgb(255,255,0,${
              p[(i * UPPER_WIDTH + j) * 6 + d]
            })`;
            ctx.fill();
          }
        }
      }
    }

    for (let i = 0; i < this.d.length; i++) {
      const l = this.d[i];
      for (let j = 0; j < l.length; j++) {
        const c = l[j];

        const x = (j * 2 + i) * rcos30 + dx;
        const y = i * r * 1.5 + dy;

        switch (c[0]) {
          case CellType.Mirror: {
            const srsin = r * Math.sin(c[1] * Math.PI / 6) / 2;
            const srcos = r * Math.cos(c[1] * Math.PI / 6) / 2;
            ctx.beginPath();
            ctx.moveTo(x + srsin, y + srcos);
            ctx.lineTo(x - srsin, y - srcos);
            ctx.strokeStyle = Color.mirror;
            ctx.lineWidth = r / 8;
            ctx.stroke();
            break;
          }
        }
      }
    }
  }

  async run(cw: CanvasWrapper) {
    let f: Func = start(this);
    let last = Date.now();
    const anime = setInterval(() => {
      cw.ctx.reset();
      this.draw(cw, f, (Date.now() - last) / 300);
    });
    while (!isAccepted(f, this)) {
      await sleep(300);
      f = next(f, this)!;
      last = Date.now();
    }
    clearInterval(anime);
    this.draw(cw, f, 0);
  }
}
