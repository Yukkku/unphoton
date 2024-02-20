/** @file 量子論に基づいて動きを計算する. このリポジトリの核 */

import { Complex } from "./complex.ts";
import { CellType, Stage } from "./stage.ts";
import { assert } from "./util.ts";

/** ステージ横幅の上界 */
export const UPPER_WIDTH = 104;
/** ステージ縦幅の上界 */
export const UPPER_HEIGHT = 104;

export type Func = Map<string, Complex>;

/** 粒子の位置と向きを文字に変換する */
const pt2char = (x: number, y: number, d: number): string => {
  return String.fromCharCode((x * UPPER_WIDTH + y) * 6 + d);
};
/** 文字を粒子の位置と向きに変換する */
const char2pt = (c: string): [number, number, number] => {
  const p = c.charCodeAt(0);
  return [
    Math.floor(p / (6 * UPPER_WIDTH)),
    Math.floor(p / 6) % UPPER_WIDTH,
    p % 6,
  ];
};

/** 文字列を複数の粒子の位置と向きに変換する */
export const str2pts = (s: string): [number, number, number][] => {
  return Array.from(s, char2pt);
};

/** 文字列を複数の粒子の位置と向きに変換する */
export const pts2str = (pts: [number, number, number][]): string => {
  return pts.map((pt) => pt2char(pt[0], pt[1], pt[2])).join("");
};

/** 波動関数に状態を加える */
const funcAdd = (f: Func, pts: [number, number, number][], v: Complex) => {
  const s = pts2str(pts);
  let c = 0;
  for (let i = 0; i < s.length; i++) {
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] === s[j]) return;
      if (s[i] > s[j]) c ^= 1;
    }
  }
  const ss = s.split("").sort().join("");
  const l = f.get(ss);
  if (c === 0) {
    if (l) {
      l.chadd(v);
      if (l.c === 0) f.delete(ss);
    } else f.set(ss, v);
  } else {
    if (l) {
      l.chsub(v);
      if (l.c === 0) f.delete(ss);
    } else {
      f.set(ss, v.neg());
    }
  }
};

/** 向きを表す0-5と座標の変分の表 */
const DIRS = [
  [0, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, 0],
  [-1, 1],
] as const satisfies [number, number][];

const I = new Complex(0, 1, 36167441);
const TQ = new Complex(Math.SQRT1_2, Math.SQRT1_2, 2123366577);

const hp = new Complex(0.5, 0.5, 18083721);
const hm = new Complex(0.5, -0.5, 4276883441);

export const start = (s: Stage): Func => {
  assert(s.width < UPPER_WIDTH && s.height < UPPER_HEIGHT);

  let p = "";
  for (let i = 0; i < s.d.length; i++) {
    const l = s.d[i];
    for (let j = 0; j < l.length; j++) {
      const c = l[j];
      if (c[0] === CellType.Start) {
        p += pt2char(i, j, c[1]);
      }
    }
  }
  return new Map([[p, new Complex(1, 0, 1)]]);
};

export const next = (f: Readonly<Func>, s: Stage): Func | null => {
  const nf: Func = new Map();
  for (const [str, v] of f) {
    const pts = str2pts(str);
    for (const pt of pts) {
      pt[0] += DIRS[pt[2]][0];
      pt[1] += DIRS[pt[2]][1];
    }
    const gf: [[number, number, number][], Complex][] = [[pts, new Complex(v)]];
    for (const [i, [x, y, _d]] of pts.entries()) {
      const c = s.d[x]?.[y];
      if (c == null) return null;
      switch (c[0]) {
        case CellType.Plane:
        case CellType.Start:
        case CellType.Goal:
          break;
        case CellType.MovableMirror:
        case CellType.Mirror: {
          const d = (c[1] + 6 - pts[i][2]) % 6;
          if (pts[i][2] === d) return null;
          pts[i][2] = d;
          break;
        }
        case CellType.MovableHalfMirror:
        case CellType.HalfMirror: {
          const d = (c[1] + 6 - pts[i][2]) % 6;
          if (pts[i][2] === d) return null;
          const e: [number, number, number] = [pts[i][0], pts[i][1], d];
          const len = gf.length;
          for (let j = 0; j < len; j++) {
            gf.push([gf[j][0].with(i, e), gf[j][1].mul(hm)]);
            gf[j][1].chmul(hp);
          }
          break;
        }
        case CellType.MovableZ:
          if (!c[1]) break;
          /* falls through */
        case CellType.Z: {
          for (let j = 0; j < gf.length; j++) gf[j][1].chneg();
          break;
        }
        case CellType.MovableS:
          if (!c[1]) break;
          /* falls through */
        case CellType.S: {
          for (let j = 0; j < gf.length; j++) gf[j][1].chmul(I);
          break;
        }
        case CellType.MovableT:
          if (!c[1]) break;
          /* falls through */
        case CellType.T: {
          for (let j = 0; j < gf.length; j++) gf[j][1].chmul(TQ);
          break;
        }
        default:
          return null;
      }
    }
    for (const [pts, v] of gf) funcAdd(nf, pts, v);
  }
  return nf;
};

export const isAccepted = (f: Readonly<Func>, s: Stage): boolean => {
  for (const [str] of f) {
    for (const [x, y, d] of str2pts(str)) {
      const c = s.d[x][y];
      if (c[0] !== CellType.Goal || c[1] !== d) return false;
    }
  }
  return true;
};
