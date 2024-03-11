import { CanvasWrapper } from "./canvas-wrapper.ts";
import * as Color from "./color.ts";
import * as Hex from "./hex.ts";
import Stages from "./stage-storage.json" with { type: "json" };

export const stageSelect = (cw: CanvasWrapper): Promise<number> =>
  new Promise((resolve) => {
    let id: number | undefined;
    const draw = () => {
      id = undefined;
      cw.clear();
      cw.text(
        "- Unphoton -",
        cw.width / 2,
        cw.width / 15,
        Color.white,
        `300 ${cw.r * 1.2}px monospace`,
      );
      const r = cw.r;
      const rcos30 = r * 0.8660254037844386;
      const dx = cw.width / 2 - rcos30 * 14.5;
      const dy = cw.height / 4;

      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 15; j++) {
          const v = i * 15 + j;
          const x = (j * 2 + i % 2) * rcos30 + dx;
          const y = i * r * 1.5 + dy;
          if (v >= Stages.length) {
            cw.hex(x, y);
          } else if (Hex.isTouching(cw.mouseX - x, cw.mouseY - y, r * 0.875)) {
            cw.ophex(Color.hoverHexFill, Color.white, x, y);
            cw.text(
              String(v + 1),
              x,
              y,
              Color.white,
              `300 ${r * 0.7}px monospace`,
            );
            cw.text(
              Stages[v]?.name,
              cw.width / 2,
              cw.width / 2,
              Color.white,
              `300 ${r * 0.7}px monospace`,
            );
            id = v;
          } else {
            cw.hex(x, y);
            cw.text(
              String(v + 1),
              x,
              y,
              Color.gray,
              `300 ${r * 0.7}px monospace`,
            );
          }
        }
      }
    };
    draw();
    cw.onresize = draw;
    cw.onclick = () => {
      draw();
      if (id != null) {
        cw.onresize = undefined;
        cw.onclick = undefined;
        cw.onmousemove = undefined;
        resolve(id);
      }
    };
    cw.onmousemove = draw;
  });
