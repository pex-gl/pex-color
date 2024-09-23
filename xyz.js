import {
  xyzD50ToLinear,
  xyzD65ToLinear,
  linearToXyzD50,
  linearToXyzD65,
  linearToRgb,
  rgbToLinear,
  setAlpha,
} from "./utils.js";

/**
 * @typedef {number[]} xyz CIE XYZ.
 *
 * Components range: 0 <= x <= 0.95; 0 <= y <= 1; 0 <= z <= 1.08;
 * @see {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 */

/**
 * Updates a color based on XYZ values and alpha using D50 standard illuminant.
 * @alias module:pex-color.fromXYZD50
 * @param {import("./color.js").color} color
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} a
 * @returns {import("./color.js").color}
 */
export function fromXYZD50(color, x, y, z, a) {
  xyzD50ToLinear(x, y, z, color);
  linearToRgb(color[0], color[1], color[2], color);
  return setAlpha(color, a);
}

/**
 * Returns a XYZ representation of a given color using D50 standard illuminant.
 * @alias module:pex-color.toXYZD50
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {xyz}
 */
export function toXYZD50([r, g, b, a], out = []) {
  rgbToLinear(r, g, b, out);
  linearToXyzD50(out[0], out[1], out[2], out);
  return setAlpha(out, a);
}

/**
 * Updates a color based on XYZ values and alpha using D65 standard illuminant.
 * @alias module:pex-color.fromXYZD65
 * @param {import("./color.js").color} color
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} a
 * @returns {import("./color.js").color}
 */
export function fromXYZD65(color, x, y, z, a) {
  xyzD65ToLinear(x, y, z, color);
  linearToRgb(color[0], color[1], color[2], color);
  return setAlpha(color, a);
}

/**
 * Returns a XYZ representation of a given color using D65 standard illuminant.
 * @alias module:pex-color.toXYZD65
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {xyz}
 */
export function toXYZD65([r, g, b, a], out = []) {
  rgbToLinear(r, g, b, out);
  linearToXyzD65(out[0], out[1], out[2], out);
  return setAlpha(out, a);
}
