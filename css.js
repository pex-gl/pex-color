/**
 * @typedef {string} css CSS string representation.
 * @see {@link https://www.w3.org/TR/css-color-4/}
 */

import { getHSL } from "./hsl.js";
import { getHWB } from "./hwb.js";
import { D50, getLab } from "./lab.js";
import { getLCHuv } from "./lchuv.js";
import { getRGBBytes } from "./rgbbytes.js";
import { floorArray } from "./utils.js";

const TMP = [0, 0, 0];

/**
 * Returns a rgb CSS string representation of a given color.
 * @param {color} color
 * @param {number} [precision=5]
 * @return {css}
 */
export function getCSSRGB(color, precision = 5) {
  getRGBBytes(color, TMP);
  const a = color[3] !== undefined ? `, ${color[3]}` : "";
  if (precision !== undefined) floorArray(TMP, precision);
  return `rgb${a ? "a" : ""}(${TMP.slice(0, 3).join(", ")}${a})`;
}

/**
 * Returns a hsl CSS string representation of a given color.
 * @param {color} color
 * @param {number} [precision=5]
 * @return {css}
 */
export function getCSSHSL(color, precision = 5) {
  getHSL(color, TMP);
  TMP[0] *= 360;
  TMP[1] *= 100;
  TMP[2] *= 100;
  if (precision !== undefined) floorArray(TMP, precision);
  const a = color[3] !== undefined ? `, ${color[3]}` : "";
  return `hsl${a ? "a" : ""}(${TMP[0]}, ${TMP[1]}%, ${TMP[2]}%${a})`;
}

/**
 * Returns a lab CSS string representation of a given color.
 * @param {color} color
 * @param {number} [precision=5]
 * @return {css}
 */
export function getCSSLab(color, precision = 5) {
  getLab(color, TMP, D50);
  if (precision !== undefined) floorArray(TMP, precision);
  return `lab(${TMP[0]}% ${TMP[1]} ${TMP[2]}${
    color[3] !== undefined ? ` / ${color[3]}` : ""
  })`;
}

/**
 * Returns a lch CSS string representation of a given color.
 * @param {color} color
 * @param {number} [precision=5]
 * @return {css}
 */
export function getCSSLCH(color, precision = 5) {
  getLCHuv(color, TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  return `lch(${TMP[0]}% ${TMP[1]} ${TMP[2]}${
    color[3] !== undefined ? ` / ${color[3]}` : ""
  })`;
}

/**
 * Returns a hwb CSS string representation of a given color.
 * @param {color} color
 * @param {number} [precision=5]
 * @return {css}
 */
export function getCSSHWB(color, precision = 5) {
  getHWB(color, TMP);
  if (precision !== undefined) floorArray(TMP, precision);
  return `hwb(${TMP[0]}% ${TMP[1]} ${TMP[2]}${
    color[3] !== undefined ? ` / ${color[3]}` : ""
  })`;
}
