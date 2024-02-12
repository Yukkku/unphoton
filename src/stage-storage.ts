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
];
