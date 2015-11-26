/**
 * Float (0..1) RGBA Color utility class
 */

//Dependencies imports
var lerp = require('lerp');

/**
 * RGBA color constructor function
 * @param  {Number} [r=0] - red component (0..1)
 * @param  {Number} [g=0] - green component (0..1)
 * @param  {Number} [b=0] - blue component (0..1)
 * @param  {Number} [a=1] - alpha component (0..1)
 * @return {Array}  - RGBA color array [r,g,b,a] (0..1)
 */
function create(r, g, b, a) {
  return [r || 0, g || 0, b || 0, (a === undefined) ? 1 : a];
}


//### copy()
//Copies rgba values from another color into this instance
//`c` - another color to copy values from *{ Color }*
/**
 * Copies color
 * @param  {Array} color - color to copy
 * @param  {Array} [out] - color to copy values into
 * @return {Array} - new RGBA color array [r,g,b,a] (0..1) or updated out color
 */
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

/**
 * Creates new color from RGBA values. Alias for create(r, g, b, a)
 * @param  {Number} r - red component (0..1)
 * @param  {Number} g - green component (0..1)
 * @param  {Number} b - blue component (0..1)
 * @param  {Number} [a=1] - alpha component (0..1)
 * @return {Array} - RGBA color array [r,g,b,a] (0..1)
 */
function fromRGB(r, g, b, a) {
    return create(r, g, b, a);
}

/**
 * @param  {Array} color   - RGBA color array [r,g,b,a] to update
 * @param  {Number} r      - red component (0..1)
 * @param  {Number} g      - green component (0..1)
 * @param  {Number} b      - blue component (0..1)
 * @param  {Number} [a=1]  - alpha component (0..1)
 * @return {Array} - updated RGBA color array [r,g,b,a] (0..1)
 */
function set(color, r, g, b, a) {
  color[0] = r;
  color[1] = g;
  color[2] = b;
  color[3] = (a !== undefined) ? a : 1;

  return color;
}

/**
 * Updates a color based on r, g, b, a component values
 * @param  {Array} color   - RGBA color array [r,g,b,a] to update
 * @param  {Number} r      - red component (0..1)
 * @param  {Number} g      - green component (0..1)
 * @param  {Number} b      - blue component (0..1)
 * @param  {Number} [a=1]  - alpha component (0..1)
 * @return {Array} - updated RGBA color array [r,g,b,a] (0..1)
 */
function setRGB(color, r, g, b, a) {
    color[0] = r;
    color[1] = g;
    color[2] = b;
    color[3] = (a !== undefined) ? a : 1;

    return color;
}

/**
 * Creates new color from array of 4 byte (0..255) values [r, g, b, a]
 * @param  {Array} bytes - RGB color byte array [r,g,b,a] (0..255)
 * @return {Array} - RGBA color array [r,g,b,a] (0..1)
 */
function fromRGBBytes(bytes) {
    return [ bytes[0]/255, bytes[1]/255, bytes[2]/255, (bytes.length == 4) ? bytes[3]/255 : 1];
}

/**
 * Returns RGB color components as bytes (0..255)
 * @param  {Array} color - RGBA color array [r,g,b,a]
 * @param  {Array} out   - array to copy values into
 * @return {Array}       - RGB color byte array [r,g,b] (0..255) or updated out array
 */
function getRGBBytes(color, out) {
    out = out || [0, 0, 0];
    out[0] = Math.round(color[0]*255);
    out[1] = Math.round(color[1]*255);
    out[2] = Math.round(color[2]*255);
    return out;
}

/**
 * Creates new color from hue, saturation and value
 * @param  {Number} h - hue (0..1)
 * @param  {Number} s - saturation (0..1)
 * @param  {Number} v - value (0..1)
 * @param  {Number} [a=1] - alpha (0..1)
 * @return {Array}    - RGBA color array [r,g,b,a] (0..1)
 */
function fromHSV(h, s, v, a) {
  var color = create();
  setHSV(color, h, s, v, a)
  return color;
}

/**
 * Updates a color based on hue, saturation, value and alpha
 * @param  {Array} color   - RGBA color array [r,g,b,a] to update
 * @param  {Number} h - hue (0..1)
 * @param  {Number} s - saturation (0..1)
 * @param  {Number} v - value (0..1)
 * @param  {Number} [a=1] - alpha (0..1)
 * @return {Array}    - updated RGBA color array [r,g,b,a] (0..1)
 */
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

/**
 * Get hue, saturation, value and alpha of given color
 * @param  {Array} color  - RGBA color array [r,g,b,a]
 * @return {Array}        - HSVA values array [h,s,v,a] (0..1)
 */
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

/**
 * Creates new color from hue, saturation, lightness and alpha
 * @param  {Number} h - hue (0..1)
 * @param  {Number} s - saturation (0..1)
 * @param  {Number} l - lightness (0..1)
 * @param  {Number} [a=1] - alpha (0..1)
 * @return {Array} - RGBA color array [r,g,b,a] (0..1)
 */
function fromHSL(h, s, l, a) {
    var color = create();
    setHSL(color, h, s, l, a);
    return color;
}

/**
 * Updates a color based on hue, saturation, lightness and alpha
 * @param  {Array} color   - RGBA color array [r,g,b,a] to update
 * @param  {Number} h - hue (0..1)
 * @param  {Number} s - saturation (0..1)
 * @param  {Number} l - lightness (0..1)
 * @param  {Number} [a=1] - alpha (0..1)
 * @return {Array} - updated RGBA color array [r,g,b,a] (0..1)
 */
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

/**
 * Returns hue, saturation, lightness and alpha of given color.
 * @param  {Array} color  - RGBA color array [r,g,b,a]
 * @return {Array}        - HSLA values array [h,s,l,a] (0..1)
 */
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

/**
 * Creates new color from html hex string
 * @param  {String} hex    - html hex string #RRGGBB (# is optional)
 * @return {Array} - RGBA color array [r,g,b,a] (0..1)
 */
function fromHex(hex) {
    var color = create();
    setHex(color, hex);
    return color;
}

/**
 * Updates a color based on html hex string e.g. #FF0000 -> 1,0,0,1
 * @param  {Array} color   - RGBA color array [r,g,b,a] to update
 * @param  {String} hex    - html hex string #RRGGBB (# is optional)
 * @return {Array} - updated RGBA color array [r,g,b,a] (0..1)
 */
function setHex(color, hex) {
    hex = hex.replace(/^#/, "");
    var num = parseInt(hex, 16);

    color[0] = (num >> 16 & 255) / 255;
    color[1] = (num >> 8 & 255) / 255;
    color[2] = (num & 255) / 255;
    color[3] = 1

    return color;
}

/**
 * Returns html hex representation of given color
 * @param  {Array} color  - RGBA color array [r,g,b,a]
 * @return {String}       - html hex color including leading hash e.g. #FF0000
 */
function getHex(color) {
    var c = [ color[0], color[1], color[2] ].map(function(val) {
        return Math.floor(val * 255);
    });

    return "#" + ((c[2] | c[1] << 8 | c[0] << 16) | 1 << 24)
        .toString(16)
        .slice(1)
        .toUpperCase();
}

/**
 * Creates new color from XYZ values
 * @param  {Number} x - x component (0..95)
 * @param  {Number} y - y component (0..100)
 * @param  {Number} z - z component (0..108)
 * @return {Array} - RGBA color array [r,g,b,a] (0..1)
 */
function fromXYZ(x, y, z) {
    var color = create();
    setXYZ(color, x, y, z);
    return color;
}

function fromXYZValue(val) {
    val /= 100;

    if (val < 0) {
        val = 0;
    }

    if (val > 0.0031308) {
        val = 1.055 * Math.pow(val, (1 / 2.4)) - 0.055;
    }
    else {
        val *= 12.92;
    }

    return val;
}

function toXYZValue(val) {
    if (val > 0.04045) {
        val = Math.pow(((val + 0.055) / 1.055), 2.4);
    }
    else {
        val /= 12.92;
    }

    val *= 100;

    return val;
}

/**
 * Updates a color based on x, y, z component values
 * @param  {Array} color   - RGBA color array [r,g,b,a] to update
 * @param  {Number} x - x component (0..95)
 * @param  {Number} y - y component (0..100)
 * @param  {Number} z - z component (0..108)
 * @return {Array} - updated RGBA color array [r,g,b,a] (0..1)
 */
function setXYZ(color, x, y, z) {
    var r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    var g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    var b = x *  0.0557 + y * -0.2040 + z *  1.0570;

    color[0] = fromXYZValue(r);
    color[1] = fromXYZValue(g);
    color[2] = fromXYZValue(b);
    color[3] = 1.0;

    return color;
}

/**
 * Returns XYZ representation of given color
 * @param  {Array} color  - RGBA color array [r,g,b,a]
 * @return {Array}        - [x,y,z] (x:0..95, y:0..100, z:0..108)
 */
function getXYZ(color) {
    var r = toXYZValue(color[0]);
    var g = toXYZValue(color[1]);
    var b = toXYZValue(color[2]);

    return [
        r * 0.4124 + g * 0.3576 + b * 0.1805,
        r * 0.2126 + g * 0.7152 + b * 0.0722,
        r * 0.0193 + g * 0.1192 + b * 0.9505
    ]
}

/**
 * Creates new color from l,a,b component values
 * @param  {Number} l - l component (0..100)
 * @param  {Number} a - a component (-128..127)
 * @param  {Number} b - b component (-128..127)
 * @return {Array} - RGBA color array [r,g,b,a] (0..1)
 */
function fromLab(l, a, b) {
    var color = create();
    setLab(color, l, a, b);
    return color;
}

function fromLabValueToXYZValue(val, white) {
    var pow = Math.pow(val, 3);

    if (pow > 0.008856) {
        val = pow;
    }
    else {
        val = (val - 16 / 116) / 7.787;
    }

    val *= white;;

    return val;
}

function fromXYZValueToLabValue(val, white) {
    val /= white;

    if (val > 0.008856) {
        val = Math.pow(val, 1 / 3);
    }
    else {
        val = (7.787 * val) + (16 / 116);
    }
    return val;
}

/**
 * Updates a color based on l, a, b, component values
 * @param  {Array} color   - RGBA color array [r,g,b,a] to update
 * @param  {Number} l - l component (0..100)
 * @param  {Number} a - a component (-128..127)
 * @param  {Number} b - b component (-128..127)
 * @return {Array} - updated RGBA color array [r,g,b,a] (0..1)
 */
function setLab(color, l, a, b) {
    var white = [ 95.047, 100.000, 108.883 ]; //for X, Y, Z

    var y = (l + 16) / 116;
    var x = a / 500 + y;
    var z = y - b / 200;

    x = fromLabValueToXYZValue(x, white[0]);
    y = fromLabValueToXYZValue(y, white[1]);
    z = fromLabValueToXYZValue(z, white[2]);

    return setXYZ(color, x, y, z);
}

/**
 * Returns LAB color components
 * @param  {Array} color - RGBA color array [r,g,b,a]
 * @return {Array}       - LAB values array [l,a,b] (l:0..100, a:-128..127, b:-128..127)
 */
function getLab(color) {
    var xyz = getXYZ(color);

    var white = [ 95.047, 100.000, 108.883 ]; //for X, Y, Z

    var x = fromXYZValueToLabValue(xyz[0], white[0]);
    var y = fromXYZValueToLabValue(xyz[1], white[1]);
    var z = fromXYZValueToLabValue(xyz[2], white[2]);

    return [
        116 * y - 16,
        500 * (x - y),
        200 * (y - z)
    ]
}

/*
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
*/

/*
//TODO: add gamma correct interpolation
//### lerp(startColor, endColor, t, mode)
//Creates new color from linearly interpolated two colors
//`startColor` - *{ Color }*
//`endColor` - *{ Color } *
//`t` - interpolation ratio *{ Number 0..1 }*
//`mode` - interpolation mode : 'rgb', 'hsv', 'hsl' *{ String }* = 'rgb'
function lerp(startColor, endColor, t, mode) {
    mode = mode || 'rgb';

    if (mode === 'rgb') {
        return fromRGB(
            lerp(startColor.r, endColor.r, t),
            lerp(startColor.g, endColor.g, t),
            lerp(startColor.b, endColor.b, t),
            lerp(startColor.a, endColor.a, t)
        );
    }
    else if (mode === 'hsv') {
        var startHSV = startColor.getHSV();
        var endHSV = endColor.getHSV();
        return fromHSV(
            lerp(startHSV.h, endHSV.h, t),
            lerp(startHSV.s, endHSV.s, t),
            lerp(startHSV.v, endHSV.v, t),
            lerp(startHSV.a, endHSV.a, t)
        );
    }
    else if (mode === 'hsl') {
        var startHSL = startColor.getHSL();
        var endHSL = endColor.getHSL();
        return fromHSL(
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

/**
 * @name pex-color
 * @desc RGBA color array utility functions
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

    fromXYZ  : fromXYZ,
    setXYZ   : setXYZ,
    getXYZ   : getXYZ,

    fromLab  : fromLab,
    setLab   : setLab,
    getLab   : getLab
}


module.exports = Color;
