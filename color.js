import { fromRGB } from "./rgb.js";

/**
 * @typedef {number[]} color All components in the range 0 <= x <= 1
 */

/**
 * Creates a new color from linear values.
 * @param {number} [r=0]
 * @param {number} [g=0]
 * @param {number} [b=0]
 * @param {number} [a]
 * @return {color}
 */
export function create(r = 0, g = 0, b = 0, a = 1) {
  return [r, g, b, a];
}

/**
 * Returns a copy of a color.
 * @param {color} color
 * @param {color} [out] Deprecated: use set(c, d)
 * @return {color}
 */
export function copy(color, out) {
  if (out) set(out, color); // For backward compatibility.
  return color.slice();
}

/**
 * Sets a color to another color.
 * @param {color} color
 * @param {color|number} color2
 * @param {number} [g] // Deprecated: use fromRGB(color, r, g, b, a)
 * @param {number} [b] // Deprecated: use fromRGB(color, r, g, b, a)
 * @param {number} [a] // Deprecated: use fromRGB(color, r, g, b, a)
 * @return {color}
 */
export function set(color, color2, g) {
  if (g !== undefined) return fromRGB(...arguments); // For backward compatibility.
  color[0] = color2[0];
  color[1] = color2[1];
  color[2] = color2[2];
  if (color2[3] !== undefined) color[3] = color2[3];
  return color;
}
