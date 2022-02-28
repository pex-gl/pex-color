import { deepEqual } from "assert";
import color from "../index.js";

const DEFAULT_ALPHA = 1;

function deepAlmostEqual(a, b, epsilon = 0.001) {
  if (a.length != b.length) throw new Error(`${a} deepAlmostEqual ${b}`);
  for (let i = 0; i < a.length; i++) {
    if (a === undefined || b === undefined) {
      throw new Error(`${a} deepAlmostEqual ${b}`);
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
  it("should set a color with supplied alpha", () => {
    deepEqual(
      color.set(color.create(), [0.1, 0.2, 0.3, 0.4]),
      [0.1, 0.2, 0.3, 0.4]
    );
  });
  it("should set a color and add default alpha", () => {
    deepEqual(color.set(color.create(), [0.1, 0.2, 0.3]), [
      0.1,
      0.2,
      0.3,
      DEFAULT_ALPHA,
    ]);
  });
});

describe("RGB", () => {
  describe("from", () => {
    it("should create a color from RGBA values", () => {
      deepEqual(color.fromRGB(0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);
    });
    it("should create a color from RGBA values and set the default alpha to 1", () => {
      deepEqual(color.fromRGB(0.1, 0.2, 0.3), [0.1, 0.2, 0.3, DEFAULT_ALPHA]);
    });
  });
  describe("set", () => {
    it("should set a color with supplied alpha", () => {
      deepEqual(
        color.setRGB(color.create(), 0.1, 0.2, 0.3, 0.4),
        [0.1, 0.2, 0.3, 0.4]
      );
    });
    it("should set a color and add default alpha", () => {
      deepEqual(color.setRGB(color.create(), 0.1, 0.2, 0.3), [
        0.1,
        0.2,
        0.3,
        DEFAULT_ALPHA,
      ]);
    });
  });
});

describe("RGBBytes", () => {
  describe("from", () => {
    it("should create a color from a RGBA Bytes array", () => {
      deepEqual(color.fromRGBBytes([222, 100, 125, 23]), [
        222 / 255,
        100 / 255,
        125 / 255,
        23 / 255,
      ]);
    });
    it("should create a color from a RGB Bytes array and set the default alpha to 1", () => {
      deepEqual(color.fromRGBBytes([222, 100, 125]), [
        222 / 255,
        100 / 255,
        125 / 255,
        DEFAULT_ALPHA,
      ]);
    });
  });

  describe("set", () => {
    it("should set a color from a RGB Bytes array with supplied alpha", () => {
      deepEqual(color.setRGBBytes(color.create(), 222, 100, 125, 23), [
        222 / 255,
        100 / 255,
        125 / 255,
        23 / 255,
      ]);
    });
    it("should set a color from a RGB Bytes array and add default alpha", () => {
      deepEqual(color.setRGBBytes(color.create(), 222, 100, 125), [
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

describe("HSV", () => {
  describe("from", () => {
    it("should create a red color from hue (0), saturation and value", () => {
      deepEqual(color.fromHSV(0, 1, 1), [1, 0, 0, DEFAULT_ALPHA]);
    });
    it("should create a half saturated red color from hue, saturation and value", () => {
      deepEqual(color.fromHSV(0, 0.5, 1), [1, 0.5, 0.5, DEFAULT_ALPHA]);
    });
    it("should create a green color from hue (1/3), saturation and value", () => {
      deepAlmostEqual(color.fromHSV(1 / 3, 1, 1), [0, 1, 0, DEFAULT_ALPHA]);
    });
    it("should create a half saturated green color from hue (1/3), saturation and value", () => {
      deepAlmostEqual(color.fromHSV(1 / 3, 0.5, 0.5), [
        0.25,
        0.5,
        0.25,
        DEFAULT_ALPHA,
      ]);
    });
  });

  describe("set", () => {
    it("should set a color to a half saturated green color from hue (1/3), saturation and value with supplied alpha", () => {
      deepEqual(
        color.setHSV(color.create(), 1 / 3, 0.5, 0.5, 0.5),
        [0.25, 0.5, 0.25, 0.5]
      );
    });
    it("should set a color to a half saturated green color from hue (1/3), saturation and value, and add default alpha", () => {
      deepEqual(color.setHSV(color.create(), 1 / 3, 0.5, 0.5), [
        0.25,
        0.5,
        0.25,
        DEFAULT_ALPHA,
      ]);
    });
  });

  describe("get", () => {
    it("should return a HSVA array from a color with supplied alpha", () => {
      deepEqual(color.getHSV([0.25, 0.5, 0.25, 0.5]), [1 / 3, 0.5, 0.5, 0.5]);
    });
    it("should return a HSVA array from a color and add default alpha", () => {
      deepEqual(color.getHSV([1, 0, 0]), [0, 1, 1, DEFAULT_ALPHA]);
    });
  });
});

// TODO: alpha testing all
describe("HSL", () => {
  describe("from", () => {
    it("should create a red color from hue, saturation and lightness", () => {
      deepEqual(color.fromHSL(0, 1, 0.5), [1, 0, 0, 1]);
    });
    it("should create a green color from hue, saturation and lightness", () => {
      deepAlmostEqual(color.fromHSL(1 / 3, 1, 0.5), [0, 1, 0, 1]);
    });
    it("should create a fuchsia color from hue, saturation and lightness", () => {
      deepAlmostEqual(color.fromHSL(0.5, 1, 0.5), [0, 1, 1, 1]);
    });
  });
  describe("set", () => {
    it("should set a color from hue, saturation and lightness with supplied alpha", () => {
      deepEqual(color.setHSL(color.create(), 0, 1, 0.5, 0.5), [1, 0, 0, 0.5]);
    });
    it("should set a color from hue, saturation and lightness and add default alpha", () => {
      deepEqual(color.setHSL(color.create(), 0, 1, 0.5), [1, 0, 0, 1]);
    });
  });
  describe("get", () => {
    it("should return a HSLA array from a color with supplied alpha", () => {
      deepEqual(color.getHSL([1, 0, 0, 0.5]), [0, 1, 0.5, 0.5]);
    });
    it("should return a HSLA array from a color and add default alpha", () => {
      deepEqual(color.getHSL([1, 0, 0]), [0, 1, 0.5, DEFAULT_ALPHA]);
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
    it("should create primary and B&W colors from HEX strings and add default alpha", () => {
      deepEqual(color.fromHex("#FF0000"), [1, 0, 0, DEFAULT_ALPHA]);
      deepEqual(color.fromHex("#00FF00"), [0, 1, 0, DEFAULT_ALPHA]);
      deepEqual(color.fromHex("#0000FF"), [0, 0, 1, DEFAULT_ALPHA]);
      deepEqual(color.fromHex("#000000"), [0, 0, 0, DEFAULT_ALPHA]);
      deepEqual(color.fromHex("#FFFFFF"), [1, 1, 1, DEFAULT_ALPHA]);
    });
    it("should create a color with alpha from a 8 characters HEX string", () => {
      deepEqual(color.fromHex("#00000000"), [0, 0, 0, 0]);
      deepAlmostEqual(color.fromHex("#00000080"), [0, 0, 0, 0.5], hexEPSILON);
      deepEqual(color.fromHex("#FFFFFFFF"), [1, 1, 1, 1]);
      deepAlmostEqual(color.fromHex("#FFFFFF80"), [1, 1, 1, 0.5], hexEPSILON);
      deepEqual(color.fromHex("#FF006666"), [1, 0, 0.4, 0.4]);
    });
    it("should create a color from a 3 characters HEX string and add default alpha", () => {
      deepEqual(color.fromHex("#F06"), [1, 0, 0.4, DEFAULT_ALPHA]);
    });
    it("should create a color with alpha from a 4 characters HEX string", () => {
      deepEqual(color.fromHex("#F066"), [1, 0, 0.4, 0.4]);
    });
    it("should create a color from a HEX string without leading #", () => {
      deepEqual(color.fromHex("000000"), [0, 0, 0, DEFAULT_ALPHA]);
      deepEqual(color.fromHex("ffffff"), [1, 1, 1, DEFAULT_ALPHA]);
      deepEqual(color.fromHex("ff0066"), [1, 0, 0.4, DEFAULT_ALPHA]);
      deepEqual(color.fromHex("FF006666"), [1, 0, 0.4, 0.4]);
      deepEqual(color.fromHex("F06"), [1, 0, 0.4, DEFAULT_ALPHA]);
      deepEqual(color.fromHex("F066"), [1, 0, 0.4, 0.4]);
    });
  });

  describe("set", () => {
    it("should create a color from a HEX string and add default alpha", () => {
      deepEqual(color.setHex(color.create(), "#FF0066"), [
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
    it("should return a HEX string for white color with alpha 0.4 (8 characters)", () => {
      deepEqual(color.getHex([1, 0, 0.4, 0.4]), "#FF006666");
    });
    it("should return a HEX string for white color with alpha 1 (6 characters)", () => {
      deepEqual(color.getHex([1, 0, 0.4, 1]), "#FF0066");
    });
  });
});

const xyzEPSILON = 3 / (95 + 100 + 108) + Number.EPSILON;
const yellowXyz = [77.003, 92.783, 13.853];

describe("XYZ", () => {
  describe("from", () => {
    it("should create a red color from XYZ values", () => {
      deepAlmostEqual(
        color.fromXYZ(...yellowXyz, 0.5),
        [1, 1, 0, 0.5],
        xyzEPSILON
      );
    });
    it("should create a red color from XYZ values and set the default alpha to 1", () => {
      deepAlmostEqual(
        color.fromXYZ(...yellowXyz),
        [1, 1, 0, DEFAULT_ALPHA],
        xyzEPSILON
      );
    });
  });

  describe("set", () => {
    it("should set a color from XYZ values with supplied alpha", () => {
      deepAlmostEqual(
        color.setXYZ(color.create(), ...yellowXyz, 0.5),
        [1, 1, 0, 0.5]
      );
    });
    it("should set a color from XYZ values and add default alpha", () => {
      deepAlmostEqual(color.setXYZ(color.create(), ...yellowXyz), [1, 1, 0, 1]);
    });
  });

  describe("get", () => {
    it("should return XYZ values from a color with supplied alpha", () => {
      deepAlmostEqual(
        color.getXYZ([1, 1, 0, 0.5]),
        [...yellowXyz, 0.5],
        xyzEPSILON
      );
    });
    it("should return XYZ values from a color and add default alpha", () => {
      deepAlmostEqual(
        color.getXYZ([1, 1, 0]),
        [...yellowXyz, DEFAULT_ALPHA],
        xyzEPSILON
      );
    });
  });
});

const yellowLab = [97.13824698129729, -21.555908334832285, 94.48248544644461];

describe("LAB", () => {
  describe("from", () => {
    it("should create a color from LAB values and alpha", () => {
      deepAlmostEqual(color.fromLab(...yellowLab, 0.5), [1, 1, 0, 0.5]);
    });
    it("should create a color from LAB values and set the default alpha to 1", () => {
      deepAlmostEqual(color.fromLab(...yellowLab), [1, 1, 0, DEFAULT_ALPHA]);
    });
  });

  describe("set", () => {
    it("should set a color from LAB values with supplied alpha", () => {
      deepAlmostEqual(
        color.setLab(color.create(), ...yellowLab, 0.5),
        [1, 1, 0, 0.5]
      );
    });
    it("should set a color from LAB values and add default alpha", () => {
      deepAlmostEqual(color.setLab(color.create(), ...yellowLab), [
        1,
        1,
        0,
        DEFAULT_ALPHA,
      ]);
    });
  });

  describe("get", () => {
    it("should return LAB values from a color with supplied alpha", () => {
      deepAlmostEqual(color.getLab([1, 1, 0, 0.5]), [...yellowLab, 0.5]);
    });
    it("should return LAB values from a color", () => {
      deepAlmostEqual(color.getLab([1, 1, 0, 1]), [
        ...yellowLab,
        DEFAULT_ALPHA,
      ]);
    });
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
  it("set() should act as setRGB with supplied alpha", () => {
    deepEqual(color.set([0, 0, 0], 0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);
  });
  it("set() should act as setRGB and add default alpha", () => {
    deepEqual(color.set([0, 0, 0], 0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1]);
  });
});
