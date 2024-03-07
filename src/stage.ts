import { CanvasWrapper } from "./canvas-wrapper.ts";
import * as Color from "./color.ts";
import { Func, isAccepted, next, start, UPPER_WIDTH } from "./simulator.ts";
import { sleep } from "./util.ts";
import * as Hex from "./hex.ts";
import { show } from "./dialog.ts";

export enum CellType {
  None,
  Plane,
  Start,
  Goal,
  Mirror,
  HalfMirror,
  Z,
  S,
  T,
}

export type Cell =
  | [CellType.None]
  | [CellType.Plane]
  | [CellType.Start, 0, 0 | 1 | 2 | 3 | 4 | 5]
  | [CellType.Goal, 0, 0 | 1 | 2 | 3 | 4 | 5]
  | [CellType.Mirror, 0 | 1, 0 | 1 | 2 | 3 | 4 | 5]
  | [CellType.HalfMirror, 0 | 1, 0 | 1 | 2 | 3 | 4 | 5]
  | [CellType.Z, 0 | 1, 0 | 1]
  | [CellType.S, 0 | 1, 0 | 1]
  | [CellType.T, 0 | 1, 0 | 1];

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

  draw(cw: CanvasWrapper, hl?: Cell, f?: Func, t = 0) {
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
        if (c[1]) {
          cw.ophex(
            hl === c ? Color.hoverHexFill : Color.hexFill,
            Color.white,
            x,
            y,
            r,
          );
        } else cw.hex(x, y, r);

        switch (c[0]) {
          case CellType.Start:
          case CellType.Goal: {
            const srsin = r * Math.sin(c[2] * Math.PI / 3) / 2;
            const srcos = r * Math.cos(c[2] * Math.PI / 3) / 2;
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
      for (let i = 0; i < f[0].length; i++) {
        const n = f[2][i][i];
        const s = f[0][i];
        for (let i = 0; i < s.length; i++) {
          p[s.charCodeAt(i)] += n;
        }
      }
      const rot: readonly (readonly [number, number])[] = [
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
            const h = p[(i * UPPER_WIDTH + j) * 6 + d];
            if (h === 0) continue;
            ctx.beginPath();
            ctx.arc(
              x + rot[d][1] * t,
              y + rot[d][0] * t,
              r / 5,
              0,
              Math.PI * 2,
            );
            ctx.fillStyle = `rgb(255,255,0,${h * 0.75 + 0.25})`;
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
            const srsin = r * Math.sin(c[2] * Math.PI / 6) / 2;
            const srcos = r * Math.cos(c[2] * Math.PI / 6) / 2;
            ctx.beginPath();
            ctx.moveTo(x + srcos, y + srsin);
            ctx.lineTo(x - srcos, y - srsin);
            ctx.strokeStyle = Color.mirror;
            ctx.lineWidth = r / 8;
            ctx.stroke();
            break;
          }
          case CellType.HalfMirror: {
            const srsin = r * Math.sin(c[2] * Math.PI / 6) / 2;
            const srcos = r * Math.cos(c[2] * Math.PI / 6) / 2;
            ctx.beginPath();
            ctx.moveTo(x + srcos, y + srsin);
            ctx.lineTo(x + srcos / 4, y + srsin / 4);
            ctx.moveTo(x - srcos, y - srsin);
            ctx.lineTo(x - srcos / 4, y - srsin / 4);
            ctx.strokeStyle = Color.mirror;
            ctx.lineWidth = r / 8;
            ctx.stroke();
            break;
          }
          case CellType.Z: {
            ctx.fillStyle = c[2] ? Color.zGate : Color.gray;
            ctx.fill(Hex.path(x, y, r / 2));
            cw.text("Z", x, y, Color.black, `${r / 2}px monospace`);
            break;
          }
          case CellType.S: {
            ctx.fillStyle = c[2] ? Color.sGate : Color.gray;
            ctx.fill(Hex.path(x, y, r / 2));
            cw.text("S", x, y, Color.black, `${r / 2}px monospace`);
            break;
          }
          case CellType.T: {
            ctx.fillStyle = c[2] ? Color.tGate : Color.gray;
            ctx.fill(Hex.path(x, y, r / 2));
            cw.text("T", x, y, Color.black, `${r / 2}px monospace`);
            break;
          }
        }
      }
    }
  }

  mouseTouching(
    cw: CanvasWrapper,
  ): Cell | undefined {
    const { mouseX: mx, mouseY: my } = cw;
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

        if (c[1] && Hex.isTouching(mx - x, my - y, r * 0.875)) {
          return c;
        }
      }
    }
  }

  async run(cw: CanvasWrapper): Promise<boolean> {
    let f: Func = start(this);
    let last = Date.now();
    const anime = setInterval(() => {
      cw.ctx.reset();
      this.draw(cw, undefined, f, (Date.now() - last) / 300);
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
    this.draw(cw, undefined, f, 0);
    return true;
  }

  play(cw: CanvasWrapper) {
    return new Promise<void>((resolve) => {
      const beginTime = Date.now();
      let clickCount = 0;
      const redraw = () => {
        const t = this.mouseTouching(cw);
        cw.clear();
        this.draw(cw, t);
        const { ctx, r } = cw;
        const x = cw.width - r * 1.2;
        const y = cw.height - r * 1.2;
        cw.ophex(
          Hex.isTouching(cw.mouseX - x, cw.mouseY - y, r * 0.875)
            ? "#252"
            : "#232",
          "#0f0",
          x,
          y,
        );
        ctx.fillStyle = "#0c0";
        ctx.beginPath();
        ctx.moveTo(x + r / 2, y);
        ctx.lineTo(x - r / 4, y - r * 0.4330127018922193);
        ctx.lineTo(x - r / 4, y + r * 0.4330127018922193);
        ctx.closePath();
        ctx.fill();
      };
      redraw();
      const onresize = redraw;
      const onmousemove = redraw;
      const onclick = async () => {
        const endTime = Date.now();
        const c = this.mouseTouching(cw);
        if (!c) {
          if (
            Hex.isTouching(
              cw.width - cw.r * 1.2 - cw.mouseX,
              cw.height - cw.r * 1.2 - cw.mouseY,
              cw.r * 0.875,
            )
          ) {
            clickCount += 1;
            cw.onresize = undefined;
            cw.elem.removeEventListener("click", onclick);
            cw.elem.removeEventListener("mousemove", onmousemove);
            if (await this.run(cw)) {
              this.draw(cw);
              cw.onresize = () => this.draw(cw);
              await show(endTime - beginTime, clickCount);
              cw.onresize = undefined;
              resolve();
            } else {
              cw.onresize = onresize;
              cw.elem.addEventListener("click", onclick);
              cw.elem.addEventListener("mousemove", onmousemove);
              redraw();
            }
          }
          return;
        }
        clickCount += 1;
        switch (c[0]) {
          case CellType.Mirror:
          case CellType.HalfMirror:
            c[2] = (c[2] + 1) % 6 as 0 | 1 | 2 | 3 | 4 | 5;
            break;
          case CellType.Z:
          case CellType.S:
          case CellType.T:
            c[2] ^= 1;
            break;
        }
        redraw();
      };
      cw.onresize = onresize;
      cw.elem.addEventListener("click", onclick);
      cw.elem.addEventListener("mousemove", onmousemove);
    });
  }
}
