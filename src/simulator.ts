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

export type Func = [string[], Int32Array[]];

export const start = (s: Stage): Func => {
  assert(s.width < UPPER_WIDTH && s.height < UPPER_HEIGHT);

  let p = "";
  for (let i = 0; i < s.d.length; i++) {
    const l = s.d[i];
    for (let j = 0; j < l.length; j++) {
      const c = l[j];
      if (c[0] === CellType.Start) {
        p += String.fromCharCode((i * UPPER_WIDTH + j) * 6 + c[1]);
      }
    }
  }
  return [[p], [Int32Array.of(1)]];
};

export const next = ([x, p]: Func, s: Stage): Func | undefined => {
  assert(s.width < UPPER_WIDTH && s.height < UPPER_HEIGHT);

  const ss = new Map<string, [number, number, number][]>();
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
    const vl = [1];
    const vr = [1];
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
        case CellType.MovableMirror:
        case CellType.Mirror: {
          const d = (c[1] + 6 - r) % 6;
          if (r === d) return;
          vs[i][2] = d;
          break;
        }
        case CellType.MovableHalfMirror:
        case CellType.HalfMirror: {
          const d = (c[1] + 6 - r) % 6;
          if (r === d) return;
          const e: [number, number, number] = [x, y, d];
          const len = ky.length;
          for (let j = 0; j < len; j++) {
            ky.push(ky[j].with(i, e));
            vl.push(mul(vl[j], -18083855)); // (1 - i) / 2
            vr.push(mul(vr[j], 18083721)); // (1 + i) / 2
            vl[j] = mul(vl[j], 18083721); // (1 + i) / 2
            vr[j] = mul(vr[j], -18083855); // (1 - i) / 2
          }
          break;
        }
        case CellType.MovableZ:
          if (!c[1]) break;
          /* falls through */
        case CellType.Z: {
          for (let j = 0; j < vl.length; j++) {
            vl[j] = sub(0, vl[j]);
            vr[j] = sub(0, vr[j]);
          }
          break;
        }
        case CellType.MovableS:
          if (!c[1]) break;
          /* falls through */
        case CellType.S: {
          for (let j = 0; j < vl.length; j++) {
            vl[j] = mul(vl[j], 36167441); // i
            vr[j] = mul(vr[j], -36167576); // -i
          }
          break;
        }
        case CellType.MovableT:
          if (!c[1]) break;
          /* falls through */
        case CellType.T: {
          for (let j = 0; j < vl.length; j++) {
            vl[j] = mul(vl[j], -2123366712); // (1 + i) / sqrt(2)
            vr[j] = mul(vr[j], -452840752); // (1 - i) / sqrt(2)
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
      if (c) {
        vl[j] = sub(0, vl[j]);
        vr[j] = sub(0, vr[j]);
      }
      const s = key.join("");
      const v = ss.get(s);
      if (v) {
        v.push([i, vl[j], vr[j]]);
      } else {
        ss.set(s, [[i, vl[j], vr[j]]]);
      }
    }
  }
  const nx: string[] = [];
  const nv: [number, number, number][][] = [];
  for (const v of ss.entries()) {
    const w = v[1];
    let c = 0;
    for (let i = 0; i < w.length; i++) {
      let d = 0;
      for (let j = 0; j < w.length; j++) {
        d = add(d, mul(p[w[i][0]][w[j][0]], w[j][2]));
      }
      c = add(c, mul(w[i][1], d));
    }
    if (c !== 0) {
      nx.push(v[0]);
      nv.push(w);
    }
  }
  const np: Int32Array[] = [];
  for (let i = 0; i < nv.length; i++) {
    const a = nv[i];
    const g = new Int32Array(nv.length);
    for (let j = 0; j < nv.length; j++) {
      const b = nv[j];
      let c = 0;
      for (let x = 0; x < a.length; x++) {
        const pp = p[a[x][0]];
        let d = 0;
        for (let y = 0; y < b.length; y++) {
          d = add(d, mul(pp[b[y][0]], b[y][2]));
        }
        c = add(c, mul(a[x][1], d));
      }
      g[j] = c;
    }
    np.push(g);
  }
  console.log(nx, np);
  return [nx, np];
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
      if (c[0] !== CellType.Goal || c[1] !== r) return false;
    }
  }
  return true;
};
