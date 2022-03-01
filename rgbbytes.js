import { create } from "./color.js";

/**
 * @typedef {number[]} bytes All components in the range 0 <= x <= 255
 */

/**
 * Creates a new color from an array of bytes values.
 * @param {bytes} bytes
 * @return {color}
 */
export function fromRGBBytes(bytes) {
  return setRGBBytes(create(), ...bytes);
}

/**
 * Set a color from byte values.
 * @param {color} color
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a=255]
 * @returns {color}
 */
export function setRGBBytes(color, r, g, b, a) {
  color[0] = r / 255;
  color[1] = g / 255;
  color[2] = b / 255;
  if (a !== undefined) color[3] = a / 255;
  return color;
}

/**
 * Get RGB color components as bytes array.
 * @param {color} color
 * @param {bytes} out
 * @return {bytes}
 */
export function getRGBBytes(color, out = [0, 0, 0]) {
  out[0] = Math.round(color[0] * 255);
  out[1] = Math.round(color[1] * 255);
  out[2] = Math.round(color[2] * 255);
  if (color[3] !== undefined) out[3] = Math.round(color[3] * 255);
  return out;
}
