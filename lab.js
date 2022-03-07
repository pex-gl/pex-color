import { getXYZ, fromXYZ } from "./xyz.js";
import { setAlpha } from "./utils.js";

/**
 * @typedef {number[]} lab CIELAB with D65 standard illuminant. Components range: 0 <= l <= 100; -128 <= a <= 127; -128 <= b <= 127;
 */

/**
 * Illuminant D65: x,y,z tristimulus values
 * @private
 * @see {@link https://en.wikipedia.org/wiki/Illuminant_D65}
 */
const D65 = [95.047, 100, 108.883];

function fromLabValueToXYZValue(val, white) {
  const pow = val ** 3;
  return (pow > 0.008856 ? pow : (val - 16 / 116) / 7.787) * white;
}

function fromXYZValueToLabValue(val, white) {
  val /= white;
  return val > 0.008856 ? val ** (1 / 3) : 7.787 * val + 16 / 116;
}

/**
 * Updates a color based on Lab values and alpha.
 * @param {color} color
 * @param {number} l
 * @param {number} a
 * @param {number} b
 * @param {number} α
 * @return {color}
 */
export function fromLab(color, l, a, b, α) {
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  return fromXYZ(
    color,
    fromLabValueToXYZValue(x, D65[0]),
    fromLabValueToXYZValue(y, D65[1]),
    fromLabValueToXYZValue(z, D65[2]),
    α
  );
}

/**
 * Returns a Lab representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {lab}
 */
export function getLab(color, out = []) {
  const xyz = getXYZ(color);

  const x = fromXYZValueToLabValue(xyz[0], D65[0]);
  const y = fromXYZValueToLabValue(xyz[1], D65[1]);
  const z = fromXYZValueToLabValue(xyz[2], D65[2]);

  out[0] = 116 * y - 16;
  out[1] = 500 * (x - y);
  out[2] = 200 * (y - z);

  return setAlpha(out, color[3]);
}
