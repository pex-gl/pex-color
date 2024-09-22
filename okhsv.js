import { toLinear } from "./linear.js";
import { fromOklab } from "./oklab.js";
import {
  oklabToLinear,
  linearToOklab,
  toe,
  toeInv,
  getStMax,
  TAU,
} from "./utils.js";

/**
 * @typedef {number[]} okhsv
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://bottosson.github.io/posts/colorpicker/#hsv-2}
 */

const S0 = 0.5;

/**
 * Updates a color based on Okhsv values and alpha.
 * @alias module:pex-color.fromOkhsv
 * @param {import("./color.js").color} color
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @param {number} [α]
 * @returns {import("./color.js").color}
 */
export function fromOkhsv(color, h, s, v, α) {
  let L = toeInv(v);
  let a = 0; // null
  let b = 0; // null

  // Avoid processing gray or colors with undefined hues
  if (L !== 0 && s !== 0) {
    const a_ = Math.cos(TAU * h);
    const b_ = Math.sin(TAU * h);

    const [S, T] = getStMax(a_, b_);
    const k = 1 - S0 / S;

    const Lv = 1 - (s * S0) / (S0 + T - T * k * s);
    const Cv = (s * T * S0) / (S0 + T - T * k * s);

    L = v * Lv;
    let C = v * Cv;

    const Lvt = toeInv(Lv);
    const Cvt = (Cv * Lvt) / Lv;

    const Lnew = toeInv(L);
    C = (C * Lnew) / L;
    L = Lnew;

    oklabToLinear(Lvt, a_ * Cvt, b_ * Cvt, color);

    const scaleL = Math.cbrt(1 / Math.max(color[0], color[1], color[2], 0));

    L = L * scaleL;
    C = C * scaleL;

    a = C * a_;
    b = C * b_;
  }

  return fromOklab(color, L, a, b, α);
}

/**
 * Returns an Okhsv representation of a given color.
 * @alias module:pex-color.toOkhsv
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {okhsv}
 */
export function toOkhsv(color, out = []) {
  toLinear(color, out);
  linearToOklab(out[0], out[1], out[2], out);

  const H = 0.5 + (0.5 * Math.atan2(-out[2], -out[1])) / Math.PI;

  let L = out[0];
  let C = Math.sqrt(out[1] * out[1] + out[2] * out[2]);

  if (L !== 0 && L !== 1 && C !== 0) {
    const a_ = out[1] / C;
    const b_ = out[2] / C;
    const [S, T] = getStMax(a_, b_);

    const t = T / (C + L * T);
    const Lv = t * L;
    const Cv = t * C;

    const Lvt = toeInv(Lv);
    const Cvt = (Cv * Lvt) / Lv;

    oklabToLinear(Lvt, a_ * Cvt, b_ * Cvt, out);

    const scaleL = Math.cbrt(1 / Math.max(out[0], out[1], out[2], 0));

    L = L / scaleL;
    C = C / scaleL;

    const toeL = toe(L);
    C = (C * toeL) / L;

    out[1] = ((S0 + T) * Cv) / (T * S0 + T * (1 - S0 / S) * Cv);
    out[2] = toeL / Lv;
  } else {
    out[1] = 0;
    out[2] = toe(L);
  }

  // Epsilon for saturation just needs to be sufficiently close when denoting achromatic
  const ε = 1e-4;
  if (Math.abs(out[1]) < ε || out[2] === 0) {
    out[0] = 0; // null
  } else {
    out[0] = H;
  }

  return out;
}
