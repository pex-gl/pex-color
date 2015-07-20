var assert = require('assert');
var Color = require('../Color');

assert.deepEqual(Color.create(0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);

assert.deepEqual(Color.create(0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1.0]);

assert.deepEqual(Color.fromRGB(0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);

assert.deepEqual(Color.fromHSL(0, 1, 0.5), [1, 0, 0, 1])
assert.deepEqual(Color.fromHSL(0.5, 1, 0.5), [0,0.9999999999999998,1,1])
assert.deepEqual(Color.setHSL([0, 0, 0, 1], 0, 1, 0.5), [1, 0, 0, 1]);

assert.deepEqual(Color.fromHex("#FF0000"), [1, 0, 0, 1]);
assert.deepEqual(Color.fromHex("#00FF00"), [0, 1, 0, 1]);
assert.deepEqual(Color.fromHex("#0000FF"), [0, 0, 1, 1]);

assert.deepEqual(Color.setHex([0, 0, 0, 1], "#FF00FF"), [1, 0, 1, 1]);
