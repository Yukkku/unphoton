/** @file 六角形を楽に扱うための関数集 */

/** (`x`, `y`)が中心で半径`r`の円に内接する正六角形のPath2D */
export const path = (x: number, y: number, r: number): Path2D => {
  const rcos30 = r * 0.8660254037844386;
  const rsin30 = r / 2;
  const p = new Path2D();
  p.moveTo(x, y - r);
  p.lineTo(x + rcos30, y - rsin30);
  p.lineTo(x + rcos30, y + rsin30);
  p.lineTo(x, y + r);
  p.lineTo(x - rcos30, y + rsin30);
  p.lineTo(x - rcos30, y - rsin30);
  p.closePath();
  return p;
};

/** 当たり判定 */
export const isTouching = (
  dx: number,
  dy: number,
  r: number,
): boolean => {
  const rcos30 = r * 0.8660254037844386;
  if (dx < 0) dx *= -1;
  if (dy < 0) dy *= -1;
  if (rcos30 < dx) return false;
  const rsin30 = r / 2;
  return (dy - r) * rcos30 + dx * rsin30 <= 0;
};
