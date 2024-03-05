export const show = (time: number, count: number) =>
  new Promise<void>((resolve) => {
    const dialog = document.createElement("dialog");
    dialog.classList.add("accepted");
    {
      const heading = document.createElement("div");
      heading.classList.add("heading");
      heading.innerText = "Accepted";
      dialog.appendChild(heading);
    }
    {
      const info = document.createElement("div");
      info.innerText = `Time   ${
        String(Math.floor(time / 60000)).padStart(2, "0")
      }:${
        String(Math.floor(time / 1000 % 60)).padStart(2, "0")
      }\nClick  ${count}`;
      info.classList.add("info");
      dialog.appendChild(info);
    }
    {
      const ex = document.createElement("div");
      ex.innerHTML =
        "<h3>解説</h3><p>ここで問題の解説を読むことができます. 中学数学程度の知識で読み進められるようにします</p><h3>補足</h3><p>中学数学を超えた知識がある方へ向けた解説の要約や補足をここで行います</p>";
      ex.classList.add("explanation");
      dialog.appendChild(ex);
    }
    {
      const close = document.createElement("button");
      close.innerText = "Close";
      close.addEventListener("click", () => {
        resolve();
        dialog.close();
        dialog.remove();
      });
      dialog.appendChild(close);
    }
    document.body.appendChild(dialog);
    dialog.showModal();
  });
