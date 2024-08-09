import { fromLabD50, toLabD50 } from "./lab.js";
import { TAU, TMP } from "./utils.js";

/**
 * @typedef {number[]} lch CIELCh Luminance Chroma Hue. Cylindrical form of Lab.
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_model}
 */

/**
 * @private
 * @see {@link https://drafts.csswg.org/css-color/#lch-to-lab}
 */
export function LCHToLab(color, l, c, h) {
  color[0] = l;
  color[1] = c * Math.cos(h * TAU);
  color[2] = c * Math.sin(h * TAU);

  // Range is [0, 150]
  color[1] *= 1.5;
  color[2] *= 1.5;

  return color;
}

/**
 * @private
 * @see {@link https://drafts.csswg.org/css-color/#lab-to-lch}
 */
export function labToLCH(color, l, a, b) {
  color[0] = l;

  const ε = 250 / 100000 / 100; // Lab is -125, 125. TODO: will be different for Oklab

  // If is achromatic
  if (Math.abs(a) < ε && Math.abs(b) < ε) {
    color[1] = color[2] = 0;
  } else {
    const h = Math.atan2(b, a); // [-PI to PI]
    color[1] = Math.sqrt(a ** 2 + b ** 2); // TODO: c range is [0, 0.37]? How does that work
    color[2] = (h >= 0 ? h : h + TAU) / TAU; // [0 to 1)

    // Range is [0, 150]
    color[1] /= 1.5;
  }
  return color;
}

/**
 * Updates a color based on LCH values and alpha.
 * @alias module:pex-color.fromLCH
 * @param {import("./color.js").color} color
 * @param {number} l
 * @param {number} c
 * @param {number} h
 * @param {number} [a]
 * @returns {import("./color.js").color}
 */
export function fromLCH(color, l, c, h, a) {
  LCHToLab(TMP, l, c, h);
  return fromLabD50(color, ...TMP, a);
}

/**
 * Returns a LCH representation of a given color.
 * @alias module:pex-color.toLCH
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {lch}
 */
export function toLCH(color, out = []) {
  toLabD50(color, out); // setAlpha
  return labToLCH(out, ...out);
}
