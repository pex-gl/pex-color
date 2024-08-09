/** @module utils */

export const setAlpha = (color, a) => {
  if (a !== undefined) color[3] = a;
  return color;
};

/**
 * Convert component from linear value
 * @param {number} c
 * @returns {number}
 */
export const linearToSrgb = (c) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

/**
 * Convert component to linear value
 * @param {number} c
 * @returns {number}
 */
export const srgbToLinear = (c) =>
  c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92;

export const floorArray = (color, precision = 5) => {
  const p = 10 ** precision;
  color.forEach(
    (n, i) => (color[i] = Math.floor((n + Number.EPSILON) * p) / p),
  );
  return color;
};

export const TMP = [0, 0, 0];

export const TAU = 2 * Math.PI;

// XYZ
// https://github.com/hsluv/hsluv-javascript/blob/14b49e6cf9a9137916096b8487a5372626b57ba4/src/hsluv.ts#L8-L16
export const mXYZToLinearsRGBD65 = [
  [3.240969941904521, -1.537383177570093, -0.498610760293],
  [-0.96924363628087, 1.87596750150772, 0.041555057407175],
  [0.055630079696993, -0.20397695888897, 1.056971514242878],
];

// https://github.com/hsluv/hsluv-javascript/blob/14b49e6cf9a9137916096b8487a5372626b57ba4/src/hsluv.ts#L152-L154
export const mLinearsRGBToXYZD65 = [
  [0.41239079926595, 0.35758433938387, 0.18048078840183],
  [0.21263900587151, 0.71516867876775, 0.072192315360733],
  [0.019330818715591, 0.11919477979462, 0.95053215224966],
];

// https://github.com/Evercoder/culori/tree/main/src/xyz50
export const mXYZToLinearsRGBD50 = [
  [3.1341359569958707, 1.6173863321612538, 0.4906619460083532],
  [-0.978795502912089, 1.916254567259524, 0.03344273116131949],
  [0.07195537988411677, 0.2289768264158322, 1.405386058324125],
];
export const mLinearsRGBToXYZD50 = [
  [0.436065742824811, 0.3851514688337912, 0.14307845442264197],
  [0.22249319175623702, 0.7168870538238823, 0.06061979053616537],
  [0.013923904500943465, 0.09708128566574634, 0.7140993584005155],
];

// HSLuv
// https://github.com/hsluv/hsluv-javascript/blob/main/src/hsluv.ts
export const L_EPSILON = 1e-10;

const REF_U = 0.19783000664283;
const REF_V = 0.46831999493879;
const KAPPA = 9.032962962;
const EPSILON = 0.000088564516;

const yToL = (Y) => (Y <= EPSILON ? Y * KAPPA : 1.16 * Y ** (1 / 3) - 0.16);

const lToY = (L) => (L <= 0.08 ? L / KAPPA : ((L + 0.16) / 1.16) ** 3);

export const xyzToLuv = ([X, Y, Z]) => {
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
  if (L === 0) return [0, 0, 0];

  return [L, 13 * L * (varU - REF_U), 13 * L * (varV - REF_V)];
};

export const luvToXyz = ([L, U, V]) => {
  if (L === 0) return [0, 0, 0];
  const varU = U / (13 * L) + REF_U;
  const varV = V / (13 * L) + REF_V;
  const Y = lToY(L);
  const X = 0 - (9 * Y * varU) / ((varU - 4) * varV - varU * varV);
  return [X, Y, (9 * Y - 15 * varV * Y - varV * X) / (3 * varV)];
};

export const luvToLch = ([L, U, V]) => {
  const C = Math.sqrt(U * U + V * V);
  let H;
  if (C < L_EPSILON) {
    H = 0;
  } else {
    H = Math.atan2(V, U) / TAU;
    if (H < 0) H = 1 + H;
  }
  return [L, C, H];
};

export const lchToLuv = ([L, C, H]) => {
  const Hrad = H * TAU;
  return [L, Math.cos(Hrad) * C, Math.sin(Hrad) * C];
};

// TODO: normalize
export const getBounds = (L) => {
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

// Okhsl/Okhsv
// https://github.com/bottosson/bottosson.github.io/blob/master/misc/colorpicker/colorconversion.js
export function oklabToLinearSrgb(color, L, a, b) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  color[0] = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  color[1] = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  color[2] = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  return color;
}

const k1 = 0.206;
const k2 = 0.03;
const k3 = (1 + k1) / (1 + k2);

export function toe(x) {
  return (
    0.5 *
    (k3 * x - k1 + Math.sqrt((k3 * x - k1) * (k3 * x - k1) + 4 * k2 * k3 * x))
  );
}

export function toeInv(x) {
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

export function findCusp(a, b) {
  const sCusp = computeMaxSaturation(a, b);

  oklabToLinearSrgb(TMP, 1, sCusp * a, sCusp * b);

  const lCusp = Math.cbrt(1 / Math.max(TMP[0], TMP[1], TMP[2]));

  return [lCusp, lCusp * sCusp];
}

export function getStMax(a_, b_, cusp = null) {
  if (!cusp) cusp = findCusp(a_, b_);
  return [cusp[1] / cusp[0], cusp[1] / (1 - cusp[0])];
}
