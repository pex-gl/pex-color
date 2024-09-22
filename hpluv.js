import { fromLCHuv, toLCHuv } from "./lchuv.js";
import { hpluvToLch, lchToHpluv } from "./utils.js";

/**
 * @typedef {number[]} hpluv CIELUV hue, saturation, lightness.
 *
 * All components in the range 0 <= x <= 1.
 */

/**
 * Updates a color based on HPLuv values and alpha.
 * @alias module:pex-color.fromHPLuv
 * @param {import("./color.js").color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromHPLuv(color, h, s, l, a) {
  hpluvToLch(h, s, l, color);
  return fromLCHuv(color, color[0], color[1], color[2], a);
}

/**
 * Returns a HPLuv representation of a given color.
 * @alias module:pex-color.toHPLuv
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {hpluv}
 */
export function toHPLuv(color, out = []) {
  toLCHuv(color, out);
  return lchToHpluv(out[0], out[1], out[2], out);
}
