import { toXYZD50, fromXYZD50, fromXYZD65, toXYZD65 } from "./xyz.js";
import { setAlpha } from "./utils.js";

/**
 * @typedef {number[]} lab CIELAB perceptual Lightness, a* red/green, b* blue/yellow.
 *
 * Components range (D65): 0 <= l <= 1; -0.86183 <= a <= 0.98234; -1.0786 <= b <= 0.94478;
 *
 * Components range (D50): 0 <= l <= 1; -0.79287 <= a <= 0.9355; -1.12029 <= b <= 0.93388;
 * @see {@link https://en.wikipedia.org/wiki/CIELAB_color_space}
 */

/**
 * Illuminant D65: x,y,z tristimulus values
 * @private
 * @see {@link https://en.wikipedia.org/wiki/Illuminant_D65}
 */
export const D65 = [0.3127 / 0.329, 1, (1 - 0.3127 - 0.329) / 0.329];
export const D50 = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585];

// ε = 6^3 / 29^3 = 0.008856
// κ = 29^3 / 3^3 = 903.2962963
// 903.2962963 / 116 = 7.787037
function fromLabValueToXYZValue(val, white) {
  const pow = val ** 3;
  return (pow > 0.008856 ? pow : (val - 16 / 116) / 7.787037) * white;
}

function fromXYZValueToLabValue(val, white) {
  val /= white;
  return val > 0.008856 ? Math.cbrt(val) : 7.787037 * val + 16 / 116;
}

export function fromLab(
  color,
  l,
  a,
  b,
  α,
  { illuminant = D50, fromXYZ = fromXYZD50 } = {},
) {
  const y = (l + 0.16) / 1.16;

  return fromXYZ(
    color,
    fromLabValueToXYZValue(a / 5 + y, illuminant[0]),
    fromLabValueToXYZValue(y, illuminant[1]),
    fromLabValueToXYZValue(y - b / 2, illuminant[2]),
    α,
  );
}

export function toLab(
  color,
  out = [],
  { illuminant = D50, toXYZ = toXYZD50 } = {},
) {
  const xyz = toXYZ(color);

  const x = fromXYZValueToLabValue(xyz[0], illuminant[0]);
  const y = fromXYZValueToLabValue(xyz[1], illuminant[1]);
  const z = fromXYZValueToLabValue(xyz[2], illuminant[2]);

  out[0] = 1.16 * y - 0.16;
  out[1] = 5 * (x - y);
  out[2] = 2 * (y - z);

  return setAlpha(out, color[3]);
}

/**
 * Updates a color based on Lab values and alpha using D50 standard illuminant.
 * @alias module:pex-color.fromLabD50
 * @param {import("./color.js").color} color
 * @param {number} l
 * @param {number} a
 * @param {number} b
 * @param {number} α
 * @returns {import("./color.js").color}
 */
export function fromLabD50(color, l, a, b, α) {
  return fromLab(color, l, a, b, α, { illuminant: D50, fromXYZ: fromXYZD50 });
}
/**
 * Returns a Lab representation of a given color using D50 standard illuminant.
 * @alias module:pex-color.toLabD50
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {lab}
 */
export function toLabD50(color, out = []) {
  return toLab(color, out, { illuminant: D50, toXYZ: toXYZD50 });
}

/**
 * Updates a color based on Lab values and alpha using D65 standard illuminant.
 * @alias module:pex-color.fromLabD65
 * @param {import("./color.js").color} color
 * @param {number} l
 * @param {number} a
 * @param {number} b
 * @param {number} α
 * @returns {import("./color.js").color}
 */
export function fromLabD65(color, l, a, b, α) {
  return fromLab(color, l, a, b, α, { illuminant: D65, fromXYZ: fromXYZD65 });
}
/**
 * Returns a Lab representation of a given color using D65 standard illuminant.
 * @alias module:pex-color.toLabD65
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {lab}
 */
export function toLabD65(color, out = []) {
  return toLab(color, out, { illuminant: D65, toXYZ: toXYZD65 });
}
