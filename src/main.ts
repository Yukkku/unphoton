import * as Color from "./color.ts";
import { CanvasWrapper } from "./canvas-wrapper.ts";
import { Cell, CellType, Stage } from "./stage.ts";
import { stageSelect } from "./stage-select.ts";
import { todo } from "./util.ts";
import Stages from "./stage-storage.json" with { type: "json" };

const cw = new CanvasWrapper();

{ // windowのサイズ変更用の処理
  const setSize = () => {
    const s = Math.floor(Math.min(
      window.innerHeight / 9,
      window.innerWidth / 16,
    ));
    if (cw.elem.width / 16 === s) return;
    cw.elem.width = s * 16;
    cw.elem.height = s * 9;

    cw.ctx.fillStyle = Color.background;
    cw.ctx.fillRect(0, 0, cw.width, cw.height);
    cw.onresize?.();
  };
  window.addEventListener("resize", setSize);
  setSize();
}

document.body.appendChild(cw.elem);

const parse = (v: string[]) => {
  let dx = Infinity;
  for (let i = 0; i < v.length; i++) {
    if (!v[i]) continue;
    const t = v[i].match(/\S/)!.index! - i;
    if (t < dx) dx = t;
  }
  const r: Cell[][] = [];
  for (let i = 0; i < v.length; i++) {
    const e: Cell[] = [];
    r.push(e);
    if (!v[i]) continue;
    let f = dx + i;
    while (f < 0) {
      e.push([CellType.None]);
      f += 2;
    }
    for (; f < v[i].length; f += 2) {
      const x = v[i][f];
      const y = Number(v[i][f + 1]);
      switch (x) {
        case " ":
          e.push([CellType.None]);
          break;
        case ".":
          e.push([CellType.Plane]);
          break;
        case "p":
          e.push([CellType.Start, 0, y as 0 | 1 | 2 | 3 | 4 | 5]);
          break;
        case "q":
          e.push([CellType.Goal, 0, y as 0 | 1 | 2 | 3 | 4 | 5]);
          break;
        case "m":
          e.push([CellType.Mirror, 0, y as 0 | 1 | 2 | 3 | 4 | 5]);
          break;
        case "M":
          e.push([CellType.Mirror, 1, y as 0 | 1 | 2 | 3 | 4 | 5]);
          break;
        case "h":
          e.push([CellType.HalfMirror, 0, y as 0 | 1 | 2 | 3 | 4 | 5]);
          break;
        case "H":
          e.push([CellType.HalfMirror, 1, y as 0 | 1 | 2 | 3 | 4 | 5]);
          break;
        case "z":
          e.push([CellType.Z, 0, y as 0 | 1]);
          break;
        case "Z":
          e.push([CellType.Z, 1, y as 0 | 1]);
          break;
        case "s":
          e.push([CellType.S, 0, y as 0 | 1]);
          break;
        case "S":
          e.push([CellType.S, 1, y as 0 | 1]);
          break;
        case "t":
          e.push([CellType.T, 0, y as 0 | 1]);
          break;
        case "T":
          e.push([CellType.T, 1, y as 0 | 1]);
          break;
        default:
          todo();
      }
    }
  }
  return r;
};

for (;;) {
  const id = await stageSelect(cw);

  await new Stage(parse(Stages[id].field)).play(cw);
}
