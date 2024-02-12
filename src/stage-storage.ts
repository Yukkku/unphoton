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
  [ // 3
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
  [ // 4
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
