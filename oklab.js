import {
  linearToSrgb,
  srgbToLinear,
  oklabToLinearSrgb,
  linearSrgbToOklab,
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
  oklabToLinearSrgb(color, L, a, b);
  color[0] = linearToSrgb(color[0]);
  color[1] = linearToSrgb(color[1]);
  color[2] = linearToSrgb(color[2]);

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
  linearSrgbToOklab(out, srgbToLinear(r), srgbToLinear(g), srgbToLinear(b));

  return setAlpha(out, a);
}
