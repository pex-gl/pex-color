var color = require("../pex-color");

color.hsv = function (c, h, s, v) {
  if (arguments.length == 1) return color.getHSV(c);
  if (arguments.length == 2) [h, s, v] = h;
  return color.setHSV(c, h, s, v);
};

console.log(color.fromHSV(0, 1, 1));
console.log(color.hsv(color.create(), 0, 1, 1));
console.log(color.hsv(color.create(), [0, 1, 1]));
console.log(color.hsv(color.create()));
