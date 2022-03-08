import { deepEqual } from "assert";
import * as color from "../index.js";

// TODO: HSV and HSL switch case

const DEFAULT_ALPHA = 1;
const TEMP_VEC3 = [0, 0, 0];

function deepAlmostEqual(a, b, epsilon = 0.001) {
  if (a.length != b.length) throw new Error(`${a} deepAlmostEqual ${b}`);
  for (let i = 0; i < a.length; i++) {
    if (!Number.isFinite(a[i]) || !Number.isFinite(b[[i]])) {
      throw new Error(`${a} deepAlmostEqual ${b} not finite`);
    }
    if (Math.abs(a[i] - b[i]) > epsilon) {
      throw new Error(
        `${a} deepAlmostEqual ${b} (diff=${Math.abs(a[i] - b[i])})`
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

const NON_NORMALISED_RANGES = [360, 100, 100];

const epsilons = {
  XYZ: 3 / (95 + 100 + 108) + Number.EPSILON,
  Lab: 0.02, // TODO: that's pretty high
  LCHuv: 0.0088564516,
  HSLuv: 0.0088564516,
  HPLuv: 0.0088564516,
};

// Reference: https://ajalt.github.io/colormath/converter/

// #000000
const BLACK = {
  rgb: [0, 0, 0],
  rgbaHalfAlpha: [0, 0, 0, 0.5],
  rgbaDefaultAlpha: [0, 0, 0, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [0, 0, 0],
    RGB: [0, 0, 0],
    HSL: [0, 0, 0],
    HSV: [0, 0, 0],
    XYZ: [0, 0, 0],
    Lab: [0, 0, 0],
    Oklab: [0, 0, 0],
    LCHuv: [0, 0, 0],
    HSLuv: [0, 0, 0],
    HPLuv: [0, 0, 0],
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
    HSL: [0, 0, 1],
    HSV: [0, 0, 1],
    XYZ: [0.95046, 1, 1.08906].map((n) => n * 100),
    Lab: [100, -0.00001, -0],
    Oklab: [1, 0, 0],
    LCHuv: [100, 0.00001, 0], // Clamped hue
    HSLuv: [0, 0, 100], // Clamped hue
    HPLuv: [0, 0, 100], // Clamped hue
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
    HSL: [0, 1, 0.5],
    HSV: [0, 1, 1],
    XYZ: [0.41239, 0.21264, 0.01933].map((n) => n * 100),
    Lab: [53.23711, 80.0901, 67.20326],
    Oklab: [0.62796, 0.22486, 0.12585],
    LCHuv: [53.23711, 179.03809, 12.17705],
    HSLuv: [12.17705, 100, 53.23711],
    HPLuv: [12.17705, 426.74677, 53.23711],
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
    HSL: [120 / 360, 1, 0.5],
    HSV: [120 / 360, 1, 1],
    XYZ: [0.35758, 0.71517, 0.11919].map((n) => n * 100),
    Lab: [87.73552, -86.18159, 83.18662],
    Oklab: [0.86644, -0.23389, 0.1795],
    LCHuv: [87.73552, 135.78954, 127.71501],
    HSLuv: [127.71501, 100.00002, 87.73552],
    HPLuv: [127.71501, 490.14551, 87.73552],
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
    HSL: [240 / 360, 1, 0.5],
    HSV: [240 / 360, 1, 1],
    XYZ: [0.18048, 0.07219, 0.95053].map((n) => n * 100),
    Lab: [32.30087, 79.19527, -107.85547],
    Oklab: [0.45201, -0.03246, -0.31153],
    LCHuv: [32.30087, 130.68976, 265.87433],
    HSLuv: [265.87433, 100.00001, 32.30087],
    HPLuv: [265.87433, 513.41272, 32.30087],
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
    HSL: [40 / 360, 1, 0.3],
    HSV: [40 / 360, 1, 0.6],
    XYZ: [0.17888, 0.16276, 0.02199].map((n) => n * 100),
    Lab: [47.33437, 13.54214, 54.73176],
    Oklab: [0.55095, 0.0306, 0.11226],
    LCHuv: [47.33437, 63.42409, 48.32603],
    HSLuv: [48.32603, 100, 47.33437],
    HPLuv: [48.32603, 170.02666, 47.33437],
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
    HSL: [80 / 360, 1, 0.3],
    HSV: [80 / 360, 1, 0.6],
    XYZ: [0.1687, 0.25607, 0.04054].map((n) => n * 100),
    Lab: [57.6619, -36.5132, 60.22545],
    Oklab: [0.62281, -0.1053, 0.12838],
    // HSLuv: [111.0721, 100, 57.6619].map((n, i) => n / NON_NORMALISED_RANGES[i]),
    LCHuv: [57.6619, 71.91135, 111.0721],
    HSLuv: [111.0721, 100, 57.6619],
    HPLuv: [111.0721, 158.2515, 57.6619],
  },
};

// #006699
const BLUEISH = {
  rgb: [0, 0.4, 0.6],
  rgbaHalfAlpha: [0, 0.4, 0.6, 0.5],
  rgbaDefaultAlpha: [0, 0.4, 0.6, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [153, 102, 0],
    RGB: [0, 0.4, 0.6],
    HSL: [200 / 360, 1, 0.3],
    HSV: [200 / 360, 1, 0.6],
    XYZ: [0.105, 0.11802, 0.31863].map((n) => n * 100),
    Lab: [40.89967, -5.34064, -34.66923],
    Oklab: [0.4874, -0.05526, -0.09869],
    LCHuv: [40.89967, 56.07965, 242.02414],
    HSLuv: [242.02414, 100.00001, 40.89967],
    HPLuv: [242.02414, 173.99023, 40.89967],
  },
};
// #ff0066
const PINKISH = {
  rgb: [1, 0, 0.4],
  rgbaHalfAlpha: [1, 0, 0.4, 0.5],
  rgbaDefaultAlpha: [1, 0, 0.4, DEFAULT_ALPHA],
  reference: {
    // RGBBytes: [255, 255, 255],
    RGB: [1, 0, 0.4],
    HSL: [336 / 360, 1, 0.5],
    HSV: [336 / 360, 1, 1],
    XYZ: [0.43637, 0.22223, 0.14563].map((n) => n * 100),
    Lab: [54.26293, 82.86769, 18.87027],
    Oklab: [0.63876, 0.2511, 0.04657],
    LCHuv: [54.26293, 153.22729, 1.88082],
    HSLuv: [1.88082, 99.99999, 54.26293],
    HPLuv: [1.88082, 358.32098, 54.26293],
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
