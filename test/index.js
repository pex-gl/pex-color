import { deepEqual } from "assert";
import color from "../index.js";

const EPSILON = 0.001;

function assertDeepAlmostEqual(a, b, e = EPSILON) {
  if (a.length != b.length) {
    throw new Error(`${a} assertDeepAlmostEqual ${b}`);
  }
  for (let i = 0; i < a.length; i++) {
    if (Math.abs(a[i] - b[i]) > e) {
      throw new Error(
        `${a} assertDeepAlmostEqual ${b} (diff=${Math.abs(a[i] - b[i])})`
      );
    }
  }
  return true;
}

console.log("> create()");

deepEqual(color.create(0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);
deepEqual(color.create(0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1]);

console.log("> copy()");
deepEqual(color.copy([0.1, 0.2, 0.3, 0.4]), [0.1, 0.2, 0.3, 0.4]);

console.log("> set()");
deepEqual(color.set(color.create(), [0.1, 0.2, 0.3]), [0.1, 0.2, 0.3, 1]);
deepEqual(
  color.set(color.create(), [0.1, 0.2, 0.3, 0.4]),
  [0.1, 0.2, 0.3, 0.4]
);

console.log("> RGB");
deepEqual(color.fromRGB(0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1]);
deepEqual(color.fromRGB(0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);
deepEqual(color.setRGB(color.create(), 0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1]);
deepEqual(
  color.setRGB(color.create(), 0.1, 0.2, 0.3, 0.4),
  [0.1, 0.2, 0.3, 0.4]
);

console.log("> RGBBytes");
deepEqual(color.fromRGBBytes([222, 100, 125]), [
  222 / 255,
  100 / 255,
  125 / 255,
  1,
]);
deepEqual(color.fromRGBBytes([222, 100, 125, 23]), [
  222 / 255,
  100 / 255,
  125 / 255,
  23 / 255,
]);
deepEqual(color.setRGBBytes(color.create(), 222, 100, 125), [
  222 / 255,
  100 / 255,
  125 / 255,
  1,
]);
deepEqual(color.setRGBBytes(color.create(), 222, 100, 125, 23), [
  222 / 255,
  100 / 255,
  125 / 255,
  23 / 255,
]);
deepEqual(
  color.getRGBBytes([222 / 255, 100 / 255, 125 / 255]),
  [222, 100, 125]
);
deepEqual(
  color.getRGBBytes([222 / 255, 100 / 255, 125 / 255, 23 / 255]),
  [222, 100, 125, 23]
);

console.log("> HSV");
deepEqual(color.fromHSV(0, 1, 1), [1, 0, 0, 1]);
deepEqual(color.fromHSV(0, 0.5, 1), [1, 0.5, 0.5, 1]);
assertDeepAlmostEqual(color.fromHSV(0.333333333333, 1, 1), [0, 1, 0, 1]);
assertDeepAlmostEqual(
  color.fromHSV(0.333333333333, 0.5, 0.5),
  [0.25, 0.5, 0.25, 1]
);
assertDeepAlmostEqual(
  color.setHSV(color.create(), 0.333333333333, 0.5, 0.5),
  [0.25, 0.5, 0.25, 1]
);
assertDeepAlmostEqual(color.getHSV([1, 0, 0, 1]), [0, 1, 1, 1]);
assertDeepAlmostEqual(
  color.getHSV([0.25, 0.5, 0.25, 0.5]),
  [0.333333333333, 0.5, 0.5, 0.5]
);

console.log("> HSL");
deepEqual(color.fromHSL(0, 1, 0.5), [1, 0, 0, 1]);
assertDeepAlmostEqual(color.fromHSL(0.333333333333, 1, 0.5), [0, 1, 0, 1]);
deepEqual(color.fromHSL(0.5, 1, 0.5), [0, 0.9999999999999998, 1, 1]);
deepEqual(color.setHSL(color.create(), 0, 1, 0.5), [1, 0, 0, 1]);
deepEqual(color.getHSL([1, 0, 0, 1]), [0, 1, 0.5, 1]);

console.log("> HEX");
// 0.4 = 102/255 = #66
// 0.5 = 127.5/255 = #80
deepEqual(color.fromHex("#FF0000"), [1, 0, 0, 1]);
deepEqual(color.fromHex("#00FF00"), [0, 1, 0, 1]);
deepEqual(color.fromHex("#0000FF"), [0, 0, 1, 1]);
deepEqual(color.setHex(color.create(), "#FF0066"), [1, 0, 0.4, 1]);

// Leading #
deepEqual(color.fromHex("000000"), [0, 0, 0, 1]);
deepEqual(color.fromHex("ffffff"), [1, 1, 1, 1]);
deepEqual(color.fromHex("ff0066"), [1, 0, 0.4, 1]);
deepEqual(color.fromHex("F06"), [1, 0, 0.4, 1]);
deepEqual(color.fromHex("FF006666"), [1, 0, 0.4, 0.4]);

const hexEPSILON = 0.5 / 255 + Number.EPSILON;
// Alpha
deepEqual(color.fromHex("#00000000"), [0, 0, 0, 0]);
assertDeepAlmostEqual(color.fromHex("#00000080"), [0, 0, 0, 0.5], hexEPSILON);
deepEqual(color.fromHex("#000000"), [0, 0, 0, 1]);
deepEqual(color.fromHex("#FFFFFFFF"), [1, 1, 1, 1]);
assertDeepAlmostEqual(color.fromHex("#FFFFFF80"), [1, 1, 1, 0.5], hexEPSILON);
deepEqual(color.fromHex("#FFFFFF"), [1, 1, 1, 1]);
deepEqual(color.fromHex("#FF0066"), [1, 0, 0.4, 1]);
deepEqual(color.fromHex("#FF006666"), [1, 0, 0.4, 0.4]);

// RGB[A]
deepEqual(color.fromHex("#F06"), [1, 0, 0.4, 1]);
deepEqual(color.fromHex("#F066"), [1, 0, 0.4, 0.4]);

deepEqual(color.getHex([0, 0, 0]), "#000000");
deepEqual(color.getHex([0, 0, 0, 0]), "#00000000");
deepEqual(color.getHex([0, 0, 0, 0.5]), "#00000080");
deepEqual(color.getHex([1, 1, 1]), "#FFFFFF");
deepEqual(color.getHex([1, 1, 1, 1]), "#FFFFFF");
deepEqual(color.getHex([1, 1, 1, 0.5]), "#FFFFFF80");
deepEqual(color.getHex([1, 0, 0.4]), "#FF0066");
deepEqual(color.getHex([1, 0, 0.4, 1]), "#FF0066");
deepEqual(color.getHex([1, 0, 0.4, 0.4]), "#FF006666");

console.log("> LAB");
const yellow = [1, 1, 0, 1];
const yellowLab = [97.13824698129729, -21.555908334832285, 94.48248544644461];
assertDeepAlmostEqual(color.fromLab(...yellowLab), yellow);
assertDeepAlmostEqual(color.setLab(color.create(), ...yellowLab), yellow);
// assertDeepAlmostEqual(color.getLab(yellow), yellowLab);

// Deprecated
deepEqual(color.copy([0.1, 0.2, 0.3], [0, 0, 0]), [0.1, 0.2, 0.3]);
deepEqual(color.copy([0.1, 0.2, 0.3, 0.4], [0, 0, 0]), [0.1, 0.2, 0.3, 0.4]);
deepEqual(color.set([0, 0, 0], 0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1]);
deepEqual(color.set([0, 0, 0], 0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);

console.log("Done");
