# pex-color

[![npm version](https://img.shields.io/npm/v/pex-color)](https://www.npmjs.com/package/pex-color)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/pex-color)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/pex-color)](https://bundlephobia.com/package/pex-color)
[![dependencies](https://img.shields.io/librariesio/release/npm/pex-color)](https://github.com/pex-gl/pex-color/blob/main/package.json)
[![types](https://img.shields.io/npm/types/pex-color)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/pex-gl/pex-color)](https://github.com/pex-gl/pex-color/blob/main/LICENSE.md)

Color utilities (css, p3, hex, hsl, hsv, hwb, lab, lch, xyz, okhsl, okhsv, oklab, oklch, hpluv, hsluv, lchuv, bytes) for [PEX](https://pex.gl).

## Installation

```bash
npm install pex-color
```

## Usage

```js
import * as color from "pex-color";

// Hexadecimal
color.toHex([1, 0, 0]);
// => "#FF0000"

color.toHex([1, 0, 0, 0.5]);
// => "#FF000080"

color.toHex([1, 0, 0, 0.5], false);
// => "#FF0000"

color.fromHex(color.create(), "#FF0000");
// => [1, 0, 0, 1]

color.fromHex(new Array(3), "#FF0000");
// => [1, 0, 0]

// CSS
color.toCSSRGB([1, 0, 0, 1]);
// => "rgba(255, 0, 0, 1)"

color.toCSSP3([1, 0, 0, 1]);
// => "color(display-p3 0.91748 0.20028 0.13856)"

color.toCSSP3([1, 0, 0, 0.5]);
// => "color(display-p3 0.91748 0.20028 0.13856 / 0.5)"

// Various color spaces
color.toOklab([1, 0, 0, 1]);
// => [0.62796, 0.22486, 0.12585, 1]

// Utils
color.utils.linearToSrgb(0.5);
// => 0.7353569830524495
color.utils.D50;
// => [0.9642956764295677, 1, 0.8251046025104602]
```

## API

The "color" primitive is an array of 3 (RGB) or 4 (A) values in the range 0 < x < 1.

API naming follows the following rules:

- fromType(color, ...values) = set a color primitive from Type values
- toType(color, out) = convert a color primitive to an array of Type and optionally set it to out

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_pex-color">pex-color</a></dt>
<dd></dd>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#bytes">bytes</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>An array of 3 (RGB) or 4 (A) values in bytes.</p>
<p>All components in the range 0 &lt;= x &lt;= 255</p>
</dd>
<dt><a href="#color">color</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>An array of 3 (RGB) or 4 (A) values.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#css">css</a> : <code>string</code></dt>
<dd><p>CSS string representation.</p>
</dd>
<dt><a href="#hex">hex</a> : <code>string</code></dt>
<dd><p>hexadecimal string (RGB[A] or RRGGBB[AA]).</p>
</dd>
<dt><a href="#hpluv">hpluv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>CIELUV hue, saturation, lightness.</p>
<p>All components in the range 0 &lt;= x &lt;= 1.</p>
</dd>
<dt><a href="#hsl">hsl</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>hue, saturation, lightness.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#hsluv">hsluv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>CIELUV hue, saturation, lightness.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#hsv">hsv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>hue, saturation, value.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#hwb">hwb</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>hue, whiteness, blackness.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#lab">lab</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>CIELAB perceptual Lightness, a* red/green, b* blue/yellow.</p>
<p>Components range (D65): 0 &lt;= l &lt;= 1; -0.86183 &lt;= a &lt;= 0.98234; -1.0786 &lt;= b &lt;= 0.94478;</p>
<p>Components range (D50): 0 &lt;= l &lt;= 1; -0.79287 &lt;= a &lt;= 0.9355; -1.12029 &lt;= b &lt;= 0.93388;</p>
</dd>
<dt><a href="#lch">lch</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>CIELCh Luminance Chroma Hue. Cylindrical form of Lab.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#lchuv">lchuv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>CIELChuv Luminance Chroma Hue.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#linear">linear</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>r g b linear values.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#okhsl">okhsl</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#okhsv">okhsv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#oklab">oklab</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>Cartesian form using D65 standard illuminant.</p>
<p>Components range: 0 &lt;= l &lt;= 1; -0.233 &lt;= a &lt;= 0.276; -0.311 &lt;= b &lt;= 0.198;</p>
</dd>
<dt><a href="#oklch">oklch</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>Cylindrical form using D65 standard illuminant.</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#p3">p3</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>r, g, b values (DCI-P3 color gamut, D65 whitepoint, sRGB gamma curve).</p>
<p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#xyz">xyz</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>CIE XYZ.</p>
<p>Components range: 0 &lt;= x &lt;= 0.95; 0 &lt;= y &lt;= 1; 0 &lt;= z &lt;= 1.08;</p>
</dd>
</dl>

<a name="module_pex-color"></a>

## pex-color

- [pex-color](#module_pex-color)
  - [.fromBytes(color, bytes)](#module_pex-color.fromBytes) ⇒ [<code>color</code>](#color)
  - [.toBytes(color, out)](#module_pex-color.toBytes) ⇒ [<code>bytes</code>](#bytes)
  - [.create([r], [g], [b], [a])](#module_pex-color.create) ⇒ [<code>color</code>](#color)
  - [.copy(color)](#module_pex-color.copy) ⇒ [<code>color</code>](#color)
  - [.set(color, color2)](#module_pex-color.set) ⇒ [<code>color</code>](#color)
  - [.fromValues(color, r, g, b, [a])](#module_pex-color.fromValues) ⇒ [<code>color</code>](#color)
  - [.toCSSRGB(color, [precision])](#module_pex-color.toCSSRGB) ⇒ [<code>css</code>](#css)
  - [.toCSSRGBLinear(color, [precision])](#module_pex-color.toCSSRGBLinear) ⇒ [<code>css</code>](#css)
  - [.toCSSRGBLinear(color, [precision])](#module_pex-color.toCSSRGBLinear) ⇒ [<code>css</code>](#css)
  - [.toCSSHSL(color, [precision])](#module_pex-color.toCSSHSL) ⇒ [<code>css</code>](#css)
  - [.toCSSHWB(color, [precision])](#module_pex-color.toCSSHWB) ⇒ [<code>css</code>](#css)
  - [.toCSSLab(color, [precision])](#module_pex-color.toCSSLab) ⇒ [<code>css</code>](#css)
  - [.toCSSLab(color, [precision])](#module_pex-color.toCSSLab) ⇒ [<code>css</code>](#css)
  - [.toCSSLCH(color, [precision])](#module_pex-color.toCSSLCH) ⇒ [<code>css</code>](#css)
  - [.toCSSOkLab(color, [precision])](#module_pex-color.toCSSOkLab) ⇒ [<code>css</code>](#css)
  - [.toCSSOklch(color, [precision])](#module_pex-color.toCSSOklch) ⇒ [<code>css</code>](#css)
  - [.toCSSXYZD50(color, [precision])](#module_pex-color.toCSSXYZD50) ⇒ [<code>css</code>](#css)
  - [.toCSSXYZ(color, [precision])](#module_pex-color.toCSSXYZ) ⇒ [<code>css</code>](#css)
  - [.fromHex(color, hex)](#module_pex-color.fromHex) ⇒ [<code>color</code>](#color)
  - [.toHex(color, alpha)](#module_pex-color.toHex) ⇒ [<code>hex</code>](#hex)
  - [.fromHPLuv(color, h, s, l, [a])](#module_pex-color.fromHPLuv) ⇒ [<code>color</code>](#color)
  - [.toHPLuv(color, out)](#module_pex-color.toHPLuv) ⇒ [<code>hpluv</code>](#hpluv)
  - [.fromHSL(color, h, s, l, [a])](#module_pex-color.fromHSL) ⇒ [<code>color</code>](#color)
  - [.toHSL(color, out)](#module_pex-color.toHSL) ⇒ [<code>hsl</code>](#hsl)
  - [.fromHSLuv(color, h, s, l, [a])](#module_pex-color.fromHSLuv) ⇒ [<code>color</code>](#color)
  - [.toHSLuv(color, out)](#module_pex-color.toHSLuv) ⇒ [<code>hsluv</code>](#hsluv)
  - [.fromHSV(color, h, s, v, [a])](#module_pex-color.fromHSV) ⇒ [<code>color</code>](#color)
  - [.toHSV(color, out)](#module_pex-color.toHSV) ⇒ [<code>hsv</code>](#hsv)
  - [.fromHWB(color, h, w, b, [a])](#module_pex-color.fromHWB) ⇒ [<code>color</code>](#color)
  - [.toHWB(color, out)](#module_pex-color.toHWB) ⇒ [<code>hwb</code>](#hwb)
  - [.fromLabD50(color, l, a, b, α)](#module_pex-color.fromLabD50) ⇒ [<code>color</code>](#color)
  - [.toLabD50(color, out)](#module_pex-color.toLabD50) ⇒ [<code>lab</code>](#lab)
  - [.fromLabD65(color, l, a, b, α)](#module_pex-color.fromLabD65) ⇒ [<code>color</code>](#color)
  - [.toLabD65(color, out)](#module_pex-color.toLabD65) ⇒ [<code>lab</code>](#lab)
  - [.fromLCH(color, l, c, h, [a])](#module_pex-color.fromLCH) ⇒ [<code>color</code>](#color)
  - [.toLCH(color, out)](#module_pex-color.toLCH) ⇒ [<code>lch</code>](#lch)
  - [.fromLCHuv(color, l, c, h, [a])](#module_pex-color.fromLCHuv) ⇒ [<code>color</code>](#color)
  - [.toLCHuv(color, out)](#module_pex-color.toLCHuv) ⇒ [<code>lchuv</code>](#lchuv)
  - [.fromLinear(color, r, g, b, [a])](#module_pex-color.fromLinear) ⇒ [<code>color</code>](#color)
  - [.toLinear(color, out)](#module_pex-color.toLinear) ⇒ [<code>linear</code>](#linear)
  - [.fromOkhsl(color, h, s, l, [α])](#module_pex-color.fromOkhsl) ⇒ [<code>color</code>](#color)
  - [.toOkhsl(color, out)](#module_pex-color.toOkhsl) ⇒ [<code>okhsl</code>](#okhsl)
  - [.fromOkhsv(color, h, s, v, [α])](#module_pex-color.fromOkhsv) ⇒ [<code>color</code>](#color)
  - [.toOkhsv(color, out)](#module_pex-color.toOkhsv) ⇒ [<code>okhsv</code>](#okhsv)
  - [.fromOklab(color, L, a, b, [α])](#module_pex-color.fromOklab) ⇒ [<code>color</code>](#color)
  - [.toOklab(color, out)](#module_pex-color.toOklab) ⇒ [<code>oklab</code>](#oklab)
  - [.fromOklch(color, l, c, h, [a])](#module_pex-color.fromOklch) ⇒ [<code>color</code>](#color)
  - [.toOklch(color, out)](#module_pex-color.toOklch) ⇒ [<code>oklch</code>](#oklch)
  - [.fromP3(color, r, g, b, a)](#module_pex-color.fromP3) ⇒ [<code>color</code>](#color)
  - [.toP3(color, out)](#module_pex-color.toP3) ⇒ [<code>p3</code>](#p3)
  - [.fromXYZD50(color, x, y, z, a)](#module_pex-color.fromXYZD50) ⇒ [<code>color</code>](#color)
  - [.toXYZD50(color, out)](#module_pex-color.toXYZD50) ⇒ [<code>xyz</code>](#xyz)
  - [.fromXYZD65(color, x, y, z, a)](#module_pex-color.fromXYZD65) ⇒ [<code>color</code>](#color)
  - [.toXYZD65(color, out)](#module_pex-color.toXYZD65) ⇒ [<code>xyz</code>](#xyz)

<a name="module_pex-color.fromBytes"></a>

### pex-color.fromBytes(color, bytes) ⇒ [<code>color</code>](#color)

Updates a color based on byte values.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| bytes | [<code>bytes</code>](#bytes) |

<a name="module_pex-color.toBytes"></a>

### pex-color.toBytes(color, out) ⇒ [<code>bytes</code>](#bytes)

Get RGB[A] color components as bytes array.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.create"></a>

### pex-color.create([r], [g], [b], [a]) ⇒ [<code>color</code>](#color)

Creates a new color from linear values.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                | Default        |
| ----- | ------------------- | -------------- |
| [r]   | <code>number</code> | <code>0</code> |
| [g]   | <code>number</code> | <code>0</code> |
| [b]   | <code>number</code> | <code>0</code> |
| [a]   | <code>number</code> |                |

<a name="module_pex-color.copy"></a>

### pex-color.copy(color) ⇒ [<code>color</code>](#color)

Returns a copy of a color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="module_pex-color.set"></a>

### pex-color.set(color, color2) ⇒ [<code>color</code>](#color)

Sets a color to another color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param  | Type                         |
| ------ | ---------------------------- |
| color  | [<code>color</code>](#color) |
| color2 | [<code>color</code>](#color) |

<a name="module_pex-color.fromValues"></a>

### pex-color.fromValues(color, r, g, b, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on r, g, b, [a] values.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| r     | <code>number</code>          |
| g     | <code>number</code>          |
| b     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toCSSRGB"></a>

### pex-color.toCSSRGB(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a rgb CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)
**See**: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSRGBLinear"></a>

### pex-color.toCSSRGBLinear(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a linear rgb CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)
**See**: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSRGBLinear"></a>

### pex-color.toCSSRGBLinear(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a P3 rgb CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)
**See**: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSHSL"></a>

### pex-color.toCSSHSL(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a hsl CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)
**See**: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSHWB"></a>

### pex-color.toCSSHWB(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a hwb CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)
**See**: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSLab"></a>

### pex-color.toCSSLab(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a lab CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)
**See**: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSLab"></a>

### pex-color.toCSSLab(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a lab CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSLCH"></a>

### pex-color.toCSSLCH(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a lch CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)
**See**: [https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSOkLab"></a>

### pex-color.toCSSOkLab(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a lab CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSOklch"></a>

### pex-color.toCSSOklch(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a lch CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSXYZD50"></a>

### pex-color.toCSSXYZD50(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a xyz-d50 CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.toCSSXYZ"></a>

### pex-color.toCSSXYZ(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a xyz (xyz-d65) CSS string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="module_pex-color.fromHex"></a>

### pex-color.fromHex(color, hex) ⇒ [<code>color</code>](#color)

Updates a color based on a hexadecimal string.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         | Description              |
| ----- | ---------------------------- | ------------------------ |
| color | [<code>color</code>](#color) |                          |
| hex   | [<code>hex</code>](#hex)     | Leading '#' is optional. |

<a name="module_pex-color.toHex"></a>

### pex-color.toHex(color, alpha) ⇒ [<code>hex</code>](#hex)

Returns a hexadecimal string representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         | Description  |
| ----- | ---------------------------- | ------------ |
| color | [<code>color</code>](#color) |              |
| alpha | <code>boolean</code>         | Handle alpha |

<a name="module_pex-color.fromHPLuv"></a>

### pex-color.fromHPLuv(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HPLuv values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| l     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toHPLuv"></a>

### pex-color.toHPLuv(color, out) ⇒ [<code>hpluv</code>](#hpluv)

Returns a HPLuv representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromHSL"></a>

### pex-color.fromHSL(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HSL values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| l     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toHSL"></a>

### pex-color.toHSL(color, out) ⇒ [<code>hsl</code>](#hsl)

Returns a HSL representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromHSLuv"></a>

### pex-color.fromHSLuv(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HSLuv values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| l     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toHSLuv"></a>

### pex-color.toHSLuv(color, out) ⇒ [<code>hsluv</code>](#hsluv)

Returns a HSLuv representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromHSV"></a>

### pex-color.fromHSV(color, h, s, v, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HSV values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| v     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toHSV"></a>

### pex-color.toHSV(color, out) ⇒ [<code>hsv</code>](#hsv)

Returns a HSV representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromHWB"></a>

### pex-color.fromHWB(color, h, w, b, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HWB values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| w     | <code>number</code>          |
| b     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toHWB"></a>

### pex-color.toHWB(color, out) ⇒ [<code>hwb</code>](#hwb)

Returns a HWB representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromLabD50"></a>

### pex-color.fromLabD50(color, l, a, b, α) ⇒ [<code>color</code>](#color)

Updates a color based on Lab values and alpha using D50 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| l     | <code>number</code>          |
| a     | <code>number</code>          |
| b     | <code>number</code>          |
| α     | <code>number</code>          |

<a name="module_pex-color.toLabD50"></a>

### pex-color.toLabD50(color, out) ⇒ [<code>lab</code>](#lab)

Returns a Lab representation of a given color using D50 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromLabD65"></a>

### pex-color.fromLabD65(color, l, a, b, α) ⇒ [<code>color</code>](#color)

Updates a color based on Lab values and alpha using D65 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| l     | <code>number</code>          |
| a     | <code>number</code>          |
| b     | <code>number</code>          |
| α     | <code>number</code>          |

<a name="module_pex-color.toLabD65"></a>

### pex-color.toLabD65(color, out) ⇒ [<code>lab</code>](#lab)

Returns a Lab representation of a given color using D65 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromLCH"></a>

### pex-color.fromLCH(color, l, c, h, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on LCH values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| l     | <code>number</code>          |
| c     | <code>number</code>          |
| h     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toLCH"></a>

### pex-color.toLCH(color, out) ⇒ [<code>lch</code>](#lch)

Returns a LCH representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromLCHuv"></a>

### pex-color.fromLCHuv(color, l, c, h, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on LCHuv values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| l     | <code>number</code>          |
| c     | <code>number</code>          |
| h     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toLCHuv"></a>

### pex-color.toLCHuv(color, out) ⇒ [<code>lchuv</code>](#lchuv)

Returns a LCHuv representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromLinear"></a>

### pex-color.fromLinear(color, r, g, b, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on linear values.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| r     | <code>number</code>          |
| g     | <code>number</code>          |
| b     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toLinear"></a>

### pex-color.toLinear(color, out) ⇒ [<code>linear</code>](#linear)

Returns a linear color representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromOkhsl"></a>

### pex-color.fromOkhsl(color, h, s, l, [α]) ⇒ [<code>color</code>](#color)

Updates a color based on Okhsl values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| l     | <code>number</code>          |
| [α]   | <code>number</code>          |

<a name="module_pex-color.toOkhsl"></a>

### pex-color.toOkhsl(color, out) ⇒ [<code>okhsl</code>](#okhsl)

Returns an Okhsl representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromOkhsv"></a>

### pex-color.fromOkhsv(color, h, s, v, [α]) ⇒ [<code>color</code>](#color)

Updates a color based on Okhsv values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| v     | <code>number</code>          |
| [α]   | <code>number</code>          |

<a name="module_pex-color.toOkhsv"></a>

### pex-color.toOkhsv(color, out) ⇒ [<code>okhsv</code>](#okhsv)

Returns an Okhsv representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromOklab"></a>

### pex-color.fromOklab(color, L, a, b, [α]) ⇒ [<code>color</code>](#color)

Updates a color based on Oklab values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| L     | <code>number</code>          |
| a     | <code>number</code>          |
| b     | <code>number</code>          |
| [α]   | <code>number</code>          |

<a name="module_pex-color.toOklab"></a>

### pex-color.toOklab(color, out) ⇒ [<code>oklab</code>](#oklab)

Returns an Oklab representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromOklch"></a>

### pex-color.fromOklch(color, l, c, h, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on Oklch values and alpha.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| l     | <code>number</code>          |
| c     | <code>number</code>          |
| h     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="module_pex-color.toOklch"></a>

### pex-color.toOklch(color, out) ⇒ [<code>oklch</code>](#oklch)

Returns an Oklch representation of a given color.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromP3"></a>

### pex-color.fromP3(color, r, g, b, a) ⇒ [<code>color</code>](#color)

Updates a color based on P3 values and alpha using D65 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| r     | <code>number</code>          |
| g     | <code>number</code>          |
| b     | <code>number</code>          |
| a     | <code>number</code>          |

<a name="module_pex-color.toP3"></a>

### pex-color.toP3(color, out) ⇒ [<code>p3</code>](#p3)

Returns a P3 representation of a given color using D65 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromXYZD50"></a>

### pex-color.fromXYZD50(color, x, y, z, a) ⇒ [<code>color</code>](#color)

Updates a color based on XYZ values and alpha using D50 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| x     | <code>number</code>          |
| y     | <code>number</code>          |
| z     | <code>number</code>          |
| a     | <code>number</code>          |

<a name="module_pex-color.toXYZD50"></a>

### pex-color.toXYZD50(color, out) ⇒ [<code>xyz</code>](#xyz)

Returns a XYZ representation of a given color using D50 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_pex-color.fromXYZD65"></a>

### pex-color.fromXYZD65(color, x, y, z, a) ⇒ [<code>color</code>](#color)

Updates a color based on XYZ values and alpha using D65 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| x     | <code>number</code>          |
| y     | <code>number</code>          |
| z     | <code>number</code>          |
| a     | <code>number</code>          |

<a name="module_pex-color.toXYZD65"></a>

### pex-color.toXYZD65(color, out) ⇒ [<code>xyz</code>](#xyz)

Returns a XYZ representation of a given color using D65 standard illuminant.

**Kind**: static method of [<code>pex-color</code>](#module_pex-color)

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="module_utils"></a>

## utils

- [utils](#module_utils)
  - [.D65](#module_utils.D65)
  - [.D50](#module_utils.D50)
  - [.linearToSrgb(c)](#module_utils.linearToSrgb) ⇒ <code>number</code>
  - [.srgbToLinear(c)](#module_utils.srgbToLinear) ⇒ <code>number</code>
  - [.linearToRgb(lr, lg, lb, out)](#module_utils.linearToRgb) ⇒ [<code>color</code>](#color)
  - [.rgbToLinear(r, g, b, out)](#module_utils.rgbToLinear) ⇒ [<code>linear</code>](#linear)
  - [.xyzD65ToLinear(x, y, z, out)](#module_utils.xyzD65ToLinear) ⇒ [<code>linear</code>](#linear)
  - [.linearToXyzD65(lr, lg, lb, out)](#module_utils.linearToXyzD65) ⇒ [<code>xyz</code>](#xyz)
  - [.xyzD50ToLinear(x, y, z, out)](#module_utils.xyzD50ToLinear) ⇒ [<code>linear</code>](#linear)
  - [.linearToXyzD50(lr, lg, lb, out)](#module_utils.linearToXyzD50) ⇒ [<code>xyz</code>](#xyz)
  - [.linearP3ToXyzD65(lr, lg, lb, out)](#module_utils.linearP3ToXyzD65) ⇒ [<code>xyz</code>](#xyz)
  - [.xyzD65ToLinearP3(x, y, z, out)](#module_utils.xyzD65ToLinearP3) ⇒ <code>Array</code>
  - [.lchToLab(l, c, h, out)](#module_utils.lchToLab) ⇒ [<code>lab</code>](#lab)
  - [.labToLch(l, a, b, out)](#module_utils.labToLch) ⇒ [<code>lch</code>](#lch)
  - [.labToXyz(l, a, b, out, illuminant)](#module_utils.labToXyz) ⇒ [<code>xyz</code>](#xyz)
  - [.xyzToLab(x, y, z, out, illuminant)](#module_utils.xyzToLab) ⇒ [<code>lab</code>](#lab)
  - [.oklabToLinear(L, a, b, out)](#module_utils.oklabToLinear) ⇒ [<code>linear</code>](#linear)
  - [.linearToOklab(lr, lg, lb, out)](#module_utils.linearToOklab) ⇒ [<code>oklab</code>](#oklab)

<a name="module_utils.D65"></a>

### utils.D65

Illuminant D65: x,y,z tristimulus values

**Kind**: static constant of [<code>utils</code>](#module_utils)
**See**: [https://en.wikipedia.org/wiki/Standard_illuminant#White_points_of_standard_illuminants](https://en.wikipedia.org/wiki/Standard_illuminant#White_points_of_standard_illuminants)
<a name="module_utils.D50"></a>

### utils.D50

Illuminant D50: x,y,z tristimulus values

**Kind**: static constant of [<code>utils</code>](#module_utils)
<a name="module_utils.linearToSrgb"></a>

### utils.linearToSrgb(c) ⇒ <code>number</code>

Convert component from linear value

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| c     | <code>number</code> |

<a name="module_utils.srgbToLinear"></a>

### utils.srgbToLinear(c) ⇒ <code>number</code>

Convert component to linear value

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| c     | <code>number</code> |

<a name="module_utils.linearToRgb"></a>

### utils.linearToRgb(lr, lg, lb, out) ⇒ [<code>color</code>](#color)

Return a RGB representation from Linear values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| lr    | <code>number</code> |
| lg    | <code>number</code> |
| lb    | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.rgbToLinear"></a>

### utils.rgbToLinear(r, g, b, out) ⇒ [<code>linear</code>](#linear)

Return a Linear representation from RGB values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| r     | <code>number</code> |
| g     | <code>number</code> |
| b     | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.xyzD65ToLinear"></a>

### utils.xyzD65ToLinear(x, y, z, out) ⇒ [<code>linear</code>](#linear)

Return a Linear representation from XYZ values with D65 illuminant.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.linearToXyzD65"></a>

### utils.linearToXyzD65(lr, lg, lb, out) ⇒ [<code>xyz</code>](#xyz)

Return a XYZ representation with D65 illuminant from Linear values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| lr    | <code>number</code> |
| lg    | <code>number</code> |
| lb    | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.xyzD50ToLinear"></a>

### utils.xyzD50ToLinear(x, y, z, out) ⇒ [<code>linear</code>](#linear)

Return a Linear representation from XYZ values with D50 illuminant.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.linearToXyzD50"></a>

### utils.linearToXyzD50(lr, lg, lb, out) ⇒ [<code>xyz</code>](#xyz)

Return a XYZ representation with D50 illuminant from Linear values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| lr    | <code>number</code> |
| lg    | <code>number</code> |
| lb    | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.linearP3ToXyzD65"></a>

### utils.linearP3ToXyzD65(lr, lg, lb, out) ⇒ [<code>xyz</code>](#xyz)

Return a XYZ representation with D65 illuminant from Linear P3 values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| lr    | <code>number</code> |
| lg    | <code>number</code> |
| lb    | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.xyzD65ToLinearP3"></a>

### utils.xyzD65ToLinearP3(x, y, z, out) ⇒ <code>Array</code>

Return a Linear P3 representation from XYZ values with D65 illuminant.

**Kind**: static method of [<code>utils</code>](#module_utils)
**Returns**: <code>Array</code> - P3 Linear

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.lchToLab"></a>

### utils.lchToLab(l, c, h, out) ⇒ [<code>lab</code>](#lab)

Return a Lab representation from LCH values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| l     | <code>number</code> |
| c     | <code>number</code> |
| h     | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.labToLch"></a>

### utils.labToLch(l, a, b, out) ⇒ [<code>lch</code>](#lch)

Return a Lch representation from Lab values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| l     | <code>number</code> |
| a     | <code>number</code> |
| b     | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.labToXyz"></a>

### utils.labToXyz(l, a, b, out, illuminant) ⇒ [<code>xyz</code>](#xyz)

Return a XYZ representation from Lab values with provided illuminant.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param      | Type                |
| ---------- | ------------------- |
| l          | <code>number</code> |
| a          | <code>number</code> |
| b          | <code>number</code> |
| out        | <code>Array</code>  |
| illuminant | <code>Array</code>  |

<a name="module_utils.xyzToLab"></a>

### utils.xyzToLab(x, y, z, out, illuminant) ⇒ [<code>lab</code>](#lab)

Return a lab representation from XYZ values with provided illuminant.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param      | Type                |
| ---------- | ------------------- |
| x          | <code>number</code> |
| y          | <code>number</code> |
| z          | <code>number</code> |
| out        | <code>Array</code>  |
| illuminant | <code>Array</code>  |

<a name="module_utils.oklabToLinear"></a>

### utils.oklabToLinear(L, a, b, out) ⇒ [<code>linear</code>](#linear)

Return a Linear representation from Oklab values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| L     | <code>number</code> |
| a     | <code>number</code> |
| b     | <code>number</code> |
| out   | <code>Array</code>  |

<a name="module_utils.linearToOklab"></a>

### utils.linearToOklab(lr, lg, lb, out) ⇒ [<code>oklab</code>](#oklab)

Return a Oklab representation from Linear values.

**Kind**: static method of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| lr    | <code>number</code> |
| lg    | <code>number</code> |
| lb    | <code>number</code> |
| out   | <code>Array</code>  |

<a name="bytes"></a>

## bytes : <code>Array.&lt;number&gt;</code>

An array of 3 (RGB) or 4 (A) values in bytes.

All components in the range 0 <= x <= 255

**Kind**: global typedef
<a name="color"></a>

## color : <code>Array.&lt;number&gt;</code>

An array of 3 (RGB) or 4 (A) values.

All components in the range 0 <= x <= 1

**Kind**: global typedef
<a name="css"></a>

## css : <code>string</code>

CSS string representation.

**Kind**: global typedef
**See**: [https://www.w3.org/TR/css-color-4/](https://www.w3.org/TR/css-color-4/)
<a name="hex"></a>

## hex : <code>string</code>

hexadecimal string (RGB[A] or RRGGBB[AA]).

**Kind**: global typedef
<a name="hpluv"></a>

## hpluv : <code>Array.&lt;number&gt;</code>

CIELUV hue, saturation, lightness.

All components in the range 0 <= x <= 1.

**Kind**: global typedef
<a name="hsl"></a>

## hsl : <code>Array.&lt;number&gt;</code>

hue, saturation, lightness.

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/HSL_and_HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
<a name="hsluv"></a>

## hsluv : <code>Array.&lt;number&gt;</code>

CIELUV hue, saturation, lightness.

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://www.hsluv.org/](https://www.hsluv.org/)
<a name="hsv"></a>

## hsv : <code>Array.&lt;number&gt;</code>

hue, saturation, value.

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/HSL_and_HSV](https://en.wikipedia.org/wiki/HSL_and_HSV)
<a name="hwb"></a>

## hwb : <code>Array.&lt;number&gt;</code>

hue, whiteness, blackness.

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/HWB_color_model](https://en.wikipedia.org/wiki/HWB_color_model)
<a name="lab"></a>

## lab : <code>Array.&lt;number&gt;</code>

CIELAB perceptual Lightness, a* red/green, b* blue/yellow.

Components range (D65): 0 <= l <= 1; -0.86183 <= a <= 0.98234; -1.0786 <= b <= 0.94478;

Components range (D50): 0 <= l <= 1; -0.79287 <= a <= 0.9355; -1.12029 <= b <= 0.93388;

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/CIELAB_color_space](https://en.wikipedia.org/wiki/CIELAB_color_space)
<a name="lch"></a>

## lch : <code>Array.&lt;number&gt;</code>

CIELCh Luminance Chroma Hue. Cylindrical form of Lab.

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_model](https://en.wikipedia.org/wiki/CIELAB_color_space#Cylindrical_model)
<a name="lchuv"></a>

## lchuv : <code>Array.&lt;number&gt;</code>

CIELChuv Luminance Chroma Hue.

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/CIELUV](https://en.wikipedia.org/wiki/CIELUV)
<a name="linear"></a>

## linear : <code>Array.&lt;number&gt;</code>

r g b linear values.

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/SRGB](https://en.wikipedia.org/wiki/SRGB)
<a name="okhsl"></a>

## okhsl : <code>Array.&lt;number&gt;</code>

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://bottosson.github.io/posts/colorpicker/#hsl-2](https://bottosson.github.io/posts/colorpicker/#hsl-2)
<a name="okhsv"></a>

## okhsv : <code>Array.&lt;number&gt;</code>

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://bottosson.github.io/posts/colorpicker/#hsv-2](https://bottosson.github.io/posts/colorpicker/#hsv-2)
<a name="oklab"></a>

## oklab : <code>Array.&lt;number&gt;</code>

Cartesian form using D65 standard illuminant.

Components range: 0 <= l <= 1; -0.233 <= a <= 0.276; -0.311 <= b <= 0.198;

**Kind**: global typedef
**See**: [https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab](https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab)
<a name="oklch"></a>

## oklch : <code>Array.&lt;number&gt;</code>

Cylindrical form using D65 standard illuminant.

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://drafts.csswg.org/css-color/#color-conversion-code](https://drafts.csswg.org/css-color/#color-conversion-code)
<a name="p3"></a>

## p3 : <code>Array.&lt;number&gt;</code>

r, g, b values (DCI-P3 color gamut, D65 whitepoint, sRGB gamma curve).

All components in the range 0 <= x <= 1

**Kind**: global typedef
**See**: [https://drafts.csswg.org/css-color/#color-conversion-code](https://drafts.csswg.org/css-color/#color-conversion-code)
<a name="xyz"></a>

## xyz : <code>Array.&lt;number&gt;</code>

CIE XYZ.

Components range: 0 <= x <= 0.95; 0 <= y <= 1; 0 <= z <= 1.08;

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/CIE_1931_color_space](https://en.wikipedia.org/wiki/CIE_1931_color_space)

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-color/blob/main/LICENSE.md).
