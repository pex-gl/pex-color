import { linearToSrgb, srgbToLinear, setAlpha } from "./utils.js";

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
  color[0] = linearToSrgb(r);
  color[1] = linearToSrgb(g);
  color[2] = linearToSrgb(b);
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
  out[0] = srgbToLinear(r);
  out[1] = srgbToLinear(g);
  out[2] = srgbToLinear(b);
  return setAlpha(out, a);
}
