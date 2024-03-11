import { CanvasWrapper } from "./canvas-wrapper.ts";
import { Cell, CellType, Stage } from "./stage.ts";
import * as Hex from "./hex.ts";

const MODES = [
  [CellType.Plane],
  [CellType.Start, 0, 0],
  [CellType.Goal, 0, 0],
  [CellType.Mirror, 0, 4],
  [CellType.HalfMirror, 0, 4],
  [CellType.CMirror, 0, 4],
  [CellType.Z, 0, 1],
  [CellType.S, 0, 1],
  [CellType.T, 0, 1],
] as const satisfies Cell[];

export const g = (cw: CanvasWrapper) => {
  let mode = 0;
  const r: Cell[][] = [];
  for (let i = 0; i < 10; i++) {
    const v: Cell[] = [];
    for (let j = i; j < 10; j += 2) v.push([CellType.None]);
    for (let j = 0; j < 12; j++) v.push([CellType.Void]);
    r.push(v);
  }
  const v = new Stage(r);
  const draw = () => {
    cw.clear();
    const r = cw.r;
    const e = r * 0.4330127018922193;
    const x = cw.height / 2 - r * 6;

    for (let i = 0; i < MODES.length; i++) {
      cw.drawCell(
        i & 1 ? x + e : x - e,
        x + r * 1.5 * i,
        MODES[i],
        mode === i ? 7 : 3,
      );
    }

    v.draw(cw);
  };
  cw.onresize = draw;
  draw();
  cw.onclick = ({ shiftKey, ctrlKey }) => {
    const r = v.mouseTouching(cw);
    if (!r) {
      const r = cw.r;
      const e = r * 0.4330127018922193;
      const x = cw.height / 2 - r * 6;

      for (let i = 0; i < MODES.length; i++) {
        if (
          Hex.isTouching(
            (i & 1 ? x + e : x - e) - cw.mouseX,
            (x + r * 1.5 * i) - cw.mouseY,
            r * 0.875,
          )
        ) {
          mode = i;
          draw();
        }
      }
      return;
    }
    if (mode === 0) {
      if (r[0] as CellType === CellType.Void) {
        r[0] = CellType.Plane;
      } else {
        r[0] = CellType.Void;
        r.length = 1;
      }
    } else if (mode === 1 || mode === 2) {
      if (r[0] === CellType.Start || r[0] === CellType.Goal) {
        if (r[0] === MODES[mode][0]) {
          r[2] = (r[2] + 1) % 6 as 0 | 1 | 2 | 3 | 4 | 5;
        }
      } else {
        r.length = 3;
        r[1] = 0;
        r[2] = 0;
      }
      r[0] = MODES[mode][0];
    } else if (2 < mode && mode < 6) {
      if (
        r[0] === CellType.Mirror || r[0] === CellType.HalfMirror ||
        r[0] === CellType.CMirror
      ) {
        if (r[0] === MODES[mode][0]) {
          r[2] = (r[2] + 1) % 6 as 0 | 1 | 2 | 3 | 4 | 5;
        }
      } else {
        r.length = 3;
        r[1] = r[1] ?? 0;
        r[2] = 0;
      }
      r[0] = MODES[mode][0];
    } else if (5 < mode) {
      if (
        r[0] === CellType.Z || r[0] === CellType.S ||
        r[0] === CellType.T
      ) {
        if (r[0] === MODES[mode][0]) r[2] = (r[2] ^ 1) as 0 | 1;
      } else {
        r.length = 3;
        r[1] = r[1] ?? 0;
        r[2] = 1;
      }
      r[0] = MODES[mode][0];
    }
    draw();
  };
};
