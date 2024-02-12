import * as Color from "./color.ts";
import { CanvasWrapper } from "./canvas-wrapper.ts";
import { Stage } from "./stage.ts";
import { stageSelect } from "./stage-select.ts";
import { stages } from "./stage-storage.ts";

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

for (;;) {
  const id = await stageSelect(cw);

  await new Stage(stages[id - 1]).play(cw);
}
