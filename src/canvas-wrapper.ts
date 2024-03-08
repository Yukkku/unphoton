import * as Color from "./color.ts";
import * as Hex from "./hex.ts";

export class CanvasWrapper {
  ctx: CanvasRenderingContext2D;
  onresize?: () => void;
  #mouseX = 0;
  #mouseY = 0;

  constructor(
    public elem: HTMLCanvasElement = document.createElement("canvas"),
  ) {
    this.ctx = elem.getContext("2d")!;
    elem.addEventListener("mousemove", (e) => {
      this.#mouseX = e.offsetX;
      this.#mouseY = e.offsetY;
    });
  }

  get width(): number {
    return this.elem.width;
  }
  get height(): number {
    return this.elem.height;
  }
  get mouseX(): number {
    return this.#mouseX;
  }
  get mouseY(): number {
    return this.#mouseY;
  }

  get r(): number {
    return this.width / 30;
  }

  /** 上下左右中央揃えで文字を書く */
  text(text: string, x: number, y: number, color: string, font: string) {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    const {
      actualBoundingBoxLeft: left,
      actualBoundingBoxRight: right,
      actualBoundingBoxAscent: top,
      actualBoundingBoxDescent: bottom,
    } = this.ctx.measureText(text);
    this.ctx.fillText(
      text,
      x + (left - right) / 2,
      y + (top - bottom) / 2,
    );
  }

  /** 標準的な六角形を描く */
  ophex(fill: string, stroke: string, x: number, y: number, r = this.r) {
    const path = Hex.path(x, y, r * 0.875);
    this.ctx.fillStyle = fill;
    this.ctx.strokeStyle = stroke;
    this.ctx.lineWidth = r / 20;
    this.ctx.fill(path);
    this.ctx.stroke(path);
  }

  /** 標準的な六角形を描く */
  hex(x: number, y: number, r = this.r) {
    const path = Hex.path(x, y, r * 0.875);
    this.ctx.fillStyle = Color.hexFill;
    this.ctx.strokeStyle = Color.gray;
    this.ctx.lineWidth = r / 20;
    this.ctx.fill(path);
    this.ctx.stroke(path);
  }

  clear() {
    this.ctx.reset();
    this.ctx.fillStyle = Color.background;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}
