import { fromLCHuv, toLCHuv } from "./lchuv.js";
import { hpluvToLch, lchToHpluv, setAlpha } from "./utils.js";

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
  return fromLCHuv(color, ...hpluvToLch([h, s, l]), a);
}

/**
 * Returns a HPLuv representation of a given color.
 * @alias module:pex-color.toHPLuv
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {hpluv}
 */
export function toHPLuv([r, g, b, a], out = []) {
  [out[0], out[1], out[2]] = lchToHpluv(toLCHuv([r, g, b]));
  return setAlpha(out, a);
}
