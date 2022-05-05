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

Color utilities for [PEX](https://pex.gl).

## Installation

```bash
npm install pex-color
```

## Usage

```js
import color from "pex-color";

color.getHex([1, 0, 0]);
// => #FF0000
```

## API

The "color" primitive is an array of 3 (RGB) or 4 (A) values in the range 0 < x < 1.

API naming follows the following rules:

- fromType(color, ...values) = set a color primitive from Type values
- getType(color, out) = convert a color primitive to an array of Type and optionally set it to out

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#create">create([r], [g], [b], [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from linear values.</p>
</dd>
<dt><a href="#copy">copy(color, [out])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Returns a copy of a color.</p>
</dd>
<dt><a href="#set">set(color, color2, [g], [b], [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Sets a color to another color.</p>
</dd>
<dt><a href="#getCSSRGB">getCSSRGB(color, [precision])</a> ⇒ <code><a href="#css">css</a></code></dt>
<dd><p>Returns a rgb CSS string representation of a given color.</p>
</dd>
<dt><a href="#getCSSHSL">getCSSHSL(color, [precision])</a> ⇒ <code><a href="#css">css</a></code></dt>
<dd><p>Returns a hsl CSS string representation of a given color.</p>
</dd>
<dt><a href="#getCSSLab">getCSSLab(color, [precision])</a> ⇒ <code><a href="#css">css</a></code></dt>
<dd><p>Returns a lab CSS string representation of a given color.</p>
</dd>
<dt><a href="#getCSSLCH">getCSSLCH(color, [precision])</a> ⇒ <code><a href="#css">css</a></code></dt>
<dd><p>Returns a lch CSS string representation of a given color.</p>
</dd>
<dt><a href="#getCSSHWB">getCSSHWB(color, [precision])</a> ⇒ <code><a href="#css">css</a></code></dt>
<dd><p>Returns a hwb CSS string representation of a given color.</p>
</dd>
<dt><a href="#fromHex">fromHex(color, hex)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on a hexadecimal string.</p>
</dd>
<dt><a href="#getHex">getHex(color, alpha)</a> ⇒ <code><a href="#hex">hex</a></code></dt>
<dd><p>Returns a hexadecimal string representation of a given color.</p>
</dd>
<dt><a href="#fromHPLuv">fromHPLuv(color, h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on HPLuv values and alpha.</p>
</dd>
<dt><a href="#getHPLuv">getHPLuv(color, out)</a> ⇒ <code><a href="#hpluv">hpluv</a></code></dt>
<dd><p>Returns a HPLuv representation of a given color.</p>
</dd>
<dt><a href="#fromHSL">fromHSL(color, h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on HSL values and alpha.</p>
</dd>
<dt><a href="#getHSL">getHSL(color, out)</a> ⇒ <code><a href="#hsl">hsl</a></code></dt>
<dd><p>Returns a HSL representation of a given color.</p>
</dd>
<dt><a href="#fromHSLuv">fromHSLuv(color, h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on HSLuv values and alpha.</p>
</dd>
<dt><a href="#getHSLuv">getHSLuv(color, out)</a> ⇒ <code><a href="#hsluv">hsluv</a></code></dt>
<dd><p>Returns a HSLuv representation of a given color.</p>
</dd>
<dt><a href="#fromHSV">fromHSV(color, h, s, v, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on HSV values and alpha.</p>
</dd>
<dt><a href="#getHSV">getHSV(color, out)</a> ⇒ <code><a href="#hsv">hsv</a></code></dt>
<dd><p>Returns a HSV representation of a given color.</p>
</dd>
<dt><a href="#fromHWB">fromHWB(color, h, w, b, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on HWB values and alpha.</p>
</dd>
<dt><a href="#getHWB">getHWB(color, out)</a> ⇒ <code><a href="#hwb">hwb</a></code></dt>
<dd><p>Returns a HWB representation of a given color.</p>
</dd>
<dt><a href="#fromLab">fromLab(color, l, a, b, α, illuminant)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on Lab values and alpha.</p>
</dd>
<dt><a href="#getLab">getLab(color, out, illuminant)</a> ⇒ <code><a href="#lab">lab</a></code></dt>
<dd><p>Returns a Lab representation of a given color.</p>
</dd>
<dt><a href="#fromLCHuv">fromLCHuv(color, l, c, h, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on LCHuv values and alpha.</p>
</dd>
<dt><a href="#getLCHuv">getLCHuv(color, out)</a> ⇒ <code><a href="#lchuv">lchuv</a></code></dt>
<dd><p>Returns a LCHuv representation of a given color.</p>
</dd>
<dt><a href="#fromLinear">fromLinear(color, r, g, b, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on linear values.</p>
</dd>
<dt><a href="#getLinear">getLinear(color, out)</a> ⇒ <code><a href="#linear">linear</a></code></dt>
<dd><p>Returns a linear color representation of a given color.</p>
</dd>
<dt><a href="#fromOkhsl">fromOkhsl(color, h, s, l, [α])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on Okhsl values and alpha.</p>
</dd>
<dt><a href="#getOkhsl">getOkhsl(color, out)</a> ⇒ <code><a href="#okhsl">okhsl</a></code></dt>
<dd><p>Returns an Okhsl representation of a given color.</p>
</dd>
<dt><a href="#fromOkhsv">fromOkhsv(color, h, s, v, [α])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on Okhsv values and alpha.</p>
</dd>
<dt><a href="#getOkhsv">getOkhsv(color, out)</a> ⇒ <code><a href="#okhsv">okhsv</a></code></dt>
<dd><p>Returns an Okhsv representation of a given color.</p>
</dd>
<dt><a href="#fromOklab">fromOklab(color, l, a, b, [α])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on Oklab values and alpha.</p>
</dd>
<dt><a href="#getOklab">getOklab(color, out)</a> ⇒ <code><a href="#oklab">oklab</a></code></dt>
<dd><p>Returns an Oklab representation of a given color.</p>
</dd>
<dt><a href="#fromRGB">fromRGB(color, r, g, b, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on linear r, g, b, a values.</p>
</dd>
<dt><a href="#getRGB">getRGB()</a></dt>
<dd><p>Alias for <a href="#copy">copy</a></p>
</dd>
<dt><a href="#fromRGBBytes">fromRGBBytes(color, bytes)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on byte values.</p>
</dd>
<dt><a href="#getRGBBytes">getRGBBytes(color, out)</a> ⇒ <code><a href="#bytes">bytes</a></code></dt>
<dd><p>Get RGB[A] color components as bytes array.</p>
</dd>
<dt><a href="#fromXYZ">fromXYZ(color, x, y, z, a)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on XYZ values and alpha.</p>
</dd>
<dt><a href="#getXYZ">getXYZ(color, out)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Returns a XYZ representation of a given color.</p>
</dd>
</dl>

## Typedefs

<dl>
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
<dd><p>CIELAB with D65 standard illuminant as default.</p>
<p>Components range (D65): 0 &lt;= l &lt;= 1; -0.86183 &lt;= a &lt;= 0.98234; -1.0786 &lt;= b &lt;= 0.94478;</p>
<p>Components range (D50): 0 &lt;= l &lt;= 1; -0.79287 &lt;= a &lt;= 0.9355; -1.12029 &lt;= b &lt;= 0.93388;</p>
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
<dt><a href="#bytes">bytes</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>An array of 3 (RGB) or 4 (A) values in bytes.</p>
<p>All components in the range 0 &lt;= x &lt;= 255</p>
</dd>
<dt><a href="#xyz">xyz</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>CIE XYZ using D65 standard illuminant.</p>
<p>Components range: 0 &lt;= x &lt;= 0.95; 0 &lt;= y &lt;= 1; 0 &lt;= z &lt;= 1.08;</p>
</dd>
</dl>

<a name="module_utils"></a>

## utils

- [utils](#module_utils)
  - [.fromLinear](#module_utils.fromLinear) ⇒ <code>number</code>
  - [.toLinear](#module_utils.toLinear) ⇒ <code>number</code>

<a name="module_utils.fromLinear"></a>

### utils.fromLinear ⇒ <code>number</code>

Convert component from linear value

**Kind**: static constant of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| c     | <code>number</code> |

<a name="module_utils.toLinear"></a>

### utils.toLinear ⇒ <code>number</code>

Convert component to linear value

**Kind**: static constant of [<code>utils</code>](#module_utils)

| Param | Type                |
| ----- | ------------------- |
| c     | <code>number</code> |

<a name="create"></a>

## create([r], [g], [b], [a]) ⇒ [<code>color</code>](#color)

Creates a new color from linear values.

**Kind**: global function

| Param | Type                | Default        |
| ----- | ------------------- | -------------- |
| [r]   | <code>number</code> | <code>0</code> |
| [g]   | <code>number</code> | <code>0</code> |
| [b]   | <code>number</code> | <code>0</code> |
| [a]   | <code>number</code> |                |

<a name="copy"></a>

## copy(color, [out]) ⇒ [<code>color</code>](#color)

Returns a copy of a color.

**Kind**: global function

| Param | Type                         | Description               |
| ----- | ---------------------------- | ------------------------- |
| color | [<code>color</code>](#color) |                           |
| [out] | [<code>color</code>](#color) | Deprecated: use set(c, d) |

<a name="set"></a>

## set(color, color2, [g], [b], [a]) ⇒ [<code>color</code>](#color)

Sets a color to another color.

**Kind**: global function

| Param  | Type                                                | Description                                   |
| ------ | --------------------------------------------------- | --------------------------------------------- |
| color  | [<code>color</code>](#color)                        |                                               |
| color2 | [<code>color</code>](#color) \| <code>number</code> |                                               |
| [g]    | <code>number</code>                                 | // Deprecated: use fromRGB(color, r, g, b, a) |
| [b]    | <code>number</code>                                 | // Deprecated: use fromRGB(color, r, g, b, a) |
| [a]    | <code>number</code>                                 | // Deprecated: use fromRGB(color, r, g, b, a) |

<a name="getCSSRGB"></a>

## getCSSRGB(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a rgb CSS string representation of a given color.

**Kind**: global function

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="getCSSHSL"></a>

## getCSSHSL(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a hsl CSS string representation of a given color.

**Kind**: global function

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="getCSSLab"></a>

## getCSSLab(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a lab CSS string representation of a given color.

**Kind**: global function

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="getCSSLCH"></a>

## getCSSLCH(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a lch CSS string representation of a given color.

**Kind**: global function

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="getCSSHWB"></a>

## getCSSHWB(color, [precision]) ⇒ [<code>css</code>](#css)

Returns a hwb CSS string representation of a given color.

**Kind**: global function

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| color       | [<code>color</code>](#color) |                |
| [precision] | <code>number</code>          | <code>5</code> |

<a name="fromHex"></a>

## fromHex(color, hex) ⇒ [<code>color</code>](#color)

Updates a color based on a hexadecimal string.

**Kind**: global function

| Param | Type                         | Description              |
| ----- | ---------------------------- | ------------------------ |
| color | [<code>color</code>](#color) |                          |
| hex   | [<code>hex</code>](#hex)     | Leading '#' is optional. |

<a name="getHex"></a>

## getHex(color, alpha) ⇒ [<code>hex</code>](#hex)

Returns a hexadecimal string representation of a given color.

**Kind**: global function

| Param | Type                         | Description  |
| ----- | ---------------------------- | ------------ |
| color | [<code>color</code>](#color) |              |
| alpha | <code>boolean</code>         | Handle alpha |

<a name="fromHPLuv"></a>

## fromHPLuv(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HPLuv values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| l     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="getHPLuv"></a>

## getHPLuv(color, out) ⇒ [<code>hpluv</code>](#hpluv)

Returns a HPLuv representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromHSL"></a>

## fromHSL(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HSL values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| l     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="getHSL"></a>

## getHSL(color, out) ⇒ [<code>hsl</code>](#hsl)

Returns a HSL representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromHSLuv"></a>

## fromHSLuv(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HSLuv values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| l     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="getHSLuv"></a>

## getHSLuv(color, out) ⇒ [<code>hsluv</code>](#hsluv)

Returns a HSLuv representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromHSV"></a>

## fromHSV(color, h, s, v, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HSV values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| v     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="getHSV"></a>

## getHSV(color, out) ⇒ [<code>hsv</code>](#hsv)

Returns a HSV representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromHWB"></a>

## fromHWB(color, h, w, b, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HWB values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| w     | <code>number</code>          |
| b     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="getHWB"></a>

## getHWB(color, out) ⇒ [<code>hwb</code>](#hwb)

Returns a HWB representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromLab"></a>

## fromLab(color, l, a, b, α, illuminant) ⇒ [<code>color</code>](#color)

Updates a color based on Lab values and alpha.

**Kind**: global function

| Param      | Type                         |
| ---------- | ---------------------------- |
| color      | [<code>color</code>](#color) |
| l          | <code>number</code>          |
| a          | <code>number</code>          |
| b          | <code>number</code>          |
| α          | <code>number</code>          |
| illuminant | <code>Array</code>           |

<a name="getLab"></a>

## getLab(color, out, illuminant) ⇒ [<code>lab</code>](#lab)

Returns a Lab representation of a given color.

**Kind**: global function

| Param      | Type                         |
| ---------- | ---------------------------- |
| color      | [<code>color</code>](#color) |
| out        | <code>Array</code>           |
| illuminant | <code>Array</code>           |

<a name="fromLCHuv"></a>

## fromLCHuv(color, l, c, h, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on LCHuv values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| l     | <code>number</code>          |
| c     | <code>number</code>          |
| h     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="getLCHuv"></a>

## getLCHuv(color, out) ⇒ [<code>lchuv</code>](#lchuv)

Returns a LCHuv representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromLinear"></a>

## fromLinear(color, r, g, b, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on linear values.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| r     | <code>number</code>          |
| g     | <code>number</code>          |
| b     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="getLinear"></a>

## getLinear(color, out) ⇒ [<code>linear</code>](#linear)

Returns a linear color representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromOkhsl"></a>

## fromOkhsl(color, h, s, l, [α]) ⇒ [<code>color</code>](#color)

Updates a color based on Okhsl values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| l     | <code>number</code>          |
| [α]   | <code>number</code>          |

<a name="getOkhsl"></a>

## getOkhsl(color, out) ⇒ [<code>okhsl</code>](#okhsl)

Returns an Okhsl representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromOkhsv"></a>

## fromOkhsv(color, h, s, v, [α]) ⇒ [<code>color</code>](#color)

Updates a color based on Okhsv values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| h     | <code>number</code>          |
| s     | <code>number</code>          |
| v     | <code>number</code>          |
| [α]   | <code>number</code>          |

<a name="getOkhsv"></a>

## getOkhsv(color, out) ⇒ [<code>okhsv</code>](#okhsv)

Returns an Okhsv representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromOklab"></a>

## fromOklab(color, l, a, b, [α]) ⇒ [<code>color</code>](#color)

Updates a color based on Oklab values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| l     | <code>number</code>          |
| a     | <code>number</code>          |
| b     | <code>number</code>          |
| [α]   | <code>number</code>          |

<a name="getOklab"></a>

## getOklab(color, out) ⇒ [<code>oklab</code>](#oklab)

Returns an Oklab representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromRGB"></a>

## fromRGB(color, r, g, b, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on linear r, g, b, a values.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| r     | <code>number</code>          |
| g     | <code>number</code>          |
| b     | <code>number</code>          |
| [a]   | <code>number</code>          |

<a name="getRGB"></a>

## getRGB()

Alias for [copy](#copy)

**Kind**: global function
<a name="fromRGBBytes"></a>

## fromRGBBytes(color, bytes) ⇒ [<code>color</code>](#color)

Updates a color based on byte values.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| bytes | [<code>bytes</code>](#bytes) |

<a name="getRGBBytes"></a>

## getRGBBytes(color, out) ⇒ [<code>bytes</code>](#bytes)

Get RGB[A] color components as bytes array.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

<a name="fromXYZ"></a>

## fromXYZ(color, x, y, z, a) ⇒ [<code>color</code>](#color)

Updates a color based on XYZ values and alpha.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| x     | <code>number</code>          |
| y     | <code>number</code>          |
| z     | <code>number</code>          |
| a     | <code>number</code>          |

<a name="getXYZ"></a>

## getXYZ(color, out) ⇒ [<code>color</code>](#color)

Returns a XYZ representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | <code>Array</code>           |

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

CIELAB with D65 standard illuminant as default.

Components range (D65): 0 <= l <= 1; -0.86183 <= a <= 0.98234; -1.0786 <= b <= 0.94478;

Components range (D50): 0 <= l <= 1; -0.79287 <= a <= 0.9355; -1.12029 <= b <= 0.93388;

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/CIELAB_color_space](https://en.wikipedia.org/wiki/CIELAB_color_space)
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
**See**: [https://bottosson.github.io/posts/colorpicker/#hsv-2](https://bottosson.github.io/posts/colorpicker/#hsv-2)
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
<a name="bytes"></a>

## bytes : <code>Array.&lt;number&gt;</code>

An array of 3 (RGB) or 4 (A) values in bytes.

All components in the range 0 <= x <= 255

**Kind**: global typedef
<a name="xyz"></a>

## xyz : <code>Array.&lt;number&gt;</code>

CIE XYZ using D65 standard illuminant.

Components range: 0 <= x <= 0.95; 0 <= y <= 1; 0 <= z <= 1.08;

**Kind**: global typedef
**See**: [https://en.wikipedia.org/wiki/CIE_1931_color_space](https://en.wikipedia.org/wiki/CIE_1931_color_space)

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-color/blob/main/LICENSE.md).
