var Color = require('../lib/Color');

var c = new Color();
console.log(c);

var c2 = new Color(1, 0.5, 0.25, 1.0);
console.log(c2);

var c3 = new Color();
c3.setHSV(0.95, 0.5, 0.5);
console.log(c3);
console.log(c3.getHSV());

var c4 = new Color.fromHex("#FFAA00");
console.log(c4);
console.log(c4.getHex());
