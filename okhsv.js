import { fromOklab } from "./oklab.js";
import {
  oklabToLinearSrgb,
  linearSrgbToOklab,
  srgbToLinear,
  toe,
  toeInv,
  getStMax,
  setAlpha,
  TMP,
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

    oklabToLinearSrgb(TMP, Lvt, a_ * Cvt, b_ * Cvt);

    const scaleL = Math.cbrt(1 / Math.max(TMP[0], TMP[1], TMP[2], 0));

    L = L * scaleL;
    C = C * scaleL;

    a = C * a_;
    b = C * b_;
  }

  fromOklab(color, L, a, b);

  return setAlpha(color, α);
}

/**
 * Returns an Okhsv representation of a given color.
 * @alias module:pex-color.toOkhsv
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @returns {okhsv}
 */
export function toOkhsv([r, g, b, a], out = []) {
  linearSrgbToOklab(TMP, srgbToLinear(r), srgbToLinear(g), srgbToLinear(b));

  let C = Math.sqrt(TMP[1] * TMP[1] + TMP[2] * TMP[2]);

  let L = TMP[0];
  out[0] = 0.5 + (0.5 * Math.atan2(-TMP[2], -TMP[1])) / Math.PI;

  if (L !== 0 && L !== 1 && C !== 0) {
    const a_ = TMP[1] / C;
    const b_ = TMP[2] / C;
    const [S, T] = getStMax(a_, b_);

    const t = T / (C + L * T);
    const Lv = t * L;
    const Cv = t * C;

    const Lvt = toeInv(Lv);
    const Cvt = (Cv * Lvt) / Lv;

    oklabToLinearSrgb(TMP, Lvt, a_ * Cvt, b_ * Cvt);

    const scaleL = Math.cbrt(1 / Math.max(TMP[0], TMP[1], TMP[2], 0));

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
  let ε = 1e-4;
  if (Math.abs(out[1]) < ε || out[2] === 0) {
    out[0] = 0; // null
  }

  return setAlpha(out, a);
}
