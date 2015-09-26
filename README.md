# pex- color

Color utilities for the pex library

## Color
- [`copy(color, out)`](#copy_color__out_)
- [`create(r, g, b, a)`](#create_r__g__b__a_)
- [`fromHSL(h, s, l, a)`](#fromHSL_h__s__l__a_)
- [`fromHSV(h, s, v, a)`](#fromHSV_h__s__v__a_)
- [`fromHex(hex)`](#fromHex_hex_)
- [`fromLab(l, a, b)`](#fromLab_l__a__b_)
- [`fromRGB(r, g, b, a)`](#fromRGB_r__g__b__a_)
- [`fromRGBBytes(bytes)`](#fromRGBBytes_bytes_)
- [`fromXYZ(x, y, z)`](#fromXYZ_x__y__z_)
- [`getHSL(color)`](#getHSL_color_)
- [`getHSV(color)`](#getHSV_color_)
- [`getHex(color)`](#getHex_color_)
- [`getLab(color)`](#getLab_color_)
- [`getRGBBytes(color, out)`](#getRGBBytes_color__out_)
- [`getXYZ(color)`](#getXYZ_color_)
- [`lerp`](#lerp)
- [`set(color, r, g, b, a)`](#set_color__r__g__b__a_)
- [`setHSL(color, h, s, l, a)`](#setHSL_color__h__s__l__a_)
- [`setHSV(color, h, s, v, a)`](#setHSV_color__h__s__v__a_)
- [`setHex(color, hex)`](#setHex_color__hex_)
- [`setLab(color, l, a, b)`](#setLab_color__l__a__b_)
- [`setRGB(color, r, g, b, a)`](#setRGB_color__r__g__b__a_)
- [`setXYZ(color, x, y, z)`](#setXYZ_color__x__y__z_)
- [`Color.Black`](#Color_Black)
- [`Color.Blue`](#Color_Blue)
- [`Color.Cyan`](#Color_Cyan)
- [`Color.DarkGrey`](#Color_DarkGrey)
- [`Color.Green`](#Color_Green)
- [`Color.Grey`](#Color_Grey)
- [`Color.LightGrey`](#Color_LightGrey)
- [`Color.Orange`](#Color_Orange)
- [`Color.Pink`](#Color_Pink)
- [`Color.Red`](#Color_Red)
- [`Color.Transparent`](#Color_Transparent)
- [`Color.White`](#Color_White)
- [`Color.Yellow`](#Color_Yellow)

## Reference

<a name="copy_color__out_">
## copy(color, out)
Copies color
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|color to copy|
|out|`Array`|color to copy values into|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|new RGBA color array [r,g,b,a] (0..1) or updated out color|
<a name="create_r__g__b__a_">
## create(r, g, b, a)
RGBA color constructor function
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|r|`Number`|red component (0..1)|
|g|`Number`|green component (0..1)|
|b|`Number`|blue component (0..1)|
|a|`Number`|alpha component (0..1)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGBA color array [r,g,b,a] (0..1)|
<a name="fromHSL_h__s__l__a_">
## fromHSL(h, s, l, a)
Creates new color from hue, saturation, lightness and alpha
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|h|`Number`|hue (0..1)|
|s|`Number`|saturation (0..1)|
|l|`Number`|lightness (0..1)|
|a|`Number`|alpha (0..1)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGBA color array [r,g,b,a] (0..1)|
<a name="fromHSV_h__s__v__a_">
## fromHSV(h, s, v, a)
Creates new color from hue, saturation and value
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|h|`Number`|hue (0..1)|
|s|`Number`|saturation (0..1)|
|v|`Number`|value (0..1)|
|a|`Number`|alpha (0..1)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGBA color array [r,g,b,a] (0..1)|
<a name="fromHex_hex_">
## fromHex(hex)
Creates new color from html hex string
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|hex|`String`|html hex string #RRGGBB (# is optional)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGBA color array [r,g,b,a] (0..1)|
<a name="fromLab_l__a__b_">
## fromLab(l, a, b)
Creates new color from l,a,b component values
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|l|`Number`|l component (0..100)|
|a|`Number`|a component (-128..127)|
|b|`Number`|b component (-128..127)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGBA color array [r,g,b,a] (0..1)|
<a name="fromRGB_r__g__b__a_">
## fromRGB(r, g, b, a)
Creates new color from RGBA values. Alias for create(r, g, b, a)
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|r|`Number`|red component (0..1)|
|g|`Number`|green component (0..1)|
|b|`Number`|blue component (0..1)|
|a|`Number`|alpha component (0..1)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGBA color array [r,g,b,a] (0..1)|
<a name="fromRGBBytes_bytes_">
## fromRGBBytes(bytes)
Creates new color from array of 4 byte (0..255) values [r, g, b, a]
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|bytes|`Array`|RGB color byte array [r,g,b,a] (0..255)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGBA color array [r,g,b,a] (0..1)|
<a name="fromXYZ_x__y__z_">
## fromXYZ(x, y, z)
Creates new color from XYZ values
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|x|`Number`|x component (0..95)|
|y|`Number`|y component (0..100)|
|z|`Number`|z component (0..108)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGBA color array [r,g,b,a] (0..1)|
<a name="getHSL_color_">
## getHSL(color)
Returns hue, saturation, lightness and alpha of given color.
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a]|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|HSLA values array [h,s,l,a] (0..1)|
<a name="getHSV_color_">
## getHSV(color)
Get hue, saturation, value and alpha of given color
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a]|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|HSVA values array [h,s,v,a] (0..1)|
<a name="getHex_color_">
## getHex(color)
Returns html hex representation of given color
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a]|
#### Returns
| Type | Description |
| --- | --- |
|`String`|html hex color including leading hash e.g. #FF0000|
<a name="getLab_color_">
## getLab(color)
Returns LAB color components
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a]|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|LAB values array [h,s,l] (l:0..100, a:-128..127, b:-128..127)|
<a name="getRGBBytes_color__out_">
## getRGBBytes(color, out)
Returns RGB color components as bytes (0..255)
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a]|
|out|`Array`|array to copy values into|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|RGB color byte array [r,g,b] (0..255) or updated out array|
<a name="getXYZ_color_">
## getXYZ(color)
Returns XYZ representation of given color
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a]|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|[x,y,z] (x:0..95, y:0..100, z:0..108)|
<a name="lerp">
## lerp
Float (0..1) RGBA Color utility class
<a name="set_color__r__g__b__a_">
## set(color, r, g, b, a)

#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a] to update|
|r|`Number`|red component (0..1)|
|g|`Number`|green component (0..1)|
|b|`Number`|blue component (0..1)|
|a|`Number`|alpha component (0..1)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|updated RGBA color array [r,g,b,a] (0..1)|
<a name="setHSL_color__h__s__l__a_">
## setHSL(color, h, s, l, a)
Updates a color based on hue, saturation, lightness and alpha
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a] to update|
|h|`Number`|hue (0..1)|
|s|`Number`|saturation (0..1)|
|l|`Number`|lightness (0..1)|
|a|`Number`|alpha (0..1)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|updated RGBA color array [r,g,b,a] (0..1)|
<a name="setHSV_color__h__s__v__a_">
## setHSV(color, h, s, v, a)
Updates a color based on hue, saturation, value and alpha
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a] to update|
|h|`Number`|hue (0..1)|
|s|`Number`|saturation (0..1)|
|v|`Number`|value (0..1)|
|a|`Number`|alpha (0..1)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|updated RGBA color array [r,g,b,a] (0..1)|
<a name="setHex_color__hex_">
## setHex(color, hex)
Updates a color based on html hex string e.g. #FF0000 -> 1,0,0,1
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a] to update|
|hex|`String`|html hex string #RRGGBB (# is optional)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|updated RGBA color array [r,g,b,a] (0..1)|
<a name="setLab_color__l__a__b_">
## setLab(color, l, a, b)
Updates a color based on l, a, b, component values
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a] to update|
|l|`Number`|l component (0..100)|
|a|`Number`|a component (-128..127)|
|b|`Number`|b component (-128..127)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|updated RGBA color array [r,g,b,a] (0..1)|
<a name="setRGB_color__r__g__b__a_">
## setRGB(color, r, g, b, a)
Updates a color based on r, g, b, a component values
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a] to update|
|r|`Number`|red component (0..1)|
|g|`Number`|green component (0..1)|
|b|`Number`|blue component (0..1)|
|a|`Number`|alpha component (0..1)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|updated RGBA color array [r,g,b,a] (0..1)|
<a name="setXYZ_color__x__y__z_">
## setXYZ(color, x, y, z)
Updates a color based on x, y, z component values
#### Parameters
| Name | Type | Description |
| --- | --- | --- |
|color|`Array`|RGBA color array [r,g,b,a] to update|
|x|`Number`|x component (0..95)|
|y|`Number`|y component (0..100)|
|z|`Number`|z component (0..108)|
#### Returns
| Type | Description |
| --- | --- |
|`Array`|updated RGBA color array [r,g,b,a] (0..1)|
<a name="Color_Black">
## Color.Black
Black color [0, 0, 0, 1]
<a name="Color_Blue">
## Color.Blue
Blue color [0, 0, 1, 1]
<a name="Color_Cyan">
## Color.Cyan
Cyan color [0, 1, 1, 1]
<a name="Color_DarkGrey">
## Color.DarkGrey
Dark Grey color [0, 0, 0, 1]
<a name="Color_Green">
## Color.Green
Green color [0, 1, 0, 1]
<a name="Color_Grey">
## Color.Grey
Grey color [0.5, 0.5, 0.5, 1]
<a name="Color_LightGrey">
## Color.LightGrey
Light Grey color [0.75, 0.75, 0.75, 1]
<a name="Color_Orange">
## Color.Orange
Orange color [1, 0.5, 0, 1]
<a name="Color_Pink">
## Color.Pink
Pink color [1, 0, 1, 1]
<a name="Color_Red">
## Color.Red
Red color [1, 0, 0, 1]
<a name="Color_Transparent">
## Color.Transparent
Transparent color [0, 0, 0, 0]
<a name="Color_White">
## Color.White
White color [0, 0, 0, 1]
<a name="Color_Yellow">
## Color.Yellow
Yellow color [1, 1, 0, 1]
