import * as Color from "./color.ts";
import { CanvasWrapper } from "./canvas-wrapper.ts";
import { CellType, Stage } from "./stage.ts";

Object.assign(document.body.style, {
  margin: "0",
  backgroundColor: "#000",
  width: "100vw",
  height: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const cw = new CanvasWrapper();

{ // windowのサイズ変更用の処理
  const setSize = () => {
    const s = Math.floor(Math.min(
      window.innerHeight / 9,
      window.innerWidth / 16,
    ));
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

new Stage([
  [
    [CellType.None],
    [CellType.Start, 0],
    [CellType.Plane],
  ],
  [
    [CellType.Plane],
    [CellType.None],
    [CellType.Plane],
  ],
  [
    [CellType.Plane],
    [CellType.Goal, 3],
    [CellType.None],
  ],
]).draw(cw);
