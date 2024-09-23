import {
  linearToRgb,
  rgbToLinear,
  oklabToLinear,
  linearToOklab,
  setAlpha,
} from "./utils.js";

/**
 * @typedef {number[]} oklab Cartesian form using D65 standard illuminant.
 *
 * Components range: 0 <= l <= 1; -0.233 <= a <= 0.276; -0.311 <= b <= 0.198;
 * @see {@link https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab}
 */

/**
 * Updates a color based on Oklab values and alpha.
 * @alias module:pex-color.fromOklab
 * @param {import("./color.js").color} color
 * @param {number} L
 * @param {number} a
 * @param {number} b
 * @param {number} [α]
 * @returns {import("./color.js").color}
 */
export function fromOklab(color, L, a, b, α) {
  oklabToLinear(L, a, b, color);
  linearToRgb(color[0], color[1], color[2], color);
  return setAlpha(color, α);
}

/**
 * Returns an Oklab representation of a given color.
 * @alias module:pex-color.toOklab
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {oklab}
 */
export function toOklab([r, g, b, a], out = []) {
  rgbToLinear(r, g, b, out);
  linearToOklab(out[0], out[1], out[2], out);
  return setAlpha(out, a);
}
