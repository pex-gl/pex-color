// https://github.com/hsluv/hsluv/tree/master/haxe/src/hsluv
export const m = [
  [3.240969941904521, -1.537383177570093, -0.498610760293],
  [-0.96924363628087, 1.87596750150772, 0.041555057407175],
  [0.055630079696993, -0.20397695888897, 1.056971514242878],
];

export const minv = [
  [0.41239079926595, 0.35758433938387, 0.18048078840183],
  [0.21263900587151, 0.71516867876775, 0.072192315360733],
  [0.019330818715591, 0.11919477979462, 0.95053215224966],
];

const REF_Y = 1;
const REF_U = 0.19783000664283;
const REF_V = 0.46831999493879;
const KAPPA = 903.2962962;
const EPSILON = 0.0088564516;

const yToL = (Y) =>
  Y <= EPSILON ? (Y / REF_Y) * KAPPA : 116 * (Y / REF_Y) ** (1 / 3) - 16;

const lToY = (L) =>
  L <= 8 ? (REF_Y * L) / KAPPA : REF_Y * ((L + 16) / 116) ** 3;

export const xyzToLuv = ([X, Y, Z]) => {
  const divider = X + 15 * Y + 3 * Z;
  let varU = 4 * X;
  let varV = 9 * Y;
  if (divider != 0) {
    varU /= divider;
    varV /= divider;
  } else {
    varU = NaN;
    varV = NaN;
  }
  const L = yToL(Y);
  if (L == 0) return [0, 0, 0];

  return [L, 13 * L * (varU - REF_U), 13 * L * (varV - REF_V)];
};

export const luvToXyz = ([L, U, V]) => {
  if (L == 0) return [0, 0, 0];
  const varU = U / (13 * L) + REF_U;
  const varV = V / (13 * L) + REF_V;
  const Y = lToY(L);
  const X = 0 - (9 * Y * varU) / ((varU - 4) * varV - varU * varV);
  return [X, Y, (9 * Y - 15 * varV * Y - varV * X) / (3 * varV)];
};

export const luvToLch = ([L, U, V]) => {
  const C = Math.sqrt(U * U + V * V);
  let H;
  if (C < 0.00000001) {
    H = 0;
  } else {
    const Hrad = Math.atan2(V, U);
    H = (Hrad * 180) / Math.PI;
    if (H < 0) H = 360 + H;
  }
  return [L, C, H];
};

export const lchToLuv = ([L, C, H]) => {
  const Hrad = (H / 360) * 2 * Math.PI;
  return [L, Math.cos(Hrad) * C, Math.sin(Hrad) * C];
};

export const getBounds = (L) => {
  const result = [];
  const sub1 = (L + 16) ** 3 / 1560896;
  const sub2 = sub1 > EPSILON ? sub1 : L / KAPPA;
  let _g = 0;
  while (_g < 3) {
    const c = _g++;
    const m1 = m[c][0];
    const m2 = m[c][1];
    const m3 = m[c][2];
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

export const fromLinear = (c) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;

export const toLinear = (c) =>
  c > 0.04045 ? ((c + 0.055) / 1.055) ** 2.4 : c / 12.92;
