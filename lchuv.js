import { getXYZ, fromXYZ } from "./xyz.js";
import { luvToXyz, lchToLuv, luvToLch, xyzToLuv, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} lchuv CIELChuv Luminance Chroma Hue.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://en.wikipedia.org/wiki/CIELUV}
 */

/**
 * Updates a color based on LCHuv values and alpha.
 * @param {color} color
 * @param {number} l
 * @param {number} c
 * @param {number} h
 * @param {number} [a]
 * @return {color}
 */
export function fromLCHuv(color, l, c, h, a) {
  return fromXYZ(color, ...luvToXyz(lchToLuv([l, c, h])), a);
}

/**
 * Returns a LCHuv representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {lchuv}
 */
export function getLCHuv([r, g, b, a], out = []) {
  [out[0], out[1], out[2]] = luvToLch(xyzToLuv(getXYZ([r, g, b])));
  return setAlpha(out, a);
}
