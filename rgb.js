import { set } from "./color.js";
import { setAlpha } from "./utils.js";

/**
 * Updates a color based on linear r, g, b, a values.
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
 * Alias for {@link set}
 * @function
 */
export const toRGB = set;
