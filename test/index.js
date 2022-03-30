import { deepEqual } from "assert";
import * as color from "../index.js";

// TODO: HSV and HSL switch case

const DEFAULT_ALPHA = 1;
const TEMP_VEC3 = [0, 0, 0];

function deepAlmostEqual(a, b, epsilon = 0.001) {
  if (a.length != b.length) throw new Error(`deepAlmostEqual:\n${a}\n${b}`);
  for (let i = 0; i < a.length; i++) {
    if (!Number.isFinite(a[i]) || !Number.isFinite(b[[i]])) {
      throw new Error(`deepAlmostEqual (not finite):\n${a}\n${b}`);
    }
    if (Math.abs(a[i] - b[i]) > epsilon) {
      throw new Error(
        `deepAlmostEqual (at "${i}" diff=${Math.abs(a[i] - b[i])}):\n${a}\n${b}`
      );
    }
  }
}

describe("create()", () => {
  it("should create a color from RGBA values", () => {
    deepEqual(color.create(0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);
  });
  it("should create a color from RGBA values and set the default alpha to 1", () => {
    deepEqual(color.create(0.1, 0.2, 0.3), [0.1, 0.2, 0.3, DEFAULT_ALPHA]);
  });
});

describe("copy()", () => {
  it("should copy each components", () => {
    deepEqual(color.copy([0.1, 0.2, 0.3]), [0.1, 0.2, 0.3]);
    deepEqual(color.copy([0.1, 0.2, 0.3, 0.4]), [0.1, 0.2, 0.3, 0.4]);
  });
});

describe("set()", () => {
  it("should set a color", () => {
    deepEqual(color.set(TEMP_VEC3, [0.1, 0.2, 0.3]), [0.1, 0.2, 0.3]);
  });
  it("should set a color with supplied alpha", () => {
    deepEqual(
      color.set(color.create(), [0.1, 0.2, 0.3, 0.4]),
      [0.1, 0.2, 0.3, 0.4]
    );
  });
  it("should set a color and keep the color alpha", () => {
    deepEqual(color.set(color.create(), [0.1, 0.2, 0.3]), [
      0.1,
      0.2,
      0.3,
      DEFAULT_ALPHA,
    ]);
  });
});

describe("RGB", () => {
  describe("set", () => {
    it("should set a color", () => {
      deepEqual(color.fromRGB(TEMP_VEC3, 0.1, 0.2, 0.3), [0.1, 0.2, 0.3]);
    });
    it("should set a color with supplied alpha", () => {
      deepEqual(
        color.fromRGB(color.create(), 0.1, 0.2, 0.3, 0.4),
        [0.1, 0.2, 0.3, 0.4]
      );
    });
    it("should set a color and keep the color alpha", () => {
      deepEqual(color.fromRGB(color.create(), 0.1, 0.2, 0.3), [
        0.1,
        0.2,
        0.3,
        DEFAULT_ALPHA,
      ]);
    });
  });
});

describe("RGBBytes", () => {
  describe("set", () => {
    it("should set a color from a RGB Bytes array", () => {
      deepEqual(color.fromRGBBytes(TEMP_VEC3, [222, 100, 125]), [
        222 / 255,
        100 / 255,
        125 / 255,
      ]);
    });
    it("should set a color from a RGB Bytes array with supplied alpha", () => {
      deepEqual(color.fromRGBBytes(color.create(), [222, 100, 125, 23]), [
        222 / 255,
        100 / 255,
        125 / 255,
        23 / 255,
      ]);
    });
    it("should set a color from a RGB Bytes array and keep the color alpha", () => {
      deepEqual(color.fromRGBBytes(color.create(), [222, 100, 125]), [
        222 / 255,
        100 / 255,
        125 / 255,
        DEFAULT_ALPHA,
      ]);
    });
  });

  describe("get", () => {
    it("should return a RGBA Bytes array from a color with supplied alpha", () => {
      deepEqual(
        color.getRGBBytes([222 / 255, 100 / 255, 125 / 255, 23 / 255]),
        [222, 100, 125, 23]
      );
    });
    it("should return a RGB Bytes array from a color", () => {
      deepEqual(
        color.getRGBBytes([222 / 255, 100 / 255, 125 / 255]),
        [222, 100, 125]
      );
    });
  });
});

// Colors
// 0.4 = 102/255 = #66
// 0.5 = 127.5/255 = #80
// Half byte epsilon
const hexEPSILON = 0.5 / 255 + Number.EPSILON;

describe("HEX", () => {
  describe("from", () => {
    it("should create primary and B&W colors from HEX strings", () => {
      deepEqual(color.fromHex(TEMP_VEC3, "#FF0000"), [1, 0, 0]);
      deepEqual(color.fromHex(TEMP_VEC3, "#00FF00"), [0, 1, 0]);
      deepEqual(color.fromHex(TEMP_VEC3, "#0000FF"), [0, 0, 1]);
      deepEqual(color.fromHex(TEMP_VEC3, "#000000"), [0, 0, 0]);
      deepEqual(color.fromHex(TEMP_VEC3, "#FFFFFF"), [1, 1, 1]);
    });
    it("should set a color from a HEX string and keep the color alpha", () => {
      deepEqual(color.fromHex(color.create(), "#FF0000"), [
        1,
        0,
        0,
        DEFAULT_ALPHA,
      ]);
    });
    it("should create a color with alpha from a 8 characters HEX string", () => {
      deepEqual(color.fromHex(color.create(), "#00000000"), [0, 0, 0, 0]);
      deepAlmostEqual(
        color.fromHex(color.create(), "#00000080"),
        [0, 0, 0, 0.5],
        hexEPSILON
      );
      deepEqual(color.fromHex(color.create(), "#FFFFFFFF"), [1, 1, 1, 1]);
      deepAlmostEqual(
        color.fromHex(color.create(), "#FFFFFF80"),
        [1, 1, 1, 0.5],
        hexEPSILON
      );
      deepEqual(color.fromHex(color.create(), "#FF006666"), [1, 0, 0.4, 0.4]);
    });
    it("should create a color from a 3 characters HEX string and keep the color alpha", () => {
      deepEqual(color.fromHex(color.create(), "#F06"), [
        1,
        0,
        0.4,
        DEFAULT_ALPHA,
      ]);
    });
    it("should create a color with alpha from a 4 characters HEX string", () => {
      deepEqual(color.fromHex(color.create(), "#F066"), [1, 0, 0.4, 0.4]);
    });
    it("should create a color from a HEX string without leading #", () => {
      deepEqual(color.fromHex(color.create(), "000000"), [
        0,
        0,
        0,
        DEFAULT_ALPHA,
      ]);
      deepEqual(color.fromHex(color.create(), "ffffff"), [
        1,
        1,
        1,
        DEFAULT_ALPHA,
      ]);
      deepEqual(color.fromHex(color.create(), "ff0066"), [
        1,
        0,
        0.4,
        DEFAULT_ALPHA,
      ]);
      deepEqual(color.fromHex(color.create(), "FF006666"), [1, 0, 0.4, 0.4]);
      deepEqual(color.fromHex(color.create(), "F06"), [
        1,
        0,
        0.4,
        DEFAULT_ALPHA,
      ]);
      deepEqual(color.fromHex(color.create(), "F066"), [1, 0, 0.4, 0.4]);
    });
    it("should create a color from a HEX string and keep the color alpha", () => {
      deepEqual(color.fromHex(color.create(), "#FF0066"), [
        1,
        0,
        0.4,
        DEFAULT_ALPHA,
      ]);
    });
  });

  describe("get", () => {
    it("should return a HEX string for black color without alpha (6 characters)", () => {
      deepEqual(color.getHex([0, 0, 0]), "#000000");
    });
    it("should return a HEX string for black color with alpha 0 (8 characters)", () => {
      deepEqual(color.getHex([0, 0, 0, 0]), "#00000000");
    });
    it("should return a HEX string for black color with alpha 0.5 (8 characters)", () => {
      deepEqual(color.getHex([0, 0, 0, 0.5]), "#00000080");
    });
    it("should return a HEX string for black color with alpha 1 (6 characters)", () => {
      deepEqual(color.getHex([0, 0, 0, 1]), "#000000");
    });

    it("should return a HEX string for white color without alpha (6 characters)", () => {
      deepEqual(color.getHex([1, 1, 1]), "#FFFFFF");
    });
    it("should return a HEX string for white color with alpha 0 (8 characters)", () => {
      deepEqual(color.getHex([1, 1, 1, 0]), "#FFFFFF00");
    });
    it("should return a HEX string for white color with alpha 0.5 (8 characters)", () => {
      deepEqual(color.getHex([1, 1, 1, 0.5]), "#FFFFFF80");
    });
    it("should return a HEX string for white color with alpha 1 (6 characters)", () => {
      deepEqual(color.getHex([1, 1, 1, 1]), "#FFFFFF");
    });

    it("should return a HEX string for color without alpha (6 characters)", () => {
      deepEqual(color.getHex([1, 0, 0.4]), "#FF0066");
    });
    it("should return a HEX string for color with alpha 0 (8 characters)", () => {
      deepEqual(color.getHex([1, 0, 0.4, 0]), "#FF006600");
    });
    it("should return a HEX string for color with alpha 0.4 (8 characters)", () => {
      deepEqual(color.getHex([1, 0, 0.4, 0.4]), "#FF006666");
    });
    it("should return a HEX string for color with alpha 1 (6 characters)", () => {
      deepEqual(color.getHex([1, 0, 0.4, 1]), "#FF0066");
    });
  });
});

const NORMALIZE_VALUES = {
  hue: [360, 100, 100],
  hueReversed: [100, 100, 360],
  hueOnly: [360, 1, 1],
  percent: [100, 100, 100],
};

const normalize = (c, mode = "hue") =>
  c.map((n, i) => n / NORMALIZE_VALUES[mode][i]);

const epsilons = {
  XYZ: 3 / (95 + 100 + 108) + Number.EPSILON,
  Lab: 0.00002,
  LCHuv: 0.0088564516,
  HSLuv: 0.0088564516,
  HPLuv: 0.0088564516,
  Okhsv: 10e-6,
};

// References:
// https://ajalt.github.io/colormath/converter/
// https://culorijs.org/color-spaces/

// #000000
const BLACK = {
  rgb: [0, 0, 0],
  rgbaHalfAlpha: [0, 0, 0, 0.5],
  rgbaDefaultAlpha: [0, 0, 0, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [0, 0, 0],
    RGB: [0, 0, 0],
    HSL: normalize([0, 0, 0], "hueOnly"),
    HWB: normalize([0, 0, 1], "hueOnly"),
    HSV: normalize([0, 0, 0], "hueOnly"),
    XYZ: [0, 0, 0],
    Lab: normalize([0, 0, 0], "percent"),
    Oklab: [0, 0, 0],
    // Okhsv: normalize([0, 0, 0], "hueOnly"),
    // Okhsl: normalize([0, 0, 0], "hueOnly"),
    LCHuv: normalize([0, 0, 0], "hueReversed"),
    HSLuv: normalize([0, 0, 0]),
    HPLuv: normalize([0, 0, 0]),
  },
};
// #ffffff
const WHITE = {
  rgb: [1, 1, 1],
  rgbaHalfAlpha: [1, 1, 1, 0.5],
  rgbaDefaultAlpha: [1, 1, 1, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [255, 255, 255],
    RGB: [1, 1, 1],
    HSL: normalize([0, 0, 1], "hueOnly"),
    HWB: normalize([0, 1, 0], "hueOnly"),
    HSV: normalize([0, 0, 1], "hueOnly"),
    XYZ: [0.95046, 1, 1.08906],
    Lab: normalize([100, -0.00001, -0], "percent"),
    Oklab: [1, 0, 0],
    // Okhsv: normalize([0, 0, 0.9999999923961898], "hueOnly"),
    // Okhsl: normalize([0, 0, 0.9999999923961898], "hueOnly"),
    LCHuv: normalize([100, 0.00001, 0], "hueReversed"),
    HSLuv: normalize([0, 0, 100]),
    HPLuv: normalize([0, 0, 100]),
  },
};
// #ff0000
const RED = {
  rgb: [1, 0, 0],
  rgbaHalfAlpha: [1, 0, 0, 0.5],
  rgbaDefaultAlpha: [1, 0, 0, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [255, 0, 0],
    RGB: [1, 0, 0],
    HSL: normalize([0, 1, 0.5], "hueOnly"),
    HWB: normalize([0, 0, 0], "hueOnly"),
    HSV: normalize([0, 1, 1], "hueOnly"),
    XYZ: [0.41239, 0.21264, 0.01933],
    Lab: normalize([53.23711, 80.0901, 67.20326], "percent"),
    Oklab: [0.62796, 0.22486, 0.12585],
    Okhsv: normalize(
      [29.23388519234263, 0.9995219692256989, 1.0000000001685625],
      "hueOnly"
    ),
    Okhsl: normalize(
      [29.233885192342633, 1.0000000001433997, 0.5680846525040862],
      "hueOnly"
    ),
    LCHuv: normalize([53.23711, 179.03809, 12.17705], "hueReversed"),
    HSLuv: normalize([12.17705, 100, 53.23711]),
    HPLuv: normalize([12.17705, 426.74677, 53.23711]),
  },
};
// #00ff00
const GREEN = {
  rgb: [0, 1, 0],
  rgbaHalfAlpha: [0, 1, 0, 0.5],
  rgbaDefaultAlpha: [0, 1, 0, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [0, 255, 0],
    RGB: [0, 1, 0],
    HSL: normalize([120, 1, 0.5], "hueOnly"),
    HWB: normalize([120, 0, 0], "hueOnly"),
    HSV: normalize([120, 1, 1], "hueOnly"),
    XYZ: [0.35758, 0.71517, 0.11919],
    Lab: normalize([87.73552, -86.18159, 83.18662], "percent"),
    Oklab: [0.86644, -0.23389, 0.1795],
    Okhsv: normalize(
      [142.49533888780996, 0.9999997210415695, 0.9999999884428648],
      "hueOnly"
    ),
    Okhsl: normalize(
      [142.49533888780996, 0.9999999700728788, 0.8445289645307816],
      "hueOnly"
    ),
    LCHuv: normalize([87.73552, 135.78954, 127.71501], "hueReversed"),
    HSLuv: normalize([127.71501, 100.00002, 87.73552]),
    HPLuv: normalize([127.71501, 490.14551, 87.73552]),
  },
};
// #0000ff
const BLUE = {
  rgb: [0, 0, 1],
  rgbaHalfAlpha: [0, 0, 1, 0.5],
  rgbaDefaultAlpha: [0, 0, 1, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [0, 0, 255],
    RGB: [0, 0, 1],
    HSL: normalize([240, 1, 0.5], "hueOnly"),
    HWB: normalize([240, 0, 0], "hueOnly"),
    HSV: normalize([240, 1, 1], "hueOnly"),
    XYZ: [0.18048, 0.07219, 0.95053],
    Lab: normalize([32.30087, 79.19527, -107.85547], "percent"),
    Oklab: [0.45201, -0.03246, -0.31153],
    Okhsv: normalize(
      [264.052020638055, 0.9999910912349018, 0.9999999646150918],
      "hueOnly"
    ),
    Okhsl: normalize(
      [264.052020638055, 0.9999999948631134, 0.3665653394260194],
      "hueOnly"
    ),
    LCHuv: normalize([32.30087, 130.68976, 265.87433], "hueReversed"),
    HSLuv: normalize([265.87433, 100.00001, 32.30087]),
    HPLuv: normalize([265.87433, 513.41272, 32.30087]),
  },
};
// #996600
const REDISH = {
  rgb: [0.6, 0.4, 0],
  rgbaHalfAlpha: [0.6, 0.4, 0, 0.5],
  rgbaDefaultAlpha: [0.6, 0.4, 0, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [153, 102, 0],
    RGB: [0.6, 0.4, 0],
    HSL: normalize([40, 1, 0.3], "hueOnly"),
    HWB: normalize([40, 0, 0.4], "hueOnly"),
    HSV: normalize([40, 1, 0.6], "hueOnly"),
    XYZ: [0.17888, 0.16276, 0.02199],
    Lab: normalize([47.33437, 13.54214, 54.73176], "percent"),
    Oklab: [0.55095, 0.0306, 0.11226],
    Okhsv: normalize(
      [74.75379889044393, 1.0000002972354225, 0.6207721901139777],
      "hueOnly"
    ),
    Okhsl: normalize(
      [74.75379889044393, 1.0000005311213358, 0.4794536971325027],
      "hueOnly"
    ),
    LCHuv: normalize([47.33437, 63.42409, 48.32603], "hueReversed"),
    HSLuv: normalize([48.32603, 100, 47.33437]),
    HPLuv: normalize([48.32603, 170.02666, 47.33437]),
  },
};
// #669900
const GREENISH = {
  rgb: [0.4, 0.6, 0],
  rgbaHalfAlpha: [0.4, 0.6, 0, 0.5],
  rgbaDefaultAlpha: [0.4, 0.6, 0, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [102, 153, 0],
    RGB: [0.4, 0.6, 0],
    HSL: normalize([80, 1, 0.3], "hueOnly"),
    HWB: normalize([80, 0, 0.4], "hueOnly"),
    HSV: normalize([80, 1, 0.6], "hueOnly"),
    XYZ: [0.1687, 0.25607, 0.04054],
    Lab: normalize([57.6619, -36.5132, 60.22545], "percent"),
    Oklab: [0.62281, -0.1053, 0.12838],
    Okhsv: normalize(
      [129.35912795086736, 1.000000322921449, 0.627184884769579],
      "hueOnly"
    ),
    Okhsl: normalize(
      [129.35912795086736, 1.000000200575059, 0.5621438986083056],
      "hueOnly"
    ),
    LCHuv: normalize([57.6619, 71.91135, 111.0721], "hueReversed"),
    HSLuv: normalize([111.0721, 100, 57.6619]),
    HPLuv: normalize([111.0721, 158.2515, 57.6619]),
  },
};

// #006699
const BLUEISH = {
  rgb: [0, 0.4, 0.6],
  rgbaHalfAlpha: [0, 0.4, 0.6, 0.5],
  rgbaDefaultAlpha: [0, 0.4, 0.6, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [0, 102, 153],
    RGB: [0, 0.4, 0.6],
    HSL: normalize([200, 1, 0.3], "hueOnly"),
    HWB: normalize([200, 0, 0.4], "hueOnly"),
    HSV: normalize([200, 1, 0.6], "hueOnly"),
    XYZ: [0.105, 0.11802, 0.31863],
    Lab: normalize([40.89967, -5.34064, -34.66923], "percent"),
    Oklab: [0.4874, -0.05526, -0.09869],
    Okhsv: normalize(
      [240.75638349884343, 0.9999999385486986, 0.6137786875652734],
      "hueOnly"
    ),
    Okhsl: normalize(
      [240.75638349884343, 0.999999838986226, 0.4067767796962403],
      "hueOnly"
    ),
    LCHuv: normalize([40.89967, 56.07965, 242.02414], "hueReversed"),
    HSLuv: normalize([242.02414, 100.00001, 40.89967]),
    HPLuv: normalize([242.02414, 173.99023, 40.89967]),
  },
};
// #ff0066
const PINKISH = {
  rgb: [1, 0, 0.4],
  rgbaHalfAlpha: [1, 0, 0.4, 0.5],
  rgbaDefaultAlpha: [1, 0, 0.4, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [255, 0, 102],
    RGB: [1, 0, 0.4],
    HSL: normalize([336, 1, 0.5], "hueOnly"),
    HWB: normalize([336, 0, 0], "hueOnly"),
    HSV: normalize([336, 1, 1], "hueOnly"),
    XYZ: [0.43637, 0.22223, 0.14563],
    Lab: normalize([54.26293, 82.86769, 18.87027], "percent"),
    Oklab: [0.63876, 0.2511, 0.04657],
    Okhsv: normalize(
      [10.507816760951473, 0.9999883307982256, 0.9999999990681387],
      "hueOnly"
    ),
    Okhsl: normalize(
      [10.507816760951473, 0.9999999983079972, 0.5805502265380329],
      "hueOnly"
    ),
    LCHuv: normalize([54.26293, 153.22729, 1.88082], "hueReversed"),
    HSLuv: normalize([1.88082, 99.99999, 54.26293]),
    HPLuv: normalize([1.88082, 358.32098, 54.26293]),
  },
};

Object.entries({
  BLACK,
  WHITE,
  RED,
  GREEN,
  BLUE,
  REDISH,
  GREENISH,
  BLUEISH,
  PINKISH,
}).forEach(([name, { rgb, rgbaHalfAlpha, rgbaDefaultAlpha, reference }]) =>
  Object.entries(reference).forEach(([type, c]) => {
    describe(`${type} ${name}`, () => {
      describe(`from`, () => {
        it(`should set a color from ${type} values`, () => {
          deepAlmostEqual(
            color[`from${type}`](TEMP_VEC3, ...c),
            rgb,
            epsilons[type]
          );
        });
        it(`should set a color from ${type} values with supplied alpha`, () => {
          deepAlmostEqual(
            color[`from${type}`](color.create(), ...c, 0.5),
            rgbaHalfAlpha,
            epsilons[type]
          );
        });
        it(`should set a color from ${type} values and keep the color alpha`, () => {
          deepAlmostEqual(
            color[`from${type}`](color.create(), ...c),
            rgbaDefaultAlpha,
            epsilons[type]
          );
        });
      });

      describe(`get`, () => {
        it(`should return ${type} values from a color`, () => {
          deepAlmostEqual(
            color[`get${type}`](rgbaDefaultAlpha),
            [...c, DEFAULT_ALPHA],
            epsilons[type]
          );
        });
        it(`should return ${type} values from a color with supplied alpha`, () => {
          deepAlmostEqual(
            color[`get${type}`](rgbaHalfAlpha),
            [...c, 0.5],
            epsilons[type]
          );
        });
        it(`should assign ${type} values to a provided array without reassigning it`, () => {
          const v = [0, 0, 0];
          deepAlmostEqual(color[`get${type}`](rgb, v), v, epsilons[type]);
        });
      });
    });
  })
);

describe("CSS", () => {
  it("getCSSRGB() should get a rgb(a) CSS string representation", () => {
    deepEqual(color.getCSSRGB([1, 0, 0]), "rgb(255, 0, 0)");
    deepEqual(color.getCSSRGB([1, 0, 0, 0]), "rgba(255, 0, 0, 0)");
    deepEqual(color.getCSSRGB([1, 0, 0, 1]), "rgba(255, 0, 0, 1)");
    deepEqual(color.getCSSRGB([1, 0, 0, 0.5]), "rgba(255, 0, 0, 0.5)");
  });
  it("getCSSHSL() should get a hsl(a) CSS string representation", () => {
    deepEqual(color.getCSSHSL([1, 0, 0]), "hsl(0, 100%, 50%)");
    deepEqual(color.getCSSHSL([1, 0, 0, 0]), "hsla(0, 100%, 50%, 0)");
    deepEqual(color.getCSSHSL([1, 0, 0, 1]), "hsla(0, 100%, 50%, 1)");
    deepEqual(color.getCSSHSL([1, 0, 0, 0.5]), "hsla(0, 100%, 50%, 0.5)");
  });
  it("getCSSLab() should get a lab CSS string representation", () => {
    const redLab50 = [53.23711, 78.27048, 62.14609];
    const redCSSLab = `lab(${redLab50[0]}% ${redLab50[1]} ${redLab50[2]})`;
    deepEqual(color.getCSSLab([1, 0, 0], 5), redCSSLab);
    deepEqual(
      color.getCSSLab([1, 0, 0, 0], 5),
      redCSSLab.replace(")", " / 0)")
    );
    deepEqual(
      color.getCSSLab([1, 0, 0, 1], 5),
      redCSSLab.replace(")", " / 1)")
    );
    deepEqual(
      color.getCSSLab([1, 0, 0, 0.5], 5),
      redCSSLab.replace(")", " / 0.5)")
    );
  });
  it("getCSSLCH() should get a lch CSS string representation", () => {
    const c = color.utils.floorArray(RED.reference.LCHuv);
    const redCSSLab = `lch(${c[0]}% ${c[1]} ${c[2]})`;
    deepEqual(color.getCSSLCH([1, 0, 0], 5), redCSSLab);
    deepEqual(
      color.getCSSLCH([1, 0, 0, 0], 5),
      redCSSLab.replace(")", " / 0)")
    );
    deepEqual(
      color.getCSSLCH([1, 0, 0, 1], 5),
      redCSSLab.replace(")", " / 1)")
    );
    deepEqual(
      color.getCSSLCH([1, 0, 0, 0.5], 5),
      redCSSLab.replace(")", " / 0.5)")
    );
  });
  it("getCSSHWB() should get a hwb CSS string representation", () => {
    const c = color.utils.floorArray(RED.reference.HWB);
    const redCSSHWB = `hwb(${c[0]}% ${c[1]} ${c[2]})`;
    deepEqual(color.getCSSHWB([1, 0, 0]), redCSSHWB);
    deepEqual(color.getCSSHWB([1, 0, 0, 0]), redCSSHWB.replace(")", " / 0)"));
    deepEqual(color.getCSSHWB([1, 0, 0, 1]), redCSSHWB.replace(")", " / 1)"));
    deepEqual(
      color.getCSSHWB([1, 0, 0, 0.5]),
      redCSSHWB.replace(")", " / 0.5)")
    );
  });
});

describe("Deprecated APIs", () => {
  it("copy() should act as set", () => {
    deepEqual(color.copy([0.1, 0.2, 0.3], [0, 0, 0]), [0.1, 0.2, 0.3]);
  });
  it("copy() should act as set with supplied alpha", () => {
    deepEqual(
      color.copy([0.1, 0.2, 0.3, 0.4], [0, 0, 0]),
      [0.1, 0.2, 0.3, 0.4]
    );
  });
  it("set() should act as setRGB", () => {
    deepEqual(color.set([0, 0, 0], 0.1, 0.2, 0.3), [0.1, 0.2, 0.3]);
  });
  it("set() should act as setRGB with supplied alpha", () => {
    deepEqual(color.set([0, 0, 0], 0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);
  });
});
