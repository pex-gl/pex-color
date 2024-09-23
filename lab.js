import { fromXYZD50, fromXYZD65, toXYZD50, toXYZD65 } from "./xyz.js";
import { D50, D65, labToXyz, xyzToLab } from "./utils.js";

/**
 * @typedef {number[]} lab CIELAB perceptual Lightness, a* red/green, b* blue/yellow.
 *
 * Components range (D65): 0 <= l <= 1; -0.86183 <= a <= 0.98234; -1.0786 <= b <= 0.94478;
 *
 * Components range (D50): 0 <= l <= 1; -0.79287 <= a <= 0.9355; -1.12029 <= b <= 0.93388;
 * @see {@link https://en.wikipedia.org/wiki/CIELAB_color_space}
 */

export function fromLab(
  color,
  l,
  a,
  b,
  α,
  { illuminant = D50, fromXYZ = fromXYZD50 } = {},
) {
  labToXyz(l, a, b, color, illuminant);
  return fromXYZ(color, color[0], color[1], color[2], α);
}

export function toLab(
  color,
  out = [],
  { illuminant = D50, toXYZ = toXYZD50 } = {},
) {
  toXYZ(color, out);
  return xyzToLab(out[0], out[1], out[2], out, illuminant);
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
