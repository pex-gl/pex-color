# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.0.3](https://github.com/pex-gl/pex-color/compare/v2.0.2...v2.0.3) (2023-07-25)



## [2.0.2](https://github.com/pex-gl/pex-color/compare/v2.0.1...v2.0.2) (2023-05-22)



## [2.0.1](https://github.com/pex-gl/pex-color/compare/v2.0.0...v2.0.1) (2023-05-22)



# [2.0.0](https://github.com/pex-gl/pex-color/compare/v2.0.0-alpha.2...v2.0.0) (2023-05-22)


### Bug Fixes

* allow default out in color.toRGB ([d9d20a1](https://github.com/pex-gl/pex-color/commit/d9d20a10481f98e64de6d6f520d6e5a8c918dd66))



# [2.0.0-alpha.2](https://github.com/pex-gl/pex-color/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2022-09-09)


### Bug Fixes

* import color types ([9c3db86](https://github.com/pex-gl/pex-color/commit/9c3db865b5522d8994cf6894107f19d6cfcac6e1))



# [2.0.0-alpha.1](https://github.com/pex-gl/pex-color/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2022-07-26)



# [2.0.0-alpha.0](https://github.com/pex-gl/pex-color/compare/v1.1.1...v2.0.0-alpha.0) (2022-07-26)


### Bug Fixes

* handle alpha conditionally in setRGBBytes + remove wrong rounding ([09a2270](https://github.com/pex-gl/pex-color/commit/09a227069db98d7c5f4ae63a6d30c4e51beff3c1))
* handle alpha in getRGBBytes ([b0ee96b](https://github.com/pex-gl/pex-color/commit/b0ee96b5fc3f8a03303ff76cea4c5f4effc9b296))
* wrong operation order with ** operator ([98f719e](https://github.com/pex-gl/pex-color/commit/98f719e125c8cd8056c8265bffe73c2f1d4e4492))


### Code Refactoring

* use ES modules ([2e56b3a](https://github.com/pex-gl/pex-color/commit/2e56b3a13135c0f1337c1709a7e81588e781098c))


### Features

* add alpha and three-digit notation hex support to setHex ([6523d53](https://github.com/pex-gl/pex-color/commit/6523d53ec3bf34e938895b762aba19c290d52e9b))
* add alpha support to getHex ([ff3cc3c](https://github.com/pex-gl/pex-color/commit/ff3cc3c1c6120013e3aeed764703bcd86f00a5cb))
* add CIELUV (hsluv, hpluv, lchuv) ([b37c7e4](https://github.com/pex-gl/pex-color/commit/b37c7e4519089cfbf67b776f84f725c34bc6f77a))
* add css ([af9387f](https://github.com/pex-gl/pex-color/commit/af9387f24a588a82c017ce91df28b154703260d2))
* add linear ([7acaed3](https://github.com/pex-gl/pex-color/commit/7acaed3a15bcd1dee2c3143774b435bb40576162))
* add okhsl and okhsv ([942007b](https://github.com/pex-gl/pex-color/commit/942007b3ce164e23ad85bd59d6a04d046321445b))
* add oklab ([d27d7d4](https://github.com/pex-gl/pex-color/commit/d27d7d4f59ba3aefd8f5726f5111157c116c0959))
* change API to only fromType and getType + handle alpha ([2b0eade](https://github.com/pex-gl/pex-color/commit/2b0eade0fc9667eebcfb36d30bd2be10a3ee8322))
* destructure get hsl and hsv parameters and handle default alpha ([bfb44b1](https://github.com/pex-gl/pex-color/commit/bfb44b19557d841a05ff3d9097d5fa3df4285eb2))
* handle alpha for xyz and lab ([59619b4](https://github.com/pex-gl/pex-color/commit/59619b4db26504ccc8ddd9a55bf5da5251ccb2b7))
* normalize hsluv/hpluv/lchuv and xyz ([7901670](https://github.com/pex-gl/pex-color/commit/790167053767be5500cc276864e76f96e6c23039))
* normalize lab ([b3f0277](https://github.com/pex-gl/pex-color/commit/b3f0277a6e7cacfb80c22cfcc8cc9c3be118cd2c))
* replace getType by toType ([e1727f7](https://github.com/pex-gl/pex-color/commit/e1727f711781f4a90a0ed043afe6ffa784104052))


### Performance Improvements

* extract x,y,z tristimulus values + remove intermediary let declaration ([1a8df42](https://github.com/pex-gl/pex-color/commit/1a8df42d017d534dc5ac11786fc48f058ce4160f))
* remove intermediary const declaration in from functions ([b20ffd4](https://github.com/pex-gl/pex-color/commit/b20ffd42c05d1db0b740acfd77ba2b3a6a7e1324))


### BREAKING CHANGES

* switch to type module
