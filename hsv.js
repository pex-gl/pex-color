import { setAlpha } from "./utils.js";

/**
 * @typedef {number[]} hsv hue, saturation, value. All components in the range 0 <= x <= 1
 */

/**
 * Updates a color based on HSV values and alpha.
 * @param {color} color
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @param {number} [a]
 * @return {color}
 */
export function fromHSV(color, h, s, v, a) {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      color[0] = v;
      color[1] = t;
      color[2] = p;
      break;
    case 1:
      color[0] = q;
      color[1] = v;
      color[2] = p;
      break;
    case 2:
      color[0] = p;
      color[1] = v;
      color[2] = t;
      break;
    case 3:
      color[0] = p;
      color[1] = q;
      color[2] = v;
      break;
    case 4:
      color[0] = t;
      color[1] = p;
      color[2] = v;
      break;
    case 5:
      color[0] = v;
      color[1] = p;
      color[2] = q;
      break;
  }

  return setAlpha(color, a);
}

/**
 * Returns a HSV representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {hsv}
 */
export function getHSV([r, g, b, a], out = []) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  out[2] = max;
  const d = max - min;
  out[1] = max === 0 ? 0 : d / max;

  if (max === min) {
    out[0] = 0; // achromatic
  } else {
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
