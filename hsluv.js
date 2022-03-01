import { create } from "./color.js";
import { setLCHuv, getLCHuv } from "./lchuv.js";
import { getBounds } from "./utils.js";

/**
 * @typedef {number[]} hsluv Components range: 0 <= h <= 360; 0 <= s <= 100; 0 <= l <= 100;
 */

const lengthOfRayUntilIntersect = (theta, { intercept, slope }) =>
  intercept / (Math.sin(theta) - slope * Math.cos(theta));

const maxChromaForLH = (L, H) => {
  const hrad = (H / 360) * Math.PI * 2;
  const bounds = getBounds(L);
  let min = Infinity;
  let _g = 0;
  while (_g < bounds.length) {
    const bound = bounds[_g];
    ++_g;
    const length = lengthOfRayUntilIntersect(hrad, bound);
    if (length >= 0) min = Math.min(min, length);
  }
  return min;
};

const hsluvToLch = ([H, S, L]) => {
  if (L > 99.9999999) return [100, 0, H];
  if (L < 0.00000001) return [0, 0, H];
  return [L, (maxChromaForLH(L, H) / 100) * S, H];
};

const lchToHsluv = ([L, C, H]) => {
  if (L > 99.9999999) return [H, 0, 100];
  if (L < 0.00000001) return [H, 0, 0];
  return [H, (C / maxChromaForLH(L, H)) * 100, L];
};

/**
 * Creates a new color from HSLuv values and alpha.
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a=1]
 * @return {color}
 */
export function fromHSLuv(h, s, l, a) {
  return setHSLuv(create(), h, s, l, a);
}

/**
 * Updates a color based on HSLuv values and alpha.
 * @param {color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a=1]
 * @return {color}
 */
export function setHSLuv(color, h, s, l, a = 1) {
  return setLCHuv(color, ...hsluvToLch([h, s, l]), a);
}

/**
 * Returns a HSLuv representation of a given color.
 * @param {color} color
 * @return {hsluv}
 */
export function getHSLuv([r, g, b, a = 1]) {
  const color = lchToHsluv(getLCHuv([r, g, b]));
  color[3] = a;
  return color;
}
