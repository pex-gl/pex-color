var assert = require('assert');
var Color = require('../Color');

var EPSILON = 0.001;

function assertDeepAlmostEqual(a, b) {
    if (a.length != b.length) {
        throw new Error(a + ' ' + 'assertDeepAlmostEqual' + ' ' + b);
    }
    for(var i=0; i<a.length; i++) {
        if (Math.abs(a[i] - b[i]) > EPSILON) {
            throw new Error(a + ' ' + 'assertDeepAlmostEqual' + ' ' + b + '(diff=' + Math.abs(a[i] - b[i]) + ')');
        }
    }
    return true;
}

assert.deepEqual(Color.create(0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);
assert.deepEqual(Color.create(0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1.0]);

assert.deepEqual(Color.copy([0.1, 0.2, 0.3, 0.4]), [0.1, 0.2, 0.3, 0.4]);

assert.deepEqual(Color.fromRGB(0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1.0]);
assert.deepEqual(Color.fromRGB(0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);

assert.deepEqual(Color.setRGB([0, 0, 0], 0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1.0]);
assert.deepEqual(Color.setRGB([0, 0, 0], 0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);

assert.deepEqual(Color.set([0, 0, 0], 0.1, 0.2, 0.3), [0.1, 0.2, 0.3, 1.0]);
assert.deepEqual(Color.set([0, 0, 0], 0.1, 0.2, 0.3, 0.4), [0.1, 0.2, 0.3, 0.4]);

assert.deepEqual(Color.fromRGBBytes([222, 100, 125]), [222/255, 100/255, 125/255, 1.0]);
assert.deepEqual(Color.fromRGBBytes([222, 100, 125, 23]), [222/255, 100/255, 125/255, 23/255]);

assert.deepEqual(Color.getRGBBytes([222/255, 100/255, 125/255, 23/25]), [222, 100, 125]);

assert.deepEqual(Color.fromHSV(0.0, 1.0, 1.0), [1.0, 0.0, 0.0, 1.0])
assert.deepEqual(Color.fromHSV(0.0, 0.5, 1.0), [1.0, 0.5, 0.5, 1.0])
assertDeepAlmostEqual(Color.fromHSV(0.333333333333, 1.0, 1.0), [0.0, 1.0, 0, 1.0])
assertDeepAlmostEqual(Color.fromHSV(0.333333333333, 0.5, 0.5), [0.25, 0.5, 0.25, 1.0])
assertDeepAlmostEqual(Color.setHSV([0,0,0,1], 0.333333333333, 0.5, 0.5), [0.25, 0.5, 0.25, 1.0])
assertDeepAlmostEqual(Color.getHSV([1.0, 0.0, 0.0, 1.0]), [0.0, 1.0, 1.0, 1.0])
assertDeepAlmostEqual(Color.getHSV([0.25, 0.5, 0.25, 0.5]), [0.333333333333, 0.5, 0.5, 0.5])

assert.deepEqual(Color.fromHSL(0, 1, 0.5), [1, 0, 0, 1])
assertDeepAlmostEqual(Color.fromHSL(0.333333333333, 1, 0.5), [0, 1, 0, 1])
assert.deepEqual(Color.fromHSL(0.5, 1, 0.5), [0,0.9999999999999998,1,1])
assert.deepEqual(Color.setHSL([0, 0, 0, 1], 0, 1, 0.5), [1, 0, 0, 1]);
assert.deepEqual(Color.getHSL([1, 0, 0, 1]), [0, 1, 0.5, 1.0]);

assert.deepEqual(Color.fromHex("#FF0000"), [1, 0, 0, 1]);
assert.deepEqual(Color.fromHex("#00FF00"), [0, 1, 0, 1]);
assert.deepEqual(Color.fromHex("#0000FF"), [0, 0, 1, 1]);
assert.deepEqual(Color.fromHex("#FF0066"), [1, 0, 0.4, 1]);
assert.deepEqual(Color.setHex([0, 0, 0, 1], "#FF00FF"), [1, 0, 1, 1]);
assert.deepEqual(Color.getHex([1, 0, 0.4, 1]), "#FF0066");

assertDeepAlmostEqual(Color.fromLab(97.13824698129729, -21.555908334832285, 94.48248544644461), [1, 1, 0, 1])
assertDeepAlmostEqual(Color.setLab([0, 0, 0, 1], 97.13824698129729, -21.555908334832285, 94.48248544644461), [1, 1, 0, 1])
assertDeepAlmostEqual(Color.getLab([1, 1, 0, 1]), [97.13824698129729, -21.555908334832285, 94.48248544644461])

console.log('Done')
