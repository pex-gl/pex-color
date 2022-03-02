import { create } from "./color.js";
import { getXYZ, setXYZ } from "./xyz.js";

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
 * Creates a new color from Lab values and alpha.
 * @param {number} l
 * @param {number} a
 * @param {number} b
 * @param {number} α
 * @return {color}
 */
export function fromLab(l, a, b, α) {
  return setLab(create(), l, a, b, α);
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
export function setLab(color, l, a, b, α = 1) {
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  return setXYZ(
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
 * @return {lab}
 */
export function getLab(color) {
  const xyz = getXYZ(color);

  const x = fromXYZValueToLabValue(xyz[0], D65[0]);
  const y = fromXYZValueToLabValue(xyz[1], D65[1]);
  const z = fromXYZValueToLabValue(xyz[2], D65[2]);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z), color[3]];
}
