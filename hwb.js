import { fromHSL, toHSL } from "./hsl.js";
import { setAlpha } from "./utils.js";

/**
 * @typedef {number[]} hwb hue, whiteness, blackness.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://en.wikipedia.org/wiki/HWB_color_model}
 */

/**
 * Updates a color based on HWB values and alpha.
 * @param {color} color
 * @param {number} h
 * @param {number} w
 * @param {number} b
 * @param {number} [a]
 * @return {color}
 */
export function fromHWB(color, h, w, b, a) {
  if (w + b >= 1) {
    color[0] = color[1] = color[2] = w / (w + b);
  } else {
    fromHSL(color, h, 1, 0.5);
    for (let i = 0; i < 3; i++) {
      color[i] *= 1 - w - b;
      color[i] += w;
    }
  }

  return setAlpha(color, a);
}

/**
 * Returns a HWB representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {hwb}
 */
export function toHWB(color, out = []) {
  toHSL(color, out);
  out[1] = Math.min(color[0], color[1], color[2]);
  out[2] = 1 - Math.max(color[0], color[1], color[2]);
  return setAlpha(out, color[3]);
}
