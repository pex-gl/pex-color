import { toLinear } from "./linear.js";
import { fromOklab } from "./oklab.js";
import { linearToOklab, toe, toeInv, getCs, setAlpha, TAU } from "./utils.js";

/**
 * @typedef {number[]} okhsl
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://bottosson.github.io/posts/colorpicker/#hsl-2}
 */

/**
 * Updates a color based on Okhsl values and alpha.
 * @alias module:pex-color.fromOkhsl
 * @param {import("./color.js").color} color
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @param {number} [α]
 * @returns {import("./color.js").color}
 */
export function fromOkhsl(color, h, s, l, α) {
  if (l == 1) {
    color[0] = color[1] = color[2] = 1;
  } else if (l == 0) {
    color[0] = color[1] = color[2] = 0;
  } else {
    const a_ = Math.cos(TAU * h);
    const b_ = Math.sin(TAU * h);
    let L = toeInv(l);

    const [C0, Cmid, Cmax] = getCs(L, a_, b_);

    let C, t, k0, k1, k2;
    if (s < 0.8) {
      t = 1.25 * s;
      k0 = 0;
      k1 = 0.8 * C0;
      k2 = 1 - k1 / Cmid;
    } else {
      t = 5 * (s - 0.8);
      k0 = Cmid;
      k1 = (0.2 * Cmid * Cmid * 1.25 * 1.25) / C0;
      k2 = 1 - k1 / (Cmax - Cmid);
    }

    C = k0 + (t * k1) / (1 - k2 * t);

    return fromOklab(color, L, C * a_, C * b_, α);
  }

  return setAlpha(color, α);
}

/**
 * Returns an Okhsl representation of a given color.
 * @alias module:pex-color.toOkhsl
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {okhsl}
 */
export function toOkhsl(color, out = []) {
  toLinear(color, out);
  linearToOklab(out[0], out[1], out[2], out);

  const C = Math.sqrt(out[1] * out[1] + out[2] * out[2]);
  const a_ = out[1] / C;
  const b_ = out[2] / C;

  const L = out[0];
  out[0] = 0.5 + (0.5 * Math.atan2(-out[2], -out[1])) / Math.PI;

  const [C0, Cmid, Cmax] = getCs(L, a_, b_);

  out[2] = toe(L);

  if (out[2] !== 0 && out[2] !== 1 && C !== 0) {
    if (C < Cmid) {
      const k0 = 0;
      const k1 = 0.8 * C0;
      const k2 = 1 - k1 / Cmid;

      const t = (C - k0) / (k1 + k2 * (C - k0));
      out[1] = t * 0.8;
    } else {
      const k0 = Cmid;
      const k1 = (0.2 * Cmid * Cmid * 1.25 * 1.25) / C0;
      const k2 = 1 - k1 / (Cmax - Cmid);

      const t = (C - k0) / (k1 + k2 * (C - k0));
      out[1] = 0.8 + 0.2 * t;
    }
  } else {
    out[1] = 0;
  }

  // Epsilon for lightness should approach close to 32 bit lightness
  // Epsilon for saturation just needs to be sufficiently close when denoting achromatic
  let εL = 1e-7;
  let εS = 1e-4;

  const achromatic = Math.abs(out[1]) < εS;
  if (achromatic || Math.abs(1 - out[2]) < εL) {
    out[0] = 0; // null
    if (!achromatic) out[1] = 0;
  }

  return out;
}
