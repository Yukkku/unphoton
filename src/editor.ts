import { CanvasWrapper } from "./canvas-wrapper.ts";
import { Cell, CellType, Stage } from "./stage.ts";
import * as Hex from "./hex.ts";
import * as Color from "./color.ts";

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
    const { ctx, r } = cw;
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
    {
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
      ctx.lineTo(x - r / 4, y - e);
      ctx.lineTo(x - r / 4, y + e);
      ctx.closePath();
      ctx.fill();
    }
    {
      const x = cw.width - r * 1.2 - e * 4;
      const y = cw.height - r * 1.2;
      const t = Hex.isTouching(cw.mouseX - x, cw.mouseY - y, r * 0.875);
      cw.ophex(
        t ? Color.hoverHexFill : Color.hexFill,
        t ? Color.white : Color.gray,
        x,
        y,
      );
      ctx.beginPath();
      ctx.moveTo(x + r / 4, y + e);
      ctx.lineTo(x - r / 2, y);
      ctx.lineTo(x + r / 4, y - e);
      ctx.strokeStyle = Color.white;
      ctx.lineWidth = r / 20;
      ctx.stroke();
      ctx.fillStyle = Color.white;
      ctx.beginPath();
      ctx.arc(x + r / 4, y + e, r / 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - r / 2, y, r / 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + r / 4, y - e, r / 10, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  draw();
  cw.onresize = draw;
  cw.onmousemove = draw;
  const onclick = async () => {
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
      if (
        Hex.isTouching(
          cw.width - r * 1.2 - cw.mouseX,
          cw.height - r * 1.2 - cw.mouseY,
          r * 0.875,
        )
      ) {
        cw.onresize = undefined;
        cw.onmousemove = undefined;
        cw.onclick = undefined;
        await v.run(cw);
        cw.onresize = draw;
        cw.onmousemove = draw;
        cw.onclick = onclick;
        draw();
      } else if (
        Hex.isTouching(
          cw.width - r * 1.2 - e * 4 - cw.mouseX,
          cw.height - r * 1.2 - cw.mouseY,
          r * 0.875,
        )
      ) {
        cw.onresize = () => {
          draw();
          cw.ctx.fillStyle = "rgba(0 0 0/0.5)";
          cw.ctx.fillRect(0, 0, cw.width, cw.height);
        };
        cw.onmousemove = undefined;
        cw.onclick = undefined;
        cw.onresize();
        await share(v);
        cw.onresize = draw;
        cw.onmousemove = draw;
        cw.onclick = onclick;
        draw();
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
  cw.onclick = onclick;
};

const share = (v: Stage) =>
  new Promise<void>((resolve) => {
    const url = new URL(location.href);
    url.searchParams.set("q", toString(v));
    const str = url.href;
    const elem = document.createElement("dialog");
    elem.id = "share";
    elem.appendChild(document.createElement("h2")).innerText = "- Share -";
    {
      const ta = document.createElement("textarea");
      Object.assign(ta, {
        onclick: ta.select,
        readOnly: true,
        value: str,
      });
      elem.appendChild(ta);
    }
    {
      const ta = document.createElement("a");
      Object.assign(ta, {
        innerText: "X (Twitter) で共有",
        href: "https://twitter.com/share?hashtags=Unphoton&url=" + str,
        target: "_blank",
        rel: "noopener",
      });
      elem.appendChild(ta);
    }
    {
      const ta = document.createElement("span");
      Object.assign(ta, {
        innerText: "Close",
        onclick() {
          elem.remove();
          resolve();
        },
      });
      elem.appendChild(ta);
    }
    document.body.appendChild(elem);
    elem.show();
  });

const toString = (v: Stage) => {
  return v.d.map((f) =>
    f.slice(-12).map((x) => {
      switch (x[0]) {
        case CellType.None:
          return "  ";
        case CellType.Void:
          return "__";
        case CellType.Plane:
          return "..";
        case CellType.Start:
          return "p" + String(x[2]);
        case CellType.Goal:
          return "q" + String(x[2]);
        case CellType.Mirror:
          return "m" + String(x[2]);
        case CellType.HalfMirror:
          return "h" + String(x[2]);
        case CellType.CMirror:
          return "c" + String(x[2]);
        case CellType.Z:
          return "z" + String(x[2]);
        case CellType.S:
          return "s" + String(x[2]);
        case CellType.T:
          return "t" + String(x[2]);
      }
    }).join("")
  ).join("");
};
