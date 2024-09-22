import { describe, it } from "node:test";
import { deepEqual } from "node:assert";
import * as color from "../index.js";
// import Color from "colorjs.io";

const { default: Color } = await import(
  "../node_modules/colorjs.io/src/index.js"
);

// TODO: HSL switch case

const DEFAULT_ALPHA = 1;
const TEMP_VEC3 = [0, 0, 0];

function deepAlmostEqual(a, b, epsilon = 0.00001) {
  if (a.length != b.length) throw new Error(`deepAlmostEqual:\n${a}\n${b}`);
  for (let i = 0; i < a.length; i++) {
    if (!Number.isFinite(a[i]) || !Number.isFinite(b[[i]])) {
      throw new Error(`deepAlmostEqual (not finite):\n${a}\n${b}`);
    }
    if (Math.abs(a[i] - b[i]) > epsilon) {
      throw new Error(
        `deepAlmostEqual (at "${i}" diff=${Math.abs(a[i] - b[i])}):\n${a}\n${b}`,
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
    deepEqual(color.toRGB([0.1, 0.2, 0.3]), [0.1, 0.2, 0.3]);
  });
  it("should set a color with supplied alpha", () => {
    deepEqual(
      color.set(color.create(), [0.1, 0.2, 0.3, 0.4]),
      [0.1, 0.2, 0.3, 0.4],
    );
    deepEqual(color.toRGB([0.1, 0.2, 0.3, 0.4]), [0.1, 0.2, 0.3, 0.4]);
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

describe("fromValues", () => {
  it("should set a color", () => {
    deepEqual(color.fromValues(TEMP_VEC3, 0.1, 0.2, 0.3), [0.1, 0.2, 0.3]);
    deepEqual(color.fromRGB(TEMP_VEC3, 0.1, 0.2, 0.3), [0.1, 0.2, 0.3]);
  });
  it("should set a color with supplied alpha", () => {
    deepEqual(
      color.fromValues(color.create(), 0.1, 0.2, 0.3, 0.4),
      [0.1, 0.2, 0.3, 0.4],
    );
    deepEqual(
      color.fromRGB(color.create(), 0.1, 0.2, 0.3, 0.4),
      [0.1, 0.2, 0.3, 0.4],
    );
  });
  it("should set a color and keep the color alpha", () => {
    deepEqual(color.fromValues(color.create(), 0.1, 0.2, 0.3), [
      0.1,
      0.2,
      0.3,
      DEFAULT_ALPHA,
    ]);
    deepEqual(color.fromRGB(color.create(), 0.1, 0.2, 0.3), [
      0.1,
      0.2,
      0.3,
      DEFAULT_ALPHA,
    ]);
  });
});

describe("Bytes", () => {
  describe("from", () => {
    it("should set a color from a Bytes array", () => {
      deepEqual(color.fromBytes(TEMP_VEC3, [222, 100, 125]), [
        222 / 255,
        100 / 255,
        125 / 255,
      ]);
      deepEqual(color.fromRGBBytes(TEMP_VEC3, [222, 100, 125]), [
        222 / 255,
        100 / 255,
        125 / 255,
      ]);
    });
    it("should set a color from a Bytes array with supplied alpha", () => {
      deepEqual(color.fromBytes(color.create(), [222, 100, 125, 23]), [
        222 / 255,
        100 / 255,
        125 / 255,
        23 / 255,
      ]);
      deepEqual(color.fromRGBBytes(color.create(), [222, 100, 125, 23]), [
        222 / 255,
        100 / 255,
        125 / 255,
        23 / 255,
      ]);
    });
    it("should set a color from a Bytes array and keep the color alpha", () => {
      deepEqual(color.fromBytes(color.create(), [222, 100, 125]), [
        222 / 255,
        100 / 255,
        125 / 255,
        DEFAULT_ALPHA,
      ]);
      deepEqual(color.fromRGBBytes(color.create(), [222, 100, 125]), [
        222 / 255,
        100 / 255,
        125 / 255,
        DEFAULT_ALPHA,
      ]);
    });
  });

  describe("to", () => {
    it("should return a Bytes array from a color with supplied alpha", () => {
      deepEqual(
        color.toBytes([222 / 255, 100 / 255, 125 / 255, 23 / 255]),
        [222, 100, 125, 23],
      );
      deepEqual(
        color.toRGBBytes([222 / 255, 100 / 255, 125 / 255, 23 / 255]),
        [222, 100, 125, 23],
      );
    });
    it("should return a RGB Bytes array from a color", () => {
      deepEqual(
        color.toBytes([222 / 255, 100 / 255, 125 / 255]),
        [222, 100, 125],
      );
      deepEqual(
        color.toRGBBytes([222 / 255, 100 / 255, 125 / 255]),
        [222, 100, 125],
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
        hexEPSILON,
      );
      deepEqual(color.fromHex(color.create(), "#FFFFFFFF"), [1, 1, 1, 1]);
      deepAlmostEqual(
        color.fromHex(color.create(), "#FFFFFF80"),
        [1, 1, 1, 0.5],
        hexEPSILON,
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

  describe("to", () => {
    it("should return a HEX string for black color without alpha (6 characters)", () => {
      deepEqual(color.toHex([0, 0, 0]), "#000000");
    });
    it("should return a HEX string for black color with alpha 0 (8 characters)", () => {
      deepEqual(color.toHex([0, 0, 0, 0]), "#00000000");
    });
    it("should return a HEX string for black color with alpha 0.5 (8 characters)", () => {
      deepEqual(color.toHex([0, 0, 0, 0.5]), "#00000080");
    });
    it("should return a HEX string for black color with alpha 1 (6 characters)", () => {
      deepEqual(color.toHex([0, 0, 0, 1]), "#000000");
    });

    it("should return a HEX string for white color without alpha (6 characters)", () => {
      deepEqual(color.toHex([1, 1, 1]), "#FFFFFF");
    });
    it("should return a HEX string for white color with alpha 0 (8 characters)", () => {
      deepEqual(color.toHex([1, 1, 1, 0]), "#FFFFFF00");
    });
    it("should return a HEX string for white color with alpha 0.5 (8 characters)", () => {
      deepEqual(color.toHex([1, 1, 1, 0.5]), "#FFFFFF80");
    });
    it("should return a HEX string for white color with alpha 1 (6 characters)", () => {
      deepEqual(color.toHex([1, 1, 1, 1]), "#FFFFFF");
    });

    it("should return a HEX string for color without alpha (6 characters)", () => {
      deepEqual(color.toHex([1, 0, 0.4]), "#FF0066");
    });
    it("should return a HEX string for color with alpha 0 (8 characters)", () => {
      deepEqual(color.toHex([1, 0, 0.4, 0]), "#FF006600");
    });
    it("should return a HEX string for color with alpha 0.4 (8 characters)", () => {
      deepEqual(color.toHex([1, 0, 0.4, 0.4]), "#FF006666");
    });
    it("should return a HEX string for color with alpha 1 (6 characters)", () => {
      deepEqual(color.toHex([1, 0, 0.4, 1]), "#FF0066");
    });
  });
});

// TODO: add to css.js
const NORMALIZE_VALUES = {
  hue: [360, 100, 100],
  hueReversed: [100, 100, 360],
  hueOnly: [360, 1, 1],
  hueOnlyReversed: [1, 1, 360],
  percent: [100, 100, 100],

  lch: [100, 150, 360],
  LCHuv: [100, 220, 360],
  luminanceOnly: [100, 1, 1],
  // luv: [100, [-215, 215], [-215, 215]],
};

const normalize = (c, mode = "hue") =>
  c.map((n, i) => n / NORMALIZE_VALUES[mode][i]);

const epsilons = {
  XYZ: 3 / (95 + 100 + 108) + Number.EPSILON,
  Lab: 0.00002,
  LCHuv: 0.0088564516,
  HSLuv: 0.0088564516,
  HPLuv: 0.0088564516,
  Okhsv: 0.003,
};

// References:
// https://apps.colorjs.io/convert/
// https://colorjs.io/docs/spaces
// https://ajalt.github.io/colormath/converter/
// https://culorijs.org/color-spaces/
// https://oklch.com/

const getReference = (hex) => {
  const color = new Color(hex);

  // luv: "luv",
  const spaceMapping = {
    Linear: { id: "srgb-linear" },
    P3: { id: "p3" },
    HSL: { id: "hsl", normalize: "hue" },
    HWB: { id: "hwb", normalize: "hue" },
    HSV: { id: "hsv", normalize: "hue" },
    XYZD65: { id: "xyz-d65" },
    XYZD50: { id: "xyz-d50" },
    LabD65: { id: "lab-d65", normalize: "percent" }, // [100, [-125, 125], [-125, 125]],
    LabD50: { id: "lab", normalize: "percent" }, // [100, [-125, 125], [-125, 125]],
    LCH: { id: "lch", normalize: "lch" },
    Oklab: { id: "oklab" }, // [1, [-0.4, 0.4], [-0.4, 0.4]],
    Oklch: { id: "oklch", normalize: "hueOnlyReversed" },
    Okhsv: { id: "okhsv", normalize: "hueOnly" },
    Okhsl: { id: "okhsl", normalize: "hueOnly" },
    LCHuv: { id: "lchuv", normalize: "hueReversed" }, // [100, 220, 360]
    HSLuv: { id: "hsluv", normalize: "hue" },
    HPLuv: { id: "hpluv", normalize: "hue" },
  };

  return Object.fromEntries(
    Object.entries(spaceMapping).map(([pexName, { id, normalize: mode }]) => {
      const c = color.to(id).coords.map((c) => (isNaN(c) ? 0 : c));
      // console.log(id, color.to(id).coords);

      return [pexName, mode ? normalize(c, mode) : c];
    }),
  );
};

// #000000
const BLACK = {
  rgb: [0, 0, 0],
  rgbaHalfAlpha: [0, 0, 0, 0.5],
  rgbaDefaultAlpha: [0, 0, 0, DEFAULT_ALPHA],
  reference: getReference("#000000"),
};
// #ffffff
const WHITE = {
  rgb: [1, 1, 1],
  rgbaHalfAlpha: [1, 1, 1, 0.5],
  rgbaDefaultAlpha: [1, 1, 1, DEFAULT_ALPHA],
  reference: getReference("#ffffff"),
};
// #ff0000
const RED = {
  rgb: [1, 0, 0],
  rgbaHalfAlpha: [1, 0, 0, 0.5],
  rgbaDefaultAlpha: [1, 0, 0, DEFAULT_ALPHA],
  reference: getReference("#ff0000"),
};
// #00ff00
const GREEN = {
  rgb: [0, 1, 0],
  rgbaHalfAlpha: [0, 1, 0, 0.5],
  rgbaDefaultAlpha: [0, 1, 0, DEFAULT_ALPHA],
  reference: getReference("#00ff00"),
};
// #0000ff
const BLUE = {
  rgb: [0, 0, 1],
  rgbaHalfAlpha: [0, 0, 1, 0.5],
  rgbaDefaultAlpha: [0, 0, 1, DEFAULT_ALPHA],
  reference: getReference("#0000ff"),
};
// #996600
const REDISH = {
  rgb: [0.6, 0.4, 0],
  rgbaHalfAlpha: [0.6, 0.4, 0, 0.5],
  rgbaDefaultAlpha: [0.6, 0.4, 0, DEFAULT_ALPHA],
  reference: getReference("#996600"),
};
// #669900
const GREENISH = {
  rgb: [0.4, 0.6, 0],
  rgbaHalfAlpha: [0.4, 0.6, 0, 0.5],
  rgbaDefaultAlpha: [0.4, 0.6, 0, DEFAULT_ALPHA],
  reference: getReference("#669900"),
};

// #006699
const BLUEISH = {
  rgb: [0, 0.4, 0.6],
  rgbaHalfAlpha: [0, 0.4, 0.6, 0.5],
  rgbaDefaultAlpha: [0, 0.4, 0.6, DEFAULT_ALPHA],
  reference: getReference("#006699"),
};
// #ff0066
const PINKISH = {
  rgb: [1, 0, 0.4],
  rgbaHalfAlpha: [1, 0, 0.4, 0.5],
  rgbaDefaultAlpha: [1, 0, 0.4, DEFAULT_ALPHA],
  reference: getReference("#ff0066"),
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
            epsilons[type],
          );
        });
        it(`should set a color from ${type} values with supplied alpha`, () => {
          deepAlmostEqual(
            color[`from${type}`](color.create(), ...c, 0.5),
            rgbaHalfAlpha,
            epsilons[type],
          );
        });
        it(`should set a color from ${type} values and keep the color alpha`, () => {
          deepAlmostEqual(
            color[`from${type}`](color.create(), ...c),
            rgbaDefaultAlpha,
            epsilons[type],
          );
        });
      });

      describe("to", () => {
        it(`should return ${type} values from a color`, () => {
          deepAlmostEqual(
            color[`to${type}`](rgbaDefaultAlpha),
            [...c, DEFAULT_ALPHA],
            epsilons[type],
          );
        });
        it(`should return ${type} values from a color with supplied alpha`, () => {
          deepAlmostEqual(
            color[`to${type}`](rgbaHalfAlpha),
            [...c, 0.5],
            epsilons[type],
          );
        });
        it(`should assign ${type} values to a provided array without reassigning it`, () => {
          const v = [0, 0, 0];
          deepAlmostEqual(color[`to${type}`](rgb, v), v, epsilons[type]);
        });
      });
    });
  }),
);

describe("CSS", () => {
  describe(`color space`, () => {
    it("toCSSRGB() should return a srgb CSS string representation", () => {
      deepEqual(color.toCSSRGB([1, 0, 0]), "color(srgb 1 0 0)");
      deepEqual(color.toCSSRGB([1, 0, 0, 0]), "color(srgb 1 0 0 / 0)");
      deepEqual(color.toCSSRGB([1, 0, 0, 1]), "color(srgb 1 0 0)");
      deepEqual(color.toCSSRGB([1, 0, 0, 0.5]), "color(srgb 1 0 0 / 0.5)");
      deepEqual(color.toCSSRGB([1, 0, 0]), "color(srgb 1 0 0)");
    });
    it("toCSSRGBLinear() should return a srgb-linear CSS string representation", () => {
      deepEqual(color.toCSSRGBLinear([1, 0, 0]), "color(srgb-linear 1 0 0)");
      deepEqual(
        color.toCSSRGBLinear([1, 0, 0, 0]),
        "color(srgb-linear 1 0 0 / 0)",
      );
      deepEqual(color.toCSSRGBLinear([1, 0, 0, 1]), "color(srgb-linear 1 0 0)");
      deepEqual(
        color.toCSSRGBLinear([1, 0, 0, 0.5]),
        "color(srgb-linear 1 0 0 / 0.5)",
      );
    });
    it("toCSSP3() should return a display-p3 CSS string representation", () => {
      const REDP3 = `0.91748 0.20028 0.13856`;
      deepEqual(color.toCSSP3([1, 0, 0]), `color(display-p3 ${REDP3})`);
      deepEqual(color.toCSSP3([1, 0, 0, 0]), `color(display-p3 ${REDP3} / 0)`);
      deepEqual(color.toCSSP3([1, 0, 0, 1]), `color(display-p3 ${REDP3})`);
      deepEqual(
        color.toCSSP3([1, 0, 0, 0.5]),
        `color(display-p3 ${REDP3} / 0.5)`,
      );
    });
    it("toCSSXYZD50() should return a xyz-d50 CSS string representation", () => {
      deepEqual(
        color.toCSSXYZD50([1, 1, 1]),
        "color(xyz-d50 0.96429 1 0.8251)",
      );
      deepEqual(
        color.toCSSXYZD50([1, 1, 1, 0]),
        "color(xyz-d50 0.96429 1 0.8251 / 0)",
      );
      deepEqual(
        color.toCSSXYZD50([1, 1, 1, 1]),
        "color(xyz-d50 0.96429 1 0.8251)",
      );
      deepEqual(
        color.toCSSXYZD50([1, 1, 1, 0.5]),
        "color(xyz-d50 0.96429 1 0.8251 / 0.5)",
      );
    });
    it("toCSSXYZ() should return a xyz (xyz-d65) CSS string representation", () => {
      deepEqual(
        color.toCSSXYZ([1, 1, 1]),
        "color(xyz 0.95045 0.99999 1.08905)",
      );
      deepEqual(
        color.toCSSXYZ([1, 1, 1, 0]),
        "color(xyz 0.95045 0.99999 1.08905 / 0)",
      );
      deepEqual(
        color.toCSSXYZ([1, 1, 1, 1]),
        "color(xyz 0.95045 0.99999 1.08905)",
      );
      deepEqual(
        color.toCSSXYZ([1, 1, 1, 0.5]),
        "color(xyz 0.95045 0.99999 1.08905 / 0.5)",
      );
    });
  });
  describe(`srgb`, () => {
    it("toCSSHSL() should return a hsl(a) CSS string representation", () => {
      deepEqual(color.toCSSHSL([1, 0, 0]), "hsl(0 100% 50%)");
      deepEqual(color.toCSSHSL([1, 0, 0, 0]), "hsl(0 100% 50% / 0)");
      deepEqual(color.toCSSHSL([1, 0, 0, 1]), "hsl(0 100% 50%)");
      deepEqual(color.toCSSHSL([1, 0, 0, 0.5]), "hsl(0 100% 50% / 0.5)");
    });
    it("toCSSHWB() should return a hwb CSS string representation", () => {
      const c = color.utils.floorArray(RED.reference.HWB);
      const redCSSHWB = `hwb(${c[0]} ${c[1]}% ${c[2]}%)`;
      deepEqual(color.toCSSHWB([1, 0, 0]), redCSSHWB);
      deepEqual(color.toCSSHWB([1, 0, 0, 0]), redCSSHWB.replace(")", " / 0)"));
      deepEqual(color.toCSSHWB([1, 0, 0, 1]), redCSSHWB);
      deepEqual(
        color.toCSSHWB([1, 0, 0, 0.5]),
        redCSSHWB.replace(")", " / 0.5)"),
      );
    });
  });
  describe(`CIELAB`, () => {
    it("toCSSLab() should return a lab CSS string representation", () => {
      const c = color.utils.floorArray(
        color.utils
          .floorArray(RED.reference.LabD50)
          .map((c, i) => c * NORMALIZE_VALUES.percent[i]),
        2,
      );
      const redCSSLab = `lab(${c[0]}% ${c[1]} ${c[2]})`;
      deepEqual(color.toCSSLab([1, 0, 0], 2), redCSSLab);
      deepEqual(
        color.toCSSLab([1, 0, 0, 0], 2),
        redCSSLab.replace(")", " / 0)"),
      );
      deepEqual(color.toCSSLab([1, 0, 0, 1], 2), redCSSLab);
      deepEqual(
        color.toCSSLab([1, 0, 0, 0.5], 2),
        redCSSLab.replace(")", " / 0.5)"),
      );
    });
    it("toCSSLabD65() should return a lab CSS string representation", () => {
      const c = color.utils.floorArray(
        color.utils
          .floorArray(RED.reference.LabD65)
          .map((c, i) => c * NORMALIZE_VALUES.percent[i]),
        1,
      );
      const redCSSLab = `lab-d65(${c[0]}% ${c[1]} ${c[2]})`;
      deepEqual(color.toCSSLabD65([1, 0, 0], 1), redCSSLab);
      deepEqual(
        color.toCSSLabD65([1, 0, 0, 0], 1),
        redCSSLab.replace(")", " / 0)"),
      );
      deepEqual(color.toCSSLabD65([1, 0, 0, 1], 1), redCSSLab);
      deepEqual(
        color.toCSSLabD65([1, 0, 0, 0.5], 1),
        redCSSLab.replace(")", " / 0.5)"),
      );
    });
    it("toCSSLCH() should return a lch CSS string representation", () => {
      const c = color.utils.floorArray(
        color.utils
          .floorArray(RED.reference.LCH)
          .map((c, i) => c * NORMALIZE_VALUES.lch[i]),
        2,
      );
      const redCSSLab = `lch(${c[0]}% ${c[1]} ${c[2]})`;
      deepEqual(color.toCSSLCH([1, 0, 0], 2), redCSSLab);
      deepEqual(
        color.toCSSLCH([1, 0, 0, 0], 2),
        redCSSLab.replace(")", " / 0)"),
      );
      deepEqual(color.toCSSLCH([1, 0, 0, 1], 2), redCSSLab);
      deepEqual(
        color.toCSSLCH([1, 0, 0, 0.5], 2),
        redCSSLab.replace(")", " / 0.5)"),
      );
    });
    it("toCSSOkLab() should return a lab CSS string representation", () => {
      const c = color.utils.floorArray(
        color.utils
          .floorArray(RED.reference.Oklab)
          .map((c, i) => c * NORMALIZE_VALUES.luminanceOnly[i]),
        2,
      );
      const redCSSLab = `oklab(${c[0]}% ${c[1]} ${c[2]})`;
      deepEqual(color.toCSSOkLab([1, 0, 0], 2), redCSSLab);
      deepEqual(
        color.toCSSOkLab([1, 0, 0, 0], 2),
        redCSSLab.replace(")", " / 0)"),
      );
      deepEqual(color.toCSSOkLab([1, 0, 0, 1], 2), redCSSLab);
      deepEqual(
        color.toCSSOkLab([1, 0, 0, 0.5], 2),
        redCSSLab.replace(")", " / 0.5)"),
      );
    });
    it("toCSSOklch() should return a lab CSS string representation", () => {
      const c = color.utils.floorArray(
        color.utils
          .floorArray(RED.reference.Oklch)
          .map(
            (c, i) =>
              c *
              NORMALIZE_VALUES.luminanceOnly[i] *
              NORMALIZE_VALUES.hueOnlyReversed[i],
          ),
        2,
      );
      const redCSSLab = `oklch(${c[0]}% ${c[1]} ${c[2]})`;
      deepEqual(color.toCSSOklch([1, 0, 0], 2), redCSSLab);
      deepEqual(
        color.toCSSOklch([1, 0, 0, 0], 2),
        redCSSLab.replace(")", " / 0)"),
      );
      deepEqual(color.toCSSOklch([1, 0, 0, 1], 2), redCSSLab);
      deepEqual(
        color.toCSSOklch([1, 0, 0, 0.5], 2),
        redCSSLab.replace(")", " / 0.5)"),
      );
    });
  });
});
