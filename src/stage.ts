import { CanvasWrapper } from "./canvas-wrapper.ts";
import * as Color from "./color.ts";
import { Func, isAccepted, next, start, UPPER_WIDTH } from "./simulator.ts";
import { sleep } from "./util.ts";
import * as Hex from "./hex.ts";

export enum CellType {
  None,
  Plane,
  Start,
  Goal,
  MovableMirror,
  Mirror,
}

export type Cell =
  | readonly [CellType.None]
  | readonly [CellType.Plane]
  | readonly [CellType.Start | CellType.Goal, 0 | 1 | 2 | 3 | 4 | 5]
  | readonly [CellType.Mirror, 0 | 1 | 2 | 3 | 4 | 5]
  | [CellType.MovableMirror, 0 | 1 | 2 | 3 | 4 | 5];

export class Stage {
  d: readonly (readonly Cell[])[];
  #width: number;

  #px: number;
  #py: number;

  constructor(d: Cell[][]) {
    this.d = structuredClone(d);
    this.#width = Math.max(...d.map((v) => v.length));
    {
      let max = -Infinity;
      let min = Infinity;
      for (let i = 0; i < d.length; i++) {
        const l = d[i];
        for (let j = 0; j < l.length; j++) {
          const c = l[j];
          if (c[0] === CellType.None) continue;
          const x = j * 2 + i;
          if (x > max) max = x;
          if (x < min) min = x;
        }
      }
      this.#px = (min + max) * 0.4330127018922193;
    }
    this.#py = (this.height - 1) * 0.75;
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

    const dx = cw.width / 2 - this.#px * r;
    const dy = cw.height / 2 - this.#py * r;

    for (let i = 0; i < this.d.length; i++) {
      const l = this.d[i];
      for (let j = 0; j < l.length; j++) {
        const c = l[j];

        const x = (j * 2 + i) * rcos30 + dx;
        const y = i * r * 1.5 + dy;

        if (c[0] === CellType.None) continue;
        if (c[0] === CellType.MovableMirror) cw.hilightHex(x, y, r);
        else cw.hex(x, y, r);

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
          case CellType.MovableMirror:
          case CellType.Mirror: {
            const srsin = r * Math.sin(c[1] * Math.PI / 6) / 2;
            const srcos = r * Math.cos(c[1] * Math.PI / 6) / 2;
            ctx.beginPath();
            ctx.moveTo(x + srcos, y + srsin);
            ctx.lineTo(x - srcos, y - srsin);
            ctx.strokeStyle = Color.mirror;
            ctx.lineWidth = r / 8;
            ctx.stroke();
            break;
          }
        }
      }
    }
  }

  mouseTouching(cw: CanvasWrapper, mx: number, my: number): Cell | undefined {
    const { r } = cw;
    const rcos30 = r * 0.8660254037844386;

    const dx = cw.width / 2 - this.#px * r;
    const dy = cw.height / 2 - this.#py * r;

    for (let i = 0; i < this.d.length; i++) {
      const l = this.d[i];
      for (let j = 0; j < l.length; j++) {
        const c = l[j];

        const x = (j * 2 + i) * rcos30 + dx;
        const y = i * r * 1.5 + dy;

        if (c[0] === CellType.MovableMirror) {
          if (Hex.isTouching(mx - x, my - y, r * 0.875)) return c;
        }
      }
    }
  }

  async run(cw: CanvasWrapper): Promise<boolean> {
    let f: Func = start(this);
    let last = Date.now();
    const anime = setInterval(() => {
      cw.ctx.reset();
      this.draw(cw, f, (Date.now() - last) / 300);
    });
    while (!isAccepted(f, this)) {
      await sleep(300);
      const nf = next(f, this);
      if (nf) f = nf;
      else {
        clearInterval(anime);
        return false;
      }
      last = Date.now();
    }
    clearInterval(anime);
    this.draw(cw, f, 0);
    return true;
  }

  play(cw: CanvasWrapper) {
    return new Promise<void>((resolve) => {
      cw.clear();
      this.draw(cw);
      const onresize = () => {
        cw.clear();
        this.draw(cw);
      };
      const onclick = (e: MouseEvent) => {
        const c = this.mouseTouching(cw, e.offsetX, e.offsetY);
        if (!c) return;
        if (c[0] === CellType.MovableMirror) {
          c[1] = (c[1] + 1) % 6 as 0 | 1 | 2 | 3 | 4 | 5;
        }
        cw.clear();
        this.draw(cw);
      };
      const onkeydown = async (e: KeyboardEvent) => {
        if (e.key !== "Enter") return;
        cw.onresize = undefined;
        window.removeEventListener("keydown", onkeydown);
        cw.elem.removeEventListener("click", onclick);
        if (await this.run(cw)) {
          resolve();
        } else {
          cw.onresize = onresize;
          window.addEventListener("keydown", onkeydown);
          cw.elem.addEventListener("click", onclick);
          cw.clear();
          this.draw(cw);
        }
      };
      cw.onresize = onresize;
      window.addEventListener("keydown", onkeydown);
      cw.elem.addEventListener("click", onclick);
    });
  }
}
