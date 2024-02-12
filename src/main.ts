Object.assign(document.body.style, {
  margin: "0",
  backgroundColor: "#000",
  width: "100vw",
  height: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
{
  const setSize = () => {
    const c = Math.floor(Math.min(
      window.innerHeight / 9,
      window.innerWidth / 16,
    ));
    canvas.height = c * 9;
    canvas.width = c * 16;
  };
  setSize();
  window.addEventListener("resize", setSize);
}
const ctx = canvas.getContext("2d")!;
