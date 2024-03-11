import * as Color from "./color.ts";
import * as Hex from "./hex.ts";
import { CellType } from "./stage.ts";
import { Cell } from "./stage.ts";

export class CanvasWrapper {
  ctx: CanvasRenderingContext2D;
  onresize?: () => void;
  onclick?: (e: MouseEvent) => void;
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
    new ResizeObserver(() => this.onresize?.()).observe(elem);
    elem.addEventListener("click", (e) => this.onclick?.(e));
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

  drawCell(x: number, y: number, c: Cell, e: number = 3) {
    if (e & 1) {
      if (c[0] === CellType.None) return;
      if (c[0] === CellType.Void) {
        const path = Hex.path(x, y, this.r * 0.875);
        this.ctx.fillStyle = Color.hexFill;
        this.ctx.fill(path);
      } else if (c[1]) {
        this.ophex(
          e & 4 ? Color.hoverHexFill : Color.hexFill,
          Color.white,
          x,
          y,
        );
      } else this.hex(x, y);
      if (c[0] === CellType.Start || c[0] === CellType.Goal) {
        const srsin = this.r * Math.sin(c[2] * Math.PI / 3) / 2;
        const srcos = this.r * Math.cos(c[2] * Math.PI / 3) / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(x + srsin, y - srcos);
        this.ctx.lineTo(x + srcos, y + srsin);
        this.ctx.lineTo(x - srsin, y + srcos);
        this.ctx.moveTo(x + srcos, y + srsin);
        this.ctx.lineTo(x - srcos, y - srsin);
        this.ctx.strokeStyle = c[0] === CellType.Start
          ? Color.start
          : Color.goal;
        this.ctx.lineWidth = this.r / 15;
        this.ctx.stroke();
      }
    }
    if (e & 2) {
      switch (c[0]) {
        case CellType.Mirror: {
          const srsin = this.r * Math.sin(c[2] * Math.PI / 6) / 2;
          const srcos = this.r * Math.cos(c[2] * Math.PI / 6) / 2;
          this.ctx.beginPath();
          this.ctx.moveTo(x + srcos, y + srsin);
          this.ctx.lineTo(x - srcos, y - srsin);
          this.ctx.strokeStyle = Color.mirror;
          this.ctx.lineWidth = this.r / 15;
          this.ctx.stroke();
          break;
        }
        case CellType.HalfMirror: {
          const srsin = this.r * Math.sin(c[2] * Math.PI / 6) / 2;
          const srcos = this.r * Math.cos(c[2] * Math.PI / 6) / 2;
          this.ctx.beginPath();
          this.ctx.moveTo(x + srcos, y + srsin);
          this.ctx.lineTo(x + srcos / 6, y + srsin / 6);
          this.ctx.moveTo(x - srcos, y - srsin);
          this.ctx.lineTo(x - srcos / 6, y - srsin / 6);
          this.ctx.strokeStyle = Color.mirror;
          this.ctx.lineWidth = this.r / 15;
          this.ctx.stroke();
          break;
        }
        case CellType.CMirror: {
          const srsin = this.r * Math.sin(c[2] * Math.PI / 6) / 2;
          const srcos = this.r * Math.cos(c[2] * Math.PI / 6) / 2;
          this.ctx.beginPath();
          this.ctx.moveTo(x + srcos + srsin / 5, y + srsin - srcos / 5);
          this.ctx.lineTo(x - srcos + srsin / 5, y - srsin - srcos / 5);
          this.ctx.moveTo(x + srcos - srsin / 5, y + srsin + srcos / 5);
          this.ctx.lineTo(x - srcos - srsin / 5, y - srsin + srcos / 5);
          this.ctx.strokeStyle = Color.mirror;
          this.ctx.lineWidth = this.r / 15;
          this.ctx.stroke();
          break;
        }
        case CellType.Z: {
          this.ctx.fillStyle = c[2] ? Color.zGate : Color.gray;
          this.ctx.fill(Hex.path(x, y, this.r / 2));
          this.text("Z", x, y, Color.black, `300 ${this.r / 2}px monospace`);
          break;
        }
        case CellType.S: {
          this.ctx.fillStyle = c[2] ? Color.sGate : Color.gray;
          this.ctx.fill(Hex.path(x, y, this.r / 2));
          this.text("S", x, y, Color.black, `300 ${this.r / 2}px monospace`);
          break;
        }
        case CellType.T: {
          this.ctx.fillStyle = c[2] ? Color.tGate : Color.gray;
          this.ctx.fill(Hex.path(x, y, this.r / 2));
          this.text("T", x, y, Color.black, `300 ${this.r / 2}px monospace`);
          break;
        }
      }
    }
  }
}
