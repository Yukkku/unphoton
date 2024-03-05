import * as Color from "./color.ts";
export const show = (time: number, count: number) =>
  new Promise<void>((resolve) => {
    const dialog = document.createElement("dialog");
    const cushion = document.createElement("div");
    {
      const title = document.createElement("div");
      title.innerText = "Accepted";
      cushion.appendChild(title);

      Object.assign(title.style, {
        fontSize: "1.5rem",
        margin: "0.3rem 0 0.5rem",
        fontFamily: "serif",
        userSelect: "none",
      });
    }
    {
      const info = document.createElement("div");
      info.innerText = `Time   ${
        String(Math.floor(time / 60000)).padStart(2, "0")
      }:${
        String(Math.floor(time / 1000 % 60)).padStart(2, "0")
      }\nClick  ${count}`;
      cushion.appendChild(info);

      Object.assign(info.style, {
        fontFamily: "monospace",
        whiteSpace: "pre",
        userSelect: "none",
      });
    }
    {
      const ex = document.createElement("div");
      ex.innerHTML =
        "<h3>解説</h3><p>ここで問題の解説を読むことができます. 中学数学程度の知識で読み進められるようにします</p><h3>補足</h3><p>中学数学を超えた知識がある方へ向けた解説の要約や補足をここで行います</p>";
      for (const e of ex.querySelectorAll("h3")) {
        Object.assign(e.style, {
          fontFamily: "serif",
          userSelect: "none",
        });
      }
      Object.assign(ex.style, {
        width: "calc(100% - 2rem)",
        fontFamily: "sans-serif",
        overflowY: "auto",
        flexGrow: "1",
        flexShrink: "2",
      });
      cushion.appendChild(ex);
    }
    {
      const close = document.createElement("button");
      close.innerText = "Close";
      close.addEventListener("click", () => {
        resolve();
        dialog.close();
        dialog.remove();
      });
      cushion.appendChild(close);
    }
    document.body.appendChild(dialog).appendChild(cushion);
    dialog.showModal();
    Object.assign(dialog.style, {
      color: Color.white,
      backgroundColor: Color.background,
      borderColor: Color.gray,
      outline: "none",
      padding: "0",
    });
    Object.assign(cushion.style, {
      width: "min(30rem, 80vw)",
      height: "min(25rem, 80vh)",
      padding: "4px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    });
  });
