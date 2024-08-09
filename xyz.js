import {
  linearToSrgb,
  srgbToLinear,
  setAlpha,
  mXYZToLinearsRGBD50,
  mLinearsRGBToXYZD50,
  mXYZToLinearsRGBD65,
  mLinearsRGBToXYZD65,
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
  const r =
    x * mXYZToLinearsRGBD50[0][0] -
    y * mXYZToLinearsRGBD50[0][1] -
    z * mXYZToLinearsRGBD50[0][2];
  const g =
    x * mXYZToLinearsRGBD50[1][0] +
    y * mXYZToLinearsRGBD50[1][1] +
    z * mXYZToLinearsRGBD50[1][2];
  const b =
    x * mXYZToLinearsRGBD50[2][0] -
    y * mXYZToLinearsRGBD50[2][1] +
    z * mXYZToLinearsRGBD50[2][2];

  color[0] = linearToSrgb(r);
  color[1] = linearToSrgb(g);
  color[2] = linearToSrgb(b);

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
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  out[0] =
    lr * mLinearsRGBToXYZD50[0][0] +
    lg * mLinearsRGBToXYZD50[0][1] +
    lb * mLinearsRGBToXYZD50[0][2];
  out[1] =
    lr * mLinearsRGBToXYZD50[1][0] +
    lg * mLinearsRGBToXYZD50[1][1] +
    lb * mLinearsRGBToXYZD50[1][2];
  out[2] =
    lr * mLinearsRGBToXYZD50[2][0] +
    lg * mLinearsRGBToXYZD50[2][1] +
    lb * mLinearsRGBToXYZD50[2][2];
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
  const r =
    x * mXYZToLinearsRGBD65[0][0] +
    y * mXYZToLinearsRGBD65[0][1] +
    z * mXYZToLinearsRGBD65[0][2];
  const g =
    x * mXYZToLinearsRGBD65[1][0] +
    y * mXYZToLinearsRGBD65[1][1] +
    z * mXYZToLinearsRGBD65[1][2];
  const b =
    x * mXYZToLinearsRGBD65[2][0] +
    y * mXYZToLinearsRGBD65[2][1] +
    z * mXYZToLinearsRGBD65[2][2];

  color[0] = linearToSrgb(r);
  color[1] = linearToSrgb(g);
  color[2] = linearToSrgb(b);

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
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  out[0] =
    lr * mLinearsRGBToXYZD65[0][0] +
    lg * mLinearsRGBToXYZD65[0][1] +
    lb * mLinearsRGBToXYZD65[0][2];
  out[1] =
    lr * mLinearsRGBToXYZD65[1][0] +
    lg * mLinearsRGBToXYZD65[1][1] +
    lb * mLinearsRGBToXYZD65[1][2];
  out[2] =
    lr * mLinearsRGBToXYZD65[2][0] +
    lg * mLinearsRGBToXYZD65[2][1] +
    lb * mLinearsRGBToXYZD65[2][2];
  return setAlpha(out, a);
}
