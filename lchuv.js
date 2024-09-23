import { fromXYZD65, toXYZD65 } from "./xyz.js";
import { lchToLuv, luvToXyz, xyzToLuv, luvToLch } from "./utils.js";

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
  lchToLuv(l, c, h, color);
  luvToXyz(color[0], color[1], color[2], color);
  return fromXYZD65(color, color[0], color[1], color[2], a);
}

/**
 * Returns a LCHuv representation of a given color.
 * @alias module:pex-color.toLCHuv
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {lchuv}
 */
export function toLCHuv(color, out = []) {
  toXYZD65(color, out);
  xyzToLuv(out[0], out[1], out[2], out);
  return luvToLch(out[0], out[1], out[2], out);
}
