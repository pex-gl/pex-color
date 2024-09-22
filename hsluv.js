import { fromLCHuv, toLCHuv } from "./lchuv.js";
import { hsluvToLch, lchToHsluv, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} hsluv CIELUV hue, saturation, lightness.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://www.hsluv.org/}
 */

/**
 * Updates a color based on HSLuv values and alpha.
 * @alias module:pex-color.fromHSLuv
 * @param {import("./color.js").color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromHSLuv(color, h, s, l, a) {
  return fromLCHuv(color, ...hsluvToLch([h, s, l]), a);
}

/**
 * Returns a HSLuv representation of a given color.
 * @alias module:pex-color.toHSLuv
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {hsluv}
 */
export function toHSLuv([r, g, b, a], out = []) {
  [out[0], out[1], out[2]] = lchToHsluv(toLCHuv([r, g, b]));
  return setAlpha(out, a);
}
