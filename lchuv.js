import { fromXYZD65, toXYZD65 } from "./xyz.js";
import { luvToXyz, lchToLuv, luvToLch, xyzToLuv, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} lchuv CIELChuv Luminance Chroma Hue.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://en.wikipedia.org/wiki/CIELUV}
 */

/**
 * Updates a color based on LCHuv values and alpha.
 * @alias module:pex-color.fromLCHuv
 * @param {import("./color.js").color} color
 * @param {number} l
 * @param {number} c
 * @param {number} h
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromLCHuv(color, l, c, h, a) {
  return fromXYZD65(color, ...luvToXyz(lchToLuv([l, c, h])), a);
}

/**
 * Returns a LCHuv representation of a given color.
 * @alias module:pex-color.toLCHuv
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {lchuv}
 */
export function toLCHuv([r, g, b, a], out = []) {
  [out[0], out[1], out[2]] = luvToLch(xyzToLuv(toXYZD65([r, g, b])));
  return setAlpha(out, a);
}
