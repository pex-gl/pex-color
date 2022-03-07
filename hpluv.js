import { fromLCHuv, getLCHuv } from "./lchuv.js";
import { getBounds, setAlpha } from "./utils.js";

/**
 * @typedef {number[]} hpluv CIELUV hue, saturation, lightness. All components in the range 0 <= x <= 1.
 * Components range: 0 <= h <= 360; 0 <= s <= 100; 0 <= l <= 100;
 */

const distanceLineFromOrigin = ({ intercept, slope }) =>
  Math.abs(intercept) / Math.sqrt(slope ** 2 + 1);

const maxSafeChromaForL = (L) => {
  const bounds = getBounds(L);
  let min = Infinity;
  let _g = 0;
  while (_g < bounds.length) {
    const bound = bounds[_g];
    ++_g;
    const length = distanceLineFromOrigin(bound);
    min = Math.min(min, length);
  }
  return min;
};

const hpluvToLch = ([H, S, L]) => {
  if (L > 99.9999999) return [100, 0, H];
  if (L < 0.00000001) return [0, 0, H];
  return [L, (maxSafeChromaForL(L) / 100) * S, H];
};

const lchToHpluv = ([L, C, H]) => {
  if (L > 99.9999999) return [H, 0, 100];
  if (L < 0.00000001) return [H, 0, 0];
  return [H, (C / maxSafeChromaForL(L)) * 100, L];
};

/**
 * Updates a color based on HPLuv values and alpha.
 * @param {color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a]
 * @return {color}
 */
export function fromHPLuv(color, h, s, l, a) {
  return fromLCHuv(color, ...hpluvToLch([h, s, l]), a);
}

/**
 * Returns a HPLuv representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {hpluv}
 */
export function getHPLuv([r, g, b, a], out = []) {
  [out[0], out[1], out[2]] = lchToHpluv(getLCHuv([r, g, b]));
  return setAlpha(out, a);
}
