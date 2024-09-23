import { fromXYZD65, toXYZD65 } from "./xyz.js";

import {
  rgbToLinear,
  linearToRgb,
  linearP3ToXyzD65,
  xyzD65ToLinearP3,
} from "./utils.js";

/**
 * @typedef {number[]} p3 r, g, b values (DCI-P3 color gamut, D65 whitepoint, sRGB gamma curve).
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://drafts.csswg.org/css-color/#color-conversion-code}
 */

/**
 * Updates a color based on P3 values and alpha using D65 standard illuminant.
 * @alias module:pex-color.fromP3
 * @param {import("./color.js").color} color
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 * @returns {import("./color.js").color}
 */
export function fromP3(color, r, g, b, a) {
  rgbToLinear(r, g, b, color);
  linearP3ToXyzD65(color[0], color[1], color[2], color);
  return fromXYZD65(color, color[0], color[1], color[2], a);
}

/**
 * Returns a P3 representation of a given color using D65 standard illuminant.
 * @alias module:pex-color.toP3
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {p3}
 */
export function toP3(color, out = []) {
  toXYZD65(color, out);
  xyzD65ToLinearP3(out[0], out[1], out[2], out);
  return linearToRgb(out[0], out[1], out[2], out);
}
