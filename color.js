import { setAlpha } from "./utils.js";
/**
 * @typedef {number[]} color An array of 3 (RGB) or 4 (A) values.
 *
 * All components in the range 0 <= x <= 1
 */

/**
 * Creates a new color from linear values.
 * @alias module:pex-color.create
 * @param {number} [r=0]
 * @param {number} [g=0]
 * @param {number} [b=0]
 * @param {number} [a]
 * @returns {color}
 */
export function create(r = 0, g = 0, b = 0, a = 1) {
  return [r, g, b, a];
}

/**
 * Returns a copy of a color.
 * @alias module:pex-color.copy
 * @param {color} color
 * @returns {color}
 */
export function copy(color) {
  return color.slice();
}

/**
 * Sets a color to another color.
 * @alias module:pex-color.set
 * @param {color} color
 * @param {color} color2
 * @returns {color}
 */
export function set(color, color2) {
  color[0] = color2[0];
  color[1] = color2[1];
  color[2] = color2[2];
  return setAlpha(color, color2[3]);
}

/**
 * Updates a color based on r, g, b, [a] values.
 * @alias module:pex-color.fromValues
 * @param {import("./color.js").color} color
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromValues(color, r, g, b, a) {
  color[0] = r;
  color[1] = g;
  color[2] = b;
  return setAlpha(color, a);
}

/**
 * @deprecated Use "fromValues()".
 * @ignore
 */
export function fromRGB(color, r, g, b, a) {
  console.error(`"fromRGB()" deprecated. Use "fromValues()".`);
  return fromValues(color, r, g, b, a);
}

/**
 * @deprecated Use "set()".
 * @ignore
 */
export function toRGB(color, out = []) {
  console.error(`"toRGB()" deprecated. Use "set()".`);
  return set(out, color);
}
