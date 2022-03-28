import { fromLCHuv, getLCHuv } from "./lchuv.js";
import { getBounds, setAlpha, L_EPSILON } from "./utils.js";

/**
 * @typedef {number[]} hsluv CIELUV hue, saturation, lightness. All components in the range 0 <= x <= 1
 * @see {@link https://www.hsluv.org/}
 */

const lengthOfRayUntilIntersect = (theta, { intercept, slope }) =>
  intercept / (Math.sin(theta) - slope * Math.cos(theta));

const maxChromaForLH = (L, H) => {
  const hrad = H * Math.PI * 2;
  const bounds = getBounds(L * 100);
  let min = Infinity;
  let _g = 0;
  while (_g < bounds.length) {
    const bound = bounds[_g];
    ++_g;
    const length = lengthOfRayUntilIntersect(hrad, bound);
    if (length >= 0) min = Math.min(min, length);
  }
  return min / 100;
};

const hsluvToLch = ([H, S, L]) => {
  if (L > 1 - L_EPSILON) return [1, 0, H];
  if (L < L_EPSILON) return [0, 0, H];
  return [L, maxChromaForLH(L, H) * S, H];
};

const lchToHsluv = ([L, C, H]) => {
  if (L > 1 - L_EPSILON) return [H, 0, 1];
  if (L < L_EPSILON) return [H, 0, 0];
  return [H, C / maxChromaForLH(L, H), L];
};

/**
 * Updates a color based on HSLuv values and alpha.
 * @param {color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a]
 * @return {color}
 */
export function fromHSLuv(color, h, s, l, a) {
  return fromLCHuv(color, ...hsluvToLch([h, s, l]), a);
}

/**
 * Returns a HSLuv representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {hsluv}
 */
export function getHSLuv([r, g, b, a], out = []) {
  [out[0], out[1], out[2]] = lchToHsluv(getLCHuv([r, g, b]));
  return setAlpha(out, a);
}
