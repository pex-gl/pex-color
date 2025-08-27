/**
 * @typedef {string} css CSS string representation.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/}
 */

import { set } from "./color.js";
import { toLinear } from "./linear.js";
import { toP3 } from "./p3.js";
import { toHSL } from "./hsl.js";
import { toHWB } from "./hwb.js";
import { toLab, toLabD65 } from "./lab.js";
import { toLCH } from "./lch.js";
import { toOklch } from "./oklch.js";
import { toOklab } from "./oklab.js";
import { toXYZD65, toXYZD50 } from "./xyz.js";
import { TMP, floorArray } from "./utils.js";

// Get the color without alpha
const getCoords = (color) => color.slice(0, 3);

// Set alpha only when necessary
const setCSSAlpha = (a) => (a !== undefined && a !== 1 ? ` / ${a}` : "");

// Format color space
const toCSSColorSpace = (colorSpace, color, a) =>
  `color(${colorSpace} ${color.join(" ")}${setCSSAlpha(a)})`;

// sRGB color spaces:
// TODO: a98-rgb, prophoto-rgb, and rec2020
/**
 * Returns a rgb CSS string representation of a given color.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color}
 * @alias module:pex-color.toCSSRGB
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSRGB(color, precision = 5) {
  set(TMP, getCoords(color));
  if (precision !== undefined) floorArray(TMP, precision);
  return toCSSColorSpace("srgb", TMP, color[3]);
}

/**
 * Returns a linear rgb CSS string representation of a given color.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color}
 * @alias module:pex-color.toCSSRGBLinear
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSRGBLinear(color, precision = 5) {
  toLinear(getCoords(color), TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  return toCSSColorSpace("srgb-linear", TMP, color[3]);
}

/**
 * Returns a P3 rgb CSS string representation of a given color.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color}
 * @alias module:pex-color.toCSSRGBLinear
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSP3(color, precision = 5) {
  toP3(getCoords(color), TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  return toCSSColorSpace("display-p3", TMP, color[3]);
}

/**
 * Returns a hsl CSS string representation of a given color.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl}
 * @alias module:pex-color.toCSSHSL
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSHSL(color, precision = 5) {
  toHSL(getCoords(color), TMP);
  TMP[0] *= 360;
  TMP[1] *= 100;
  TMP[2] *= 100;
  if (precision !== undefined) floorArray(TMP, precision);
  return `hsl(${TMP[0]} ${TMP[1]}% ${TMP[2]}%${setCSSAlpha(color[3])})`;
}

/**
 * Returns a hwb CSS string representation of a given color.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb}
 * @alias module:pex-color.toCSSHWB
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSHWB(color, precision = 5) {
  toHWB(getCoords(color), TMP);
  TMP[0] *= 360;
  if (precision !== undefined) floorArray(TMP, precision);
  return `hwb(${TMP[0]} ${TMP[1]}% ${TMP[2]}%${setCSSAlpha(color[3])})`;
}

// CIELAB color spaces:
/**
 * Returns a lab CSS string representation of a given color.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab}
 * @alias module:pex-color.toCSSLab
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSLab(color, precision = 5) {
  toLab(getCoords(color), TMP);
  TMP[0] *= 100;
  TMP[1] *= 100;
  TMP[2] *= 100;
  if (precision !== undefined) floorArray(TMP, precision);
  return `lab(${TMP[0]}% ${TMP[1]} ${TMP[2]}${setCSSAlpha(color[3])})`;
}
/**
 * Returns a lab CSS string representation of a given color.
 * @alias module:pex-color.toCSSLab
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSLabD65(color, precision = 5) {
  toLabD65(getCoords(color), TMP);
  TMP[0] *= 100;
  TMP[1] *= 100;
  TMP[2] *= 100;
  if (precision !== undefined) floorArray(TMP, precision);
  return `lab-d65(${TMP[0]}% ${TMP[1]} ${TMP[2]}${setCSSAlpha(color[3])})`;
}

/**
 * Returns a lch CSS string representation of a given color.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch}
 * @alias module:pex-color.toCSSLCH
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSLCH(color, precision = 5) {
  toLCH(getCoords(color), TMP);
  TMP[0] *= 100;
  TMP[1] *= 150;
  TMP[2] *= 360;
  if (precision !== undefined) floorArray(TMP, precision);
  return `lch(${TMP[0]}% ${TMP[1]} ${TMP[2]}${setCSSAlpha(color[3])})`;
}

/**
 * Returns a lab CSS string representation of a given color.
 * @alias module:pex-color.toCSSOklab
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSOklab(color, precision = 5) {
  toOklab(getCoords(color), TMP);
  TMP[0] *= 100;
  if (precision !== undefined) floorArray(TMP, precision);
  return `oklab(${TMP[0]}% ${TMP[1]} ${TMP[2]}${setCSSAlpha(color[3])})`;
}

/**
 * Returns a lch CSS string representation of a given color.
 * @alias module:pex-color.toCSSOklch
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSOklch(color, precision = 5) {
  toOklch(getCoords(color), TMP);
  TMP[0] *= 100;
  TMP[2] *= 360;
  if (precision !== undefined) floorArray(TMP, precision);
  return `oklch(${TMP[0]}% ${TMP[1]} ${TMP[2]}${setCSSAlpha(color[3])})`;
}

// XYZ colors spaces:
/**
 * Returns a xyz-d50 CSS string representation of a given color.
 * @alias module:pex-color.toCSSXYZD50
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSXYZD50(color, precision = 5) {
  toXYZD50(getCoords(color), TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  return toCSSColorSpace("xyz-d50", TMP, color[3]);
}

/**
 * Returns a xyz (xyz-d65) CSS string representation of a given color.
 * @alias module:pex-color.toCSSXYZ
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSXYZ(color, precision = 5) {
  toXYZD65(getCoords(color), TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  return toCSSColorSpace("xyz", TMP, color[3]);
}
