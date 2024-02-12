/** @file 複素数計算を行う */

/**
 * 「4294967161で割ったあまり」を用いて0か判定するのにwasmを用いています
 * ```wat
 * (module
 *   (func (export "add") (param i32 i32) (result i32)
 *     local.get 0
 *     local.get 0
 *     i32.const 135
 *     i32.add
 *     i32.const -135
 *     local.get 0
 *     i32.sub
 *     local.get 1
 *     i32.gt_u
 *     select
 *     local.get 1
 *     i32.add
 *   )
 *   (func (export "sub") (param i32 i32) (result i32)
 *     local.get 0
 *     i32.const 135
 *     i32.sub
 *     local.get 0
 *     local.get 0
 *     local.get 1
 *     i32.lt_u
 *     select
 *     local.get 1
 *     i32.sub
 *   )
 *   (func (export "mul")(param i32 i32) (result i32)
 *     local.get 1
 *     i64.extend_i32_u
 *     local.get 0
 *     i64.extend_i32_u
 *     i64.mul
 *     i64.const 4294967161
 *     i64.rem_u
 *     i32.wrap_i64
 *   )
 * )
 * ```
 */
const { add, sub, mul } = (await WebAssembly.instantiate(Uint8Array.from(
  atob(
    "AGFzbQEAAAABBwFgAn9/AX8DBAMAAAAHEwMDYWRkAAADc3ViAAEDbXVsAAIKPwMXACAAIABBhwFqQfl+IABrIAFLGyABagsTACAAQYcBayAAIAAgAUkbIAFrCxEAIAGtIACtfkL5/v//D4KnCwAOBG5hbWUCBwMAAAEAAgA=",
  ),
  (c) => c.charCodeAt(0),
))).instance.exports as {
  add(a: number, b: number): number;
  sub(a: number, b: number): number;
  mul(a: number, b: number): number;
};

export class Complex {
  r: number;
  i: number;
  c: number;

  constructor(r: Complex);
  constructor(r: number, i: number, c: number);
  constructor(r: number | Complex, i?: number, c?: number) {
    if (typeof r === "number") {
      this.r = r;
      this.i = i!;
      this.c = c!;
    } else {
      this.r = r.r;
      this.i = r.i;
      this.c = r.c;
    }
  }

  neg(): Complex {
    return new Complex(0 - this.r, 0 - this.i, sub(0, this.c));
  }

  add(r: Readonly<Complex>): Complex {
    return new Complex(this.r + r.r, this.i + r.i, add(this.c, r.c));
  }
  sub(r: Readonly<Complex>): Complex {
    return new Complex(this.r - r.r, this.i - r.i, sub(this.c, r.c));
  }
  mul(r: Readonly<Complex>): Complex {
    return new Complex(
      this.r * r.r - this.i * r.i,
      this.r * r.i + this.i * r.r,
      mul(this.c, r.c),
    );
  }

  chneg() {
    this.r *= -1;
    this.i *= -1;
    this.c = sub(0, this.c);
  }

  chadd(r: Readonly<Complex>) {
    this.r += r.r;
    this.i += r.i;
    this.c = add(this.c, r.c);
  }
  chsub(r: Readonly<Complex>) {
    this.r -= r.r;
    this.i -= r.i;
    this.c = sub(this.c, r.c);
  }
  chmul(r: Readonly<Complex>) {
    const tmp = this.r * r.r - this.i * r.i;
    this.i = this.r * r.i + this.i * r.r;
    this.r = tmp;
    this.c = mul(this.c, r.c);
  }

  norm(): number {
    return this.r ** 2 + this.i ** 2;
  }

  eq(r: Readonly<Complex>): boolean {
    return this.c === r.c;
  }
}
