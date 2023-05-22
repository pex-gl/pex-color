import { setAlpha } from "./utils.js";

/**
 * Updates a color based on r, g, b, a values.
 * @param {import("./color.js").color} color
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromRGB(color, r, g, b, a) {
  color[0] = r;
  color[1] = g;
  color[2] = b;
  setAlpha(color, a);
  return color;
}

/**
 * Returns a copy of a RGB color.
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {import("./color.js").color}
 */
export function toRGB([r, g, b, a], out = []) {
  out[0] = r;
  out[1] = g;
  out[2] = b;
  return setAlpha(out, a);
}
