/** @module utils */

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

// XYZ/Linear/P3
// https://github.com/hsluv/hsluv-javascript/blob/14b49e6cf9a9137916096b8487a5372626b57ba4/src/hsluv.ts#L8-L16
const mXYZToLinearsRGBD65 = [
  [3.240969941904521, -1.537383177570093, -0.498610760293],
  [-0.96924363628087, 1.87596750150772, 0.041555057407175],
  [0.055630079696993, -0.20397695888897, 1.056971514242878],
];

// https://github.com/hsluv/hsluv-javascript/blob/14b49e6cf9a9137916096b8487a5372626b57ba4/src/hsluv.ts#L152-L154
const mLinearsRGBToXYZD65 = [
  [0.41239079926595, 0.35758433938387, 0.18048078840183],
  [0.21263900587151, 0.71516867876775, 0.072192315360733],
  [0.019330818715591, 0.11919477979462, 0.95053215224966],
];

// https://github.com/Evercoder/culori/tree/main/src/xyz50
const mXYZToLinearsRGBD50 = [
  [3.1341359569958707, 1.6173863321612538, 0.4906619460083532],
  [-0.978795502912089, 1.916254567259524, 0.03344273116131949],
  [0.07195537988411677, 0.2289768264158322, 1.405386058324125],
];
const mLinearsRGBToXYZD50 = [
  [0.436065742824811, 0.3851514688337912, 0.14307845442264197],
  [0.22249319175623702, 0.7168870538238823, 0.06061979053616537],
  [0.013923904500943465, 0.09708128566574634, 0.7140993584005155],
];

// http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// https://drafts.csswg.org/css-color/#color-conversion-code
const mLinearP3ToXYZD65 = [
  [0.4865709486482162, 0.26566769316909306, 0.1982172852343625],
  [0.2289745640697488, 0.6917385218365064, 0.079286914093745],
  [0, 0.04511338185890264, 1.043944368900976],
];
const mXYZD65ToLinearP3 = [
  [2.493496911941425, -0.9313836179191239, -0.40271078445071684],
  [-0.8294889695615747, 1.7626640603183463, 0.023624685841943577],
  [0.03584583024378447, -0.07617238926804182, 0.9568845240076872],
];

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
    const m1 = mXYZToLinearsRGBD65[c][0];
    const m2 = mXYZToLinearsRGBD65[c][1];
    const m3 = mXYZToLinearsRGBD65[c][2];
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

/**
 * @private
 * @see {@link https://drafts.csswg.org/css-color/#lch-to-lab}
 */
const LCHToLab = (l, c, h, out) => {
  out[0] = l;
  out[1] = c * Math.cos(h * TAU);
  out[2] = c * Math.sin(h * TAU);

  // Range is [0, 150]
  out[1] *= 1.5;
  out[2] *= 1.5;

  return out;
};

/**
 * @private
 * @see {@link https://drafts.csswg.org/css-color/#lab-to-lch}
 */
const labToLCH = (l, a, b, out) => {
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

const labToXYZ = (l, a, b, out, illuminant) => {
  const Y = (l + 0.16) / 1.16;

  out[0] = fromLabValueToXYZValue(a / 5 + Y, illuminant[0]);
  out[1] = fromLabValueToXYZValue(Y, illuminant[1]);
  out[2] = fromLabValueToXYZValue(Y - b / 2, illuminant[2]);
};

const XYZToLab = (x, y, z, out, illuminant) => {
  const X = fromXYZValueToLabValue(x, illuminant[0]);
  const Y = fromXYZValueToLabValue(y, illuminant[1]);
  const Z = fromXYZValueToLabValue(z, illuminant[2]);

  out[0] = 1.16 * Y - 0.16;
  out[1] = 5 * (X - Y);
  out[2] = 2 * (Y - Z);
  return out;
};

// Ok
// https://github.com/bottosson/bottosson.github.io/blob/master/misc/colorpicker/colorconversion.js
const oklabToLinear = (L, a, b, out) => {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  out[0] = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  out[1] = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  out[2] = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return out;
};

const linearToOklab = (lr, lg, lb, out) => {
  const l = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb,
  );
  const m = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb,
  );
  const s = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb,
  );

  out[0] = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  out[1] = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  out[2] = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  return out;
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
    wl = 4.0767416621;
    wm = -3.3077115913;
    ws = 0.2309699292;
  } else if (1.81444104 * a - 1.19445276 * b > 1) {
    k0 = 0.73956515;
    k1 = -0.45954404;
    k2 = 0.08285427;
    k3 = 0.1254107;
    k4 = 0.14503204;
    wl = -1.2684380046;
    wm = 2.6097574011;
    ws = -0.3413193965;
  } else {
    k0 = 1.35733652;
    k1 = -0.00915799;
    k2 = -1.1513021;
    k3 = -0.50559606;
    k4 = 0.00692167;
    wl = -0.0041960863;
    wm = -0.7034186147;
    ws = 1.707614701;
  }

  let S = k0 + k1 * a + k2 * b + k3 * a * a + k4 * a * b;

  const kl = 0.3963377774 * a + 0.2158037573 * b;
  const km = -0.1055613458 * a - 0.0638541728 * b;
  const ks = -0.0894841775 * a - 1.291485548 * b;

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

  S = S - (f * f1) / (f1 * f1 - 0.5 * f * f2);

  return S;
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
  // XYZ/Linear/P3
  mXYZToLinearsRGBD65,
  mLinearsRGBToXYZD65,
  mXYZToLinearsRGBD50,
  mLinearsRGBToXYZD50,
  mLinearP3ToXYZD65,
  mXYZD65ToLinearP3,
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
  LCHToLab,
  labToLCH,
  // Lab/XYZ
  labToXYZ,
  XYZToLab,
  // Ok
  oklabToLinear,
  linearToOklab,
  toe,
  toeInv,
  findCusp,
  getStMax,
};
