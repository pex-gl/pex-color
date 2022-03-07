import { getXYZ, fromXYZ } from "./xyz.js";
import { luvToXyz, lchToLuv, luvToLch, xyzToLuv, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} lchuv CIELChuv Luminance Chroma Hue. All components in the range 0 <= x <= 1
 * Components range: 0 <= l <= 100; 0 <= c <= 100; 0 <= h <= 360;
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
  return fromXYZ(
    color,
    ...luvToXyz(lchToLuv([l, c, h])).map((n) => n * 100),
    a
  );
}

/**
 * Returns a LCHuv representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {lchuv}
 */
export function getLCHuv([r, g, b, a], out = []) {
  [out[0], out[1], out[2]] = luvToLch(
    xyzToLuv(getXYZ([r, g, b]).map((n) => n / 100))
  );
  return setAlpha(out, a);
}
