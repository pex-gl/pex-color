import { getXYZ, fromXYZ } from "./xyz.js";
import { setAlpha } from "./utils.js";

/**
 * @typedef {number[]} lab CIELAB with D65 standard illuminant. Components range: 0 <= l <= 100; -128 <= a <= 127; -128 <= b <= 127;
 * @see {@link https://en.wikipedia.org/wiki/CIELAB_color_space}
 */

/**
 * Illuminant D65: x,y,z tristimulus values
 * @private
 * @see {@link https://en.wikipedia.org/wiki/Illuminant_D65}
 */
export const D65 = [0.3127 / 0.329, 1, (1 - 0.3127 - 0.329) / 0.329];
export const D50 = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585];

function fromLabValueToXYZValue(val, white) {
  const pow = val ** 3;
  return (pow > 0.008856 ? pow : (val - 16 / 116) / 7.787037) * white;
}

function fromXYZValueToLabValue(val, white) {
  val /= white;
  return val > 0.008856 ? val ** (1 / 3) : 7.787037 * val + 16 / 116;
}

/**
 * Updates a color based on Lab values and alpha.
 * @param {color} color
 * @param {number} l
 * @param {number} a
 * @param {number} b
 * @param {number} α
 * @param {Array} illuminant
 * @return {color}
 */
export function fromLab(color, l, a, b, α, illuminant = D65) {
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  return fromXYZ(
    color,
    fromLabValueToXYZValue(x, illuminant[0]),
    fromLabValueToXYZValue(y, illuminant[1]),
    fromLabValueToXYZValue(z, illuminant[2]),
    α
  );
}

/**
 * Returns a Lab representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @param {Array} illuminant
 * @return {lab}
 */
export function getLab(color, out = [], illuminant = D65) {
  const xyz = getXYZ(color);

  const x = fromXYZValueToLabValue(xyz[0], illuminant[0]);
  const y = fromXYZValueToLabValue(xyz[1], illuminant[1]);
  const z = fromXYZValueToLabValue(xyz[2], illuminant[2]);

  out[0] = 116 * y - 16;
  out[1] = 500 * (x - y);
  out[2] = 200 * (y - z);

  return setAlpha(out, color[3]);
}
