import { toLinear } from "./linear.js";
import { fromOklab } from "./oklab.js";
import {
  linearToOklab,
  toe,
  toeInv,
  findCusp,
  getStMax,
  setAlpha,
  TAU,
} from "./utils.js";

/**
 * @typedef {number[]} okhsl
 *
 * All components in the range 0 <= x <= 1
 * @see {@link https://bottosson.github.io/posts/colorpicker/#hsl-2}
 */

const findGamutIntersection = (a, b, L1, C1, L0, cusp = null) => {
  if (!cusp) cusp = findCusp(a, b);

  let t;
  if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C1 <= 0) {
    t = (cusp[1] * L0) / (C1 * cusp[0] + cusp[1] * (L0 - L1));
  } else {
    t = (cusp[1] * (L0 - 1)) / (C1 * (cusp[0] - 1) + cusp[1] * (L0 - L1));

    const dL = L1 - L0;
    const dC = C1;

    const kl = 0.3963377774 * a + 0.2158037573 * b;
    const km = -0.1055613458 * a - 0.0638541728 * b;
    const ks = -0.0894841775 * a - 1.291485548 * b;

    const l_dt = dL + dC * kl;
    const m_dt = dL + dC * km;
    const s_dt = dL + dC * ks;

    const L = L0 * (1 - t) + t * L1;
    const C = t * C1;

    const l_ = L + C * kl;
    const m_ = L + C * km;
    const s_ = L + C * ks;

    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;

    const ldt = 3 * l_dt * l_ * l_;
    const mdt = 3 * m_dt * m_ * m_;
    const sdt = 3 * s_dt * s_ * s_;

    const ldt2 = 6 * l_dt * l_dt * l_;
    const mdt2 = 6 * m_dt * m_dt * m_;
    const sdt2 = 6 * s_dt * s_dt * s_;

    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s - 1;
    const r1 = 4.0767416621 * ldt - 3.3077115913 * mdt + 0.2309699292 * sdt;
    const r2 = 4.0767416621 * ldt2 - 3.3077115913 * mdt2 + 0.2309699292 * sdt2;

    const ur = r1 / (r1 * r1 - 0.5 * r * r2);
    let tr = -r * ur;

    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s - 1;
    const g1 = -1.2684380046 * ldt + 2.6097574011 * mdt - 0.3413193965 * sdt;
    const g2 = -1.2684380046 * ldt2 + 2.6097574011 * mdt2 - 0.3413193965 * sdt2;

    const ug = g1 / (g1 * g1 - 0.5 * g * g2);
    let tg = -g * ug;

    const b0 = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s - 1;
    const b1 = -0.0041960863 * ldt - 0.7034186147 * mdt + 1.707614701 * sdt;
    const b2 = -0.0041960863 * ldt2 - 0.7034186147 * mdt2 + 1.707614701 * sdt2;

    const ub = b1 / (b1 * b1 - 0.5 * b0 * b2);
    let tb = -b0 * ub;

    tr = ur >= 0 ? tr : 10e5;
    tg = ug >= 0 ? tg : 10e5;
    tb = ub >= 0 ? tb : 10e5;

    t += Math.min(tr, tg, tb);
  }

  return t;
};

const getCs = (L, a_, b_) => {
  const cusp = findCusp(a_, b_);

  const Cmax = findGamutIntersection(a_, b_, L, 1, L, cusp);
  const STmax = getStMax(a_, b_, cusp);

  // prettier-ignore
  const Smid = 0.11516993 + 1 / (
      7.44778970 + 4.15901240 * b_
      + a_ * (- 2.19557347 + 1.75198401 * b_
      + a_ * (- 2.13704948 -10.02301043 * b_
      + a_ * (- 4.24894561 + 5.38770819 * b_ + 4.69891013 * a_
    )))
  );
  // prettier-ignore
  const Tmid = 0.11239642 + 1 / (
      1.61320320 - 0.68124379 * b_
      + a_ * (+ 0.40370612 + 0.90148123 * b_
      + a_ * (- 0.27087943 + 0.61223990 * b_
      + a_ * (+ 0.00299215 - 0.45399568 * b_ - 0.14661872 * a_
    )))
  );

  const k = Cmax / Math.min(L * STmax[0], (1 - L) * STmax[1]);

  let Ca = L * Smid;
  let Cb = (1 - L) * Tmid;

  const Cmid =
    0.9 *
    k *
    Math.sqrt(
      Math.sqrt(1 / (1 / (Ca * Ca * Ca * Ca) + 1 / (Cb * Cb * Cb * Cb))),
    );

  Ca = L * 0.4;
  Cb = (1 - L) * 0.8;

  return [Math.sqrt(1 / (1 / (Ca * Ca) + 1 / (Cb * Cb))), Cmid, Cmax];
};

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
