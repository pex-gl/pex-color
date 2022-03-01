import { create } from "./color.js";
import { fromXYZ, getXYZ } from "./xyz.js";
import { luvToXyz, lchToLuv, luvToLch, xyzToLuv } from "./utils.js";

/**
 * @typedef {number[]} lchuv Components range: 0 <= l <= 100; 0 <= c <= 100; 0 <= h <= 360;
 */

/**
 * Creates a new color from LCHuv values and alpha.
 * @param {number} l
 * @param {number} c
 * @param {number} h
 * @param {number} [a=1]
 * @return {color}
 */
export function fromLCHuv(l, c, h, a) {
  return setLCHuv(create(), l, c, h, a);
}

/**
 * Updates a color based on LCHuv values and alpha.
 * @param {color} color
 * @param {number} l
 * @param {number} c
 * @param {number} h
 * @param {number} [a=1]
 * @return {color}
 */
export function setLCHuv(color, l, c, h, a = 1) {
  color = fromXYZ(...luvToXyz(lchToLuv([l, c, h])).map((n) => n * 100));
  color[3] = a;
  return color;
}

/**
 * Returns a LCHuv representation of a given color.
 * @param {color} color
 * @return {lchuv}
 */
export function getLCHuv([r, g, b, a = 1]) {
  const color = luvToLch(xyzToLuv(getXYZ([r, g, b]).map((n) => n / 100)));
  color[3] = a;
  return color;
}
