import { create } from "./color.js";

/**
 * Alias for {@link create}
 * @function
 */
export const fromRGB = create;

/**
 * Updates a color based on r, g, b, a component values.
 * @param {color} color
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a=1]
 * @return {color}
 */
export function setRGB(color, r, g, b, a = 1) {
  color[0] = r;
  color[1] = g;
  color[2] = b;
  color[3] = a;
  return color;
}
