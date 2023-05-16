import { linearToSrgb, srgbToLinear, m, minv, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} xyz CIE XYZ using D65 standard illuminant.
 *
 * Components range: 0 <= x <= 0.95; 0 <= y <= 1; 0 <= z <= 1.08;
 * @see {@link https://en.wikipedia.org/wiki/CIE_1931_color_space}
 */

/**
 * Updates a color based on XYZ values and alpha.
 * @param {import("./color.js").color} color
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} a
 * @returns {import("./color.js").color}
 */
export function fromXYZ(color, x, y, z, a) {
  const r = x * m[0][0] + y * m[0][1] + z * m[0][2];
  const g = x * m[1][0] + y * m[1][1] + z * m[1][2];
  const b = x * m[2][0] + y * m[2][1] + z * m[2][2];

  color[0] = linearToSrgb(r);
  color[1] = linearToSrgb(g);
  color[2] = linearToSrgb(b);

  return setAlpha(color, a);
}

/**
 * Returns a XYZ representation of a given color.
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {xyz}
 */
export function toXYZ([r, g, b, a], out = []) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  out[0] = lr * minv[0][0] + lg * minv[0][1] + lb * minv[0][2];
  out[1] = lr * minv[1][0] + lg * minv[1][1] + lb * minv[1][2];
  out[2] = lr * minv[2][0] + lg * minv[2][1] + lb * minv[2][2];
  return setAlpha(out, a);
}
