import { labToLCH, LCHToLab } from "./lch.js";
import { fromOklab, toOklab } from "./oklab.js";
import { TMP } from "./utils.js";

/**
 * @typedef {number[]} oklch Cylindrical form using D65 standard illuminant.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://drafts.csswg.org/css-color/#color-conversion-code}
 */

/**
 * Updates a color based on Oklch values and alpha.
 * @alias module:pex-color.fromOklch
 * @param {import("./color.js").color} color
 * @param {number} l
 * @param {number} c
 * @param {number} h
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromOklch(color, l, c, h, a) {
  LCHToLab(TMP, l, c, h);

  // Range is [0, 150]
  TMP[1] /= 1.5;
  TMP[2] /= 1.5;

  return fromOklab(color, ...TMP, a);
}

/**
 * Returns an Oklch representation of a given color.
 * @alias module:pex-color.toOklch
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {oklch}
 */
export function toOklch(color, out = []) {
  toOklab(color, out); // Sets alpha

  // Range is [0, 150]
  out[1] *= 1.5;
  out[2] *= 1.5;

  labToLCH(out, ...out);
  return out;
}
