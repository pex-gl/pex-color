/** @module utils */

import { fromValues } from "./color.js";

/**
 * Constants and utilities
 */

const setAlpha = (color, a) => {
  if (a !== undefined) color[3] = a;
  return color;
};

const floorArray = (color, precision = 5) => {
  const p = 10 ** precision;
  color.forEach(
    (n, i) => (color[i] = Math.floor((n + Number.EPSILON) * p) / p),
  );
  return color;
};

const transformMat3 = (a, m) => {
  const x = a[0];
  const y = a[1];
  const z = a[2];
  a[0] = x * m[0] + y * m[3] + z * m[6];
  a[1] = x * m[1] + y * m[4] + z * m[7];
  a[2] = x * m[2] + y * m[5] + z * m[8];
  return a;
};

const cubed3 = (lms) => {
  lms[0] = lms[0] ** 3;
  lms[1] = lms[1] ** 3;
  lms[2] = lms[2] ** 3;
};

const cbrt3 = (lms) => {
  lms[0] = Math.cbrt(lms[0]);
  lms[1] = Math.cbrt(lms[1]);
  lms[2] = Math.cbrt(lms[2]);
};

const TMP = [0, 0, 0];

const TAU = 2 * Math.PI;

/**
 * Illuminant D65: x,y,z tristimulus values
 * @see {@link https://en.wikipedia.org/wiki/Standard_illuminant#White_points_of_standard_illuminants}
 */
const D65 = [0.3127 / 0.329, 1, (1 - 0.3127 - 0.329) / 0.329];

/**
 * Illuminant D50: x,y,z tristimulus values
 */
const D50 = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585];

/**
 * Spaces conversions
 */
// Linear/sRGB
/**
 * Convert component from linear value
 * @param {number} c
 * @returns {number}
 */
const linearToSrgb = (c) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

/**
 * Convert component to linear value
 * @param {number} c
 * @returns {number}
 */
const srgbToLinear = (c) =>
  c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92;

const linearToRgb = (r, g, b, out) => {
  out[0] = linearToSrgb(r);
  out[1] = linearToSrgb(g);
  out[2] = linearToSrgb(b);
  return out;
};

const rgbToLinear = (r, g, b, out) => {
  out[0] = srgbToLinear(r);
  out[1] = srgbToLinear(g);
  out[2] = srgbToLinear(b);
  return out;
};

// XYZ/Linear/P3
// https://github.com/hsluv/hsluv-javascript/blob/14b49e6cf9a9137916096b8487a5372626b57ba4/src/hsluv.ts#L8-L16
// prettier-ignore
const mXYZD65ToLinearsRGB = [
  3.240969941904521, -0.96924363628087, 0.055630079696993,
  -1.537383177570093, 1.87596750150772, -0.20397695888897,
  -0.498610760293, 0.041555057407175, 1.056971514242878,
];
// https://github.com/hsluv/hsluv-javascript/blob/14b49e6cf9a9137916096b8487a5372626b57ba4/src/hsluv.ts#L152-L154
// prettier-ignore
const mLinearsRGBToXYZD65 = [
  0.41239079926595, 0.21263900587151, 0.019330818715591,
  0.35758433938387, 0.71516867876775, 0.11919477979462,
  0.18048078840183, 0.072192315360733, 0.95053215224966,
];

// https://github.com/Evercoder/culori/tree/main/src/xyz50
// prettier-ignore
const mXYZD50ToLinearsRGB = [
  3.1341359569958707, -0.978795502912089, 0.07195537988411677,
  -1.6173863321612538, 1.916254567259524, -0.2289768264158322,
  -0.4906619460083532, 0.03344273116131949, 1.405386058324125,
];
const mLinearsRGBToXYZD50 = [
  0.436065742824811, 0.22249319175623702, 0.013923904500943465,
  0.3851514688337912, 0.7168870538238823, 0.09708128566574634,
  0.14307845442264197, 0.06061979053616537, 0.7140993584005155,
];

// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// https://drafts.csswg.org/css-color/#color-conversion-code
// prettier-ignore
const mLinearP3ToXYZD65 = [
  0.4865709486482162, 0.2289745640697488, 0,
  0.26566769316909306, 0.6917385218365064, 0.04511338185890264,
  0.1982172852343625, 0.079286914093745, 1.043944368900976,
];
// prettier-ignore
const mXYZD65ToLinearP3 = [
  2.493496911941425, -0.8294889695615747, 0.03584583024378447,
  -0.9313836179191239, 1.7626640603183463, -0.07617238926804182,
  -0.40271078445071684, 0.023624685841943577, 0.9568845240076872,
];

const xyzD65ToLinear = (x, y, z, out) => {
  fromValues(out, x, y, z);
  return transformMat3(out, mXYZD65ToLinearsRGB);
};
const linearToXyzD65 = (lr, lg, lb, out) => {
  fromValues(out, lr, lg, lb);
  return transformMat3(out, mLinearsRGBToXYZD65);
};
const xyzD50ToLinear = (x, y, z, out) => {
  fromValues(out, x, y, z);
  return transformMat3(out, mXYZD50ToLinearsRGB);
};
const linearToXyzD50 = (lr, lg, lb, out) => {
  fromValues(out, lr, lg, lb);
  return transformMat3(out, mLinearsRGBToXYZD50);
};
const linearP3ToXyzD65 = (lr, lg, lb, out) => {
  fromValues(out, lr, lg, lb);
  return transformMat3(out, mLinearP3ToXYZD65);
};
const xyzD65ToLinearP3 = (x, y, z, out) => {
  fromValues(out, x, y, z);
  return transformMat3(out, mXYZD65ToLinearP3);
};

// Luv
// https://github.com/hsluv/hsluv-javascript/blob/main/src/hsluv.ts
const L_EPSILON = 1e-10;
const REF_U = 0.19783000664283;
const REF_V = 0.46831999493879;
const KAPPA = 9.032962962;
const EPSILON = 0.000088564516;

const yToL = (Y) => (Y <= EPSILON ? Y * KAPPA : 1.16 * Y ** (1 / 3) - 0.16);
const lToY = (L) => (L <= 0.08 ? L / KAPPA : ((L + 0.16) / 1.16) ** 3);

const xyzToLuv = (X, Y, Z, out) => {
  const divider = X + 15 * Y + 3 * Z;
  let varU = 4 * X;
  let varV = 9 * Y;
  if (divider !== 0) {
    varU /= divider;
    varV /= divider;
  } else {
    varU = NaN;
    varV = NaN;
  }
  const L = yToL(Y);
  if (L === 0) {
    out[0] = out[1] = out[2] = 0;
    return out;
  }

  out[0] = L;
  out[1] = 13 * L * (varU - REF_U);
  out[2] = 13 * L * (varV - REF_V);
  return out;
};

const luvToXyz = (L, U, V, out) => {
  if (L === 0) {
    out[0] = out[1] = out[2] = 0;
    return out;
  }
  const varU = U / (13 * L) + REF_U;
  const varV = V / (13 * L) + REF_V;
  const Y = lToY(L);
  const X = 0 - (9 * Y * varU) / ((varU - 4) * varV - varU * varV);
  out[0] = X;
  out[1] = Y;
  out[2] = (9 * Y - 15 * varV * Y - varV * X) / (3 * varV);
  return out;
};

const luvToLch = (L, U, V, out) => {
  const C = Math.sqrt(U * U + V * V);
  let H;
  if (C < L_EPSILON) {
    H = 0;
  } else {
    H = Math.atan2(V, U) / TAU;
    if (H < 0) H = 1 + H;
  }
  out[0] = L;
  out[1] = C;
  out[2] = H;
  return out;
};

const lchToLuv = (L, C, H, out) => {
  const Hrad = H * TAU;
  out[0] = L;
  out[1] = Math.cos(Hrad) * C;
  out[2] = Math.sin(Hrad) * C;
  return out;
};

// HPLuv/HSLuv
const hpLuvOrHsluvToLch = (H, S, L, getChroma, out) => {
  if (L > 1 - L_EPSILON) {
    out[0] = 1;
    out[1] = 0;
  } else if (L < L_EPSILON) {
    out[0] = out[1] = 0;
  } else {
    out[0] = L;
    out[1] = getChroma(L, H) * S;
  }
  out[2] = H;
  return out;
};

const lchToHpluvOrHsluv = (L, C, H, getChroma, out) => {
  out[0] = H;
  if (L > 1 - L_EPSILON) {
    out[1] = 0;
    out[2] = 1;
  } else if (L < L_EPSILON) {
    out[1] = out[2] = 0;
  } else {
    out[1] = C / getChroma(L, H);
    out[2] = L;
  }
  return out;
};

// TODO: normalize
const getBounds = (L) => {
  const result = [];
  const sub1 = (L + 16) ** 3 / 1560896;
  const sub2 = sub1 > EPSILON ? sub1 : L / KAPPA;

  let _g = 0;
  while (_g < 3) {
    const c = _g++;
    const m1 = mXYZD65ToLinearsRGB[c];
    const m2 = mXYZD65ToLinearsRGB[c + 3];
    const m3 = mXYZD65ToLinearsRGB[c + 6];
    let _g1 = 0;
    while (_g1 < 2) {
      const t = _g1++;
      const top1 = (284517 * m1 - 94839 * m3) * sub2;
      const top2 =
        (838422 * m3 + 769860 * m2 + 731718 * m1) * L * sub2 - 769860 * t * L;
      const bottom = (632260 * m3 - 126452 * m2) * sub2 + 126452 * t;
      result.push({ slope: top1 / bottom, intercept: top2 / bottom });
    }
  }
  return result;
};

const distanceLineFromOrigin = ({ intercept, slope }) =>
  Math.abs(intercept) / Math.sqrt(slope ** 2 + 1);

const maxSafeChromaForL = (L) => {
  const bounds = getBounds(L * 100);
  let min = Infinity;
  let _g = 0;
  while (_g < bounds.length) {
    const bound = bounds[_g];
    ++_g;
    const length = distanceLineFromOrigin(bound);
    min = Math.min(min, length);
  }
  return min / 100;
};

const lengthOfRayUntilIntersect = (theta, { intercept, slope }) =>
  intercept / (Math.sin(theta) - slope * Math.cos(theta));

const maxChromaForLH = (L, H) => {
  const hrad = H * TAU;
  const bounds = getBounds(L * 100);
  let min = Infinity;
  let _g = 0;
  while (_g < bounds.length) {
    const bound = bounds[_g];
    ++_g;
    const length = lengthOfRayUntilIntersect(hrad, bound);
    if (length >= 0) min = Math.min(min, length);
  }
  return min / 100;
};

const hpluvToLch = (H, S, L, out) =>
  hpLuvOrHsluvToLch(H, S, L, maxSafeChromaForL, out);

const lchToHpluv = (L, C, H, out) =>
  lchToHpluvOrHsluv(L, C, H, maxSafeChromaForL, out);

const hsluvToLch = (H, S, L, out) =>
  hpLuvOrHsluvToLch(H, S, L, maxChromaForLH, out);

const lchToHsluv = (L, C, H, out) =>
  lchToHpluvOrHsluv(L, C, H, maxChromaForLH, out);

// Lab/Lch
// https://drafts.csswg.org/css-color/#lch-to-lab}
const lchToLab = (l, c, h, out) => {
  out[0] = l;
  out[1] = c * Math.cos(h * TAU);
  out[2] = c * Math.sin(h * TAU);

  // Range is [0, 150]
  out[1] *= 1.5;
  out[2] *= 1.5;

  return out;
};

// https://drafts.csswg.org/css-color/#lab-to-lch}
const labToLch = (l, a, b, out) => {
  out[0] = l;

  const ε = 250 / 100000 / 100; // Lab is -125, 125. TODO: range is different for Oklab

  // If is achromatic
  if (Math.abs(a) < ε && Math.abs(b) < ε) {
    out[1] = out[2] = 0;
  } else {
    const h = Math.atan2(b, a); // [-PI to PI]
    out[1] = Math.sqrt(a ** 2 + b ** 2);
    out[2] = (h >= 0 ? h : h + TAU) / TAU; // [0 to 1)

    // Range is [0, 150]
    out[1] /= 1.5;
  }
  return out;
};

// Lab/XYZ
// ε = 6^3 / 29^3 = 0.008856
// κ = 29^3 / 3^3 = 903.2962963
// 903.2962963 / 116 = 7.787037
const fromLabValueToXYZValue = (val, white) => {
  const pow = val ** 3;
  return (pow > 0.008856 ? pow : (val - 16 / 116) / 7.787037) * white;
};

const fromXYZValueToLabValue = (val, white) => {
  val /= white;
  return val > 0.008856 ? Math.cbrt(val) : 7.787037 * val + 16 / 116;
};

const labToXyz = (l, a, b, out, illuminant) => {
  const Y = (l + 0.16) / 1.16;

  out[0] = fromLabValueToXYZValue(a / 5 + Y, illuminant[0]);
  out[1] = fromLabValueToXYZValue(Y, illuminant[1]);
  out[2] = fromLabValueToXYZValue(Y - b / 2, illuminant[2]);
};

const xyzToLab = (x, y, z, out, illuminant) => {
  const X = fromXYZValueToLabValue(x, illuminant[0]);
  const Y = fromXYZValueToLabValue(y, illuminant[1]);
  const Z = fromXYZValueToLabValue(z, illuminant[2]);

  out[0] = 1.16 * Y - 0.16;
  out[1] = 5 * (X - Y);
  out[2] = 2 * (Y - Z);
  return out;
};

// Ok
// prettier-ignore
const mOklabToLMS = [
  1, 1, 1,
  0.3963377774, -0.1055613458, -0.0894841775,
  0.2158037573, -0.0638541728, -1.291485548,
];
// prettier-ignore
const mLMSToLinear = [
  4.0767416621, -1.2684380046, -0.0041960863,
  -3.3077115913, 2.6097574011, -0.7034186147,
  0.2309699292, -0.3413193965, 1.707614701,
];

// TODO: https://github.com/w3c/csswg-drafts/issues/6642#issuecomment-943521484
// prettier-ignore
const mLinearToLMS = [
  0.4122214708, 0.2119034982, 0.0883024619,
  0.5363325363, 0.6806995451, 0.2817188376,
  0.0514459929, 0.1073969566, 0.6299787005,
];
// prettier-ignore
const mLMSToOklab = [
  0.2104542553, 1.9779984951, 0.0259040371,
  0.793617785, -2.428592205, 0.7827717662,
  -0.0040720468, 0.4505937099, -0.808675766,
];

// https://github.com/bottosson/bottosson.github.io/blob/master/misc/colorpicker/colorconversion.js
const oklabToLinear = (L, a, b, out) => {
  fromValues(out, L, a, b);
  transformMat3(out, mOklabToLMS);
  cubed3(out);
  return transformMat3(out, mLMSToLinear);
};

const linearToOklab = (lr, lg, lb, out) => {
  fromValues(out, lr, lg, lb);
  transformMat3(out, mLinearToLMS);
  cbrt3(out);
  return transformMat3(out, mLMSToOklab);
};

const k1 = 0.206;
const k2 = 0.03;
const k3 = (1 + k1) / (1 + k2);

function toe(x) {
  return (
    0.5 *
    (k3 * x - k1 + Math.sqrt((k3 * x - k1) * (k3 * x - k1) + 4 * k2 * k3 * x))
  );
}

function toeInv(x) {
  return (x * x + k1 * x) / (k3 * (x + k2));
}

function computeMaxSaturation(a, b) {
  let k0, k1, k2, k3, k4, wl, wm, ws;

  if (-1.88170328 * a - 0.80936493 * b > 1) {
    k0 = 1.19086277;
    k1 = 1.76576728;
    k2 = 0.59662641;
    k3 = 0.75515197;
    k4 = 0.56771245;
    wl = mLMSToLinear[0];
    wm = mLMSToLinear[3];
    ws = mLMSToLinear[6];
  } else if (1.81444104 * a - 1.19445276 * b > 1) {
    k0 = 0.73956515;
    k1 = -0.45954404;
    k2 = 0.08285427;
    k3 = 0.1254107;
    k4 = 0.14503204;
    wl = mLMSToLinear[1];
    wm = mLMSToLinear[4];
    ws = mLMSToLinear[7];
  } else {
    k0 = 1.35733652;
    k1 = -0.00915799;
    k2 = -1.1513021;
    k3 = -0.50559606;
    k4 = 0.00692167;
    wl = mLMSToLinear[2];
    wm = mLMSToLinear[5];
    ws = mLMSToLinear[8];
  }

  let S = k0 + k1 * a + k2 * b + k3 * a * a + k4 * a * b;

  const kl = mOklabToLMS[3] * a + mOklabToLMS[6] * b;
  const km = mOklabToLMS[4] * a + mOklabToLMS[7] * b;
  const ks = mOklabToLMS[5] * a + mOklabToLMS[8] * b;

  const l_ = 1 + S * kl;
  const m_ = 1 + S * km;
  const s_ = 1 + S * ks;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const ldS = 3 * kl * l_ * l_;
  const mdS = 3 * km * m_ * m_;
  const sdS = 3 * ks * s_ * s_;

  const ldS2 = 6 * kl * kl * l_;
  const mdS2 = 6 * km * km * m_;
  const sdS2 = 6 * ks * ks * s_;

  const f = wl * l + wm * m + ws * s;
  const f1 = wl * ldS + wm * mdS + ws * sdS;
  const f2 = wl * ldS2 + wm * mdS2 + ws * sdS2;

  return S - (f * f1) / (f1 * f1 - 0.5 * f * f2);
}

function findCusp(a, b) {
  const sCusp = computeMaxSaturation(a, b);

  oklabToLinear(1, sCusp * a, sCusp * b, TMP);

  const lCusp = Math.cbrt(1 / Math.max(TMP[0], TMP[1], TMP[2]));

  return [lCusp, lCusp * sCusp];
}

function getStMax(a_, b_, cusp = null) {
  if (!cusp) cusp = findCusp(a_, b_);
  return [cusp[1] / cusp[0], cusp[1] / (1 - cusp[0])];
}

const findGamutIntersection = (a, b, L1, C1, L0, cusp = null) => {
  if (!cusp) cusp = findCusp(a, b);

  let t;
  if ((L1 - L0) * cusp[1] - (cusp[0] - L0) * C1 <= 0) {
    t = (cusp[1] * L0) / (C1 * cusp[0] + cusp[1] * (L0 - L1));
  } else {
    t = (cusp[1] * (L0 - 1)) / (C1 * (cusp[0] - 1) + cusp[1] * (L0 - L1));

    const dL = L1 - L0;
    const dC = C1;

    const kl = mOklabToLMS[3] * a + mOklabToLMS[6] * b;
    const km = mOklabToLMS[4] * a + mOklabToLMS[7] * b;
    const ks = mOklabToLMS[5] * a + mOklabToLMS[8] * b;

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

    const r =
      mLMSToLinear[0] * l + mLMSToLinear[3] * m + mLMSToLinear[6] * s - 1;
    const r1 =
      mLMSToLinear[0] * ldt + mLMSToLinear[3] * mdt + mLMSToLinear[6] * sdt;
    const r2 =
      mLMSToLinear[0] * ldt2 + mLMSToLinear[3] * mdt2 + mLMSToLinear[6] * sdt2;

    const ur = r1 / (r1 * r1 - 0.5 * r * r2);
    let tr = -r * ur;

    const g =
      mLMSToLinear[1] * l + mLMSToLinear[4] * m + mLMSToLinear[7] * s - 1;
    const g1 =
      mLMSToLinear[1] * ldt + mLMSToLinear[4] * mdt + mLMSToLinear[7] * sdt;
    const g2 =
      mLMSToLinear[1] * ldt2 + mLMSToLinear[4] * mdt2 + mLMSToLinear[7] * sdt2;

    const ug = g1 / (g1 * g1 - 0.5 * g * g2);
    let tg = -g * ug;

    const b0 =
      mLMSToLinear[2] * l + mLMSToLinear[5] * m + mLMSToLinear[8] * s - 1;
    const b1 =
      mLMSToLinear[2] * ldt + mLMSToLinear[5] * mdt + mLMSToLinear[8] * sdt;
    const b2 =
      mLMSToLinear[2] * ldt2 + mLMSToLinear[5] * mdt2 + mLMSToLinear[8] * sdt2;

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

export {
  setAlpha,
  floorArray,
  TMP,
  TAU,
  D65,
  D50,
  // Spaces conversions
  linearToSrgb,
  srgbToLinear,
  linearToRgb,
  rgbToLinear,
  // XYZ/Linear/P3
  xyzD65ToLinear,
  linearToXyzD65,
  xyzD50ToLinear,
  linearToXyzD50,
  linearP3ToXyzD65,
  xyzD65ToLinearP3,
  // Luv/lch/xyz
  xyzToLuv,
  luvToXyz,
  luvToLch,
  lchToLuv,
  hpluvToLch,
  lchToHpluv,
  hsluvToLch,
  lchToHsluv,
  // Lab/Lch
  lchToLab,
  labToLch,
  // Lab/XYZ
  labToXyz,
  xyzToLab,
  // Ok
  oklabToLinear,
  linearToOklab,
  toe,
  toeInv,
  findCusp,
  getStMax,
  findGamutIntersection,
  getCs,
};
