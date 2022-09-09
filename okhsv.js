import { fromOklab, linearSrgbToOklab, oklabToLinearSrgb } from "./oklab.js";
import { TMP, setAlpha, toLinear, toe, toeInv, getStMax } from "./utils.js";

/**
 * @typedef {number[]} okhsv
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://bottosson.github.io/posts/colorpicker/#hsv-2}
 */

const S0 = 0.5;

/**
 * Updates a color based on Okhsv values and alpha.
 * @param {import("./color.js").color} color
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @param {number} [α]
 * @return {import("./color.js").color}
 */
export function fromOkhsv(color, h, s, v, α) {
  const a_ = Math.cos(2 * Math.PI * h);
  const b_ = Math.sin(2 * Math.PI * h);

  const [S, T] = getStMax(a_, b_);
  const k = 1 - S0 / S;

  const Lv = 1 - (s * S0) / (S0 + T - T * k * s);
  const Cv = (s * T * S0) / (S0 + T - T * k * s);

  let L = v * Lv;
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

  fromOklab(color, L, C * a_, C * b_);

  return setAlpha(color, α);
}

/**
 * Returns an Okhsv representation of a given color.
 * @param {import("./color.js").color} color
 * @param {Array} out
 * @return {okhsv}
 */
export function toOkhsv([r, g, b, a], out = []) {
  linearSrgbToOklab(TMP, toLinear(r), toLinear(g), toLinear(b));

  let C = Math.sqrt(TMP[1] * TMP[1] + TMP[2] * TMP[2]);
  const a_ = TMP[1] / C;
  const b_ = TMP[2] / C;

  let L = TMP[0];
  out[0] = 0.5 + (0.5 * Math.atan2(-TMP[2], -TMP[1])) / Math.PI;

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
  return setAlpha(out, a);
}
