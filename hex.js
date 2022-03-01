import { create } from "./color.js";

/**
 * @typedef {string} hex RGB hex value string eg. #RRGGBB[AA]
 */

/**
 * Creates a new color from a html hex string
 * @param {hex} hex
 * @return {color}
 */
export function fromHex(hex) {
  return setHex(create(), hex);
}

/**
 * Updates a color based on a html hex string.
 * @param {color} color
 * @param {hex} hex Leading '#' is optional.
 * @return {color}
 */
export function setHex(color, hex) {
  hex = hex.replace(/^#/, "");

  let a = 1;

  if (hex.length === 8) {
    a = parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  } else if (hex.length === 4) {
    a = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const num = parseInt(hex, 16);

  color[0] = ((num >> 16) & 255) / 255;
  color[1] = ((num >> 8) & 255) / 255;
  color[2] = (num & 255) / 255;
  color[3] = a;

  return color;
}

/**
 * Returns a html hex string representation of a given color.
 * @param {color} color
 * @return {hex}
 */
export function getHex(color) {
  const c = color.map((val) => Math.round(val * 255));

  return `#${(c[2] | (c[1] << 8) | (c[0] << 16) | (1 << 24))
    .toString(16)
    .slice(1)
    .toUpperCase()}${
    color[3] !== undefined && color[3] !== 1
      ? (c[3] | (1 << 8)).toString(16).slice(1)
      : ""
  }`;
}
