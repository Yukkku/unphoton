import { type CanvasWrapper } from "./canvas-wrapper.ts";
import * as Color from "./color.ts";
import * as Hex from "./hex.ts";

export const stageSelect = (cw: CanvasWrapper): Promise<number> =>
  new Promise((resolve) => {
    let id: number | undefined;
    const draw = (mx = 0, my = 0) => {
      id = undefined;
      cw.clear();
      cw.text(
        "Unphoton",
        cw.width / 2,
        cw.width / 15,
        Color.white,
        `600 ${cw.width / 20}px serif`,
      );
      const r = cw.r;
      const rcos30 = r * 0.8660254037844386;
      const dx = cw.width / 2 - rcos30 * 14.5;
      const dy = cw.height / 4;

      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 15; j++) {
          const v = i * 15 + j + 1;
          const x = (j * 2 + i % 2) * rcos30 + dx;
          const y = i * r * 1.5 + dy;
          if (Hex.isTouching(mx - x, my - y, r * 0.875)) {
            cw.hilightHex(x, y);
            cw.text(String(v), x, y, Color.white, `${r * 0.7}px monospace`);
            id = v;
          } else {
            cw.hex(x, y);
            cw.text(String(v), x, y, Color.gray, `${r * 0.7}px monospace`);
          }
        }
      }
    };
    draw();
    cw.onresize = draw;
    const onmousemove = (e: MouseEvent) => {
      draw(e.offsetX, e.offsetY);
    };
    const onclick = (e: MouseEvent) => {
      draw(e.offsetX, e.offsetY);
      cw.onresize = undefined;
      if (id != null) {
        cw.elem.removeEventListener("mousemove", onmousemove);
        cw.elem.removeEventListener("click", onclick);
        resolve(id);
      }
    };
    cw.elem.addEventListener("mousemove", onmousemove);
    cw.elem.addEventListener("click", onclick);
  });
