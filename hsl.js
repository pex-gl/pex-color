import { create } from "./color.js";

/**
 * @typedef {number[]} hsl hue, saturation, lightness. All components in the range 0 <= x <= 1
 */

function hue2rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }
  if (t < 1 / 2) {
    return q;
  }
  if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  }
  return p;
}

/**
 * Creates a new color from HSL values and alpha.
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a=1]
 * @return {color}
 */
export function fromHSL(h, s, l, a) {
  return setHSL(create(), h, s, l, a);
}

/**
 * Updates a color based on HSL values and alpha.
 * @param {color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [a=1]
 * @return {color}
 */
export function setHSL(color, h, s, l, a = 1) {
  if (s === 0) {
    color[0] = color[1] = color[2] = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    color[0] = hue2rgb(p, q, h + 1 / 3);
    color[1] = hue2rgb(p, q, h);
    color[2] = hue2rgb(p, q, h - 1 / 3);
  }

  color[3] = a;
  return color;
}

/**
 * Returns a HSL representation of a given color.
 * @param {color} color
 * @return {hsl}
 */
export function getHSL([r, g, b, a = 1]) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h;
  let s;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

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

  return [h, s, l, a];
}
