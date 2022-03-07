import { fromLinear, setAlpha, toLinear } from "./utils.js";

/**
 * @typedef {number[]} oklab Components range: 0 <= l <= 100; -128 <= a <= 127; -128 <= b <= 127;
 * @see {@link https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab}
 */

/**
 * Updates a color based on Oklab values and alpha.
 * @param {color} color
 * @param {number} l
 * @param {number} a
 * @param {number} b
 * @param {number} [α]
 * @return {color}
 */
export function fromOklab(color, L, a, b, α) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;

  color[0] = fromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s);
  color[1] = fromLinear(
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  );
  color[2] = fromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s);

  return setAlpha(color, α);
}

/**
 * Returns an Oklab representation of a given color.
 * @param {color} color
 * @param {Array} out
 * @return {oklab}
 */
export function getOklab([r, g, b, a], out = []) {
  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);
  const l = Math.cbrt(
    0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  );
  const m = Math.cbrt(
    0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  );
  const s = Math.cbrt(
    0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb
  );

  out[0] = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  out[1] = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  out[2] = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return setAlpha(out, a);
}
