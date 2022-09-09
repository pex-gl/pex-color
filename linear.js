import { fromLinear as from, toLinear as to, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} linear r g b linear values.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://en.wikipedia.org/wiki/SRGB}
 */

/**
 * Updates a color based on linear values.
 * @param {import("./color.js").color} color
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a]
 * @return {import("./color.js").color}
 */
export function fromLinear(color, r, g, b, a) {
  color[0] = from(r);
  color[1] = from(g);
  color[2] = from(b);
  return setAlpha(color, a);
}

/**
 * Returns a linear color representation of a given color.
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @return {linear}
 */
export function toLinear([r, g, b, a], out = []) {
  out[0] = to(r);
  out[1] = to(g);
  out[2] = to(b);
  return setAlpha(out, a);
}
