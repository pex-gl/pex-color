import { create } from "./color.js";

/**
 * @typedef {number[]} xyz Components range: 0 <= x <= 95; 0 <= y <= 100; 0 <= z <= 108;
 */

export const m = [
  [3.240969941904521, -1.537383177570093, -0.498610760293],
  [-0.96924363628087, 1.87596750150772, 0.041555057407175],
  [0.055630079696993, -0.20397695888897, 1.056971514242878],
];

const minv = [
  [0.41239079926595, 0.35758433938387, 0.18048078840183],
  [0.21263900587151, 0.71516867876775, 0.072192315360733],
  [0.019330818715591, 0.11919477979462, 0.95053215224966],
];

// const dotProduct = (a, b) => {
//   let sum = 0;
//   let _g1 = 0;
//   const _g = a.length;
//   while (_g1 < _g) {
//     const i = _g1++;
//     sum += a[i] * b[i];
//   }
//   return sum;
// };
// const fromLinear = (c) => {
//   if (c <= 0.0031308) {
//     return 12.92 * c;
//   } else {
//     return 1.055 * c ** (1 / 2.4) - 0.055;
//   }
// };
// const toLinear = (c) => {
//   if (c > 0.04045) {
//     return ((c + 0.055) / 1.055) ** 2.4;
//   } else {
//     return c / 12.92;
//   }
// };
// export const xyzToRgb = (tuple) => [
//   fromLinear(dotProduct(m[0], tuple)),
//   fromLinear(dotProduct(m[1], tuple)),
//   fromLinear(dotProduct(m[2], tuple)),
// ];
// export const rgbToXyz = (tuple) => {
//   const rgbl = [toLinear(tuple[0]), toLinear(tuple[1]), toLinear(tuple[2])];
//   return [
//     dotProduct(minv[0], rgbl),
//     dotProduct(minv[1], rgbl),
//     dotProduct(minv[2], rgbl),
//   ];
// };

// TODO: don't divide multiply by 100
function fromXYZValue(val) {
  val /= 100;

  if (val < 0) val = 0;

  if (val > 0.0031308) {
    val = 1.055 * val ** (1 / 2.4) - 0.055;
  } else {
    val *= 12.92;
  }

  return val;
}

function toXYZValue(val) {
  if (val > 0.04045) {
    val = ((val + 0.055) / 1.055) ** 2.4;
  } else {
    val /= 12.92;
  }

  val *= 100;

  return val;
}

/**
 * Creates a new color from XYZ values.
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} a
 * @return {color}
 */
export function fromXYZ(x, y, z, a) {
  return setXYZ(create(), x, y, z, a);
}

/**
 * Updates a color based on x, y, z component values.
 * @param {color} color
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} a
 * @return {color}
 */
export function setXYZ(color, x, y, z, a = 1) {
  const r = x * m[0][0] + y * m[0][1] + z * m[0][2];
  const g = x * m[1][0] + y * m[1][1] + z * m[1][2];
  const b = x * m[2][0] + y * m[2][1] + z * m[2][2];
  // const r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  // const g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  // const b = x * 0.0557 + y * -0.204 + z * 1.057;

  color[0] = fromXYZValue(r);
  color[1] = fromXYZValue(g);
  color[2] = fromXYZValue(b);
  color[3] = a;

  return color;
}

/**
 * Returns a XYZ representation of a given color.
 * @param {color} color
 * @return {color}
 */
export function getXYZ(color) {
  const r = toXYZValue(color[0]);
  const g = toXYZValue(color[1]);
  const b = toXYZValue(color[2]);

  return [
    // r * 0.4124 + g * 0.3576 + b * 0.1805,
    // r * 0.2126 + g * 0.7152 + b * 0.0722,
    // r * 0.0193 + g * 0.1192 + b * 0.9505,
    r * minv[0][0] + g * minv[0][1] + b * minv[0][2],
    r * minv[1][0] + g * minv[1][1] + b * minv[1][2],
    r * minv[2][0] + g * minv[2][1] + b * minv[2][2],
    color[3] || 1,
  ];
}
