import { setRGB } from "./rgb.js";

/**
 * Creates a new color from component values.
 * @param {number} [r=0]
 * @param {number} [g=0]
 * @param {number} [b=0]
 * @param {number} [a=1]
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
 * @param {number} [g] // Deprecated: use setRGB(color, r, g, b, a)
 * @param {number} [b] // Deprecated: use setRGB(color, r, g, b, a)
 * @param {number} [a] // Deprecated: use setRGB(color, r, g, b, a)
 * @return {color}
 */
export function set(color, color2, g) {
  if (g) return setRGB(...arguments); // For backward compatibility.
  color[0] = color2[0];
  color[1] = color2[1];
  color[2] = color2[2];
  color[3] = color2[3] ?? 1;
  return color;
}
