/**
 * @typedef {number[]} bytes An array of 3 (RGB) or 4 (A) values in bytes.
 *
 * All components in the range 0 <= x <= 255
 */

/**
 * Updates a color based on byte values.
 * @param {import("./color.js").color} color
 * @param {bytes} bytes
 * @returns {import("./color.js").color}
 */
export function fromRGBBytes(color, [r, g, b, a]) {
  color[0] = r / 255;
  color[1] = g / 255;
  color[2] = b / 255;
  if (a !== undefined) color[3] = a / 255;
  return color;
}

/**
 * Get RGB[A] color components as bytes array.
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {bytes}
 */
export function toRGBBytes(color, out = []) {
  out[0] = Math.round(color[0] * 255);
  out[1] = Math.round(color[1] * 255);
  out[2] = Math.round(color[2] * 255);
  if (color[3] !== undefined) out[3] = Math.round(color[3] * 255);
  return out;
}
