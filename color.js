import { fromRGB } from "./rgb.js";

/**
 * @typedef {number[]} color An array of 3 (RGB) or 4 (A) values.
 *
 * All components in the range 0 <= x <= 1
 */

/**
 * Creates a new color from linear values.
 * @param {number} [r=0]
 * @param {number} [g=0]
 * @param {number} [b=0]
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function create(r = 0, g = 0, b = 0, a = 1) {
  return [r, g, b, a];
}

/**
 * Returns a copy of a color.
 * @param {import("./color.js").color} color
 * @param {import("./color.js").color} [out] Deprecated: use set(c, d)
 * @returns {import("./color.js").color}
 */
export function copy(color, out) {
  if (out) set(out, color); // For backward compatibility.
  return color.slice();
}

/**
 * Sets a color to another color.
 * @param {import("./color.js").color} color
 * @param {color|number} color2
 * @param {number} [g] // Deprecated: use fromRGB(color, r, g, b, a)
 * @param {number} [b] // Deprecated: use fromRGB(color, r, g, b, a)
 * @param {number} [a] // Deprecated: use fromRGB(color, r, g, b, a)
 * @returns {import("./color.js").color}
 */
export function set(color, color2, g) {
  if (g !== undefined) return fromRGB(...arguments); // For backward compatibility.
  color[0] = color2[0];
  color[1] = color2[1];
  color[2] = color2[2];
  if (color2[3] !== undefined) color[3] = color2[3];
  return color;
}
