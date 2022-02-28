/**
 * @typedef {number[]} color All components in the range 0 <= x <= 1
 */
/**
 * @typedef {number[]} bytes All components in the range 0 <= x <= 255
 */
/**
 * @typedef {number[]} hsv All components in the range 0 <= x <= 1
 */
/**
 * @typedef {number[]} hsl All components in the range 0 <= x <= 1
 */
/**
 * @typedef {string} hex RGB hex value string eg. #RRGGBB[AA]
 */
/**
 * @typedef {number[]} xyz Components range: 0 <= x <= 95; 0 <= y <= 100; 0 <= z <= 108;
 */
/**
 * @typedef {number[]} lab Components range: 0 <= l <= 100; -128 <= a <= 127; -128 <= b <= 127;
 */

/**
 * Creates a new color from component values.
 * @param {number} [r=0]
 * @param {number} [g=0]
 * @param {number} [b=0]
 * @param {number} [a=1]
 * @return {color}
 */
export function create(r = 0, g = 0, b = 0, a = 1) {
  return [r, g, b, a];
}

/**
 * Returns a copy of a color.
 * @param {color} color
 * @param {color} [out] Deprecated: use set(c, d)
 * @return {color}
 */
export function copy(color, out) {
  if (out) set(out, color); // For backward compatibility.
  return color.slice();
}

/**
 * Sets a color to another color.
 * @param {color} color
 * @param {color|number} color2
 * @param {number} [g] // Deprecated: use setRGB(color, r, g, b, a)
 * @param {number} [b] // Deprecated: use setRGB(color, r, g, b, a)
 * @param {number} [a] // Deprecated: use setRGB(color, r, g, b, a)
 * @return {color}
 */
export function set(color, color2, g) {
  if (g) return setRGB(...arguments); // For backward compatibility.
  color[0] = color2[0];
  color[1] = color2[1];
  color[2] = color2[2];
  color[3] = color2[3] ?? 1;
  return color;
}

// RGB
/**
 * Alias for {@link create}
 * @function
 */
export const fromRGB = create;

/**
 * Updates a color based on r, g, b, a component values.
 * @param {color} color
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} [a=1]
 * @return {color}
 */
export function setRGB(color, r, g, b, a = 1) {
  color[0] = r;
  color[1] = g;
  color[2] = b;
  color[3] = a;
  return color;
}

// RGB Bytes
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

// HSV
/**
 * Creates a new color from hue, saturation, value and alpha.
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
 * Updates a color based on hue, saturation, value and alpha.
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
 * Get hue, saturation, value and alpha of a given color.
 * @param {color} color
 * @return {hsv}
 */
export function getHSV(color) {
  const r = color[0];
  const g = color[1];
  const b = color[2];
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

  return [h, s, v, color[3]];
}

// HSL
/**
 * Creates a new color from hue, saturation, lightness and alpha.
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
 * @private
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
 * Updates a color based on hue, saturation, lightness and alpha.
 * @param {Array} color
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
 * Returns a hsl representation of a given color.
 * @param {Array} color  - RGBA color array [r, g, b, a]
 * @return {hsl}
 */
export function getHSL(color) {
  const r = color[0];
  const g = color[1];
  const b = color[2];
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

  return [h, s, l, color[3]];
}

// HEX
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

// XYZ
// Helpers
/**
 * @private
 */
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

/**
 * @private
 */
function toXYZValue(val) {
  if (val > 0.04045) {
    val = (val + 0.055) / 1.055 ** 2.4;
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
 * @return {color}
 */
export function fromXYZ(x, y, z) {
  return setXYZ(create(), x, y, z);
}

/**
 * Updates a color based on x, y, z component values.
 * @param {color} color
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @return {color}
 */
export function setXYZ(color, x, y, z) {
  const r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  const g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  const b = x * 0.0557 + y * -0.204 + z * 1.057;

  color[0] = fromXYZValue(r);
  color[1] = fromXYZValue(g);
  color[2] = fromXYZValue(b);
  color[3] = 1;

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
    r * 0.4124 + g * 0.3576 + b * 0.1805,
    r * 0.2126 + g * 0.7152 + b * 0.0722,
    r * 0.0193 + g * 0.1192 + b * 0.9505,
  ];
}

// LAB
// Helpers
// x,y,z tristimulus values
/**
 * @constant
 * @private
 */
const white = [95.047, 100, 108.883];

/**
 * @private
 */
function fromLabValueToXYZValue(val, white) {
  const pow = val ** 3;

  if (pow > 0.008856) {
    val = pow;
  } else {
    val = (val - 16 / 116) / 7.787;
  }

  val *= white;

  return val;
}

/**
 * @private
 */
function fromXYZValueToLabValue(val, white) {
  val /= white;

  if (val > 0.008856) {
    val = val ** (1 / 3);
  } else {
    val = 7.787 * val + 16 / 116;
  }
  return val;
}

/**
 * Creates a new color from lab component values
 * @param {number} l
 * @param {number} a
 * @param {number} b
 * @return {color}
 */
export function fromLab(l, a, b) {
  return setLab(create(), l, a, b);
}

/**
 * Updates a color based on lab component values.
 * @param {color} color
 * @param {number} l
 * @param {number} a
 * @param {number} b
 * @return {color}
 */
export function setLab(color, l, a, b) {
  const y = (l + 16) / 116;
  const x = a / 500 + y;
  const z = y - b / 200;

  return setXYZ(
    color,
    fromLabValueToXYZValue(x, white[0]),
    fromLabValueToXYZValue(y, white[1]),
    fromLabValueToXYZValue(z, white[2])
  );
}

/**
 * Returns a LAB representation of a given color.
 * @param {color} color
 * @return {lab}
 */
export function getLab(color) {
  const xyz = getXYZ(color);

  const x = fromXYZValueToLabValue(xyz[0], white[0]);
  const y = fromXYZValueToLabValue(xyz[1], white[1]);
  const z = fromXYZValueToLabValue(xyz[2], white[2]);

  return [116 * y - 16, 500 * (x - y), 200 * (y - z)];
}

export default {
  create,
  copy,
  set,

  fromRGB,
  setRGB,

  fromRGBBytes,
  setRGBBytes,
  getRGBBytes,

  fromHSV,
  setHSV,
  getHSV,

  fromHSL,
  setHSL,
  getHSL,

  fromHex,
  setHex,
  getHex,

  fromXYZ,
  setXYZ,
  getXYZ,

  fromLab,
  setLab,
  getLab,
};
