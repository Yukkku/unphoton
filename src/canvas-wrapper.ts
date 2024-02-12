import * as Color from "./color.ts";

export class CanvasWrapper {
  ctx: CanvasRenderingContext2D;
  onresize?: () => void;

  constructor(
    public elem: HTMLCanvasElement = document.createElement("canvas"),
  ) {
    this.ctx = elem.getContext("2d")!;
    Object.assign(elem, {
      backgroundColor: Color.background,
    });
  }

  get width(): number {
    return this.elem.width;
  }
  get height(): number {
    return this.elem.height;
  }

  // 上下左右中央揃えで文字を書く
  text(text: string, x: number, y: number, color: string, font: string) {
    this.ctx.font = font;
    this.ctx.fillStyle = color;
    const {
      actualBoundingBoxLeft: left,
      actualBoundingBoxRight: right,
      actualBoundingBoxAscent: top,
      actualBoundingBoxDescent: bottom,
    } = this.ctx.measureText(text);
    console.log(this.ctx.measureText(text));
    this.ctx.fillText(
      text,
      x - (left + right) / 2,
      y - (bottom - top) / 2,
    );
  }
}
