import { fromLabD50, toLabD50 } from "./lab.js";
import { LCHToLab, labToLCH } from "./utils.js";

/**
 * @typedef {number[]} lch CIELCh Luminance Chroma Hue. Cylindrical form of Lab.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_model}
 */

/**
 * Updates a color based on LCH values and alpha.
 * @alias module:pex-color.fromLCH
 * @param {import("./color.js").color} color
 * @param {number} l
 * @param {number} c
 * @param {number} h
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromLCH(color, l, c, h, a) {
  LCHToLab(l, c, h, color);
  return fromLabD50(color, color[0], color[1], color[2], a);
}

/**
 * Returns a LCH representation of a given color.
 * @alias module:pex-color.toLCH
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {lch}
 */
export function toLCH(color, out = []) {
  toLabD50(color, out);
  return labToLCH(out[0], out[1], out[2], out);
}
