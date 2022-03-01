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

- fromType(...values) = create a generic color from Type values
- setType(color, ...values) = set a color primitive from Type values
- getType(color) = convert a color primitive to an array of Type

<!-- api-start -->

## Functions

<dl>
<dt><a href="#create">create([r], [g], [b], [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from component values.</p>
</dd>
<dt><a href="#copy">copy(color, [out])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Returns a copy of a color.</p>
</dd>
<dt><a href="#set">set(color, color2, [g], [b], [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Sets a color to another color.</p>
</dd>
<dt><a href="#fromHex">fromHex(hex)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from a html hex string</p>
</dd>
<dt><a href="#setHex">setHex(color, hex)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on a html hex string.</p>
</dd>
<dt><a href="#getHex">getHex(color)</a> ⇒ <code><a href="#hex">hex</a></code></dt>
<dd><p>Returns a html hex string representation of a given color.</p>
</dd>
<dt><a href="#fromHPLuv">fromHPLuv(h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from HPLuv values and alpha.</p>
</dd>
<dt><a href="#setHPLuv">setHPLuv(color, h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on HPLuv values and alpha.</p>
</dd>
<dt><a href="#getHPLuv">getHPLuv(color)</a> ⇒ <code><a href="#hpluv">hpluv</a></code></dt>
<dd><p>Returns a HPLuv representation of a given color.</p>
</dd>
<dt><a href="#fromHSL">fromHSL(h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from hue, saturation, lightness and alpha.</p>
</dd>
<dt><a href="#setHSL">setHSL(color, h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on hue, saturation, lightness and alpha.</p>
</dd>
<dt><a href="#getHSL">getHSL(color)</a> ⇒ <code><a href="#hsl">hsl</a></code></dt>
<dd><p>Returns a hsl representation of a given color.</p>
</dd>
<dt><a href="#fromHSLuv">fromHSLuv(h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from HSLuv values and alpha.</p>
</dd>
<dt><a href="#setHSLuv">setHSLuv(color, h, s, l, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on HSLuv values and alpha.</p>
</dd>
<dt><a href="#getHSLuv">getHSLuv(color)</a> ⇒ <code><a href="#hsluv">hsluv</a></code></dt>
<dd><p>Returns a HSLuv representation of a given color.</p>
</dd>
<dt><a href="#fromHSV">fromHSV(h, s, v, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from hue, saturation, value and alpha.</p>
</dd>
<dt><a href="#setHSV">setHSV(color, h, s, v, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on hue, saturation, value and alpha.</p>
</dd>
<dt><a href="#getHSV">getHSV(color)</a> ⇒ <code><a href="#hsv">hsv</a></code></dt>
<dd><p>Get hue, saturation, value and alpha of a given color.</p>
</dd>
<dt><a href="#fromLab">fromLab(l, a, b, α)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from Lab component values</p>
</dd>
<dt><a href="#setLab">setLab(color, l, a, b, α)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on Lab component values.</p>
</dd>
<dt><a href="#getLab">getLab(color)</a> ⇒ <code><a href="#lab">lab</a></code></dt>
<dd><p>Returns a Lab representation of a given color.</p>
</dd>
<dt><a href="#fromLCHuv">fromLCHuv(l, c, h, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from LCHuv values and alpha.</p>
</dd>
<dt><a href="#setLCHuv">setLCHuv(color, l, c, h, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on LCHuv values and alpha.</p>
</dd>
<dt><a href="#getLCHuv">getLCHuv(color)</a> ⇒ <code><a href="#lchuv">lchuv</a></code></dt>
<dd><p>Returns a LCHuv representation of a given color.</p>
</dd>
<dt><a href="#fromRGB">fromRGB()</a></dt>
<dd><p>Alias for <a href="#create">create</a></p>
</dd>
<dt><a href="#setRGB">setRGB(color, r, g, b, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on r, g, b, a component values.</p>
</dd>
<dt><a href="#fromRGBBytes">fromRGBBytes(bytes)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from an array of bytes values.</p>
</dd>
<dt><a href="#setRGBBytes">setRGBBytes(color, r, g, b, [a])</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Set a color from byte values.</p>
</dd>
<dt><a href="#getRGBBytes">getRGBBytes(color, out)</a> ⇒ <code><a href="#bytes">bytes</a></code></dt>
<dd><p>Get RGB color components as bytes array.</p>
</dd>
<dt><a href="#fromXYZ">fromXYZ(x, y, z, a)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Creates a new color from XYZ values.</p>
</dd>
<dt><a href="#setXYZ">setXYZ(color, x, y, z, a)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Updates a color based on x, y, z component values.</p>
</dd>
<dt><a href="#getXYZ">getXYZ(color)</a> ⇒ <code><a href="#color">color</a></code></dt>
<dd><p>Returns a XYZ representation of a given color.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#hex">hex</a> : <code>string</code></dt>
<dd><p>RGB hex value string eg. #RRGGBB[AA]</p>
</dd>
<dt><a href="#hpluv">hpluv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>Components range: 0 &lt;= h &lt;= 360; 0 &lt;= s &lt;= 100; 0 &lt;= l &lt;= 100;</p>
</dd>
<dt><a href="#hsl">hsl</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#hsluv">hsluv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>Components range: 0 &lt;= h &lt;= 360; 0 &lt;= s &lt;= 100; 0 &lt;= l &lt;= 100;</p>
</dd>
<dt><a href="#hsv">hsv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#color">color</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>All components in the range 0 &lt;= x &lt;= 1</p>
</dd>
<dt><a href="#lab">lab</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>Components range: 0 &lt;= l &lt;= 100; -128 &lt;= a &lt;= 127; -128 &lt;= b &lt;= 127;</p>
</dd>
<dt><a href="#lchuv">lchuv</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>Components range: 0 &lt;= l &lt;= 100; 0 &lt;= c &lt;= 100; 0 &lt;= h &lt;= 360;</p>
</dd>
<dt><a href="#bytes">bytes</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>All components in the range 0 &lt;= x &lt;= 255</p>
</dd>
<dt><a href="#xyz">xyz</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>Components range: 0 &lt;= x &lt;= 95; 0 &lt;= y &lt;= 100; 0 &lt;= z &lt;= 108;</p>
</dd>
</dl>

<a name="create"></a>

## create([r], [g], [b], [a]) ⇒ [<code>color</code>](#color)

Creates a new color from component values.

**Kind**: global function

| Param | Type                | Default        |
| ----- | ------------------- | -------------- |
| [r]   | <code>number</code> | <code>0</code> |
| [g]   | <code>number</code> | <code>0</code> |
| [b]   | <code>number</code> | <code>0</code> |
| [a]   | <code>number</code> | <code>1</code> |

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

| Param  | Type                                                | Description                                  |
| ------ | --------------------------------------------------- | -------------------------------------------- |
| color  | [<code>color</code>](#color)                        |                                              |
| color2 | [<code>color</code>](#color) \| <code>number</code> |                                              |
| [g]    | <code>number</code>                                 | // Deprecated: use setRGB(color, r, g, b, a) |
| [b]    | <code>number</code>                                 | // Deprecated: use setRGB(color, r, g, b, a) |
| [a]    | <code>number</code>                                 | // Deprecated: use setRGB(color, r, g, b, a) |

<a name="fromHex"></a>

## fromHex(hex) ⇒ [<code>color</code>](#color)

Creates a new color from a html hex string

**Kind**: global function

| Param | Type                     |
| ----- | ------------------------ |
| hex   | [<code>hex</code>](#hex) |

<a name="setHex"></a>

## setHex(color, hex) ⇒ [<code>color</code>](#color)

Updates a color based on a html hex string.

**Kind**: global function

| Param | Type                         | Description              |
| ----- | ---------------------------- | ------------------------ |
| color | [<code>color</code>](#color) |                          |
| hex   | [<code>hex</code>](#hex)     | Leading '#' is optional. |

<a name="getHex"></a>

## getHex(color) ⇒ [<code>hex</code>](#hex)

Returns a html hex string representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="fromHPLuv"></a>

## fromHPLuv(h, s, l, [a]) ⇒ [<code>color</code>](#color)

Creates a new color from HPLuv values and alpha.

**Kind**: global function

| Param | Type                | Default        |
| ----- | ------------------- | -------------- |
| h     | <code>number</code> |                |
| s     | <code>number</code> |                |
| l     | <code>number</code> |                |
| [a]   | <code>number</code> | <code>1</code> |

<a name="setHPLuv"></a>

## setHPLuv(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HPLuv values and alpha.

**Kind**: global function

| Param | Type                         | Default        |
| ----- | ---------------------------- | -------------- |
| color | [<code>color</code>](#color) |                |
| h     | <code>number</code>          |                |
| s     | <code>number</code>          |                |
| l     | <code>number</code>          |                |
| [a]   | <code>number</code>          | <code>1</code> |

<a name="getHPLuv"></a>

## getHPLuv(color) ⇒ [<code>hpluv</code>](#hpluv)

Returns a HPLuv representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="fromHSL"></a>

## fromHSL(h, s, l, [a]) ⇒ [<code>color</code>](#color)

Creates a new color from hue, saturation, lightness and alpha.

**Kind**: global function

| Param | Type                | Default        |
| ----- | ------------------- | -------------- |
| h     | <code>number</code> |                |
| s     | <code>number</code> |                |
| l     | <code>number</code> |                |
| [a]   | <code>number</code> | <code>1</code> |

<a name="setHSL"></a>

## setHSL(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on hue, saturation, lightness and alpha.

**Kind**: global function

| Param | Type                         | Default        |
| ----- | ---------------------------- | -------------- |
| color | [<code>color</code>](#color) |                |
| h     | <code>number</code>          |                |
| s     | <code>number</code>          |                |
| l     | <code>number</code>          |                |
| [a]   | <code>number</code>          | <code>1</code> |

<a name="getHSL"></a>

## getHSL(color) ⇒ [<code>hsl</code>](#hsl)

Returns a hsl representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="fromHSLuv"></a>

## fromHSLuv(h, s, l, [a]) ⇒ [<code>color</code>](#color)

Creates a new color from HSLuv values and alpha.

**Kind**: global function

| Param | Type                | Default        |
| ----- | ------------------- | -------------- |
| h     | <code>number</code> |                |
| s     | <code>number</code> |                |
| l     | <code>number</code> |                |
| [a]   | <code>number</code> | <code>1</code> |

<a name="setHSLuv"></a>

## setHSLuv(color, h, s, l, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on HSLuv values and alpha.

**Kind**: global function

| Param | Type                         | Default        |
| ----- | ---------------------------- | -------------- |
| color | [<code>color</code>](#color) |                |
| h     | <code>number</code>          |                |
| s     | <code>number</code>          |                |
| l     | <code>number</code>          |                |
| [a]   | <code>number</code>          | <code>1</code> |

<a name="getHSLuv"></a>

## getHSLuv(color) ⇒ [<code>hsluv</code>](#hsluv)

Returns a HSLuv representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="fromHSV"></a>

## fromHSV(h, s, v, [a]) ⇒ [<code>color</code>](#color)

Creates a new color from hue, saturation, value and alpha.

**Kind**: global function

| Param | Type                | Default        |
| ----- | ------------------- | -------------- |
| h     | <code>number</code> |                |
| s     | <code>number</code> |                |
| v     | <code>number</code> |                |
| [a]   | <code>number</code> | <code>1</code> |

<a name="setHSV"></a>

## setHSV(color, h, s, v, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on hue, saturation, value and alpha.

**Kind**: global function

| Param | Type                         | Default        |
| ----- | ---------------------------- | -------------- |
| color | [<code>color</code>](#color) |                |
| h     | <code>number</code>          |                |
| s     | <code>number</code>          |                |
| v     | <code>number</code>          |                |
| [a]   | <code>number</code>          | <code>1</code> |

<a name="getHSV"></a>

## getHSV(color) ⇒ [<code>hsv</code>](#hsv)

Get hue, saturation, value and alpha of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="fromLab"></a>

## fromLab(l, a, b, α) ⇒ [<code>color</code>](#color)

Creates a new color from Lab component values

**Kind**: global function

| Param | Type                |
| ----- | ------------------- |
| l     | <code>number</code> |
| a     | <code>number</code> |
| b     | <code>number</code> |
| α     | <code>number</code> |

<a name="setLab"></a>

## setLab(color, l, a, b, α) ⇒ [<code>color</code>](#color)

Updates a color based on Lab component values.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| l     | <code>number</code>          |
| a     | <code>number</code>          |
| b     | <code>number</code>          |
| α     | <code>number</code>          |

<a name="getLab"></a>

## getLab(color) ⇒ [<code>lab</code>](#lab)

Returns a Lab representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="fromLCHuv"></a>

## fromLCHuv(l, c, h, [a]) ⇒ [<code>color</code>](#color)

Creates a new color from LCHuv values and alpha.

**Kind**: global function

| Param | Type                | Default        |
| ----- | ------------------- | -------------- |
| l     | <code>number</code> |                |
| c     | <code>number</code> |                |
| h     | <code>number</code> |                |
| [a]   | <code>number</code> | <code>1</code> |

<a name="setLCHuv"></a>

## setLCHuv(color, l, c, h, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on LCHuv values and alpha.

**Kind**: global function

| Param | Type                         | Default        |
| ----- | ---------------------------- | -------------- |
| color | [<code>color</code>](#color) |                |
| l     | <code>number</code>          |                |
| c     | <code>number</code>          |                |
| h     | <code>number</code>          |                |
| [a]   | <code>number</code>          | <code>1</code> |

<a name="getLCHuv"></a>

## getLCHuv(color) ⇒ [<code>lchuv</code>](#lchuv)

Returns a LCHuv representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="fromRGB"></a>

## fromRGB()

Alias for [create](#create)

**Kind**: global function
<a name="setRGB"></a>

## setRGB(color, r, g, b, [a]) ⇒ [<code>color</code>](#color)

Updates a color based on r, g, b, a component values.

**Kind**: global function

| Param | Type                         | Default        |
| ----- | ---------------------------- | -------------- |
| color | [<code>color</code>](#color) |                |
| r     | <code>number</code>          |                |
| g     | <code>number</code>          |                |
| b     | <code>number</code>          |                |
| [a]   | <code>number</code>          | <code>1</code> |

<a name="fromRGBBytes"></a>

## fromRGBBytes(bytes) ⇒ [<code>color</code>](#color)

Creates a new color from an array of bytes values.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| bytes | [<code>bytes</code>](#bytes) |

<a name="setRGBBytes"></a>

## setRGBBytes(color, r, g, b, [a]) ⇒ [<code>color</code>](#color)

Set a color from byte values.

**Kind**: global function

| Param | Type                         | Default          |
| ----- | ---------------------------- | ---------------- |
| color | [<code>color</code>](#color) |                  |
| r     | <code>number</code>          |                  |
| g     | <code>number</code>          |                  |
| b     | <code>number</code>          |                  |
| [a]   | <code>number</code>          | <code>255</code> |

<a name="getRGBBytes"></a>

## getRGBBytes(color, out) ⇒ [<code>bytes</code>](#bytes)

Get RGB color components as bytes array.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| out   | [<code>bytes</code>](#bytes) |

<a name="fromXYZ"></a>

## fromXYZ(x, y, z, a) ⇒ [<code>color</code>](#color)

Creates a new color from XYZ values.

**Kind**: global function

| Param | Type                |
| ----- | ------------------- |
| x     | <code>number</code> |
| y     | <code>number</code> |
| z     | <code>number</code> |
| a     | <code>number</code> |

<a name="setXYZ"></a>

## setXYZ(color, x, y, z, a) ⇒ [<code>color</code>](#color)

Updates a color based on x, y, z component values.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |
| x     | <code>number</code>          |
| y     | <code>number</code>          |
| z     | <code>number</code>          |
| a     | <code>number</code>          |

<a name="getXYZ"></a>

## getXYZ(color) ⇒ [<code>color</code>](#color)

Returns a XYZ representation of a given color.

**Kind**: global function

| Param | Type                         |
| ----- | ---------------------------- |
| color | [<code>color</code>](#color) |

<a name="hex"></a>

## hex : <code>string</code>

RGB hex value string eg. #RRGGBB[AA]

**Kind**: global typedef
<a name="hpluv"></a>

## hpluv : <code>Array.&lt;number&gt;</code>

Components range: 0 <= h <= 360; 0 <= s <= 100; 0 <= l <= 100;

**Kind**: global typedef
<a name="hsl"></a>

## hsl : <code>Array.&lt;number&gt;</code>

All components in the range 0 <= x <= 1

**Kind**: global typedef
<a name="hsluv"></a>

## hsluv : <code>Array.&lt;number&gt;</code>

Components range: 0 <= h <= 360; 0 <= s <= 100; 0 <= l <= 100;

**Kind**: global typedef
<a name="hsv"></a>

## hsv : <code>Array.&lt;number&gt;</code>

All components in the range 0 <= x <= 1

**Kind**: global typedef
<a name="color"></a>

## color : <code>Array.&lt;number&gt;</code>

All components in the range 0 <= x <= 1

**Kind**: global typedef
<a name="lab"></a>

## lab : <code>Array.&lt;number&gt;</code>

Components range: 0 <= l <= 100; -128 <= a <= 127; -128 <= b <= 127;

**Kind**: global typedef
<a name="lchuv"></a>

## lchuv : <code>Array.&lt;number&gt;</code>

Components range: 0 <= l <= 100; 0 <= c <= 100; 0 <= h <= 360;

**Kind**: global typedef
<a name="bytes"></a>

## bytes : <code>Array.&lt;number&gt;</code>

All components in the range 0 <= x <= 255

**Kind**: global typedef
<a name="xyz"></a>

## xyz : <code>Array.&lt;number&gt;</code>

Components range: 0 <= x <= 95; 0 <= y <= 100; 0 <= z <= 108;

**Kind**: global typedef

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-color/blob/main/LICENSE.md).
