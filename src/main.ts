import { CanvasWrapper } from "./canvas-wrapper.ts";
import { Cell, CellType, parse, Stage } from "./stage.ts";
import { stageSelect } from "./stage-select.ts";
import { todo } from "./util.ts";
import { editor } from "./editor.ts";
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

    cw.clear();
  };
  window.addEventListener("resize", setSize);
  setSize();
}

document.body.appendChild(cw.elem);

const pp = new URL(location.href).searchParams.get("m");
if (pp) {
  editor(cw, pp);
} else {
  for (;;) {
    const id = await stageSelect(cw);
    if (id === -1) {
      editor(cw);
      break;
    } else {
      await new Stage(parse(Stages[id].field)).play(cw);
    }
  }
}
