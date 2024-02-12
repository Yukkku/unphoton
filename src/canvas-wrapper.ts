import * as Color from "./color.ts";
import * as Hex from "./hex.ts";

export class CanvasWrapper {
  ctx: CanvasRenderingContext2D;
  onresize?: () => void;

  constructor(
    public elem: HTMLCanvasElement = document.createElement("canvas"),
  ) {
    this.ctx = elem.getContext("2d")!;
    Object.assign(elem.style, {
      backgroundColor: Color.background,
    });
  }

  get width(): number {
    return this.elem.width;
  }
  get height(): number {
    return this.elem.height;
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
  hex(x: number, y: number, r = this.r) {
    const path = Hex.path(x, y, r * 0.875);
    this.ctx.fillStyle = Color.hexFill;
    this.ctx.strokeStyle = Color.gray;
    this.ctx.lineWidth = r / 15;
    this.ctx.fill(path);
    this.ctx.stroke(path);
  }

  /** 標準的な六角形を描く */
  hilightHex(x: number, y: number, r = this.r) {
    const path = Hex.path(x, y, r * 0.875);
    this.ctx.fillStyle = Color.hexFill;
    this.ctx.strokeStyle = Color.white;
    this.ctx.lineWidth = r / 15;
    this.ctx.fill(path);
    this.ctx.stroke(path);
  }

  clear() {
    this.ctx.reset();
  }
}
