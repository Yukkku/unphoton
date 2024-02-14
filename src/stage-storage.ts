import { Cell, CellType } from "./stage.ts";

export const stages: Cell[][][] = [
  [ // 1
    [
      [CellType.Start, 0],
      [CellType.Plane],
      [CellType.Plane],
      [CellType.Mirror, 2],
    ],
    [
      [CellType.None],
      [CellType.None],
      [CellType.Plane],
    ],
    [
      [CellType.None],
      [CellType.MovableMirror, 5],
      [CellType.Plane],
      [CellType.Plane],
      [CellType.Goal, 0],
    ],
  ],
  [ // 2
    [
      [CellType.None],
      [CellType.None],
      [CellType.MovableMirror, 1],
      [CellType.Plane],
      [CellType.MovableMirror, 3],
    ],
    [
      [CellType.None],
      [CellType.None],
      [CellType.Plane],
      [CellType.Plane],
    ],
    [
      [CellType.None],
      [CellType.None],
      [CellType.Goal, 3],
      [CellType.Plane],
      [CellType.MovableMirror, 5],
    ],
    [
      [CellType.None],
      [CellType.Plane],
      [CellType.Plane],
      [CellType.Plane],
    ],
    [
      [CellType.Start, 5],
      [CellType.None],
      [CellType.MovableMirror, 4],
    ],
  ],
  [ // 3
    [
      [CellType.None],
      [CellType.None],
      [CellType.None],
      [CellType.Mirror, 0],
    ],
    [
      [CellType.None],
      [CellType.Mirror, 4],
      [CellType.MovableMirror, 5],
      [CellType.Mirror, 1],
      [CellType.Mirror, 2],
    ],
    [
      [CellType.None],
      [CellType.Start, 4],
      [CellType.Mirror, 0],
      [CellType.Goal, 4],
    ],
    [
      [CellType.Mirror, 2],
      [CellType.Mirror, 1],
      [CellType.Mirror, 5],
      [CellType.Mirror, 4],
    ],
    [
      [CellType.None],
      [CellType.Mirror, 0],
    ],
  ],
  [ // 4
    [
      [CellType.Start, 1],
      [CellType.None],
      [CellType.Goal, 5],
    ],
    [
      [CellType.Plane],
      [CellType.Plane],
    ],
    [
      [CellType.MovableHalfMirror, 3],
    ],
    [
      [CellType.Plane],
    ],
    [
      [CellType.Goal, 1],
    ],
  ],
  [ // 5
    [
      [CellType.Start, 0],
      [CellType.Goal, 3],
      [CellType.MovableHalfMirror, 2],
      [CellType.Plane],
      [CellType.Mirror, 2],
    ],
    [
      [CellType.None],
      [CellType.None],
      [CellType.Plane],
      [CellType.Plane],
    ],
    [
      [CellType.None],
      [CellType.None],
      [CellType.Mirror, 0],
    ],
  ],
  [ // 6
    [
      [CellType.Start, 0],
      [CellType.Plane],
      [CellType.HalfMirror, 2],
      [CellType.Plane],
      [CellType.Mirror, 2],
    ],
    [
      [CellType.None],
      [CellType.Plane],
      [CellType.None],
      [CellType.Plane],
    ],
    [
      [CellType.MovableMirror, 0],
      [CellType.Plane],
      [CellType.MovableHalfMirror, 3],
      [CellType.Plane],
      [CellType.Goal, 0],
    ],
  ],
  [ // 7
    [
      [CellType.Start, 0],
      [CellType.Plane],
      [CellType.HalfMirror, 2],
      [CellType.MovableZ, false],
      [CellType.Mirror, 2],
    ],
    [
      [CellType.None],
      [CellType.Plane],
      [CellType.None],
      [CellType.Plane],
    ],
    [
      [CellType.Mirror, 2],
      [CellType.Z],
      [CellType.HalfMirror, 2],
      [CellType.Plane],
      [CellType.Goal, 0],
    ],
  ],
  [ // 8
    [
      [CellType.None],
      [CellType.None],
      [CellType.Start, 1],
      [CellType.None],
      [CellType.Mirror, 0],
      [CellType.None],
      [CellType.Mirror, 1],
    ],
    [
      [CellType.None],
      [CellType.None],
      [CellType.Plane],
      [CellType.MovableT, true],
      [CellType.Plane],
      [CellType.MovableT, true],
    ],
    [
      [CellType.None],
      [CellType.None],
      [CellType.HalfMirror, 0],
      [CellType.None],
      [CellType.HalfMirror, 0],
    ],
    [
      [CellType.None],
      [CellType.Plane],
      [CellType.MovableS, true],
      [CellType.Plane],
      [CellType.MovableS, true],
    ],
    [
      [CellType.Goal, 2],
      [CellType.None],
      [CellType.Mirror, 0],
      [CellType.None],
      [CellType.Mirror, 5],
    ],
  ],
];
