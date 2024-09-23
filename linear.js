import { linearToRgb, rgbToLinear, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} linear r g b linear values.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://en.wikipedia.org/wiki/SRGB}
 */

/**
 * Updates a color based on linear values.
 * @alias module:pex-color.fromLinear
 * @param {import("./color.js").color} color
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromLinear(color, r, g, b, a) {
  linearToRgb(r, g, b, color);
  return setAlpha(color, a);
}

/**
 * Returns a linear color representation of a given color.
 * @alias module:pex-color.toLinear
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {linear}
 */
export function toLinear([r, g, b, a], out = []) {
  rgbToLinear(r, g, b, out);
  return setAlpha(out, a);
}
