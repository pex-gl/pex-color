import { fromLCHuv, toLCHuv } from "./lchuv.js";
import { getBounds, setAlpha, L_EPSILON } from "./utils.js";

/**
 * @typedef {number[]} hpluv CIELUV hue, saturation, lightness.
 *
 * All components in the range 0 <= x <= 1.
 */

const distanceLineFromOrigin = ({ intercept, slope }) =>
  Math.abs(intercept) / Math.sqrt(slope ** 2 + 1);

const maxSafeChromaForL = (L) => {
  const bounds = getBounds(L * 100);
  let min = Infinity;
  let _g = 0;
  while (_g < bounds.length) {
    const bound = bounds[_g];
    ++_g;
    const length = distanceLineFromOrigin(bound);
    min = Math.min(min, length);
  }
  return min / 100;
};

const hpluvToLch = ([H, S, L]) => {
  if (L > 1 - L_EPSILON) return [1, 0, H];
  if (L < L_EPSILON) return [0, 0, H];
  return [L, maxSafeChromaForL(L) * S, H];
};

const lchToHpluv = ([L, C, H]) => {
  if (L > 1 - L_EPSILON) return [H, 0, 1];
  if (L < L_EPSILON) return [H, 0, 0];
  return [H, C / maxSafeChromaForL(L), L];
};

/**
 * Updates a color based on HPLuv values and alpha.
 * @param {import("./color.js").color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromHPLuv(color, h, s, l, a) {
  return fromLCHuv(color, ...hpluvToLch([h, s, l]), a);
}

/**
 * Returns a HPLuv representation of a given color.
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {hpluv}
 */
export function toHPLuv([r, g, b, a], out = []) {
  [out[0], out[1], out[2]] = lchToHpluv(toLCHuv([r, g, b]));
  return setAlpha(out, a);
}
