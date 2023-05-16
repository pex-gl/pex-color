/**
 * @typedef {string} css CSS string representation.
 *
 * @see {@link https://www.w3.org/TR/css-color-4/}
 */

import { toHSL } from "./hsl.js";
import { toHWB } from "./hwb.js";
import { toLab, D50 } from "./lab.js";
import { toLCHuv } from "./lchuv.js";
import { toRGBBytes } from "./rgbbytes.js";
import { TMP, floorArray } from "./utils.js";

/**
 * Returns a rgb CSS string representation of a given color.
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSRGB(color, precision = 5) {
  toRGBBytes(color, TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  const a = color[3] !== undefined ? `, ${color[3]}` : "";
  return `rgb${a ? "a" : ""}(${TMP.slice(0, 3).join(", ")}${a})`;
}

/**
 * Returns a hsl CSS string representation of a given color.
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSHSL(color, precision = 5) {
  toHSL(color, TMP);
  TMP[0] *= 360;
  TMP[1] *= 100;
  TMP[2] *= 100;
  if (precision !== undefined) floorArray(TMP, precision);
  const a = color[3] !== undefined ? `, ${color[3]}` : "";
  return `hsl${a ? "a" : ""}(${TMP[0]}, ${TMP[1]}%, ${TMP[2]}%${a})`;
}

/**
 * Returns a lab CSS string representation of a given color.
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSLab(color, precision = 5) {
  toLab(color, TMP, D50);
  TMP[0] *= 100;
  TMP[1] *= 100;
  TMP[2] *= 100;
  if (precision !== undefined) floorArray(TMP, precision);
  return `lab(${TMP[0]}% ${TMP[1]} ${TMP[2]}${
    color[3] !== undefined ? ` / ${color[3]}` : ""
  })`;
}

/**
 * Returns a lch CSS string representation of a given color.
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSLCH(color, precision = 5) {
  toLCHuv(color, TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  return `lch(${TMP[0]}% ${TMP[1]} ${TMP[2]}${
    color[3] !== undefined ? ` / ${color[3]}` : ""
  })`;
}

/**
 * Returns a hwb CSS string representation of a given color.
 * @param {import("./color.js").color} color
 * @param {number} [precision=5]
 * @returns {css}
 */
export function toCSSHWB(color, precision = 5) {
  toHWB(color, TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  return `hwb(${TMP[0]}% ${TMP[1]} ${TMP[2]}${
    color[3] !== undefined ? ` / ${color[3]}` : ""
  })`;
}
