//Float (0..1) RGBA Color utility class

//## Example use
//     var Color = require('pex-color');
//
//     var red = [1.0, 0.0, 0.0, 1.0];
//     var green = Color.fromHSL(0.2, 1.0, 0.0, 0.5);

//## Reference

//Dependencies imports
var lerp = require('lerp');

//### create(r, g, b, a)
//RGBA color constructor function
//`r` - red component *{ Number 0..1 }* = 0
//`g` - green component *{ Number 0..1 }* = 0
//`b` - blue component *{ Number 0..1 }* = 0
//`a` - alpha opacity *{ Number 0..1 }* = 1
function create(r, g, b, a) {
  return [r || 0, g || 0, b || 0, (a === undefined) ? 1 : a];
}

//### copy()
//Copies rgba values from another color into this instance
//`c` - another color to copy values from *{ Color }*
function copy(color, out) {
    if (out !== undefined) {
        out[0] = color[0];
        out[1] = color[1];
        out[2] = color[2];
        out[3] = color[3];
        return out;
    }
    return color.slice(0);
}

//### fromRGB(r, g, b, a)
//Alias for create(r, g, b, a)
function fromRGB(r, g, b, a) {
    return create(r, g, b, a);
}

//### set(r, g, b, a)
//`r` - red component *{ Number 0..1 }* = 0
//`g` - green component *{ Number 0..1 }* = 0
//`b` - blue component *{ Number 0..1 }* = 0
//`a` - alpha opacity *{ Number 0..1 }* = 1
function set(color, r, g, b, a) {
  color[0] = r;
  color[1] = g;
  color[2] = b;
  color[3] = (a !== undefined) ? a : 1;

  return color;
}

//### setRGB(r, g, b, a)
//`r` - red component *{ Number 0..1 }* = 0
//`g` - green component *{ Number 0..1 }* = 0
//`b` - blue component *{ Number 0..1 }* = 0
//`a` - alpha opacity *{ Number 0..1 }* = 1
function setRGB(color, r, g, b, a) {
    color[0] = r;
    color[1] = g;
    color[2] = b;
    color[3] = (a !== undefined) ? a : 1;

    return color;
}

//### fromRGBBytes(a)
//Creates new color from array of 4 byte values [r, g, b, a]
//`a` - array of rgba values *{ Array of Numbers/Int 0..255 }* = [0, 0, 0, 255]
function fromRGBBytes(bytes) {
    return [ bytes[0]/255, bytes[1]/255, bytes[2]/255, (bytes.length == 4) ? bytes[3]/255 : 1];
}

function getRGBBytes(color, out) {
    out = out || [0, 0, 0];
    out[0] = Math.floor(color[0]*255);
    out[1] = Math.floor(color[1]*255);
    out[2] = Math.floor(color[2]*255);
    return out;
}

//### fromHSV(h, s, v, a)
//Creates new color from hue, saturation and value
//`h` - hue *{ Number 0..1 }* = 0
//`s` - saturation *{ Number 0..1 }* = 0
//`v` - value *{ Number 0..1 }* = 0
//`a` - alpha opacity *{ Number 0..1 }* = 1
function fromHSV(h, s, v, a) {
  var color = create();
  setHSV(color, h, s, v, a)
  return color;
}

//### setHSV(h, s, l, a)
//Sets rgb color values from a hue, saturation, value and alpha
//`h` - hue *{ Number 0..1 }* = 0
//`s` - saturation *{ Number 0..1 }* = 0
//`v` - value *{ Number 0..1 }* = 0
//`a` - alpha opacity *{ Number 0..1 }* = 1
function setHSV(color, h, s, v, a) {
  a = a || 1;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: color[0] = v; color[1] = t; color[2] = p; break;
    case 1: color[0] = q; color[1] = v; color[2] = p; break;
    case 2: color[0] = p; color[1] = v; color[2] = t; break;
    case 3: color[0] = p; color[1] = q; color[2] = v; break;
    case 4: color[0] = t; color[1] = p; color[2] = v; break;
    case 5: color[0] = v; color[1] = p; color[2] = q; break;
  }

  color[3] = a;
  return color;
}

//### getHSV()
//Returns hue, saturation, value and alpha of color as
//*{ Object h:0.1, s:0..1, v:0..1, a:0..1 }*
function getHSV(color) {
  var r = color[0];
  var g = color[1];
  var b = color[2];
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h;
  var v = max;
  var d = max - min;
  var s = max === 0 ? 0 : d / max;

  if (max === min) {
    h = 0; // achromatic
  }
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [ h, s, v, color[3] ];
}

//### fromHSL(h, s, l, a)
//Creates new color from hue, saturation and lightness
//`h` - hue *{ Number 0..1 }* = 0
//`s` - saturation *{ Number 0..1 }* = 0
//`l` - lightness *{ Number 0..1 }* = 0
//`a` - alpha opacity *{ Number 0..1 }* = 1
function fromHSL(h, s, l, a) {
  var color = create();
  setHSL(color, h, s, l, a);
  return color;
}

//### fromHex(hex)
//Creates new color from html hex value e.g. #FF0000
//`hex` - html hex color string (with or without #) *{ String }*
function fromHex(hex) {
  var color = create();
  setHex(color, hex);
  return color;
}

//### fromXYZ(x, y, z)
//Creates new color from XYZ representation
//x - *{ Number 0..1 }*
//y - *{ Number 0..1 }*
//z - *{ Number 0..1 }*
function fromXYZ(x, y, z) {
  var color = create();
  setXYZ(color, x, y, z);
  return color;
}

//### fromLab(l, a, b)
//Creates new color from Lab representation
//l - *{ Number 0..100 }*
//a - *{ Number -128..127 }*
//b - *{ Number -128..127 }*
function fromLab(l, a, b) {
  var color = create();
  setLab(color, l, a, b);
  return color;
}



//### setHSL(h, s, l, a)
//Sets rgb color values from a hue, saturation, lightness and alpha
//`h` - hue *{ Number 0..1 }* = 0
//`s` - saturation *{ Number 0..1 }* = 0
//`l` - lightness *{ Number 0..1 }* = 0
//`a` - alpha opacity *{ Number 0..1 }* = 1
//Based on [https://gist.github.com/mjijackson/5311256](https://gist.github.com/mjijackson/5311256)
function setHSL(color, h, s, l, a) {
    a = a || 1;

    function hue2rgb(p, q, t) {
        if (t < 0) { t += 1; }
        if (t > 1) { t -= 1; }
        if (t < 1/6) { return p + (q - p) * 6 * t; }
        if (t < 1/2) { return q; }
        if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
        return p;
    }


    if (s === 0) {
        color[0] = color[1] = color[2] = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        color[0] = hue2rgb(p, q, h + 1/3);
        color[1] = hue2rgb(p, q, h);
        color[2] = hue2rgb(p, q, h - 1/3);
    }

    color[3] = a;
    return color;
}

//### getHSL()
//Returns hue, saturation, lightness and alpha of color as
//*{ Object h:0.1, s:0..1, l:0..1, a:0..1 }*
//Based on [https://gist.github.com/mjijackson/5311256](https://gist.github.com/mjijackson/5311256)
function getHSL(color) {
  var r = color[0];
  var g = color[1];
  var b = color[2];
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var l = (max + min) / 2;
  var h;
  var s;

  if (max === min) {
    h = s = 0; // achromatic
  }
  else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return  [ h, s, l, color[3] ];
}

//### setHex(hex)
//Sets rgb color values from a html hex value e.g. #FF0000
//`hex` - html hex color string (with or without #) *{ String }*
function setHex(color, hex) {
    hex = hex.replace(/^#/, "");
    var num = parseInt(hex, 16);

    color[0] = (num >> 16 & 255) / 255;
    color[1] = (num >> 8 & 255) / 255;
    color[2] = (num & 255) / 255;
    color[3] = 1

    return color;
}

//### getHex()
//Returns html hex representation of this color *{ String }*
function getHex(color) {
  var c = [ color[0], color[1], color[2] ].map(function(val) {
    return Math.floor(val * 255);
  });

  return "#" + ((c[2] | c[1] << 8 | c[0] << 16) | 1 << 24)
    .toString(16)
    .slice(1)
    .toUpperCase();
}

/*
//### setXYZ(x, y, z)
//Sets rgb color values from XYZ
//x - *{ Number 0..1 }*
//y - *{ Number 0..1 }*
//z - *{ Number 0..1 }*
function setXYZ(colo,r x, y, z) {
  var rgb = {
    r: x *  3.2406 + y * -1.5372 + z * -0.4986,
    g: x * -0.9689 + y *  1.8758 + z *  0.0415,
    b: x *  0.0557 + y * -0.2040 + z *  1.0570
  }

  [ "r", "g", "b" ].forEach(function(key) {
    rgb[key] /= 100;

    if (rgb[key] < 0) {
      rgb[key] = 0;
    }

    if (rgb[key] > 0.0031308) {
      rgb[key] = 1.055 * Math.pow(rgb[key], (1 / 2.4)) - 0.055;
    }
    else {
      rgb[key] *= 12.92;
    }
  });

  color[0] = rgb.r;
  color[1] = rgb.g;
  color[2] = rgb.b;
  color[3] = 1.0;

  return color;
}

//### getXYZ()
//Returns xyz representation of this color as
//*{ Object x:0..1, y:0..1, z:0..1 }*
function getXYZ(color) {
  var rgb = this.clone();

  [ "r", "g", "b" ].forEach(function(key) {
    if (rgb[key] > 0.04045) {
      rgb[key] = Math.pow(((rgb[key] + 0.055) / 1.055), 2.4);
    } else {
      rgb[key] /= 12.92;
    }

    rgb[key] = rgb[key] * 100;
  });

  return {
    x: rgb.r * 0.4124 + rgb.g * 0.3576 + rgb.b * 0.1805,
    y: rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722,
    z: rgb.r * 0.0193 + rgb.g * 0.1192 + rgb.b * 0.9505
  }
}

//### setLab(l, a, b)
//Sets rgb color values from Lab
//l - *{ Number 0..100 }*
//a - *{ Number -128..127 }*
//b - *{ Number -128..127 }*
function setLab(color, l, a, b) {
  var y = (l + 16) / 116;
  var x = a / 500 + y;
  var z = y - b / 200;

  var xyz = { x: x, y: y, z: z }
  var pow;

  [ "x", "y", "z" ].forEach(function(key) {
    pow = Math.pow(xyz[key], 3);

    if (pow > 0.008856) {
      xyz[key] = pow;
    }
    else {
      xyz[key] = (xyz[key] - 16 / 116) / 7.787;
    }
  });

  var color = Color.fromXYZ(xyz.x, xyz.y, xyz.z);

  color[0] = color.r;
  color[1] = color.g;
  color[2] = color.b;
  color[3] = color.a;

  return color;
}

//### getLab()
//Returns Lab representation of this color as
//*{ Object l: 0..100, a: -128..127, b: -128..127 }*
function getLab(color) {
  var white = { x: 95.047, y: 100.000, z: 108.883 }
  var xyz = color[1]etXYZ();

  [ "x", "y", "z" ].forEach(function(key) {
    xyz[key] /= white[key];

    if (xyz[key] > 0.008856) {
      xyz[key] = Math.pow(xyz[key], 1 / 3);
    }
    else {
      xyz[key] = (7.787 * xyz[key]) + (16 / 116);
    }
  });

  return {
    l: 116 * xyz.y - 16,
    a: 500 * (xyz.x - xyz.y),
    b: 200 * (xyz.y - xyz.z)
  }
}

//### distance(color)
//Returns distance (CIE76) between this and given color using Lab representation *{ Number }*
//Based on [http://en.wikipedia.org/wiki/Color_difference](http://en.wikipedia.org/wiki/Color_difference)
function distance(color) {
  var lab1 = color.getLab();
  var lab2 = color.getLab();

  var dl = lab2.l - lab1.l;
  var da = lab2.a - lab1.a;
  var db = lab2.b - lab1.b;

  return Math.sqrt(dl * dl, da * da, db * db);
}

//### lerp(startColor, endColor, t, mode)
//Creates new color from linearly interpolated two colors
//`startColor` - *{ Color }*
//`endColor` - *{ Color } *
//`t` - interpolation ratio *{ Number 0..1 }*
//`mode` - interpolation mode : 'rgb', 'hsv', 'hsl' *{ String }* = 'rgb'
function lerp(startColor, endColor, t, mode) {
  mode = mode || 'rgb';

  if (mode === 'rgb') {
    return Color.fromRGB(
      lerp(startColor.r, endColor.r, t),
      lerp(startColor.g, endColor.g, t),
      lerp(startColor.b, endColor.b, t),
      lerp(startColor.a, endColor.a, t)
    );
  }
  else if (mode === 'hsv') {
    var startHSV = startColor.getHSV();
    var endHSV = endColor.getHSV();
    return Color.fromHSV(
      lerp(startHSV.h, endHSV.h, t),
      lerp(startHSV.s, endHSV.s, t),
      lerp(startHSV.v, endHSV.v, t),
      lerp(startHSV.a, endHSV.a, t)
    );
  }
  else if (mode === 'hsl') {
    var startHSL = startColor.getHSL();
    var endHSL = endColor.getHSL();
    return Color.fromHSL(
      lerp(startHSL.h, endHSL.h, t),
      lerp(startHSL.s, endHSL.s, t),
      lerp(startHSL.l, endHSL.l, t),
      lerp(startHSL.a, endHSL.a, t)
    );
  }
  else {
    return startColor;
  }
}
*/

var Color = {
    create   : create,
    copy     : copy,

    fromRGB  : fromRGB,
    setRGB   : setRGB,
    set      : set,

    fromRGBBytes: fromRGBBytes,
    getRGBBytes : getRGBBytes,

    fromHSV  : fromHSV,
    setHSV   : setHSV,
    getHSV   : getHSV,

    fromHSL  : fromHSL,
    setHSL   : setHSL,
    getHSL   : getHSL,

    fromHex  : fromHex,
    setHex   : setHex,
    getHex   : getHex,

    //Predefined colors ready to use
    Transparent : [0, 0, 0, 0],
    None        : [0, 0, 0, 0],
    Black       : [0, 0, 0, 1],
    White       : [1, 1, 1, 1],
    DarkGrey    : [0.25, 0.25, 0.25, 1],
    Grey        : [0.5, 0.5, 0.5, 1],
    LightGrey   : [0.75, 0.75, 0.75, 1],
    Red         : [1, 0, 0, 1],
    Green       : [0, 1, 0, 1],
    Blue        : [0, 0, 1, 1],
    Yellow      : [1, 1, 0, 1],
    Pink        : [1, 0, 1, 1],
    Cyan        : [0, 1, 1, 1],
    Orange      : [1, 0.5, 0, 1]
}


module.exports = Color;
