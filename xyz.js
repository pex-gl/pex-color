import { create } from "./color.js";
import { fromLinear, toLinear, m, minv } from "./utils.js";

/**
 * @typedef {number[]} xyz Components range: 0 <= x <= 95; 0 <= y <= 100; 0 <= z <= 108;
 */

/**
 * Creates a new color from XYZ values and alpha.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} a
 * @return {color}
 */
export function fromXYZ(x, y, z, a) {
  return setXYZ(create(), x, y, z, a);
}

/**
 * Updates a color based on XYZ values and alpha.
 * @param {color} color
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} a
 * @return {color}
 */
export function setXYZ(color, x, y, z, a = 1) {
  const r = x * m[0][0] + y * m[0][1] + z * m[0][2];
  const g = x * m[1][0] + y * m[1][1] + z * m[1][2];
  const b = x * m[2][0] + y * m[2][1] + z * m[2][2];

  color[0] = fromLinear(r / 100);
  color[1] = fromLinear(g / 100);
  color[2] = fromLinear(b / 100);
  color[3] = a;

  return color;
}

/**
 * Returns a XYZ representation of a given color.
 * @param {color} color
 * @return {color}
 */
export function getXYZ(color) {
  const r = toLinear(color[0]) * 100;
  const g = toLinear(color[1]) * 100;
  const b = toLinear(color[2]) * 100;

  return [
    r * minv[0][0] + g * minv[0][1] + b * minv[0][2],
    r * minv[1][0] + g * minv[1][1] + b * minv[1][2],
    r * minv[2][0] + g * minv[2][1] + b * minv[2][2],
    color[3] || 1,
  ];
}
