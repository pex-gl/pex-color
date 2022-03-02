import { create } from "./color.js";

/**
 * @typedef {number[]} hsv hue, saturation, value. All components in the range 0 <= x <= 1
 */

/**
 * Creates a new color from HSV values and alpha.
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @param {number} [a=1]
 * @return {color}
 */
export function fromHSV(h, s, v, a) {
  return setHSV(create(), h, s, v, a);
}

/**
 * Updates a color based on HSV values and alpha.
 * @param {color} color
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @param {number} [a=1]
 * @return {color}
 */
export function setHSV(color, h, s, v, a = 1) {
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

  color[3] = a;
  return color;
}

/**
 * Returns a HSV representation of a given color.
 * @param {color} color
 * @return {hsv}
 */
export function getHSV([r, g, b, a = 1]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, v, a];
}
