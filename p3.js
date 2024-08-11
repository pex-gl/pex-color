import { fromXYZD65, toXYZD65 } from "./xyz.js";

import { linearToSrgb, srgbToLinear } from "./utils.js";

/**
 * @typedef {number[]} p3 r, g, b values (DCI-P3 color gamut, D65 whitepoint, sRGB gamma curve).
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://drafts.csswg.org/css-color/#color-conversion-code}
 */

/**
 * @private
 * @see {@link http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html}
 * @see {@link https://drafts.csswg.org/css-color/#color-conversion-code}
 */
export const mLinearP3ToXYZD65 = [
  [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
  [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
  [0, 0.04511338185890264, 1.043944368900976],
];

/**
 * @private
 */
export const mXYZD65ToLinearP3 = [
  [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
  [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
  [0.03584583024378447, -0.07617238926804182, 0.9568845240076872],
];

/**
 * Updates a color based on P3 values and alpha using D65 standard illuminant.
 * @alias module:pex-color.fromP3
 * @param {import("./color.js").color} color
 * @param {number} r
 * @param {number} g
 * @param {number} g
 * @param {number} a
 * @returns {import("./color.js").color}
 */
export function fromP3(color, r, g, b, a) {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);

  const x =
    lr * mLinearP3ToXYZD65[0][0] +
    lg * mLinearP3ToXYZD65[0][1] +
    lb * mLinearP3ToXYZD65[0][2];
  const y =
    lr * mLinearP3ToXYZD65[1][0] +
    lg * mLinearP3ToXYZD65[1][1] +
    lb * mLinearP3ToXYZD65[1][2];
  const z =
    lr * mLinearP3ToXYZD65[2][0] +
    lg * mLinearP3ToXYZD65[2][1] +
    lb * mLinearP3ToXYZD65[2][2];

  return fromXYZD65(color, x, y, z, a);
}

/**
 * Returns a P3 representation of a given color using D65 standard illuminant.
 * @alias module:pex-color.toP3
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {p3}
 */
export function toP3(color, out = []) {
  const [x, y, z] = toXYZD65(color, out); // Sets alpha

  out[0] = linearToSrgb(
    x * mXYZD65ToLinearP3[0][0] +
      y * mXYZD65ToLinearP3[0][1] +
      z * mXYZD65ToLinearP3[0][2],
  );
  out[1] = linearToSrgb(
    x * mXYZD65ToLinearP3[1][0] +
      y * mXYZD65ToLinearP3[1][1] +
      z * mXYZD65ToLinearP3[1][2],
  );
  out[2] = linearToSrgb(
    x * mXYZD65ToLinearP3[2][0] +
      y * mXYZD65ToLinearP3[2][1] +
      z * mXYZD65ToLinearP3[2][2],
  );

  return out;
}
