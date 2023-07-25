import {
  linearToSrgb,
  srgbToLinear,
  setAlpha,
  oklabToLinearSrgb,
} from "./utils.js";

/**
 * @typedef {number[]} oklab Cartesian form using D65 standard illuminant.
 *
 * Components range: 0 <= l <= 1; -0.233 <= a <= 0.276; -0.311 <= b <= 0.198;
 * @see {@link https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab}
 */

/**
 * @private
 */
export function linearSrgbToOklab(color, lr, lg, lb) {
  const l = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  );
  const m = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  );
  const s = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
  );

  color[0] = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  color[1] = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  color[2] = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  return color;
}

/**
 * Updates a color based on Oklab values and alpha.
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
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {oklab}
 */
export function toOklab([r, g, b, a], out = []) {
  linearSrgbToOklab(out, srgbToLinear(r), srgbToLinear(g), srgbToLinear(b));

  return setAlpha(out, a);
}
