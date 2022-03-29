import { setAlpha } from "./utils.js";

/**
 * @typedef {number[]} hsl hue, saturation, lightness.
 * @see {@link https://en.wikipedia.org/wiki/HSL_and_HSV}
 *
 * All components in the range 0 <= x <= 1
 */

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

/**
 * Updates a color based on HSL values and alpha.
 * @param {color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a]
 * @return {color}
 */
export function fromHSL(color, h, s, l, a) {
  if (s === 0) {
    color[0] = color[1] = color[2] = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    color[0] = hue2rgb(p, q, h + 1 / 3);
    color[1] = hue2rgb(p, q, h);
    color[2] = hue2rgb(p, q, h - 1 / 3);
  }

  return setAlpha(color, a);
}

/**
 * Returns a HSL representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {hsl}
 */
export function getHSL([r, g, b, a], out = []) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  out[2] = (max + min) / 2;

  if (max === min) {
    out[0] = out[1] = 0; // achromatic
  } else {
    const d = max - min;
    out[1] = out[2] > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        out[0] = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        out[0] = (b - r) / d + 2;
        break;
      case b:
        out[0] = (r - g) / d + 4;
        break;
    }

    out[0] /= 6;
  }

  return setAlpha(out, a);
}
