import { CellType, Stage } from "./stage.ts";
import { assert } from "./util.ts";

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

/** ステージ横幅の上界 */
export const UPPER_WIDTH = 104;
/** ステージ縦幅の上界 */
export const UPPER_HEIGHT = 104;

const DIRS = [
  [0, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
] as const satisfies [number, number][];

export type Func = [string[], Int32Array[], Float64Array[]];

export const start = (s: Stage): Func => {
  assert(s.width < UPPER_WIDTH && s.height < UPPER_HEIGHT);

  let p = "";
  for (let i = 0; i < s.d.length; i++) {
    const l = s.d[i];
    for (let j = 0; j < l.length; j++) {
      const c = l[j];
      if (c[0] === CellType.Start) {
        p += String.fromCharCode((i * UPPER_WIDTH + j) * 6 + c[2]);
      }
    }
  }
  return [[p], [Int32Array.of(1)], [Float64Array.of(1)]];
};

export const next = ([x, p, q]: Func, s: Stage): Func | undefined => {
  assert(s.width < UPPER_WIDTH && s.height < UPPER_HEIGHT);

  const ss = new Map<string, [number, number, number, number, number][]>();
  for (let i = 0; i < x.length; i++) {
    const vs: [number, number, number][] = [];
    const sx = x[i];
    for (let j = 0; j < sx.length; j++) {
      const k = sx.charCodeAt(j);
      const r = k % 6;
      vs.push([
        (k / (6 * UPPER_WIDTH) >>> 0) + DIRS[r][0],
        (k / 6 % UPPER_WIDTH >>> 0) + DIRS[r][1],
        r,
      ]);
    }
    const ky = [vs];
    const vl = [1]; // mod素数
    const vr = [1]; // 共役のmod素数
    const vx = [1]; // 実部
    const vy = [0]; // 虚部
    for (let i = 0; i < vs.length; i++) {
      const x = vs[i][0];
      const y = vs[i][1];
      const r = vs[i][2];
      const c = s.d[x]?.[y];
      if (c == null) return;
      switch (c[0]) {
        case CellType.Plane:
        case CellType.Start:
        case CellType.Goal:
          break;
        case CellType.Mirror: {
          const d = (c[2] + 6 - r) % 6;
          if (r === d) return;
          vs[i][2] = d;
          break;
        }
        case CellType.HalfMirror: {
          const d = (c[2] + 6 - r) % 6;
          if (r === d) return;
          const e: [number, number, number] = [x, y, d];
          const len = ky.length;
          for (let j = 0; j < len; j++) {
            ky.push(ky[j].with(i, e));
            const n = (vx[j] + vy[j]) / 2;
            const m = (vx[j] - vy[j]) / 2;
            // (1 - i) / 2 を掛ける
            vl.push(mul(vl[j], -18083855));
            vr.push(mul(vr[j], 18083721));
            vx.push(n);
            vy.push(0 - m);
            // (1 + i) / 2 を掛ける
            vl[j] = mul(vl[j], 18083721);
            vr[j] = mul(vr[j], -18083855);
            vx[j] = m;
            vy[j] = n;
          }
          break;
        }
        case CellType.Z: {
          if (!c[2]) break;
          for (let j = 0; j < vl.length; j++) {
            // -1 を掛ける
            vl[j] = sub(0, vl[j]);
            vr[j] = sub(0, vr[j]);
            vx[j] *= -1;
            vy[j] *= -1;
          }
          break;
        }
        case CellType.S: {
          if (!c[2]) break;
          for (let j = 0; j < vl.length; j++) {
            // i を掛ける
            vl[j] = mul(vl[j], 36167441);
            vr[j] = mul(vr[j], -36167576);
            const tmp = vx[j];
            vx[j] = 0 - vy[j];
            vy[j] = tmp;
          }
          break;
        }
        case CellType.T: {
          if (!c[2]) break;
          for (let j = 0; j < vl.length; j++) {
            // (1 + i) / sqrt 2 を掛ける
            vl[j] = mul(vl[j], -2123366712);
            vr[j] = mul(vr[j], -452840752);
            const tmp = (vx[j] + vy[j]) * Math.SQRT1_2;
            vx[j] = (vx[j] - vy[j]) * Math.SQRT1_2;
            vy[j] = tmp;
          }
          break;
        }
        default:
          return;
      }
    }
    a: for (let j = 0; j < ky.length; j++) {
      const key = ky[j].map((x) =>
        String.fromCharCode((x[0] * UPPER_WIDTH + x[1]) * 6 + x[2])
      );
      let c = 0;
      for (let k = 0; k < key.length; k++) {
        for (let l = k + 1; l < key.length; l++) {
          if (key[k] === key[l]) break a;
          if (key[k] > key[l]) {
            const tmp = key[k];
            key[k] = key[l];
            key[l] = tmp;
            c ^= 1;
          }
        }
      }
      const t: [number, number, number, number, number] = c
        ? [i, sub(0, vl[j]), sub(0, vr[j]), 0 - vx[j], 0 - vy[j]]
        : [i, vl[j], vr[j], vx[j], vy[j]];
      const s = key.join("");
      const v = ss.get(s);
      if (v) {
        v.push(t);
      } else {
        ss.set(s, [t]);
      }
    }
  }
  const nx: string[] = [];
  const nv: [number, number, number, number, number][][] = [];
  for (const v of ss.entries()) {
    const w = v[1];
    let c = 0;
    for (let i = 0; i < w.length; i++) {
      const v = w[i][0];
      let d = 0;
      for (let j = 0; j < w.length; j++) {
        d = add(d, mul(p[v][w[j][0]], w[j][2]));
      }
      c = add(c, mul(w[i][1], d));
    }
    if (c !== 0) {
      nx.push(v[0]);
      nv.push(w);
    }
  }
  const np: Int32Array[] = [];
  const nq: Float64Array[] = [];
  for (let i = 0; i < nv.length; i++) {
    const a = nv[i];
    const g = new Int32Array(nv.length);
    const h = new Float64Array(nv.length);
    for (let j = 0; j < nv.length; j++) {
      const b = nv[j];
      let c = 0;
      let e = 0;
      for (let x = 0; x < a.length; x++) {
        const ax = a[x][0];
        const pp = p[ax];
        const pq = q[ax];
        let d = 0;
        let f = 0;
        let g = 0;
        for (let y = 0; y < b.length; y++) {
          const by = b[y][0];
          d = add(d, mul(pp[by], b[y][2]));
          f += pq[by] * b[y][3] - q[by][ax] * b[y][4];
          g += q[by][ax] * b[y][3] + pq[by] * b[y][4];
        }
        c = add(c, mul(a[x][1], d));
        e += f * a[x][3] + g * a[x][4];
      }
      g[j] = c;
      h[j] = e;
    }
    np.push(g);
    nq.push(h);
  }
  return [nx, np, nq];
};

export const isAccepted = ([x]: Readonly<Func>, s: Stage): boolean => {
  for (let i = 0; i < x.length; i++) {
    const sx = x[i];
    for (let j = 0; j < sx.length; j++) {
      const k = sx.charCodeAt(j);
      const x = k / (6 * UPPER_WIDTH) >>> 0;
      const y = k / 6 % UPPER_WIDTH >>> 0;
      const r = k % 6;
      const c = s.d[x][y];
      if (c[0] !== CellType.Goal || c[2] !== r) return false;
    }
  }
  return true;
};
